"use-client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
    name: string;
    value: string;
    Icon: LucideIcon;
}


const StatCard = ({ name, Icon, value }: StatCardProps) => {
    return (<motion.div className="bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-[#1f1f1f]"
        whileHover={{ y: -5, boxShadow: '0px 25px 50px 12px rgba(0,0,0,0,0.5)' }}>
        <div className="px-4 py-5 sm:p-6">
            <span className="flex items-center text-sm font-medium text-gray-300">
                <Icon size={20} className="mr-2" />
                {name}
            </span>
            <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
        </div>
    </motion.div>)
}




export default StatCard