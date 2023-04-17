export interface Restaurant {
  id: string;
  name: string;
  thumbnail: string;
  redirectTo: string;
}

export interface Category {
  id: number;
  restaurant_id: number;
  name: string;
  description: string;
  products?: Product[];
}

export interface Product {
  id: number;
  category_id: number;
  name: string;
  description: string;
}
