import { Settings, Trash2, Users, MessageSquare, Wallet, Calendar, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PhoneCardProps {
  id: number;
  phoneNumber: string;
  webhook: string;
  lastRecharge: string;
  balance: number;
  messagesTotal: number;
  contacts: number;
  status: "connected" | "disconnected";
  userName?: string;
  tipo: string;
  vencimento: number;
  onEdit: () => void;
  onDelete: () => void;
}

export function PhoneCard({
  id,
  phoneNumber,
  webhook,
  lastRecharge,
  balance,
  messagesTotal,
  contacts,
  status,
  userName = "Davidson",
  tipo,
  vencimento,
  onEdit,
  onDelete,
}: PhoneCardProps) {
  const getDaysSinceRecharge = () => {
    if (lastRecharge === "Sem recarga") return null;
    try {
      const [day, month, year] = lastRecharge.split('/');
      const lastRechargeDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      lastRechargeDate.setHours(0, 0, 0, 0);
      const diffTime = today.getTime() - lastRechargeDate.getTime();
      return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    } catch {
      return null;
    }
  };

  const daysSinceRecharge = getDaysSinceRecharge();

  const getBorderClass = () => {
    if (status === "disconnected") return "border-destructive border-2";
    if (daysSinceRecharge !== null) {
      if (daysSinceRecharge <= 1) return "border-warning border-2";
      if (daysSinceRecharge > 60) return "border-alert border-2";
    }
    return "border-border";
  };

  const getCardBgClass = () => {
    if (tipo === "PRE") return "bg-prepaid text-prepaid-foreground";
    if (tipo === "POS") return "bg-postpaid text-postpaid-foreground";
    return "bg-card text-card-foreground";
  };

  const getTipoLabel = () => {
    if (tipo === "PRE") return "PRÉ PAGO";
    if (tipo === "POS") return "PÓS PAGO";
    return "";
  };

  const daysAgoLabel = (() => {
    if (lastRecharge === "Sem recarga" || daysSinceRecharge === null) return "Sem recarga";
    if (daysSinceRecharge === 0) return "Hoje";
    if (daysSinceRecharge === 1) return "1 dia atrás";
    return `${daysSinceRecharge} dias atrás`;
  })();

  return (
    <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl ${getBorderClass()} ${getCardBgClass()}`}>
      {/* Action button - top right */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-3 top-3 z-10 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
        onClick={onEdit}
      >
        <Settings className="h-4 w-4" />
      </Button>

      {status === "disconnected" && (
        <div className="absolute left-3 top-3 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-destructive/20 border border-destructive">
          <X className="h-4 w-4 text-destructive" />
        </div>
      )}

      {/* SECTION 1: Days highlight (hero) */}
      <div className="px-6 pt-6 pb-5 text-center border-b border-white/10">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Clock className="h-5 w-5 text-white/70" />
          <span className="text-xs uppercase tracking-wider font-medium text-white/70">
            Última recarga
          </span>
        </div>
        <h2 className="text-3xl font-bold text-white drop-shadow-md leading-tight">
          {daysAgoLabel}
        </h2>
        {lastRecharge !== "Sem recarga" && (
          <p className="text-xs text-white/60 mt-1">{lastRecharge}</p>
        )}
      </div>

      {/* SECTION 2: Phone identity */}
      <div className="px-6 py-5 text-center border-b border-white/10 bg-black/5">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-11 w-11 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-primary">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
          <div className="text-left">
            <h3 className="font-bold text-lg text-white leading-tight tracking-tight">{phoneNumber}</h3>
            <p className="text-xs text-white/60">WhatsApp Cloud API</p>
          </div>
        </div>
      </div>

      {/* SECTION 3: Stats grid */}
      <div className="px-6 py-5 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-black/10 border border-white/5">
            <Wallet className="h-4 w-4 text-white/60 mb-1" />
            <span className="text-[10px] uppercase tracking-wider text-white/60">Saldo</span>
            <span className="font-bold text-base text-white">R$ {balance.toFixed(2)}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-black/10 border border-white/5">
            <MessageSquare className="h-4 w-4 text-white/60 mb-1" />
            <span className="text-[10px] uppercase tracking-wider text-white/60">Mensagens</span>
            <span className="font-bold text-base text-white">{messagesTotal}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-black/10 border border-white/5">
            <Users className="h-4 w-4 text-white/60 mb-1" />
            <span className="text-[10px] uppercase tracking-wider text-white/60">Contatos</span>
            <span className="font-bold text-base text-white">{contacts}</span>
          </div>
          {tipo === "POS" && vencimento ? (
            <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-black/10 border border-white/5">
              <Calendar className="h-4 w-4 text-white/60 mb-1" />
              <span className="text-[10px] uppercase tracking-wider text-white/60">Vencimento</span>
              <span className="font-bold text-base text-white">Dia {vencimento}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-black/10 border border-white/5">
              <Calendar className="h-4 w-4 text-white/60 mb-1" />
              <span className="text-[10px] uppercase tracking-wider text-white/60">Recarga</span>
              <span className="font-bold text-xs text-white">{lastRecharge}</span>
            </div>
          )}
        </div>

        {/* Webhook */}
        <div className="pt-1">
          <p className="text-[10px] uppercase tracking-wider text-white/60 mb-1 text-center">Webhook</p>
          <p className="text-xs font-mono bg-black/20 px-2 py-1.5 rounded truncate text-center text-white/90">{webhook}</p>
        </div>
      </div>

      {/* SECTION 4: Footer with badges & actions */}
      <div className="px-6 py-3 bg-black/10 border-t border-white/10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <Badge variant="default" className="bg-warning text-warning-foreground hover:bg-warning/90 truncate">
            {userName}
          </Badge>
          {getTipoLabel() && (
            <Badge variant="outline" className="text-[10px] border-white/20 text-white/80">
              {getTipoLabel()}
            </Badge>
          )}
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon" className="h-8 w-8 shrink-0">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir o número {phoneNumber}? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} className="bg-destructive hover:bg-destructive/90">
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  );
}
