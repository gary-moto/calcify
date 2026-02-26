import { Metadata } from "next";
import Link from "next/link";
import { Calendar, Percent, Clock, Receipt, ArrowRight, Baby, Scale, Landmark, FileText } from "lucide-react";
import CalculatorLayout from "@/components/CalculatorLayout";

export const metadata: Metadata = {
  title: "Calcify - Free Online Calculators",
  description: "Free online calculators for pregnancy, age, tip, date, percentage, tariff, mortgage, and tax. Fast, accurate, and easy to use.",
  alternates: { canonical: "https://calcify.io" },
  keywords: ["online calculator", "free calculator", "pregnancy calculator", "age calculator", "tip calculator", "mortgage calculator", "tax calculator", "percentage calculator", "date calculator", "tariff calculator", "calcify"],
};

const calculators = [
  {
    href: "/pregnancy-calculator",
    title: "Pregnancy Calculator",
    description: "Calculate your due date, current pregnancy week, trimester, and important milestones throughout your journey.",
    icon: Baby,
    color: "bg-pink-500",
    lightColor: "bg-pink-50",
  },
  {
    href: "/age-calculator",
    title: "Age Calculator",
    description: "Calculate your exact age in years, months, days, hours, and minutes. Find out how many days until your next birthday.",
    icon: Calendar,
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
  },
  {
    href: "/tip-calculator",
    title: "Tip Calculator",
    description: "Calculate the tip amount and total bill. Split the bill between multiple people with custom tip percentages.",
    icon: Receipt,
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
  },
  {
    href: "/date-calculator",
    title: "Date Calculator",
    description: "Calculate the number of days between two dates. Add or subtract days from any date to find a new date.",
    icon: Clock,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50",
  },
  {
    href: "/percentage-calculator",
    title: "Percentage Calculator",
    description: "Calculate percentages easily. Find what percent one number is of another, increase/decrease by percentage, and more.",
    icon: Percent,
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
  },
  {
    href: "/tariff-calculator",
    title: "Tariff Calculator",
    description: "Calculate US import tariffs, duties, and total landed costs. Estimate how tariffs affect the price of imported goods.",
    icon: Scale,
    color: "bg-red-500",
    lightColor: "bg-red-50",
  },
  {
    href: "/mortgage-calculator",
    title: "Mortgage Calculator",
    description: "Calculate monthly mortgage payments, total interest, and view amortization schedules. Includes property tax, insurance, and PMI.",
    icon: Landmark,
    color: "bg-cyan-600",
    lightColor: "bg-cyan-50",
  },
  {
    href: "/tax-calculator",
    title: "Tax Calculator",
    description: "Estimate your federal income tax, FICA taxes, state tax, effective rate, and take-home pay with 2025 tax brackets.",
    icon: FileText,
    color: "bg-amber-600",
    lightColor: "bg-amber-50",
  },
];

export default function Home() {
  return (
    <CalculatorLayout>
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Free Online Calculators
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Fast, accurate, and easy-to-use calculators for everyday math. 
          No signup required — just calculate.
        </p>
      </section>

      {/* Calculator Grid */}
      <section className="grid md:grid-cols-2 gap-6 mb-16">
        {calculators.map((calc) => {
          const Icon = calc.icon;
          return (
            <Link
              key={calc.href}
              href={calc.href}
              className="calc-card group block p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-indigo-200"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${calc.lightColor}`}>
                  <Icon className={`w-6 h-6 ${calc.color.replace("bg-", "text-")}`} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                    {calc.title}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {calc.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Why Use Calcify?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-sm text-gray-600">
              Instant results as you type. No waiting, no page reloads.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Accurate Results</h3>
            <p className="text-sm text-gray-600">
              Precise calculations you can trust for important decisions.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Works Everywhere</h3>
            <p className="text-sm text-gray-600">
              Mobile-friendly design. Use on any device, anywhere.
            </p>
          </div>
        </div>
      </section>
    </CalculatorLayout>
  );
}
