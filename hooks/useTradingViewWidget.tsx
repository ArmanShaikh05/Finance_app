"use client";
import { useEffect, useRef } from "react";

const useTradingViewWidget = (
  scripUrl: string,
  config: Record<string, unknown>,
  height: number = 600
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (containerRef.current.dataset.loaded) return;
    containerRef.current.innerHTML = `<div class="tradingview-widget-conatainer__widget" style="width: 100%, height: ${height}px"></div>`;

    const script = document.createElement("script");
    script.src = scripUrl;

    script.async = true;
    script.innerHTML = JSON.stringify(config);
    containerRef.current.appendChild(script);
    containerRef.current.dataset.loaded = "true";

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        delete containerRef.current.dataset.loaded;
      }
    };
  }, [scripUrl, config, height]);

  return containerRef;
};

export default useTradingViewWidget;
