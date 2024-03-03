'use client'
import Link from "next/link";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { ModeToggle } from "../components/ThemeSwitcher"

const Navbar = () => {
  const [search, setSearch] = useState('');

  const handleSearch = () => {

  }

  return (
    <div className="h-20 w-screen">
      <div className="h-full w-full dark:bg-[#0B1215] bg-white flex justify-evenly items-center">
        <div className="w-52 h-11 justify-start items-start">
          <img src="/logoImage.jpg" alt="logo" className="size-full dark:flex hidden" />
          <img src="/logo-black.png" alt="logo" className="w-full h-full dark:hidden flex" />
        
        </div>
        <div className="h-full w-[75%] flex items-center">
          <div className="w-[50%] flex h-15 rounded justify-center items-center mx-20">
            <select className="rounded-l h-9 w-20 text-center text-white bg-red-600">
              <option className="dark:bg-[#0B1215] dark:text-white">Athletic</option>
              <option className="dark:bg-[#0B1215] dark:text-white">Formal</option>
              <option className="dark:bg-[#0B1215] dark:text-white">Casual</option>
            </select>
            <div className="w-full text-base border h-9 flex items-center rounded-r dark:bg-[#0B1215] dark:text-white bg-white text-black">
              <input
              placeholder="  Search ShoeShack"
              className="w-full text-base dark:bg-[#0B1215] dark:text-white bg-white text-black"
              onChange={(e) => setSearch(e.target.value)}
            />
            </div>
            
            <div className="search-icon w-9 h-9 rounded bg-red-500 ml-2 flex justify-center items-center">
            <FaSearch className="dark:text-white text-black" onClick={handleSearch} />
            </div>
          </div>
        </div>
        <div className="h-full w-28 flex justify-end items-end">
          <div className="h-full w-full flex justify-center items-center gap-2">
          <ModeToggle/>
            <div className="h-10 w-full bg-red-600 rounded">
              <Link href='/login' className="h-full w-full flex items-center justify-center dark:text-white text-black">LOGIN</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
