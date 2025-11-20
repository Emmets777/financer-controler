// src/components/CategoryModal.jsx
import { useEffect, useState } from "react";
import "./CategoryModal.css";

export default function CategoryModal({ isOpen, onClose, onSave, initialData }) {
  // hooks no topo (sempre)
  const [nome, setNome] = useState("");
  const [valorLimite, setValorLimite] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const n = initialData?.nome ?? "";
    const v =
      initialData?.valorLimite !== undefined ? String(initialData.valorLimite) : "";

    // Atualiza estado de forma *assíncrona* (microtask) para evitar
    // o aviso "setState() inside an effect" e prevenir renders em cascata.
    // Comportamento UX idêntico ao síncrono do ponto de vista do usuário.
    Promise.resolve().then(() => {
      setNome(n);
      setValorLimite(v);
    });

    // lock scroll enquanto modal aberto
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [isOpen, initialData]);

  // snapshot de valores iniciais para dirty check
  const initialNome = initialData?.nome ?? "";
  const initialValorLimite =
    initialData?.valorLimite !== undefined ? String(initialData.valorLimite) : "";

  const dirty = nome !== initialNome || valorLimite !== initialValorLimite;

  function handleClose() {
    if (dirty) {
      const leave = window.confirm("Há alterações não salvas. Deseja realmente sair?");
      if (!leave) return;
    }
    onClose();
  }

  function handleSave(e) {
    e?.preventDefault?.();

    if (!nome.trim()) return; // valida nome

    const limite = Number(String(valorLimite).replace(",", "."));
    if (Number.isNaN(limite) || limite < 0) return;

    const payload = {
      id: initialData?.id,
      nome: nome.trim(),
      valorLimite: Number(limite.toFixed(2)),
      // valorGasto será tratado pelo pai (Main.jsx) ao salvar/editar
    };

    onSave(payload);
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h3>{initialData ? "Editar Categoria" : "Nova Categoria"}</h3>
        </header>

        <form className="modal-body" onSubmit={handleSave}>
          <label>
            Nome
            <input
              autoFocus
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Alimentação"
            />
          </label>

          <label>
            Limite (R$)
            <input
              type="number"
              min="0"
              step="0.01"
              value={valorLimite}
              onChange={(e) => setValorLimite(e.target.value)}
              placeholder="Ex: 200.00"
            />
          </label>

          <div className="modal-actions">
            <button type="button" className="btn-ghost" onClick={handleClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              {initialData ? "Salvar alterações" : "Criar categoria"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
