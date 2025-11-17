export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      celctrl: {
        Row: {
          alteradoem: string | null
          ativo: boolean | null
          contatos: number | null
          created_at: string
          criadoem: string | null
          historicorecarga: string | null
          id: number
          msgdia: number | null
          nome: string | null
          numero: string | null
          quepasakey: string | null
          saldo: string | null
          status: string | null
          tipo: string | null
          totalmsg: number | null
          ultimarecarga: string | null
          vencimento: number | null
          webhook: string | null
        }
        Insert: {
          alteradoem?: string | null
          ativo?: boolean | null
          contatos?: number | null
          created_at?: string
          criadoem?: string | null
          historicorecarga?: string | null
          id?: number
          msgdia?: number | null
          nome?: string | null
          numero?: string | null
          quepasakey?: string | null
          saldo?: string | null
          status?: string | null
          tipo?: string | null
          totalmsg?: number | null
          ultimarecarga?: string | null
          vencimento?: number | null
          webhook?: string | null
        }
        Update: {
          alteradoem?: string | null
          ativo?: boolean | null
          contatos?: number | null
          created_at?: string
          criadoem?: string | null
          historicorecarga?: string | null
          id?: number
          msgdia?: number | null
          nome?: string | null
          numero?: string | null
          quepasakey?: string | null
          saldo?: string | null
          status?: string | null
          tipo?: string | null
          totalmsg?: number | null
          ultimarecarga?: string | null
          vencimento?: number | null
          webhook?: string | null
        }
        Relationships: []
      }
      Cliente: {
        Row: {
          botativo: string | null
          ConversationID: string | null
          created_at: string
          id: number
          IDEmpresa: number | null
          lastmsg: string | null
          nome: string | null
          TelefoneWhatsapp: string | null
        }
        Insert: {
          botativo?: string | null
          ConversationID?: string | null
          created_at?: string
          id?: number
          IDEmpresa?: number | null
          lastmsg?: string | null
          nome?: string | null
          TelefoneWhatsapp?: string | null
        }
        Update: {
          botativo?: string | null
          ConversationID?: string | null
          created_at?: string
          id?: number
          IDEmpresa?: number | null
          lastmsg?: string | null
          nome?: string | null
          TelefoneWhatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Cliente_IDEmpresa_fkey"
            columns: ["IDEmpresa"]
            isOneToOne: false
            referencedRelation: "Empresa"
            referencedColumns: ["id"]
          },
        ]
      }
      Cliente2: {
        Row: {
          botativo: string | null
          ConversationID: string | null
          created_at: string
          id: number
          IDEmpresa: number | null
          lastmsg: string | null
          nome: string | null
          TelefoneWhatsapp: string | null
        }
        Insert: {
          botativo?: string | null
          ConversationID?: string | null
          created_at?: string
          id?: number
          IDEmpresa?: number | null
          lastmsg?: string | null
          nome?: string | null
          TelefoneWhatsapp?: string | null
        }
        Update: {
          botativo?: string | null
          ConversationID?: string | null
          created_at?: string
          id?: number
          IDEmpresa?: number | null
          lastmsg?: string | null
          nome?: string | null
          TelefoneWhatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Cliente2_IDEmpresa_fkey"
            columns: ["IDEmpresa"]
            isOneToOne: false
            referencedRelation: "Empresa"
            referencedColumns: ["id"]
          },
        ]
      }
      DISPARADOR: {
        Row: {
          categoria: string | null
          criadoem: string
          datacontato: string | null
          enviodisparo: string | null
          id: number
          intervalo: string | null
          login: string | null
          MSG: string | null
          nome: string | null
          obs: string | null
          status: string | null
          whatsapp: string | null
        }
        Insert: {
          categoria?: string | null
          criadoem?: string
          datacontato?: string | null
          enviodisparo?: string | null
          id?: number
          intervalo?: string | null
          login?: string | null
          MSG?: string | null
          nome?: string | null
          obs?: string | null
          status?: string | null
          whatsapp?: string | null
        }
        Update: {
          categoria?: string | null
          criadoem?: string
          datacontato?: string | null
          enviodisparo?: string | null
          id?: number
          intervalo?: string | null
          login?: string | null
          MSG?: string | null
          nome?: string | null
          obs?: string | null
          status?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      Empresa: {
        Row: {
          apidifybot: string | null
          created_at: string
          id: number
          nome: string | null
          Status: string | null
          TelefoneWhatsapp: string | null
          tokeninstance: string | null
        }
        Insert: {
          apidifybot?: string | null
          created_at?: string
          id?: number
          nome?: string | null
          Status?: string | null
          TelefoneWhatsapp?: string | null
          tokeninstance?: string | null
        }
        Update: {
          apidifybot?: string | null
          created_at?: string
          id?: number
          nome?: string | null
          Status?: string | null
          TelefoneWhatsapp?: string | null
          tokeninstance?: string | null
        }
        Relationships: []
      }
      Empresa2: {
        Row: {
          apidifybot: string | null
          created_at: string
          id: number
          nome: string | null
          Status: string | null
          TelefoneWhatsapp: string | null
          tokeninstance: string | null
        }
        Insert: {
          apidifybot?: string | null
          created_at?: string
          id?: number
          nome?: string | null
          Status?: string | null
          TelefoneWhatsapp?: string | null
          tokeninstance?: string | null
        }
        Update: {
          apidifybot?: string | null
          created_at?: string
          id?: number
          nome?: string | null
          Status?: string | null
          TelefoneWhatsapp?: string | null
          tokeninstance?: string | null
        }
        Relationships: []
      }
      OLIVIA: {
        Row: {
          botativo: boolean | null
          Count: number | null
          cpfCliente: string | null
          Criado: string
          emailCliente: string | null
          id: number
          nomeCliente: string | null
          numEmpresa: string | null
          OBS: string | null
          P1: string | null
          P2: string | null
          P3: string | null
          P4: string | null
          PrimeiroContato: string | null
          ultimavisita: string | null
          UltimoContato: string | null
          V1: string | null
          V2: string | null
          V3: string | null
          whatsapp: string | null
        }
        Insert: {
          botativo?: boolean | null
          Count?: number | null
          cpfCliente?: string | null
          Criado: string
          emailCliente?: string | null
          id?: number
          nomeCliente?: string | null
          numEmpresa?: string | null
          OBS?: string | null
          P1?: string | null
          P2?: string | null
          P3?: string | null
          P4?: string | null
          PrimeiroContato?: string | null
          ultimavisita?: string | null
          UltimoContato?: string | null
          V1?: string | null
          V2?: string | null
          V3?: string | null
          whatsapp?: string | null
        }
        Update: {
          botativo?: boolean | null
          Count?: number | null
          cpfCliente?: string | null
          Criado?: string
          emailCliente?: string | null
          id?: number
          nomeCliente?: string | null
          numEmpresa?: string | null
          OBS?: string | null
          P1?: string | null
          P2?: string | null
          P3?: string | null
          P4?: string | null
          PrimeiroContato?: string | null
          ultimavisita?: string | null
          UltimoContato?: string | null
          V1?: string | null
          V2?: string | null
          V3?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      "OLIVIA-AGENDAMENTOS": {
        Row: {
          created_at: string
          Data: string | null
          "Hora Final": string | null
          "Hora Inicial": string | null
          id: number
          idagendamento: string | null
          Name: string | null
          NOTIFICA: string | null
          PROFESSIONAL: string | null
          Serviço: string | null
          ultimavisita: string | null
          Valor: string | null
          Whatsapp: string | null
        }
        Insert: {
          created_at?: string
          Data?: string | null
          "Hora Final"?: string | null
          "Hora Inicial"?: string | null
          id?: number
          idagendamento?: string | null
          Name?: string | null
          NOTIFICA?: string | null
          PROFESSIONAL?: string | null
          Serviço?: string | null
          ultimavisita?: string | null
          Valor?: string | null
          Whatsapp?: string | null
        }
        Update: {
          created_at?: string
          Data?: string | null
          "Hora Final"?: string | null
          "Hora Inicial"?: string | null
          id?: number
          idagendamento?: string | null
          Name?: string | null
          NOTIFICA?: string | null
          PROFESSIONAL?: string | null
          Serviço?: string | null
          ultimavisita?: string | null
          Valor?: string | null
          Whatsapp?: string | null
        }
        Relationships: []
      }
      "OLIVIA-history-clients": {
        Row: {
          botativo: boolean | null
          Count: number | null
          cpfCliente: string | null
          Criado: string
          emailCliente: string | null
          id: number
          nomeCliente: string | null
          numEmpresa: string | null
          OBS: string | null
          P1: string | null
          P2: string | null
          P3: string | null
          P4: string | null
          PrimeiroContato: string | null
          UltimoContato: string | null
          V1: string | null
          V2: string | null
          V3: string | null
          whatsapp: string | null
        }
        Insert: {
          botativo?: boolean | null
          Count?: number | null
          cpfCliente?: string | null
          Criado: string
          emailCliente?: string | null
          id?: number
          nomeCliente?: string | null
          numEmpresa?: string | null
          OBS?: string | null
          P1?: string | null
          P2?: string | null
          P3?: string | null
          P4?: string | null
          PrimeiroContato?: string | null
          UltimoContato?: string | null
          V1?: string | null
          V2?: string | null
          V3?: string | null
          whatsapp?: string | null
        }
        Update: {
          botativo?: boolean | null
          Count?: number | null
          cpfCliente?: string | null
          Criado?: string
          emailCliente?: string | null
          id?: number
          nomeCliente?: string | null
          numEmpresa?: string | null
          OBS?: string | null
          P1?: string | null
          P2?: string | null
          P3?: string | null
          P4?: string | null
          PrimeiroContato?: string | null
          UltimoContato?: string | null
          V1?: string | null
          V2?: string | null
          V3?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      PEDRONES: {
        Row: {
          botativo: boolean | null
          COUNT: number | null
          created_at: string
          id: number
          MODE: string | null
          nomeCli: string | null
          whatsapp: string
        }
        Insert: {
          botativo?: boolean | null
          COUNT?: number | null
          created_at?: string
          id?: number
          MODE?: string | null
          nomeCli?: string | null
          whatsapp: string
        }
        Update: {
          botativo?: boolean | null
          COUNT?: number | null
          created_at?: string
          id?: number
          MODE?: string | null
          nomeCli?: string | null
          whatsapp?: string
        }
        Relationships: []
      }
      "PLANILHA CRM SHEETS": {
        Row: {
          dataImplementacao: string | null
          disparosEfetuados: number | null
          id: number
          nomeCliente: string
          ultimodisparo: string | null
          whatsapp: string | null
        }
        Insert: {
          dataImplementacao?: string | null
          disparosEfetuados?: number | null
          id?: number
          nomeCliente: string
          ultimodisparo?: string | null
          whatsapp?: string | null
        }
        Update: {
          dataImplementacao?: string | null
          disparosEfetuados?: number | null
          id?: number
          nomeCliente?: string
          ultimodisparo?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      "RESUMEdinho-categories": {
        Row: {
          categories: string | null
          color: string | null
          criadoem: string
          description: string | null
          funil: string | null
          id: number
          login: string | null
        }
        Insert: {
          categories?: string | null
          color?: string | null
          criadoem: string
          description?: string | null
          funil?: string | null
          id?: number
          login?: string | null
        }
        Update: {
          categories?: string | null
          color?: string | null
          criadoem?: string
          description?: string | null
          funil?: string | null
          id?: number
          login?: string | null
        }
        Relationships: []
      }
      "RESUMEdinho-conversation1": {
        Row: {
          fromme: boolean | null
          id: number
          login: string | null
          msg: string | null
          nomeCli: string | null
          ultimaMSG: string
          whatsappCli: string | null
        }
        Insert: {
          fromme?: boolean | null
          id?: number
          login?: string | null
          msg?: string | null
          nomeCli?: string | null
          ultimaMSG: string
          whatsappCli?: string | null
        }
        Update: {
          fromme?: boolean | null
          id?: number
          login?: string | null
          msg?: string | null
          nomeCli?: string | null
          ultimaMSG?: string
          whatsappCli?: string | null
        }
        Relationships: []
      }
      "RESUMEdinho-resumo": {
        Row: {
          data: string
          id: number
          KANBAN: string | null
          login: string | null
          nomeCli: string | null
          resumo: string | null
          status: string | null
          whatsappCli: string | null
        }
        Insert: {
          data: string
          id?: number
          KANBAN?: string | null
          login?: string | null
          nomeCli?: string | null
          resumo?: string | null
          status?: string | null
          whatsappCli?: string | null
        }
        Update: {
          data?: string
          id?: number
          KANBAN?: string | null
          login?: string | null
          nomeCli?: string | null
          resumo?: string | null
          status?: string | null
          whatsappCli?: string | null
        }
        Relationships: []
      }
      TAREFAS_CASA: {
        Row: {
          created_at: string
          frequency: number | null
          id: number
          lastexec: string | null
          taskname: string | null
        }
        Insert: {
          created_at?: string
          frequency?: number | null
          id?: number
          lastexec?: string | null
          taskname?: string | null
        }
        Update: {
          created_at?: string
          frequency?: number | null
          id?: number
          lastexec?: string | null
          taskname?: string | null
        }
        Relationships: []
      }
      vencimento_logs: {
        Row: {
          acao: string
          created_at: string
          data_execucao: string
          detalhes: Json | null
          id: number
          numero_id: number | null
          status: string
        }
        Insert: {
          acao: string
          created_at?: string
          data_execucao?: string
          detalhes?: Json | null
          id?: number
          numero_id?: number | null
          status: string
        }
        Update: {
          acao?: string
          created_at?: string
          data_execucao?: string
          detalhes?: Json | null
          id?: number
          numero_id?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "vencimento_logs_numero_id_fkey"
            columns: ["numero_id"]
            isOneToOne: false
            referencedRelation: "celctrl"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
