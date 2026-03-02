/**
 * Tipos e interfaces para linhas de produtos
 */

export type ProductLine = string;

export interface WoodColor {
  id: string;
  name: string;
  hexCode?: string;
  imageName?: string;
  category: string;
  slatImage?: string | null;
}

export interface ProductLineConfig {
  id: ProductLine;
  name: string;
  displayName: string;
  description: string;
  colors: WoodColor[];
  solidColors: WoodColor[];
  hasBonus?: boolean;
  bonusTitle?: string;
  bonusDescription?: string;
}

export interface ColorSelection {
  line: ProductLine;
  color: WoodColor;
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
