import { useState } from "react";
import { X, MapPin, Users, Maximize, Star, Sparkles } from "lucide-react";
import { showNotification } from "./NotificationSystem";

const industries = ["All", "Technology", "Finance", "Healthcare", "Legal", "Creative", "Manufacturing"];

const projects = [
  {
    id: 1,
    title: "TechVentures HQ",
    industry: "Technology",
    img: "https://images.unsplash.com/photo-1715593949273-09009558300a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    location: "Dubai Media City",
    employees: 120,
    sqft: 8500,
    style: "Modern",
    rating: 4.9,
    desc: "A state-of-the-art open workspace with collaborative zones, privacy pods, and an innovation lab. Features height-adjustable desks throughout and a dedicated game room.",
    highlights: ["Height-adjustable workstations", "Innovation lab", "Biophilic design elements", "Modular meeting rooms"],
    aiGenerated: true,
  },
  {
    id: 2,
    title: "Meridian Financial Centre",
    industry: "Finance",
    img: "https://images.unsplash.com/photo-1699621106755-4fe40ce95d64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    location: "DIFC, Dubai",
    employees: 45,
    sqft: 4200,
    style: "Executive",
    rating: 5.0,
    desc: "Premium executive offices with private suites, a boardroom, and client meeting areas designed to convey trust and authority. Rich wood tones and leather accents throughout.",
    highlights: ["Private executive suites", "Boardroom with AV", "Client lounge area", "Private library"],
    aiGenerated: false,
  },
  {
    id: 3,
    title: "MedCore Clinic Offices",
    industry: "Healthcare",
    img: "https://images.unsplash.com/photo-1706074793638-da28b90ea8ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    location: "Business Bay",
    employees: 60,
    sqft: 5800,
    style: "Scandinavian",
    rating: 4.8,
    desc: "Clean, calming workspace designed to promote well-being. White oak furniture, soft lighting, and wellness-oriented breakout spaces for a healthcare team that needs to recharge.",
    highlights: ["Wellness break rooms", "Ergonomic standing desks", "Acoustic panels", "Natural light optimization"],
    aiGenerated: true,
  },
  {
    id: 4,
    title: "Sterling Law Group",
    industry: "Legal",
    img: "https://images.unsplash.com/photo-1705909773374-425e800059de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    location: "ADGM, Abu Dhabi",
    employees: 28,
    sqft: 3100,
    style: "Classic",
    rating: 4.9,
    desc: "Traditional legal office with a contemporary twist. Dark wood conference table, leather chairs, and a professional reception that makes an immediate impression on clients.",
    highlights: ["16-seat conference table", "Private partner offices", "Client reception lounge", "Secure document storage"],
    aiGenerated: false,
  },
  {
    id: 5,
    title: "Pixel & Co Creative Studio",
    industry: "Creative",
    img: "https://images.unsplash.com/photo-1646153114001-495dfb56506d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    location: "Al Quoz, Dubai",
    employees: 35,
    sqft: 4500,
    style: "Industrial",
    rating: 4.7,
    desc: "Vibrant creative workspace with exposed brick, colourful accent furniture, and flexible layouts. Dedicated brainstorming zones with writable walls and movable furniture.",
    highlights: ["Writable wall surfaces", "Flexible modular furniture", "Photography backdrop area", "Neon accent lighting"],
    aiGenerated: true,
  },
  {
    id: 6,
    title: "Atlas Manufacturing Corp",
    industry: "Manufacturing",
    img: "https://images.unsplash.com/photo-1594235048794-fae8583a5af5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    location: "Jebel Ali Free Zone",
    employees: 200,
    sqft: 15000,
    style: "Industrial",
    rating: 4.6,
    desc: "Large-scale office complex with a mix of industrial aesthetics and functional workspaces. Includes a dedicated operations center, multiple conference rooms, and a staff cafeteria.",
    highlights: ["Operations control center", "8 conference rooms", "Staff cafeteria & lounge", "Manager private offices"],
    aiGenerated: true,
  },
];

export function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.industry === filter);

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-full" style={{ background: "#faf9f6" }}>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5" style={{ color: "#c9a84c" }} />
          <span className="text-sm font-medium" style={{ color: "#c9a84c" }}>AI Portfolio Generator</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1a1a2e", fontSize: "1.5rem sm:text-1.75rem" }}>
          Project Portfolio
        </h1>
        <p className="text-sm mt-1" style={{ color: "#717182" }}>
          AI-generated case studies and real client projects — protecting privacy while showcasing capability
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 mb-6 sm:mb-8 flex-wrap">
        {industries.map((ind) => (
          <button
            key={ind}
            onClick={() => setFilter(ind)}
            className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all"
            style={
              filter === ind
                ? { background: "#1a1a2e", color: "white" }
                : { background: "white", color: "#717182", border: "1px solid #e9ebef" }
            }
          >
            {ind}
          </button>
        ))}
        <div className="ml-auto text-xs sm:text-sm" style={{ color: "#717182" }}>
          {filtered.length} projects
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filtered.map((project) => (
          <button
            key={project.id}
            onClick={() => setSelected(project)}
            className="group text-left bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="relative h-36 sm:h-48 overflow-hidden">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 60%)" }} />
              {project.aiGenerated && (
                <div
                  className="absolute top-2 sm:top-3 left-2 sm:left-3 flex items-center gap-1 text-xs px-2 py-1 rounded-full"
                  style={{ background: "rgba(201,168,76,0.9)", color: "white" }}
                >
                  <Sparkles className="w-3 h-3" /> AI Generated
                </div>
              )}
              <div
                className="absolute top-2 sm:top-3 right-2 sm:right-3 text-xs px-2 py-1 rounded-full"
                style={{ background: "rgba(26,26,46,0.8)", color: "white" }}
              >
                {project.industry}
              </div>
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="mb-1 text-sm sm:text-base" style={{ color: "#1a1a2e", fontSize: "1rem" }}>{project.title}</h3>
              <div className="flex items-center gap-2 sm:gap-3 mb-3">
                <div className="flex items-center gap-1 text-xs" style={{ color: "#717182" }}>
                  <MapPin className="w-3 h-3" /> {project.location}
                </div>
                <div className="flex items-center gap-1 text-xs" style={{ color: "#c9a84c" }}>
                  <Star className="w-3 h-3 fill-current" /> {project.rating}
                </div>
              </div>
              <p className="text-xs sm:text-sm mb-4 line-clamp-2" style={{ color: "#717182", lineHeight: 1.6 }}>
                {project.desc}
              </p>
              <div className="flex items-center gap-2 sm:gap-4 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "#717182" }}>
                  <Users className="w-3 h-3" /> {project.employees} staff
                </div>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "#717182" }}>
                  <Maximize className="w-3 h-3" /> {project.sqft.toLocaleString()} sqft
                </div>
                <div
                  className="ml-auto text-xs font-medium"
                  style={{ color: "#1a1a2e", background: "#f5f0e8", padding: "2px 8px sm:px-10", borderRadius: "9999px" }}
                >
                  {project.style}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(26,26,46,0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64">
              <img src={selected.img} alt={selected.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent 50%)" }} />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              {selected.aiGenerated && (
                <div
                  className="absolute top-4 left-4 flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(201,168,76,0.9)", color: "white" }}
                >
                  <Sparkles className="w-3 h-3" /> AI Generated
                </div>
              )}
              <div className="absolute bottom-4 left-5">
                <div className="text-white text-xl mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {selected.title}
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <MapPin className="w-3 h-3" /> {selected.location}
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-5">
                {[
                  { label: "Industry", value: selected.industry },
                  { label: "Style", value: selected.style },
                  { label: "Employees", value: `${selected.employees}` },
                  { label: "Area", value: `${selected.sqft.toLocaleString()} sqft` },
                  { label: "Rating", value: `⭐ ${selected.rating}` },
                ].map((d) => (
                  <div key={d.label} className="rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-center" style={{ background: "#faf9f6" }}>
                    <div className="text-xs mb-0.5" style={{ color: "#717182" }}>{d.label}</div>
                    <div className="text-xs sm:text-sm font-medium" style={{ color: "#1a1a2e" }}>{d.value}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs sm:text-sm mb-4 sm:mb-5" style={{ color: "#717182", lineHeight: 1.75 }}>{selected.desc}</p>
              <div className="mb-4 sm:mb-5">
                <div className="text-sm font-medium mb-3" style={{ color: "#1a1a2e" }}>Key Features</div>
                <div className="grid grid-cols-2 gap-2">
                  {selected.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-xs sm:text-sm" style={{ color: "#717182" }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#c9a84c" }} />
                      {h}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <button
                  className="flex-1 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium text-white"
                  style={{ background: "#1a1a2e" }}
                  onClick={() => { showNotification("success", "Design request submitted! We'll contact you shortly."); setSelected(null); }}
                >
                  Request Similar Design
                </button>
                <button
                  className="flex-1 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium border"
                  style={{ borderColor: "#c9a84c40", color: "#1a1a2e" }}
                  onClick={() => { showNotification("success", "Quotation request sent! Check your email."); setSelected(null); }}
                >
                  Get Quotation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
