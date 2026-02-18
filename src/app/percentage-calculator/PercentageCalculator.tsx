"use client";

import { useState } from "react";
import { Percent, ArrowRight, TrendingUp, TrendingDown } from "lucide-react";

type CalculationType = "whatIsPercent" | "isWhatPercent" | "percentChange";

export default function PercentageCalculator() {
  const [calcType, setCalcType] = useState<CalculationType>("whatIsPercent");
  
  // What is X% of Y
  const [percent1, setPercent1] = useState("");
  const [number1, setNumber1] = useState("");
  const [result1, setResult1] = useState<number | null>(null);

  // X is what % of Y
  const [partNumber, setPartNumber] = useState("");
  const [wholeNumber, setWholeNumber] = useState("");
  const [result2, setResult2] = useState<number | null>(null);

  // Percentage change
  const [oldValue, setOldValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [result3, setResult3] = useState<{ percent: number; type: "increase" | "decrease" } | null>(null);

  const calculateWhatIsPercent = () => {
    const p = parseFloat(percent1);
    const n = parseFloat(number1);
    if (!isNaN(p) && !isNaN(n)) {
      setResult1((n * p) / 100);
    }
  };

  const calculateIsWhatPercent = () => {
    const part = parseFloat(partNumber);
    const whole = parseFloat(wholeNumber);
    if (!isNaN(part) && !isNaN(whole) && whole !== 0) {
      setResult2((part / whole) * 100);
    }
  };

  const calculatePercentChange = () => {
    const oldVal = parseFloat(oldValue);
    const newVal = parseFloat(newValue);
    if (!isNaN(oldVal) && !isNaN(newVal) && oldVal !== 0) {
      const change = ((newVal - oldVal) / Math.abs(oldVal)) * 100;
      setResult3({
        percent: Math.abs(change),
        type: change >= 0 ? "increase" : "decrease",
      });
    }
  };

  const tabs = [
    { id: "whatIsPercent", label: "What is X% of Y?", color: "blue" },
    { id: "isWhatPercent", label: "X is what % of Y?", color: "purple" },
    { id: "percentChange", label: "% Change", color: "emerald" },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCalcType(tab.id as CalculationType)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              calcType === tab.id
                ? `bg-${tab.color}-500 text-white shadow-lg`
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={calcType === tab.id ? {
              backgroundColor: tab.color === "blue" ? "#3b82f6" : tab.color === "purple" ? "#8b5cf6" : "#10b981"
            } : {}}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Calculator Cards */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        {/* What is X% of Y */}
        {calcType === "whatIsPercent" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-lg">
              <span className="text-gray-600">What is</span>
              <input
                type="number"
                value={percent1}
                onChange={(e) => setPercent1(e.target.value)}
                placeholder="0"
                className="w-24 px-4 py-3 text-center text-xl font-semibold border border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
              />
              <span className="text-gray-600">% of</span>
              <input
                type="number"
                value={number1}
                onChange={(e) => setNumber1(e.target.value)}
                placeholder="0"
                className="w-32 px-4 py-3 text-center text-xl font-semibold border border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
              />
              <span className="text-gray-600">?</span>
            </div>
            
            <button
              onClick={calculateWhatIsPercent}
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              Calculate <ArrowRight className="w-4 h-4" />
            </button>

            {result1 !== null && (
              <div className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white result-animate">
                <p className="text-blue-100 text-sm mb-1">Result</p>
                <p className="text-4xl font-bold number-display">
                  {result1.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                </p>
                <p className="text-blue-100 text-sm mt-2">
                  {percent1}% of {number1} = {result1.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                </p>
              </div>
            )}
          </div>
        )}

        {/* X is what % of Y */}
        {calcType === "isWhatPercent" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-lg">
              <input
                type="number"
                value={partNumber}
                onChange={(e) => setPartNumber(e.target.value)}
                placeholder="0"
                className="w-32 px-4 py-3 text-center text-xl font-semibold border border-gray-200 rounded-xl focus:border-purple-500 transition-colors"
              />
              <span className="text-gray-600">is what % of</span>
              <input
                type="number"
                value={wholeNumber}
                onChange={(e) => setWholeNumber(e.target.value)}
                placeholder="0"
                className="w-32 px-4 py-3 text-center text-xl font-semibold border border-gray-200 rounded-xl focus:border-purple-500 transition-colors"
              />
              <span className="text-gray-600">?</span>
            </div>
            
            <button
              onClick={calculateIsWhatPercent}
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              Calculate <ArrowRight className="w-4 h-4" />
            </button>

            {result2 !== null && (
              <div className="p-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl text-white result-animate">
                <p className="text-purple-100 text-sm mb-1">Result</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-4xl font-bold number-display">
                    {result2.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                  <Percent className="w-8 h-8" />
                </div>
                <p className="text-purple-100 text-sm mt-2">
                  {partNumber} is {result2.toLocaleString(undefined, { maximumFractionDigits: 2 })}% of {wholeNumber}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Percentage Change */}
        {calcType === "percentChange" && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Original Value</label>
                <input
                  type="number"
                  value={oldValue}
                  onChange={(e) => setOldValue(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-3 text-center text-xl font-semibold border border-gray-200 rounded-xl focus:border-emerald-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">New Value</label>
                <input
                  type="number"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-3 text-center text-xl font-semibold border border-gray-200 rounded-xl focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
            
            <button
              onClick={calculatePercentChange}
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              Calculate <ArrowRight className="w-4 h-4" />
            </button>

            {result3 !== null && (
              <div className={`p-6 rounded-xl text-white result-animate ${
                result3.type === "increase" 
                  ? "bg-gradient-to-br from-emerald-500 to-teal-600" 
                  : "bg-gradient-to-br from-red-500 to-rose-600"
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  {result3.type === "increase" ? (
                    <TrendingUp className="w-5 h-5" />
                  ) : (
                    <TrendingDown className="w-5 h-5" />
                  )}
                  <p className="text-sm opacity-90 capitalize">{result3.type}</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <p className="text-4xl font-bold number-display">
                    {result3.percent.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                  <Percent className="w-8 h-8" />
                </div>
                <p className="text-sm opacity-90 mt-2">
                  From {oldValue} to {newValue} is a {result3.percent.toLocaleString(undefined, { maximumFractionDigits: 2 })}% {result3.type}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
