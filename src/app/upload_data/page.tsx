"use client";

import { useState } from "react";
import Papa from "papaparse";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const onFileChangeHandler = (e:any) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results:any) {
        console.log("Datos parseados:", results.data);
        setParsedData(results.data);
      },
      error: function (err) {
        console.error("Error al parsear CSV:", err);
      },
    });
  };

  const handleOptionSelect = (e:any) => {
    setSelectedOption(e.target.value);
  };

  const uploadData = async () => {
    if (!selectedOption) {
      alert("Por favor selecciona 'Histórico' o 'Proyecciones'");
      return;
    }

    if (!parsedData.length) {
      alert("Primero debes subir un archivo válido.");
      return;
    }

    try {
      const endpoint =
        selectedOption === "historical"
          ? "/api/historical"
          : "/api/predictions";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      if (!response.ok) throw new Error("Error al subir los datos");

      const result = await response.json();
      console.log("Respuesta del servidor:", result);
      alert("Datos enviados correctamente 🚀");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Error al enviar los datos al servidor");
    }
  };

  return (
    <div className="px-6 py-8 sm:content-center overflow-auto relative z-10">
      <div className="flex flex-col items-center justify-center py-5 sm:px-0">
        <label
          htmlFor="file"
          className="flex flex-col items-center justify-center w-full max-w-sm p-4 border-2 border-dashed border-gray-500 rounded-xl shadow-lg bg-gray-800 hover:bg-gray-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-gray-300 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16V4m0 0l-4 4m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"
            />
          </svg>
          <span className="text-gray-300 text-sm">
            Clic o arrastra un archivo aquí
          </span>
          <input
            id="file"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={onFileChangeHandler}
          />
        </label>


        <div className="flex flex-col items-center mt-5">
          <p className="text-gray-400 text-sm mb-2">Selecciona una opción:</p>

          <div className="flex gap-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="option"
                value="historical"
                onChange={handleOptionSelect}
                className="accent-blue-500"
              />
              <span>Histórico</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="option"
                value="projections"
                onChange={handleOptionSelect}
                className="accent-blue-500"
              />
              <span>Proyecciones</span>
            </label>
          </div>
        </div>

      

        <button
          onClick={uploadData}
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg mt-6 px-5 py-2 transition"
        >
          Subir archivo
        </button>
      </div>
    </div>
  );
}
