"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="w-full bg-[#111111] border-b border-gray-800 sticky top-0 z-50 h-16 shadow-lg">
        <div className="max-w-7xl mx-auto px-5 h-full flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <div className="flex border-2 border-[#3a0048] font-black tracking-tighter uppercase">
              <span className="bg-[#E6C62F] text-[#520052] px-2 py-1">Hyper</span>
              <span className="bg-[#520052] text-[#E6C62F] px-2 py-1">pop</span>
            </div>
          </Link>

          {/* LINKS SOLTOS (DESKTOP) */}
          <ul className="hidden md:flex items-center gap-5 text-[10px] font-black uppercase tracking-[0.2em] text-white">
            <li>
              <Link href="/" className="hover:text-[#E6C62F] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/categoria/esportes" className="hover:text-[#E6C62F] transition-colors">
                Esportes
              </Link>
            </li>
            <li>
              <Link href="/categoria/entretenimento" className="hover:text-[#E6C62F] transition-colors">
                Entretenimento
              </Link>
            </li>
            <li>
              <Link href="/categoria/videogame" className="hover:text-[#E6C62F] transition-colors">
                Videogame
              </Link>
            </li>
          </ul>

          {/* BOTÃO MENU (MOBILE) */}
          <button 
            onClick={() => setIsOpen(true)}
            className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
          >
            <div className="w-7 h-1 bg-[#E6C62F]"></div>
            <div className="w-7 h-1 bg-white"></div>
            <div className="w-7 h-1 bg-[#E6C62F]"></div>
          </button>
        </div>
      </nav>

      {/* SIDEBAR (PARA MOBILE) */}
      <aside className={`fixed inset-0 z-[60] transition-all duration-500 ${isOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`} onClick={closeMenu}></div>
        <div className={`relative w-72 bg-[#232323] h-full shadow-2xl transition-transform duration-500 p-10 flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <button onClick={closeMenu} className="text-[#E6C62F] font-black self-end text-2xl">✕</button>
          <nav className="flex flex-col gap-8 mt-10 text-white font-black uppercase italic tracking-[0.2em] text-lg">
            <Link href="/" onClick={closeMenu} className="text-[#E6C62F] border-b border-[#E6C62F]/20 pb-2">🏠 HOME</Link>
            <Link href="/categoria/esportes" onClick={closeMenu}>Esportes</Link>
            <Link href="/categoria/entretenimento" onClick={closeMenu}>Entretenimento</Link>
            <Link href="/categoria/videogame" onClick={closeMenu}>Videogame</Link>
          </nav>
        </div>
      </aside>
    </>
  );
}