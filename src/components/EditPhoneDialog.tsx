import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { useUpdatePhoneNumber, PhoneNumber } from "@/hooks/useCelctrl";
import { toast } from "@/hooks/use-toast";

const phoneSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  numero: z.string().min(1, "Número é obrigatório").regex(/^\+?[0-9\s-]+$/, "Número inválido"),
  webhook: z.string().url("URL inválida"),
  saldo: z.string().optional(),
  ultimarecarga: z.string().optional(),
  contatos: z.string().optional(),
  status: z.enum(["connected", "disconnected"]),
  historicorecarga: z.string().optional(),
  tipo: z.string().optional(),
  vencimento: z.string().optional(),
});

type PhoneFormData = z.infer<typeof phoneSchema>;

interface EditPhoneDialogProps {
  phone: PhoneNumber | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditPhoneDialog = ({ phone, open, onOpenChange }: EditPhoneDialogProps) => {
  const updatePhone = useUpdatePhoneNumber();
  const [rechargeHistory, setRechargeHistory] = useState<string[]>([]);
  const [newRechargeDate, setNewRechargeDate] = useState<string>("");
  const [newRechargeValue, setNewRechargeValue] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
  });

  useEffect(() => {
    if (phone) {
      let history: string[] = [];
      const raw = phone.historicorecarga as unknown;
      
      let rawItems: unknown[] = [];
      if (Array.isArray(raw)) {
        rawItems = raw;
      } else if (typeof raw === 'string' && raw) {
        try { const parsed = JSON.parse(raw); rawItems = Array.isArray(parsed) ? parsed : []; } catch { rawItems = []; }
      }
      
      // Ensure each item is a JSON string
      history = rawItems.map((ri) => {
        if (typeof ri === 'string') {
          try { JSON.parse(ri); return ri; } catch { return null; }
        }
        return JSON.stringify(ri);
      }).filter(Boolean) as string[];
      
      setRechargeHistory(history);
      
      reset({
        nome: phone.nome,
        numero: phone.numero,
        webhook: phone.webhook,
        saldo: phone.saldo,
        ultimarecarga: phone.ultimarecarga,
        contatos: phone.contatos?.toString() || "0",
        status: phone.status as "connected" | "disconnected",
        historicorecarga: phone.historicorecarga,
        tipo: phone.tipo || "PRE",
        vencimento: phone.vencimento?.toString() || "",
      });
    }
  }, [phone, reset]);

  const addRechargeDate = () => {
    if (!newRechargeDate) {
      toast({
        title: "Erro",
        description: "Selecione uma data para a recarga",
        variant: "destructive",
      });
      return;
    }

    // Convert date from YYYY-MM-DD to dd/MM/yyyy
    const [year, month, day] = newRechargeDate.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    const rechargeEntry = {
      date: formattedDate,
      value: newRechargeValue || "0"
    };
    
    const updatedHistory = [...rechargeHistory, JSON.stringify(rechargeEntry)].sort((a, b) => {
      const parseDate = (dateStr: string) => {
        const [d, m, y] = dateStr.split('/');
        return new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
      };
      const dateA = parseDate(JSON.parse(a).date);
      const dateB = parseDate(JSON.parse(b).date);
      return dateB.getTime() - dateA.getTime();
    });
    
    setRechargeHistory(updatedHistory);
    setValue("historicorecarga", JSON.stringify(updatedHistory));
    
    // Get the most recent date from history
    const mostRecentEntry = JSON.parse(updatedHistory[0]);
    setValue("ultimarecarga", mostRecentEntry.date);
    
    // Update saldo if value was provided
    if (newRechargeValue) {
      const currentSaldo = parseFloat(watch("saldo") || "0");
      const rechargeValue = parseFloat(newRechargeValue);
      setValue("saldo", (currentSaldo + rechargeValue).toFixed(2));
    }
    
    setNewRechargeDate("");
    setNewRechargeValue("");
  };

  const removeRechargeDate = (index: number) => {
    const updatedHistory = rechargeHistory.filter((_, i) => i !== index);
    setRechargeHistory(updatedHistory);
    setValue("historicorecarga", JSON.stringify(updatedHistory));
    
    // Update ultimarecarga with the most recent date or empty string
    if (updatedHistory.length > 0) {
      const mostRecentEntry = JSON.parse(updatedHistory[0]);
      setValue("ultimarecarga", mostRecentEntry.date);
    } else {
      setValue("ultimarecarga", "");
    }
  };

  const onSubmit = async (data: PhoneFormData) => {
    if (!phone) return;

    await updatePhone.mutateAsync({
      id: phone.id,
      data: {
        nome: data.nome,
        numero: data.numero,
        webhook: data.webhook,
        saldo: data.saldo,
        ultimarecarga: data.ultimarecarga,
        historicorecarga: data.historicorecarga,
        contatos: data.contatos ? parseInt(data.contatos) : 0,
        status: data.status,
        ativo: data.status === "connected",
        tipo: data.tipo || "PRE",
        vencimento: data.vencimento ? parseInt(data.vencimento) : 0,
      },
    });
    onOpenChange(false);
  };

  if (!phone) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Editar Número</DialogTitle>
          <DialogDescription>
            Atualize os dados do número WhatsApp
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0">
          <div className="space-y-4 overflow-y-auto pr-2 flex-1">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome *</Label>
            <Input id="nome" {...register("nome")} />
            {errors.nome && (
              <p className="text-sm text-destructive">{errors.nome.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="numero">Número *</Label>
            <Input id="numero" {...register("numero")} />
            {errors.numero && (
              <p className="text-sm text-destructive">{errors.numero.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhook">Webhook URL *</Label>
            <Input id="webhook" {...register("webhook")} />
            {errors.webhook && (
              <p className="text-sm text-destructive">{errors.webhook.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="saldo">Saldo</Label>
              <Input
                id="saldo"
                {...register("saldo")}
                type="number"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contatos">Contatos</Label>
              <Input
                id="contatos"
                {...register("contatos")}
                type="number"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ultimarecarga">Última Recarga</Label>
              <Input id="ultimarecarga" {...register("ultimarecarga")} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={watch("status")}
                onValueChange={(value) =>
                  setValue("status", value as "connected" | "disconnected")
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="connected">Conectado</SelectItem>
                  <SelectItem value="disconnected">Desconectado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Plano</Label>
              <Select
                value={watch("tipo") || "PRE"}
                onValueChange={(value) => setValue("tipo", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRE">PRÉ PAGO</SelectItem>
                  <SelectItem value="POS">PÓS PAGO</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {watch("tipo") === "POS" && (
              <div className="space-y-2">
                <Label htmlFor="vencimento">Dia do Vencimento</Label>
                <Input
                  id="vencimento"
                  {...register("vencimento")}
                  type="number"
                  min="1"
                  max="31"
                  placeholder="Ex: 15"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Histórico de Recargas</Label>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="newRechargeDate">Data da Recarga</Label>
                <Input
                  id="newRechargeDate"
                  type="date"
                  value={newRechargeDate}
                  onChange={(e) => setNewRechargeDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newRechargeValue">Valor (opcional)</Label>
                <Input
                  id="newRechargeValue"
                  type="number"
                  step="0.01"
                  placeholder="R$ 0.00"
                  value={newRechargeValue}
                  onChange={(e) => setNewRechargeValue(e.target.value)}
                />
              </div>
            </div>
            
            <Button type="button" size="sm" onClick={addRechargeDate} className="w-full">
              + Adicionar Recarga
            </Button>
            
            {rechargeHistory.length > 0 ? (
              <div className="space-y-2 max-h-32 overflow-y-auto border rounded-md p-2">
                {rechargeHistory.map((entry, index) => {
                  try {
                    const parsed = JSON.parse(entry);
                    const formattedDate = parsed.date || '';
                    const value = parsed.value ? `R$ ${parseFloat(parsed.value).toFixed(2)}` : '';
                    
                    return (
                      <div key={index} className="flex items-center justify-between text-sm bg-muted p-2 rounded">
                        <div className="flex gap-2">
                          <span className="font-medium">{formattedDate}</span>
                          {value && <span className="text-muted-foreground">{value}</span>}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRechargeDate(index)}
                        >
                          Remover
                        </Button>
                      </div>
                    );
                  } catch {
                    // Handle old format (just date string)
                    return (
                      <div key={index} className="flex items-center justify-between text-sm bg-muted p-2 rounded">
                        <span>{entry}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRechargeDate(index)}
                        >
                          Remover
                        </Button>
                      </div>
                    );
                  }
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhuma recarga registrada</p>
            )}
          </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t mt-4 bg-background">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={updatePhone.isPending}>
              {updatePhone.isPending ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
