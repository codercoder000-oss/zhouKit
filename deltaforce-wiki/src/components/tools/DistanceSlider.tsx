"use client";

// [D] 距离滑块组件

import { useState } from "react";
import { Crosshair } from "lucide-react";

interface DistanceSliderProps {
  value: number;
  onChange: (distance: number) => void;
  min?: number;
  max?: number;
}

export function DistanceSlider({
  value,
  onChange,
  min = 0,
  max = 200,
}: DistanceSliderProps) {
  // [D] 预设距离
  const presets = [10, 25, 50, 75, 100, 150, 200];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Crosshair className="w-5 h-5 text-text-secondary" />
          <label className="text-sm font-medium text-text-primary">
            射击距离
          </label>
        </div>
        <span className="text-lg font-bold text-text-primary">{value}m</span>
      </div>

      {/* [D2] 滑块 - 使用主题色 */}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-surface-light rounded-lg appearance-none cursor-pointer accent-accent"
        />
        {/* [D2] 刻度标记 */}
        <div className="flex justify-between mt-2 text-xs text-text-muted">
          <span>{min}m</span>
          <span>{Math.round(max / 2)}m</span>
          <span>{max}m</span>
        </div>
      </div>

      {/* [D2] 快速选择按钮 - 使用主题色 */}
      <div className="flex gap-2 flex-wrap">
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => onChange(preset)}
            className={`px-3 py-1 rounded-lg text-xs transition-colors ${
              value === preset
                ? "bg-accent text-white"
                : "bg-surface text-text-secondary hover:bg-surface-light"
            }`}
          >
            {preset}m
          </button>
        ))}
      </div>
    </div>
  );
}
