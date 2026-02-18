"use client";

import { useState } from "react";
import { Calendar, ArrowRight, Plus, Minus } from "lucide-react";

type CalculationType = "between" | "addSubtract";

interface DateDifference {
  totalDays: number;
  years: number;
  months: number;
  weeks: number;
  days: number;
  totalWeeks: number;
  totalHours: number;
  includesEndDate: boolean;
}

interface AddSubtractResult {
  resultDate: Date;
  dayOfWeek: string;
}

function calculateDateDifference(start: Date, end: Date, includeEnd: boolean): DateDifference {
  // Ensure start is before end
  if (start > end) {
    [start, end] = [end, start];
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  let totalDays = Math.floor((end.getTime() - start.getTime()) / msPerDay);
  if (includeEnd) totalDays += 1;

  // Calculate years, months, days
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    totalDays,
    years,
    months,
    weeks: Math.floor(totalDays / 7),
    days: totalDays % 7,
    totalWeeks: Math.floor(totalDays / 7),
    totalHours: totalDays * 24,
    includesEndDate: includeEnd,
  };
}

function parseLocalDate(dateString: string): Date {
  // Parse YYYY-MM-DD as local date (not UTC)
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getDayOfWeek(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

export default function DateCalculator() {
  const [calcType, setCalcType] = useState<CalculationType>("between");
  
  // Days between dates
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [includeEndDate, setIncludeEndDate] = useState(false);
  const [betweenResult, setBetweenResult] = useState<DateDifference | null>(null);

  // Add/Subtract days
  const [baseDate, setBaseDate] = useState("");
  const [amountToAdd, setAmountToAdd] = useState("");
  const [unit, setUnit] = useState<"days" | "weeks" | "months" | "years">("days");
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [addResult, setAddResult] = useState<AddSubtractResult | null>(null);

  const calculateBetween = () => {
    if (!startDate || !endDate) return;
    const result = calculateDateDifference(
      parseLocalDate(startDate),
      parseLocalDate(endDate),
      includeEndDate
    );
    setBetweenResult(result);
  };

  const calculateAddSubtract = () => {
    if (!baseDate || !amountToAdd) return;
    const base = parseLocalDate(baseDate);
    // Use absolute value to handle if user types negative number
    const rawAmount = Math.abs(parseInt(amountToAdd));
    const amount = rawAmount * (operation === "subtract" ? -1 : 1);
    const resultDate = new Date(base);
    
    switch (unit) {
      case "days":
        resultDate.setDate(resultDate.getDate() + amount);
        break;
      case "weeks":
        resultDate.setDate(resultDate.getDate() + (amount * 7));
        break;
      case "months":
        resultDate.setMonth(resultDate.getMonth() + amount);
        break;
      case "years":
        resultDate.setFullYear(resultDate.getFullYear() + amount);
        break;
    }
    
    setAddResult({
      resultDate,
      dayOfWeek: getDayOfWeek(resultDate),
    });
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCalcType("between")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            calcType === "between"
              ? "bg-emerald-500 text-white shadow-lg"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Days Between Dates
        </button>
        <button
          onClick={() => setCalcType("addSubtract")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            calcType === "addSubtract"
              ? "bg-emerald-500 text-white shadow-lg"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Add/Subtract Days
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        {/* Days Between Dates */}
        {calcType === "between" && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 text-lg border border-gray-200 rounded-xl focus:border-emerald-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 text-lg border border-gray-200 rounded-xl focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeEndDate}
                onChange={(e) => setIncludeEndDate(e.target.checked)}
                className="w-4 h-4 text-emerald-500 rounded"
              />
              <span className="text-gray-600 text-sm">Include end date in calculation</span>
            </label>

            <button
              onClick={calculateBetween}
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              Calculate <ArrowRight className="w-4 h-4" />
            </button>

            {betweenResult && (
              <div className="space-y-4 result-animate">
                {/* Main Result */}
                <div className="p-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl text-white">
                  <div className="flex items-center gap-2 mb-2 text-emerald-100">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm">Total Duration</span>
                  </div>
                  <div className="flex flex-wrap items-baseline gap-4">
                    {betweenResult.years > 0 && (
                      <div className="text-center">
                        <span className="text-4xl font-bold">{betweenResult.years}</span>
                        <span className="block text-emerald-100 text-sm">Years</span>
                      </div>
                    )}
                    {betweenResult.months > 0 && (
                      <div className="text-center">
                        <span className="text-4xl font-bold">{betweenResult.months}</span>
                        <span className="block text-emerald-100 text-sm">Months</span>
                      </div>
                    )}
                    <div className="text-center">
                      <span className="text-4xl font-bold">{betweenResult.years > 0 || betweenResult.months > 0 ? betweenResult.days : betweenResult.totalDays}</span>
                      <span className="block text-emerald-100 text-sm">Days</span>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">{betweenResult.totalDays.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Total Days</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">{betweenResult.totalWeeks.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Total Weeks</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">{betweenResult.totalHours.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Total Hours</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">{(betweenResult.totalDays * 24 * 60).toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Total Minutes</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Add/Subtract Days */}
        {calcType === "addSubtract" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Start Date</label>
              <input
                type="date"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
                className="w-full md:w-auto px-4 py-3 text-lg border border-gray-200 rounded-xl focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex rounded-xl overflow-hidden border border-gray-200">
                <button
                  onClick={() => setOperation("add")}
                  className={`px-4 py-2 flex items-center gap-1 transition-colors ${
                    operation === "add" ? "bg-emerald-500 text-white" : "bg-gray-50 text-gray-600"
                  }`}
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
                <button
                  onClick={() => setOperation("subtract")}
                  className={`px-4 py-2 flex items-center gap-1 transition-colors ${
                    operation === "subtract" ? "bg-red-500 text-white" : "bg-gray-50 text-gray-600"
                  }`}
                >
                  <Minus className="w-4 h-4" /> Subtract
                </button>
              </div>
              <input
                type="number"
                value={amountToAdd}
                onChange={(e) => setAmountToAdd(e.target.value)}
                placeholder="0"
                min="0"
                className="w-24 px-4 py-3 text-center text-xl font-semibold border border-gray-200 rounded-xl focus:border-emerald-500 transition-colors"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as typeof unit)}
                className="px-4 py-3 text-lg font-medium border border-gray-200 rounded-xl focus:border-emerald-500 transition-colors bg-white"
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>

            <button
              onClick={calculateAddSubtract}
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              Calculate <ArrowRight className="w-4 h-4" />
            </button>

            {addResult && (
              <div className="p-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl text-white result-animate">
                <p className="text-emerald-100 text-sm mb-1">Result Date</p>
                <p className="text-2xl md:text-3xl font-bold">{formatDate(addResult.resultDate)}</p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-sm text-emerald-100">
                    {baseDate && `${parseLocalDate(baseDate).toLocaleDateString()} ${operation === "add" ? "+" : "−"} ${amountToAdd} ${unit}`}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
