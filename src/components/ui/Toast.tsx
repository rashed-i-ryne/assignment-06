"use client";

import { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  workoutName?: string;
  type?: "success" | "error";
  isVisible: boolean;
  onClose: () => void;
}

const Toast = ({
  message,
  workoutName,
  type = "success",
  isVisible,
  onClose,
}: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes toast-slide-up {
          0% { opacity: 0; transform: translate(-50%, 100%) scale(0.9); }
          15% { opacity: 1; transform: translate(-50%, 0) scale(1); }
          85% { opacity: 1; transform: translate(-50%, 0) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -20%) scale(0.95); }
        }
        .animate-toast {
          animation: toast-slide-up 3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `,
        }}
      />
      <div className="fixed bottom-8 left-1/2 z-50 animate-toast flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl bg-[#18181b] border border-[#27272a] text-white min-w-[300px]">
        {type === "success" ? (
          <CheckCircle2 className="w-5 h-5 text-[#ccff00]" />
        ) : (
          <AlertCircle className="w-5 h-5 text-red-500" />
        )}

        <p className="font-medium text-sm grow">
          {workoutName && (
            <span className="font-bold text-[#ccff00]">
              &quot;{workoutName}&quot;
            </span>
          )}{" "}
          {message}
        </p>
        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};

export default Toast;
