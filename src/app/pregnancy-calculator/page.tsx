import { Metadata } from "next";
import PregnancyCalculator from "./PregnancyCalculator";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorSchema from "@/components/CalculatorSchema";

export const metadata: Metadata = {
  title: "Pregnancy Calculator - Due Date & Week Calculator",
  description: "Free pregnancy calculator. Calculate your due date, current week, trimester, and pregnancy milestones. Track your pregnancy journey from LMP or conception date.",
  keywords: [
    "pregnancy calculator", "due date calculator", "pregnancy week calculator",
    "conception calculator", "pregnancy countdown", "trimester calculator",
    "when is my due date", "how far along am I", "pregnancy month calculator",
    "LMP calculator", "estimated due date", "EDD calculator",
    "baby due date", "pregnancy tracker", "weeks pregnant calculator",
    "first trimester calculator", "conception date calculator",
    "pregnancy due date from last period", "IVF due date calculator",
    "how many weeks pregnant am I", "pregnancy calendar", "gestational age calculator",
    "due date by ultrasound", "pregnancy milestone tracker", "baby countdown calculator",
    "expected delivery date", "9 month calculator pregnancy", "40 week calculator",
    "due date based on conception", "pregnancy progress calculator",
    "second trimester when", "third trimester calculator", "due date from ovulation",
  ],
  alternates: { canonical: "https://calcify.io/pregnancy-calculator" },
  openGraph: {
    title: "Pregnancy Calculator - Due Date & Week Calculator",
    description: "Calculate your due date, current pregnancy week, and important milestones. Free and accurate.",
    url: "https://calcify.io/pregnancy-calculator",
  },
};

export default function PregnancyCalculatorPage() {
  return (
    <CalculatorLayout>
      <CalculatorSchema
        name="Pregnancy Calculator"
        description="Calculate your due date, current pregnancy week, trimester, and important milestones throughout your pregnancy journey."
        url="https://calcify.io/pregnancy-calculator"
      />
      
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-3">
          Pregnancy Calculator
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Calculate your due date, current pregnancy week, trimester, and 
          important milestones throughout your pregnancy journey.
        </p>
      </div>

      <PregnancyCalculator />

      {/* How to Use Section */}
      <section className="mt-16">
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 md:p-8 border border-pink-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">📖</span> How to Use
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Enter the first day of your last menstrual period (LMP) and the calculator will 
            estimate your due date, current week of pregnancy, and show you important milestones.
            You can also calculate based on your conception date if you know it.
          </p>
        </div>
      </section>

      {/* Understanding Results */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Your Results</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">📅</span>
              <h3 className="font-semibold text-gray-900">Due Date</h3>
            </div>
            <p className="text-gray-600 text-sm">Estimated date of delivery, typically 40 weeks from your LMP.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">📊</span>
              <h3 className="font-semibold text-gray-900">Current Week</h3>
            </div>
            <p className="text-gray-600 text-sm">How far along you are in your pregnancy journey.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">🎯</span>
              <h3 className="font-semibold text-gray-900">Trimester</h3>
            </div>
            <p className="text-gray-600 text-sm">Pregnancies are divided into three trimesters of about 13 weeks each.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">⏳</span>
              <h3 className="font-semibold text-gray-900">Days Remaining</h3>
            </div>
            <p className="text-gray-600 text-sm">Countdown to your estimated due date.</p>
          </div>
        </div>
      </section>

      {/* Trimesters */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Pregnancy Trimesters</h2>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">Weeks 1-12</span>
              <h3 className="font-semibold text-lg">First Trimester</h3>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              The first trimester begins on the first day of your last period. During this time, 
              major organs begin to form and the baby&apos;s heart starts beating around week 6.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">Weeks 13-26</span>
              <h3 className="font-semibold text-lg">Second Trimester</h3>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              Often called the &quot;golden period&quot; of pregnancy. You may start feeling baby movements 
              around weeks 18-22. The baby grows significantly during this time.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">Weeks 27-40</span>
              <h3 className="font-semibold text-lg">Third Trimester</h3>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              The final stretch! The baby continues growing and developing, preparing for birth. 
              You may experience more frequent doctor visits during this period.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="text-lg">❓</span>
              How accurate is the due date?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Only about 5% of babies are born on their exact due date. Most babies arrive 
              within two weeks before or after the estimated date. Your healthcare provider 
              may adjust the date based on ultrasound measurements.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="text-lg">❓</span>
              What if I don&apos;t know my LMP?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              If you know your conception date, you can use that instead. Add 266 days (38 weeks) 
              to the conception date to estimate your due date. An early ultrasound can also 
              help determine gestational age.
            </p>
          </div>
        </div>
      </section>
    </CalculatorLayout>
  );
}
