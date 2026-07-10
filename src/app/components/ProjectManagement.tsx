import { useState } from "react";
import { FolderKanban, Calendar, Users, CheckCircle, Clock, AlertTriangle, Plus, MoreVertical, TrendingUp, Target, Sparkles } from "lucide-react";
import { showNotification } from "./NotificationSystem";

type Status = "planning" | "in_progress" | "review" | "completed";
type Priority = "low" | "medium" | "high" | "urgent";

interface Project {
  id: number;
  name: string;
  client: string;
  status: Status;
  priority: Priority;
  progress: number;
  deadline: string;
  team: string[];
  budget: number;
  spent: number;
  tasks: { completed: number; total: number };
  aiPrediction: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: "NovaTech HQ Renovation",
    client: "NovaTech Solutions",
    status: "in_progress",
    priority: "high",
    progress: 65,
    deadline: "2024-07-15",
    team: ["Sarah M.", "James K.", "Ahmed R."],
    budget: 185000,
    spent: 120500,
    tasks: { completed: 13, total: 20 },
    aiPrediction: "On track to complete 3 days early. Focus on furniture installation phase."
  },
  {
    id: 2,
    name: "Emirates Capital Executive Suite",
    client: "Emirates Capital Group",
    status: "review",
    priority: "urgent",
    progress: 90,
    deadline: "2024-06-20",
    team: ["Layla H.", "Omar K."],
    budget: 420000,
    spent: 395000,
    tasks: { completed: 27, total: 30 },
    aiPrediction: "Final approval pending. Schedule client walkthrough for tomorrow."
  },
  {
    id: 3,
    name: "HealthCore Clinic Design",
    client: "HealthCore Clinics",
    status: "planning",
    priority: "medium",
    progress: 15,
    deadline: "2024-08-30",
    team: ["Riya S.", "Khalid M."],
    budget: 290000,
    spent: 45000,
    tasks: { completed: 3, total: 25 },
    aiPrediction: "Budget allocation optimal. Recommend accelerating design phase."
  },
  {
    id: 4,
    name: "Pinnacle Law Office",
    client: "Pinnacle Law LLP",
    status: "completed",
    priority: "low",
    progress: 100,
    deadline: "2024-06-01",
    team: ["Sarah M.", "James K."],
    budget: 150000,
    spent: 148000,
    tasks: { completed: 18, total: 18 },
    aiPrediction: "Project completed successfully. Client satisfaction score: 9.2/10"
  },
  {
    id: 5,
    name: "Artisan Creative Studio",
    client: "Artisan Creative Co",
    status: "in_progress",
    priority: "medium",
    progress: 40,
    deadline: "2024-07-01",
    team: ["Ahmed R.", "Layla H."],
    budget: 85000,
    spent: 34000,
    tasks: { completed: 8, total: 22 },
    aiPrediction: "Creative concepts approved. Proceed to procurement phase."
  },
];

const statuses: { id: Status; label: string; color: string }[] = [
  { id: "planning", label: "Planning", color: "#3b82f6" },
  { id: "in_progress", label: "In Progress", color: "#f59e0b" },
  { id: "review", label: "Review", color: "#8b5cf6" },
  { id: "completed", label: "Completed", color: "#10b981" },
];

const priorities: { id: Priority; label: string; color: string }[] = [
  { id: "low", label: "Low", color: "#6b7280" },
  { id: "medium", label: "Medium", color: "#3b82f6" },
  { id: "high", label: "High", color: "#f59e0b" },
  { id: "urgent", label: "Urgent", color: "#ef4444" },
];

function StatusBadge({ status }: { status: Status }) {
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

function PriorityBadge({ priority }: { priority: Priority }) {
  const config = priorities.find(p => p.id === priority)!;
  return (
    <span
      className="text-xs font-medium px-2 py-0.5 rounded-full"
      style={{ background: config.color + "20", color: config.color }}
    >
      {config.label}
    </span>
  );
}

export function ProjectManagement() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all");

  const filteredProjects = filterStatus === "all" 
    ? projects 
    : projects.filter(p => p.status === filterStatus);

  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);
  const activeProjects = projects.filter(p => p.status !== "completed").length;

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-full" style={{ background: "#faf9f6" }}>
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <FolderKanban className="w-5 h-5" style={{ color: "#c9a84c" }} />
          <span className="text-sm font-medium" style={{ color: "#c9a84c" }}>AI Project Management</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1a1a2e", fontSize: "1.5rem sm:fontSize: 1.75rem" }}>
          Project Portfolio
        </h1>
        <p className="text-sm mt-1" style={{ color: "#717182" }}>
          Track all design projects with AI-powered predictions and insights
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {[
          { icon: FolderKanban, label: "Active Projects", value: activeProjects.toString(), sub: "In progress" },
          { icon: Target, label: "Total Budget", value: `INR ${(totalBudget / 1000).toFixed(0)}K`, sub: "Allocated" },
          { icon: TrendingUp, label: "Spent to Date", value: `INR ${(totalSpent / 1000).toFixed(0)}K`, sub: `${((totalSpent / totalBudget) * 100).toFixed(0)}% utilized` },
          { icon: Users, label: "Team Members", value: "12", sub: "Across projects" },
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

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            filterStatus === "all" ? "text-white" : ""
          }`}
          style={filterStatus === "all" ? { background: "#1a1a2e" } : { background: "#fff", color: "#717182" }}
        >
          All Projects
        </button>
        {statuses.map((status) => (
          <button
            key={status.id}
            onClick={() => setFilterStatus(status.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterStatus === status.id ? "text-white" : ""
            }`}
            style={filterStatus === status.id ? { background: status.color } : { background: "#fff", color: "#717182" }}
          >
            {status.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-sm" style={{ color: "#1a1a2e" }}>{project.name}</h3>
                <p className="text-xs mt-0.5" style={{ color: "#717182" }}>{project.client}</p>
              </div>
              <PriorityBadge priority={project.priority} />
            </div>

            <div className="flex items-center gap-2 mb-3">
              <StatusBadge status={project.status} />
              <span className="text-xs" style={{ color: "#a0a0b0" }}>•</span>
              <div className="flex items-center gap-1 text-xs" style={{ color: "#717182" }}>
                <Calendar className="w-3 h-3" />
                {new Date(project.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs" style={{ color: "#717182" }}>Progress</span>
                <span className="text-xs font-medium" style={{ color: "#1a1a2e" }}>{project.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#e9ebef" }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${project.progress}%`, background: "#c9a84c" }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1" style={{ color: "#717182" }}>
                <CheckCircle className="w-3 h-3" />
                {project.tasks.completed}/{project.tasks.total} tasks
              </div>
              <div className="flex items-center gap-1" style={{ color: "#717182" }}>
                <Users className="w-3 h-3" />
                {project.team.length} members
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(26,26,46,0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
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
                <div className="flex items-center gap-2">
                  <StatusBadge status={selectedProject.status} />
                  <PriorityBadge priority={selectedProject.priority} />
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4">
              {/* AI Insight */}
              <div className="rounded-xl p-4" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4" style={{ color: "#c9a84c" }} />
                  <span className="text-xs font-medium" style={{ color: "#c9a84c" }}>AI Prediction</span>
                </div>
                <p className="text-sm" style={{ color: "#1a1a2e" }}>{selectedProject.aiPrediction}</p>
              </div>

              {/* Budget & Timeline */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl p-4" style={{ background: "#faf9f6" }}>
                  <div className="text-xs mb-1" style={{ color: "#717182" }}>Budget Utilization</div>
                  <div className="font-semibold text-lg" style={{ color: "#1a1a2e" }}>
                    INR {selectedProject.spent.toLocaleString()} / {selectedProject.budget.toLocaleString()}
                  </div>
                  <div className="text-xs mt-1" style={{ color: selectedProject.spent > selectedProject.budget ? "#ef4444" : "#10b981" }}>
                    {((selectedProject.spent / selectedProject.budget) * 100).toFixed(0)}% spent
                  </div>
                </div>
                <div className="rounded-xl p-4" style={{ background: "#faf9f6" }}>
                  <div className="text-xs mb-1" style={{ color: "#717182" }}>Deadline</div>
                  <div className="font-semibold text-lg" style={{ color: "#1a1a2e" }}>
                    {new Date(selectedProject.deadline).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#717182" }}>
                    {Math.ceil((new Date(selectedProject.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days remaining
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="rounded-xl p-4" style={{ background: "#faf9f6" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium" style={{ color: "#1a1a2e" }}>Overall Progress</span>
                  <span className="text-xs font-semibold" style={{ color: "#c9a84c" }}>{selectedProject.progress}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: "#e9ebef" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${selectedProject.progress}%`, background: "#c9a84c" }}
                  />
                </div>
                <div className="flex items-center gap-2 text-xs" style={{ color: "#717182" }}>
                  <CheckCircle className="w-3 h-3" />
                  {selectedProject.tasks.completed} of {selectedProject.tasks.total} tasks completed
                </div>
              </div>

              {/* Team */}
              <div className="rounded-xl p-4" style={{ background: "#faf9f6" }}>
                <div className="text-xs font-medium mb-3" style={{ color: "#1a1a2e" }}>Project Team</div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.team.map((member) => (
                    <span
                      key={member}
                      className="px-3 py-1.5 rounded-lg text-xs"
                      style={{ background: "#fff", color: "#1a1a2e", border: "1px solid #e9ebef" }}
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white"
                  style={{ background: "#1a1a2e" }}
                  onClick={() => showNotification("success", "Task added successfully!")}
                >
                  <Plus className="w-4 h-4" /> Add Task
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border"
                  style={{ borderColor: "#e9ebef", color: "#1a1a2e" }}
                  onClick={() => showNotification("info", "Meeting scheduled for tomorrow at 10:00 AM")}
                >
                  <Calendar className="w-4 h-4" /> Schedule Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
