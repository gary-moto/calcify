"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, Menu, X } from "lucide-react";
import { useState } from "react";

const calculators = [
  { href: "/pregnancy-calculator", label: "Pregnancy", fullLabel: "Pregnancy Calculator" },
  { href: "/age-calculator", label: "Age", fullLabel: "Age Calculator" },
  { href: "/tip-calculator", label: "Tip", fullLabel: "Tip Calculator" },
  { href: "/date-calculator", label: "Date", fullLabel: "Date Calculator" },
  { href: "/percentage-calculator", label: "Percentage", fullLabel: "Percentage Calculator" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-indigo-600 font-bold text-xl flex-shrink-0">
            <Calculator className="w-6 h-6" />
            <span>Calcify</span>
          </Link>

          {/* Desktop Navigation - Full names on xl, short on lg */}
          <nav className="hidden lg:flex items-center gap-1">
            {calculators.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className={`px-3 py-2 rounded-lg text-base font-medium transition-colors whitespace-nowrap ${
                  pathname === calc.href
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className="hidden xl:inline">{calc.fullLabel}</span>
                <span className="xl:hidden">{calc.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-100">
            {calculators.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === calc.href
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {calc.fullLabel}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
