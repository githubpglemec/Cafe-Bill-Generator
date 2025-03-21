
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  variant?: string;
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description?: string;
  variants?: { name: string; price: number }[];
}
