import * as React from "react"

interface Toast {
  id: string
  message: string
  type: "success" | "error"
}

interface ToastContextType {
  showToast: (message: string, type?: "success" | "error") => void
}

const ToastContext = React.createContext<ToastContextType>({
  showToast: () => {},
})

export const useToast = () => React.useContext(ToastContext)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const showToast = React.useCallback((message: string, type: "success" | "error" = "success") => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-in slide-in-from-right-4 fade-in duration-300 flex items-center gap-2 min-w-[240px] ${
              toast.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            <span className="text-lg">{toast.type === "success" ? "✅" : "❌"}</span>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
