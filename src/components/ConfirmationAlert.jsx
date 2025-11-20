import { useEffect } from "react";
import "./ConfirmationAlert.css";

/**
 * Props:
 * - open: boolean
 * - message: string
 * - type: 'confirm' | 'success' | 'warning'
 * - onClose: () => void
 * - autoCloseMs: number (default 1200)
 */
export default function ConfirmationAlert({
  open,
  message = "",
  type = "success",
  onClose,
  autoCloseMs = 1200,
}) {
  useEffect(() => {
    if (!open) return;

    const id = setTimeout(() => {
      onClose?.();
    }, autoCloseMs);

    return () => clearTimeout(id);
  }, [open, autoCloseMs, onClose]);

  if (!open) return null;

  return (
    <div
      className={`ca-toast ca-${type}`}
      role="status"
      aria-live="polite"
      onClick={() => onClose?.()}
    >
      <div className="ca-body">{message}</div>
    </div>
  );
}