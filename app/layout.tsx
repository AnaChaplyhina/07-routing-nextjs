import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Providers from "@/components/Providers/Providers";

// Налаштовуємо шрифт Inter
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Manage your notes easily",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Додаємо клас шрифту до body */}
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}