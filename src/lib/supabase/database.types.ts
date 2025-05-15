export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      areas_atuacao: {
        Row: {
          id: number
          nome: string
          created_at: string
        }
        Insert: {
          id?: number
          nome: string
          created_at?: string
        }
        Update: {
          id?: number
          nome?: string
          created_at?: string
        }
      }
      certificacoes: {
        Row: {
          id: number
          nome: string
          created_at: string
        }
        Insert: {
          id?: number
          nome: string
          created_at?: string
        }
        Update: {
          id?: number
          nome?: string
          created_at?: string
        }
      }
      formas_ajuda: {
        Row: {
          id: number
          nome: string
          created_at: string
        }
        Insert: {
          id?: number
          nome: string
          created_at?: string
        }
        Update: {
          id?: number
          nome?: string
          created_at?: string
        }
      }
      ong_areas_atuacao: {
        Row: {
          ong_id: string
          area_id: number
        }
        Insert: {
          ong_id: string
          area_id: number
        }
        Update: {
          ong_id?: string
          area_id?: number
        }
      }
      ong_certificacoes: {
        Row: {
          ong_id: string
          certificacao_id: number
        }
        Insert: {
          ong_id: string
          certificacao_id: number
        }
        Update: {
          ong_id?: string
          certificacao_id?: number
        }
      }
      ong_formas_ajuda: {
        Row: {
          ong_id: string
          forma_id: number
          descricao: string | null
        }
        Insert: {
          ong_id: string
          forma_id: number
          descricao?: string | null
        }
        Update: {
          ong_id?: string
          forma_id?: number
          descricao?: string | null
        }
      }
      ongs: {
        Row: {
          id: string
          user_id: string
          nome: string
          nome_fantasia: string | null
          descricao_curta: string
          descricao_completa: string
          ano_fundacao: number
          causa: string
          logo_url: string | null
          imagem_capa_url: string | null
          endereco: string | null
          cidade: string
          estado: string
          cep: string | null
          telefone: string | null
          email: string
          site: string | null
          facebook: string | null
          instagram: string | null
          cnpj: string | null
          responsavel: string
          cargo_responsavel: string
          publico_alvo: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          nome: string
          nome_fantasia?: string | null
          descricao_curta: string
          descricao_completa: string
          ano_fundacao: number
          causa: string
          logo_url?: string | null
          imagem_capa_url?: string | null
          endereco?: string | null
          cidade?: string
          estado?: string
          cep?: string | null
          telefone?: string | null
          email: string
          site?: string | null
          facebook?: string | null
          instagram?: string | null
          cnpj?: string | null
          responsavel: string
          cargo_responsavel: string
          publico_alvo?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          nome?: string
          nome_fantasia?: string | null
          descricao_curta?: string
          descricao_completa?: string
          ano_fundacao?: number
          causa?: string
          logo_url?: string | null
          imagem_capa_url?: string | null
          endereco?: string | null
          cidade?: string
          estado?: string
          cep?: string | null
          telefone?: string | null
          email?: string
          site?: string | null
          facebook?: string | null
          instagram?: string | null
          cnpj?: string | null
          responsavel?: string
          cargo_responsavel?: string
          publico_alvo?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          role: "admin" | "ong"
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: "admin" | "ong"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: "admin" | "ong"
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
