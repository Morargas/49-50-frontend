import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem, MenuItem } from "~/types";
//Интерфейс для корзины и её свойств
interface CartContextValue {
    items: CartItem[];
    totalAmount: number;
    totalCount: number;
    addItem: (item: MenuItem) => void;
    updateQuantity: (id: number, newQty: number) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
}
//Глобальное хранилище корзины
const CartContext = createContext<CartContextValue | null>(null);
//компонент для корзины, для работы корзины в любом месте приложения (Провайдер)
export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const totalAmount = useMemo(
        () => items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0),
        [items]
    );

    const totalCount = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items]
    );
    const addItem = (menuItem: MenuItem) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.menuItem.id === menuItem.id);
            if (existing) {
                return prev.map((item) =>
                    item.menuItem.id === menuItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { menuItem, quantity: 1 }];
        });
    };

    const updateQuantity = (id: number, newQty: number) => {
        setItems((prev) =>
            prev
                .map((item) =>
                    item.menuItem.id === id ? { ...item, quantity: newQty } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeItem = (id: number) => {
        setItems((prev) => prev.filter((item) => item.menuItem.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    return (
        <CartContext.Provider
            value={{ items, totalAmount, totalCount, addItem, updateQuantity, removeItem, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}