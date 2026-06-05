//Создаем интерфейс TypeScript для блюд из меню
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: "Закуски" | "Основные блюда" | "Десерты" | "Напитки";
  image: string;
}
//О предметах в корзине
export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}
//Для информации о ресторане
export interface RestaurantInfo {
  name: string;
  address: string;
  phone: string;
  workHours: string;
}
//Для данных заказа
export interface OrderData {
  items: CartItem[];
  total: number;
  customerName: string;
}
//Для клиентов
export interface CustomerInfo {
  name: string;
  phone: string;
  comment?: string;
  paymentMethod: "card" | "cash";
}
//Для заказа (статуса и свойств)
export interface ServerOrder {
  id: string;
  userId: string | null;
  customer: CustomerInfo;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: "Новый" | "Готовится" | "В пути" | "Доставлен";
  created_at: string;
}
//Для профилей пользователей
export interface UserProfile {
  uid: string;
  email: string | null;
  name?: string;
}