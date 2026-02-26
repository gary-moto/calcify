"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calculator, Baby, Calendar, Receipt, Clock, Percent, Scale, Home as HomeIcon,
  Landmark, FileText, Menu, X, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";

const calculators = [
  { href: "/", label: "Home", icon: HomeIcon, color: "text-indigo-500" },
  { href: "/pregnancy-calculator", label: "Pregnancy", icon: Baby, color: "text-pink-500" },
  { href: "/age-calculator", label: "Age", icon: Calendar, color: "text-purple-500" },
  { href: "/tip-calculator", label: "Tip", icon: Receipt, color: "text-orange-500" },
  { href: "/date-calculator", label: "Date", icon: Clock, color: "text-emerald-500" },
  { href: "/percentage-calculator", label: "Percentage", icon: Percent, color: "text-blue-500" },
  { href: "/tariff-calculator", label: "Tariff", icon: Scale, color: "text-red-500" },
  { href: "/mortgage-calculator", label: "Mortgage", icon: Landmark, color: "text-cyan-600" },
  { href: "/tax-calculator", label: "Tax", icon: FileText, color: "text-amber-600" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm h-14 flex items-center px-4">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          className="p-2 text-gray-600 hover:text-gray-900"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <Link href="/" className="flex items-center gap-2 text-indigo-600 font-bold text-lg ml-2">
          <Calculator className="w-5 h-5" />
          <span>Calcify</span>
        </Link>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-100 shadow-sm z-40 transition-all duration-300 flex flex-col
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${collapsed ? "w-[68px]" : "w-56"}
        `}
      >
        {/* Logo */}
        <div className={`h-14 flex items-center border-b border-gray-100 flex-shrink-0 ${collapsed ? "justify-center px-2" : "px-4"}`}>
          <Link href="/" className="flex items-center gap-2 text-indigo-600 font-bold text-lg">
            <Calculator className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Calcify</span>}
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            const isActive = pathname === calc.href;
            return (
              <Link
                key={calc.href}
                href={calc.href}
                title={calc.label}
                className={`flex items-center gap-3 rounded-lg transition-colors ${
                  collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5"
                } ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-indigo-600" : calc.color}`} />
                {!collapsed && <span className="text-sm">{calc.label} Calculator</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle - desktop only */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
          className="hidden lg:flex items-center justify-center h-10 border-t border-gray-100 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </aside>

      {/* Spacer to push content right */}
      <div className={`hidden lg:block flex-shrink-0 transition-all duration-300 ${collapsed ? "w-[68px]" : "w-56"}`} />
    </>
  );
}
