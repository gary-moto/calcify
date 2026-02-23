"use client";

import { useState, useEffect } from "react";
import { DollarSign, FileText, Users } from "lucide-react";

type FilingStatus = "single" | "married_joint" | "married_separate" | "head_of_household";

// 2025 Federal Tax Brackets (Source: TurboTax / IRS)
const brackets: Record<FilingStatus, { min: number; max: number; rate: number }[]> = {
  single: [
    { min: 0, max: 11925, rate: 0.10 },
    { min: 11925, max: 48475, rate: 0.12 },
    { min: 48475, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250525, rate: 0.32 },
    { min: 250525, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 },
  ],
  married_joint: [
    { min: 0, max: 23850, rate: 0.10 },
    { min: 23850, max: 96950, rate: 0.12 },
    { min: 96950, max: 206700, rate: 0.22 },
    { min: 206700, max: 394600, rate: 0.24 },
    { min: 394600, max: 501050, rate: 0.32 },
    { min: 501050, max: 751600, rate: 0.35 },
    { min: 751600, max: Infinity, rate: 0.37 },
  ],
  married_separate: [
    { min: 0, max: 11925, rate: 0.10 },
    { min: 11925, max: 48475, rate: 0.12 },
    { min: 48475, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250525, rate: 0.32 },
    { min: 250525, max: 375800, rate: 0.35 },
    { min: 375800, max: Infinity, rate: 0.37 },
  ],
  head_of_household: [
    { min: 0, max: 17000, rate: 0.10 },
    { min: 17000, max: 64850, rate: 0.12 },
    { min: 64850, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250500, rate: 0.32 },
    { min: 250500, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 },
  ],
};

const standardDeductions: Record<FilingStatus, number> = {
  single: 15750,
  married_joint: 31500,
  married_separate: 15750,
  head_of_household: 23600,
};

// FICA
const SOCIAL_SECURITY_RATE = 0.062;
const SOCIAL_SECURITY_CAP = 176100;
const MEDICARE_RATE = 0.0145;
const MEDICARE_SURTAX_RATE = 0.009;
const MEDICARE_SURTAX_THRESHOLD: Record<FilingStatus, number> = {
  single: 200000, married_joint: 250000, married_separate: 125000, head_of_household: 200000,
};

const CHILD_TAX_CREDIT = 2000;  // per qualifying child under 17
const OTHER_DEPENDENT_CREDIT = 500; // per other dependent

interface TaxResult {
  grossIncome: number;
  deduction: number;
  taxableIncome: number;
  federalTax: number;
  socialSecurity: number;
  medicare: number;
  totalFICA: number;
  childTaxCredit: number;
  otherDependentCredit: number;
  totalCredits: number;
  totalTax: number;
  effectiveRate: number;
  marginalRate: number;
  takeHome: number;
  monthlyTakeHome: number;
  bracketBreakdown: { rate: number; taxable: number; tax: number }[];
}

// State income tax rates (top marginal rate, 2025)
const stateTaxRates: { code: string; name: string; rate: number }[] = [
  { code: "AL", name: "Alabama", rate: 5.0 },
  { code: "AK", name: "Alaska", rate: 0 },
  { code: "AZ", name: "Arizona", rate: 2.5 },
  { code: "AR", name: "Arkansas", rate: 3.9 },
  { code: "CA", name: "California", rate: 13.3 },
  { code: "CO", name: "Colorado", rate: 4.4 },
  { code: "CT", name: "Connecticut", rate: 6.99 },
  { code: "DE", name: "Delaware", rate: 6.6 },
  { code: "DC", name: "Washington D.C.", rate: 10.75 },
  { code: "FL", name: "Florida", rate: 0 },
  { code: "GA", name: "Georgia", rate: 5.39 },
  { code: "HI", name: "Hawaii", rate: 11.0 },
  { code: "ID", name: "Idaho", rate: 5.695 },
  { code: "IL", name: "Illinois", rate: 4.95 },
  { code: "IN", name: "Indiana", rate: 3.05 },
  { code: "IA", name: "Iowa", rate: 5.7 },
  { code: "KS", name: "Kansas", rate: 5.7 },
  { code: "KY", name: "Kentucky", rate: 4.0 },
  { code: "LA", name: "Louisiana", rate: 4.25 },
  { code: "ME", name: "Maine", rate: 7.15 },
  { code: "MD", name: "Maryland", rate: 5.75 },
  { code: "MA", name: "Massachusetts", rate: 9.0 },
  { code: "MI", name: "Michigan", rate: 4.25 },
  { code: "MN", name: "Minnesota", rate: 9.85 },
  { code: "MS", name: "Mississippi", rate: 4.7 },
  { code: "MO", name: "Missouri", rate: 4.8 },
  { code: "MT", name: "Montana", rate: 5.9 },
  { code: "NE", name: "Nebraska", rate: 5.84 },
  { code: "NV", name: "Nevada", rate: 0 },
  { code: "NH", name: "New Hampshire", rate: 0 },
  { code: "NJ", name: "New Jersey", rate: 10.75 },
  { code: "NM", name: "New Mexico", rate: 5.9 },
  { code: "NY", name: "New York", rate: 10.9 },
  { code: "NC", name: "North Carolina", rate: 4.5 },
  { code: "ND", name: "North Dakota", rate: 2.5 },
  { code: "OH", name: "Ohio", rate: 3.5 },
  { code: "OK", name: "Oklahoma", rate: 4.75 },
  { code: "OR", name: "Oregon", rate: 9.9 },
  { code: "PA", name: "Pennsylvania", rate: 3.07 },
  { code: "RI", name: "Rhode Island", rate: 5.99 },
  { code: "SC", name: "South Carolina", rate: 6.4 },
  { code: "SD", name: "South Dakota", rate: 0 },
  { code: "TN", name: "Tennessee", rate: 0 },
  { code: "TX", name: "Texas", rate: 0 },
  { code: "UT", name: "Utah", rate: 4.65 },
  { code: "VT", name: "Vermont", rate: 8.75 },
  { code: "VA", name: "Virginia", rate: 5.75 },
  { code: "WA", name: "Washington", rate: 0 },
  { code: "WV", name: "West Virginia", rate: 5.12 },
  { code: "WI", name: "Wisconsin", rate: 7.65 },
  { code: "WY", name: "Wyoming", rate: 0 },
];

const filingLabels: Record<FilingStatus, string> = {
  single: "Single",
  married_joint: "Married Filing Jointly",
  married_separate: "Married Filing Separately",
  head_of_household: "Head of Household",
};

export default function TaxCalculator() {
  const [income, setIncome] = useState("75000");
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [deductionType, setDeductionType] = useState<"standard" | "itemized">("standard");
  const [itemizedAmount, setItemizedAmount] = useState("");
  const [childDependents, setChildDependents] = useState(0);
  const [otherDependents, setOtherDependents] = useState(0);
  const [selectedState, setSelectedState] = useState("CA");
  const [result, setResult] = useState<TaxResult | null>(null);

  const stateTaxRate = stateTaxRates.find(s => s.code === selectedState)?.rate ?? 0;

  useEffect(() => {
    const gross = parseFloat(income) || 0;
    if (gross <= 0) { setResult(null); return; }

    const deduction = deductionType === "standard" ? standardDeductions[filingStatus] : (parseFloat(itemizedAmount) || 0);
    const taxableIncome = Math.max(0, gross - deduction);

    // Federal tax
    const taxBrackets = brackets[filingStatus];
    let federalTax = 0;
    let marginalRate = 0.10;
    const bracketBreakdown: TaxResult["bracketBreakdown"] = [];

    for (const bracket of taxBrackets) {
      if (taxableIncome <= bracket.min) break;
      const taxable = Math.min(taxableIncome, bracket.max) - bracket.min;
      const tax = taxable * bracket.rate;
      federalTax += tax;
      marginalRate = bracket.rate;
      if (taxable > 0) bracketBreakdown.push({ rate: bracket.rate, taxable, tax });
    }

    // FICA
    const socialSecurity = Math.min(gross, SOCIAL_SECURITY_CAP) * SOCIAL_SECURITY_RATE;
    let medicare = gross * MEDICARE_RATE;
    const surtaxThreshold = MEDICARE_SURTAX_THRESHOLD[filingStatus];
    if (gross > surtaxThreshold) {
      medicare += (gross - surtaxThreshold) * MEDICARE_SURTAX_RATE;
    }
    const totalFICA = socialSecurity + medicare;

    // Tax credits (reduce tax owed, not taxable income)
    const childTaxCredit = Math.min(childDependents * CHILD_TAX_CREDIT, federalTax);
    const otherDependentCredit = Math.min(otherDependents * OTHER_DEPENDENT_CREDIT, federalTax - childTaxCredit);
    const totalCredits = childTaxCredit + otherDependentCredit;
    const federalTaxAfterCredits = federalTax - totalCredits;

    // State tax (simple flat rate estimate using top marginal rate)
    const stateTax = taxableIncome * (stateTaxRate / 100);

    const totalTax = federalTaxAfterCredits + totalFICA + stateTax;
    const effectiveRate = gross > 0 ? totalTax / gross : 0;
    const takeHome = gross - totalTax;

    setResult({
      grossIncome: gross,
      deduction,
      taxableIncome,
      federalTax: federalTaxAfterCredits,
      socialSecurity,
      medicare,
      totalFICA,
      childTaxCredit,
      otherDependentCredit,
      totalCredits,
      totalTax,
      effectiveRate,
      marginalRate,
      takeHome,
      monthlyTakeHome: takeHome / 12,
      bracketBreakdown,
    });
  }, [income, filingStatus, deductionType, itemizedAmount, childDependents, otherDependents, selectedState, stateTaxRate]);

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const fmtFull = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        {/* Income */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-2">Annual Gross Income</label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="75,000"
              min="0"
              className="w-full pl-12 pr-4 py-3 text-xl font-semibold border border-gray-200 rounded-xl focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Filing Status */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-2">Filing Status</label>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(filingLabels) as FilingStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => setFilingStatus(status)}
                className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  filingStatus === status
                    ? "bg-amber-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Users className="w-4 h-4" />
                {filingLabels[status]}
              </button>
            ))}
          </div>
        </div>

        {/* Deduction Type */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-2">Deduction</label>
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setDeductionType("standard")}
              className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all ${
                deductionType === "standard"
                  ? "bg-amber-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Standard ({fmt(standardDeductions[filingStatus])})
            </button>
            <button
              onClick={() => setDeductionType("itemized")}
              className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all ${
                deductionType === "itemized"
                  ? "bg-amber-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Itemized
            </button>
          </div>
          {deductionType === "itemized" && (
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={itemizedAmount}
                onChange={(e) => setItemizedAmount(e.target.value)}
                placeholder="Enter total itemized deductions"
                min="0"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:border-amber-500 transition-colors"
              />
            </div>
          )}
        </div>

        {/* Dependents */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-2">Dependents</label>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Children under 17 ($2,000 credit each)</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setChildDependents(Math.max(0, childDependents - 1))}
                  className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 font-bold text-lg hover:bg-gray-200 transition-colors"
                >−</button>
                <span className="text-xl font-bold text-gray-900 w-6 text-center">{childDependents}</span>
                <button
                  onClick={() => setChildDependents(childDependents + 1)}
                  className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 font-bold text-lg hover:bg-gray-200 transition-colors"
                >+</button>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Other dependents ($500 credit each)</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setOtherDependents(Math.max(0, otherDependents - 1))}
                  className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 font-bold text-lg hover:bg-gray-200 transition-colors"
                >−</button>
                <span className="text-xl font-bold text-gray-900 w-6 text-center">{otherDependents}</span>
                <button
                  onClick={() => setOtherDependents(otherDependents + 1)}
                  className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 font-bold text-lg hover:bg-gray-200 transition-colors"
                >+</button>
              </div>
            </div>
          </div>
        </div>

        {/* State Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">State</label>
          <div className="flex items-center gap-3">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:border-amber-500 transition-colors bg-white font-medium"
            >
              {stateTaxRates.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} {s.rate === 0 ? "(No income tax)" : `(${s.rate}%)`}
                </option>
              ))}
            </select>
          </div>
          {stateTaxRate > 0 && (
            <p className="text-xs text-gray-500 mt-1.5">Using top marginal rate of {stateTaxRate}%. Actual rate may vary based on income level.</p>
          )}
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4 result-animate">
          {/* Take Home */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className="text-amber-100 text-sm mb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Annual Take-Home
                </div>
                <p className="text-4xl font-bold number-display">{fmt(result.takeHome)}</p>
              </div>
              <div>
                <div className="text-amber-100 text-sm mb-1">Monthly Take-Home</div>
                <p className="text-4xl font-bold number-display">{fmtFull(result.monthlyTakeHome)}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-6 text-sm text-amber-100">
              <span>Effective Rate: <strong className="text-white">{(result.effectiveRate * 100).toFixed(1)}%</strong></span>
              <span>Marginal Rate: <strong className="text-white">{(result.marginalRate * 100).toFixed(0)}%</strong></span>
            </div>
          </div>

          {/* Tax Breakdown */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
              <h3 className="font-semibold text-gray-900">Income Summary</h3>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Gross Income</span>
                <span className="font-medium">{fmt(result.grossIncome)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Deduction ({deductionType})</span>
                <span className="font-medium text-emerald-600">−{fmt(result.deduction)}</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2">
                <span className="text-gray-900 font-medium">Taxable Income</span>
                <span className="font-bold">{fmt(result.taxableIncome)}</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
              <h3 className="font-semibold text-gray-900">Tax Breakdown</h3>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Federal Income Tax</span>
                <span className="font-medium text-red-600">{fmt(result.federalTax)}</span>
              </div>
              {result.totalCredits > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax Credits Applied</span>
                  <span className="font-medium text-emerald-600">−{fmt(result.totalCredits)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Social Security</span>
                <span className="font-medium text-red-600">{fmt(result.socialSecurity)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Medicare</span>
                <span className="font-medium text-red-600">{fmt(result.medicare)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">State Tax — {stateTaxRates.find(s => s.code === selectedState)?.name} ({stateTaxRate}%)</span>
                <span className="font-medium text-red-600">{fmt(result.taxableIncome * stateTaxRate / 100)}</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2">
                <span className="text-gray-900 font-medium">Total Tax</span>
                <span className="font-bold text-red-600">{fmt(result.totalTax)}</span>
              </div>
            </div>
          </div>

          {/* Bracket Breakdown */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Federal Tax Brackets</h3>
            <div className="space-y-2">
              {result.bracketBreakdown.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-amber-700 w-12">{(b.rate * 100).toFixed(0)}%</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                      style={{ width: `${Math.min(100, (b.taxable / result.taxableIncome) * 100)}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-24 text-right">{fmt(b.tax)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Paycheck Breakdown */}
          <div className="bg-gray-50 rounded-xl p-4 text-center text-sm text-gray-600">
            <p>
              You earn {fmt(result.grossIncome)}/yr → pay {fmt(result.totalTax)} in taxes ({(result.effectiveRate * 100).toFixed(1)}%) →
              keep <strong className="text-gray-900">{fmtFull(result.monthlyTakeHome)}/mo</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
