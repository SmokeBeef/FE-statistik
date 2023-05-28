import React from "react";

export default function Navbar() {
  return (
    <div className="flex justify-center items-center bg-gray-400 font-Poppins h-20">
      <div className="flex justify-center gap-5 items-center">
        <a href="/team" className={`text-xl text-slate-700 py-5 text-center hover:text-3xl hover:text-gray-800 transition-all ${window.location.pathname === "/team" ? "text-3xl text-gray-800 ": ""}`}>
          Team
        </a>
        <a href="/" className={`text-xl text-slate-700 py-5 text-center hover:text-3xl hover:text-gray-800 transition-all ${window.location.pathname === "/" ? "text-3xl text-gray-800 ": ""}`}>
          Match
        </a>
        <a href="/player" className={`text-xl text-slate-700 py-5 text-center hover:text-3xl hover:text-gray-800 transition-all ${window.location.pathname === "/player" ? "text-3xl text-gray-800 ": ""}`}>
          Player
        </a>
        <a href="/detail" className={`text-xl text-slate-700 py-5 text-center hover:text-3xl hover:text-gray-800 transition-all ${window.location.pathname === "/detail" ? "text-3xl text-gray-800 ": ""}`}>
          Detail
        </a>
      </div>
    </div>
  );
}
