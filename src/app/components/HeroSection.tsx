import {
  Wand2, Sofa, FileText, Play, Layers, ImageIcon,
  Users, Package, MessageCircle, ArrowRight, Star, Building2, TrendingUp, Clock
} from "lucide-react";
import type { Tab } from "../App";

const HERO_IMG = "https://images.unsplash.com/photo-1706689656095-168768dc20a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80";

const features: { id: Tab; icon: React.ElementType; title: string; desc: string; color: string }[] = [
  { id: "design", icon: Wand2, title: "AI Design Visualizer", desc: "Upload a photo and get luxury office concepts in seconds", color: "#8b5cf6" },
  { id: "furniture", icon: Sofa, title: "Furniture Recommender", desc: "AI picks ideal furniture based on size, headcount & budget", color: "#c9a84c" },
  { id: "quote", icon: FileText, title: "Instant Quotation", desc: "Professional quotes generated automatically from your requirements", color: "#10b981" },
  { id: "design", icon: MessageCircle, title: "AI Chatbot 24/7", desc: "Always-on assistant on web & WhatsApp capturing leads", color: "#3b82f6" },
  { id: "planning", icon: Layers, title: "Space Planning", desc: "Optimal workstation & meeting room layouts from your dimensions", color: "#f59e0b" },
  { id: "portfolio", icon: ImageIcon, title: "Portfolio Generator", desc: "Realistic concepts & case studies for prospecting clients", color: "#ec4899" },
  { id: "crm", icon: Users, title: "Lead Scoring AI", desc: "Identifies high-value customers and auto-schedules follow-ups", color: "#06b6d4" },
  { id: "inventory", icon: Package, title: "Predictive Inventory", desc: "Forecast demand, track rentals and maintenance proactively", color: "#84cc16" },
  { id: "tour", icon: Play, title: "Virtual Office Tour", desc: "3D walkthroughs and interactive office previews for prospects", color: "#f97316" },
];

const stats = [
  { icon: Building2, value: "500+", label: "Client Offices" },
  { icon: Sofa, value: "12,000+", label: "Furniture Pieces" },
  { icon: Star, value: "98%", label: "Satisfaction Rate" },
  { icon: TrendingUp, value: "3x", label: "Faster Quoting" },
  { icon: Clock, value: "24/7", label: "AI Availability" },
];

export function HeroSection({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  return (
    <div className="min-h-full">
      {/* Hero Banner */}
      <div className="relative h-[300px] sm:h-[420px] overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Luxury office interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(26,26,46,0.88) 0%, rgba(26,26,46,0.5) 60%, rgba(26,26,46,0.3) 100%)" }}
        />
        <div className="relative h-full flex flex-col justify-center px-6 sm:px-12 max-w-3xl">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4 sm:mb-6 w-fit"
            style={{ background: "rgba(201,168,76,0.2)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            AI-Powered Office Solutions
          </div>
          <h1
            className="text-white mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.5rem, 5vw, 3rem)", lineHeight: 1.2 }}
          >
            Transform Your Office Space
            <br />
            <span style={{ color: "#c9a84c" }}>with Artificial Intelligence</span>
          </h1>
          <p className="text-white/70 mb-6 sm:mb-8 max-w-lg" style={{ fontSize: "0.875rem sm:1rem", lineHeight: 1.7 }}>
            From design visualization to furniture rental, AI-powered space planning, and instant quotations — all in one intelligent platform.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => onNavigate("design")}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: "#c9a84c" }}
            >
              Start AI Design <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate("tour")}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium border transition-all hover:bg-white/10"
              style={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}
            >
              <Play className="w-4 h-4" /> Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="px-4 sm:px-8 py-4 sm:py-5" style={{ background: "#1a1a2e" }}>
        <div className="flex items-center justify-around gap-3 sm:gap-4 flex-wrap">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-2 sm:gap-3 text-white">
              <s.icon className="w-4 h-4 opacity-50" style={{ color: "#c9a84c" }} />
              <span className="font-semibold text-sm sm:text-base" style={{ color: "#c9a84c" }}>{s.value}</span>
              <span className="text-xs sm:text-sm text-white/50">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="px-4 sm:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-10">
          <h2
            className="mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1a1a2e", fontSize: "1.5rem sm:text-1.75rem" }}
          >
            9 AI-Powered Capabilities
          </h2>
          <p style={{ color: "#717182" }}>Click any feature to explore it live</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((feat, i) => (
            <button
              key={i}
              onClick={() => onNavigate(feat.id)}
              className="group text-left rounded-xl p-4 sm:p-6 bg-white shadow-sm border border-transparent hover:shadow-md transition-all duration-200"
              style={{ borderColor: "transparent" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = feat.color + "40")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 sm:mb-4"
                style={{ background: feat.color + "15" }}
              >
                <feat.icon className="w-5 h-5" style={{ color: feat.color }} />
              </div>
              <h3 className="mb-2" style={{ color: "#1a1a2e", fontSize: "0.95rem" }}>
                {feat.title}
              </h3>
              <p className="text-sm" style={{ color: "#717182", lineHeight: 1.6 }}>
                {feat.desc}
              </p>
              <div
                className="flex items-center gap-1 mt-4 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: feat.color }}
              >
                Explore <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Demo Flow */}
      <div className="px-8 pb-12">
        <div className="rounded-2xl p-8" style={{ background: "#1a1a2e" }}>
          <h2
            className="text-white text-center mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.5rem" }}
          >
            The AI-Powered Demo Flow
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Upload Layout", desc: "Upload your office floor plan or photo" },
              { step: "02", title: "AI Designs", desc: "AI generates luxury design concepts" },
              { step: "03", title: "Pick Furniture", desc: "AI recommends the perfect pieces" },
              { step: "04", title: "3D Preview", desc: "Get an immersive virtual tour" },
              { step: "05", title: "Auto Quote", desc: "AI generates your quotation instantly" },
              { step: "06", title: "Chatbot", desc: "AI answers all client questions" },
              { step: "07", title: "CRM Capture", desc: "Lead stored and scored automatically" },
              { step: "08", title: "Follow-Up", desc: "AI schedules automated follow-ups" },
            ].map((flow) => (
              <div
                key={flow.step}
                className="rounded-xl p-4"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)" }}
              >
                <div className="text-xs font-semibold mb-2" style={{ color: "#c9a84c" }}>
                  Step {flow.step}
                </div>
                <div className="text-white text-sm font-medium mb-1">{flow.title}</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{flow.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
