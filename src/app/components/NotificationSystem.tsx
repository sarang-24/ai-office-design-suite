import { useState, useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info, Sparkles } from "lucide-react";

type NotificationType = "success" | "error" | "info" | "ai";

interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  duration?: number;
}

let listeners: ((notification: Notification) => void)[] = [];
let notificationId = 0;

export function showNotification(
  type: NotificationType,
  message: string,
  duration = 3000
) {
  const notification: Notification = {
    id: ++notificationId,
    type,
    message,
    duration,
  };
  listeners.forEach((listener) => listener(notification));
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const listener = (notification: Notification) => {
      setNotifications((prev) => [...prev, notification]);
      if (notification.duration) {
        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
        }, notification.duration);
      }
    };
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return { notifications, removeNotification };
}

export function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications();

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "ai":
        return <Sparkles className="w-5 h-5" style={{ color: "#c9a84c" }} />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type: NotificationType) => {
    switch (type) {
      case "success":
        return "rgba(16, 185, 129, 0.1)";
      case "error":
        return "rgba(239, 68, 68, 0.1)";
      case "ai":
        return "rgba(201, 168, 76, 0.1)";
      default:
        return "rgba(59, 130, 246, 0.1)";
    }
  };

  const getBorderColor = (type: NotificationType) => {
    switch (type) {
      case "success":
        return "rgba(16, 185, 129, 0.3)";
      case "error":
        return "rgba(239, 68, 68, 0.3)";
      case "ai":
        return "rgba(201, 168, 76, 0.3)";
      default:
        return "rgba(59, 130, 246, 0.3)";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="flex items-center gap-3 p-4 rounded-xl shadow-lg animate-slideIn"
          style={{
            background: getBackgroundColor(notification.type),
            border: `1px solid ${getBorderColor(notification.type)}`,
            backdropFilter: "blur(10px)",
          }}
        >
          {getIcon(notification.type)}
          <span className="text-sm font-medium" style={{ color: "#1a1a2e" }}>
            {notification.message}
          </span>
          <button
            onClick={() => removeNotification(notification.id)}
            className="p-1 rounded-lg hover:bg-black/5 transition-colors"
          >
            <X className="w-4 h-4" style={{ color: "#717182" }} />
          </button>
        </div>
      ))}
    </div>
  );
}
