import { Metadata } from "next";
import TipCalculator from "./TipCalculator";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorSchema from "@/components/CalculatorSchema";

export const metadata: Metadata = {
  title: "Tip Calculator - Calculate Tips & Split Bills",
  description: "Free online tip calculator. Calculate the tip amount and total bill. Split the bill between multiple people with custom tip percentages. Works for restaurants, delivery, and services.",
  keywords: [
    "tip calculator", "calculate tip", "bill splitter", "restaurant tip",
    "gratuity calculator", "split bill", "tip calculator online",
    "how much to tip", "20 percent tip calculator", "15 percent tip",
    "bill split calculator", "restaurant bill calculator", "service tip calculator",
    "delivery tip calculator", "tip per person", "divide bill calculator",
    "how much tip for waiter", "tip on 50 dollars", "tip on 100 dollar bill",
    "uber eats tip calculator", "doordash tip calculator", "pizza delivery tip",
    "hairdresser tip calculator", "hotel tip calculator", "bar tip calculator",
    "18 percent tip calculator", "25 percent tip", "tip calculator with tax",
    "tip split between friends", "group dinner bill splitter", "fair tip calculator",
    "how much to tip in USA", "tipping etiquette calculator",
  ],
  alternates: { canonical: "https://calcify.io/tip-calculator" },
  openGraph: {
    title: "Tip Calculator - Calculate Tips & Split Bills",
    description: "Calculate the tip amount and total bill. Split between multiple people. Free online calculator.",
    url: "https://calcify.io/tip-calculator",
  },
};

export default function TipCalculatorPage() {
  return (
    <CalculatorLayout>
      <CalculatorSchema
        name="Tip Calculator"
        description="Calculate the tip amount and total bill. Split the bill between multiple people with custom tip percentages."
        url="https://calcify.io/tip-calculator"
      />
      
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-3">
          Tip Calculator
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Calculate the tip amount and total bill. Split the bill between 
          multiple people with custom tip percentages.
        </p>
      </div>

      <TipCalculator />

      {/* How to Use Section */}
      <section className="mt-16">
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 md:p-8 border border-orange-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">📖</span> How to Use
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Enter your bill amount, select a tip percentage (or enter a custom amount), 
            and optionally specify how many people to split the bill between. The calculator 
            will show you the tip amount, total bill, and per-person costs.
          </p>
        </div>
      </section>

      {/* Tipping Guide */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Tipping Guide</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">👍</span>
              <h3 className="font-semibold text-gray-900">15% - Standard</h3>
            </div>
            <p className="text-gray-600 text-sm">Acceptable for standard service at restaurants.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">😊</span>
              <h3 className="font-semibold text-gray-900">18-20% - Good</h3>
            </div>
            <p className="text-gray-600 text-sm">Standard for good service in the US.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">🌟</span>
              <h3 className="font-semibold text-gray-900">25%+ - Excellent</h3>
            </div>
            <p className="text-gray-600 text-sm">For exceptional service or to show extra appreciation.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="text-lg">❓</span>
              Should I tip on the total including tax?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              It&apos;s common practice to tip on the pre-tax amount, but tipping on the total 
              (including tax) is also acceptable and often easier to calculate.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="text-lg">❓</span>
              How do I split the bill fairly?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              The easiest method is to divide the total (including tip) equally. For unequal orders, 
              each person can calculate their share based on what they ordered plus their portion of the tip.
            </p>
          </div>
        </div>
      </section>
    </CalculatorLayout>
  );
}
