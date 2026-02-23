import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
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
  description: "Free online calculators for everyday math. Pregnancy due date, age, tip, date, percentage, tariff, mortgage, and income tax calculators. Fast, accurate, mobile-friendly — no signup required. Updated for 2025-2026.",
  keywords: [
    "calculator", "online calculator", "free calculator", "math calculator", "quick calculator",
    "age calculator", "how old am I", "birthday calculator", "calculate my age",
    "pregnancy calculator", "due date calculator", "pregnancy week calculator", "when is my baby due",
    "percentage calculator", "percent calculator", "percentage increase calculator", "how to calculate percentage",
    "date calculator", "days between dates", "date difference calculator", "how many days until",
    "tip calculator", "bill splitter", "gratuity calculator", "how much to tip",
    "tariff calculator", "import duty calculator", "customs duty calculator", "US tariff calculator",
    "mortgage calculator", "home loan calculator", "monthly payment calculator", "how much house can I afford",
    "tax calculator", "income tax calculator", "federal tax calculator", "take home pay calculator", "tax bracket calculator",
    "calcify", "calcify.io", "everyday calculator", "useful calculators", "all in one calculator",
    "free online tools", "no signup calculator", "instant calculator", "fast calculator",
  ],
  authors: [{ name: "Calcify" }],
  metadataBase: new URL("https://calcify.io"),
  alternates: {
    canonical: "https://calcify.io",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://calcify.io",
    siteName: "Calcify",
    title: "Calcify - Free Online Calculators",
    description: "Free online calculators for everyday math. Fast, accurate, no signup required.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calcify - Free Online Calculators",
    description: "Free online calculators for everyday math. Fast, accurate, no signup required.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "W-hqGKgg2OkYJvq-HQqmEqiEbPiYrryPDdGbipjpnE8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2929111398730262"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex`}>
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen pt-14 lg:pt-0">
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
