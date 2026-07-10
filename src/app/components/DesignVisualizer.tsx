import { useState, useRef } from "react";
import { Upload, Wand2, Download, RefreshCw, Check, Loader2, ChevronRight, Sparkles } from "lucide-react";
import { showNotification } from "./NotificationSystem";

const styles = [
  { id: "modern", label: "Modern", desc: "Clean lines, minimalist palette", color: "#3b82f6" },
  { id: "executive", label: "Executive", desc: "Rich woods, leather accents", color: "#c9a84c" },
  { id: "scandinavian", label: "Scandinavian", desc: "Light tones, natural materials", color: "#10b981" },
  { id: "industrial", label: "Industrial", desc: "Raw textures, exposed elements", color: "#8b5cf6" },
];

const designResults: Record<string, { img: string; highlights: string[] }> = {
  modern: {
    img: "https://images.unsplash.com/photo-1715593949273-09009558300a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    highlights: ["Open-plan layout with glass partitions", "White oak and concrete surfaces", "Pendant lighting clusters", "Integrated cable management"],
  },
  executive: {
    img: "https://images.unsplash.com/photo-1699621106755-4fe40ce95d64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    highlights: ["Dark mahogany executive desks", "Leather seating throughout", "Gold accent fixtures", "Private partner offices"],
  },
  scandinavian: {
    img: "https://images.unsplash.com/photo-1681418659069-eef28d44aeab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    highlights: ["White birch workstations", "Soft textile dividers", "Abundant natural light", "Biophilic plant integration"],
  },
  industrial: {
    img: "https://images.unsplash.com/photo-1594235048794-fae8583a5af5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    highlights: ["Exposed black steel frames", "Reclaimed wood surfaces", "Edison bulb lighting", "Concrete accent walls"],
  },
};

const aiSteps = [
  "Analyzing floor plan dimensions...",
  "Identifying structural elements...",
  "Selecting style-matched furniture...",
  "Applying lighting simulation...",
  "Generating high-resolution render...",
  "Design ready!",
];

export function DesignVisualizer() {
  const [selectedStyle, setSelectedStyle] = useState("executive");
  const [uploaded, setUploaded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function startProcessing() {
    if (!uploaded) return;
    setProcessing(true);
    setGenerated(false);
    setCurrentStep(0);
    setProgress(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrentStep(step);
      setProgress(Math.round((step / (aiSteps.length - 1)) * 100));
      if (step >= aiSteps.length - 1) {
        clearInterval(interval);
        setTimeout(() => {
          setProcessing(false);
          setGenerated(true);
        }, 500);
      }
    }, 550);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    setUploaded(true);
    setGenerated(false);
  }

  const result = designResults[selectedStyle];

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-full" style={{ background: "#faf9f6" }}>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Wand2 className="w-5 h-5" style={{ color: "#c9a84c" }} />
          <span className="text-sm font-medium" style={{ color: "#c9a84c" }}>AI Design Visualizer</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1a1a2e", fontSize: "1.5rem sm:text-1.75rem" }}>
          Transform Your Office Space
        </h1>
        <p className="text-sm mt-1" style={{ color: "#717182" }}>
          Upload your floor plan or office photo — AI generates luxury concepts in seconds
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Left: Upload + Controls */}
        <div className="space-y-5">
          {/* Upload Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => fileRef.current?.click()}
            className="rounded-2xl border-2 border-dashed cursor-pointer transition-all flex flex-col items-center justify-center py-8 sm:py-12"
            style={{
              borderColor: dragOver ? "#c9a84c" : uploaded ? "#10b981" : "#e9ebef",
              background: dragOver ? "rgba(201,168,76,0.05)" : uploaded ? "rgba(16,185,129,0.03)" : "white",
            }}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={() => { setUploaded(true); setGenerated(false); }}
            />
            {uploaded ? (
              <>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(16,185,129,0.1)" }}>
                  <Check className="w-7 h-7" style={{ color: "#10b981" }} />
                </div>
                <div className="font-medium mb-1" style={{ color: "#1a1a2e" }}>Floor plan uploaded!</div>
                <div className="text-sm" style={{ color: "#717182" }}>Click to replace or drag another file</div>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(201,168,76,0.1)" }}>
                  <Upload className="w-7 h-7" style={{ color: "#c9a84c" }} />
                </div>
                <div className="font-medium mb-1" style={{ color: "#1a1a2e" }}>Upload floor plan or office photo</div>
                <div className="text-sm mb-3" style={{ color: "#717182" }}>Drag & drop or click to browse</div>
                <div className="text-xs" style={{ color: "#a0a0b0" }}>JPG, PNG, PDF — up to 50MB</div>
              </>
            )}
          </div>

          {/* Style Selector */}
          <div>
            <div className="text-sm font-medium mb-3" style={{ color: "#1a1a2e" }}>Choose Design Style</div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {styles.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedStyle(s.id); setGenerated(false); }}
                  className="p-3 sm:p-4 rounded-xl text-left transition-all border-2"
                  style={{
                    borderColor: selectedStyle === s.id ? s.color : "transparent",
                    background: selectedStyle === s.id ? s.color + "10" : "white",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                    <span className="text-xs sm:text-sm font-medium" style={{ color: "#1a1a2e" }}>{s.label}</span>
                    {selectedStyle === s.id && <Check className="w-3 h-3 ml-auto" style={{ color: s.color }} />}
                  </div>
                  <div className="text-xs" style={{ color: "#717182" }}>{s.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={startProcessing}
            disabled={!uploaded || processing}
            className="w-full py-3 sm:py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
            style={{ background: "#1a1a2e" }}
          >
            {processing ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Generating Design...</>
            ) : (
              <><Sparkles className="w-4 h-4" /> Generate AI Design</>
            )}
          </button>
        </div>

        {/* Right: Result */}
        <div className="space-y-5">
          {/* Processing */}
          {processing && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(201,168,76,0.1)" }}>
                  <Wand2 className="w-4 h-4 animate-pulse" style={{ color: "#c9a84c" }} />
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ color: "#1a1a2e" }}>AI is generating your design</div>
                  <div className="text-xs" style={{ color: "#717182" }}>{progress}% complete</div>
                </div>
              </div>

              <div className="w-full rounded-full h-2 mb-5" style={{ background: "#f0f0f0" }}>
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%`, background: "linear-gradient(90deg, #c9a84c, #f0c06a)" }}
                />
              </div>

              <div className="space-y-2.5">
                {aiSteps.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm"
                    style={{ opacity: i > currentStep ? 0.3 : 1, color: i < currentStep ? "#10b981" : "#1a1a2e" }}
                  >
                    {i < currentStep ? (
                      <Check className="w-4 h-4 flex-shrink-0" style={{ color: "#10b981" }} />
                    ) : i === currentStep ? (
                      <Loader2 className="w-4 h-4 flex-shrink-0 animate-spin" style={{ color: "#c9a84c" }} />
                    ) : (
                      <ChevronRight className="w-4 h-4 flex-shrink-0 text-gray-300" />
                    )}
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!processing && !generated && (
            <div
              className="rounded-2xl flex flex-col items-center justify-center py-12 sm:py-20 border-2 border-dashed"
              style={{ background: "white", borderColor: "#e9ebef" }}
            >
              <Wand2 className="w-10 h-10 sm:w-12 sm:h-12 mb-4" style={{ color: "#e9ebef" }} />
              <div className="text-xs sm:text-sm" style={{ color: "#a0a0b0" }}>
                Upload a floor plan and click generate
              </div>
            </div>
          )}

          {/* Result */}
          {generated && (
            <>
              <div className="rounded-2xl overflow-hidden shadow-sm">
                <div className="relative" style={{ aspectRatio: "16/10" }}>
                  <img src={result.img} alt="AI generated design" className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,26,46,0.65) 0%, transparent 50%)" }} />
                  <div
                    className="absolute top-2 sm:top-3 left-2 sm:left-3 flex items-center gap-1.5 text-xs px-2 sm:px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(201,168,76,0.9)", color: "white" }}
                  >
                    <Sparkles className="w-3 h-3" /> AI Generated · {styles.find(s => s.id === selectedStyle)?.label}
                  </div>
                  <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 flex gap-2">
                    <button
                      className="flex items-center gap-1.5 text-xs px-2 sm:px-3 py-1.5 rounded-lg text-white transition-all hover:opacity-90"
                      style={{ background: "rgba(26,26,46,0.8)", backdropFilter: "blur(4px)" }}
                      onClick={() => { setGenerated(false); setTimeout(startProcessing, 100); }}
                    >
                      <RefreshCw className="w-3 h-3" /> Regenerate
                    </button>
                    <button
                      className="flex items-center gap-1.5 text-xs px-2 sm:px-3 py-1.5 rounded-lg text-white transition-all hover:opacity-90"
                      style={{ background: "#c9a84c" }}
                      onClick={() => showNotification("success", "Design saved successfully!")}
                    >
                      <Download className="w-3 h-3" /> Save
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm">
                <div className="text-sm font-medium mb-3" style={{ color: "#1a1a2e" }}>
                  Design Highlights
                </div>
                <div className="space-y-2.5">
                  {result.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2.5 text-sm" style={{ color: "#717182" }}>
                      <Check className="w-4 h-4 flex-shrink-0" style={{ color: "#c9a84c" }} />
                      {h}
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-5">
                  <button
                    className="flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-white"
                    style={{ background: "#1a1a2e" }}
                    onClick={() => showNotification("info", "Furniture list generated! Check your recommendations.")}
                  >
                    Get Furniture List
                  </button>
                  <button
                    className="flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-medium border"
                    style={{ borderColor: "#c9a84c40", color: "#1a1a2e" }}
                    onClick={() => showNotification("success", "Quote request submitted! We'll contact you shortly.")}
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
