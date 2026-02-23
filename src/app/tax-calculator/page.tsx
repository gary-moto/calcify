import { Metadata } from "next";
import TaxCalculator from "./TaxCalculator";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorSchema from "@/components/CalculatorSchema";

export const metadata: Metadata = {
  title: "Tax Calculator - Federal Income Tax Estimator 2025",
  description: "Free US income tax calculator. Estimate your federal income tax, FICA (Social Security & Medicare), state tax, effective tax rate, and take-home pay for 2025.",
  keywords: [
    "tax calculator", "income tax calculator", "federal tax calculator",
    "tax estimator", "tax bracket calculator", "take home pay calculator",
    "paycheck calculator", "salary tax calculator", "how much tax do I owe",
    "effective tax rate calculator", "marginal tax rate calculator",
    "2025 tax brackets", "FICA calculator", "social security tax calculator",
    "state income tax calculator", "tax refund calculator",
    "federal income tax brackets 2025", "how much federal tax on 75000",
    "tax on 100k salary", "tax on 50000 income", "tax on 150000 salary",
    "single filer tax calculator", "married filing jointly tax calculator",
    "head of household tax calculator", "standard deduction 2025",
    "child tax credit calculator", "dependent tax credit calculator",
    "W2 tax calculator", "self employment tax calculator",
    "California income tax calculator", "Texas tax calculator", "New York tax calculator",
    "Florida tax calculator", "how to calculate take home pay",
    "salary after tax calculator", "annual to monthly salary calculator",
    "net pay calculator", "gross to net calculator", "tax withholding calculator",
    "1099 tax calculator", "freelance tax calculator",
  ],
  alternates: { canonical: "https://calcify.io/tax-calculator" },
  openGraph: {
    title: "Tax Calculator - Federal Income Tax Estimator 2025",
    description: "Estimate your federal income tax, FICA, state tax, and take-home pay. Free online calculator with 2025 tax brackets.",
    url: "https://calcify.io/tax-calculator",
  },
};

export default function TaxCalculatorPage() {
  return (
    <CalculatorLayout>
      <CalculatorSchema
        name="Tax Calculator"
        description="Estimate your US federal income tax, FICA taxes, state tax, effective rate, and annual take-home pay for 2025."
        url="https://calcify.io/tax-calculator"
      />

      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-600 mb-3">
          Tax Calculator
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Estimate your federal income tax, FICA taxes, and take-home pay. Updated with 2025 tax brackets.
        </p>
      </div>

      <TaxCalculator />

      <section className="mt-16">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 md:p-8 border border-amber-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">📖</span> How to Use
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Enter your annual gross income, select your filing status, and choose standard or itemized deductions.
            Adjust the state income tax rate for your state (0% for states like Texas, Florida, Washington).
            The calculator shows your federal tax by bracket, FICA taxes, and total take-home pay.
          </p>
        </div>
      </section>

      {/* 2025 Tax Brackets Reference Table */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">2025 Federal Tax Brackets</h2>
        <p className="text-gray-600 text-sm mb-4">These are the federal income tax brackets for the 2025 tax year (filed in 2026). Source: IRS / TurboTax.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-amber-50 text-gray-700">
                <th className="text-left py-3 px-4 font-semibold">Rate</th>
                <th className="text-left py-3 px-4 font-semibold">Single</th>
                <th className="text-left py-3 px-4 font-semibold">Married Filing Jointly</th>
                <th className="text-left py-3 px-4 font-semibold">Married Filing Separately</th>
                <th className="text-left py-3 px-4 font-semibold">Head of Household</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr><td className="py-2.5 px-4 font-medium text-amber-700">10%</td><td className="py-2.5 px-4">$0 – $11,925</td><td className="py-2.5 px-4">$0 – $23,850</td><td className="py-2.5 px-4">$0 – $11,925</td><td className="py-2.5 px-4">$0 – $17,000</td></tr>
              <tr className="bg-gray-50"><td className="py-2.5 px-4 font-medium text-amber-700">12%</td><td className="py-2.5 px-4">$11,926 – $48,475</td><td className="py-2.5 px-4">$23,851 – $96,950</td><td className="py-2.5 px-4">$11,926 – $48,475</td><td className="py-2.5 px-4">$17,001 – $64,850</td></tr>
              <tr><td className="py-2.5 px-4 font-medium text-amber-700">22%</td><td className="py-2.5 px-4">$48,476 – $103,350</td><td className="py-2.5 px-4">$96,951 – $206,700</td><td className="py-2.5 px-4">$48,476 – $103,350</td><td className="py-2.5 px-4">$64,851 – $103,350</td></tr>
              <tr className="bg-gray-50"><td className="py-2.5 px-4 font-medium text-amber-700">24%</td><td className="py-2.5 px-4">$103,351 – $197,300</td><td className="py-2.5 px-4">$206,701 – $394,600</td><td className="py-2.5 px-4">$103,351 – $197,300</td><td className="py-2.5 px-4">$103,351 – $197,300</td></tr>
              <tr><td className="py-2.5 px-4 font-medium text-amber-700">32%</td><td className="py-2.5 px-4">$197,301 – $250,525</td><td className="py-2.5 px-4">$394,601 – $501,050</td><td className="py-2.5 px-4">$197,301 – $250,525</td><td className="py-2.5 px-4">$197,301 – $250,500</td></tr>
              <tr className="bg-gray-50"><td className="py-2.5 px-4 font-medium text-amber-700">35%</td><td className="py-2.5 px-4">$250,526 – $626,350</td><td className="py-2.5 px-4">$501,051 – $751,600</td><td className="py-2.5 px-4">$250,526 – $375,800</td><td className="py-2.5 px-4">$250,501 – $626,350</td></tr>
              <tr><td className="py-2.5 px-4 font-medium text-amber-700">37%</td><td className="py-2.5 px-4">Over $626,350</td><td className="py-2.5 px-4">Over $751,600</td><td className="py-2.5 px-4">Over $375,800</td><td className="py-2.5 px-4">Over $626,350</td></tr>
            </tbody>
          </table>
        </div>
        <div className="mt-3 bg-amber-50 rounded-lg p-3 text-sm text-amber-800">
          <strong>Standard Deduction (2025):</strong> Single — $15,750 &nbsp;|&nbsp; Married Filing Jointly — $31,500 &nbsp;|&nbsp; Head of Household — $23,600
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding US Taxes</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">📊</span>
              <h3 className="font-semibold text-gray-900">Progressive Tax Brackets</h3>
            </div>
            <p className="text-gray-600 text-sm">The US uses a progressive system — only income within each bracket is taxed at that rate. Your &quot;marginal rate&quot; is the highest bracket you reach.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">🏛️</span>
              <h3 className="font-semibold text-gray-900">FICA Taxes</h3>
            </div>
            <p className="text-gray-600 text-sm">Social Security (6.2%, capped at $176,100) and Medicare (1.45%, no cap) are separate from income tax and fund retirement/healthcare programs.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">📝</span>
              <h3 className="font-semibold text-gray-900">Standard vs Itemized</h3>
            </div>
            <p className="text-gray-600 text-sm">Most filers benefit from the standard deduction ($15,750 single / $31,500 joint). Itemize if your deductions (mortgage interest, state taxes, charity) exceed that.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">🗺️</span>
              <h3 className="font-semibold text-gray-900">State Taxes</h3>
            </div>
            <p className="text-gray-600 text-sm">State income tax varies from 0% (TX, FL, WA, NV, WY, SD, AK, NH, TN) to over 13% (California top rate). Enter your state&apos;s rate for accuracy.</p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-600 font-bold">❓</span>
              <h3 className="font-semibold text-gray-900">What is my effective tax rate?</h3>
            </div>
            <p className="text-gray-600 text-sm">Your effective rate is the total tax paid divided by your gross income. It&apos;s always lower than your marginal rate because of progressive brackets.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-600 font-bold">❓</span>
              <h3 className="font-semibold text-gray-900">Does this include self-employment tax?</h3>
            </div>
            <p className="text-gray-600 text-sm">This calculator assumes W-2 employment. Self-employed individuals pay both employer and employee portions of FICA (15.3% total). Adjust accordingly.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-600 font-bold">❓</span>
              <h3 className="font-semibold text-gray-900">How can I reduce my tax bill?</h3>
            </div>
            <p className="text-gray-600 text-sm">Max out 401(k) contributions ($23,500 for 2025), contribute to an HSA, use tax-loss harvesting, and ensure you&apos;re claiming all eligible credits and deductions.</p>
          </div>
        </div>
      </section>
    </CalculatorLayout>
  );
}
