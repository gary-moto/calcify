import Link from "next/link";
import { Calculator } from "lucide-react";

const footerLinks = [
  { href: "/pregnancy-calculator", label: "Pregnancy" },
  { href: "/age-calculator", label: "Age" },
  { href: "/tip-calculator", label: "Tip" },
  { href: "/date-calculator", label: "Date" },
  { href: "/percentage-calculator", label: "Percentage" },
  { href: "/tariff-calculator", label: "Tariff" },
  { href: "/mortgage-calculator", label: "Mortgage" },
  { href: "/tax-calculator", label: "Tax" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Top row: Logo + Nav */}
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-2 text-gray-600">
            <Calculator className="w-5 h-5" />
            <span className="font-medium">Calcify</span>
            <span className="text-sm text-gray-400">— Free calculators for everyone</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-gray-500">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-indigo-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom row: Copyright + Legal */}
        <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-400">
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
