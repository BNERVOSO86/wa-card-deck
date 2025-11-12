import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useAddPhoneNumber } from "@/hooks/useCelctrl";
import { Plus } from "lucide-react";

const phoneSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  numero: z.string().min(1, "Número é obrigatório").regex(/^\+?[0-9\s-]+$/, "Número inválido"),
  webhook: z.string().url("URL inválida"),
  saldo: z.string().optional(),
  ultimarecarga: z.string().optional(),
  contatos: z.string().optional(),
  status: z.enum(["connected", "disconnected"]).default("disconnected"),
});

type PhoneFormData = z.infer<typeof phoneSchema>;

export const AddPhoneDialog = () => {
  const [open, setOpen] = useState(false);
  const addPhone = useAddPhoneNumber();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      status: "disconnected",
    },
  });

  const onSubmit = async (data: PhoneFormData) => {
    await addPhone.mutateAsync({
      nome: data.nome,
      numero: data.numero,
      webhook: data.webhook,
      saldo: data.saldo || "0",
      ultimarecarga: data.ultimarecarga || new Date().toLocaleDateString("pt-BR"),
      contatos: data.contatos ? parseInt(data.contatos) : 0,
      status: data.status,
      ativo: data.status === "connected",
      totalmsg: 0,
      msgdia: 0,
    });
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Número
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Número</DialogTitle>
          <DialogDescription>
            Preencha os dados do novo número WhatsApp
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome *</Label>
            <Input id="nome" {...register("nome")} placeholder="Davidson" />
            {errors.nome && (
              <p className="text-sm text-destructive">{errors.nome.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="numero">Número *</Label>
            <Input
              id="numero"
              {...register("numero")}
              placeholder="+55 11 98765-4321"
            />
            {errors.numero && (
              <p className="text-sm text-destructive">{errors.numero.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhook">Webhook URL *</Label>
            <Input
              id="webhook"
              {...register("webhook")}
              placeholder="https://api.example.com/webhook/abc123"
            />
            {errors.webhook && (
              <p className="text-sm text-destructive">{errors.webhook.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="saldo">Saldo Inicial</Label>
              <Input
                id="saldo"
                {...register("saldo")}
                placeholder="0.00"
                type="number"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contatos">Contatos Iniciais</Label>
              <Input
                id="contatos"
                {...register("contatos")}
                placeholder="0"
                type="number"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ultimarecarga">Última Recarga</Label>
              <Input
                id="ultimarecarga"
                {...register("ultimarecarga")}
                placeholder="DD/MM/AAAA"
              />
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

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={addPhone.isPending}>
              {addPhone.isPending ? "Adicionando..." : "Adicionar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
