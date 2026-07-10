import { useState } from "react";
import { Calendar, Clock, MapPin, Users, Plus, ChevronLeft, ChevronRight, Video, Phone, Building2, Sparkles, Filter } from "lucide-react";
import { showNotification } from "./NotificationSystem";

interface Event {
  id: number;
  title: string;
  type: "meeting" | "site_visit" | "call" | "deadline";
  date: string;
  time: string;
  duration: string;
  client: string;
  location: string;
  attendees: string[];
  description: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "NovaTech Design Review",
    type: "meeting",
    date: "2024-06-15",
    time: "10:00",
    duration: "1h",
    client: "NovaTech Solutions",
    location: "Office - Conference Room A",
    attendees: ["Sarah M.", "James K.", "Khalid M."],
    description: "Review final floor plans and get client approval"
  },
  {
    id: 2,
    title: "Emirates Capital Site Visit",
    type: "site_visit",
    date: "2024-06-15",
    time: "14:00",
    duration: "2h",
    client: "Emirates Capital Group",
    location: "Client Site - Downtown Dubai",
    attendees: ["Layla H.", "Omar K.", "Fatima A."],
    description: "Measure space and assess installation requirements"
  },
  {
    id: 3,
    title: "HealthCore Consultation Call",
    type: "call",
    date: "2024-06-16",
    time: "11:00",
    duration: "45m",
    client: "HealthCore Clinics",
    location: "Virtual - Zoom",
    attendees: ["Riya S.", "Dr. Ahmed R."],
    description: "Initial consultation and requirements gathering"
  },
  {
    id: 4,
    title: "Artisan Creative Presentation",
    type: "meeting",
    date: "2024-06-17",
    time: "15:30",
    duration: "1.5h",
    client: "Artisan Creative Co",
    location: "Office - Conference Room B",
    attendees: ["Sarah M.", "Ahmed R.", "Riya S."],
    description: "Present design concepts and mood boards"
  },
  {
    id: 5,
    title: "Furniture Delivery Deadline",
    type: "deadline",
    date: "2024-06-18",
    time: "09:00",
    duration: "All day",
    client: "Emirates Capital Group",
    location: "Client Site",
    attendees: ["Omar K.", "Installation Team"],
    description: "Executive furniture delivery and installation"
  },
];

const eventTypes: { id: Event["type"]; label: string; color: string; icon: any }[] = [
  { id: "meeting", label: "Meeting", color: "#3b82f6", icon: Users },
  { id: "site_visit", label: "Site Visit", color: "#10b981", icon: MapPin },
  { id: "call", label: "Call", color: "#8b5cf6", icon: Phone },
  { id: "deadline", label: "Deadline", color: "#ef4444", icon: Clock },
];

export function SchedulingCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [view, setView] = useState<"day" | "week" | "month">("week");
  const [filterType, setFilterType] = useState<Event["type"] | "all">("all");

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const filteredEvents = filterType === "all" 
    ? events 
    : events.filter(e => e.type === filterType);

  const todayEvents = filteredEvents.filter(e => {
    const eventDate = new Date(e.date);
    return eventDate.toDateString() === selectedDate.toDateString();
  });

  const upcomingEvents = filteredEvents.filter(e => {
    const eventDate = new Date(e.date);
    return eventDate >= new Date() && eventDate.toDateString() !== selectedDate.toDateString();
  }).slice(0, 5);

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-full" style={{ background: "#faf9f6" }}>
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-5 h-5" style={{ color: "#c9a84c" }} />
          <span className="text-sm font-medium" style={{ color: "#c9a84c" }}>Smart Scheduling</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1a1a2e", fontSize: "1.5rem sm:text-1.75rem" }}>
          Calendar & Appointments
        </h1>
        <p className="text-sm mt-1" style={{ color: "#717182" }}>
          Manage meetings, site visits, and deadlines
        </p>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" style={{ color: "#1a1a2e" }} />
          </button>
          <h2 className="font-semibold text-base sm:text-lg" style={{ color: "#1a1a2e" }}>
            {selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h2>
          <button
            onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-5 h-5" style={{ color: "#1a1a2e" }} />
          </button>
          <button
            onClick={() => setSelectedDate(new Date())}
            className="px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ background: "#1a1a2e", color: "#fff" }}
          >
            Today
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg" style={{ background: "#fff" }}>
            <Filter className="w-4 h-4" style={{ color: "#717182" }} />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as Event["type"] | "all")}
              className="text-xs bg-transparent border-none outline-none cursor-pointer"
              style={{ color: "#1a1a2e" }}
            >
              <option value="all">All Events</option>
              {eventTypes.map((type) => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium" style={{ background: "#c9a84c", color: "#fff" }} onClick={() => showNotification("success", "New event created successfully!")}>
            <Plus className="w-4 h-4" /> New Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-white rounded-xl p-4 sm:p-5 shadow-sm">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-xs font-medium py-2" style={{ color: "#717182" }}>
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(selectedDate).map((date, index) => {
              if (!date) return <div key={index} className="h-16 sm:h-24" />;

              const dayEvents = filteredEvents.filter(e => {
                const eventDate = new Date(e.date);
                return eventDate.toDateString() === date.toDateString();
              });

              const isToday = date.toDateString() === new Date().toDateString();
              const isSelected = date.toDateString() === selectedDate.toDateString();

              return (
                <div
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`h-16 sm:h-24 p-1 sm:p-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    isToday ? "ring-2 ring-inset ring-[#c9a84c]" : ""
                  } ${isSelected ? "ring-2 ring-inset ring-[#c9a84c]" : ""}`}
                  style={{
                    background: isSelected ? "rgba(201,168,76,0.1)" : "#faf9f6"
                  }}
                >
                  <div className={`text-xs sm:text-sm font-medium mb-1 ${isToday ? "text-white" : ""}`} style={isToday ? { background: "#c9a84c", borderRadius: "4px", width: "20px sm:w-24px", height: "20px sm:h-24px", display: "flex", alignItems: "center", justifyContent: "center" } : { color: "#1a1a2e" }}>
                    {date.getDate()}
                  </div>
                  <div className="space-y-0.5 sm:space-y-1 hidden sm:block">
                    {dayEvents.slice(0, 2).map((event) => {
                      const typeConfig = eventTypes.find(t => t.id === event.type)!;
                      return (
                        <div
                          key={event.id}
                          className="text-xs px-1.5 py-0.5 rounded truncate"
                          style={{ background: typeConfig.color + "20", color: typeConfig.color }}
                        >
                          {event.title}
                        </div>
                      );
                    })}
                    {dayEvents.length > 2 && (
                      <div className="text-xs" style={{ color: "#717182" }}>
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                  {dayEvents.length > 0 && (
                    <div className="sm:hidden w-2 h-2 rounded-full mx-auto" style={{ background: "#c9a84c" }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Events Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Today's Events */}
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
            <h3 className="font-semibold mb-4" style={{ color: "#1a1a2e" }}>
              {selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
            </h3>
            {todayEvents.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <Calendar className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2" style={{ color: "#e9ebef" }} />
                <p className="text-sm" style={{ color: "#717182" }}>No events scheduled</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todayEvents.map((event) => {
                  const typeConfig = eventTypes.find(t => t.id === event.type)!;
                  return (
                    <div
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className="p-3 rounded-xl border hover:shadow-md transition-all cursor-pointer"
                      style={{ borderColor: "#e9ebef" }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <typeConfig.icon className="w-4 h-4" style={{ color: typeConfig.color }} />
                        <span className="text-xs font-medium" style={{ color: typeConfig.color }}>{typeConfig.label}</span>
                      </div>
                      <h4 className="text-sm font-medium mb-1" style={{ color: "#1a1a2e" }}>{event.title}</h4>
                      <div className="flex items-center gap-2 text-xs" style={{ color: "#717182" }}>
                        <Clock className="w-3 h-3" />
                        {event.time} ({event.duration})
                      </div>
                      <div className="flex items-center gap-2 text-xs mt-1" style={{ color: "#717182" }}>
                        <Building2 className="w-3 h-3" />
                        {event.client}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
            <h3 className="font-semibold mb-4" style={{ color: "#1a1a2e" }}>Upcoming</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => {
                const typeConfig = eventTypes.find(t => t.id === event.type)!;
                return (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className="p-3 rounded-xl border hover:shadow-md transition-all cursor-pointer"
                    style={{ borderColor: "#e9ebef" }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <typeConfig.icon className="w-4 h-4" style={{ color: typeConfig.color }} />
                      <span className="text-xs" style={{ color: "#717182" }}>
                        {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <h4 className="text-sm font-medium truncate" style={{ color: "#1a1a2e" }}>{event.title}</h4>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(26,26,46,0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5" style={{ background: "#1a1a2e" }}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-white font-semibold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {selectedEvent.title}
                  </div>
                  <div className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>{selectedEvent.client}</div>
                </div>
                {(() => {
                  const typeConfig = eventTypes.find(t => t.id === selectedEvent.type)!;
                  return (
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ background: typeConfig.color + "20", color: typeConfig.color }}
                    >
                      {typeConfig.label}
                    </span>
                  );
                })()}
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-3" style={{ background: "#faf9f6" }}>
                  <div className="text-xs mb-0.5" style={{ color: "#717182" }}>Date</div>
                  <div className="text-sm font-medium" style={{ color: "#1a1a2e" }}>
                    {new Date(selectedEvent.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                  </div>
                </div>
                <div className="rounded-xl p-3" style={{ background: "#faf9f6" }}>
                  <div className="text-xs mb-0.5" style={{ color: "#717182" }}>Time</div>
                  <div className="text-sm font-medium" style={{ color: "#1a1a2e" }}>{selectedEvent.time} ({selectedEvent.duration})</div>
                </div>
              </div>

              <div className="rounded-xl p-3" style={{ background: "#faf9f6" }}>
                <div className="text-xs mb-0.5" style={{ color: "#717182" }}>Location</div>
                <div className="text-sm font-medium" style={{ color: "#1a1a2e" }}>{selectedEvent.location}</div>
              </div>

              <div className="rounded-xl p-3" style={{ background: "#faf9f6" }}>
                <div className="text-xs mb-0.5" style={{ color: "#717182" }}>Description</div>
                <div className="text-sm" style={{ color: "#1a1a2e" }}>{selectedEvent.description}</div>
              </div>

              <div className="rounded-xl p-3" style={{ background: "#faf9f6" }}>
                <div className="text-xs mb-2" style={{ color: "#717182" }}>Attendees</div>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.attendees.map((attendee) => (
                    <span
                      key={attendee}
                      className="px-3 py-1.5 rounded-lg text-xs"
                      style={{ background: "#fff", color: "#1a1a2e", border: "1px solid #e9ebef" }}
                    >
                      {attendee}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                {selectedEvent.location.includes("Virtual") && (
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: "#3b82f6" }}>
                    <Video className="w-4 h-4" /> Join Meeting
                  </button>
                )}
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border" style={{ borderColor: "#e9ebef", color: "#1a1a2e" }}>
                  <Calendar className="w-4 h-4" /> Reschedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Insight */}
      <div className="mt-6 rounded-xl p-4" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4" style={{ color: "#c9a84c" }} />
          <span className="text-xs font-medium" style={{ color: "#c9a84c" }}>AI Scheduling Insight</span>
        </div>
        <p className="text-sm" style={{ color: "#1a1a2e" }}>
          You have 3 site visits this week. Consider grouping them by location to save travel time - Emirates Capital and HealthCore are in the same area.
        </p>
      </div>
    </div>
  );
}
