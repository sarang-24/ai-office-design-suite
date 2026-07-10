import { Package, AlertTriangle, TrendingUp, RotateCcw, Wrench, CheckCircle2 } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, ResponsiveContainer,
} from "recharts";

const demandForecast = [
  { month: "Jan", demand: 42, rentals: 38 },
  { month: "Feb", demand: 51, rentals: 45 },
  { month: "Mar", demand: 60, rentals: 56 },
  { month: "Apr", demand: 55, rentals: 52 },
  { month: "May", demand: 70, rentals: 65 },
  { month: "Jun", demand: 78, rentals: 74 },
  { month: "Jul", demand: 65, rentals: 60 },
  { month: "Aug", demand: 82, rentals: 79 },
  { month: "Sep", demand: 90, rentals: 85 },
  { month: "Oct", demand: 95, rentals: 88 },
  { month: "Nov", demand: 88, rentals: 83 },
  { month: "Dec", demand: 72, rentals: 70 },
];

const categoryData = [
  { cat: "Desks", available: 42, rented: 118, maintenance: 5 },
  { cat: "Chairs", available: 87, rented: 210, maintenance: 12 },
  { cat: "Tables", available: 15, rented: 38, maintenance: 3 },
  { cat: "Storage", available: 28, rented: 76, maintenance: 8 },
  { cat: "Lounge", available: 19, rented: 45, maintenance: 6 },
];

const inventoryItems = [
  { id: 1, name: "Executive L-Desk", category: "Workstations", total: 60, rented: 54, maintenance: 3, available: 3, alert: true },
  { id: 2, name: "Ergonomic Mesh Chair", category: "Chairs", total: 150, rented: 120, maintenance: 8, available: 22, alert: false },
  { id: 3, name: "Height-Adjust Desk", category: "Workstations", total: 80, rented: 62, maintenance: 5, available: 13, alert: false },
  { id: 4, name: "Executive Leather Chair", category: "Chairs", total: 45, rented: 43, maintenance: 2, available: 0, alert: true },
  { id: 5, name: "Conference Table (16-seat)", category: "Tables", total: 20, rented: 17, maintenance: 1, available: 2, alert: true },
  { id: 6, name: "Modular Storage Unit", category: "Storage", total: 70, rented: 52, maintenance: 4, available: 14, alert: false },
  { id: 7, name: "3-Seat Reception Sofa", category: "Lounge", total: 30, rented: 25, maintenance: 2, available: 3, alert: true },
  { id: 8, name: "Reception Desk", category: "Tables", total: 18, rented: 14, maintenance: 1, available: 3, alert: true },
  { id: 9, name: "Collaborative Bench Desk", category: "Workstations", total: 40, rented: 28, maintenance: 2, available: 10, alert: false },
  { id: 10, name: "Lounge Armchair", category: "Lounge", total: 55, rented: 45, maintenance: 3, available: 7, alert: false },
];

function StatusBar({ available, rented, total }: { available: number; rented: number; total: number }) {
  const rentedPct = (rented / total) * 100;
  const availPct = (available / total) * 100;
  return (
    <div className="flex h-2 rounded-full overflow-hidden gap-0.5" style={{ width: "120px" }}>
      <div className="rounded-l-full" style={{ width: `${rentedPct}%`, background: "#3b82f6" }} />
      <div style={{ width: `${availPct}%`, background: "#10b981" }} />
      <div className="rounded-r-full flex-1" style={{ background: "#ef444430" }} />
    </div>
  );
}

export function InventoryManager() {
  const totalItems = inventoryItems.reduce((s, i) => s + i.total, 0);
  const totalRented = inventoryItems.reduce((s, i) => s + i.rented, 0);
  const totalMaintenance = inventoryItems.reduce((s, i) => s + i.maintenance, 0);
  const totalAvailable = inventoryItems.reduce((s, i) => s + i.available, 0);
  const alerts = inventoryItems.filter((i) => i.alert).length;

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-full" style={{ background: "#faf9f6" }}>
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Package className="w-5 h-5" style={{ color: "#c9a84c" }} />
          <span className="text-sm font-medium" style={{ color: "#c9a84c" }}>AI Inventory Management</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1a1a2e", fontSize: "1.5rem sm:text-1.75rem" }}>
          Predictive Inventory Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "#717182" }}>
          AI forecasts demand, tracks rentals, and prevents stock shortages before they happen
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {[
          { icon: Package, label: "Total Stock", value: totalItems, color: "#1a1a2e", sub: "All items" },
          { icon: RotateCcw, label: "Rented Out", value: totalRented, color: "#3b82f6", sub: `${Math.round(totalRented / totalItems * 100)}% utilization` },
          { icon: CheckCircle2, label: "Available", value: totalAvailable, color: "#10b981", sub: "Ready to deploy" },
          { icon: Wrench, label: "Maintenance", value: totalMaintenance, color: "#f59e0b", sub: "Being serviced" },
          { icon: AlertTriangle, label: "Low Stock", value: alerts, color: "#ef4444", sub: "Need restocking" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <s.icon className="w-4 h-4" style={{ color: s.color }} />
              <span className="text-xs" style={{ color: "#717182" }}>{s.label}</span>
            </div>
            <div className="font-semibold text-xl sm:text-2xl" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs mt-0.5" style={{ color: "#a0a0b0" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div>
              <div className="text-xs sm:text-sm font-medium" style={{ color: "#1a1a2e" }}>Demand Forecast vs Actual Rentals</div>
              <div className="text-xs mt-0.5" style={{ color: "#717182" }}>AI-projected demand for the year</div>
            </div>
            <TrendingUp className="w-4 h-4" style={{ color: "#c9a84c" }} />
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={demandForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#717182" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#717182" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                labelStyle={{ color: "#1a1a2e", fontWeight: 600 }}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Line type="monotone" dataKey="demand" stroke="#c9a84c" strokeWidth={2} dot={false} name="AI Forecast" strokeDasharray="5 3" />
              <Line type="monotone" dataKey="rentals" stroke="#3b82f6" strokeWidth={2} dot={false} name="Actual Rentals" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div>
              <div className="text-xs sm:text-sm font-medium" style={{ color: "#1a1a2e" }}>Stock by Category</div>
              <div className="text-xs mt-0.5" style={{ color: "#717182" }}>Available vs rented vs maintenance</div>
            </div>
            <Package className="w-4 h-4" style={{ color: "#c9a84c" }} />
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={categoryData} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="cat" tick={{ fontSize: 11, fill: "#717182" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#717182" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                labelStyle={{ color: "#1a1a2e", fontWeight: 600 }}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Bar dataKey="rented" name="Rented" fill="#3b82f6" radius={[3, 3, 0, 0]} />
              <Bar dataKey="available" name="Available" fill="#10b981" radius={[3, 3, 0, 0]} />
              <Bar dataKey="maintenance" name="Maintenance" fill="#f59e0b" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts */}
      {alerts > 0 && (
        <div
          className="rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 flex items-start gap-3"
          style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}
        >
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#ef4444" }} />
          <div>
            <div className="text-xs sm:text-sm font-medium" style={{ color: "#ef4444" }}>{alerts} items at low stock levels</div>
            <div className="text-xs mt-0.5" style={{ color: "#717182" }}>
              AI recommends restocking: Executive Leather Chair, Conference Table (16-seat), Executive L-Desk. Expected demand spike in Q4.
            </div>
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b" style={{ borderColor: "#f0f0f0" }}>
          <div className="text-xs sm:text-sm font-medium" style={{ color: "#1a1a2e" }}>Full Inventory List</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr style={{ background: "#faf9f6" }}>
                {["Item", "Category", "Total", "Rented", "Available", "Maintenance", "Utilization", "Status"].map((h) => (
                  <th key={h} className="text-left px-3 sm:px-4 py-2 sm:py-3 text-xs font-medium" style={{ color: "#717182" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item) => {
                const utilPct = Math.round((item.rented / item.total) * 100);
                return (
                  <tr key={item.id} className="border-t hover:bg-gray-50 transition-colors" style={{ borderColor: "#f5f5f7" }}>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 font-medium" style={{ color: "#1a1a2e" }}>
                      <div className="flex items-center gap-2">
                        {item.alert && <AlertTriangle className="w-3 h-3" style={{ color: "#ef4444" }} />}
                        {item.name}
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3" style={{ color: "#717182" }}>{item.category}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 font-medium" style={{ color: "#1a1a2e" }}>{item.total}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3" style={{ color: "#3b82f6" }}>{item.rented}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3" style={{ color: item.available === 0 ? "#ef4444" : "#10b981" }}>
                      {item.available}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3" style={{ color: "#f59e0b" }}>{item.maintenance}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <StatusBar available={item.available} rented={item.rented} total={item.total} />
                      <span className="text-xs mt-1 block" style={{ color: "#717182" }}>{utilPct}%</span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      {item.available === 0 ? (
                        <span className="text-xs px-2 py-1 rounded-full" style={{ background: "#ef444420", color: "#ef4444" }}>Out of Stock</span>
                      ) : item.alert ? (
                        <span className="text-xs px-2 py-1 rounded-full" style={{ background: "#f59e0b20", color: "#f59e0b" }}>Low Stock</span>
                      ) : (
                        <span className="text-xs px-2 py-1 rounded-full" style={{ background: "#10b98120", color: "#10b981" }}>Healthy</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
