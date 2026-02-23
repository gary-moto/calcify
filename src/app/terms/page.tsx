import { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for Calcify - Free Online Calculators.",
};

export default function TermsPage() {
  return (
    <CalculatorLayout>
      <div className="prose prose-gray max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Terms of Use</h1>
        <p className="text-gray-500 mb-8">Last updated: February 23, 2026</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">1. Acceptance of Terms</h2>
        <p className="text-gray-600 mb-4">
          By accessing and using Calcify (calcify.io), you agree to be bound by these Terms of Use. 
          If you do not agree, please do not use our website.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">2. Use of Calculators</h2>
        <p className="text-gray-600 mb-4">
          Our calculators are provided for general informational and educational purposes only. Results are 
          estimates and should not be used as a substitute for professional advice.
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
          <li>The <strong>Pregnancy Calculator</strong> provides estimates only. Always consult your healthcare provider for medical decisions.</li>
          <li>The <strong>Tip Calculator</strong> provides suggestions. Actual tipping practices may vary by region and establishment.</li>
          <li>All calculations are performed locally in your browser and are not stored or transmitted.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">3. Accuracy Disclaimer</h2>
        <p className="text-gray-600 mb-4">
          While we strive for accuracy, we make no guarantees about the correctness or completeness of any 
          calculations. We are not liable for any decisions made based on the results of our calculators.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">4. Intellectual Property</h2>
        <p className="text-gray-600 mb-4">
          All content, design, and code on this website is the property of Calcify unless otherwise stated. 
          You may not reproduce or redistribute our content without permission.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">5. Third-Party Links</h2>
        <p className="text-gray-600 mb-4">
          Our website may contain links to third-party websites or display third-party advertisements. 
          We are not responsible for the content or practices of these third parties.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">6. Limitation of Liability</h2>
        <p className="text-gray-600 mb-4">
          Calcify is provided &ldquo;as is&rdquo; without warranties of any kind. In no event shall we be liable for any 
          indirect, incidental, or consequential damages arising from your use of this website.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">7. Changes to Terms</h2>
        <p className="text-gray-600 mb-4">
          We reserve the right to modify these terms at any time. Continued use of the website after changes 
          constitutes acceptance of the new terms.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">8. Contact</h2>
        <p className="text-gray-600 mb-4">
          For questions about these Terms of Use, contact us at contact@calcify.io.
        </p>
      </div>
    </CalculatorLayout>
  );
}
