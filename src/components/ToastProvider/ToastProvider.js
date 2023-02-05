import React from "react";
import useKeyDown from "../../hooks/use-key-down";

const ToastContext = React.createContext(null);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);
  function createNewToast(message, variant) {
    if (!message.trim()) {
      return;
    }

    const nextToasts = [
      ...toasts,
      { id: crypto.randomUUID(), message, variant },
    ];
    setToasts(nextToasts);
  }

  function removeToast(id) {
    const nextToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(nextToasts);
  }

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeyDown("Escape", handleEscape);

  const value = {
    toasts,
    createNewToast,
    removeToast,
  };
  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
