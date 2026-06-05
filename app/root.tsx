import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { AuthProvider } from "~/hooks/useAuth";
import { CartProvider } from "~/hooks/useCart";
import "./app.css";

export default function RootLayout() {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
              <Header />
              <main className="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
                <Outlet />
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}