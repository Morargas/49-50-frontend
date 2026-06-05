import { restaurantInfo } from "~/data/restaurant";
//Компонент нижней части страницы
export default function Footer() {
  return (
    <footer className="bg-tom-thumb-950 text-tom-thumb-100 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-lg font-bold text-white mb-2">{restaurantInfo.name}</p>
        <p>{restaurantInfo.address}</p>
        <p>{restaurantInfo.phone}</p>
        <p>{restaurantInfo.workHours}</p>
      </div>
    </footer>
  );
}