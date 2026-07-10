import { useState } from "react";
import { FileText, Loader2, Sparkles, Download, Mail, Printer, Building2, User, Phone, MapPin } from "lucide-react";
import { showNotification } from "./NotificationSystem";

const defaultItems = [
  { id: 1, name: "Executive L-Desk", category: "Workstations", qty: 5, unitPrice: 380 },
  { id: 2, name: "Ergonomic Mesh Chair", category: "Chairs", qty: 20, unitPrice: 180 },
  { id: 3, name: "Executive Leather Chair", category: "Chairs", qty: 5, unitPrice: 340 },
  { id: 4, name: "16-Seat Conference Table", category: "Tables", qty: 1, unitPrice: 1200 },
  { id: 5, name: "Modular Storage Unit", category: "Storage", qty: 6, unitPrice: 220 },
  { id: 6, name: "Reception Desk", category: "Tables", qty: 1, unitPrice: 780 },
  { id: 7, name: "3-Seat Reception Sofa", category: "Lounge", qty: 2, unitPrice: 650 },
  { id: 8, name: "Height-Adjust Desk", category: "Workstations", qty: 15, unitPrice: 290 },
];

export function QuotationGenerator() {
  const [company, setCompany] = useState("Meridian Group LLC");
  const [contact, setContact] = useState("Sarah Al-Hassan");
  const [phone, setPhone] = useState("+971 50 123 4567");
  const [email, setEmail] = useState("sarah@meridiangroup.ae");
  const [address, setAddress] = useState("Level 14, DIFC, Dubai, UAE");
  const [duration, setDuration] = useState("12");
  const [items, setItems] = useState(defaultItems);
  const [processing, setProcessing] = useState(false);
  const [generated, setGenerated] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const vat = Math.round(subtotal * 0.05);
  const total = subtotal + vat;
  const annualTotal = total * parseInt(duration || "12");

  const quoteNum = `OAI-2026-${Math.floor(Math.random() * 90000) + 10000}`;
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  const validUntil = new Date(Date.now() + 30 * 86400000).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

  function updateQty(id: number, qty: number) {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, qty: Math.max(0, qty) } : i).filter((i) => i.qty > 0));
  }

  function generate() {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setGenerated(true);
    }, 2000);
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-full" style={{ background: "#faf9f6" }}>
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5" style={{ color: "#c9a84c" }} />
          <span className="text-sm font-medium" style={{ color: "#c9a84c" }}>AI Quotation Generator</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1a1a2e", fontSize: "1.5rem sm:text-1.75rem" }}>
          Instant Professional Quote
        </h1>
        <p className="text-sm mt-1" style={{ color: "#717182" }}>
          AI generates ready-to-send quotations in seconds — no manual work needed
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Left: Form */}
        <div className="space-y-4 sm:space-y-5">
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
            <div className="text-sm font-medium mb-4" style={{ color: "#1a1a2e" }}>Client Information</div>
            <div className="space-y-3">
              {[
                { icon: Building2, label: "Company Name", value: company, set: setCompany },
                { icon: User, label: "Contact Person", value: contact, set: setContact },
                { icon: Phone, label: "Phone Number", value: phone, set: setPhone },
                { icon: Mail, label: "Email Address", value: email, set: setEmail },
                { icon: MapPin, label: "Office Address", value: address, set: setAddress },
              ].map((field) => (
                <div key={field.label} className="flex items-center gap-3">
                  <field.icon className="w-4 h-4 flex-shrink-0" style={{ color: "#717182" }} />
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => { field.set(e.target.value); setGenerated(false); }}
                    placeholder={field.label}
                    className="flex-1 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm border outline-none"
                    style={{ borderColor: "#e9ebef", color: "#1a1a2e" }}
                  />
                </div>
              ))}
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 flex-shrink-0" style={{ color: "#717182" }} />
                <select
                  value={duration}
                  onChange={(e) => { setDuration(e.target.value); setGenerated(false); }}
                  className="flex-1 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm border outline-none"
                  style={{ borderColor: "#e9ebef", color: "#1a1a2e" }}
                >
                  {["3", "6", "12", "24", "36"].map((d) => (
                    <option key={d} value={d}>{d} Month{parseInt(d) > 1 ? "s" : ""} Contract</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
            <div className="text-sm font-medium mb-4" style={{ color: "#1a1a2e" }}>Furniture Items</div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-2 sm:gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm truncate" style={{ color: "#1a1a2e" }}>{item.name}</div>
                    <div className="text-xs" style={{ color: "#717182" }}>INR {item.unitPrice}/mo each</div>
                  </div>
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => { updateQty(item.id, parseInt(e.target.value) || 0); setGenerated(false); }}
                    min={0}
                    className="w-14 sm:w-16 rounded-lg px-2 py-1.5 text-xs sm:text-sm text-center border outline-none"
                    style={{ borderColor: "#e9ebef", color: "#1a1a2e" }}
                  />
                  <div className="text-xs sm:text-sm font-medium w-20 sm:w-24 text-right" style={{ color: "#1a1a2e" }}>
                    INR {(item.qty * item.unitPrice).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-1.5">
              {[
                { label: "Subtotal", value: `INR ${subtotal.toLocaleString()}` },
                { label: "VAT (5%)", value: `INR ${vat.toLocaleString()}` },
              ].map((r) => (
                <div key={r.label} className="flex justify-between text-xs sm:text-sm" style={{ color: "#717182" }}>
                  <span>{r.label}</span><span>{r.value}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold pt-2 border-t border-gray-100 text-xs sm:text-sm" style={{ color: "#1a1a2e" }}>
                <span>Monthly Total</span>
                <span style={{ color: "#c9a84c" }}>INR {total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <button
            onClick={generate}
            disabled={processing}
            className="w-full py-3 sm:py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-white transition-all disabled:opacity-60"
            style={{ background: "#1a1a2e" }}
          >
            {processing ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating Quote...</> : <><Sparkles className="w-4 h-4" /> Generate AI Quotation</>}
          </button>
        </div>

        {/* Right: Quote Preview */}
        <div>
          {!generated && !processing && (
            <div
              className="rounded-2xl flex flex-col items-center justify-center py-24 border-2 border-dashed h-full"
              style={{ background: "white", borderColor: "#e9ebef" }}
            >
              <FileText className="w-12 h-12 mb-4" style={{ color: "#e9ebef" }} />
              <div className="text-sm" style={{ color: "#a0a0b0" }}>Your professional quote will appear here</div>
            </div>
          )}

          {processing && (
            <div className="bg-white rounded-2xl p-10 shadow-sm flex flex-col items-center gap-4 h-full justify-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(201,168,76,0.1)" }}>
                <Sparkles className="w-8 h-8 animate-pulse" style={{ color: "#c9a84c" }} />
              </div>
              <div className="text-sm font-medium" style={{ color: "#1a1a2e" }}>AI is preparing your quotation...</div>
            </div>
          )}

          {generated && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Quote Header */}
              <div className="p-6" style={{ background: "#1a1a2e" }}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-white font-semibold text-lg mb-0.5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      OfficeAI Pro
                    </div>
                    <div className="text-xs" style={{ color: "#c9a84c" }}>Luxury Workspace Solutions</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium mb-0.5" style={{ color: "#c9a84c" }}>QUOTATION</div>
                    <div className="text-white font-semibold text-sm">{quoteNum}</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div style={{ color: "rgba(255,255,255,0.5)" }}>Issue Date</div>
                    <div className="text-white">{today}</div>
                  </div>
                  <div>
                    <div style={{ color: "rgba(255,255,255,0.5)" }}>Valid Until</div>
                    <div className="text-white">{validUntil}</div>
                  </div>
                </div>
              </div>

              {/* Client Info */}
              <div className="p-4 sm:p-5 border-b" style={{ borderColor: "#f0f0f0" }}>
                <div className="text-xs font-medium mb-2" style={{ color: "#717182" }}>BILL TO</div>
                <div className="font-semibold text-sm sm:text-base" style={{ color: "#1a1a2e" }}>{company}</div>
                <div className="text-xs sm:text-sm" style={{ color: "#717182" }}>{contact}</div>
                <div className="text-xs sm:text-sm" style={{ color: "#717182" }}>{email} · {phone}</div>
                <div className="text-xs sm:text-sm" style={{ color: "#717182" }}>{address}</div>
              </div>

              {/* Items */}
              <div className="p-4 sm:p-5 overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <th className="text-left pb-2 text-xs font-medium" style={{ color: "#717182" }}>ITEM</th>
                      <th className="text-center pb-2 text-xs font-medium" style={{ color: "#717182" }}>QTY</th>
                      <th className="text-right pb-2 text-xs font-medium" style={{ color: "#717182" }}>UNIT/MO</th>
                      <th className="text-right pb-2 text-xs font-medium" style={{ color: "#717182" }}>TOTAL/MO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} style={{ borderBottom: "1px solid #f9f9f9" }}>
                        <td className="py-2" style={{ color: "#1a1a2e" }}>{item.name}</td>
                        <td className="py-2 text-center" style={{ color: "#717182" }}>{item.qty}</td>
                        <td className="py-2 text-right" style={{ color: "#717182" }}>INR {item.unitPrice}</td>
                        <td className="py-2 text-right font-medium" style={{ color: "#1a1a2e" }}>INR {(item.qty * item.unitPrice).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-4 space-y-1.5 border-t pt-3" style={{ borderColor: "#f0f0f0" }}>
                  <div className="flex justify-between text-xs sm:text-sm" style={{ color: "#717182" }}>
                    <span>Subtotal</span><span>INR {subtotal.toLocaleString()}/mo</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm" style={{ color: "#717182" }}>
                    <span>VAT (5%)</span><span>INR {vat.toLocaleString()}/mo</span>
                  </div>
                  <div className="flex justify-between font-semibold text-sm sm:text-base pt-2 border-t" style={{ borderColor: "#f0f0f0", color: "#1a1a2e" }}>
                    <span>Monthly Total</span>
                    <span style={{ color: "#c9a84c" }}>INR {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm" style={{ color: "#717182" }}>
                    <span>{duration}-Month Contract Total</span>
                    <span>INR {annualTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-4 rounded-xl p-3 text-xs" style={{ background: "#faf9f6", color: "#717182" }}>
                  Includes free delivery, installation, and maintenance. 30-day cancellation notice required.
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 sm:p-5 pt-0 flex gap-2 sm:gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-colors hover:bg-gray-50" style={{ borderColor: "#e9ebef", color: "#1a1a2e" }} onClick={() => showNotification("success", "PDF downloaded successfully!")}>
                  <Download className="w-4 h-4" /> PDF
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-colors hover:bg-gray-50" style={{ borderColor: "#e9ebef", color: "#1a1a2e" }} onClick={() => showNotification("success", "Quotation sent via email!")}>
                  <Mail className="w-4 h-4" /> Email
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-colors hover:bg-gray-50" style={{ borderColor: "#e9ebef", color: "#1a1a2e" }} onClick={() => showNotification("info", "Preparing print view...")}>
                  <Printer className="w-4 h-4" /> Print
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
