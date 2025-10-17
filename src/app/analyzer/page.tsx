"use client"
import AnalysisSection from "@/components/AnalysisSection";
import Table from "@/components/Table";
import { useSelectionStore } from "@/store/useSelectionStore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HomePage(){ 
     const [loading, setLoading] = useState(true);
      const [historicalData, setHistoricalData] = useState([{}])
      const [predictionsData, setpredictionsData] = useState([{}])
  
      const { setSelectedTableA , setSelectedTableB} = useSelectionStore();
  
  
      const getHistorical = async () => {
          try {
              const res = await fetch('/api/historical',
                  {
                      method: 'GET',
  
                      headers: {
                          'Content-Type': 'application/json'
                      }
                  }
              )
              const response = await res.json()
              setHistoricalData(response)
              return response
          } catch (err) {
              console.log(err)
          }
  
      }
  
      const getPredictions = async () => {
          try {
  
              const res = await fetch('/api/predictions',
                  {
                      method: 'Get',
                      headers: {
                          'Content-Type': 'application/json'
                      }
                  }
              )
  
              const response = await res.json()
  
              setpredictionsData(response)
              return response
          } catch (err) {
              console.log(err)
          }
  
  
  
      }

          useEffect(() => {
              const fetchData = async () => {
                  try {
                      setLoading(true);
                      const [pred, hist] = await Promise.all([
                          getPredictions(),
                          getHistorical(),
                      ]);
                      console.log(pred)
                      console.log(hist)
                  } catch (error) {
                      console.error("Error al obtener datos:", error);
                  } finally {
                      setLoading(false);
                  }
              }
      
              fetchData();
          }, [])
      
          const historicalColumns = [
              {
                  name: 'Vertical',
                  selector: (row: any) => row.vertical,
                  sortable: true,
              },
              {
                  name: 'Area',
                  selector: (row: any) => row.area,
                  sortable: true,
      
              },
              {
                  name: 'Initiative',
                  selector: (row: any) => row.initiative,
                  sortable: true,
              },
              {
                  name: 'Service',
                  selector: (row: any) => row.service,
                  sortable: true,
              },
              {
                  name: 'Date',
                  selector: (row: any) => row.date,
                  sortable: true,
              },
              {
                  name: 'Spend',
                  selector: (row: any) => row.spend,
                  sortable: true,
              }
          ];
      
          const predictionsColumns = [
              {
                  name: 'Vertical',
                  selector: (row: any) => row.vertical,
                  sortable: true
              },
              {
                  name: 'Area',
                  selector: (row: any) => row.area,
                  sortable: true
      
              },
              {
                  name: 'Initiative',
                  selector: (row: any) => row.initiative,
                  sortable: true
              },
              {
                  name: 'Service',
                  selector: (row: any) => row.service,
                  sortable: true
              },
              {
                  name: 'Date',
                  selector: (row: any) => row.date,
                  sortable: true
              },
              {
                  name: 'Proyected Spend',
                  selector: (row: any) => row.proyected_spend,
                  sortable: true
              },
              {
                  name: 'Max Spend',
                  selector: (row: any) => row.max_spend,
                  sortable: true
              },
              {
                  name: 'Min Spend',
                  selector: (row: any) => row.min_spend,
                  sortable: true,
              }
          ];
      

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <main className="max-w-7xl mx-auto py-4 px-4 lg:px-8">
                <motion.div className='grid grid-cols-1 gap-5 mb-5 '
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}>
                    <Table title="Tabla de historicos" data={historicalData} columns={historicalColumns} onSelectRow={setSelectedTableA} />
                    <Table title="Tabla de proyecciones" data={predictionsData} columns={predictionsColumns} onSelectRow={setSelectedTableB} />
                </motion.div>
                <AnalysisSection defaultData={[{'historical':historicalData,'predictions': predictionsData}]}/>
            </main>
        </div>
    );
} 