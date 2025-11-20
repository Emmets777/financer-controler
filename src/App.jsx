import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

// função auxiliar para evitar duplicação
function getStoredData() {
  try {
    const raw = localStorage.getItem("financeApp");
    if (!raw) return { saldoTotal: 0, distribuicaoAtual: [] };
    return JSON.parse(raw);
  } catch {
    return { saldoTotal: 0, distribuicaoAtual: [] };
  }
}

export default function App() {
  // inicializa direto do localStorage (sem efeito)
  const { saldoTotal, distribuicaoAtual } = getStoredData();

  const [saldo, setSaldo] = useState(saldoTotal);
  const [divisao, setDivisao] = useState(distribuicaoAtual);

  // salva no localStorage sempre que mudar
  useEffect(() => {
    try {
      localStorage.setItem(
        "financeApp",
        JSON.stringify({
          saldoTotal: saldo,
          distribuicaoAtual: divisao,
        })
      );
    } catch (e) {
      console.error("Erro ao salvar localStorage", e);
    }
  }, [saldo, divisao]);

  return (
    <div className="app-container">
      <Header />
      <Main
        saldo={saldo}
        setSaldo={setSaldo}
        divisao={divisao}
        setDivisao={setDivisao}
      />
      <Footer />
    </div>
  );
}