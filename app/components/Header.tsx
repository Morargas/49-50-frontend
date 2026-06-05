import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useAuth } from "~/hooks/useAuth";
import { LuUser, LuLogOut, LuLogIn, LuShoppingCart, LuHistory } from "react-icons/lu";

export default function Header() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    setIsMenuOpen(false);
    await logout();
    navigate("/");
  };

  return (
    <header className="bg-tom-thumb-800 text-white shadow-md">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide hover:text-tom-thumb-100 transition-colors">
          Пещера
        </Link>

        <div className="flex gap-8 text-lg items-center">
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? "text-tom-thumb-100 font-medium" : "text-white hover:text-tom-thumb-200 transition-colors"}
          >
            Главная
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) => isActive ? "text-tom-thumb-100 font-medium" : "text-white hover:text-tom-thumb-200 transition-colors"}
          >
            Меню
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => isActive ? "text-tom-thumb-100 font-medium flex items-center gap-1" : "text-white hover:text-tom-thumb-200 transition-colors flex items-center gap-1"}
          >
            <LuShoppingCart className="w-5 h-5" />
            <span>Корзина</span>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => isActive ? "text-tom-thumb-100 font-medium" : "text-white hover:text-tom-thumb-200 transition-colors"}
          >
            О нас
          </NavLink>

          <span className="w-px h-6 bg-tom-thumb-600"></span>
          {!loading && (
            user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 bg-tom-thumb-900/40 px-4 py-2 rounded-xl border border-tom-thumb-700/50 hover:bg-tom-thumb-900/60 transition-colors"
                >
                  <LuUser className="w-5 h-5 text-tom-thumb-200" />
                  <span className="text-sm font-medium max-w-[120px] truncate" title={user.name}>
                    {user.name}
                  </span>
                </button>

                {isMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 border border-stone-100 z-20 text-stone-800 animate-in fade-in slide-in-from-top-1 duration-100">
                      <Link
                        to="/orders"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-stone-50 text-stone-700 hover:text-tom-thumb-900 transition-colors"
                      >
                        <LuHistory className="w-4 h-4 text-stone-400" />
                        <span>История заказов</span>
                      </Link>
                      <hr className="border-stone-100 my-1" />
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-red-50 text-red-600 transition-colors text-left"
                      >
                        <LuLogOut className="w-4 h-4" />
                        <span>Выйти</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-2 bg-white text-tom-thumb-800 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-tom-thumb-100 transition-colors shadow-sm"
              >
                <LuLogIn className="w-4 h-4" />
                <span>Войти</span>
              </Link>
            )
          )}
        </div>
      </nav>
    </header>
  );
}