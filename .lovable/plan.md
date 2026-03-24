

## Problem

The `historicorecarga` column in the database stores data as a **PostgreSQL text array** where each element is a JSON string like `{"date":"04/02/2026","value":"25"}`. 

The current code does `JSON.parse(phone.historicorecarga)` expecting a single JSON string containing an array. But Supabase returns it as a JavaScript array of strings, so `JSON.parse` either fails or doesn't produce the expected structure.

## Solution

Modify `src/pages/HistoricoRecargas.tsx` to handle the data correctly:

1. Check if `historicorecarga` is already an array (Supabase returns it as `string[]`)
2. If it's an array, parse each individual element with `JSON.parse`
3. If it's a plain string, try `JSON.parse` as before (fallback)

### Changes to `src/pages/HistoricoRecargas.tsx`

Replace the parsing logic inside `allEntries` useMemo (around lines 43-62):

```typescript
phones.forEach((phone) => {
  if (!phone.historicorecarga) return;

  try {
    let items: { date?: string; value?: string }[] = [];
    const raw = phone.historicorecarga;

    if (Array.isArray(raw)) {
      // PostgreSQL array - each element is a JSON string
      items = raw.map((item: string) => {
        try { return JSON.parse(item); } catch { return null; }
      }).filter(Boolean);
    } else if (typeof raw === 'string') {
      try {
        const parsed = JSON.parse(raw);
        items = Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        // skip
      }
    }

    items.forEach((item) => {
      if (!item.date) return;
      try {
        const parsedDate = parse(item.date, "dd/MM/yyyy", new Date());
        entries.push({
          numero: phone.numero || "",
          nome: phone.nome || "",
          date: item.date,
          value: item.value || "0",
          parsedDate,
        });
      } catch {
        // skip invalid dates
      }
    });
  } catch {
    // skip
  }
});
```

Also apply the same fix in `src/components/EditPhoneDialog.tsx` (line 65) where it parses `historicorecarga` for the edit dialog - ensure it handles the array-of-strings format consistently.

### Summary
- One file change in `HistoricoRecargas.tsx` (parsing logic)
- One file change in `EditPhoneDialog.tsx` (same parsing fix for consistency)
- No database changes needed

