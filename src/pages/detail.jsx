import React from "react";
import Navbar from "../components/Navbar";

export default function Detail() {
  return (
    <div>
      <Navbar />
      <main className="font-Poppins">
        <form action="" className="mt-10 text-center">
          <div className="">
            <label htmlFor="match" className="block text-gray-700 text-md font-bold mb-2">
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
