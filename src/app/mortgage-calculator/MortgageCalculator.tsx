"use client";

import { useState, useEffect } from "react";
import { DollarSign, Percent, Calendar, TrendingUp, PiggyBank } from "lucide-react";

interface MortgageResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  principal: number;
  schedule: { year: number; principalPaid: number; interestPaid: number; balance: number }[];
}

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("350000");
  const [downPayment, setDownPayment] = useState("70000");
  const [downPaymentPercent, setDownPaymentPercent] = useState("20");
  const [usePercent, setUsePercent] = useState(true);
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState("3500");
  const [homeInsurance, setHomeInsurance] = useState("1200");
  const [pmi, setPmi] = useState("0");
  const [result, setResult] = useState<MortgageResult | null>(null);

  // Sync down payment amount ↔ percent
  useEffect(() => {
    const price = parseFloat(homePrice) || 0;
    if (usePercent && price > 0) {
      const pct = parseFloat(downPaymentPercent) || 0;
      setDownPayment(Math.round(price * pct / 100).toString());
    }
  }, [homePrice, downPaymentPercent, usePercent]);

  useEffect(() => {
    const price = parseFloat(homePrice) || 0;
    if (!usePercent && price > 0) {
      const dp = parseFloat(downPayment) || 0;
      setDownPaymentPercent((dp / price * 100).toFixed(1));
    }
  }, [downPayment, homePrice, usePercent]);

  // Auto-add PMI if down payment < 20%
  useEffect(() => {
    const price = parseFloat(homePrice) || 0;
    const dp = parseFloat(downPayment) || 0;
    if (price > 0 && dp / price < 0.2) {
      const loanAmt = price - dp;
      setPmi(Math.round(loanAmt * 0.005 / 12 * 12).toString()); // ~0.5% annual
    } else {
      setPmi("0");
    }
  }, [homePrice, downPayment]);

  useEffect(() => {
    const price = parseFloat(homePrice) || 0;
    const dp = parseFloat(downPayment) || 0;
    const rate = parseFloat(interestRate) || 0;
    const principal = price - dp;

    if (principal <= 0 || rate <= 0) {
      setResult(null);
      return;
    }

    const monthlyRate = rate / 100 / 12;
    const numPayments = loanTerm * 12;
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - principal;

    // Amortization by year
    const schedule: MortgageResult["schedule"] = [];
    let balance = principal;
    for (let year = 1; year <= loanTerm; year++) {
      let yearPrincipal = 0;
      let yearInterest = 0;
      for (let m = 0; m < 12; m++) {
        const intPayment = balance * monthlyRate;
        const princPayment = monthlyPayment - intPayment;
        yearInterest += intPayment;
        yearPrincipal += princPayment;
        balance -= princPayment;
      }
      schedule.push({
        year,
        principalPaid: yearPrincipal,
        interestPaid: yearInterest,
        balance: Math.max(0, balance),
      });
    }

    setResult({ monthlyPayment, totalPayment, totalInterest, principal, schedule });
  }, [homePrice, downPayment, interestRate, loanTerm]);

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const fmtFull = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  const monthlyExtras = (parseFloat(propertyTax) || 0) / 12 + (parseFloat(homeInsurance) || 0) / 12 + (parseFloat(pmi) || 0) / 12;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        {/* Home Price */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-2">Home Price</label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(e.target.value)}
              placeholder="350,000"
              min="0"
              className="w-full pl-12 pr-4 py-3 text-xl font-semibold border border-gray-200 rounded-xl focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        {/* Down Payment */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-2">Down Payment</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={downPayment}
                onChange={(e) => { setUsePercent(false); setDownPayment(e.target.value); }}
                min="0"
                className="w-full pl-12 pr-4 py-3 text-lg font-semibold border border-gray-200 rounded-xl focus:border-cyan-500 transition-colors"
              />
            </div>
            <div className="relative w-28">
              <input
                type="number"
                value={downPaymentPercent}
                onChange={(e) => { setUsePercent(true); setDownPaymentPercent(e.target.value); }}
                min="0" max="100"
                className="w-full pl-4 pr-8 py-3 text-lg font-semibold border border-gray-200 rounded-xl focus:border-cyan-500 transition-colors"
              />
              <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Interest Rate & Loan Term */}
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Interest Rate (%)</label>
            <div className="relative">
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                step="0.125"
                min="0" max="25"
                className="w-full pl-4 pr-10 py-3 text-lg font-semibold border border-gray-200 rounded-xl focus:border-cyan-500 transition-colors"
              />
              <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Loan Term</label>
            <div className="flex gap-2">
              {[15, 20, 30].map((term) => (
                <button
                  key={term}
                  onClick={() => setLoanTerm(term)}
                  className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${
                    loanTerm === term
                      ? "bg-cyan-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {term} yr
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Extras: Tax, Insurance, PMI */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Property Tax /yr</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={propertyTax}
                onChange={(e) => setPropertyTax(e.target.value)}
                min="0"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Insurance /yr</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={homeInsurance}
                onChange={(e) => setHomeInsurance(e.target.value)}
                min="0"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">PMI /yr</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={pmi}
                onChange={(e) => setPmi(e.target.value)}
                min="0"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4 result-animate">
          {/* Monthly Payment */}
          <div className="bg-gradient-to-br from-cyan-600 to-teal-500 rounded-2xl p-6 text-white">
            <div className="text-cyan-100 text-sm mb-1 flex items-center gap-2">
              <PiggyBank className="w-4 h-4" />
              Monthly Payment
            </div>
            <p className="text-5xl font-bold number-display mb-3">{fmtFull(result.monthlyPayment)}</p>
            <div className="text-cyan-100 text-sm">
              Principal & Interest only. With taxes & insurance: <strong className="text-white">{fmtFull(result.monthlyPayment + monthlyExtras)}</strong>/mo
            </div>
          </div>

          {/* Breakdown */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className="text-sm text-gray-500 mb-1">Loan Amount</p>
              <p className="text-2xl font-bold text-gray-900 number-display">{fmt(result.principal)}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className="text-sm text-gray-500 mb-1">Total Interest</p>
              <p className="text-2xl font-bold text-red-600 number-display">{fmt(result.totalInterest)}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className="text-sm text-gray-500 mb-1">Total Cost</p>
              <p className="text-2xl font-bold text-gray-900 number-display">{fmt(result.totalPayment)}</p>
            </div>
          </div>

          {/* Payment Breakdown Bar */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Monthly Breakdown</h3>
            <div className="flex rounded-full overflow-hidden h-6 mb-3">
              <div
                className="bg-cyan-500"
                style={{ width: `${(result.monthlyPayment / (result.monthlyPayment + monthlyExtras)) * 100}%` }}
                title="Principal & Interest"
              />
              <div
                className="bg-amber-400"
                style={{ width: `${((parseFloat(propertyTax) || 0) / 12 / (result.monthlyPayment + monthlyExtras)) * 100}%` }}
                title="Property Tax"
              />
              <div
                className="bg-emerald-400"
                style={{ width: `${((parseFloat(homeInsurance) || 0) / 12 / (result.monthlyPayment + monthlyExtras)) * 100}%` }}
                title="Insurance"
              />
              {parseFloat(pmi) > 0 && (
                <div
                  className="bg-red-400"
                  style={{ width: `${((parseFloat(pmi) || 0) / 12 / (result.monthlyPayment + monthlyExtras)) * 100}%` }}
                  title="PMI"
                />
              )}
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                <span className="text-gray-600">P&I: {fmtFull(result.monthlyPayment)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="text-gray-600">Tax: {fmtFull((parseFloat(propertyTax) || 0) / 12)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-gray-600">Insurance: {fmtFull((parseFloat(homeInsurance) || 0) / 12)}</span>
              </div>
              {parseFloat(pmi) > 0 && (
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="text-gray-600">PMI: {fmtFull((parseFloat(pmi) || 0) / 12)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Amortization Schedule (first 10 years) */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-600" />
              Amortization Schedule
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 border-b border-gray-100">
                    <th className="text-left py-2 pr-4">Year</th>
                    <th className="text-right py-2 px-4">Principal</th>
                    <th className="text-right py-2 px-4">Interest</th>
                    <th className="text-right py-2 pl-4">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.slice(0, 10).map((row) => (
                    <tr key={row.year} className="border-b border-gray-50">
                      <td className="py-2 pr-4 font-medium">{row.year}</td>
                      <td className="py-2 px-4 text-right text-cyan-700">{fmt(row.principalPaid)}</td>
                      <td className="py-2 px-4 text-right text-red-600">{fmt(row.interestPaid)}</td>
                      <td className="py-2 pl-4 text-right">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {result.schedule.length > 10 && (
                <p className="text-xs text-gray-400 mt-2 text-center">Showing first 10 of {result.schedule.length} years</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
