import { useState } from "react";
import { Search, RefreshCw, Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneCard } from "@/components/PhoneCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockPhones = [
  {
    phoneNumber: "+55 11 98765-4321",
    webhook: "https://api.example.com/webhook/abc123",
    lastRecharge: "15/01/2024",
    balance: 250.00,
    messagesDay: 45,
    messagesTotal: 1250,
    contacts: 328,
    status: "connected" as const,
    userName: "Davidson"
  },
  {
    phoneNumber: "+55 21 97654-3210",
    webhook: "https://api.example.com/webhook/def456",
    lastRecharge: "10/01/2024",
    balance: 150.50,
    messagesDay: 23,
    messagesTotal: 890,
    contacts: 215,
    status: "connected" as const,
    userName: "Davidson"
  },
  {
    phoneNumber: "+55 31 96543-2109",
    webhook: "https://api.example.com/webhook/ghi789",
    lastRecharge: "05/01/2024",
    balance: 75.00,
    messagesDay: 0,
    messagesTotal: 456,
    contacts: 142,
    status: "disconnected" as const,
    userName: "Davidson"
  },
  {
    phoneNumber: "+55 41 95432-1098",
    webhook: "https://api.example.com/webhook/jkl012",
    lastRecharge: "18/01/2024",
    balance: 500.00,
    messagesDay: 67,
    messagesTotal: 2100,
    contacts: 512,
    status: "connected" as const,
    userName: "Davidson"
  },
  {
    phoneNumber: "+55 51 94321-0987",
    webhook: "https://api.example.com/webhook/mno345",
    lastRecharge: "12/01/2024",
    balance: 320.75,
    messagesDay: 31,
    messagesTotal: 1567,
    contacts: 389,
    status: "connected" as const,
    userName: "Davidson"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">{mockPhones.length} / 10</span>
              </div>
              <Button variant="ghost" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Número
              </Button>
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
                  Status
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Todos</DropdownMenuItem>
                <DropdownMenuItem>Conectados</DropdownMenuItem>
                <DropdownMenuItem>Desconectados</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPhones.map((phone, index) => (
            <PhoneCard key={index} {...phone} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
