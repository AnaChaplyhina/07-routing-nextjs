import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Providers from "@/components/Providers/Providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
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