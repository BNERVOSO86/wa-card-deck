import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

export interface PhoneNumber {
  id: number;
  numero: string;
  nome: string;
  webhook: string;
  saldo: string;
  ultimarecarga: string;
  historicorecarga: string;
  totalmsg: number;
  msgdia: number;
  contatos: number;
  status: string;
  ativo: boolean;
  criadoem: string;
  alteradoem: string;
}

export interface PhoneNumberInsert {
  numero: string;
  nome: string;
  webhook: string;
  saldo?: string;
  ultimarecarga?: string;
  historicorecarga?: string;
  totalmsg?: number;
  msgdia?: number;
  contatos?: number;
  status?: string;
  ativo?: boolean;
}

export const usePhoneNumbers = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["phone-numbers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("celctrl")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as PhoneNumber[];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel("celctrl-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "celctrl",
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["phone-numbers"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return query;
};

export const useAddPhoneNumber = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PhoneNumberInsert) => {
      const { data: result, error } = await supabase
        .from("celctrl")
        .insert({
          ...data,
          criadoem: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phone-numbers"] });
      toast({
        title: "Sucesso",
        description: "Número adicionado com sucesso!",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: `Erro ao adicionar número: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};

export const useUpdatePhoneNumber = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<PhoneNumberInsert> }) => {
      const { data: result, error } = await supabase
        .from("celctrl")
        .update({
          ...data,
          alteradoem: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phone-numbers"] });
      toast({
        title: "Sucesso",
        description: "Número atualizado com sucesso!",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: `Erro ao atualizar número: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};

export const useDeletePhoneNumber = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("celctrl").delete().eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phone-numbers"] });
      toast({
        title: "Sucesso",
        description: "Número excluído com sucesso!",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: `Erro ao excluir número: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};
