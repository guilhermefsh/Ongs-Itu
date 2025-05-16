export interface Area {
    id: string
    nome: string
    descricao?: string
}

export interface NGO {
    id: string
    nome: string
    descricao: string
    email: string
    telefone?: string
    site?: string
    facebook?: string
    instagram?: string
    endereco?: string
    cidade?: string
    estado?: string
    cep?: string
    responsavel: string
    cargo_responsavel: string
    logo_url?: string
    capa_url?: string
    areas?: Area[]
}

export interface HelpForm {
    id: string
    nome: string
    descricao?: string
}

export interface Certification {
    id: string
    nome: string
}


export interface Area {
    id: string
    nome: string
}

export interface HelpForm {
    id: string
    nome: string
    descricao?: string
}

export interface Certification {
    id: string
    nome: string
}

export interface Organization {
    id: string
    nome: string
    nome_fantasia?: string
    ano_fundacao: string
    causa: string
    descricao_curta: string
    descricao_completa: string
    publico_alvo?: string
    logo_url?: string
    imagem_capa_url?: string
    email: string
    telefone?: string
    site?: string
    facebook?: string
    instagram?: string
    endereco?: string
    cidade?: string
    estado?: string
    cep?: string
    responsavel?: string
    cargo_responsavel?: string
    cnpj?: string
    status: string
}

export interface AreaResponse {
    area_id: string
    areas_atuacao: {
        id: string
        nome: string
    }
}

export interface HelpFormResponse {
    forma_id: string
    descricao: string
    formas_ajuda: {
        id: string
        nome: string
    }
}

export interface CertificationResponse {
    certificacao_id: string
    certificacoes: {
        id: string
        nome: string
    }[]
}