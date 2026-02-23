import { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Calcify - Free Online Calculators. Learn how we handle your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <CalculatorLayout>
      <div className="prose prose-gray max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: February 23, 2026</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">1. Introduction</h2>
        <p className="text-gray-600 mb-4">
          Welcome to Calcify (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). We are committed to protecting your privacy. 
          This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website calcify.io.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">2. Information We Collect</h2>
        <p className="text-gray-600 mb-4">
          <strong>We do not collect personal information.</strong> Our calculators run entirely in your browser. 
          We do not require you to create an account, sign in, or provide any personal details.
        </p>
        <p className="text-gray-600 mb-4">We may automatically collect:</p>
        <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
          <li>Browser type and version</li>
          <li>Device type (mobile, desktop, tablet)</li>
          <li>Pages visited and time spent</li>
          <li>Referring website</li>
          <li>Approximate geographic location (country/region level)</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">3. How We Use Information</h2>
        <p className="text-gray-600 mb-4">We use automatically collected information to:</p>
        <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
          <li>Improve our website and calculators</li>
          <li>Understand how visitors use our site</li>
          <li>Monitor and analyze usage trends</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">4. Cookies</h2>
        <p className="text-gray-600 mb-4">
          We may use cookies and similar tracking technologies to enhance your experience. 
          Third-party services such as Google Analytics and Google AdSense may also place cookies on your device.
        </p>
        <p className="text-gray-600 mb-4">
          You can control cookies through your browser settings. Disabling cookies may affect some functionality.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">5. Third-Party Advertising</h2>
        <p className="text-gray-600 mb-4">
          We may display advertisements through Google AdSense or similar networks. These services may use cookies 
          to serve ads based on your prior visits to our site or other websites. You can opt out of personalized 
          advertising by visiting <a href="https://www.google.com/settings/ads" className="text-indigo-600 hover:underline">Google Ads Settings</a>.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">6. Data Security</h2>
        <p className="text-gray-600 mb-4">
          We implement reasonable security measures to protect any information collected. However, no method of 
          transmission over the Internet is 100% secure.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">7. Children&apos;s Privacy</h2>
        <p className="text-gray-600 mb-4">
          Our website is not directed to children under 13. We do not knowingly collect personal information from children.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">8. Changes to This Policy</h2>
        <p className="text-gray-600 mb-4">
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">9. Contact Us</h2>
        <p className="text-gray-600 mb-4">
          If you have questions about this Privacy Policy, please contact us at privacy@calcify.io.
        </p>
      </div>
    </CalculatorLayout>
  );
}
