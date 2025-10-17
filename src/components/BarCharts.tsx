import { motion } from 'framer-motion';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';



type BarChartsProps = {
  historical: Array<any>;
  predictions: Array<any>;

};

const BarCharts = ({ historical, predictions }: BarChartsProps) => {


  const [filtro, setFiltro] = useState("area");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);



  const getAll = async (nuevoFiltro: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/spend/all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pred: predictions, hist: historical, filtro: nuevoFiltro }),
      });
      console.log(res)
      const json = await res.json();
      setData(json.agrupado || []);
      console.log(json.agrupado)
    } catch (error) {
      console.error("Error al obtener datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAll(filtro)
  }, [filtro]);

  return (<motion.div className='bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4
        md:p-6 border border-[#1f1f1f] mx-2 md:mx-0'
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.5 }}>
    <h2 className='text-base md:text-lg font-medium mb-4 text-gray-100 text-center md:text-left'>
     Grafico de proyecciones
    </h2>

    <label htmlFor="filtro">Filter by: </label>
    <select
      id="filtro"
      className='bg-[#2f2f2f] text-white  placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full md:w-64 
            focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-sm mb-3'
      value={filtro}
      onChange={(e) => setFiltro(e.target.value)}
      style={{ marginLeft: "1rem", padding: "0.3rem" }}
    >
      <option value="area">Área</option>
      <option value="vertical">Vertical</option>
      <option value="initiative">Iniciativa</option>
      <option value="service">Servicio</option>
    </select>
    <div className="h-64 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={filtro} />
          <YAxis />
          <Tooltip
                                contentStyle={{
                                    backgroundColor: "rgba(31,41,55,0.8)",
                                    borderColor: "#4b5563",
                                    fontSize: "12px"
                                }}
                            />
          <Legend />
          <Bar dataKey="totalSpend" fill="#8884d8" minPointSize={5} />
          <Bar dataKey="spendp" fill="#82ca9d" minPointSize={10} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </motion.div>








  );
}




export default BarCharts