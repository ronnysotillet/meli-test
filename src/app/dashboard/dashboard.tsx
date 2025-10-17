"use client"
import StatCard from '@/components/StatCard';
import { DollarSign, ShoppingBag, User } from 'lucide-react';
import { motion } from 'framer-motion'
import ComparisonLineChart from '@/components/ComparisonLineChart';
import BarCharts from '@/components/BarCharts';
import { useEffect, useState } from 'react';






const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [historicalData, setHistoricalData] = useState([{}])
    const [predictionsData, setpredictionsData] = useState([{}])


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

    return (
        <div className="flex-1 overflow-auto relative z-10">

            <main className="max-w-7xl mx-auto py-4 px-4 lg:px-8">
                <motion.div className='grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-3 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name="Historicos" Icon={DollarSign} value={`${historicalData.length}`} />
                    <StatCard name="Proyecciones" Icon={User} value={`${predictionsData.length}`} />
                    <StatCard name="Total" Icon={ShoppingBag} value={`${historicalData.length + predictionsData.length}`} />
                </motion.div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    {loading ?
                        (<p>cargando...</p>) :
                        <ComparisonLineChart historical={historicalData} predictions={predictionsData} />
                    }
                    {loading ?
                        (<p>cargando...</p>) :
                        <BarCharts historical={historicalData} predictions={predictionsData} />
                    }
                </div>
            </main>
        </div>
    );
}



export default Dashboard