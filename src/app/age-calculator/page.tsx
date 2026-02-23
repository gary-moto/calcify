import { Metadata } from "next";
import AgeCalculator from "./AgeCalculator";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorSchema from "@/components/CalculatorSchema";

export const metadata: Metadata = {
  title: "Age Calculator - Calculate Your Exact Age",
  description: "Free online age calculator. Find your exact age in years, months, days, hours and minutes. Calculate days until your next birthday. Works for any date of birth.",
  keywords: [
    "age calculator", "calculate age", "how old am I", "birthday calculator",
    "age in days", "exact age", "age calculator online", "free age calculator",
    "calculate my age", "age from date of birth", "date of birth calculator",
    "age in months", "age in hours", "age in minutes", "next birthday calculator",
    "chronological age calculator", "how many days old am I",
    "what is my age today", "age difference calculator", "born in 1990 how old",
    "how many days until my birthday", "age calculator between two dates",
    "how old will I be in 2030", "days since birth", "years months days calculator",
    "age on specific date", "korean age calculator", "lunar age calculator",
    "age in weeks", "how many seconds old am I", "exact age in years and months",
    "calculate age for passport", "age verification calculator",
  ],
  alternates: { canonical: "https://calcify.io/age-calculator" },
  openGraph: {
    title: "Age Calculator - Calculate Your Exact Age",
    description: "Find your exact age in years, months, days, hours and minutes. Free online calculator.",
    url: "https://calcify.io/age-calculator",
  },
};

export default function AgeCalculatorPage() {
  return (
    <CalculatorLayout>
      <CalculatorSchema
        name="Age Calculator"
        description="Calculate your exact age in years, months, days, hours, and minutes. Find out how many days until your next birthday."
        url="https://calcify.io/age-calculator"
      />
      
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-600 mb-3">
          Age Calculator
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Calculate your exact age in years, months, days, hours, and minutes. 
          Find out how many days until your next birthday.
        </p>
      </div>

      <AgeCalculator />

      {/* How to Use Section */}
      <section className="mt-16">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 md:p-8 border border-purple-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">📖</span> How to Use
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Simply enter your date of birth and the calculator will instantly show your exact age 
            broken down into years, months, days, hours, and minutes. You can also see how many 
            days are left until your next birthday.
          </p>
        </div>
      </section>

      {/* What Can You Calculate */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">What Can You Calculate?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">🎂</span>
              <h3 className="font-semibold text-gray-900">Exact Age</h3>
            </div>
            <p className="text-gray-600 text-sm">Your precise age in years, months, and days.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">📅</span>
              <h3 className="font-semibold text-gray-900">Age in Days</h3>
            </div>
            <p className="text-gray-600 text-sm">Total number of days you&apos;ve been alive.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">⏰</span>
              <h3 className="font-semibold text-gray-900">Age in Hours</h3>
            </div>
            <p className="text-gray-600 text-sm">Total hours since your birth.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">⏱️</span>
              <h3 className="font-semibold text-gray-900">Age in Minutes</h3>
            </div>
            <p className="text-gray-600 text-sm">Total minutes you&apos;ve lived.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">🎁</span>
              <h3 className="font-semibold text-gray-900">Next Birthday</h3>
            </div>
            <p className="text-gray-600 text-sm">Days remaining until your next birthday.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">⭐</span>
              <h3 className="font-semibold text-gray-900">Zodiac Sign</h3>
            </div>
            <p className="text-gray-600 text-sm">Your astrological zodiac sign.</p>
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
              How accurate is this age calculator?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our age calculator is highly accurate, accounting for leap years and the varying 
              number of days in each month. The calculation is performed in real-time using 
              your device&apos;s current date and time.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="text-lg">❓</span>
              Can I calculate someone else&apos;s age?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Yes! Simply enter any birth date to calculate the age. This works for calculating 
              the age of family members, friends, celebrities, or historical figures.
            </p>
          </div>
        </div>
      </section>
    </CalculatorLayout>
  );
}
