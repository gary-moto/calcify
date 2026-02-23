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
  description: "Free online calculators for everyday math. Age calculator, pregnancy due date calculator, percentage calculator, date calculator, tip calculator and more. Fast, accurate, no signup required.",
  keywords: [
    "calculator", "online calculator", "free calculator", "math calculator",
    "age calculator", "how old am I", "birthday calculator",
    "pregnancy calculator", "due date calculator", "pregnancy week calculator",
    "percentage calculator", "percent calculator", "percentage increase calculator",
    "date calculator", "days between dates", "date difference calculator",
    "tip calculator", "bill splitter", "gratuity calculator",
    "calcify", "calcify.io", "everyday calculator", "quick calculator",
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
