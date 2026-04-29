import { useState } from "react";
import { Search, RefreshCw, ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneCard } from "@/components/PhoneCard";
import { AddPhoneDialog } from "@/components/AddPhoneDialog";
import { EditPhoneDialog } from "@/components/EditPhoneDialog";
import { AddRechargeDialog } from "@/components/AddRechargeDialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePhoneNumbers, useDeletePhoneNumber, PhoneNumber } from "@/hooks/useCelctrl";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "connected" | "disconnected">("all");
  const [tipoFilter, setTipoFilter] = useState<"all" | "PRE" | "POS">("all");
  const [editingPhone, setEditingPhone] = useState<PhoneNumber | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addRechargeOpen, setAddRechargeOpen] = useState(false);
  
  const { data: phones, isLoading, refetch } = usePhoneNumbers();
  const deletePhone = useDeletePhoneNumber();

  const filteredPhones = phones?.filter((phone) => {
    const matchesSearch =
      phone.numero.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phone.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phone.webhook.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "connected" && phone.status === "connected") ||
      (statusFilter === "disconnected" && phone.status === "disconnected");

    const matchesTipo =
      tipoFilter === "all" || phone.tipo === tipoFilter;

    return matchesSearch && matchesStatus && matchesTipo;
  })?.sort((a, b) => {
    // Order by oldest recharge first (most days since recharge → top)
    const parse = (s: string) => {
      if (!s || s === "Sem recarga") return null;
      const [d, m, y] = s.split("/");
      if (!d || !m || !y) return null;
      return new Date(parseInt(y), parseInt(m) - 1, parseInt(d)).getTime();
    };
    const ta = parse(a.ultimarecarga);
    const tb = parse(b.ultimarecarga);
    if (ta === null && tb === null) return 0;
    if (ta === null) return -1; // sem recarga vai pro topo (mais "antigo")
    if (tb === null) return 1;
    return ta - tb; // mais antigo primeiro
  });

  const handleEdit = (phone: PhoneNumber) => {
    setEditingPhone(phone);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deletePhone.mutateAsync(id);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Início</span>
              <span>›</span>
              <span className="text-foreground">Números</span>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex items-center gap-2 text-sm pt-2">
                <span className="text-muted-foreground">{phones?.length || 0} / 10</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => refetch()}>
                <RefreshCw className="h-4 w-4" />
              </Button>
              <div className="flex flex-col gap-2">
                <AddPhoneDialog />
                <Button
                  onClick={() => setAddRechargeOpen(true)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Recarga
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Números</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary border-border"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-border">
                  {statusFilter === "all" ? "Status" : statusFilter === "connected" ? "Conectados" : "Desconectados"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>Todos</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("connected")}>Conectados</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("disconnected")}>Desconectados</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-border">
                  {tipoFilter === "all" ? "Tipo" : tipoFilter === "PRE" ? "Pré Pago" : "Pós Pago"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setTipoFilter("all")}>Todos</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTipoFilter("PRE")}>Pré Pago</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTipoFilter("POS")}>Pós Pago</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-[400px] rounded-xl" />
            ))}
          </div>
        ) : filteredPhones && filteredPhones.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPhones.map((phone) => (
              <PhoneCard
                key={phone.id}
                id={phone.id}
                phoneNumber={phone.numero}
                webhook={phone.webhook}
                lastRecharge={phone.ultimarecarga || "Sem recarga"}
                balance={parseFloat(phone.saldo) || 0}
                  messagesTotal={phone.totalmsg || 0}
                  contacts={phone.contatos || 0}
                  status={phone.status as "connected" | "disconnected"}
                  userName={phone.nome}
                  tipo={phone.tipo || "PRE"}
                  vencimento={phone.vencimento || 0}
                  onEdit={() => handleEdit(phone)}
                onDelete={() => handleDelete(phone.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum número encontrado</p>
          </div>
        )}

        <EditPhoneDialog
          phone={editingPhone}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
        />

        <AddRechargeDialog
          open={addRechargeOpen}
          onOpenChange={setAddRechargeOpen}
          phones={phones}
        />
      </div>
    </div>
  );
};

export default Index;
