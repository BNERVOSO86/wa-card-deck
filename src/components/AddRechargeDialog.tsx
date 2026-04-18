import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneNumber, useUpdatePhoneNumber } from "@/hooks/useCelctrl";
import { toast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

interface AddRechargeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phones: PhoneNumber[] | undefined;
}

export const AddRechargeDialog = ({ open, onOpenChange, phones }: AddRechargeDialogProps) => {
  const updatePhone = useUpdatePhoneNumber();
  const [phoneId, setPhoneId] = useState<string>("");
  const [date, setDate] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (open) {
      setPhoneId("");
      setDate(new Date().toISOString().slice(0, 10));
      setValue("");
    }
  }, [open]);

  const parseHistory = (raw: unknown): { date: string; value: string }[] => {
    let rawItems: unknown[] = [];
    if (Array.isArray(raw)) rawItems = raw;
    else if (typeof raw === "string" && raw) {
      try {
        const parsed = JSON.parse(raw);
        rawItems = Array.isArray(parsed) ? parsed : [parsed];
      } catch { /* skip */ }
    }
    return rawItems
      .map((ri) => {
        if (typeof ri === "string") {
          try { return JSON.parse(ri); } catch { return null; }
        }
        return ri;
      })
      .filter(Boolean) as { date: string; value: string }[];
  };

  const parseDmy = (s: string) => {
    const [d, m, y] = s.split("/");
    return new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
  };

  const handleSubmit = async () => {
    if (!phoneId) {
      toast({ title: "Erro", description: "Selecione um número.", variant: "destructive" });
      return;
    }
    if (!date) {
      toast({ title: "Erro", description: "Informe a data.", variant: "destructive" });
      return;
    }
    if (!value || parseFloat(value) <= 0) {
      toast({ title: "Erro", description: "Informe um valor válido.", variant: "destructive" });
      return;
    }

    const phone = phones?.find((p) => String(p.id) === phoneId);
    if (!phone) return;

    const [y, m, d] = date.split("-");
    const formattedDate = `${d}/${m}/${y}`;

    const current = parseHistory(phone.historicorecarga);
    const newEntry = { date: formattedDate, value: parseFloat(value).toFixed(2) };
    const updated = [...current, newEntry].sort(
      (a, b) => parseDmy(b.date).getTime() - parseDmy(a.date).getTime()
    );

    const stringified = updated.map((e) => JSON.stringify(e));
    const mostRecent = updated[0].date;
    const currentSaldo = parseFloat(phone.saldo || "0") || 0;
    const newSaldo = (currentSaldo + parseFloat(value)).toFixed(2);

    await updatePhone.mutateAsync({
      id: phone.id,
      data: {
        historicorecarga: JSON.stringify(stringified),
        ultimarecarga: mostRecent,
        saldo: newSaldo,
      },
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Incluir Nova Recarga</DialogTitle>
          <DialogDescription>
            Adicione uma recarga rapidamente a qualquer número cadastrado.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="phone-select">Número *</Label>
            <Select value={phoneId} onValueChange={setPhoneId}>
              <SelectTrigger id="phone-select" className="h-11">
                <SelectValue placeholder="Selecione um número" />
              </SelectTrigger>
              <SelectContent>
                {phones?.map((p) => (
                  <SelectItem key={p.id} value={String(p.id)}>
                    <span className="font-medium">{p.nome}</span>
                    <span className="text-muted-foreground ml-2 font-mono text-xs">{p.numero}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="recharge-date">Data da Recarga *</Label>
              <Input
                id="recharge-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recharge-value">Valor (R$) *</Label>
              <Input
                id="recharge-value"
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="h-11"
              />
            </div>
          </div>

          {phoneId && (
            <div className="bg-muted/50 border border-border rounded-md p-3 text-sm">
              <p className="text-muted-foreground">
                Saldo atual:{" "}
                <span className="font-semibold text-foreground">
                  R$ {parseFloat(phones?.find((p) => String(p.id) === phoneId)?.saldo || "0").toFixed(2).replace(".", ",")}
                </span>
              </p>
              {value && parseFloat(value) > 0 && (
                <p className="text-muted-foreground mt-1">
                  Novo saldo:{" "}
                  <span className="font-semibold text-primary">
                    R$ {(
                      (parseFloat(phones?.find((p) => String(p.id) === phoneId)?.saldo || "0") || 0) +
                      parseFloat(value)
                    ).toFixed(2).replace(".", ",")}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={updatePhone.isPending}>
            <Plus className="h-4 w-4 mr-1" />
            {updatePhone.isPending ? "Salvando..." : "Adicionar Recarga"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
