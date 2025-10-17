import { useState } from "react";
import { useSelectionStore } from "@/store/useSelectionStore";

const AnalysisSection = ({ defaultData }: { defaultData: any[] }) => {
  const { selectedTableA, selectedTableB } = useSelectionStore();
  const [response, setResponse] = useState<string>("");

  const handleAsk = async () => {
    const combinedData =
      selectedTableA.length || selectedTableB.length
        ? [...selectedTableA, ...selectedTableB]
        : defaultData;

    const prompt = `
      Eres un analista de datos. Con base en el siguiente conjunto de datos:
      ${JSON.stringify(combinedData, null, 2)}
      Genera un resumen y análisis breve (3 párrafos máximo), toma en cuenta el siguiente contexto: 
      "Gracias a la variedad de productos y servicios dispuestos, uno de los procesos que requiere la
empresa es monitorear los consumos de infraestructura de los servicios que utilizan las
diferentes unidades de negocio y hacer proyecciones / predicciones para la toma de decisiones
por parte de los líderes de cada área, quienes controlan el presupuesto que se asigna
mensualmente a cada iniciativa y cada equipo. En este contexto, hay 2 equipos al interior de la
organización trabajando en dar visibilidad sobre este tema; un equipo está orientado a extraer el
análisis de los datos históricos y otro a generar las predicciones de los consumos."
      .
    `;

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResponse(data.result);
  };

  return (
    <div className="bg-[#111] p-4 rounded-xl border border-[#222] shadow-lg mt-6">
      <button
        onClick={handleAsk}
        className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg mb-3"
      >
        Analizar datos seleccionados
      </button>

      <div className="text-gray-200 whitespace-pre-wrap">
        {response || "Haz clic para generar el análisis."}
      </div>
    </div>
  );
};

export default AnalysisSection;
