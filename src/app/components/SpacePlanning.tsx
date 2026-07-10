import { useState } from "react";
import { Layers, Loader2, Sparkles, Users, Maximize, LayoutGrid, CheckCircle2 } from "lucide-react";
import { showNotification } from "./NotificationSystem";

const zoneColors: Record<string, { bg: string; border: string; label: string }> = {
  workstation: { bg: "#3b82f615", border: "#3b82f6", label: "Workstation" },
  meeting: { bg: "#10b98115", border: "#10b981", label: "Meeting Room" },
  lounge: { bg: "#f59e0b15", border: "#f59e0b", label: "Lounge" },
  storage: { bg: "#8b5cf615", border: "#8b5cf6", label: "Storage" },
  corridor: { bg: "#71718215", border: "#717182", label: "Corridor" },
  reception: { bg: "#c9a84c15", border: "#c9a84c", label: "Reception" },
  empty: { bg: "transparent", border: "transparent", label: "" },
};

type ZoneType = keyof typeof zoneColors;

const layouts: Record<string, { grid: ZoneType[][]; stats: { capacity: number; utilization: number; zones: number } }> = {
  small: {
    grid: [
      ["reception", "reception", "corridor", "storage", "storage"],
      ["workstation", "workstation", "corridor", "meeting", "meeting"],
      ["workstation", "workstation", "corridor", "meeting", "meeting"],
      ["workstation", "workstation", "corridor", "lounge", "lounge"],
      ["corridor", "corridor", "corridor", "corridor", "corridor"],
    ],
    stats: { capacity: 15, utilization: 78, zones: 5 },
  },
  medium: {
    grid: [
      ["reception", "reception", "reception", "corridor", "meeting", "meeting", "storage"],
      ["workstation", "workstation", "workstation", "corridor", "meeting", "meeting", "storage"],
      ["workstation", "workstation", "workstation", "corridor", "meeting", "meeting", "lounge"],
      ["workstation", "workstation", "workstation", "corridor", "lounge", "lounge", "lounge"],
      ["workstation", "workstation", "workstation", "corridor", "workstation", "workstation", "workstation"],
      ["corridor", "corridor", "corridor", "corridor", "corridor", "corridor", "corridor"],
    ],
    stats: { capacity: 45, utilization: 85, zones: 6 },
  },
  large: {
    grid: [
      ["reception", "reception", "reception", "corridor", "meeting", "meeting", "meeting", "storage"],
      ["reception", "lounge", "lounge", "corridor", "meeting", "meeting", "meeting", "storage"],
      ["workstation", "workstation", "workstation", "corridor", "workstation", "workstation", "workstation", "workstation"],
      ["workstation", "workstation", "workstation", "corridor", "workstation", "workstation", "workstation", "workstation"],
      ["workstation", "workstation", "workstation", "corridor", "workstation", "workstation", "workstation", "workstation"],
      ["meeting", "meeting", "corridor", "corridor", "corridor", "lounge", "lounge", "lounge"],
      ["meeting", "meeting", "storage", "storage", "corridor", "lounge", "lounge", "lounge"],
    ],
    stats: { capacity: 120, utilization: 90, zones: 6 },
  },
};

export function SpacePlanning() {
  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(15);
  const [employees, setEmployees] = useState(30);
  const [zones, setZones] = useState<string[]>(["workstation", "meeting", "lounge"]);
  const [processing, setProcessing] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [layoutKey, setLayoutKey] = useState<"small" | "medium" | "large">("medium");

  const allZones = ["workstation", "meeting", "lounge", "storage", "reception", "corridor"];

  function toggleZone(z: string) {
    setZones((prev) => prev.includes(z) ? prev.filter((x) => x !== z) : [...prev, z]);
    setGenerated(false);
  }

  function generate() {
    setProcessing(true);
    setGenerated(false);
    const key = employees <= 20 ? "small" : employees <= 60 ? "medium" : "large";
    setLayoutKey(key);
    setTimeout(() => {
      setProcessing(false);
      setGenerated(true);
    }, 2000);
  }

  const layout = layouts[layoutKey];

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-full" style={{ background: "#faf9f6" }}>
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="w-5 h-5" style={{ color: "#c9a84c" }} />
          <span className="text-sm font-medium" style={{ color: "#c9a84c" }}>AI Space Planning</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1a1a2e", fontSize: "1.5rem sm:text-1.75rem" }}>
          Intelligent Floor Plan Generator
        </h1>
        <p className="text-sm mt-1" style={{ color: "#717182" }}>
          Enter your office dimensions and AI optimizes the perfect layout
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Controls */}
        <div className="space-y-4 sm:space-y-5">
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="text-sm font-medium mb-4" style={{ color: "#1a1a2e" }}>Office Dimensions</div>
            <div className="space-y-4">
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: "#717182" }}>
                  Length: <span className="font-semibold" style={{ color: "#1a1a2e" }}>{length}m</span>
                </label>
                <input
                  type="range" min={8} max={60} value={length}
                  onChange={(e) => { setLength(+e.target.value); setGenerated(false); }}
                  className="w-full accent-amber-600"
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: "#a0a0b0" }}>
                  <span>8m</span><span>60m</span>
                </div>
              </div>
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: "#717182" }}>
                  Width: <span className="font-semibold" style={{ color: "#1a1a2e" }}>{width}m</span>
                </label>
                <input
                  type="range" min={6} max={40} value={width}
                  onChange={(e) => { setWidth(+e.target.value); setGenerated(false); }}
                  className="w-full accent-amber-600"
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: "#a0a0b0" }}>
                  <span>6m</span><span>40m</span>
                </div>
              </div>
              <div className="rounded-xl p-3 flex justify-between items-center" style={{ background: "#faf9f6" }}>
                <span className="text-sm" style={{ color: "#717182" }}>Total Area</span>
                <span className="text-sm font-semibold" style={{ color: "#1a1a2e" }}>{length * width} m²</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="text-sm font-medium mb-3" style={{ color: "#1a1a2e" }}>Employees</div>
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4" style={{ color: "#717182" }} />
              <input
                type="number" min={1} max={500} value={employees}
                onChange={(e) => { setEmployees(+e.target.value); setGenerated(false); }}
                className="flex-1 rounded-lg px-3 py-2 text-sm outline-none border"
                style={{ borderColor: "#e9ebef", color: "#1a1a2e" }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="text-sm font-medium mb-3" style={{ color: "#1a1a2e" }}>Zones Required</div>
            <div className="space-y-2">
              {allZones.map((z) => (
                <label key={z} className="flex items-center gap-2.5 cursor-pointer">
                  <div
                    onClick={() => toggleZone(z)}
                    className="w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{
                      borderColor: zones.includes(z) ? zoneColors[z].border : "#d1d5db",
                      background: zones.includes(z) ? zoneColors[z].border : "transparent",
                    }}
                  >
                    {zones.includes(z) && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm" style={{ background: zoneColors[z].border }} />
                    <span className="text-sm capitalize" style={{ color: "#1a1a2e" }}>{z}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={generate}
            disabled={processing}
            className="w-full py-3 sm:py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-white transition-all disabled:opacity-60"
            style={{ background: "#1a1a2e" }}
          >
            {processing ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Generating Layout...</>
            ) : (
              <><Sparkles className="w-4 h-4" /> Generate AI Layout</>
            )}
          </button>
        </div>

        {/* Floor Plan */}
        <div className="lg:col-span-2 space-y-5">
          {!generated && !processing && (
            <div
              className="rounded-2xl flex flex-col items-center justify-center py-24 border-2 border-dashed"
              style={{ background: "white", borderColor: "#e9ebef" }}
            >
              <LayoutGrid className="w-12 h-12 mb-4" style={{ color: "#e9ebef" }} />
              <div className="text-sm" style={{ color: "#a0a0b0" }}>Configure your parameters and generate a layout</div>
            </div>
          )}

          {processing && (
            <div className="bg-white rounded-2xl p-10 shadow-sm flex flex-col items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "rgba(201,168,76,0.1)" }}
              >
                <Layers className="w-8 h-8 animate-pulse" style={{ color: "#c9a84c" }} />
              </div>
              <div className="text-sm font-medium" style={{ color: "#1a1a2e" }}>AI is planning your office layout...</div>
              <div className="w-48 h-1.5 rounded-full overflow-hidden" style={{ background: "#f0f0f0" }}>
                <div className="h-full rounded-full animate-pulse" style={{ width: "60%", background: "#c9a84c" }} />
              </div>
            </div>
          )}

          {generated && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { icon: Users, label: "Capacity", value: `${layout.stats.capacity} people` },
                  { icon: Maximize, label: "Utilization", value: `${layout.stats.utilization}%` },
                  { icon: LayoutGrid, label: "Zones", value: `${layout.stats.zones} areas` },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-xl p-3 sm:p-4 shadow-sm text-center">
                    <s.icon className="w-4 h-4 mx-auto mb-2" style={{ color: "#c9a84c" }} />
                    <div className="font-semibold text-xs sm:text-sm" style={{ color: "#1a1a2e" }}>{s.value}</div>
                    <div className="text-xs" style={{ color: "#717182" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs sm:text-sm font-medium" style={{ color: "#1a1a2e" }}>
                    AI-Generated Floor Plan · {length}m × {width}m
                  </span>
                  <span
                    className="flex items-center gap-1.5 text-xs px-2 sm:px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c" }}
                  >
                    <Sparkles className="w-3 h-3" /> AI Optimized
                  </span>
                </div>

                <div
                  className="rounded-xl overflow-hidden border"
                  style={{ borderColor: "#e9ebef" }}
                >
                  {layout.grid.map((row, ri) => (
                    <div key={ri} className="flex">
                      {row.map((cell, ci) => {
                        const zone = zoneColors[cell];
                        return (
                          <div
                            key={ci}
                            className="flex-1 flex items-center justify-center border border-white/40"
                            style={{
                              background: cell === "corridor" ? "#f5f5f7" : zone.bg,
                              borderLeft: `1px solid ${zone.border}20`,
                              minHeight: "48px",
                            }}
                            title={zone.label}
                          >
                            {ri === 0 && ci === 0 && cell !== "empty" && (
                              <span className="text-xs font-medium opacity-0">{zone.label}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mt-4">
                  {Object.entries(zoneColors)
                    .filter(([k]) => k !== "empty")
                    .map(([key, val]) => (
                      <div key={key} className="flex items-center gap-1.5 text-xs" style={{ color: "#717182" }}>
                        <span className="w-3 h-3 rounded-sm" style={{ background: val.border }} />
                        {val.label}
                      </div>
                    ))}
                </div>
              </div>

              <button
                className="w-full py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium text-white"
                style={{ background: "#c9a84c" }}
                onClick={() => showNotification("success", "Navigating to Furniture Recommendations...")}
              >
                Proceed to Furniture Recommendations →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
