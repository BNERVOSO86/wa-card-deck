import { useState, useMemo, useCallback } from "react";
import { Search, ArrowUpDown, ArrowUp, ArrowDown, X, CalendarIcon, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { usePhoneNumbers, useUpdatePhoneNumber } from "@/hooks/useCelctrl";
import { parse, isAfter, isBefore, isEqual } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

interface RechargeEntry {
  numero: string;
  nome: string;
  date: string;
  value: string;
  parsedDate: Date;
}

type SortField = "numero" | "nome" | "date" | "value";
type SortDir = "asc" | "desc";

const NAME_COLORS = [
  "hsl(142, 70%, 65%)",  // green
  "hsl(199, 89%, 65%)",  // blue
  "hsl(280, 70%, 70%)",  // purple
  "hsl(35, 90%, 65%)",   // orange
  "hsl(340, 75%, 65%)",  // pink
  "hsl(60, 80%, 60%)",   // yellow
  "hsl(180, 60%, 55%)",  // teal
  "hsl(15, 85%, 65%)",   // coral
];

const HistoricoRecargas = () => {
  const { data: phones, isLoading } = usePhoneNumbers();
  const updatePhone = useUpdatePhoneNumber();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNumber, setSelectedNumber] = useState<string>("all");
  const [selectedName, setSelectedName] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [deleteEntry, setDeleteEntry] = useState<RechargeEntry | null>(null);

  const allEntries = useMemo(() => {
    if (!phones) return [];
    const entries: RechargeEntry[] = [];

    phones.forEach((phone) => {
      if (!phone.historicorecarga) return;
      try {
        const raw = phone.historicorecarga as unknown;
        let rawItems: unknown[] = [];
        if (Array.isArray(raw)) {
          rawItems = raw;
        } else if (typeof raw === "string") {
          try {
            const parsed = JSON.parse(raw);
            rawItems = Array.isArray(parsed) ? parsed : [parsed];
          } catch { /* skip */ }
        }
        const items = rawItems.map((ri) => {
          if (typeof ri === "string") {
            try { return JSON.parse(ri); } catch { return null; }
          }
          return ri;
        }).filter(Boolean) as { date?: string; value?: string }[];

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
          } catch { /* skip */ }
        });
      } catch { /* skip */ }
    });

    return entries;
  }, [phones]);

  const nameColorMap = useMemo(() => {
    const names = [...new Set(allEntries.map((e) => e.nome))];
    const map: Record<string, string> = {};
    names.forEach((name, i) => {
      map[name] = NAME_COLORS[i % NAME_COLORS.length];
    });
    return map;
  }, [allEntries]);

  const filteredEntries = useMemo(() => {
    const filtered = allEntries.filter((entry) => {
      if (selectedNumber !== "all" && entry.numero !== selectedNumber) return false;
      if (selectedName !== "all" && entry.nome !== selectedName) return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !entry.numero.toLowerCase().includes(q) &&
          !entry.nome.toLowerCase().includes(q) &&
          !entry.value.toLowerCase().includes(q)
        )
          return false;
      }

      if (dateFrom) {
        try {
          const from = parse(dateFrom, "yyyy-MM-dd", new Date());
          if (isBefore(entry.parsedDate, from)) return false;
        } catch { /* ignore */ }
      }

      if (dateTo) {
        try {
          const to = parse(dateTo, "yyyy-MM-dd", new Date());
          if (isAfter(entry.parsedDate, to) && !isEqual(entry.parsedDate, to)) return false;
        } catch { /* ignore */ }
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "numero":
          cmp = a.numero.localeCompare(b.numero);
          break;
        case "nome":
          cmp = a.nome.localeCompare(b.nome);
          break;
        case "date":
          cmp = a.parsedDate.getTime() - b.parsedDate.getTime();
          break;
        case "value":
          cmp = parseFloat(a.value.replace(",", ".")) - parseFloat(b.value.replace(",", "."));
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return filtered;
  }, [allEntries, selectedNumber, selectedName, searchQuery, dateFrom, dateTo, sortField, sortDir]);

  const uniqueNumbers = useMemo(() => {
    if (!phones) return [];
    return phones.filter((p) => p.numero).map((p) => ({ numero: p.numero, nome: p.nome }));
  }, [phones]);

  const uniqueNames = useMemo(() => {
    return [...new Set(allEntries.map((e) => e.nome))].filter(Boolean);
  }, [allEntries]);

  const totalValue = useMemo(() => {
    return filteredEntries.reduce((sum, e) => {
      const val = parseFloat(e.value.replace(",", "."));
      return sum + (isNaN(val) ? 0 : val);
    }, 0);
  }, [filteredEntries]);

  const handleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir(field === "date" ? "desc" : "asc");
    }
  }, [sortField]);

  const handleClickName = useCallback((name: string) => {
    setSelectedName((prev) => (prev === name ? "all" : name));
  }, []);

  const handleClickNumero = useCallback((numero: string) => {
    setSelectedNumber((prev) => (prev === numero ? "all" : numero));
  }, []);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-3.5 w-3.5 ml-1 opacity-40" />;
    return sortDir === "asc"
      ? <ArrowUp className="h-3.5 w-3.5 ml-1 text-primary" />
      : <ArrowDown className="h-3.5 w-3.5 ml-1 text-primary" />;
  };

  const hasActiveFilters = selectedNumber !== "all" || selectedName !== "all" || searchQuery || dateFrom || dateTo;

  const clearFilters = () => {
    setSelectedNumber("all");
    setSelectedName("all");
    setSearchQuery("");
    setDateFrom("");
    setDateTo("");
  };

  const handleDeleteEntry = useCallback(async () => {
    if (!deleteEntry || !phones) return;
    const phone = phones.find((p) => p.numero === deleteEntry.numero);
    if (!phone) return;

    try {
      const raw = phone.historicorecarga as unknown;
      let rawItems: unknown[] = [];
      if (Array.isArray(raw)) rawItems = raw;
      else if (typeof raw === "string") {
        try { rawItems = JSON.parse(raw); } catch { /* skip */ }
      }

      const newItems = rawItems.filter((ri) => {
        let item: { date?: string; value?: string } | null = null;
        if (typeof ri === "string") {
          try { item = JSON.parse(ri); } catch { return true; }
        } else {
          item = ri as { date?: string; value?: string };
        }
        return !(item?.date === deleteEntry.date && item?.value === deleteEntry.value);
      });

      await updatePhone.mutateAsync({
        id: phone.id,
        data: { historicorecarga: JSON.stringify(newItems) },
      });

      toast({ title: "Sucesso", description: "Registro de recarga excluído!" });
    } catch {
      toast({ title: "Erro", description: "Erro ao excluir registro.", variant: "destructive" });
    }
    setDeleteEntry(null);
  }, [deleteEntry, phones, updatePhone]);

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Histórico de Recargas</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Visualize todas as recargas realizadas em todos os números
        </p>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, número ou valor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background border-border"
            />
          </div>

          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="bg-background border-border w-[150px]"
            />
            <span className="text-muted-foreground text-sm">até</span>
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="bg-background border-border w-[150px]"
            />
          </div>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4 mr-1" /> Limpar
            </Button>
          )}
        </div>

        {/* Active filter badges */}
        {(selectedNumber !== "all" || selectedName !== "all") && (
          <div className="flex gap-2 flex-wrap">
            {selectedName !== "all" && (
              <Badge
                variant="secondary"
                className="cursor-pointer gap-1"
                style={{ backgroundColor: nameColorMap[selectedName] + "22", color: nameColorMap[selectedName], borderColor: nameColorMap[selectedName] + "44" }}
                onClick={() => setSelectedName("all")}
              >
                {selectedName} <X className="h-3 w-3" />
              </Badge>
            )}
            {selectedNumber !== "all" && (
              <Badge variant="secondary" className="cursor-pointer gap-1 font-mono" onClick={() => setSelectedNumber("all")}>
                {selectedNumber} <X className="h-3 w-3" />
              </Badge>
            )}
          </div>
        )}

        {/* Quick name filter chips */}
        <div className="flex gap-2 flex-wrap">
          {uniqueNames.map((name) => (
            <button
              key={name}
              onClick={() => handleClickName(name)}
              className="px-3 py-1 rounded-full text-xs font-medium transition-all border"
              style={{
                backgroundColor: selectedName === name ? nameColorMap[name] + "33" : "transparent",
                color: nameColorMap[name],
                borderColor: selectedName === name ? nameColorMap[name] : nameColorMap[name] + "44",
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="flex gap-4">
        <div className="bg-card border border-border rounded-lg px-4 py-3">
          <p className="text-xs text-muted-foreground">Total de recargas</p>
          <p className="text-xl font-bold text-foreground">{filteredEntries.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg px-4 py-3">
          <p className="text-xs text-muted-foreground">Valor total</p>
          <p className="text-xl font-bold text-primary">
            R$ {totalValue.toFixed(2).replace(".", ",")}
          </p>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Nenhuma recarga encontrada
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-card/50">
                <TableHead>
                  <button onClick={() => handleSort("numero")} className="flex items-center hover:text-foreground transition-colors font-semibold">
                    Número <SortIcon field="numero" />
                  </button>
                </TableHead>
                <TableHead>
                  <button onClick={() => handleSort("nome")} className="flex items-center hover:text-foreground transition-colors font-semibold">
                    Nome <SortIcon field="nome" />
                  </button>
                </TableHead>
                <TableHead>
                  <button onClick={() => handleSort("date")} className="flex items-center hover:text-foreground transition-colors font-semibold">
                    Data <SortIcon field="date" />
                  </button>
                </TableHead>
                <TableHead className="text-right">
                  <button onClick={() => handleSort("value")} className="flex items-center justify-end hover:text-foreground transition-colors font-semibold ml-auto">
                    Valor <SortIcon field="value" />
                  </button>
                </TableHead>
                <TableHead className="w-[50px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry, idx) => (
                <TableRow key={`${entry.numero}-${entry.date}-${idx}`} className="hover:bg-muted/30">
                  <TableCell>
                    <button
                      onClick={() => handleClickNumero(entry.numero)}
                      className="font-mono text-sm hover:underline hover:text-primary transition-colors"
                    >
                      {entry.numero}
                    </button>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleClickName(entry.nome)}
                      className="font-medium hover:underline transition-colors"
                      style={{ color: nameColorMap[entry.nome] }}
                    >
                      {entry.nome}
                    </button>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{entry.date}</TableCell>
                  <TableCell className="text-right font-semibold">
                    R$ {parseFloat(entry.value.replace(",", ".")).toFixed(2).replace(".", ",")}
                  </TableCell>
                  <TableCell className="text-center">
                    <button
                      onClick={() => setDeleteEntry(entry)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded hover:bg-destructive/10"
                      title="Excluir registro"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={!!deleteEntry} onOpenChange={(open) => !open && setDeleteEntry(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir registro</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja apagar o registro?
              {deleteEntry && (
                <span className="block mt-2 font-medium text-foreground">
                  {deleteEntry.numero} — {deleteEntry.date} — R$ {parseFloat(deleteEntry.value.replace(",", ".")).toFixed(2).replace(".", ",")}
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteEntry} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default HistoricoRecargas;
