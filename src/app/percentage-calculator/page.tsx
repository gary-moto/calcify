import { Metadata } from "next";
import PercentageCalculator from "./PercentageCalculator";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorSchema from "@/components/CalculatorSchema";

export const metadata: Metadata = {
  title: "Percentage Calculator - Calculate Percentages Easily",
  description: "Free online percentage calculator. Calculate what percent one number is of another, find percentage increase or decrease, and solve any percentage problem.",
  keywords: ["percentage calculator", "percent calculator", "calculate percentage", "percentage increase", "percentage decrease", "what percent"],
};

export default function PercentageCalculatorPage() {
  return (
    <CalculatorLayout>
      <CalculatorSchema
        name="Percentage Calculator"
        description="Calculate percentages easily. Find what percent one number is of another, calculate percentage increase or decrease, and more."
        url="https://calcify.io/percentage-calculator"
      />
      
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-3">
          Percentage Calculator
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Calculate percentages easily. Find what percent one number is of another, 
          calculate percentage increase or decrease, and more.
        </p>
      </div>

      <PercentageCalculator />

      {/* How to Use Section */}
      <section className="mt-16">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 border border-blue-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">📖</span> How to Use
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Choose the type of percentage calculation you need, enter your numbers, and get 
            instant results. This calculator handles all common percentage problems including 
            finding percentages, calculating increases/decreases, and determining what percent 
            one number is of another.
          </p>
        </div>
      </section>

      {/* Calculator Types */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">What Can You Calculate?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">🔢</span>
              <h3 className="font-semibold text-gray-900">What is X% of Y?</h3>
            </div>
            <p className="text-gray-600 text-sm">Find a percentage of any number. Example: What is 15% of 200?</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">📊</span>
              <h3 className="font-semibold text-gray-900">X is what % of Y?</h3>
            </div>
            <p className="text-gray-600 text-sm">Find what percentage one number is of another. Example: 30 is what % of 150?</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">📈</span>
              <h3 className="font-semibold text-gray-900">Percentage Increase</h3>
            </div>
            <p className="text-gray-600 text-sm">Calculate the percentage increase from one number to another.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">📉</span>
              <h3 className="font-semibold text-gray-900">Percentage Decrease</h3>
            </div>
            <p className="text-gray-600 text-sm">Calculate the percentage decrease from one number to another.</p>
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
              How do I calculate a percentage?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              To find X% of Y, multiply Y by X and divide by 100. For example, 20% of 50 = (50 × 20) ÷ 100 = 10.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="text-lg">❓</span>
              How do I find percentage increase or decrease?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Percentage change = ((New Value - Old Value) ÷ Old Value) × 100. A positive result is an increase, negative is a decrease.
            </p>
          </div>
        </div>
      </section>
    </CalculatorLayout>
  );
}
