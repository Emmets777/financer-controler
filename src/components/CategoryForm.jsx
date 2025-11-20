import { useState } from "react";
import "./CategoryForm.css";

export default function CategoryForm({ remaining, onSubmit }) {
  const [name, setName] = useState("");
  const [valorLimite, setValorLimite] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return;
    if (!valorLimite || Number(valorLimite) <= 0) return;

    if (Number(valorLimite) > remaining) {
      alert("O valor informado excede o saldo restante.");
      return;
    }

    onSubmit({
      nome: name.trim(),
      valorLimite: Number(valorLimite),
      valorGasto: 0,
    });

    setName("");
    setValorLimite("");
  };

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <h3>Nova categoria do orçamento</h3>

      <label>
        Nome da categoria
        <input
          type="text"
          placeholder="Ex: Alimentação"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Valor destinado (R$)
        <input
          type="number"
          min="0"
          max={remaining}
          placeholder="Ex: 300"
          value={valorLimite}
          onChange={(e) => setValorLimite(e.target.value)}
        />
      </label>

      <button type="submit" className="form-btn">Adicionar categoria</button>
    </form>
  );
}