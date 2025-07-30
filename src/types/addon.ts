export interface Ingredient {
  id: number;
  name: string;
  unit: string;
  unit_price: string;
  stock_quantity: string;
  thumbnail: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductAddon {
  id: number;
  product_id: number;
  ingredient_id: number;
  extra_price: string;
  max_quantity: number | null;
  is_required: boolean;
  order: number | null;
  created_at: string;
  updated_at: string;
  ingredient: Ingredient;
}
