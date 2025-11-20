import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./Graph.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Graph({ salary, remaining, categories }) {
  const labels = ["Salário restante", ...categories.map((c) => c.nome)];

  const dataValues = [remaining, ...categories.map((c) => c.valorLimite)];

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          "hsl(265, 78%, 67%)", // accent
          ...categories.map(() => "hsl(210, 100%, 50%)"), // azul neon
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "var(--text)",
          font: { family: "Inter" },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="graph-card">
      <h3>Distribuição do orçamento</h3>

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