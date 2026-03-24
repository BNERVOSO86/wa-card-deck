import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { usePhoneNumbers } from "@/hooks/useCelctrl";
import { parse, isAfter, isBefore, isEqual, format } from "date-fns";

interface RechargeEntry {
  numero: string;
  nome: string;
  date: string;
  value: string;
  parsedDate: Date;
}

const HistoricoRecargas = () => {
  const { data: phones, isLoading } = usePhoneNumbers();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNumber, setSelectedNumber] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const allEntries = useMemo(() => {
    if (!phones) return [];

    const entries: RechargeEntry[] = [];

    phones.forEach((phone) => {
      if (!phone.historicorecarga) return;

      try {
        const history = JSON.parse(phone.historicorecarga);
        const items = Array.isArray(history) ? history : [history];

        items.forEach((item: { date?: string; value?: string }) => {
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
        // skip invalid JSON
      }
    });

    return entries.sort((a, b) => b.parsedDate.getTime() - a.parsedDate.getTime());
  }, [phones]);

  const filteredEntries = useMemo(() => {
    return allEntries.filter((entry) => {
      if (selectedNumber !== "all" && entry.numero !== selectedNumber) return false;

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
  }, [allEntries, selectedNumber, searchQuery, dateFrom, dateTo]);

  const uniqueNumbers = useMemo(() => {
    if (!phones) return [];
    return phones
      .filter((p) => p.numero)
      .map((p) => ({ numero: p.numero, nome: p.nome }));
  }, [phones]);

  const totalValue = useMemo(() => {
    return filteredEntries.reduce((sum, e) => {
      const val = parseFloat(e.value.replace(",", "."));
      return sum + (isNaN(val) ? 0 : val);
    }, 0);
  }, [filteredEntries]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Histórico de Recargas</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Visualize todas as recargas realizadas em todos os números
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-card border-border"
          />
        </div>

        <Select value={selectedNumber} onValueChange={setSelectedNumber}>
          <SelectTrigger className="bg-card border-border">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Todos os números" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os números</SelectItem>
            {uniqueNumbers.map((n) => (
              <SelectItem key={n.numero} value={n.numero}>
                {n.nome || n.numero}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="bg-card border-border"
          placeholder="Data início"
        />

        <Input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="bg-card border-border"
          placeholder="Data fim"
        />
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
                <TableHead>Número</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry, idx) => (
                <TableRow key={`${entry.numero}-${entry.date}-${idx}`}>
                  <TableCell className="font-mono text-sm">{entry.numero}</TableCell>
                  <TableCell>{entry.nome}</TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell className="text-right font-medium">
                    R$ {entry.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default HistoricoRecargas;
