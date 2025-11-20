import { useState } from "react";
import "./SalaryForm.css";

export default function SalaryForm({ salary, onSubmit }) {
  const [value, setValue] = useState(salary);

  function handleSubmit(e) {
    e.preventDefault();
    const num = Number(value);
    if (isNaN(num) || num <= 0) return;
    onSubmit(num); // <-- corrigido
  }

  return (
    <form className="sf-card" onSubmit={handleSubmit}>
      <h2>Salário Total</h2>

      <input
        type="number"
        value={value}
        placeholder="Digite seu salário"
        onChange={(e) => setValue(e.target.value)}
      />

      <button type="submit">Salvar</button>
    </form>
  );
}
