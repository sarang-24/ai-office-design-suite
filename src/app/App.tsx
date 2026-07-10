import { useState, useEffect } from "react";
import {
  LayoutDashboard, Wand2, Layers, Sofa, FileText,
  Play, ImageIcon, Users, Package, Menu, Building2, Sparkles,
  FolderKanban, BarChart3, MessageSquare, Calendar, CreditCard, LogOut,
} from "lucide-react";
import { HeroSection } from "./components/HeroSection";
import { DesignVisualizer } from "./components/DesignVisualizer";
import { SpacePlanning } from "./components/SpacePlanning";
import { FurnitureRecommender } from "./components/FurnitureRecommender";
import { QuotationGenerator } from "./components/QuotationGenerator";
import { VirtualTour } from "./components/VirtualTour";
import { Portfolio } from "./components/Portfolio";
import { CRMDashboard } from "./components/CRMDashboard";
import { InventoryManager } from "./components/InventoryManager";
import { ChatbotWidget } from "./components/ChatbotWidget";
import { ProjectManagement } from "./components/ProjectManagement";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { TeamCollaboration } from "./components/TeamCollaboration";
import { ClientPortal } from "./components/ClientPortal";
import { SchedulingCalendar } from "./components/SchedulingCalendar";
import { BillingInvoicing } from "./components/BillingInvoicing";
import { LockScreen } from "./components/LockScreen";
import { NotificationContainer } from "./components/NotificationSystem";

export type Tab = "home" | "design" | "planning" | "furniture" | "quote" | "tour" | "portfolio" | "crm" | "inventory" | "projects" | "analytics" | "team" | "clients" | "calendar" | "billing";

const navItems: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "home", label: "Overview", icon: LayoutDashboard },
  { id: "design", label: "AI Design", icon: Wand2 },
  { id: "planning", label: "Space Planning", icon: Layers },
  { id: "furniture", label: "Furniture AI", icon: Sofa },
  { id: "quote", label: "Quotation", icon: FileText },
  { id: "tour", label: "Virtual Tour", icon: Play },
  { id: "portfolio", label: "Portfolio", icon: ImageIcon },
  { id: "crm", label: "CRM & Leads", icon: Users },
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "team", label: "Team", icon: MessageSquare },
  { id: "clients", label: "Clients", icon: Building2 },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export default function App() {
  const [isLocked, setIsLocked] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if already unlocked in session
  useEffect(() => {
    const unlocked = sessionStorage.getItem("officeai_unlocked");
    if (unlocked === "true") {
      setIsLocked(false);
    }
  }, []);

  const handleUnlock = () => {
    sessionStorage.setItem("officeai_unlocked", "true");
    setIsLocked(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("officeai_unlocked");
    setIsLocked(true);
  };

  if (isLocked) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return (
    <div className="h-screen flex overflow-hidden bg-cream">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`${collapsed ? "w-16" : "w-64"} ${mobileMenuOpen ? "fixed inset-y-0 left-0 z-50" : "relative"} lg:relative transition-all duration-300 flex flex-col flex-shrink-0 shadow-2xl lg:translate-x-0 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{ background: "#1a1a2e" }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-white/10 gap-3">
          {!collapsed && (
            <>
              <Building2 className="w-7 h-7 flex-shrink-0" style={{ color: "#c9a84c" }} />
              <div className="min-w-0">
                <div className="text-white font-semibold text-sm leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  OfficeAI Pro
                </div>
                <div className="text-xs leading-tight" style={{ color: "#c9a84c" }}>
                  Luxury Workspace
                </div>
              </div>
            </>
          )}
          {collapsed && <Building2 className="w-6 h-6 mx-auto" style={{ color: "#c9a84c" }} />}
          <button
            onClick={() => {
              setCollapsed(!collapsed);
              if (window.innerWidth < 1024) setMobileMenuOpen(false);
            }}
            className="ml-auto text-white/40 hover:text-white/80 transition-colors"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 overflow-y-auto space-y-0.5">
          {navItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 1024) setMobileMenuOpen(false);
                }}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150 border-r-2 ${
                  active ? "text-white" : "text-white/45 hover:text-white/75 border-transparent"
                }`}
                style={active ? { background: "rgba(201,168,76,0.12)", borderColor: "#c9a84c" } : {}}
              >
                <item.icon
                  className="w-4 h-4 flex-shrink-0"
                  style={active ? { color: "#c9a84c" } : {}}
                />
                {!collapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Status */}
        {!collapsed && (
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "#c9a84c" }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-white text-xs font-medium">AI Active</div>
                <div className="text-xs" style={{ color: "#c9a84c80" }}>All systems ready</div>
              </div>
              <div className="ml-auto">
                <span className="w-2 h-2 rounded-full bg-green-400 block animate-pulse" />
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-all hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        )}
      </aside>

      <main className="flex-1 overflow-auto relative">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-3 p-4 border-b" style={{ background: "#faf9f6", borderColor: "rgba(0,0,0,0.08)" }}>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg"
            style={{ background: "#1a1a2e" }}
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6" style={{ color: "#c9a84c" }} />
            <span className="font-semibold text-sm" style={{ color: "#1a1a2e", fontFamily: "'Playfair Display', Georgia, serif" }}>
              OfficeAI Pro
            </span>
          </div>
        </div>

        {activeTab === "home" && <HeroSection onNavigate={setActiveTab} />}
        {activeTab === "design" && <DesignVisualizer />}
        {activeTab === "planning" && <SpacePlanning />}
        {activeTab === "furniture" && <FurnitureRecommender />}
        {activeTab === "quote" && <QuotationGenerator />}
        {activeTab === "tour" && <VirtualTour />}
        {activeTab === "portfolio" && <Portfolio />}
        {activeTab === "crm" && <CRMDashboard />}
        {activeTab === "inventory" && <InventoryManager />}
        {activeTab === "projects" && <ProjectManagement />}
        {activeTab === "analytics" && <AnalyticsDashboard />}
        {activeTab === "team" && <TeamCollaboration />}
        {activeTab === "clients" && <ClientPortal />}
        {activeTab === "calendar" && <SchedulingCalendar />}
        {activeTab === "billing" && <BillingInvoicing />}
      </main>

      <ChatbotWidget />
      <NotificationContainer />
    </div>
  );
}
