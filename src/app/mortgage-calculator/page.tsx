import { Metadata } from "next";
import MortgageCalculator from "./MortgageCalculator";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorSchema from "@/components/CalculatorSchema";

export const metadata: Metadata = {
  title: "Mortgage Calculator - Calculate Monthly Payments & Amortization",
  description: "Free mortgage calculator. Calculate monthly payments, total interest, amortization schedule, and see how down payment and interest rates affect your home loan.",
  keywords: [
    "mortgage calculator", "home loan calculator", "monthly payment calculator",
    "mortgage payment calculator", "house payment calculator", "amortization calculator",
    "mortgage amortization schedule", "home affordability calculator",
    "how much house can I afford", "mortgage interest calculator",
    "30 year mortgage calculator", "15 year mortgage calculator", "20 year mortgage calculator",
    "down payment calculator", "PMI calculator", "mortgage rate calculator",
    "refinance calculator", "home buying calculator",
    "mortgage calculator with taxes", "mortgage calculator with PMI",
    "mortgage calculator with insurance", "PITI calculator",
    "how much is my mortgage payment", "house affordability calculator",
    "mortgage monthly payment formula", "loan amortization calculator",
    "mortgage payoff calculator", "extra payment mortgage calculator",
    "FHA mortgage calculator", "VA loan calculator", "jumbo loan calculator",
    "first time home buyer calculator", "rent vs buy calculator",
    "mortgage interest rate today", "home loan EMI calculator",
    "property tax calculator", "closing cost calculator",
    "mortgage calculator 2025", "mortgage calculator 2026",
  ],
  alternates: { canonical: "https://calcify.io/mortgage-calculator" },
  openGraph: {
    title: "Mortgage Calculator - Calculate Monthly Payments & Amortization",
    description: "Calculate your monthly mortgage payment, total interest, and view amortization schedule. Free online calculator.",
    url: "https://calcify.io/mortgage-calculator",
  },
};

export default function MortgageCalculatorPage() {
  return (
    <CalculatorLayout>
      <CalculatorSchema
        name="Mortgage Calculator"
        description="Calculate monthly mortgage payments, total interest, amortization schedule, and see how different rates and terms affect your home loan."
        url="https://calcify.io/mortgage-calculator"
      />

      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-cyan-600 mb-3">
          Mortgage Calculator
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Calculate your monthly mortgage payment, total interest, and view a full amortization schedule.
        </p>
      </div>

      <MortgageCalculator />

      <section className="mt-16">
        <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-6 md:p-8 border border-cyan-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">📖</span> How to Use
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Enter the home price, down payment, interest rate, and loan term. The calculator shows your monthly
            principal & interest payment, plus estimated property tax, insurance, and PMI. PMI is automatically
            added when your down payment is below 20%.
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Your Mortgage</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">🏠</span>
              <h3 className="font-semibold text-gray-900">Principal & Interest</h3>
            </div>
            <p className="text-gray-600 text-sm">The core monthly payment that goes toward paying off your loan balance and the interest charged by the lender.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">💰</span>
              <h3 className="font-semibold text-gray-900">Down Payment</h3>
            </div>
            <p className="text-gray-600 text-sm">The upfront amount you pay. 20% or more avoids PMI (Private Mortgage Insurance), saving you money monthly.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">📊</span>
              <h3 className="font-semibold text-gray-900">Amortization</h3>
            </div>
            <p className="text-gray-600 text-sm">Early payments are mostly interest. Over time, more goes to principal. A 15-year loan saves significantly on total interest.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">🛡️</span>
              <h3 className="font-semibold text-gray-900">PMI</h3>
            </div>
            <p className="text-gray-600 text-sm">Private Mortgage Insurance is required when your down payment is less than 20%. It typically costs 0.5–1% of the loan annually.</p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-cyan-600 font-bold">❓</span>
              <h3 className="font-semibold text-gray-900">How much house can I afford?</h3>
            </div>
            <p className="text-gray-600 text-sm">A common rule is that your monthly mortgage payment should be no more than 28% of your gross monthly income. Use this calculator to find a price point that fits your budget.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-cyan-600 font-bold">❓</span>
              <h3 className="font-semibold text-gray-900">15-year vs 30-year mortgage?</h3>
            </div>
            <p className="text-gray-600 text-sm">A 15-year mortgage has higher monthly payments but saves tens of thousands in interest. A 30-year gives lower payments and more flexibility. Try both terms to compare.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-cyan-600 font-bold">❓</span>
              <h3 className="font-semibold text-gray-900">What&apos;s included in my monthly payment?</h3>
            </div>
            <p className="text-gray-600 text-sm">Your total monthly payment (PITI) includes Principal, Interest, Taxes, and Insurance. Some lenders collect these in an escrow account.</p>
          </div>
        </div>
      </section>
    </CalculatorLayout>
  );
}
