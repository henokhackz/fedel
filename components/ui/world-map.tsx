"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";
import Image from "next/image";
import { useTheme } from "next-themes";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export default function WorldMap({ dots = [], lineColor = "#0ea5e9" }: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { theme } = useTheme();

  const map = new DottedMap({ height: 100, grid: "diagonal" });
  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === "dark" ? "#FFFFFF40" : "#00000040",
    shape: "circle",
    backgroundColor: theme === "dark" ? "black" : "#F4F3F1",
  });

  const projectPoint = (lat: number, lng: number) => ({
    x: (lng + 180) * (800 / 360),
    y: (90 - lat) * (400 / 180),
  });

  const createCurvedPath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="relative w-full aspect-[2/1] rounded-lg font-sans overflow-hidden">
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="w-full h-full pointer-events-none select-none"
        alt="world map"
        height={495}
        width={1056}
        draggable={false}
      />

      <svg ref={svgRef} viewBox="0 0 800 400" className="absolute inset-0 w-full h-full pointer-events-none">
        {dots.map((dot, i) => {
          const start = projectPoint(dot.start.lat, dot.start.lng);
          const end = projectPoint(dot.end.lat, dot.end.lng);

          return (
            <g key={i}>
              <motion.path
                d={createCurvedPath(start, end)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 * i, ease: "easeOut" }}
              />
            </g>
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => (
          <g key={i}>
            {[dot.start, dot.end].map((point, index) => {
              const { x, y } = projectPoint(point.lat, point.lng);
              return (
                <g key={index}>
                  <circle cx={x} cy={y} r="2" fill={lineColor} />
                  <circle cx={x} cy={y} r="2" fill={lineColor} opacity="0.5">
                    <animate attributeName="r" from="2" to="8" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}
