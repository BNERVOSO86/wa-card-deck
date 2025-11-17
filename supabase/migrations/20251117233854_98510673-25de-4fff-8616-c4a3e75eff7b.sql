-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Criar tabela de logs para auditoria de vencimentos
CREATE TABLE IF NOT EXISTS public.vencimento_logs (
  id BIGSERIAL PRIMARY KEY,
  numero_id BIGINT REFERENCES public.celctrl(id) ON DELETE CASCADE,
  data_execucao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  acao TEXT NOT NULL,
  status TEXT NOT NULL,
  detalhes JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.vencimento_logs ENABLE ROW LEVEL SECURITY;

-- Política para permitir todas as operações
CREATE POLICY "Allow all operations on vencimento_logs"
ON public.vencimento_logs
FOR ALL
USING (true)
WITH CHECK (true);

-- Criar índice para melhor performance nas consultas
CREATE INDEX idx_vencimento_logs_numero_id ON public.vencimento_logs(numero_id);
CREATE INDEX idx_vencimento_logs_data_execucao ON public.vencimento_logs(data_execucao DESC);