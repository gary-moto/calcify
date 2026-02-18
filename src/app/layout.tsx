import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Calcify - Free Online Calculators",
    template: "%s | Calcify",
  },
  description: "Free online calculators for everyday math. Age calculator, percentage calculator, date calculator, tip calculator and more. Fast, accurate, no signup required.",
  keywords: ["calculator", "online calculator", "age calculator", "percentage calculator", "date calculator", "tip calculator", "free calculator"],
  authors: [{ name: "Calcify" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Calcify",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
