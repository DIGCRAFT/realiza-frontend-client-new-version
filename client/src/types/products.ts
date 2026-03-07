export interface Color {
  id: string;
  name: string;
  hexCode?: string; // Mantém funcionando seus amadeirados
  image?: string;   // Adiciona suporte para as fotos das cores sólidas
  category: 'solid' | 'wood';
  imageName?: string;
}

export interface ProductLineConfig {
  id: string;
  name: string;
  displayName: string;
  description: string;
  colors: Color[];
  solidColors: Color[];
  hasBonus?: boolean;
  bonusTitle?: string;
  bonusDescription?: string;
}

// Interfaces auxiliares para o formulário de orçamento
export interface ColorSelection {
  line: string;
  color: Color;
  quantity?: number;
  notes?: string;
}

export interface BudgetRequest {
  name: string;
  email: string;
  phone: string;
  selections: ColorSelection[];
  message?: string;
}

export interface WoodColor {
  id: string;
  name: string;
  hexCode?: string;
  imageName?: string;
  category: string;
  slatImage?: string | null;
}