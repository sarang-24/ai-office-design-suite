import { useState } from "react";
import { Users, MessageSquare, FileText, CheckSquare, Calendar, Bell, Plus, Search, Send, Paperclip, Image as ImageIcon, Video, Sparkles } from "lucide-react";
import { showNotification } from "./NotificationSystem";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: "online" | "away" | "offline";
  projects: number;
}

interface Task {
  id: number;
  title: string;
  assignee: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
  status: "todo" | "in_progress" | "done";
  project: string;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  avatar: string;
}

const teamMembers: TeamMember[] = [
  { id: 1, name: "Sarah Mitchell", role: "Lead Designer", avatar: "SM", status: "online", projects: 4 },
  { id: 2, name: "James Kim", role: "Project Manager", avatar: "JK", status: "online", projects: 5 },
  { id: 3, name: "Ahmed Rashid", role: "3D Artist", avatar: "AR", status: "away", projects: 3 },
  { id: 4, name: "Layla Hassan", role: "Interior Designer", avatar: "LH", status: "online", projects: 4 },
  { id: 5, name: "Omar Khalil", role: "Procurement", avatar: "OK", status: "offline", projects: 2 },
  { id: 6, name: "Riya Sharma", role: "Client Relations", avatar: "RS", status: "online", projects: 3 },
];

const tasks: Task[] = [
  { id: 1, title: "Finalize NovaTech floor plans", assignee: "Sarah Mitchell", priority: "high", dueDate: "2024-06-15", status: "in_progress", project: "NovaTech HQ" },
  { id: 2, title: "Source executive furniture", assignee: "Omar Khalil", priority: "high", dueDate: "2024-06-18", status: "todo", project: "Emirates Capital" },
  { id: 3, title: "Create 3D renders", assignee: "Ahmed Rashid", priority: "medium", dueDate: "2024-06-20", status: "in_progress", project: "HealthCore" },
  { id: 4, title: "Client presentation prep", assignee: "Riya Sharma", priority: "high", dueDate: "2024-06-16", status: "todo", project: "Artisan Creative" },
  { id: 5, title: "Review lighting specifications", assignee: "Layla Hassan", priority: "medium", dueDate: "2024-06-22", status: "done", project: "NovaTech HQ" },
];

const messages: Message[] = [
  { id: 1, sender: "James Kim", content: "The client approved the initial concept. We can proceed to detailed design phase.", timestamp: "10:30 AM", avatar: "JK" },
  { id: 2, sender: "Sarah Mitchell", content: "Great! I'll start working on the floor plans by tomorrow morning.", timestamp: "10:32 AM", avatar: "SM" },
  { id: 3, sender: "Ahmed Rashid", content: "I have the 3D models ready for the executive suite. Should I share them?", timestamp: "10:45 AM", avatar: "AR" },
  { id: 4, sender: "Layla Hassan", content: "Yes please! The client wants to see the visualization before our meeting on Thursday.", timestamp: "10:48 AM", avatar: "LH" },
];

export function TeamCollaboration() {
  const [activeTab, setActiveTab] = useState<"tasks" | "chat" | "files">("tasks");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [messageInput, setMessageInput] = useState("");

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-full" style={{ background: "#faf9f6" }}>
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-5 h-5" style={{ color: "#c9a84c" }} />
          <span className="text-sm font-medium" style={{ color: "#c9a84c" }}>Team Collaboration</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1a1a2e", fontSize: "1.5rem sm:text-1.75rem" }}>
          Team Workspace
        </h1>
        <p className="text-sm mt-1" style={{ color: "#717182" }}>
          Collaborate with your team in real-time
        </p>
      </div>

      {/* Team Members */}
      <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold" style={{ color: "#1a1a2e" }}>Team Members</h3>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: "#1a1a2e", color: "#fff" }} onClick={() => showNotification("success", "Invitation sent to team member!")}>
            <Plus className="w-3 h-3" /> Invite Member
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="text-center">
              <div className="relative inline-block mb-2">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold text-white mx-auto"
                  style={{ background: "#1a1a2e" }}
                >
                  {member.avatar}
                </div>
                <span
                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-white ${
                    member.status === "online" ? "bg-green-500" : member.status === "away" ? "bg-yellow-500" : "bg-gray-400"
                  }`}
                />
              </div>
              <div className="text-xs font-medium truncate" style={{ color: "#1a1a2e" }}>{member.name}</div>
              <div className="text-xs truncate" style={{ color: "#717182" }}>{member.role}</div>
              <div className="text-xs mt-0.5" style={{ color: "#c9a84c" }}>{member.projects} projects</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: "tasks" as const, label: "Tasks", icon: CheckSquare },
          { id: "chat" as const, label: "Team Chat", icon: MessageSquare },
          { id: "files" as const, label: "Files", icon: FileText },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id ? "text-white" : ""
            }`}
            style={activeTab === tab.id ? { background: "#1a1a2e" } : { background: "#fff", color: "#717182" }}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Tasks Tab */}
      {activeTab === "tasks" && (
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold" style={{ color: "#1a1a2e" }}>Active Tasks</h3>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: "#c9a84c", color: "#fff" }}>
              <Plus className="w-3 h-3" /> New Task
            </button>
          </div>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer"
                style={{ borderColor: task.status === "done" ? "#10b981" : task.priority === "high" ? "#ef4444" : "#e9ebef" }}
                onClick={() => setSelectedTask(task)}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    task.status === "done" ? "bg-green-500" : "border-2"
                  }`}
                  style={task.status !== "done" ? { borderColor: task.priority === "high" ? "#ef4444" : "#d1d5db" } : {}}
                >
                  {task.status === "done" && <CheckSquare className="w-3 h-3 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-sm font-medium ${task.status === "done" ? "line-through" : ""}`} style={{ color: "#1a1a2e" }}>
                      {task.title}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        background: task.priority === "high" ? "#ef444420" : task.priority === "medium" ? "#f59e0b20" : "#6b728020",
                        color: task.priority === "high" ? "#ef4444" : task.priority === "medium" ? "#f59e0b" : "#6b7280"
                      }}
                    >
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs flex-wrap" style={{ color: "#717182" }}>
                    <span>👤 {task.assignee}</span>
                    <span>📁 {task.project}</span>
                    <span>📅 {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-xs px-2 py-1 rounded-lg flex-shrink-0" style={{ background: "#faf9f6", color: "#717182" }}>
                  {task.status === "done" ? "Done" : task.status === "in_progress" ? "In Progress" : "Todo"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Tab */}
      {activeTab === "chat" && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-3 sm:p-4 border-b" style={{ borderColor: "#e9ebef" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold text-white" style={{ background: "#1a1a2e" }}>
                  TM
                </div>
                <div>
                  <h3 className="font-semibold text-sm" style={{ color: "#1a1a2e" }}>Team Channel</h3>
                  <p className="text-xs" style={{ color: "#717182" }}>6 members online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg" style={{ background: "#faf9f6" }}>
                  <Video className="w-4 h-4" style={{ color: "#717182" }} />
                </button>
                <button className="p-2 rounded-lg" style={{ background: "#faf9f6" }}>
                  <Bell className="w-4 h-4" style={{ color: "#717182" }} />
                </button>
              </div>
            </div>
          </div>

          <div className="h-64 sm:h-96 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
                  style={{ background: "#1a1a2e" }}
                >
                  {message.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm font-medium" style={{ color: "#1a1a2e" }}>{message.sender}</span>
                    <span className="text-xs" style={{ color: "#a0a0b0" }}>{message.timestamp}</span>
                  </div>
                  <div className="p-2 sm:p-3 rounded-xl text-sm" style={{ background: "#faf9f6", color: "#1a1a2e" }}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t" style={{ borderColor: "#e9ebef" }}>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg" style={{ background: "#faf9f6" }}>
                <Paperclip className="w-4 h-4" style={{ color: "#717182" }} />
              </button>
              <button className="p-2 rounded-lg" style={{ background: "#faf9f6" }}>
                <ImageIcon className="w-4 h-4" style={{ color: "#717182" }} />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg text-sm border"
                style={{ borderColor: "#e9ebef", background: "#faf9f6", color: "#1a1a2e" }}
              />
              <button className="p-2 rounded-lg" style={{ background: "#c9a84c" }}>
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Files Tab */}
      {activeTab === "files" && (
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold" style={{ color: "#1a1a2e" }}>Shared Files</h3>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: "#c9a84c", color: "#fff" }}>
              <Plus className="w-3 h-3" /> Upload File
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "NovaTech Floor Plans v2.pdf", size: "2.4 MB", updated: "2 hours ago", type: "pdf" },
              { name: "Executive Suite 3D Renders.zip", size: "45.8 MB", updated: "1 day ago", type: "zip" },
              { name: "Furniture Catalog 2024.xlsx", size: "1.2 MB", updated: "3 days ago", type: "excel" },
              { name: "Client Presentation.pptx", size: "8.5 MB", updated: "5 days ago", type: "ppt" },
              { name: "Material Samples.jpg", size: "3.1 MB", updated: "1 week ago", type: "image" },
              { name: "Project Timeline.xlsx", size: "890 KB", updated: "1 week ago", type: "excel" },
            ].map((file) => (
              <div key={file.name} className="p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer" style={{ borderColor: "#e9ebef" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "#faf9f6" }}>
                    <FileText className="w-5 h-5" style={{ color: "#c9a84c" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate" style={{ color: "#1a1a2e" }}>{file.name}</div>
                    <div className="text-xs" style={{ color: "#717182" }}>{file.size}</div>
                  </div>
                </div>
                <div className="text-xs" style={{ color: "#a0a0b0" }}>Updated {file.updated}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Suggestion */}
      <div className="mt-6 rounded-xl p-4" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4" style={{ color: "#c9a84c" }} />
          <span className="text-xs font-medium" style={{ color: "#c9a84c" }}>AI Team Insight</span>
        </div>
        <p className="text-sm" style={{ color: "#1a1a2e" }}>
          Team workload is balanced. Sarah has capacity for 1 more project. Consider assigning the new HealthCore phase 2 to her.
        </p>
      </div>
    </div>
  );
}
