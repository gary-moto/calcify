import { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";

export const metadata: Metadata = {
  title: "About Calcify",
  description: "Calcify offers free online calculators — pregnancy, age, tip, date, percentage, tariff, mortgage, and tax calculators. Fast, accurate, and easy to use.",
  alternates: { canonical: "https://calcify.io/about" },
};

export default function AboutPage() {
  return (
    <CalculatorLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About Calcify</h1>

        <div className="space-y-6 text-gray-600">
          <p className="text-lg">Calcify is a collection of free, accurate online calculators for everyday needs. Simple, fast, and designed to give you answers instantly.</p>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Calculators</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Pregnancy Calculator</strong> — Track due dates and pregnancy milestones</li>
              <li><strong>Age Calculator</strong> — Calculate exact age in years, months, and days</li>
              <li><strong>Tip Calculator</strong> — Split bills and calculate tips easily</li>
              <li><strong>Date Calculator</strong> — Find the difference between dates or add/subtract days</li>
              <li><strong>Percentage Calculator</strong> — Solve any percentage problem</li>
              <li><strong>Tariff Calculator</strong> — Calculate import tariffs with 2025 rates</li>
              <li><strong>Mortgage Calculator</strong> — Estimate monthly payments with amortization</li>
              <li><strong>Tax Calculator</strong> — Federal and state income tax estimates for 2025</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Why Calcify?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Accurate</strong> — Verified against official sources (IRS, TurboTax)</li>
              <li><strong>Instant</strong> — Results update as you type, no page reloads</li>
              <li><strong>Free Forever</strong> — No premium plans, no hidden costs</li>
              <li><strong>No Account Required</strong> — Just open and calculate</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact</h2>
            <p>Have feedback or suggestions? Reach us at hello@calcify.io.</p>
          </section>
        </div>
      </div>
    </CalculatorLayout>
  );
}
