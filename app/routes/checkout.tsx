import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useCart } from "~/hooks/useCart";
import { useAuth } from "~/hooks/useAuth";
import Modal from "~/components/ui/Modal";
import Button from "~/components/ui/Button";
import apiClient from "~/services/apiClient";

interface CheckoutFormData {
  name: string;
  phone: string;
  comment: string;
  paymentMethod: "card" | "cash";
}

export function meta() {
  return [{ title: "Оформление заказа | Пещера" }];
}

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<CheckoutFormData>({
    defaultValues: {
      paymentMethod: "card",
      comment: ""
    }
  });

  const watchedName = watch("name");
  const watchedPhone = watch("phone");

  useEffect(() => {
    if (user?.name) {
      setValue("name", user.name);
    }
  }, [user, setValue]);

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-stone-700 mb-4">
          Нечего оформлять
        </h2>
        <Link to="/menu" className="text-tom-thumb-600 hover:underline text-lg">
          Перейти в меню
        </Link>
      </div>
    );
  }
  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);

    const orderData = {
      customer: {
        name: data.name,
        phone: data.phone,
        comment: data.comment,
        paymentMethod: data.paymentMethod
      },
      items: items.map(item => ({
        id: item.menuItem.id,
        name: item.menuItem.name,
        price: item.menuItem.price,
        quantity: item.quantity
      })),
      total: totalAmount,
      userId: user ? user.uid : null
    };

    try {
      await apiClient.post("/orders", orderData);
      setIsProcessing(false);
      setIsModalOpen(true);
    } catch (error) {
      setIsProcessing(false);
      alert("Не удалось отправить заказ. Проверьте подключение к серверу.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    clearCart();
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-tom-thumb-900 mb-8 text-center">
        Оформление заказа
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-stone-700 font-medium mb-2">
            Ваше имя *
          </label>
          <input
            type="text"
            placeholder="Иван Иванов"
            className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tom-thumb-400"
            {...register("name", { required: "Укажите ваше имя" })}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-stone-700 font-medium mb-2">
            Телефон *
          </label>
          <input
            type="tel"
            placeholder="+7 (999) 123-45-67"
            className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tom-thumb-400"
            {...register("phone", { required: "Укажите номер телефона" })}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-stone-700 font-medium mb-2">
            Комментарий к заказу
          </label>
          <textarea
            rows={3}
            placeholder="Пожелания, аллергии..."
            className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tom-thumb-400"
            {...register("comment")}
          />
        </div>

        <div>
          <label className="block text-stone-700 font-medium mb-2">
            Способ оплаты
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="card"
                className="accent-tom-thumb-600"
                {...register("paymentMethod")}
              />
              Картой онлайн
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="cash"
                className="accent-tom-thumb-600"
                {...register("paymentMethod")}
              />
              Наличными
            </label>
          </div>
        </div>

        <div className="bg-stone-100 rounded-2xl p-5">
          <h3 className="font-bold text-stone-800 mb-3">Ваш заказ:</h3>
          {items.map((item) => (
            <div
              key={item.menuItem.id}
              className="flex justify-between text-sm text-stone-600 py-1"
            >
              <span>
                {item.menuItem.name} × {item.quantity}
              </span>
              <span>{item.menuItem.price * item.quantity} ₽</span>
            </div>
          ))}
          <div className="border-t border-stone-300 mt-3 pt-3 flex justify-between font-bold text-lg">
            <span>Итого:</span>
            <span className="text-tom-thumb-700">{totalAmount} ₽</span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isProcessing}
          className="w-full py-4 text-lg"
        >
          {isProcessing ? "Обработка платежа..." : "Оплатить заказ"}
        </Button>
      </form>
      <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Заказ оформлен!"
        >
          <div className="text-center py-4">
            <p className="text-lg text-stone-700 mb-2">
              Спасибо, {watchedName}!
            </p>
            <p className="text-stone-500 mb-6">
              Ваш заказ на сумму {totalAmount} ₽ принят.
              Мы свяжемся с вами по телефону {watchedPhone}.
            </p>
            <Button onClick={handleCloseModal} className="w-full">
              На главную
            </Button>
          </div>
        </Modal>
      </div>
    );
}