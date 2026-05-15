import "./globals.css";
import AppToaster from "@/components/common/AppToaster";
import AuthSessionManager from "@/components/auth/AuthSessionManager";
import CartSessionManager from "@/components/cart/CartSessionManager";

export const metadata = {
  title: "SPCS India - The Home of Malayalam Literature",
  description: "Sahithya Pravarthaka Co-operative Society",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className="bg-background-light dark:bg-background-dark text-text-main antialiased overflow-x-hidden flex flex-col min-h-screen font-sans">
        <AuthSessionManager />
        <CartSessionManager />
        {children}
        <AppToaster />
      </body>
    </html>
  );
}
