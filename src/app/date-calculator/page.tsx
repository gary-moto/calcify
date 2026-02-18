import { Metadata } from "next";
import DateCalculator from "./DateCalculator";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorSchema from "@/components/CalculatorSchema";

export const metadata: Metadata = {
  title: "Date Calculator - Days Between Dates",
  description: "Free online date calculator. Calculate the number of days between two dates, add or subtract days from any date, find day of week for any date.",
  keywords: ["date calculator", "days between dates", "date difference", "add days to date", "day of week calculator"],
};

export default function DateCalculatorPage() {
  return (
    <CalculatorLayout>
      <CalculatorSchema
        name="Date Calculator"
        description="Calculate the number of days between two dates, add or subtract days from any date, and find the day of week for any date."
        url="https://calcify.io/date-calculator"
      />
      
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-600 mb-3">
          Date Calculator
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Calculate the number of days between two dates, add or subtract days 
          from any date, and find the day of week for any date.
        </p>
      </div>

      <DateCalculator />

      {/* How to Use Section */}
      <section className="mt-16">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 md:p-8 border border-emerald-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">📖</span> How to Use
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Choose the type of date calculation you need. Find the exact number of days between 
            two dates, add or subtract days from a date to find a new date, or determine what 
            day of the week any date falls on.
          </p>
        </div>
      </section>

      {/* Calculator Types */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">What Can You Calculate?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">📅</span>
              <h3 className="font-semibold text-gray-900">Days Between Dates</h3>
            </div>
            <p className="text-gray-600 text-sm">Find exactly how many days, weeks, months, and years are between two dates.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">➕</span>
              <h3 className="font-semibold text-gray-900">Add/Subtract Days</h3>
            </div>
            <p className="text-gray-600 text-sm">Add or subtract days, weeks, or months from any date.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">📆</span>
              <h3 className="font-semibold text-gray-900">Day of Week</h3>
            </div>
            <p className="text-gray-600 text-sm">Find out what day of the week any date falls on.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">⏱️</span>
              <h3 className="font-semibold text-gray-900">Time Breakdown</h3>
            </div>
            <p className="text-gray-600 text-sm">Get duration in multiple units: days, weeks, months, hours, and minutes.</p>
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
              Does this account for leap years?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Yes! Our calculator accurately accounts for leap years when calculating days between dates 
              or adding/subtracting days from a date.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="text-lg">❓</span>
              How are weeks and months calculated?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Weeks are calculated as 7 days. For months, we use calendar months which can vary from 28-31 days.
            </p>
          </div>
        </div>
      </section>
    </CalculatorLayout>
  );
}
