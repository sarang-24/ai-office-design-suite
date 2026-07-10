import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Info, CheckCircle2, Eye } from "lucide-react";
import { showNotification } from "./NotificationSystem";

const rooms = [
  {
    id: "reception",
    label: "Reception",
    img: "https://images.unsplash.com/photo-1715593949273-09009558300a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    desc: "A grand welcoming space designed to impress every visitor from the first step.",
    features: ["Premium marble reception desk", "Branded feature wall", "Lounge seating cluster", "Ambient lighting system", "Digital display board"],
    hotspots: [
      { x: 30, y: 45, label: "Reception Desk" },
      { x: 65, y: 60, label: "Lounge Area" },
      { x: 80, y: 35, label: "Display Wall" },
    ],
    sqft: "450",
    capacity: "4 seats",
  },
  {
    id: "openoffice",
    label: "Open Office",
    img: "https://images.unsplash.com/photo-1594235048794-fae8583a5af5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    desc: "Collaborative open workspace optimized for productivity and team cohesion.",
    features: ["Height-adjustable workstations", "Ergonomic mesh chairs", "Cable management trays", "Privacy screens", "Breakout zone"],
    hotspots: [
      { x: 25, y: 50, label: "Workstation Pod" },
      { x: 55, y: 70, label: "Collaboration Zone" },
      { x: 75, y: 40, label: "Storage Wall" },
    ],
    sqft: "1,200",
    capacity: "24 employees",
  },
  {
    id: "meeting",
    label: "Conference Room",
    img: "https://images.unsplash.com/photo-1706074793638-da28b90ea8ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    desc: "Executive conference suite equipped with the latest presentation technology.",
    features: ["16-seat conference table", "Executive leather chairs", "4K video conferencing", "Acoustic wall panels", "Smart whiteboard"],
    hotspots: [
      { x: 50, y: 55, label: "Conference Table" },
      { x: 85, y: 30, label: "Presentation Wall" },
      { x: 15, y: 40, label: "AV Equipment" },
    ],
    sqft: "600",
    capacity: "16 seats",
  },
  {
    id: "executive",
    label: "Executive Suite",
    img: "https://images.unsplash.com/photo-1699621106755-4fe40ce95d64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    desc: "Prestigious private office for C-suite executives with premium furnishings.",
    features: ["Executive L-shaped desk", "Leather executive chair", "3-seat sofa set", "Built-in bookcase", "Private meeting corner"],
    hotspots: [
      { x: 35, y: 50, label: "Executive Desk" },
      { x: 70, y: 65, label: "Sofa Area" },
      { x: 85, y: 25, label: "Bookcase" },
    ],
    sqft: "380",
    capacity: "1 executive + 4 guests",
  },
  {
    id: "lounge",
    label: "Break Lounge",
    img: "https://images.unsplash.com/photo-1706689656095-168768dc20a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    desc: "Relaxing break zone that recharges your team between productive sessions.",
    features: ["Modular sofa clusters", "Coffee & tea station", "High-top bistro tables", "Indoor plants", "Mood lighting"],
    hotspots: [
      { x: 30, y: 60, label: "Lounge Sofas" },
      { x: 65, y: 35, label: "Coffee Station" },
      { x: 80, y: 65, label: "Bistro Tables" },
    ],
    sqft: "300",
    capacity: "12 casual seats",
  },
];

export function VirtualTour() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  const room = rooms[currentIdx];

  function prev() {
    setCurrentIdx((i) => (i - 1 + rooms.length) % rooms.length);
    setActiveHotspot(null);
  }
  function next() {
    setCurrentIdx((i) => (i + 1) % rooms.length);
    setActiveHotspot(null);
  }

  // Auto-play functionality
  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        setCurrentIdx((i) => (i + 1) % rooms.length);
        setActiveHotspot(null);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-full" style={{ background: "#faf9f6" }}>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Eye className="w-5 h-5" style={{ color: "#c9a84c" }} />
          <span className="text-sm font-medium" style={{ color: "#c9a84c" }}>AI Virtual Tour</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1a1a2e", fontSize: "1.5rem sm:text-1.75rem" }}>
          Immersive Office Preview
        </h1>
        <p className="text-sm mt-1" style={{ color: "#717182" }}>
          Explore each room type before committing — click hotspots for details
        </p>
      </div>

      {/* Room Selector */}
      <div className="flex gap-2 mb-4 sm:mb-6 overflow-x-auto pb-1">
        {rooms.map((r, i) => (
          <button
            key={r.id}
            onClick={() => { setCurrentIdx(i); setActiveHotspot(null); setAutoplay(false); }}
            className="flex-shrink-0 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all"
            style={
              i === currentIdx
                ? { background: "#1a1a2e", color: "white" }
                : { background: "white", color: "#717182", border: "1px solid #e9ebef" }
            }
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Auto-play toggle */}
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <button
          onClick={() => setAutoplay(!autoplay)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={{
            background: autoplay ? "#1a1a2e" : "white",
            color: autoplay ? "white" : "#717182",
            border: autoplay ? "none" : "1px solid #e9ebef"
          }}
        >
          <span className={`w-2 h-2 rounded-full ${autoplay ? "bg-green-400" : "bg-gray-400"}`} />
          {autoplay ? "Auto-playing" : "Manual Mode"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Image */}
        <div className="lg:col-span-2">
          <div
            className={`relative rounded-2xl overflow-hidden ${fullscreen ? "fixed inset-4 z-50" : ""}`}
            style={{ aspectRatio: "16/9", background: "#1a1a2e" }}
          >
            <img
              src={room.img}
              alt={room.label}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(26,26,46,0.7) 0%, transparent 50%)" }}
            />

            {/* Hotspots */}
            {room.hotspots.map((h, i) => (
              <button
                key={i}
                onClick={() => setActiveHotspot(activeHotspot === i ? null : i)}
                className="absolute flex items-center justify-center transition-transform hover:scale-110"
                style={{ left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%, -50%)" }}
              >
                <span
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold animate-pulse"
                  style={{ background: activeHotspot === i ? "#c9a84c" : "rgba(201,168,76,0.7)" }}
                >
                  <Info className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </span>
                {activeHotspot === i && (
                  <div
                    className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-white text-xs rounded-lg px-2 sm:px-3 py-1.5 whitespace-nowrap shadow-lg"
                    style={{ background: "#1a1a2e", border: "1px solid rgba(201,168,76,0.4)" }}
                  >
                    {h.label}
                  </div>
                )}
              </button>
            ))}

            {/* Navigation */}
            <button
              onClick={() => { prev(); setAutoplay(false); }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-black/30 hover:bg-black/60 text-white transition-all backdrop-blur-sm"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => { next(); setAutoplay(false); }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-black/30 hover:bg-black/60 text-white transition-all backdrop-blur-sm"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Fullscreen */}
            <button
              onClick={() => setFullscreen(!fullscreen)}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center bg-black/30 hover:bg-black/60 text-white transition-all backdrop-blur-sm"
            >
              <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Room Label */}
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
              <div
                className="text-white text-base sm:text-lg mb-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {room.label}
              </div>
              <div className="flex gap-3 sm:gap-4 text-xs text-white/60">
                <span>{room.sqft} sqft</span>
                <span>•</span>
                <span>{room.capacity}</span>
              </div>
            </div>

            {/* Progress dots */}
            <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 flex gap-1 sm:gap-1.5">
              {rooms.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentIdx(i); setAutoplay(false); }}
                  className="rounded-full transition-all"
                  style={{
                    width: i === currentIdx ? "16px sm:20px" : "5px sm:6px",
                    height: "5px sm:6px",
                    background: i === currentIdx ? "#c9a84c" : "rgba(255,255,255,0.4)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
            <h3 className="mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1a1a2e" }}>
              {room.label}
            </h3>
            <p className="text-sm mb-4 sm:mb-5" style={{ color: "#717182", lineHeight: 1.7 }}>{room.desc}</p>
            <div className="space-y-2 sm:space-y-2.5">
              {room.features.map((f) => (
                <div key={f} className="flex items-center gap-2 sm:gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: "#c9a84c" }} />
                  <span className="text-xs sm:text-sm" style={{ color: "#1a1a2e" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
            <div className="text-xs sm:text-sm font-medium mb-2 sm:mb-3" style={{ color: "#1a1a2e" }}>Room Details</div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {[
                { label: "Area", value: room.sqft + " sqft" },
                { label: "Capacity", value: room.capacity },
                { label: "Hotspots", value: room.hotspots.length + " points" },
                { label: "Style", value: "Executive" },
              ].map((d) => (
                <div key={d.label} className="rounded-lg p-2 sm:p-3" style={{ background: "#faf9f6" }}>
                  <div className="text-xs mb-0.5" style={{ color: "#717182" }}>{d.label}</div>
                  <div className="text-xs sm:text-sm font-medium" style={{ color: "#1a1a2e" }}>{d.value}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="w-full py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: "#1a1a2e" }}
            onClick={() => showNotification("success", "Layout request submitted! We'll contact you shortly.")}
          >
            Request This Layout
          </button>
          <button
            className="w-full py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium border transition-colors hover:bg-white"
            style={{ borderColor: "#c9a84c40", color: "#1a1a2e" }}
            onClick={() => showNotification("success", "Quotation request sent! Check your email.")}
          >
            Get Quotation for {room.label}
          </button>
        </div>
      </div>
    </div>
  );
}
