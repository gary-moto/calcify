"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, Gift, Sparkles } from "lucide-react";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  nextBirthday: Date;
  daysUntilBirthday: number;
  zodiacSign: string;
}

function parseLocalDate(dateString: string): Date {
  // Parse YYYY-MM-DD as local date (not UTC)
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function calculateAge(birthDateString: string): AgeResult {
  const now = new Date();
  const birth = parseLocalDate(birthDateString);
  
  // Calculate years, months, days
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();
  
  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // Calculate totals
  const diffMs = now.getTime() - birth.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const totalSeconds = Math.floor(diffMs / 1000);
  
  // Calculate next birthday
  let nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday <= now) {
    nextBirthday = new Date(now.getFullYear() + 1, birth.getMonth(), birth.getDate());
  }
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  // Get zodiac sign
  const zodiacSign = getZodiacSign(birth.getMonth() + 1, birth.getDate());
  
  return {
    years,
    months,
    days,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    nextBirthday,
    daysUntilBirthday,
    zodiacSign,
  };
}

function getZodiacSign(month: number, day: number): string {
  const signs = [
    { sign: "Capricorn ♑", end: [1, 19] },
    { sign: "Aquarius ♒", end: [2, 18] },
    { sign: "Pisces ♓", end: [3, 20] },
    { sign: "Aries ♈", end: [4, 19] },
    { sign: "Taurus ♉", end: [5, 20] },
    { sign: "Gemini ♊", end: [6, 20] },
    { sign: "Cancer ♋", end: [7, 22] },
    { sign: "Leo ♌", end: [8, 22] },
    { sign: "Virgo ♍", end: [9, 22] },
    { sign: "Libra ♎", end: [10, 22] },
    { sign: "Scorpio ♏", end: [11, 21] },
    { sign: "Sagittarius ♐", end: [12, 21] },
    { sign: "Capricorn ♑", end: [12, 31] },
  ];
  
  for (const { sign, end } of signs) {
    if (month < end[0] || (month === end[0] && day <= end[1])) {
      return sign;
    }
  }
  return "Capricorn ♑";
}

function formatNumber(num: number): string {
  return num.toLocaleString();
}

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [result, setResult] = useState<AgeResult | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Update time every second for live calculations
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (birthDate) {
        const birthDateObj = parseLocalDate(birthDate);
        if (birthDateObj <= new Date()) {
          setResult(calculateAge(birthDate));
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [birthDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setBirthDate(date);
    if (date) {
      // Check if date is in the future
      const birthDateObj = parseLocalDate(date);
      if (birthDateObj > new Date()) {
        setResult(null);
        return;
      }
      setResult(calculateAge(date));
    } else {
      setResult(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Input Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <label className="block mb-2 font-medium text-gray-700">
          Enter your date of birth
        </label>
        <input
          type="date"
          value={birthDate}
          onChange={handleDateChange}
          max={new Date().toISOString().split("T")[0]}
          className="w-full md:w-auto px-4 py-3 text-lg border border-gray-200 rounded-xl focus:border-indigo-500 transition-colors"
        />
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6 result-animate">
          {/* Main Age Display */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white">
            <div className="flex items-center gap-2 mb-4 text-indigo-200">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">Your Age</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-4 md:gap-6">
              <div className="text-center">
                <span className="text-5xl md:text-6xl font-bold number-display">{result.years}</span>
                <span className="block text-indigo-200 text-sm mt-1">Years</span>
              </div>
              <div className="text-center">
                <span className="text-5xl md:text-6xl font-bold number-display">{result.months}</span>
                <span className="block text-indigo-200 text-sm mt-1">Months</span>
              </div>
              <div className="text-center">
                <span className="text-5xl md:text-6xl font-bold number-display">{result.days}</span>
                <span className="block text-indigo-200 text-sm mt-1">Days</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/20 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">{result.zodiacSign}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-gray-900 number-display">
                {formatNumber(result.totalDays)}
              </p>
              <p className="text-sm text-gray-500 mt-1">Total Days</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-gray-900 number-display">
                {formatNumber(result.totalHours)}
              </p>
              <p className="text-sm text-gray-500 mt-1">Total Hours</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-gray-900 number-display">
                {formatNumber(result.totalMinutes)}
              </p>
              <p className="text-sm text-gray-500 mt-1">Total Minutes</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-gray-900 number-display">
                {formatNumber(result.totalSeconds)}
              </p>
              <p className="text-sm text-gray-500 mt-1">Total Seconds</p>
            </div>
          </div>

          {/* Next Birthday */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100 p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 rounded-xl">
                <Gift className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Next Birthday</p>
                <p className="text-sm text-gray-600">
                  {result.nextBirthday.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-3xl font-bold text-amber-600 number-display">
                  {result.daysUntilBirthday}
                </p>
                <p className="text-sm text-gray-500">days away</p>
              </div>
            </div>
          </div>

          {/* Live Clock */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>
              Live calculation as of {currentTime.toLocaleTimeString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
