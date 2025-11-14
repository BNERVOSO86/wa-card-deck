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

const phoneSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  numero: z.string().min(1, "Número é obrigatório").regex(/^\+?[0-9\s-]+$/, "Número inválido"),
  webhook: z.string().url("URL inválida"),
  saldo: z.string().optional(),
  ultimarecarga: z.string().optional(),
  contatos: z.string().optional(),
  status: z.enum(["connected", "disconnected"]),
  historicorecarga: z.string().optional(),
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
      const history = phone.historicorecarga ? JSON.parse(phone.historicorecarga) : [];
      setRechargeHistory(Array.isArray(history) ? history : []);
      
      reset({
        nome: phone.nome,
        numero: phone.numero,
        webhook: phone.webhook,
        saldo: phone.saldo,
        ultimarecarga: phone.ultimarecarga,
        contatos: phone.contatos?.toString() || "0",
        status: phone.status as "connected" | "disconnected",
        historicorecarga: phone.historicorecarga,
      });
    }
  }, [phone, reset]);

  const addRechargeDate = () => {
    const today = new Date().toISOString().split('T')[0];
    const updatedHistory = [...rechargeHistory, today].sort((a, b) => 
      new Date(b).getTime() - new Date(a).getTime()
    );
    setRechargeHistory(updatedHistory);
    setValue("historicorecarga", JSON.stringify(updatedHistory));
    setValue("ultimarecarga", updatedHistory[0]);
  };

  const removeRechargeDate = (index: number) => {
    const updatedHistory = rechargeHistory.filter((_, i) => i !== index);
    setRechargeHistory(updatedHistory);
    setValue("historicorecarga", JSON.stringify(updatedHistory));
    setValue("ultimarecarga", updatedHistory[0] || "");
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
      },
    });
    onOpenChange(false);
  };

  if (!phone) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Número</DialogTitle>
          <DialogDescription>
            Atualize os dados do número WhatsApp
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Histórico de Recargas</Label>
              <Button type="button" size="sm" onClick={addRechargeDate}>
                + Adicionar Recarga
              </Button>
            </div>
            {rechargeHistory.length > 0 ? (
              <div className="space-y-2 max-h-32 overflow-y-auto border rounded-md p-2">
                {rechargeHistory.map((date, index) => (
                  <div key={index} className="flex items-center justify-between text-sm bg-muted p-2 rounded">
                    <span>{new Date(date).toLocaleDateString('pt-BR')}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRechargeDate(index)}
                    >
                      Remover
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhuma recarga registrada</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={updatePhone.isPending}>
              {updatePhone.isPending ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
