

## Problema

1. **"Invalid Date" no EditPhoneDialog**: na linha que renderiza o histórico de recargas, o código faz `new Date(parsed.date)` onde `parsed.date` está no formato `dd/MM/yyyy` (ex: `04/02/2026`). O `new Date()` nativo não reconhece esse formato → mostra "Invalid Date".

2. **Falta botão "Incluir Recarga" na tela Histórico**: o usuário quer adicionar recargas direto pela tela de histórico, sem precisar abrir o card e editar.

## Solução

### 1. Corrigir "Invalid Date" em `src/components/EditPhoneDialog.tsx`
Substituir `new Date(parsed.date).toLocaleDateString('pt-BR')` por exibir diretamente `parsed.date` (já está no formato `dd/MM/yyyy`). Mesmo tratamento no fallback do formato antigo (usar `parseDate` robusto).

### 2. Novo componente `src/components/AddRechargeDialog.tsx`
Dialog grande e bonito (sm:max-w-[600px]) com:
- **Select de Número** (dropdown com todos os números cadastrados — mostra `nome` + `numero`)
- **Data da Recarga** (input type="date")
- **Valor (R$)** (input type="number" com step 0.01)
- Botões "Cancelar" e "Adicionar Recarga"
- Validação: número, data e valor obrigatórios
- Ao salvar:
  - Converte data de `yyyy-MM-dd` para `dd/MM/yyyy`
  - Lê o `historicorecarga` atual do número (com double-parse)
  - Adiciona nova entrada `{date, value}` como string JSON
  - Ordena por data desc
  - Chama `useUpdatePhoneNumber` atualizando `historicorecarga`, `ultimarecarga` (data mais recente) e `saldo` (soma)
  - Toast de sucesso e fecha dialog

### 3. Atualizar `src/pages/HistoricoRecargas.tsx`
- Adicionar botão verde "+ Incluir Recarga" no topo (canto direito, alinhado ao título)
- Estado `addOpen` para controlar o dialog
- Renderizar `<AddRechargeDialog open={addOpen} onOpenChange={setAddOpen} phones={phones} />`

### Arquivos alterados
- `src/components/EditPhoneDialog.tsx` (corrigir Invalid Date)
- `src/components/AddRechargeDialog.tsx` (novo)
- `src/pages/HistoricoRecargas.tsx` (botão + integração)

Sem mudanças no banco de dados.

