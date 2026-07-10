import { useState } from "react";
import { FileText, DollarSign, Clock, CheckCircle, AlertCircle, Download, Send, Plus, Search, Filter, Sparkles, TrendingUp, CreditCard } from "lucide-react";
import { showNotification } from "./NotificationSystem";

interface Invoice {
  id: number;
  invoiceNumber: string;
  client: string;
  project: string;
  amount: number;
  status: "draft" | "sent" | "paid" | "overdue";
  dueDate: string;
  issuedDate: string;
  items: { description: string; quantity: number; price: number }[];
}

const invoices: Invoice[] = [
  {
    id: 1,
    invoiceNumber: "INV-2024-001",
    client: "NovaTech Solutions",
    project: "NovaTech HQ Renovation",
    amount: 185000,
    status: "paid",
    dueDate: "2024-05-30",
    issuedDate: "2024-05-15",
    items: [
      { description: "Design Services - Phase 1", quantity: 1, price: 85000 },
      { description: "3D Visualization", quantity: 1, price: 35000 },
      { description: "Project Management", quantity: 1, price: 65000 },
    ]
  },
  {
    id: 2,
    invoiceNumber: "INV-2024-002",
    client: "Emirates Capital Group",
    project: "Executive Suite Design",
    amount: 420000,
    status: "sent",
    dueDate: "2024-06-20",
    issuedDate: "2024-06-05",
    items: [
      { description: "Executive Suite Design Package", quantity: 1, price: 280000 },
      { description: "Furniture Procurement", quantity: 1, price: 140000 },
    ]
  },
  {
    id: 3,
    invoiceNumber: "INV-2024-003",
    client: "HealthCore Clinics",
    project: "Clinic Design Phase 1",
    amount: 145000,
    status: "draft",
    dueDate: "2024-07-15",
    issuedDate: "2024-06-10",
    items: [
      { description: "Concept Design", quantity: 1, price: 75000 },
      { description: "Space Planning", quantity: 1, price: 70000 },
    ]
  },
  {
    id: 4,
    invoiceNumber: "INV-2024-004",
    client: "Pinnacle Law LLP",
    project: "Office Design",
    amount: 75000,
    status: "overdue",
    dueDate: "2024-05-25",
    issuedDate: "2024-05-10",
    items: [
      { description: "Design Consultation", quantity: 1, price: 75000 },
    ]
  },
];

const statuses: { id: Invoice["status"]; label: string; color: string }[] = [
  { id: "draft", label: "Draft", color: "#6b7280" },
  { id: "sent", label: "Sent", color: "#3b82f6" },
  { id: "paid", label: "Paid", color: "#10b981" },
  { id: "overdue", label: "Overdue", color: "#ef4444" },
];

function StatusBadge({ status }: { status: Invoice["status"] }) {
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

export function BillingInvoicing() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [filterStatus, setFilterStatus] = useState<Invoice["status"] | "all">("all");

  const filteredInvoices = filterStatus === "all" 
    ? invoices 
    : invoices.filter(i => i.status === filterStatus);

  const totalRevenue = invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const pendingAmount = invoices.filter(i => i.status === "sent" || i.status === "overdue").reduce((s, i) => s + i.amount, 0);
  const overdueAmount = invoices.filter(i => i.status === "overdue").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-full" style={{ background: "#faf9f6" }}>
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5" style={{ color: "#c9a84c" }} />
          <span className="text-sm font-medium" style={{ color: "#c9a84c" }}>Billing & Invoicing</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1a1a2e", fontSize: "1.5rem sm:text-1.75rem" }}>
          Invoice Management
        </h1>
        <p className="text-sm mt-1" style={{ color: "#717182" }}>
          Create, send, and track invoices with automated payment reminders
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {[
          { icon: DollarSign, label: "Total Revenue", value: `INR ${(totalRevenue / 1000).toFixed(0)}K`, sub: "This month" },
          { icon: Clock, label: "Pending", value: `INR ${(pendingAmount / 1000).toFixed(0)}K`, sub: "Awaiting payment" },
          { icon: AlertCircle, label: "Overdue", value: `INR ${(overdueAmount / 1000).toFixed(0)}K`, sub: "Action required" },
          { icon: FileText, label: "Total Invoices", value: invoices.length.toString(), sub: "All time" },
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg" style={{ background: "#fff" }}>
            <Filter className="w-4 h-4" style={{ color: "#717182" }} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as Invoice["status"] | "all")}
              className="text-xs bg-transparent border-none outline-none cursor-pointer"
              style={{ color: "#1a1a2e" }}
            >
              <option value="all">All Status</option>
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>{status.label}</option>
              ))}
            </select>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium" style={{ background: "#c9a84c", color: "#fff" }} onClick={() => showNotification("success", "New invoice created successfully!")}>
          <Plus className="w-4 h-4" /> Create Invoice
        </button>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "#faf9f6" }}>
                {["Invoice", "Client", "Project", "Amount", "Status", "Due Date", "Actions"].map((header) => (
                  <th key={header} className="text-left text-xs font-medium px-3 sm:px-5 py-3" style={{ color: "#717182" }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-t hover:bg-gray-50 cursor-pointer" style={{ borderColor: "#e9ebef" }} onClick={() => setSelectedInvoice(invoice)}>
                  <td className="px-3 sm:px-5 py-3 sm:py-4">
                    <div className="text-sm font-medium" style={{ color: "#1a1a2e" }}>{invoice.invoiceNumber}</div>
                    <div className="text-xs" style={{ color: "#717182" }}>{new Date(invoice.issuedDate).toLocaleDateString()}</div>
                  </td>
                  <td className="px-3 sm:px-5 py-3 sm:py-4">
                    <div className="text-sm" style={{ color: "#1a1a2e" }}>{invoice.client}</div>
                  </td>
                  <td className="px-3 sm:px-5 py-3 sm:py-4">
                    <div className="text-sm" style={{ color: "#717182" }}>{invoice.project}</div>
                  </td>
                  <td className="px-3 sm:px-5 py-3 sm:py-4">
                    <div className="text-sm font-semibold" style={{ color: "#1a1a2e" }}>INR {invoice.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-3 sm:px-5 py-3 sm:py-4">
                    <StatusBadge status={invoice.status} />
                  </td>
                  <td className="px-3 sm:px-5 py-3 sm:py-4">
                    <div className="text-sm" style={{ color: invoice.status === "overdue" ? "#ef4444" : "#717182" }}>
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-3 sm:px-5 py-3 sm:py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" style={{ color: "#717182" }} />
                      </button>
                      {invoice.status === "draft" && (
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          title="Send"
                        >
                          <Send className="w-4 h-4" style={{ color: "#717182" }} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(26,26,46,0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setSelectedInvoice(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-5" style={{ background: "#1a1a2e" }}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-white font-semibold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {selectedInvoice.invoiceNumber}
                  </div>
                  <div className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>{selectedInvoice.project}</div>
                </div>
                <StatusBadge status={selectedInvoice.status} />
              </div>
            </div>

            <div className="p-4 sm:p-5 space-y-4">
              {/* Client Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl p-3 sm:p-4" style={{ background: "#faf9f6" }}>
                  <div className="text-xs mb-1" style={{ color: "#717182" }}>Bill To</div>
                  <div className="text-sm font-medium" style={{ color: "#1a1a2e" }}>{selectedInvoice.client}</div>
                </div>
                <div className="rounded-xl p-3 sm:p-4" style={{ background: "#faf9f6" }}>
                  <div className="text-xs mb-1" style={{ color: "#717182" }}>Invoice Date</div>
                  <div className="text-sm font-medium" style={{ color: "#1a1a2e" }}>
                    {new Date(selectedInvoice.issuedDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </div>
                </div>
              </div>

              {/* Line Items */}
              <div className="rounded-xl p-3 sm:p-4" style={{ background: "#faf9f6" }}>
                <div className="text-xs font-medium mb-3" style={{ color: "#1a1a2e" }}>Invoice Items</div>
                <div className="space-y-2">
                  {selectedInvoice.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b" style={{ borderColor: "#e9ebef" }}>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate" style={{ color: "#1a1a2e" }}>{item.description}</div>
                        <div className="text-xs" style={{ color: "#717182" }}>Qty: {item.quantity}</div>
                      </div>
                      <div className="text-sm font-semibold flex-shrink-0" style={{ color: "#1a1a2e" }}>
                        INR {item.price.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="rounded-xl p-3 sm:p-4 flex items-center justify-between" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>
                <div className="text-sm font-medium" style={{ color: "#1a1a2e" }}>Total Amount</div>
                <div className="text-xl sm:text-2xl font-bold" style={{ color: "#c9a84c" }}>
                  INR {selectedInvoice.amount.toLocaleString()}
                </div>
              </div>

              {/* Due Date */}
              <div className="rounded-xl p-3 sm:p-4" style={{ background: "#faf9f6" }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" style={{ color: "#717182" }} />
                    <span className="text-sm" style={{ color: "#717182" }}>Due Date</span>
                  </div>
                  <div className="text-sm font-medium" style={{ color: selectedInvoice.status === "overdue" ? "#ef4444" : "#1a1a2e" }}>
                    {new Date(selectedInvoice.dueDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: "#1a1a2e" }}>
                  <Download className="w-4 h-4" /> Download PDF
                </button>
                {selectedInvoice.status === "draft" && (
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: "#c9a84c" }}>
                    <Send className="w-4 h-4" /> Send Invoice
                  </button>
                )}
                {selectedInvoice.status === "sent" && (
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border" style={{ borderColor: "#e9ebef", color: "#1a1a2e" }}>
                    <CreditCard className="w-4 h-4" /> Record Payment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Insight */}
      <div className="mt-6 rounded-xl p-4" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4" style={{ color: "#c9a84c" }} />
          <span className="text-xs font-medium" style={{ color: "#c9a84c" }}>AI Billing Insight</span>
        </div>
        <p className="text-sm" style={{ color: "#1a1a2e" }}>
          Pinnacle Law invoice is overdue by 17 days. AI predicts 78% likelihood of payment within 7 days if a reminder is sent today.
        </p>
      </div>
    </div>
  );
}
