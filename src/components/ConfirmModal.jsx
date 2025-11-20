// src/components/ConfirmModal.jsx
import "./ConfirmModal.css";

/**
 * Props:
 * - open: boolean
 * - message: string
 * - onConfirm: () => void
 * - onCancel: () => void
 */
export default function ConfirmModal({ open, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onCancel}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{message || "Deseja confirmar esta ação?"}</h3>

        <div className="modal-actions">
          <button type="button" className="btn-ghost" onClick={onCancel}>
            Cancelar
          </button>

          <button type="button" className="btn-primary" onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}