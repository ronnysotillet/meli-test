"use Client"
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'


type TableProps ={
    title:string
    columns:Array<any>;
    data:Array<any>;
    onSelectRow:(value:any[])=>void;
};

const Table = ({title, columns, data, onSelectRow}:TableProps) => {

const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setFilteredData(data); // inicializa cuando llega la data
    }
  }, [data]);

  const handleChange = (e: any) => {
  const value = e.target.value.toLowerCase();

  if (!value.trim()) {
    setFilteredData(data);
    return;
  }

  const filteredRecords = data.filter((record) =>
    columns.some((col) => {
      if (typeof col.selector !== "function") return false;
      const cellValue = col.selector(record);

      if (cellValue === null || cellValue === undefined) return false;

      return cellValue.toString().toLowerCase().includes(value);
    })
  );

  setFilteredData(filteredRecords);
};


    return (<motion.div className='bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4
        md:p-6 border border-[#1f1f1f] mx-2 md:mx-0'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}>
        <h2 className='text-base md:text-lg font-medium mb-4 text-gray-100 text-center md:text-left'>
            {title}
        </h2>
           <div className='relative w-full md:w-auto'>
             <input type="text" placeholder="Search..." className='bg-[#2f2f2f] text-white  placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full md:w-64 
            focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-sm mb-3' 
            onChange={handleChange}
            />
            <Search className='absolute left-3 top-2.5 text-gray-400' size={18}/>
            </div>
            <DataTable
                columns={columns}
                data={filteredData}
                selectableRows
                onSelectedRowsChange={({ selectedRows }) => onSelectRow(selectedRows)}
                pagination
                fixedHeader
                theme='dark'
                customStyles={{
                    headCells: { style: { backgroundColor: "#2f2f2f", addingLeft: '8px', paddingRight: '8px', }, }, pagination: { style: { backgroundColor: "#2f2f2f", } },
                }
                }
            />
    </motion.div>
    );
}




export default Table