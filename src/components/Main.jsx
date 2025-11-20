import { useEffect, useState, useCallback } from "react";

import CategoryList from "./CategoryList";
import CategoryModal from "./CategoryModal";
import ConfirmModal from "./ConfirmModal";
import ConfirmationAlert from "./ConfirmationAlert";

import SalaryForm from "./SalaryForm";
import CategoryForm from "./CategoryForm";
import Graph from "./Graph";

import "./Main.css";

const CATS_KEY = "app_categorias_v2";
const SALARY_KEY = "app_salario_total";

export default function Main() {
  /* ------------------------ SALÁRIO TOTAL ------------------------ */
  const [salary, setSalary] = useState(() => {
    const raw = localStorage.getItem(SALARY_KEY);
    return raw ? Number(raw) : 0;
  });

  useEffect(() => {
    localStorage.setItem(SALARY_KEY, salary);
  }, [salary]);

  /* ------------------------ CATEGORIAS ÚNICAS ------------------------ */
  const [categories, setCategories] = useState(() => {
    try {
      const raw = localStorage.getItem(CATS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CATS_KEY, JSON.stringify(categories));
  }, [categories]);

  /* ------------------------------ MODAIS ------------------------------ */
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [confirm, setConfirm] = useState({
    open: false,
    message: "",
    onConfirm: null,
  });

  const [toast, setToast] = useState({ open: false, text: "" });
  const showToast = useCallback((text) => {
    setToast({ open: true, text });
  }, []);

  /* ------------------------------ SALDO RESTANTE ------------------------------ */
  const allocatedTotal = categories.reduce((acc, c) => acc + c.valorLimite, 0);
  const remaining = Math.max(salary - allocatedTotal, 0);

  /* ------------------------------ ADICIONAR CATEGORIA (FORM PRINCIPAL) ------------------------------ */
  const handleAddCategoryFromForm = (cat) => {
    const newCat = {
      id: Date.now(),
      nome: cat.nome,
      valorLimite: Number(cat.valorLimite),
      valorGasto: 0,
    };

    setCategories((prev) => [...prev, newCat]);
    showToast("Categoria criada");
  };

  /* ------------------------------ EDITAR CATEGORIA (MODAL) ------------------------------ */
  const handleSaveCategoryModal = (payload) => {
    if (editing) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editing.id ? { ...c, ...payload } : c
        )
      );
      showToast("Categoria atualizada");
    }

    setModalOpen(false);
    setEditing(null);
  };

  /* ------------------------------ EXCLUIR CATEGORIA ------------------------------ */
  const handleDelete = useCallback(
    (id) => {
      setConfirm({
        open: true,
        message: "Deseja realmente excluir esta categoria?",
        onConfirm: () => {
          setCategories((prev) => prev.filter((c) => c.id !== id));
          setConfirm({ open: false, message: "", onConfirm: null });
          showToast("Categoria removida");
        },
      });
    },
    [showToast]
  );

  /* ------------------------------- RENDER ------------------------------- */
  return (
    <main className="main-dashboard">

      <SalaryForm salary={salary} onSubmit={(value) => setSalary(value)} />

      <CategoryForm
        remaining={remaining}
        onSubmit={handleAddCategoryFromForm}
      />

      <Graph
        salary={salary}
        remaining={remaining}
        categories={categories}
      />

      <CategoryList
        categories={categories}
        onDelete={handleDelete}
        onEdit={(cat) => {
          setEditing(cat);
          setModalOpen(true);
        }}
      />

      <CategoryModal
        isOpen={modalOpen}
        initialData={editing}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSave={handleSaveCategoryModal}
      />

      <ConfirmModal
        open={confirm.open}
        message={confirm.message}
        onCancel={() =>
          setConfirm({ open: false, message: "", onConfirm: null })
        }
        onConfirm={() => confirm.onConfirm?.()}
      />

      <ConfirmationAlert
        open={toast.open}
        message={toast.text}
        type="success"
        onClose={() => setToast({ open: false, text: "" })}
      />
    </main>
  );
}