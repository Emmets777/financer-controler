// src/components/CategoryList.jsx
import "./CategoryList.css";

export default function CategoryList({ categories, onEdit, onDelete }) {
  const safeCats = Array.isArray(categories) ? categories : [];

  const fmt = (v) => {
    const n = Number(v ?? 0);
    // evita NaN e garante 2 casas
    return n && !Number.isNaN(n)
      ? n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : "0,00";
  };

  return (
    <section className="category-list" aria-live="polite">
      {safeCats.length === 0 && (
        <p className="empty">Nenhuma categoria cadastrada ainda.</p>
      )}

      {safeCats.map((cat) => {
        const limite = cat?.valorLimite ?? 0;
        const gasto = cat?.valorGasto ?? 0;

        return (
          <article key={cat.id} className="category-item" role="listitem" aria-label={`Categoria ${cat.nome}`}>
            <div className="category-info">
              <p className="category-name">{cat.nome}</p>
              <p className="category-values">
                <span className="category-value-label">Limite:</span>
                <span className="category-value">R$ {fmt(limite)}</span>
                <span className="category-value-label" style={{ marginLeft: 10 }}>Gasto:</span>
                <span className="category-value">R$ {fmt(gasto)}</span>
              </p>
            </div>

            <div className="category-actions">
              <button
                type="button"
                className="edit"
                aria-label={`Editar ${cat.nome}`}
                onClick={() => onEdit?.(cat)}
              >
                Editar
              </button>

              <button
                type="button"
                className="delete"
                aria-label={`Excluir ${cat.nome}`}
                onClick={() => onDelete?.(cat.id)}
              >
                Excluir
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
}
