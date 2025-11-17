import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.81.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PhoneNumber {
  id: number;
  nome: string | null;
  numero: string | null;
  tipo: string | null;
  vencimento: number | null;
  webhook: string | null;
  ultimarecarga: string | null;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Iniciando verificação de vencimentos...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Obter o dia atual
    const hoje = new Date();
    const diaAtual = hoje.getDate();
    
    console.log(`📅 Dia atual: ${diaAtual}`);

    // Buscar todos os números PÓS-PAGO com vencimento
    const { data: numeros, error: fetchError } = await supabase
      .from('celctrl')
      .select('id, nome, numero, tipo, vencimento, webhook, ultimarecarga')
      .eq('tipo', 'POS')
      .not('vencimento', 'is', null);

    if (fetchError) {
      console.error('❌ Erro ao buscar números:', fetchError);
      throw fetchError;
    }

    console.log(`📱 Encontrados ${numeros?.length || 0} números PÓS-PAGO`);

    const processados: any[] = [];
    const erros: any[] = [];

    // Processar cada número
    for (const numero of (numeros || []) as PhoneNumber[]) {
      try {
        // Verificar se hoje é dia de vencimento
        if (numero.vencimento === diaAtual) {
          console.log(`⏰ VENCIMENTO HOJE - ${numero.nome} (${numero.numero}) - Dia ${diaAtual}`);

          // Atualizar última recarga
          const novaDataRecarga = hoje.toISOString().split('T')[0];
          
          const { error: updateError } = await supabase
            .from('celctrl')
            .update({ 
              ultimarecarga: novaDataRecarga,
              status: 'VENCIDO'
            })
            .eq('id', numero.id);

          if (updateError) {
            console.error(`❌ Erro ao atualizar número ${numero.id}:`, updateError);
            erros.push({
              numero_id: numero.id,
              erro: updateError.message
            });
            continue;
          }

          // Registrar log
          const { error: logError } = await supabase
            .from('vencimento_logs')
            .insert({
              numero_id: numero.id,
              acao: 'VENCIMENTO_DETECTADO',
              status: 'SUCESSO',
              detalhes: {
                nome: numero.nome,
                numero: numero.numero,
                dia_vencimento: diaAtual,
                data_execucao: hoje.toISOString(),
                ultima_recarga_anterior: numero.ultimarecarga,
                nova_data_recarga: novaDataRecarga
              }
            });

          if (logError) {
            console.error(`⚠️ Erro ao registrar log para ${numero.id}:`, logError);
          }

          // Chamar webhook se configurado
          if (numero.webhook) {
            try {
              console.log(`📡 Chamando webhook para ${numero.nome}...`);
              
              const webhookResponse = await fetch(numero.webhook, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  tipo: 'VENCIMENTO',
                  numero_id: numero.id,
                  nome: numero.nome,
                  numero: numero.numero,
                  dia_vencimento: diaAtual,
                  data: hoje.toISOString(),
                  ultima_recarga: novaDataRecarga
                })
              });

              const webhookStatus = webhookResponse.ok ? 'SUCESSO' : 'FALHA';
              
              // Log do webhook
              await supabase
                .from('vencimento_logs')
                .insert({
                  numero_id: numero.id,
                  acao: 'WEBHOOK_ENVIADO',
                  status: webhookStatus,
                  detalhes: {
                    webhook_url: numero.webhook,
                    status_code: webhookResponse.status,
                    timestamp: hoje.toISOString()
                  }
                });

              console.log(`✅ Webhook enviado: ${webhookStatus}`);
            } catch (webhookError) {
              console.error(`❌ Erro ao chamar webhook:`, webhookError);
              
              await supabase
                .from('vencimento_logs')
                .insert({
                  numero_id: numero.id,
                  acao: 'WEBHOOK_ERRO',
                  status: 'FALHA',
                  detalhes: {
                    webhook_url: numero.webhook,
                    erro: webhookError instanceof Error ? webhookError.message : 'Erro desconhecido',
                    timestamp: hoje.toISOString()
                  }
                });
            }
          }

          processados.push({
            id: numero.id,
            nome: numero.nome,
            numero: numero.numero,
            vencimento: diaAtual
          });

          console.log(`✅ Número ${numero.nome} processado com sucesso`);
        } else {
          console.log(`⏭️ Pulando ${numero.nome} - Vencimento: dia ${numero.vencimento}, Hoje: dia ${diaAtual}`);
        }
      } catch (error) {
        console.error(`❌ Erro ao processar número ${numero.id}:`, error);
        erros.push({
          numero_id: numero.id,
          erro: error instanceof Error ? error.message : 'Erro desconhecido'
        });
      }
    }

    const resultado = {
      sucesso: true,
      data_execucao: hoje.toISOString(),
      dia_verificado: diaAtual,
      total_numeros_pos: numeros?.length || 0,
      vencimentos_processados: processados.length,
      erros: erros.length,
      detalhes: {
        processados,
        erros: erros.length > 0 ? erros : undefined
      }
    };

    console.log('🎉 Verificação concluída:', resultado);

    return new Response(
      JSON.stringify(resultado),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    console.error('💥 Erro fatal na função:', error);
    
    return new Response(
      JSON.stringify({
        sucesso: false,
        erro: error instanceof Error ? error.message : 'Erro desconhecido',
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
});
