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
      app_users: {
        Row: {
          created_at: string
          id: number
          is_professional: boolean | null
          name: string | null
          password: string
          phone: string
          professional_bio: string | null
          professional_photo_url: string | null
          professional_registration: string | null
          professional_specialty: string | null
          registered_by_professional: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          is_professional?: boolean | null
          name?: string | null
          password: string
          phone: string
          professional_bio?: string | null
          professional_photo_url?: string | null
          professional_registration?: string | null
          professional_specialty?: string | null
          registered_by_professional?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          is_professional?: boolean | null
          name?: string | null
          password?: string
          phone?: string
          professional_bio?: string | null
          professional_photo_url?: string | null
          professional_registration?: string | null
          professional_specialty?: string | null
          registered_by_professional?: string | null
        }
        Relationships: []
      }
      CAMPANHA: {
        Row: {
          ativo: boolean | null
          created_at: string
          datacampanha: string | null
          enviado: boolean | null
          horadisparo: string | null
          id: number
          idcampanha: number | null
          login: string | null
          MSG: string | null
          nome: string | null
          nomecampanha: string | null
          quepasakey: string | null
          status: string | null
          urlimagem: string | null
          whatsapp: string | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string
          datacampanha?: string | null
          enviado?: boolean | null
          horadisparo?: string | null
          id?: number
          idcampanha?: number | null
          login?: string | null
          MSG?: string | null
          nome?: string | null
          nomecampanha?: string | null
          quepasakey?: string | null
          status?: string | null
          urlimagem?: string | null
          whatsapp?: string | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string
          datacampanha?: string | null
          enviado?: boolean | null
          horadisparo?: string | null
          id?: number
          idcampanha?: number | null
          login?: string | null
          MSG?: string | null
          nome?: string | null
          nomecampanha?: string | null
          quepasakey?: string | null
          status?: string | null
          urlimagem?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
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
          arquivo_conteudo: string | null
          arquivo_extensao: string | null
          arquivo_nome: string | null
          ativo: boolean | null
          base64img: string | null
          categoria: string | null
          COUNT: number | null
          criadoem: string
          datacontato: string | null
          enviodisparo: string | null
          horadisparo: string | null
          id: number
          imagem_incluir: boolean | null
          imagem_url: string | null
          intervalo: string | null
          lista_id: string | null
          login: string | null
          MSG: string | null
          nome: string | null
          obs: string | null
          status: string | null
          tipo: string | null
          TOTAL: number | null
          whatsapp: string | null
        }
        Insert: {
          arquivo_conteudo?: string | null
          arquivo_extensao?: string | null
          arquivo_nome?: string | null
          ativo?: boolean | null
          base64img?: string | null
          categoria?: string | null
          COUNT?: number | null
          criadoem?: string
          datacontato?: string | null
          enviodisparo?: string | null
          horadisparo?: string | null
          id?: number
          imagem_incluir?: boolean | null
          imagem_url?: string | null
          intervalo?: string | null
          lista_id?: string | null
          login?: string | null
          MSG?: string | null
          nome?: string | null
          obs?: string | null
          status?: string | null
          tipo?: string | null
          TOTAL?: number | null
          whatsapp?: string | null
        }
        Update: {
          arquivo_conteudo?: string | null
          arquivo_extensao?: string | null
          arquivo_nome?: string | null
          ativo?: boolean | null
          base64img?: string | null
          categoria?: string | null
          COUNT?: number | null
          criadoem?: string
          datacontato?: string | null
          enviodisparo?: string | null
          horadisparo?: string | null
          id?: number
          imagem_incluir?: boolean | null
          imagem_url?: string | null
          intervalo?: string | null
          lista_id?: string | null
          login?: string | null
          MSG?: string | null
          nome?: string | null
          obs?: string | null
          status?: string | null
          tipo?: string | null
          TOTAL?: number | null
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
      Exercises: {
        Row: {
          category: string | null
          color: string | null
          created_at: string
          id: number
          image: string | null
          login: string | null
          name: string | null
          stars: string | null
        }
        Insert: {
          category?: string | null
          color?: string | null
          created_at?: string
          id?: number
          image?: string | null
          login?: string | null
          name?: string | null
          stars?: string | null
        }
        Update: {
          category?: string | null
          color?: string | null
          created_at?: string
          id?: number
          image?: string | null
          login?: string | null
          name?: string | null
          stars?: string | null
        }
        Relationships: []
      }
      food_logs: {
        Row: {
          ai_analysis: Json | null
          client_phone: string
          created_at: string
          date: string
          id: number
          image_url: string | null
          macros: Json | null
          manual_items: Json | null
          meal_time: string | null
          meal_type: string
          plate_weight: number
          professional_feedback: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          total_calories: number | null
          updated_at: string
        }
        Insert: {
          ai_analysis?: Json | null
          client_phone: string
          created_at?: string
          date: string
          id?: number
          image_url?: string | null
          macros?: Json | null
          manual_items?: Json | null
          meal_time?: string | null
          meal_type: string
          plate_weight: number
          professional_feedback?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          total_calories?: number | null
          updated_at?: string
        }
        Update: {
          ai_analysis?: Json | null
          client_phone?: string
          created_at?: string
          date?: string
          id?: number
          image_url?: string | null
          macros?: Json | null
          manual_items?: Json | null
          meal_time?: string | null
          meal_type?: string
          plate_weight?: number
          professional_feedback?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          total_calories?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "food_logs_client_fkey"
            columns: ["client_phone"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["phone"]
          },
          {
            foreignKeyName: "food_logs_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["phone"]
          },
        ]
      }
      funnel_configs: {
        Row: {
          color: string
          created_at: string | null
          id: string
          name: string
          order: number
          updated_at: string | null
        }
        Insert: {
          color?: string
          created_at?: string | null
          id?: string
          name: string
          order?: number
          updated_at?: string | null
        }
        Update: {
          color?: string
          created_at?: string | null
          id?: string
          name?: string
          order?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      HABITS: {
        Row: {
          category: string | null
          created_at: string
          date: string | null
          done: string | null
          habit: string | null
          id: number
          task: string | null
          user: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          date?: string | null
          done?: string | null
          habit?: string | null
          id?: number
          task?: string | null
          user?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          date?: string | null
          done?: string | null
          habit?: string | null
          id?: number
          task?: string | null
          user?: string | null
        }
        Relationships: []
      }
      LISTA_X: {
        Row: {
          created_at: string | null
          id: number
          login: string | null
          motivo: string | null
          nome: string | null
          telefone: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          login?: string | null
          motivo?: string | null
          nome?: string | null
          telefone: string
        }
        Update: {
          created_at?: string | null
          id?: number
          login?: string | null
          motivo?: string | null
          nome?: string | null
          telefone?: string
        }
        Relationships: []
      }
      LISTAS: {
        Row: {
          ativa: boolean | null
          categoria: string | null
          contatos: string | null
          created_at: string
          descricao: string | null
          id: number
          login: string | null
          nome: string | null
          total_contatos: number | null
          ultima_edicao: string | null
        }
        Insert: {
          ativa?: boolean | null
          categoria?: string | null
          contatos?: string | null
          created_at?: string
          descricao?: string | null
          id?: number
          login?: string | null
          nome?: string | null
          total_contatos?: number | null
          ultima_edicao?: string | null
        }
        Update: {
          ativa?: boolean | null
          categoria?: string | null
          contatos?: string | null
          created_at?: string
          descricao?: string | null
          id?: number
          login?: string | null
          nome?: string | null
          total_contatos?: number | null
          ultima_edicao?: string | null
        }
        Relationships: []
      }
      "LOGIN-DISPARADOR": {
        Row: {
          active: boolean | null
          count: string | null
          created_at: string
          id: number
          lastlogin: string | null
          login: string | null
          password: string | null
          quepasa: string | null
          status: string | null
        }
        Insert: {
          active?: boolean | null
          count?: string | null
          created_at?: string
          id?: number
          lastlogin?: string | null
          login?: string | null
          password?: string | null
          quepasa?: string | null
          status?: string | null
        }
        Update: {
          active?: boolean | null
          count?: string | null
          created_at?: string
          id?: number
          lastlogin?: string | null
          login?: string | null
          password?: string | null
          quepasa?: string | null
          status?: string | null
        }
        Relationships: []
      }
      meal_plans: {
        Row: {
          client_phone: string
          created_at: string
          daily_calories: number | null
          end_date: string | null
          goal: string | null
          id: number
          is_active: boolean
          macros: Json | null
          meals: Json | null
          name: string
          notes: string | null
          professional_phone: string
          start_date: string | null
          updated_at: string
        }
        Insert: {
          client_phone: string
          created_at?: string
          daily_calories?: number | null
          end_date?: string | null
          goal?: string | null
          id?: number
          is_active?: boolean
          macros?: Json | null
          meals?: Json | null
          name: string
          notes?: string | null
          professional_phone: string
          start_date?: string | null
          updated_at?: string
        }
        Update: {
          client_phone?: string
          created_at?: string
          daily_calories?: number | null
          end_date?: string | null
          goal?: string | null
          id?: number
          is_active?: boolean
          macros?: Json | null
          meals?: Json | null
          name?: string
          notes?: string | null
          professional_phone?: string
          start_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "meal_plans_client_fkey"
            columns: ["client_phone"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["phone"]
          },
          {
            foreignKeyName: "meal_plans_professional_fkey"
            columns: ["professional_phone"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["phone"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          id: number
          is_read: boolean
          message: string
          recipient_phone: string
          sender_phone: string | null
          title: string
          type: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          id?: number
          is_read?: boolean
          message: string
          recipient_phone: string
          sender_phone?: string | null
          title: string
          type: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          id?: number
          is_read?: boolean
          message?: string
          recipient_phone?: string
          sender_phone?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_recipient_fkey"
            columns: ["recipient_phone"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["phone"]
          },
          {
            foreignKeyName: "notifications_sender_fkey"
            columns: ["sender_phone"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["phone"]
          },
        ]
      }
      nutrition_database: {
        Row: {
          calories_per_100g: number
          carbs_per_100g: number
          category: string | null
          created_at: string
          created_by: string | null
          fat_per_100g: number
          fiber_per_100g: number | null
          id: number
          is_custom: boolean
          is_public: boolean
          name: string
          protein_per_100g: number
          sodium_per_100g: number | null
          updated_at: string
        }
        Insert: {
          calories_per_100g: number
          carbs_per_100g?: number
          category?: string | null
          created_at?: string
          created_by?: string | null
          fat_per_100g?: number
          fiber_per_100g?: number | null
          id?: number
          is_custom?: boolean
          is_public?: boolean
          name: string
          protein_per_100g?: number
          sodium_per_100g?: number | null
          updated_at?: string
        }
        Update: {
          calories_per_100g?: number
          carbs_per_100g?: number
          category?: string | null
          created_at?: string
          created_by?: string | null
          fat_per_100g?: number
          fiber_per_100g?: number | null
          id?: number
          is_custom?: boolean
          is_public?: boolean
          name?: string
          protein_per_100g?: number
          sodium_per_100g?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "nutrition_database_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["phone"]
          },
        ]
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
      professional_clients: {
        Row: {
          access_level: string
          client_phone: string
          created_at: string
          expires_at: string | null
          id: number
          invitation_code: string | null
          invitation_expires_at: string | null
          professional_phone: string
          started_at: string
          status: string
          updated_at: string
        }
        Insert: {
          access_level?: string
          client_phone: string
          created_at?: string
          expires_at?: string | null
          id?: number
          invitation_code?: string | null
          invitation_expires_at?: string | null
          professional_phone: string
          started_at?: string
          status?: string
          updated_at?: string
        }
        Update: {
          access_level?: string
          client_phone?: string
          created_at?: string
          expires_at?: string | null
          id?: number
          invitation_code?: string | null
          invitation_expires_at?: string | null
          professional_phone?: string
          started_at?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "professional_clients_client_fkey"
            columns: ["client_phone"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["phone"]
          },
          {
            foreignKeyName: "professional_clients_professional_fkey"
            columns: ["professional_phone"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["phone"]
          },
        ]
      }
      professional_stats: {
        Row: {
          active_clients: number
          avg_client_adherence: number | null
          created_at: string
          food_logs_reviewed: number
          id: number
          meal_plans_created: number
          month: string
          professional_phone: string
          total_clients: number
          updated_at: string
          workouts_assigned: number
        }
        Insert: {
          active_clients?: number
          avg_client_adherence?: number | null
          created_at?: string
          food_logs_reviewed?: number
          id?: number
          meal_plans_created?: number
          month: string
          professional_phone: string
          total_clients?: number
          updated_at?: string
          workouts_assigned?: number
        }
        Update: {
          active_clients?: number
          avg_client_adherence?: number | null
          created_at?: string
          food_logs_reviewed?: number
          id?: number
          meal_plans_created?: number
          month?: string
          professional_phone?: string
          total_clients?: number
          updated_at?: string
          workouts_assigned?: number
        }
        Relationships: [
          {
            foreignKeyName: "professional_stats_professional_fkey"
            columns: ["professional_phone"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["phone"]
          },
        ]
      }
      prospect_history: {
        Row: {
          author: string
          content: string
          created_at: string | null
          id: string
          prospect_id: string
          type: Database["public"]["Enums"]["history_entry_type"]
        }
        Insert: {
          author: string
          content: string
          created_at?: string | null
          id?: string
          prospect_id: string
          type: Database["public"]["Enums"]["history_entry_type"]
        }
        Update: {
          author?: string
          content?: string
          created_at?: string | null
          id?: string
          prospect_id?: string
          type?: Database["public"]["Enums"]["history_entry_type"]
        }
        Relationships: [
          {
            foreignKeyName: "prospect_history_prospect_id_fkey"
            columns: ["prospect_id"]
            isOneToOne: false
            referencedRelation: "prospects"
            referencedColumns: ["id"]
          },
        ]
      }
      prospect_images: {
        Row: {
          created_at: string | null
          description: string | null
          file_name: string
          file_path: string
          id: string
          prospect_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          file_name: string
          file_path: string
          id?: string
          prospect_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          file_name?: string
          file_path?: string
          id?: string
          prospect_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prospect_images_prospect_id_fkey"
            columns: ["prospect_id"]
            isOneToOne: false
            referencedRelation: "prospects"
            referencedColumns: ["id"]
          },
        ]
      }
      prospects: {
        Row: {
          about: string | null
          address: string | null
          average_ticket: number | null
          business_hours: string | null
          business_type: string | null
          company_name: string
          company_size: Database["public"]["Enums"]["company_size_type"] | null
          contact_name: string
          created_at: string | null
          custom_status: string | null
          daily_contacts: number | null
          digital_obs: string | null
          employee_count: number | null
          funnel_status_id: string | null
          google_business_rating: number | null
          google_reviews_count: number | null
          google_reviews_text: string | null
          has_bot: boolean | null
          id: string
          instagram: string | null
          instagram_last_post: string | null
          instagram_posts_count: number | null
          kanban_order: number | null
          last_message_received: string | null
          last_message_received_date: string | null
          last_message_sent: string | null
          last_message_sent_date: string | null
          monthly_revenue: number | null
          phone: string | null
          response_time: string | null
          service_rating: number | null
          temperature: Database["public"]["Enums"]["temperature_type"] | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          about?: string | null
          address?: string | null
          average_ticket?: number | null
          business_hours?: string | null
          business_type?: string | null
          company_name: string
          company_size?: Database["public"]["Enums"]["company_size_type"] | null
          contact_name: string
          created_at?: string | null
          custom_status?: string | null
          daily_contacts?: number | null
          digital_obs?: string | null
          employee_count?: number | null
          funnel_status_id?: string | null
          google_business_rating?: number | null
          google_reviews_count?: number | null
          google_reviews_text?: string | null
          has_bot?: boolean | null
          id?: string
          instagram?: string | null
          instagram_last_post?: string | null
          instagram_posts_count?: number | null
          kanban_order?: number | null
          last_message_received?: string | null
          last_message_received_date?: string | null
          last_message_sent?: string | null
          last_message_sent_date?: string | null
          monthly_revenue?: number | null
          phone?: string | null
          response_time?: string | null
          service_rating?: number | null
          temperature?: Database["public"]["Enums"]["temperature_type"] | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          about?: string | null
          address?: string | null
          average_ticket?: number | null
          business_hours?: string | null
          business_type?: string | null
          company_name?: string
          company_size?: Database["public"]["Enums"]["company_size_type"] | null
          contact_name?: string
          created_at?: string | null
          custom_status?: string | null
          daily_contacts?: number | null
          digital_obs?: string | null
          employee_count?: number | null
          funnel_status_id?: string | null
          google_business_rating?: number | null
          google_reviews_count?: number | null
          google_reviews_text?: string | null
          has_bot?: boolean | null
          id?: string
          instagram?: string | null
          instagram_last_post?: string | null
          instagram_posts_count?: number | null
          kanban_order?: number | null
          last_message_received?: string | null
          last_message_received_date?: string | null
          last_message_sent?: string | null
          last_message_sent_date?: string | null
          monthly_revenue?: number | null
          phone?: string | null
          response_time?: string | null
          service_rating?: number | null
          temperature?: Database["public"]["Enums"]["temperature_type"] | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prospects_funnel_status_id_fkey"
            columns: ["funnel_status_id"]
            isOneToOne: false
            referencedRelation: "funnel_configs"
            referencedColumns: ["id"]
          },
        ]
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
      training_schedule: {
        Row: {
          assigned_by_professional: string | null
          completed: boolean
          created_at: string
          date: string
          id: number
          login: string
          mode: string
          notes: string | null
          professional_notes: string | null
          workout_id: string | null
          workout_name: string | null
        }
        Insert: {
          assigned_by_professional?: string | null
          completed?: boolean
          created_at?: string
          date: string
          id?: number
          login: string
          mode?: string
          notes?: string | null
          professional_notes?: string | null
          workout_id?: string | null
          workout_name?: string | null
        }
        Update: {
          assigned_by_professional?: string | null
          completed?: boolean
          created_at?: string
          date?: string
          id?: number
          login?: string
          mode?: string
          notes?: string | null
          professional_notes?: string | null
          workout_id?: string | null
          workout_name?: string | null
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
      weight_records: {
        Row: {
          created_at: string | null
          date: string
          focus: string | null
          goal_weight: number | null
          id: number
          login: string
          professional_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          weight: number
        }
        Insert: {
          created_at?: string | null
          date: string
          focus?: string | null
          goal_weight?: number | null
          id?: number
          login: string
          professional_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          weight: number
        }
        Update: {
          created_at?: string | null
          date?: string
          focus?: string | null
          goal_weight?: number | null
          id?: number
          login?: string
          professional_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          weight?: number
        }
        Relationships: []
      }
      workout_history: {
        Row: {
          completed: boolean
          completed_at: string | null
          duration_seconds: number
          id: number
          login: string
          started_at: string
          stopped_at_exercise: number
          stopped_at_round: number
          total_exercises_done: number
          workout_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          duration_seconds?: number
          id?: number
          login: string
          started_at?: string
          stopped_at_exercise?: number
          stopped_at_round?: number
          total_exercises_done?: number
          workout_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          duration_seconds?: number
          id?: number
          login?: string
          started_at?: string
          stopped_at_exercise?: number
          stopped_at_round?: number
          total_exercises_done?: number
          workout_id?: string
        }
        Relationships: []
      }
      Workouts: {
        Row: {
          assigned_to_client: string | null
          assignment_date: string | null
          assignment_notes: string | null
          break_time: number | null
          cover_image: string | null
          created_at: string
          created_by_professional: string | null
          exercises: string | null
          focus_time: number | null
          id: number
          is_template: boolean | null
          login: string | null
          name: string | null
          rounds: number | null
          stars: string | null
          template_category: string | null
          total_time: number | null
        }
        Insert: {
          assigned_to_client?: string | null
          assignment_date?: string | null
          assignment_notes?: string | null
          break_time?: number | null
          cover_image?: string | null
          created_at?: string
          created_by_professional?: string | null
          exercises?: string | null
          focus_time?: number | null
          id?: number
          is_template?: boolean | null
          login?: string | null
          name?: string | null
          rounds?: number | null
          stars?: string | null
          template_category?: string | null
          total_time?: number | null
        }
        Update: {
          assigned_to_client?: string | null
          assignment_date?: string | null
          assignment_notes?: string | null
          break_time?: number | null
          cover_image?: string | null
          created_at?: string
          created_by_professional?: string | null
          exercises?: string | null
          focus_time?: number | null
          id?: number
          is_template?: boolean | null
          login?: string | null
          name?: string | null
          rounds?: number | null
          stars?: string | null
          template_category?: string | null
          total_time?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_invitation_code: { Args: never; Returns: string }
    }
    Enums: {
      company_size_type:
        | "MEI"
        | "Pequena"
        | "Média"
        | "Grande"
        | "Multinacional"
      history_entry_type:
        | "message_sent"
        | "message_received"
        | "call"
        | "meeting"
        | "note"
      temperature_type: "hot" | "warm" | "cold"
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
    Enums: {
      company_size_type: ["MEI", "Pequena", "Média", "Grande", "Multinacional"],
      history_entry_type: [
        "message_sent",
        "message_received",
        "call",
        "meeting",
        "note",
      ],
      temperature_type: ["hot", "warm", "cold"],
    },
  },
} as const
