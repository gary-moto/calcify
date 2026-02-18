"use client";

import { ReactNode } from "react";

interface CalculatorLayoutProps {
  children: ReactNode;
}

export default function CalculatorLayout({ children }: CalculatorLayoutProps) {
  return (
    <div className="relative">
      {/* Main Content - Centered */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {children}
      </div>
      
      {/* Sidebar Ads - Fixed to right edge, vertically centered */}
      <aside className="hidden xl:block fixed right-4 top-1/2 -translate-y-1/2 w-72">
        <div className="space-y-6">
          <SidebarAd />
          <SidebarAd />
        </div>
      </aside>
    </div>
  );
}

function SidebarAd() {
  const isDev = process.env.NODE_ENV === "development";

  if (!isDev) {
    return (
      <div className="ad-container" data-ad-slot="sidebar">
        {/* AdSense code here */}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
      <div className="text-gray-400 mb-2">
        <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      </div>
      <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">Ad</p>
      <div className="bg-white border border-gray-200 rounded-lg py-12 px-4">
        <p className="text-gray-400 text-xs">300×250</p>
        <p className="text-gray-300 text-xs mt-1">Sidebar Ad</p>
      </div>
    </div>
  );
}
