import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./Graph.css";

ChartJS.register(ArcElement, Tooltip, Legend);

// Paleta gerada automaticamente — sempre cores diferentes
function generateColors(amount) {
  const colors = [];
  const step = 360 / (amount + 1);

  for (let i = 0; i < amount; i++) {
    const hue = Math.round(step * (i + 1));
    colors.push(`hsl(${hue}, 80%, 60%)`);
  }

  return colors;
}

export default function Graph({ salary, remaining, categories }) {
  const labels = ["Salário restante", ...categories.map((c) => c.nome)];

  const dataValues = [remaining, ...categories.map((c) => c.valorLimite)];

  // Gera cores únicas para cada categoria
  const categoryColors = generateColors(categories.length);

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          "hsl(265, 78%, 67%)", // cor fixa para salário restante
          ...categoryColors,     // cores únicas sempre
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#fff",
          font: { family: "Inter", size: 14 },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="graph-card">
      <h3 className="graph-title">Distribuição do orçamento</h3>

      {salary === 0 ? (
        <p className="graph-warning">
          Defina um salário total para gerar o gráfico.
        </p>
      ) : (
        <div className="graph-wrapper">
          <Pie data={data} options={options} />
        </div>
      )}
    </div>
  );
}
