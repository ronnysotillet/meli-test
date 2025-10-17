'use client'

import { Bell, ChartNoAxesCombined, DollarSign, House, Info, LucideProps, Mail, Menu, Settings, ShoppingCart, Upload, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ForwardRefExoticComponent, RefAttributes, useState } from 'react';



const sidebarItems = [
    { "icon": House, "name": "Inicio", "href": "/" },
    { "icon": ChartNoAxesCombined, "name": "Analisis", "href": "/analyzer" },
    { "icon": Upload, "name": "Cargar datos", "href": "/upload_data" },
];

export default function Sidebar() {

    const [isSidlebarOpen, setIsSidebarOpen] = useState(true);

    const pathname = usePathname()

    return <div className={`relative z-10 transition-all duration-100 ease-in-out flex-shrink-0 ${isSidlebarOpen ? 'w-64' : 'w-20'}`}>
        <div className='h-full bg-[#1e1e1e] backdrop-blur-md p-4 flex flex-col border-r border-[#2f2f2f]'>
            <button
                onClick={() => setIsSidebarOpen(!isSidlebarOpen)}
                className='p-2 rounded-full hover:bg-[#2f2f2f] transition-colors max-w-fit cursor-pointer'>
                <Menu size={24} />
            </button>
            <nav className='mt-8 flex-grow'>
                {
                    sidebarItems.map((item: {
                        icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
                        name: string;
                        href: string;
                    }) => {
                        return (
                            <Link key={item.name} href={item.href}>
                                <div
                                    className={`flex items-center p-4 text-sm font-medium rounded-lg gover:bg-[#2f2f2f] 
                                    transition-colors mb-2 ${pathname === item.href ? "bg-[#2f2f2f]" : ""}`}>

                                    <item.icon size={20} style={{ minWidth: "20px" }} />
                                    {isSidlebarOpen && (<span className='ml-4 whitespace-nowrap'>{item.name}</span>)}
                                </div>
                            </Link>
                        );
                    })
                }
            </nav>
        </div>
    </div>;
};