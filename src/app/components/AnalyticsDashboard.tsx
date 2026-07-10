import { useState } from "react";
import { BarChart3, TrendingUp, DollarSign, Users, Target, ArrowUpRight, ArrowDownRight, Calendar, Download, Sparkles, PieChart } from "lucide-react";
import { showNotification } from "./NotificationSystem";

interface MetricCard {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: any;
}

const metrics: MetricCard[] = [
  { label: "Total Revenue", value: "INR 1.2M", change: "+18.5%", positive: true, icon: DollarSign },
  { label: "Active Projects", value: "24", change: "+12%", positive: true, icon: Target },
  { label: "New Clients", value: "18", change: "+25%", positive: true, icon: Users },
  { label: "Conversion Rate", value: "32%", change: "-5%", positive: false, icon: TrendingUp },
];

interface RevenueData {
  month: string;
  revenue: number;
  projects: number;
}

const revenueData: RevenueData[] = [
  { month: "Jan", revenue: 85000, projects: 3 },
  { month: "Feb", revenue: 120000, projects: 5 },
  { month: "Mar", revenue: 95000, projects: 4 },
  { month: "Apr", revenue: 145000, projects: 6 },
  { month: "May", revenue: 180000, projects: 7 },
  { month: "Jun", revenue: 220000, projects: 8 },
];

interface TopService {
  name: string;
  revenue: number;
  projects: number;
  growth: number;
}

const topServices: TopService[] = [
  { name: "Executive Suite Design", revenue: 450000, projects: 8, growth: 22 },
  { name: "Open Space Planning", revenue: 320000, projects: 12, growth: 15 },
  { name: "Furniture Procurement", revenue: 280000, projects: 18, growth: 18 },
  { name: "Virtual Tours", revenue: 150000, projects: 6, growth: 35 },
];

interface ClientSegment {
  name: string;
  count: number;
  revenue: number;
  color: string;
}

const clientSegments: ClientSegment[] = [
  { name: "Enterprise", count: 8, revenue: 680000, color: "#c9a84c" },
  { name: "SME", count: 24, revenue: 420000, color: "#1a1a2e" },
  { name: "Startup", count: 15, revenue: 180000, color: "#3b82f6" },
  { name: "Government", count: 3, revenue: 120000, color: "#10b981" },
];

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<"month" | "quarter" | "year">("month");

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-full" style={{ background: "#faf9f6" }}>
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="w-5 h-5" style={{ color: "#c9a84c" }} />
          <span className="text-sm font-medium" style={{ color: "#c9a84c" }}>AI Analytics</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1a1a2e", fontSize: "1.5rem sm:text-1.75rem" }}>
          Business Analytics Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "#717182" }}>
          Real-time insights powered by AI for data-driven decisions
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {(["month", "quarter", "year"] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium capitalize transition-colors ${
              timeRange === range ? "text-white" : ""
            }`}
            style={timeRange === range ? { background: "#1a1a2e" } : { background: "#fff", color: "#717182" }}
          >
            {range}
          </button>
        ))}
        <button className="ml-auto flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium" style={{ background: "#fff", color: "#1a1a2e" }} onClick={() => showNotification("success", "Analytics report exported successfully!")}>
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <metric.icon className="w-4 h-4" style={{ color: "#c9a84c" }} />
              <div className={`flex items-center gap-1 text-xs font-medium ${metric.positive ? "text-green-600" : "text-red-600"}`}>
                {metric.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {metric.change}
              </div>
            </div>
            <div className="font-semibold text-lg" style={{ color: "#1a1a2e" }}>{metric.value}</div>
            <div className="text-xs mt-0.5" style={{ color: "#a0a0b0" }}>{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
          <div>
            <h3 className="font-semibold" style={{ color: "#1a1a2e" }}>Revenue Overview</h3>
            <p className="text-xs mt-0.5" style={{ color: "#717182" }}>Monthly revenue and project count</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: "#c9a84c" }} />
              <span style={{ color: "#717182" }}>Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: "#1a1a2e" }} />
              <span style={{ color: "#717182" }}>Projects</span>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between gap-2 sm:gap-4 h-40 sm:h-48">
          {revenueData.map((data) => {
            const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
            const maxProjects = Math.max(...revenueData.map(d => d.projects));
            const revenueHeight = (data.revenue / maxRevenue) * 100;
            const projectsHeight = (data.projects / maxProjects) * 100;

            return (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center gap-0.5 sm:gap-1 h-28 sm:h-32">
                  <div
                    className="w-3 sm:w-4 rounded-t transition-all hover:opacity-80"
                    style={{ height: `${revenueHeight}%`, background: "#c9a84c" }}
                    title={`Revenue: INR ${data.revenue.toLocaleString()}`}
                  />
                  <div
                    className="w-3 sm:w-4 rounded-t transition-all hover:opacity-80"
                    style={{ height: `${projectsHeight}%`, background: "#1a1a2e" }}
                    title={`Projects: ${data.projects}`}
                  />
                </div>
                <span className="text-xs font-medium" style={{ color: "#717182" }}>{data.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
        {/* Top Services */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-4 h-4" style={{ color: "#c9a84c" }} />
            <h3 className="font-semibold" style={{ color: "#1a1a2e" }}>Top Performing Services</h3>
          </div>
          <div className="space-y-3">
            {topServices.map((service, index) => (
              <div key={service.name} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0" style={{ background: "#1a1a2e" }}>
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium truncate" style={{ color: "#1a1a2e" }}>{service.name}</span>
                    <span className="text-xs font-semibold flex-shrink-0" style={{ color: "#c9a84c" }}>+{service.growth}%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs" style={{ color: "#717182" }}>
                    <span>INR {service.revenue.toLocaleString()}</span>
                    <span>{service.projects} projects</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Segments */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4" style={{ color: "#c9a84c" }} />
            <h3 className="font-semibold" style={{ color: "#1a1a2e" }}>Client Segments</h3>
          </div>
          <div className="space-y-3">
            {clientSegments.map((segment) => {
              const totalRevenue = clientSegments.reduce((s, c) => s + c.revenue, 0);
              const percentage = (segment.revenue / totalRevenue) * 100;

              return (
                <div key={segment.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: segment.color }} />
                      <span className="text-sm font-medium" style={{ color: "#1a1a2e" }}>{segment.name}</span>
                    </div>
                    <span className="text-xs font-semibold" style={{ color: "#c9a84c" }}>{percentage.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden mb-1" style={{ background: "#e9ebef" }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${percentage}%`, background: segment.color }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs" style={{ color: "#717182" }}>
                    <span>{segment.count} clients</span>
                    <span>INR {segment.revenue.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="rounded-xl p-5" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4" style={{ color: "#c9a84c" }} />
          <span className="text-sm font-semibold" style={{ color: "#c9a84c" }}>AI Business Insights</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#c9a84c" }}>
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-xs font-medium mb-0.5" style={{ color: "#1a1a2e" }}>Revenue Trend</div>
              <p className="text-xs" style={{ color: "#717182" }}>18.5% growth expected next quarter based on current pipeline</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#1a1a2e" }}>
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-xs font-medium mb-0.5" style={{ color: "#1a1a2e" }}>Opportunity</div>
              <p className="text-xs" style={{ color: "#717182" }}>Enterprise segment shows 35% higher conversion rate</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#10b981" }}>
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-xs font-medium mb-0.5" style={{ color: "#1a1a2e" }}>Seasonality</div>
              <p className="text-xs" style={{ color: "#717182" }}>Q4 typically sees 40% increase in project inquiries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
