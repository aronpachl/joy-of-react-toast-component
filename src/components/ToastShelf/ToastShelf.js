import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { useToast } from "../ToastProvider";

function ToastShelf() {
  const { toasts, removeToast } = useToast();
  if (toasts.length < 1) return null;

  return (
    <ol
      className={styles.wrapper}
      role={"region"}
      aria-live={"assertive"}
      aria-label={"Notification"}
    >
      {toasts.map((toast) => {
        return (
          <li key={toast.id} className={styles.toastWrapper}>
            <Toast
              variant={toast.variant}
              handleDismiss={() => removeToast(toast.id)}
            >
              {toast.message}
            </Toast>
          </li>
        );
      })}
    </ol>
  );
}

export default ToastShelf;
