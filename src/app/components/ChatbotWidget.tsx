import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, Phone, RotateCcw } from "lucide-react";

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
  time: string;
}

const greetings: Message = {
  id: 0,
  from: "bot",
  text: "👋 Hello! I'm your OfficeAI assistant. I can help you with office furniture rental, pricing, space planning, or scheduling a design consultation. How can I help?",
  time: now(),
};

const botResponses: Record<string, string> = {
  price: "Our rental packages start from INR 2,500/month for a 10-person office. This includes workstations, ergonomic chairs, and storage. Would you like a custom quotation?",
  furniture: "We offer a wide range of furniture including executive desks, ergonomic chairs, conference tables, modular workstations, and lounge seating. All available for rent with flexible terms.",
  design: "Our AI Design Visualizer can generate luxury office concepts from your floor plan in seconds! Simply upload your layout and choose a style. Want me to guide you through it?",
  quote: "I can generate an instant quotation! Just tell me: office size (sqft), number of employees, and your preferred style (Modern, Executive, Scandinavian, or Industrial).",
  visit: "I'd be happy to schedule a showroom visit or virtual consultation. Our team is available Mon-Sat, 9AM-6PM. Can I get your name and contact number?",
  delivery: "We offer free delivery and professional installation for all rental orders in the city. Setup typically takes 1-2 days depending on office size.",
  maintenance: "All rentals include complimentary maintenance and replacement service. Any damaged or faulty items are replaced within 24 hours at no extra cost.",
  hello: "Hello there! 😊 How can I assist you today? Feel free to ask about our furniture, pricing, design services, or anything else.",
  hi: "Hi! Welcome to OfficeAI. I'm here to help with your office furnishing needs. What would you like to know?",
};

function now(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getBotReply(text: string): string {
  const lower = text.toLowerCase();
  for (const [key, reply] of Object.entries(botResponses)) {
    if (lower.includes(key)) return reply;
  }
  return "Great question! Our team specializes in luxury office transformations. For detailed information, could you share your office size and requirements? Or type 'quote' to get an instant estimate.";
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([greetings]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function send() {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), from: "user", text: input, time: now() };
    const replyText = getBotReply(input);
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: Date.now() + 1, from: "bot", text: replyText, time: now() }]);
    }, 1200 + Math.random() * 800);
  }

  function reset() {
    setMessages([greetings]);
  }

  const quickReplies = ["Get a Quote", "View Furniture", "Book Consultation", "Pricing"];

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-xl flex items-center justify-center z-50 transition-transform hover:scale-105 active:scale-95"
          style={{ background: "#1a1a2e" }}
        >
          <MessageCircle className="w-6 h-6 text-white" />
          <span
            className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white"
            style={{ background: "#c9a84c" }}
          />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-0 right-0 left-0 sm:bottom-6 sm:right-6 sm:left-auto sm:w-[360px] rounded-t-2xl sm:rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          style={{ height: "calc(100vh - 0px)", maxHeight: "520px", background: "#ffffff" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 p-4" style={{ background: "#1a1a2e" }}>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(201,168,76,0.2)" }}
            >
              <Sparkles className="w-5 h-5" style={{ color: "#c9a84c" }} />
            </div>
            <div className="flex-1">
              <div className="text-white text-sm font-medium">OfficeAI Assistant</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Online • Typically replies instantly</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={reset} className="text-white/40 hover:text-white/80 transition-colors">
                <RotateCcw className="w-4 h-4" />
              </button>
              <a href="tel:+971000000" className="text-white/40 hover:text-white/80 transition-colors">
                <Phone className="w-4 h-4" />
              </a>
              <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white/80 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: "#f8f7f4" }}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[80%]">
                  <div
                    className="rounded-2xl px-4 py-2.5 text-sm"
                    style={
                      msg.from === "user"
                        ? { background: "#1a1a2e", color: "white", borderRadius: "18px 18px 4px 18px" }
                        : { background: "white", color: "#1a1a2e", borderRadius: "18px 18px 18px 4px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }
                    }
                  >
                    {msg.text}
                  </div>
                  <div className="text-xs mt-1 px-1" style={{ color: "#a0a0b0", textAlign: msg.from === "user" ? "right" : "left" }}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-4 py-3 bg-white shadow-sm flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{ background: "#c9a84c", animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 flex gap-2 overflow-x-auto" style={{ background: "#f8f7f4" }}>
            {quickReplies.map((qr) => (
              <button
                key={qr}
                onClick={() => { setInput(qr); }}
                className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors hover:bg-white"
                style={{ borderColor: "#c9a84c40", color: "#1a1a2e" }}
              >
                {qr}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100 flex gap-2 bg-white">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none"
              style={{ background: "#f3f3f5", color: "#1a1a2e" }}
            />
            <button
              onClick={send}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-opacity disabled:opacity-40"
              style={{ background: "#c9a84c" }}
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
