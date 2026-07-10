import { useState } from "react";
import { Sofa, Loader2, Sparkles, Plus, Check, Filter, ShoppingCart } from "lucide-react";
import { showNotification } from "./NotificationSystem";

const budgetOptions = ["Under INR 5,000/mo", "INR 5,000–15,000/mo", "INR 15,000–30,000/mo", "INR 30,000+/mo"];
const styleOptions = ["Modern", "Executive", "Scandinavian", "Industrial", "Any Style"];
const categoryOptions = ["All", "Workstations", "Chairs", "Tables", "Storage", "Lounge", "Accessories"];

const allFurniture = [
  { id: 1, name: "Executive L-Desk", category: "Workstations", style: "Executive", price: 380, img: "https://images.unsplash.com/photo-1681418659069-eef28d44aeab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80", desc: "Solid walnut top, integrated cable tray, 180×160cm", qty: 1, score: 98 },
  { id: 2, name: "Height-Adjust Desk", category: "Workstations", style: "Modern", price: 290, img: "https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80", desc: "Electric sit-stand, 140×70cm, memory presets", qty: 1, score: 95 },
  { id: 3, name: "Ergonomic Mesh Chair", category: "Chairs", style: "Modern", price: 180, img: "https://images.unsplash.com/photo-1572521165329-b197f9ea3da6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80", desc: "Lumbar support, adjustable armrests, 10-year warranty", qty: 1, score: 97 },
  { id: 4, name: "Executive Leather Chair", category: "Chairs", style: "Executive", price: 340, img: "https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80", desc: "Full-grain leather, high-back, with headrest", qty: 1, score: 92 },
  { id: 5, name: "16-Seat Conference Table", category: "Tables", style: "Executive", price: 1200, img: "https://images.unsplash.com/photo-1706074793638-da28b90ea8ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80", desc: "Oval mahogany, power & data module, 400×130cm", qty: 1, score: 94 },
  { id: 6, name: "Modular Storage Unit", category: "Storage", style: "Modern", price: 220, img: "https://images.unsplash.com/photo-1715593949273-09009558300a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80", desc: "Floor-to-ceiling modular shelves, lockable cabinets", qty: 2, score: 89 },
  { id: 7, name: "3-Seat Reception Sofa", category: "Lounge", style: "Modern", price: 650, img: "https://images.unsplash.com/photo-1706689656095-168768dc20a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80", desc: "Low-profile, premium fabric, chrome legs", qty: 1, score: 91 },
  { id: 8, name: "Collaborative Bench Desk", category: "Workstations", style: "Scandinavian", price: 450, img: "https://images.unsplash.com/photo-1594235048794-fae8583a5af5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80", desc: "4-person pod, ash wood, privacy screens included", qty: 3, score: 88 },
  { id: 9, name: "Lounge Armchair", category: "Lounge", style: "Scandinavian", price: 280, img: "https://images.unsplash.com/photo-1699621106755-4fe40ce95d64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80", desc: "Sheepskin finish, solid oak frame, swivel base", qty: 4, score: 86 },
  { id: 10, name: "Mobile Pedestal", category: "Storage", style: "Any Style", price: 95, img: "https://images.unsplash.com/photo-1681418659069-eef28d44aeab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80", desc: "3-drawer with lock, soft-close, universal fit", qty: 1, score: 82 },
  { id: 11, name: "Reception Desk", category: "Tables", style: "Modern", price: 780, img: "https://images.unsplash.com/photo-1715593949273-09009558300a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80", desc: "Curved front panel, back storage, branded panel option", qty: 1, score: 93 },
  { id: 12, name: "Monitor Arm Dual", category: "Accessories", style: "Any Style", price: 85, img: "https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80", desc: "Dual-screen, full articulation, cable management", qty: 1, score: 87 },
];

export function FurnitureRecommender() {
  const [officeSize, setOfficeSize] = useState(500);
  const [employees, setEmployees] = useState(20);
  const [budget, setBudget] = useState(budgetOptions[1]);
  const [styleFilter, setStyleFilter] = useState("Any Style");
  const [category, setCategory] = useState("All");
  const [processing, setProcessing] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [cart, setCart] = useState<number[]>([]);

  function generate() {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setGenerated(true);
    }, 2200);
  }

  function toggleCart(id: number) {
    setCart((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }

  const filtered = allFurniture.filter((f) => {
    if (category !== "All" && f.category !== category) return false;
    if (styleFilter !== "Any Style" && f.style !== styleFilter && f.style !== "Any Style") return false;
    return true;
  });

  const cartTotal = allFurniture
    .filter((f) => cart.includes(f.id))
    .reduce((sum, f) => sum + f.price * f.qty, 0);

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-full" style={{ background: "#faf9f6" }}>
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sofa className="w-5 h-5" style={{ color: "#c9a84c" }} />
          <span className="text-sm font-medium" style={{ color: "#c9a84c" }}>AI Furniture Recommender</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1a1a2e", fontSize: "1.5rem sm:text-1.75rem" }}>
          Smart Furniture Selection
        </h1>
        <p className="text-sm mt-1" style={{ color: "#717182" }}>
          AI matches perfect furniture to your office size, team, and design preferences
        </p>
      </div>

      {/* Input Panel */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm mb-4 sm:mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          <div>
            <label className="text-xs font-medium block mb-2" style={{ color: "#717182" }}>Office Size (sqft)</label>
            <input
              type="number" value={officeSize} min={100} max={50000}
              onChange={(e) => { setOfficeSize(+e.target.value); setGenerated(false); }}
              className="w-full rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm border outline-none"
              style={{ borderColor: "#e9ebef", color: "#1a1a2e" }}
            />
          </div>
          <div>
            <label className="text-xs font-medium block mb-2" style={{ color: "#717182" }}>Employees</label>
            <input
              type="number" value={employees} min={1} max={1000}
              onChange={(e) => { setEmployees(+e.target.value); setGenerated(false); }}
              className="w-full rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm border outline-none"
              style={{ borderColor: "#e9ebef", color: "#1a1a2e" }}
            />
          </div>
          <div>
            <label className="text-xs font-medium block mb-2" style={{ color: "#717182" }}>Monthly Budget</label>
            <select
              value={budget}
              onChange={(e) => { setBudget(e.target.value); setGenerated(false); }}
              className="w-full rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm border outline-none"
              style={{ borderColor: "#e9ebef", color: "#1a1a2e" }}
            >
              {budgetOptions.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium block mb-2" style={{ color: "#717182" }}>Design Style</label>
            <select
              value={styleFilter}
              onChange={(e) => { setStyleFilter(e.target.value); setGenerated(false); }}
              className="w-full rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm border outline-none"
              style={{ borderColor: "#e9ebef", color: "#1a1a2e" }}
            >
              {styleOptions.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={generate}
            disabled={processing}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium text-white transition-all disabled:opacity-60"
            style={{ background: "#1a1a2e" }}
          >
            {processing ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</> : <><Sparkles className="w-4 h-4" /> Get AI Recommendations</>}
          </button>
          {cart.length > 0 && (
            <div
              className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
              style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c" }}
            >
              <ShoppingCart className="w-4 h-4" />
              {cart.length} items · INR {cartTotal.toLocaleString()}/mo
            </div>
          )}
        </div>
      </div>

      {/* Filters + Results */}
      {generated && (
        <>
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 flex-wrap">
            <Filter className="w-4 h-4" style={{ color: "#717182" }} />
            {categoryOptions.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium transition-all"
                style={
                  category === c
                    ? { background: "#1a1a2e", color: "white" }
                    : { background: "white", color: "#717182", border: "1px solid #e9ebef" }
                }
              >
                {c}
              </button>
            ))}
            <div className="ml-auto text-xs sm:text-sm" style={{ color: "#717182" }}>
              {filtered.length} items matched
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((item) => {
              const inCart = cart.includes(item.id);
              return (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="relative h-36 sm:h-44">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    <div
                      className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: "rgba(201,168,76,0.9)", color: "white" }}
                    >
                      {item.score}% match
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="text-xs sm:text-sm font-medium" style={{ color: "#1a1a2e" }}>{item.name}</div>
                    </div>
                    <div className="text-xs mb-2" style={{ color: "#717182" }}>{item.desc}</div>
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: "#f5f0e8", color: "#c9a84c" }}
                      >
                        {item.category}
                      </span>
                      <span className="text-xs" style={{ color: "#717182" }}>Qty: {item.qty}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-xs sm:text-sm" style={{ color: "#1a1a2e" }}>
                          INR {item.price}/mo
                        </span>
                      </div>
                      <button
                        onClick={() => toggleCart(item.id)}
                        className="flex items-center gap-1.5 text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg font-medium transition-all"
                        style={
                          inCart
                            ? { background: "#10b98115", color: "#10b981" }
                            : { background: "#1a1a2e", color: "white" }
                        }
                      >
                        {inCart ? <><Check className="w-3 h-3" /> Added</> : <><Plus className="w-3 h-3" /> Add</>}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {cart.length > 0 && (
            <div
              className="mt-4 sm:mt-6 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0"
              style={{ background: "#1a1a2e" }}
            >
              <div className="text-center sm:text-left">
                <div className="text-white font-medium text-sm">{cart.length} items selected</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Estimated monthly rental</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl font-semibold" style={{ color: "#c9a84c" }}>
                  INR {cartTotal.toLocaleString()}/mo
                </div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>excl. VAT</div>
              </div>
              <button
                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: "#c9a84c" }}
                onClick={() => showNotification("success", "Quotation generated successfully! Check your email.")}
              >
                Generate Quotation →
              </button>
            </div>
          )}
        </>
      )}

      {processing && (
        <div className="bg-white rounded-2xl p-12 shadow-sm flex flex-col items-center gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "rgba(201,168,76,0.1)" }}
          >
            <Sofa className="w-8 h-8 animate-bounce" style={{ color: "#c9a84c" }} />
          </div>
          <div className="text-sm font-medium" style={{ color: "#1a1a2e" }}>
            AI is finding the perfect furniture for your space...
          </div>
          <div className="text-xs text-center max-w-xs" style={{ color: "#717182" }}>
            Analyzing {officeSize} sqft office for {employees} employees with {styleFilter} preferences
          </div>
        </div>
      )}

      {!generated && !processing && (
        <div
          className="rounded-2xl flex flex-col items-center justify-center py-20 border-2 border-dashed"
          style={{ background: "white", borderColor: "#e9ebef" }}
        >
          <Sofa className="w-12 h-12 mb-4" style={{ color: "#e9ebef" }} />
          <div className="text-sm" style={{ color: "#a0a0b0" }}>Fill in the details above and click "Get AI Recommendations"</div>
        </div>
      )}
    </div>
  );
}
