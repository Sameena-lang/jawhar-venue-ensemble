import React, { useState } from "react";

export interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  fallback?: React.ReactNode;
  aspectRatio?: string;
}

export function SmartImage({
  src,
  alt,
  fallback,
  className = "",
  aspectRatio,
  loading = "lazy",
  ...props
}: SmartImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!src || error) {
    if (fallback) return <>{fallback}</>;
    return (
      <div
        className={`flex items-center justify-center bg-forest/10 border border-gold/20 text-forest p-6 text-center select-none ${className}`}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <div className="space-y-1">
          <p className="font-display text-sm tracking-wide text-forest">{alt || "Jawhar Venue"}</p>
          <p className="text-[0.65rem] uppercase tracking-widest text-gold font-medium">Jawhar Groups Collection</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      onLoad={() => setLoaded(true)}
      onError={() => setError(true)}
      className={`${className} ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
      {...props}
    />
  );
}
