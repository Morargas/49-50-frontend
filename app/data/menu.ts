import type { MenuItem } from "~/types";
//Создаем переменную (хранящей массив), в которой хранятся наши блюда
export const menuData: MenuItem[] = [
  {
    id: 1,
    name: "Авокадо",
    description: "Это авокадо",
    price: 2050,
    category: "Закуски",
    image: new URL("../assets/avocado.jpg", import.meta.url).href,
  },
  {
    id: 2,
    name: "Пиво",
    description: "Это пиво",
    price: 250,
    category: "Напитки",
    image: new URL("../assets/beer.jpg", import.meta.url).href,
  },
  {
    id: 3,
    name: "Мороженое",
    description: "Это мороженое",
    price: 250,
    category: "Десерты",
    image: new URL("../assets/icecream.jpg", import.meta.url).href,
  },
  {
    id: 4,
    name: "Стейк",
    description: "Это стейк (пережаренный в хлам)",
    price: 250,
    category: "Основные блюда",
    image: new URL("../assets/steak.jpg", import.meta.url).href,
  }
]