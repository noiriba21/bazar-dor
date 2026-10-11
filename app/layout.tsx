import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      data-theme="light"
      data-scroll-behavior="smooth"
      className="scroll-smooth"
    >
      <body className="flex min-h-screen flex-col bg-base-100 text-base-content">
        <Suspense fallback={<div className="h-24 border-b bg-white" />}>
          <Navbar />
        </Suspense>
        <Suspense fallback={<div className="h-10 bg-gray-100" />}>
          <Ticker />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}