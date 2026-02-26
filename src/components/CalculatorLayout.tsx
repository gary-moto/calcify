"use client";

import { ReactNode } from "react";

interface CalculatorLayoutProps {
  children: ReactNode;
}

export default function CalculatorLayout({ children }: CalculatorLayoutProps) {
  return (
    <div className="relative">
      {/* AD SLOT - LEFT RAIL */}
      <aside className="hidden 2xl:block fixed left-[calc(50%-38rem)] top-1/2 -translate-y-1/2 w-40" aria-label="Advertisement">
        <div
          className="bg-gradient-to-b from-gray-100 to-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-3 text-center"
          data-ad-slot="left-rail-1"
          style={{ minHeight: 600, minWidth: 160 }}
        >
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">Ad</p>
          <div className="bg-white border border-gray-200 rounded-lg py-16 px-2">
            <p className="text-gray-300 text-xs">160×600</p>
          </div>
        </div>
      </aside>

      {/* Main Content - Centered */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {children}
      </div>

      {/* AD SLOT - RIGHT RAIL */}
      <aside className="hidden xl:block fixed right-4 top-1/2 -translate-y-1/2 w-72" aria-label="Advertisement">
        <div className="space-y-6">
          <div
            className="bg-gradient-to-b from-gray-100 to-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 text-center"
            data-ad-slot="right-rail-1"
            style={{ minHeight: 250, minWidth: 300 }}
          >
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">Ad</p>
            <div className="bg-white border border-gray-200 rounded-lg py-12 px-4">
              <p className="text-gray-300 text-xs">300×250</p>
              <p className="text-gray-300 text-xs mt-1">Sidebar Ad</p>
            </div>
          </div>
          <div
            className="bg-gradient-to-b from-gray-100 to-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 text-center"
            data-ad-slot="right-rail-2"
            style={{ minHeight: 250, minWidth: 300 }}
          >
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">Ad</p>
            <div className="bg-white border border-gray-200 rounded-lg py-12 px-4">
              <p className="text-gray-300 text-xs">300×250</p>
              <p className="text-gray-300 text-xs mt-1">Sidebar Ad</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
