import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import Background from "../components/background";
import {useDownloadExcel} from "react-export-table-to-excel";

export default function Detail() {
  const tableRef = useRef(null);

  const {onDownload} = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename:"excel"-Date.now,
    sheet:"excel"-Date.now
  })
  
  return (
    <div>
      <Navbar />
      <Background/>
      <main className="font-Poppins">
        <form action="" className="mt-10 text-center">
          <div className="">
            <label htmlFor="match" className="block text-white text-3xl font-bold mb-2">
              Detail Pertandingan
            </label>
            <select name="" id="match" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">---Pilih Pertandingan---</option>
            </select>
          </div>
        </form>
      </main>
    </div>
  );
}
