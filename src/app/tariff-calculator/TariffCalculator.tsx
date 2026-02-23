"use client";

import { useState } from "react";

// Updated Feb 2026: Supreme Court struck down IEEPA tariffs (Feb 20, 2026).
// Section 232 tariffs remain: steel/aluminum (25%), autos (25%), lumber/furniture, heavy trucks, 
// semiconductors, pharma, copper. Avg effective tariff ~6.7% on all imports.
const COUNTRIES = [
  { name: "China", suggestedRate: 25, note: "Section 232 tariffs on steel, aluminum, autos, electronics, etc." },
  { name: "Canada", suggestedRate: 25, note: "25% on steel, aluminum, autos & lumber; varies by product" },
  { name: "Mexico", suggestedRate: 25, note: "25% on steel, aluminum, autos & heavy trucks; varies by product" },
  { name: "European Union", suggestedRate: 25, note: "25% on steel, aluminum & autos; varies by product" },
  { name: "Japan", suggestedRate: 25, note: "25% on steel, aluminum & autos; varies by product" },
  { name: "South Korea", suggestedRate: 25, note: "25% on steel, aluminum & autos; varies by product" },
  { name: "India", suggestedRate: 25, note: "25% on steel, aluminum & autos; varies by product" },
  { name: "Vietnam", suggestedRate: 25, note: "25% on steel, aluminum, furniture & electronics; varies by product" },
  { name: "Taiwan", suggestedRate: 25, note: "25% on steel, aluminum & semiconductors; varies by product" },
  { name: "Other", suggestedRate: 25, note: "25% on steel, aluminum & autos under Section 232; varies by product" },
];

export default function TariffCalculator() {
  const [productValue, setProductValue] = useState("");
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [tariffRate, setTariffRate] = useState("25");
  const [quantity, setQuantity] = useState("1");
  const [shippingCost, setShippingCost] = useState("");
  const [calculated, setCalculated] = useState(false);

  const value = parseFloat(productValue) || 0;
  const qty = parseInt(quantity) || 1;
  const shipping = parseFloat(shippingCost) || 0;
  const rate = parseFloat(tariffRate) || 0;
  const totalProductValue = value * qty;
  const dutiableValue = totalProductValue + shipping;
  const tariffAmount = (dutiableValue * rate) / 100;
  const totalCost = dutiableValue + tariffAmount;
  const priceIncrease = dutiableValue > 0 ? ((tariffAmount / dutiableValue) * 100).toFixed(1) : "0";

  const handleCountryChange = (name: string) => {
    const selected = COUNTRIES.find(c => c.name === name);
    if (selected) {
      setCountry(selected);
      setTariffRate(String(selected.suggestedRate));
      setCalculated(false);
    }
  };

  const handleCalculate = () => {
    setCalculated(true);
  };

  return (
    <div>
      {/* Rate Update Notice */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 mb-6">
        <p className="text-sm text-blue-800">
          ℹ️ <strong>Updated February 2026.</strong> On Feb 20, the Supreme Court struck down IEEPA-based tariffs. 
          However, <strong>Section 232 tariffs remain in full effect</strong> covering steel (25%), aluminum (25%), 
          autos (25%), lumber, furniture, heavy trucks, semiconductors, pharma, and copper. 
          The avg effective tariff rate is ~6.7% on all imports — highest since 1973. 
          Adjust the rate below for your specific product.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        {/* Product Value */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Value (USD)
          </label>
          <input
            type="number"
            value={productValue}
            onChange={(e) => { setProductValue(e.target.value); setCalculated(false); }}
            placeholder="Enter product value"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 text-lg"
          />
        </div>

        {/* Quantity */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => { setQuantity(e.target.value); setCalculated(false); }}
            min="1"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 text-lg"
          />
        </div>

        {/* Shipping Cost */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Shipping Cost (USD)
          </label>
          <input
            type="number"
            value={shippingCost}
            onChange={(e) => { setShippingCost(e.target.value); setCalculated(false); }}
            placeholder="Enter shipping cost (optional)"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 text-lg"
          />
        </div>

        {/* Country of Origin */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country of Origin
          </label>
          <select
            value={country.name}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 text-lg bg-white"
          >
            {COUNTRIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name} (suggested: {c.suggestedRate}%)
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-1">{country.note}</p>
        </div>

        {/* Tariff Rate - Editable */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tariff Rate (%)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={tariffRate}
              onChange={(e) => { setTariffRate(e.target.value); setCalculated(false); }}
              min="0"
              max="100"
              step="0.1"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 text-lg"
            />
            <span className="text-lg text-gray-500 flex-shrink-0">%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Auto-filled based on country. Adjust if you know the exact rate for your product.
          </p>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full py-3 px-6 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-orange-600 transition-all text-lg"
        >
          Calculate Tariff
        </button>
      </div>

      {/* Results */}
      {calculated && value > 0 && (
        <div className="mt-8 result-animate">
          {/* Summary Card */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 md:p-8 border border-red-100 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Tariff Breakdown</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-sm text-gray-500">Product Value ({qty} × ${value.toLocaleString()})</p>
                <p className="text-2xl font-bold text-gray-900">${totalProductValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-sm text-gray-500">Shipping</p>
                <p className="text-2xl font-bold text-gray-900">${shipping.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-sm text-gray-500">Dutiable Value</p>
                <p className="text-2xl font-bold text-gray-900">${dutiableValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-sm text-gray-500">Tariff Rate Applied</p>
                <p className="text-2xl font-bold text-red-600">{rate}%</p>
                <p className="text-xs text-gray-400 mt-1">From: {country.name}</p>
              </div>
            </div>
          </div>

          {/* Total Cost */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 md:p-8 text-white mb-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400">Estimated Tariff / Duty</p>
                <p className="text-3xl font-bold text-red-400">${tariffAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Landed Cost</p>
                <p className="text-3xl font-bold text-green-400">${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                Price increase due to tariffs: <span className="text-yellow-400 font-semibold">{priceIncrease}%</span>
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Cost Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-gray-500 font-medium">Item</th>
                    <th className="text-right py-2 text-gray-500 font-medium">Without Tariff</th>
                    <th className="text-right py-2 text-gray-500 font-medium">With Tariff</th>
                    <th className="text-right py-2 text-gray-500 font-medium">Difference</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 text-gray-700">Per Unit Cost</td>
                    <td className="py-3 text-right text-gray-700">${(value + shipping / qty).toFixed(2)}</td>
                    <td className="py-3 text-right text-gray-700">${((totalCost) / qty).toFixed(2)}</td>
                    <td className="py-3 text-right text-red-600">+${(tariffAmount / qty).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-700 font-semibold">Total</td>
                    <td className="py-3 text-right text-gray-700 font-semibold">${dutiableValue.toFixed(2)}</td>
                    <td className="py-3 text-right text-gray-700 font-semibold">${totalCost.toFixed(2)}</td>
                    <td className="py-3 text-right text-red-600 font-semibold">+${tariffAmount.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
            <p className="text-sm text-yellow-800">
              ⚠️ <strong>Disclaimer:</strong> These are estimates only. Actual tariffs depend on specific HS (Harmonized System) codes, 
              trade agreements, exemptions, and regulatory changes. Tariff rates are changing rapidly in 2026. 
              Always verify current rates at <a href="https://hts.usitc.gov/" target="_blank" rel="noopener noreferrer" className="underline font-medium">hts.usitc.gov</a> or 
              consult a licensed customs broker for exact duty calculations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
