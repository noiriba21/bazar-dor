import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const bengali = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "বাজার দর | আজকের বাজারের সঠিক দরদাম",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" data-theme="light">
      <body className={bengali.className}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}