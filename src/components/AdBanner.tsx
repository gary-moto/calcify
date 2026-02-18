"use client";

interface AdBannerProps {
  slot: "after-calculator" | "before-footer";
  className?: string;
}

export default function AdBanner({ slot, className = "" }: AdBannerProps) {
  // In production, replace this with actual AdSense code
  const isDev = process.env.NODE_ENV === "development";

  if (!isDev) {
    // Production: Return actual ad container
    return (
      <div className={`ad-container ${className}`} data-ad-slot={slot}>
        {/* 
          Replace with AdSense code:
          <ins className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-XXXXXXXX"
            data-ad-slot="XXXXXXXX"
            data-ad-format="auto"
            data-full-width-responsive="true">
          </ins>
        */}
      </div>
    );
  }

  // Development: Show mock ad
  return (
    <div className={`${className}`}>
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
        <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
          <span className="text-sm font-medium uppercase tracking-wide">Advertisement</span>
        </div>
        <div className="text-gray-500 text-sm">
          {slot === "after-calculator" ? (
            <p>Ad Banner (728×90) — After Calculator</p>
          ) : (
            <p>Ad Banner (728×90) — Before Footer</p>
          )}
        </div>
        <div className="mt-3 flex justify-center">
          <div className="bg-white border border-gray-200 rounded-lg px-8 py-4 text-gray-400 text-xs">
            Google AdSense / Your Ad Network Here
          </div>
        </div>
      </div>
    </div>
  );
}
