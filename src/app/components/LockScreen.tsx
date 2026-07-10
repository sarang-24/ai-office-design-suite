import { useState } from "react";
import { Lock, Key, Eye, EyeOff, Building2, LogOut, Sparkles, Shield } from "lucide-react";

export function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "130326") {
      onUnlock();
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden" style={{
      background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 50%, #3d7a9e 100%)"
    }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full opacity-20" style={{
          background: "radial-gradient(circle, #c9a84c 0%, transparent 70%)",
          animation: "float 6s ease-in-out infinite"
        }} />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-80 sm:h-80 rounded-full opacity-15" style={{
          background: "radial-gradient(circle, #ffffff 0%, transparent 70%)",
          animation: "float 8s ease-in-out infinite reverse"
        }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full opacity-10" style={{
          background: "radial-gradient(circle, #8b7355 0%, transparent 70%)",
          animation: "pulse 4s ease-in-out infinite"
        }} />
      </div>

      <div className={`w-full max-w-sm sm:max-w-md relative z-10 ${isShaking ? "animate-shake" : ""}`}>
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl mb-4 sm:mb-6 relative" style={{
            background: "linear-gradient(135deg, #1e3a5f 0%, #3d7a9e 50%, #c9a84c 100%)",
            boxShadow: "0 0 60px rgba(30, 58, 95, 0.5), 0 0 100px rgba(201, 168, 76, 0.3)"
          }}>
            <div className="absolute inset-0 rounded-3xl bg-white opacity-20 animate-pulse" />
            <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-white relative z-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2" style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            textShadow: "0 0 40px rgba(201, 168, 76, 0.5)"
          }}>
            OfficeAI Pro
          </h1>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: "#c9a84c" }} />
            <p className="text-xs sm:text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
              AI-Powered Workspace Design
            </p>
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: "#c9a84c" }} />
          </div>
        </div>

        {/* Lock Card */}
        <div className="backdrop-blur-xl rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl border" style={{
          background: "rgba(255, 255, 255, 0.1)",
          borderColor: "rgba(255, 255, 255, 0.2)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(30, 58, 95, 0.2)"
        }}>
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-3 sm:mb-4 relative" style={{
              background: "linear-gradient(135deg, #1e3a5f 0%, #3d7a9e 100%)",
              boxShadow: "0 0 30px rgba(30, 58, 95, 0.5)"
            }}>
              <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-pulse" />
              <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white relative z-10" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-white" style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}>
              Secure Access
            </h2>
            <p className="text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              Enter password to access the AI-powered demo
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <Key className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "#c9a84c" }} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter password"
                className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 rounded-xl border-2 text-base sm:text-lg font-semibold transition-all backdrop-blur-sm"
                style={{
                  borderColor: error ? "#ef4444" : "rgba(255, 255, 255, 0.2)",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  boxShadow: error ? "0 0 20px rgba(239, 68, 68, 0.3)" : "0 0 20px rgba(30, 58, 95, 0.2)"
                }}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "rgba(255,255,255,0.6)" }} />
                ) : (
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "rgba(255,255,255,0.6)" }} />
                )}
              </button>
            </div>

            {error && (
              <div className="p-3 sm:p-4 rounded-xl text-xs sm:text-sm text-center backdrop-blur-sm" style={{
                background: "rgba(239, 68, 68, 0.2)",
                color: "#ef4444",
                border: "1px solid rgba(239, 68, 68, 0.3)"
              }}>
                <div className="flex items-center justify-center gap-2">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                  Incorrect password. Please try again.
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 sm:py-4 rounded-xl text-white font-semibold text-base sm:text-lg transition-all hover:transform hover:-translate-y-1 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #1e3a5f 0%, #3d7a9e 50%, #c9a84c 100%)",
                boxShadow: "0 4px 20px rgba(30, 58, 95, 0.5)"
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                Unlock AI Demo
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              <Shield className="w-3 h-3" />
              <span>Enterprise-grade security • AI-protected</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            © 2024 OfficeAI Pro. Powered by Artificial Intelligence.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
