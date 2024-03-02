import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="h-20 w-screen">
      <div className="h-full w-full bg-white flex justify-evenly items-center">
        <div className="h-full w-52 justify-start items-start">
          <img src="/logoImage.jpg" alt="logo" className="h-full w-full" />
        </div>
        <div className="h-full w-[75%] flex items-center">
          <div className="w-[50%] flex h-15 rounded justify-center items-center mx-20">
            <select className="rounded-l h-9 w-20 text-center text-white bg-orange-500">
              <option className="bg-black text-white">Athletic</option>
              <option className="bg-black text-white">Formal</option>
              <option className="bg-black text-white">Casual</option>
            </select>
            <div className="w-full text-base border h-9 flex items-center rounded-r">
              <input
              placeholder="  Search ShoeShack"
              className="w-full text-base"
            />
            </div>
            
            <div className="search-icon w-9 h-9 rounded bg-orange-500 ml-2 flex justify-center items-center">
            <FaSearch className="text-white" />
            </div>
          </div>
        </div>
        <div className="h-full w-24 flex justify-end items-end">
          <div className="h-full w-full flex justify-center items-center">
            <div className="h-10 w-full bg-orange-500 rounded">
              <Link href='/login' className="h-full w-full flex items-center justify-center">LOGIN</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
