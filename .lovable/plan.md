

## Plan: Recharge History Page

### What
Create a new "Histórico de Recargas" page accessible from the sidebar that displays all recharge history entries from all phone numbers in a filterable list view.

### New Files
1. **`src/pages/HistoricoRecargas.tsx`** - New page that:
   - Fetches all phone numbers from `celctrl` table using existing `usePhoneNumbers` hook
   - Parses `historicorecarga` JSON from each