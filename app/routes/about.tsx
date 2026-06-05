import { restaurantInfo } from "~/data/restaurant";
import restaurantImage from "~/assets/cave.jpg";

export function meta() {
    return [{ title: "О нас | Пещера" }];
}

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <section className="bg-tom-thumb-50 rounded-3xl p-8 shadow-sm">
                <h1 className="text-4xl font-bold text-tom-thumb-900 mb-4">О нас</h1>
                <p className="text-lg text-tom-thumb-700 leading-relaxed">
                    Пещера — ресторан с уютной атмосферой и современной европейской кухней. Мы готовим блюда из свежих продуктов, уделяем внимание качеству и создаём тёплую обстановку для гостей.
                </p>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-semibold text-tom-thumb-900 mb-3">Наши преимущества</h2>
                    <ul className="space-y-3 text-tom-thumb-700">
                        <li>Свежие ингредиенты и авторские рецепты</li>
                        <li>Быстрое обслуживание и внимательный персонал</li>
                        <li>Удобное расположение в центре города</li>
                        <li>Уютный интерьер и вечерняя атмосфера</li>
                    </ul>
                </div>
                <div className="rounded-3xl bg-white p-8 shadow-sm flex items-center justify-center">
                    <img
                        src={restaurantImage}
                        alt="Ресторан Пещера"
                        className="w-full h-auto rounded-2xl object-cover"
                    />
                </div>
            </section>
        </div>
    );
}