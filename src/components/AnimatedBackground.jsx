import React from "react";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <div className="w-full h-full animate-gradient-move bg-gradient-to-br from-[#0055FF] via-[#7B2FF2] to-[#0055FF] opacity-30" />
      <style>{`
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}