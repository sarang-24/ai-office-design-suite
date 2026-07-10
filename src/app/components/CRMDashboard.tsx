import { useState } from "react";
import { Users, Star, TrendingUp, Phone, Mail, Calendar, Sparkles, ChevronRight, Clock, DollarSign, AlertCircle } from "lucide-react";
import { showNotification } from "./NotificationSystem";

type Stage = "new" | "qualified" | "proposal" | "negotiating" | "won";

interface Lead {
  id: number;
  company: string;
  contact: string;
  email: string;
  phone: string;
  stage: Stage;
  score: number;
  value: number;
  employees: number;
  source: string;
  nextAction: string;
  daysInStage: number;
  aiInsight: string;
}

const leads: Lead[] = [
  { id: 1, company: "NovaTech Solutions", contact: "Khalid Mansour", email: "khalid@novatech.ae", phone: "+971 55 123 4567", stage: "new", score: 92, value: 18500, employees: 45, source: "Website Chatbot", nextAction: "Send intro email", daysInStage: 1, aiInsight: "High-budget tech startup likely to close within 2 weeks" },
  { id: 2, company: "Emirates Capital Group", contact: "Fatima Al-Zaabi", email: "f.alzaabi@ecg.ae", phone: "+971 50 987 6543", stage: "qualified", score: 88, value: 42000, employees: 120, source: "LinkedIn", nextAction: "Schedule site visit", daysInStage: 3, aiInsight: "C-suite decision maker. Prioritize executive suite showcase" },
  { id: 3, company: "HealthCore Clinics", contact: "Dr. Ahmed Rashid", email: "arashid@healthcore.ae", phone: "+971 56 234 5678", stage: "proposal", score: 76, value: 29000, employees: 65, source: "Referral", nextAction: "Follow up on quote", daysInStage: 5, aiInsight: "Quote sent 5 days ago. Risk of going cold — call today" },
  { id: 4, company: "Pinnacle Law LLP", contact: "Sarah Neville", email: "sneville@pinnacle.ae", phone: "+971 52 345 6789", stage: "negotiating", score: 95, value: 15000, employees: 28, source: "Google Ads", nextAction: "Finalize contract terms", daysInStage: 7, aiInsight: "95% likelihood to close. Offer 10% discount to seal deal" },
  { id: 5, company: "Artisan Creative Co", contact: "Riya Sharma", email: "riya@artisancreative.ae", phone: "+971 58 456 7890", stage: "new", score: 65, value: 8500, employees: 18, source: "Instagram", nextAction: "Send portfolio", daysInStage: 0, aiInsight: "Creative agency — show industrial & vibrant style options" },
  { id: 6, company: "Global Logistics Hub", contact: "Omar Khalil", email: "okhalil@glhub.ae", phone: "+971 54 567 8901", stage: "qualified", score: 82, value: 55000, employees: 200, source: "Trade Show", nextAction: "Book demo presentation", daysInStage: 4, aiInsight: "Large enterprise deal. Involve CEO in next meeting" },
  { id: 7, company: "Zora Beauty Group", contact: "Layla Hassan", email: "layla@zorabeauty.ae", phone: "+971 55 678 9012", stage: "won", score: 100, value: 22000, employees: 40, source: "Website", nextAction: "Schedule delivery", daysInStage: 0, aiInsight: "Deal closed! Schedule installation and onboarding call" },
];

const stages: { id: Stage; label: string; color: string }[] = [
  { id: "new", label: "New Leads", color: "#3b82f6" },
  { id: "qualified", label: "Qualified", color: "#8b5cf6" },
  { id: "proposal", label: "Proposal Sent", color: "#f59e0b" },
  { id: "negotiating", label: "Negotiating", color: "#f97316" },
  { id: "won", label: "Won", color: "#10b981" },
];

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 90 ? "#10b981" : score >= 75 ? "#f59e0b" : "#ef4444";
  return (
    <div
      className="text-xs font-semibold px-2 py-0.5 rounded-full"
      style={{ background: color + "20", color }}
    >
      {score}
    </div>
  );
}

export function CRMDashboard() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const totalPipeline = leads.reduce((s, l) => s + l.value, 0);
  const wonValue = leads.filter((l) => l.stage === "won").reduce((s, l) => s + l.value, 0);
  const avgScore = Math.round(leads.reduce((s, l) => s + l.score, 0) / leads.length);

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-full" style={{ background: "#faf9f6" }}>
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-5 h-5" style={{ color: "#c9a84c" }} />
          <span className="text-sm font-medium" style={{ color: "#c9a84c" }}>AI CRM & Lead Scoring</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1a1a2e", fontSize: "1.5rem sm:text-1.75rem" }}>
          Sales Pipeline Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "#717182" }}>
          AI scores and prioritizes leads — never miss a high-value opportunity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {[
          { icon: Users, label: "Total Leads", value: leads.length.toString(), sub: "Active pipeline" },
          { icon: DollarSign, label: "Pipeline Value", value: `INR ${(totalPipeline / 1000).toFixed(0)}K`, sub: "Monthly rental" },
          { icon: TrendingUp, label: "Won This Month", value: `INR ${(wonValue / 1000).toFixed(0)}K`, sub: "Closed deals" },
          { icon: Star, label: "Avg AI Score", value: `${avgScore}%`, sub: "Lead quality" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <s.icon className="w-4 h-4" style={{ color: "#c9a84c" }} />
              <span className="text-xs" style={{ color: "#717182" }}>{s.label}</span>
            </div>
            <div className="font-semibold text-base sm:text-lg" style={{ color: "#1a1a2e" }}>{s.value}</div>
            <div className="text-xs mt-0.5" style={{ color: "#a0a0b0" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Kanban Pipeline */}
      <div className="grid grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8 overflow-x-auto">
        {stages.map((stage) => {
          const stageLeads = leads.filter((l) => l.stage === stage.id);
          const stageValue = stageLeads.reduce((s, l) => s + l.value, 0);
          return (
            <div key={stage.id} className="min-w-[200px]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: stage.color }} />
                  <span className="text-xs font-medium" style={{ color: "#1a1a2e" }}>{stage.label}</span>
                </div>
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full"
                  style={{ background: stage.color + "20", color: stage.color }}
                >
                  {stageLeads.length}
                </span>
              </div>
              {stageValue > 0 && (
                <div className="text-xs mb-2" style={{ color: "#a0a0b0" }}>
                  INR {stageValue.toLocaleString()}/mo
                </div>
              )}
              <div className="space-y-2">
                {stageLeads.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="w-full text-left bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all border border-transparent hover:border-opacity-30"
                    style={{ borderColor: stage.color }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = stage.color + "50")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium truncate" style={{ color: "#1a1a2e" }}>{lead.company}</span>
                      <ScoreBadge score={lead.score} />
                    </div>
                    <div className="text-xs mb-2" style={{ color: "#717182" }}>{lead.contact}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold" style={{ color: "#c9a84c" }}>
                        INR {lead.value.toLocaleString()}
                      </span>
                      <div className="flex items-center gap-1 text-xs" style={{ color: "#a0a0b0" }}>
                        <Clock className="w-3 h-3" /> {lead.daysInStage}d
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(26,26,46,0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5" style={{ background: "#1a1a2e" }}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-white font-semibold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {selectedLead.company}
                  </div>
                  <div className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>{selectedLead.contact}</div>
                </div>
                <div className="text-right">
                  <ScoreBadge score={selectedLead.score} />
                  <div className="text-xs mt-1" style={{ color: "#c9a84c" }}>AI Lead Score</div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Monthly Value", value: `INR ${selectedLead.value.toLocaleString()}` },
                  { label: "Employees", value: selectedLead.employees.toString() },
                  { label: "Source", value: selectedLead.source },
                  { label: "Days in Stage", value: `${selectedLead.daysInStage} days` },
                ].map((d) => (
                  <div key={d.label} className="rounded-xl p-3" style={{ background: "#faf9f6" }}>
                    <div className="text-xs mb-0.5" style={{ color: "#717182" }}>{d.label}</div>
                    <div className="text-xs sm:text-sm font-medium" style={{ color: "#1a1a2e" }}>{d.value}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-3 sm:p-4" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4" style={{ color: "#c9a84c" }} />
                  <span className="text-xs font-medium" style={{ color: "#c9a84c" }}>AI Insight</span>
                </div>
                <p className="text-xs sm:text-sm" style={{ color: "#1a1a2e" }}>{selectedLead.aiInsight}</p>
              </div>

              <div className="rounded-xl p-3 flex items-center gap-3" style={{ background: "#faf9f6" }}>
                <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#f59e0b" }} />
                <div>
                  <div className="text-xs font-medium" style={{ color: "#1a1a2e" }}>Next Action</div>
                  <div className="text-xs sm:text-sm" style={{ color: "#717182" }}>{selectedLead.nextAction}</div>
                </div>
              </div>

              <div className="flex gap-2 sm:gap-3">
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-colors hover:bg-gray-50"
                  style={{ borderColor: "#e9ebef", color: "#1a1a2e" }}
                >
                  <Phone className="w-4 h-4" /> Call
                </a>
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-colors hover:bg-gray-50"
                  style={{ borderColor: "#e9ebef", color: "#1a1a2e" }}
                >
                  <Mail className="w-4 h-4" /> Email
                </a>
                <button
                  className="flex-1 flex items-center justify-center gap-2 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium text-white"
                  style={{ background: "#c9a84c" }}
                  onClick={() => showNotification("success", "Calendar invite sent to lead!")}
                >
                  <Calendar className="w-4 h-4" /> Schedule
                </button>
              </div>

              <button
                className="w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium text-white"
                style={{ background: "#1a1a2e" }}
                onClick={() => { showNotification("success", "Lead moved to next stage successfully!"); setSelectedLead(null); }}
              >
                Move to Next Stage <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
