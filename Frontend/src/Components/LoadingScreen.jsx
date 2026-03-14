import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />

      <div className="relative flex flex-col items-center">
        {/* Animated Logo Container */}
        <div className="relative size-24 mb-6">
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />

          {/* Outer rotating border */}
          <div className="absolute inset-0 rounded-full border-t-4 border-primary animate-spin" />

          {/* Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/notara-logo.png"
              alt="Notara Logo"
              className="size-16 object-contain animate-pulse"
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold text-primary font-mono tracking-tighter animate-bounce">
            Notara
          </h1>
          <div className="flex items-center gap-1">
            <span className="text-base-content/60 text-sm font-medium">Securing your space</span>
            <span className="flex gap-0.5">
              <span className="size-1 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="size-1 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="size-1 bg-primary rounded-full animate-bounce"></span>
            </span>
          </div>
        </div>
      </div>

      {/* Glassmorphism decoration */}
      <div className="absolute bottom-10 text-base-content/40 text-xs font-mono">
        © 2026 Yash Vyas. All Rights Reserved.
      </div>
    </div>
  );
};

export default LoadingScreen;
