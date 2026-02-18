"use client";

import { useState, useEffect } from "react";
import { DollarSign, Users, Receipt, Sparkles } from "lucide-react";

const tipPresets = [10, 15, 18, 20, 25];

interface TipResult {
  tipAmount: number;
  totalAmount: number;
  perPersonTip: number;
  perPersonTotal: number;
}

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercent, setTipPercent] = useState(18);
  const [customTip, setCustomTip] = useState("");
  const [useCustomTip, setUseCustomTip] = useState(false);
  const [splitCount, setSplitCount] = useState(1);
  const [result, setResult] = useState<TipResult | null>(null);

  // Calculate on any input change
  useEffect(() => {
    const bill = Math.abs(parseFloat(billAmount) || 0);
    const tip = Math.abs(useCustomTip ? (parseFloat(customTip) || 0) : tipPercent);
    
    if (bill > 0) {
      const tipAmount = (bill * tip) / 100;
      const totalAmount = bill + tipAmount;
      setResult({
        tipAmount,
        totalAmount,
        perPersonTip: tipAmount / splitCount,
        perPersonTotal: totalAmount / splitCount,
      });
    } else {
      setResult(null);
    }
  }, [billAmount, tipPercent, customTip, useCustomTip, splitCount]);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        {/* Bill Amount */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">Bill Amount</label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full pl-12 pr-4 py-4 text-2xl font-semibold border border-gray-200 rounded-xl focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        {/* Tip Percentage */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-3">Tip Percentage</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {tipPresets.map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  setTipPercent(preset);
                  setUseCustomTip(false);
                }}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  !useCustomTip && tipPercent === preset
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {preset}%
              </button>
            ))}
            <button
              onClick={() => setUseCustomTip(true)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                useCustomTip
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Custom
            </button>
          </div>
          
          {useCustomTip && (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={customTip}
                onChange={(e) => setCustomTip(e.target.value)}
                placeholder="Enter percentage"
                min="0"
                max="100"
                className="w-32 px-4 py-2 text-center font-semibold border border-gray-200 rounded-lg focus:border-orange-500 transition-colors"
              />
              <span className="text-gray-600">%</span>
            </div>
          )}
        </div>

        {/* Split Bill */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-3">Split Between</label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSplitCount(Math.max(1, splitCount - 1))}
              className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 font-bold text-xl hover:bg-gray-200 transition-colors"
            >
              −
            </button>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-400" />
              <span className="text-2xl font-bold text-gray-900 w-8 text-center">{splitCount}</span>
              <span className="text-gray-600">{splitCount === 1 ? "person" : "people"}</span>
            </div>
            <button
              onClick={() => setSplitCount(splitCount + 1)}
              className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 font-bold text-xl hover:bg-gray-200 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4 result-animate">
          {/* Main Result Card */}
          <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-6 text-white">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 text-orange-100 mb-1">
                  <Receipt className="w-4 h-4" />
                  <span className="text-sm">Tip Amount</span>
                </div>
                <p className="text-4xl font-bold number-display">{formatCurrency(result.tipAmount)}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-orange-100 mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">Total with Tip</span>
                </div>
                <p className="text-4xl font-bold number-display">{formatCurrency(result.totalAmount)}</p>
              </div>
            </div>
          </div>

          {/* Per Person (if split) */}
          {splitCount > 1 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <Users className="w-5 h-5" />
                <span className="font-medium">Per Person ({splitCount} people)</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-orange-50 rounded-xl p-4">
                  <p className="text-sm text-orange-600 mb-1">Tip per person</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.perPersonTip)}</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4">
                  <p className="text-sm text-orange-600 mb-1">Total per person</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.perPersonTotal)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Summary */}
          <div className="bg-gray-50 rounded-xl p-4 text-center text-sm text-gray-600">
            <p>
              {formatCurrency(parseFloat(billAmount) || 0)} bill + {formatCurrency(result.tipAmount)} tip ({useCustomTip ? customTip : tipPercent}%)
              {splitCount > 1 && ` ÷ ${splitCount} people`} = <strong className="text-gray-900">{formatCurrency(splitCount > 1 ? result.perPersonTotal : result.totalAmount)}</strong>
              {splitCount > 1 && " each"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
