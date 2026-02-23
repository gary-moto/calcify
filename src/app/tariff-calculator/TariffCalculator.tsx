"use client";

import { useState } from "react";

const PRODUCT_CATEGORIES = [
  { name: "Electronics & Computers", rate: 15 },
  { name: "Automobiles & Parts", rate: 25 },
  { name: "Steel & Aluminum", rate: 25 },
  { name: "Clothing & Textiles", rate: 15 },
  { name: "Food & Agriculture", rate: 15 },
  { name: "Furniture", rate: 15 },
  { name: "Machinery & Equipment", rate: 15 },
  { name: "Pharmaceuticals", rate: 15 },
  { name: "Toys & Games", rate: 15 },
  { name: "Other / General", rate: 15 },
];

const COUNTRIES = [
  { name: "China", additionalRate: 20 },
  { name: "Canada", additionalRate: 0 },
  { name: "Mexico", additionalRate: 0 },
  { name: "European Union", additionalRate: 0 },
  { name: "Japan", additionalRate: 0 },
  { name: "South Korea", additionalRate: 0 },
  { name: "India", additionalRate: 0 },
  { name: "Vietnam", additionalRate: 0 },
  { name: "Taiwan", additionalRate: 0 },
  { name: "Other", additionalRate: 0 },
];

export default function TariffCalculator() {
  const [productValue, setProductValue] = useState("");
  const [category, setCategory] = useState(PRODUCT_CATEGORIES[0]);
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [quantity, setQuantity] = useState("1");
  const [shippingCost, setShippingCost] = useState("");
  const [calculated, setCalculated] = useState(false);

  const value = parseFloat(productValue) || 0;
  const qty = parseInt(quantity) || 1;
  const shipping = parseFloat(shippingCost) || 0;
  const totalProductValue = value * qty;
  const dutiableValue = totalProductValue + shipping;
  const baseTariffRate = category.rate;
  const additionalRate = country.additionalRate;
  const totalTariffRate = baseTariffRate + additionalRate;
  const tariffAmount = (dutiableValue * totalTariffRate) / 100;
  const totalCost = dutiableValue + tariffAmount;
  const priceIncrease = dutiableValue > 0 ? ((tariffAmount / dutiableValue) * 100).toFixed(1) : "0";

  const handleCalculate = () => {
    setCalculated(true);
  };

  return (
    <div>
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

        {/* Product Category */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Category
          </label>
          <select
            value={category.name}
            onChange={(e) => {
              const selected = PRODUCT_CATEGORIES.find(c => c.name === e.target.value);
              if (selected) setCategory(selected);
              setCalculated(false);
            }}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 text-lg bg-white"
          >
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name} ({cat.rate}% base tariff)
              </option>
            ))}
          </select>
        </div>

        {/* Country of Origin */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country of Origin
          </label>
          <select
            value={country.name}
            onChange={(e) => {
              const selected = COUNTRIES.find(c => c.name === e.target.value);
              if (selected) setCountry(selected);
              setCalculated(false);
            }}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 text-lg bg-white"
          >
            {COUNTRIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name} {c.additionalRate > 0 ? `(+${c.additionalRate}% additional)` : ""}
              </option>
            ))}
          </select>
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
                <p className="text-sm text-gray-500">Product Value</p>
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
                <p className="text-sm text-gray-500">Tariff Rate</p>
                <p className="text-2xl font-bold text-red-600">{totalTariffRate}%</p>
                {additionalRate > 0 && (
                  <p className="text-xs text-gray-400 mt-1">{baseTariffRate}% base + {additionalRate}% ({country.name})</p>
                )}
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

          {/* Disclaimer */}
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
            <p className="text-sm text-yellow-800">
              ⚠️ <strong>Disclaimer:</strong> These are estimates based on current US tariff rates as of February 2026. 
              Actual tariffs may vary based on specific HS codes, trade agreements, exemptions, and regulatory changes. 
              Consult a customs broker for exact duty calculations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
