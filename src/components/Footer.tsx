import Link from "next/link";
import { Calculator } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Calculator className="w-5 h-5" />
            <span className="font-medium">Calcify</span>
            <span className="text-sm text-gray-400">— Free calculators for everyone</span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <Link href="/pregnancy-calculator" className="hover:text-indigo-600 transition-colors">
              Pregnancy Calculator
            </Link>
            <Link href="/age-calculator" className="hover:text-indigo-600 transition-colors">
              Age Calculator
            </Link>
            <Link href="/tip-calculator" className="hover:text-indigo-600 transition-colors">
              Tip Calculator
            </Link>
            <Link href="/date-calculator" className="hover:text-indigo-600 transition-colors">
              Date Calculator
            </Link>
            <Link href="/percentage-calculator" className="hover:text-indigo-600 transition-colors">
              Percentage Calculator
            </Link>
            <Link href="/tariff-calculator" className="hover:text-indigo-600 transition-colors">
              Tariff Calculator
            </Link>
          </nav>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-gray-400">
          <span>© {new Date().getFullYear()} Calcify. All rights reserved.</span>
          <nav className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Use</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
