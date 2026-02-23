import { Metadata } from "next";
import TariffCalculator from "./TariffCalculator";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorSchema from "@/components/CalculatorSchema";

export const metadata: Metadata = {
  title: "Tariff Calculator - Calculate Import Duties & Tariffs",
  description: "Free US tariff calculator. Calculate import duties, tariffs, and landed costs for goods from any country. Includes 2026 tariff rates for China, EU, and more.",
  keywords: [
    "tariff calculator", "import duty calculator", "customs duty calculator",
    "US tariff calculator", "import tax calculator", "tariff rate calculator",
    "China tariff calculator", "trade war calculator", "landed cost calculator",
    "customs calculator", "import cost calculator", "duty calculator",
    "how much is tariff", "tariff on imports", "2026 tariff rates",
    "trump tariff calculator", "section 232 tariff calculator",
    "steel tariff calculator", "aluminum tariff calculator", "auto tariff calculator",
    "import from China cost", "customs duty on electronics", "tariff on clothing",
    "how much duty on imports", "US customs duty rates", "de minimis threshold",
    "tariff lookup", "HTS code calculator", "harmonized tariff schedule",
    "IEEPA tariff supreme court", "tariff cost estimator", "landed cost estimator",
    "how tariffs affect prices", "tariff percentage by country",
    "Canada tariff rate 2026", "Mexico tariff rate 2026", "EU tariff rate",
  ],
  alternates: { canonical: "https://calcify.io/tariff-calculator" },
  openGraph: {
    title: "Tariff Calculator - Calculate Import Duties & Tariffs",
    description: "Calculate import duties and landed costs for goods from any country. Free online calculator with 2026 US tariff rates.",
    url: "https://calcify.io/tariff-calculator",
  },
};

export default function TariffCalculatorPage() {
  return (
    <CalculatorLayout>
      <CalculatorSchema
        name="Tariff Calculator"
        description="Calculate US import tariffs, duties, and total landed costs for goods from any country. Includes current 2026 tariff rates."
        url="https://calcify.io/tariff-calculator"
      />

      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-3">
          Tariff Calculator
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Calculate US import tariffs, duties, and total landed costs.
          Estimate how tariffs affect the price of imported goods.
        </p>
      </div>

      <TariffCalculator />

      {/* How to Use Section */}
      <section className="mt-16">
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 md:p-8 border border-red-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">📖</span> How to Use
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Enter the product value, select the category and country of origin, and the calculator 
            will estimate the tariff amount and total landed cost. Shipping costs are included in the 
            dutiable value as per US customs rules.
          </p>
        </div>
      </section>

      {/* Understanding Tariffs */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding US Tariffs</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">🏛️</span>
              <h3 className="font-semibold text-gray-900">Base Tariff Rate</h3>
            </div>
            <p className="text-gray-600 text-sm">Section 232 tariffs cover a wide range of products: steel (25%), aluminum (25%), autos (25%), plus lumber, furniture, heavy trucks, semiconductors, pharma, and copper. The IEEPA tariffs were struck down but Section 232 remains.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">🌍</span>
              <h3 className="font-semibold text-gray-900">Country-Specific Tariffs</h3>
            </div>
            <p className="text-gray-600 text-sm">Tariff rates vary by product and country of origin. Check the HTS code for your specific product at hts.usitc.gov for exact rates.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">📦</span>
              <h3 className="font-semibold text-gray-900">Dutiable Value</h3>
            </div>
            <p className="text-gray-600 text-sm">The value on which tariffs are calculated, typically including the product cost plus shipping and insurance.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">💰</span>
              <h3 className="font-semibold text-gray-900">Landed Cost</h3>
            </div>
            <p className="text-gray-600 text-sm">The total cost of a product delivered to you, including product value, shipping, and all tariffs/duties.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-500 font-bold">❓</span>
              <h3 className="font-semibold text-gray-900">What are the current US tariff rates?</h3>
            </div>
            <p className="text-gray-600 text-sm">
              As of February 2026, Section 232 tariffs remain in effect: 25% on steel, aluminum, autos, 
              plus tariffs on lumber, furniture, heavy trucks, semiconductors, pharma, and copper. 
              The Supreme Court struck down IEEPA tariffs but Section 232 tariffs are unaffected. 
              Average effective rate: ~6.7% on all imports. Verify at hts.usitc.gov.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-500 font-bold">❓</span>
              <h3 className="font-semibold text-gray-900">Do tariffs apply to personal purchases?</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Personal imports valued under $800 (de minimis threshold) are generally exempt from tariffs. 
              Above that amount, standard duty rates apply.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-500 font-bold">❓</span>
              <h3 className="font-semibold text-gray-900">How do tariffs affect consumer prices?</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Importers typically pass tariff costs to consumers through higher retail prices. 
              A 15% tariff can increase the final price of goods by 10-20% after markups through the supply chain.
            </p>
          </div>
        </div>
      </section>
    </CalculatorLayout>
  );
}
