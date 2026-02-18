"use client";

import { useState } from "react";
import { Baby, Calendar, Heart, Clock, Sparkles, CheckCircle } from "lucide-react";

interface PregnancyResult {
  dueDate: Date;
  currentWeek: number;
  currentDay: number;
  trimester: number;
  daysRemaining: number;
  daysPregnant: number;
  percentComplete: number;
  conceptionDate: Date;
  milestones: Milestone[];
}

interface Milestone {
  week: number;
  title: string;
  description: string;
  passed: boolean;
}

const PREGNANCY_MILESTONES = [
  { week: 4, title: "Positive Test", description: "Pregnancy can be detected" },
  { week: 6, title: "Heartbeat", description: "Baby's heart starts beating" },
  { week: 8, title: "First Prenatal", description: "Schedule your first appointment" },
  { week: 12, title: "End of 1st Trimester", description: "Risk of miscarriage decreases" },
  { week: 16, title: "Gender Reveal", description: "Baby's sex may be visible on ultrasound" },
  { week: 20, title: "Anatomy Scan", description: "Detailed ultrasound of baby" },
  { week: 24, title: "Viability", description: "Baby could survive outside womb with help" },
  { week: 27, title: "3rd Trimester", description: "Final stretch begins" },
  { week: 32, title: "Baby Position", description: "Baby usually moves head-down" },
  { week: 37, title: "Full Term", description: "Baby is considered full term" },
  { week: 40, title: "Due Date", description: "Estimated delivery date" },
];

function parseLocalDate(dateString: string): Date {
  // Parse YYYY-MM-DD as local date (not UTC)
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function calculatePregnancy(dateString: string, method: "lmp" | "conception"): PregnancyResult {
  const today = new Date();
  const inputDate = parseLocalDate(dateString);
  let conceptionDate: Date;
  let gestationalStart: Date;

  if (method === "conception") {
    conceptionDate = new Date(inputDate);
    // LMP is typically 2 weeks before conception
    gestationalStart = new Date(conceptionDate);
    gestationalStart.setDate(gestationalStart.getDate() - 14);
  } else {
    gestationalStart = new Date(inputDate);
    // Conception typically occurs 14 days after LMP
    conceptionDate = new Date(inputDate);
    conceptionDate.setDate(conceptionDate.getDate() + 14);
  }

  // Due date is 280 days (40 weeks) from LMP
  const dueDate = new Date(gestationalStart);
  dueDate.setDate(dueDate.getDate() + 280);

  // Calculate current progress
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysPregnant = Math.max(0, Math.floor((today.getTime() - gestationalStart.getTime()) / msPerDay));
  const currentWeek = Math.floor(daysPregnant / 7);
  const currentDay = daysPregnant % 7;
  const daysRemaining = Math.max(0, Math.ceil((dueDate.getTime() - today.getTime()) / msPerDay));
  const percentComplete = Math.min(100, Math.max(0, Math.round((daysPregnant / 280) * 100)));

  // Determine trimester
  let trimester = 1;
  if (currentWeek >= 27) trimester = 3;
  else if (currentWeek >= 13) trimester = 2;

  // Calculate milestones
  const milestones = PREGNANCY_MILESTONES.map((m) => ({
    ...m,
    passed: currentWeek >= m.week,
  }));

  return {
    dueDate,
    currentWeek,
    currentDay,
    trimester,
    daysRemaining,
    daysPregnant,
    percentComplete,
    conceptionDate,
    milestones,
  };
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PregnancyCalculator() {
  const [date, setDate] = useState<string>("");
  const [method, setMethod] = useState<"lmp" | "conception">("lmp");
  const [result, setResult] = useState<PregnancyResult | null>(null);

  const handleCalculate = () => {
    if (!date) return;
    // Check if date is in the future
    const inputDate = parseLocalDate(date);
    if (inputDate > new Date()) {
      setResult(null);
      return;
    }
    setResult(calculatePregnancy(date, method));
  };

  const trimesterColors = {
    1: "from-pink-500 to-rose-500",
    2: "from-purple-500 to-indigo-500",
    3: "from-blue-500 to-cyan-500",
  };

  const trimesterNames = {
    1: "First Trimester",
    2: "Second Trimester",
    3: "Third Trimester",
  };

  return (
    <div className="space-y-8">
      {/* Input Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <div className="space-y-4">
          {/* Method Selection */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Calculate based on
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="lmp"
                  checked={method === "lmp"}
                  onChange={() => setMethod("lmp")}
                  className="w-4 h-4 text-pink-500"
                />
                <span className="text-gray-700">Last Menstrual Period</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="conception"
                  checked={method === "conception"}
                  onChange={() => setMethod("conception")}
                  className="w-4 h-4 text-pink-500"
                />
                <span className="text-gray-700">Conception Date</span>
              </label>
            </div>
          </div>

          {/* Date Input */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              {method === "lmp" ? "First day of last period" : "Conception date"}
            </label>
            <div className="flex gap-4">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="flex-1 md:flex-none px-4 py-3 text-lg border border-gray-200 rounded-xl focus:border-pink-500 transition-colors"
              />
              <button
                onClick={handleCalculate}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all shadow-sm"
              >
                Calculate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6 result-animate">
          {/* Main Info */}
          <div className={`bg-gradient-to-br ${trimesterColors[result.trimester as keyof typeof trimesterColors]} rounded-2xl p-6 md:p-8 text-white`}>
            <div className="flex items-center gap-2 mb-4 text-white/80">
              <Baby className="w-5 h-5" />
              <span className="text-sm font-medium">{trimesterNames[result.trimester as keyof typeof trimesterNames]}</span>
            </div>
            
            <div className="flex flex-wrap items-baseline gap-6 mb-6">
              <div className="text-center">
                <span className="text-6xl md:text-7xl font-bold">{result.currentWeek}</span>
                <span className="block text-white/80 text-sm mt-1">Weeks</span>
              </div>
              <div className="text-center">
                <span className="text-6xl md:text-7xl font-bold">{result.currentDay}</span>
                <span className="block text-white/80 text-sm mt-1">Days</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-white/80 mb-2">
                <span>Progress</span>
                <span>{result.percentComplete}%</span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${result.percentComplete}%` }}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/20 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">{result.daysPregnant} days pregnant</span>
            </div>
          </div>

          {/* Key Dates */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-pink-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-pink-500" />
                </div>
                <span className="font-medium text-gray-900">Due Date</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {formatDate(result.dueDate)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {result.daysRemaining} days remaining
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Heart className="w-5 h-5 text-purple-500" />
                </div>
                <span className="font-medium text-gray-900">Conception Date</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {formatDate(result.conceptionDate)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Estimated date of conception
              </p>
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" />
              Pregnancy Milestones
            </h3>
            <div className="space-y-3">
              {result.milestones.map((milestone, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                    milestone.passed ? "bg-green-50" : "bg-gray-50"
                  }`}
                >
                  <div className={`mt-0.5 ${milestone.passed ? "text-green-500" : "text-gray-300"}`}>
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${milestone.passed ? "text-green-700" : "text-gray-700"}`}>
                        Week {milestone.week}
                      </span>
                      <span className={`text-sm ${milestone.passed ? "text-green-600" : "text-gray-500"}`}>
                        — {milestone.title}
                      </span>
                    </div>
                    <p className={`text-sm ${milestone.passed ? "text-green-600" : "text-gray-500"}`}>
                      {milestone.description}
                    </p>
                  </div>
                  {milestone.week === result.currentWeek && (
                    <span className="px-2 py-1 bg-pink-100 text-pink-600 text-xs font-medium rounded-full">
                      You are here
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
