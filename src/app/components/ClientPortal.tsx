import { useState } from "react";
import { Building2, FileText, Calendar, MessageSquare, CheckCircle, Clock, AlertCircle, Download, Eye, Share2, Sparkles, TrendingUp } from "lucide-react";
import { showNotification } from "./NotificationSystem";

interface ClientProject {
  id: number;
  name: string;
  client: string;
  status: "design" | "planning" | "procurement" | "installation" | "completed";
  progress: number;
  nextMilestone: string;
  budget: number;
  lastUpdate: string;
}

const clientProjects: ClientProject[] = [
  {
    id: 1,
    name: "NovaTech HQ Renovation",
    client: "NovaTech Solutions",
    status: "procurement",
    progress: 65,
    nextMilestone: "Furniture Delivery",
    budget: 185000,
    lastUpdate: "2 hours ago"
  },
  {
    id: 2,
    name: "Emirates Capital Executive Suite",
    client: "Emirates Capital Group",
    status: "installation",
    progress: 90,
    nextMilestone: "Final Inspection",
    budget: 420000,
    lastUpdate: "1 day ago"
  },
  {
    id: 3,
    name: "HealthCore Clinic Design",
    client: "HealthCore Clinics",
    status: "design",
    progress: 25,
    nextMilestone: "Concept Approval",
    budget: 290000,
    lastUpdate: "3 days ago"
  },
];

interface Update {
  id: number;
  project: string;
  type: "milestone" | "document" | "message" | "alert";
  title: string;
  description: string;
  timestamp: string;
  status: "read" | "unread";
}

const updates: Update[] = [
  {
    id: 1,
    project: "NovaTech HQ Renovation",
    type: "milestone",
    title: "Floor Plans Approved",
    description: "Client has approved the final floor plan layout. Moving to procurement phase.",
    timestamp: "2 hours ago",
    status: "unread"
  },
  {
    id: 2,
    project: "Emirates Capital Executive Suite",
    type: "document",
    title: "3D Renders Available",
    description: "New photorealistic renders of the executive suite are ready for review.",
    timestamp: "1 day ago",
    status: "unread"
  },
  {
    id: 3,
    project: "HealthCore Clinic Design",
    type: "message",
    title: "Design Meeting Scheduled",
    description: "Initial design consultation meeting scheduled for June 20th at 10:00 AM.",
    timestamp: "3 days ago",
    status: "read"
  },
  {
    id: 4,
    project: "NovaTech HQ Renovation",
    type: "alert",
    title: "Budget Update Required",
    description: "Furniture selection exceeds budget by 5%. Please review alternatives.",
    timestamp: "5 days ago",
    status: "read"
  },
];

const statuses: { id: ClientProject["status"]; label: string; color: string }[] = [
  { id: "design", label: "Design Phase", color: "#3b82f6" },
  { id: "planning", label: "Planning", color: "#8b5cf6" },
  { id: "procurement", label: "Procurement", color: "#f59e0b" },
  { id: "installation", label: "Installation", color: "#f97316" },
  { id: "completed", label: "Completed", color: "#10b981" },
];

function StatusBadge({ status }: { status: ClientProject["status"] }) {
  const config = statuses.find(s => s.id === status)!;
  return (
    <span
      className="text-xs font-medium px-2 py-0.5 rounded-full"
      style={{ background: config.color + "20", color: config.color }}
    >
      {config.label}
    </span>
  );
}

export function ClientPortal() {
  const [selectedProject, setSelectedProject] = useState<ClientProject | null>(null);
  const [selectedUpdate, setSelectedUpdate] = useState<Update | null>(null);

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-full" style={{ background: "#faf9f6" }}>
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="w-5 h-5" style={{ color: "#c9a84c" }} />
          <span className="text-sm font-medium" style={{ color: "#c9a84c" }}>Client Portal</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1a1a2e", fontSize: "1.5rem sm:text-1.75rem" }}>
          Client Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "#717182" }}>
          Track project progress and collaborate with clients
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {[
          { icon: Building2, label: "Active Projects", value: clientProjects.length.toString(), sub: "In progress" },
          { icon: CheckCircle, label: "Completed", value: "12", sub: "This year" },
          { icon: TrendingUp, label: "Client Satisfaction", value: "4.8/5", sub: "Average rating" },
          { icon: Clock, label: "Avg Timeline", value: "8 weeks", sub: "Per project" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-3 sm:p-4 md:p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <s.icon className="w-4 h-4" style={{ color: "#c9a84c" }} />
              <span className="text-xs" style={{ color: "#717182" }}>{s.label}</span>
            </div>
            <div className="font-semibold text-base sm:text-lg" style={{ color: "#1a1a2e" }}>{s.value}</div>
            <div className="text-xs mt-0.5" style={{ color: "#a0a0b0" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Projects */}
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold" style={{ color: "#1a1a2e" }}>Active Projects</h3>
            <button className="text-xs font-medium" style={{ color: "#c9a84c" }}>View All</button>
          </div>
          <div className="space-y-3">
            {clientProjects.map((project) => (
              <div
                key={project.id}
                className="p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md"
                style={{ borderColor: "#e9ebef" }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm mb-1 truncate" style={{ color: "#1a1a2e" }}>{project.name}</h4>
                    <p className="text-xs truncate" style={{ color: "#717182" }}>{project.client}</p>
                  </div>
                  <StatusBadge status={project.status} />
                </div>
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: "#717182" }}>Progress</span>
                    <span className="text-xs font-medium" style={{ color: "#1a1a2e" }}>{project.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "#e9ebef" }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${project.progress}%`, background: "#c9a84c" }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs" style={{ color: "#717182" }}>
                  <span className="truncate">📅 {project.nextMilestone}</span>
                  <span className="flex-shrink-0">{project.lastUpdate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Updates */}
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold" style={{ color: "#1a1a2e" }}>Recent Updates</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-xs" style={{ color: "#717182" }}>{updates.filter(u => u.status === "unread").length} unread</span>
            </div>
          </div>
          <div className="space-y-3">
            {updates.map((update) => (
              <div
                key={update.id}
                className={`p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer ${
                  update.status === "unread" ? "" : "opacity-70"
                }`}
                style={{ borderColor: update.status === "unread" ? "#c9a84c" : "#e9ebef" }}
                onClick={() => setSelectedUpdate(update)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      update.type === "milestone" ? "bg-green-100" :
                      update.type === "document" ? "bg-blue-100" :
                      update.type === "message" ? "bg-purple-100" : "bg-red-100"
                    }`}
                  >
                    {update.type === "milestone" && <CheckCircle className="w-4 h-4 text-green-600" />}
                    {update.type === "document" && <FileText className="w-4 h-4 text-blue-600" />}
                    {update.type === "message" && <MessageSquare className="w-4 h-4 text-purple-600" />}
                    {update.type === "alert" && <AlertCircle className="w-4 h-4 text-red-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium" style={{ color: "#717182" }}>{update.project}</span>
                      <span className="text-xs" style={{ color: "#a0a0b0" }}>{update.timestamp}</span>
                    </div>
                    <h4 className="text-sm font-medium mb-1" style={{ color: "#1a1a2e" }}>{update.title}</h4>
                    <p className="text-xs" style={{ color: "#717182" }}>{update.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(26,26,46,0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5" style={{ background: "#1a1a2e" }}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-white font-semibold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {selectedProject.name}
                  </div>
                  <div className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>{selectedProject.client}</div>
                </div>
                <StatusBadge status={selectedProject.status} />
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="rounded-xl p-4" style={{ background: "#faf9f6" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium" style={{ color: "#1a1a2e" }}>Overall Progress</span>
                  <span className="text-xs font-semibold" style={{ color: "#c9a84c" }}>{selectedProject.progress}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "#e9ebef" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${selectedProject.progress}%`, background: "#c9a84c" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-3" style={{ background: "#faf9f6" }}>
                  <div className="text-xs mb-0.5" style={{ color: "#717182" }}>Budget</div>
                  <div className="text-sm font-medium" style={{ color: "#1a1a2e" }}>INR {selectedProject.budget.toLocaleString()}</div>
                </div>
                <div className="rounded-xl p-3" style={{ background: "#faf9f6" }}>
                  <div className="text-xs mb-0.5" style={{ color: "#717182" }}>Next Milestone</div>
                  <div className="text-sm font-medium" style={{ color: "#1a1a2e" }}>{selectedProject.nextMilestone}</div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border" style={{ borderColor: "#e9ebef", color: "#1a1a2e" }} onClick={() => showNotification("info", "Opening project details...")}>
                  <Eye className="w-4 h-4" /> View Details
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border" style={{ borderColor: "#e9ebef", color: "#1a1a2e" }} onClick={() => showNotification("success", "Message sent to client!")}>
                  <MessageSquare className="w-4 h-4" /> Send Message
                </button>
              </div>

              <button
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white"
                style={{ background: "#c9a84c" }}
                onClick={() => showNotification("success", "Project report downloaded!")}
              >
                <Download className="w-4 h-4" /> Download Project Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Insight */}
      <div className="mt-6 rounded-xl p-4" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4" style={{ color: "#c9a84c" }} />
          <span className="text-xs font-medium" style={{ color: "#c9a84c" }}>AI Client Insight</span>
        </div>
        <p className="text-sm" style={{ color: "#1a1a2e" }}>
          Emirates Capital project is 90% complete. Schedule final walkthrough meeting this week to ensure on-time delivery.
        </p>
      </div>
    </div>
  );
}
