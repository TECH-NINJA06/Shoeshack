"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { ModeToggle } from "../app/components/ThemeSwitcher";
import { IoCartOutline } from "react-icons/io5";
import axios from "axios";
import Cookies from "js-cookie";
import { getCookie } from "@/helpers/getCookie";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState({});
  const [cartItem, setCartItem] = useState(0);
  const [auth, setAuth] = useState(false);

  // const token = Cookies.get("token");
  useEffect(() => {
    (() => {
      const token = getCookie();
      console.log("token: " + token);
      if (!token) {
        console.log("Unauthorized Request");
      } else {
        setAuth(true);
      }
    })();
  }, []);

  // useEffect(() => {
  //   (async ()=>{

  //     }
  //     // const response = await fetch(`/api/auth/profile`, {
  //     //   method: 'GET',
  //     //   headers: {
  //     //     'Authorization': token,
  //     //   },
  //     // });
  //     // if(response.status === 200) {
  //     //   const data = await response.json();
  //     //   setProfile(data);
  //     //   console.log(data);
  //     // } else{
  //     //   console.log("Error at navbar")
  //     // }

  //   })()
  // }, [])

  const handleSearch = () => {
    console.log(search);
  };

  return (
    <div className="h-20 w-screen border-b">
      <div className="h-full w-full bg-[#0B1215] flex justify-evenly items-center">
        <div className="w-52 h-11 justify-start items-start overflow-hidden">
          <img src="/logoImage.jpg" alt="logo" className="size-full" />
          {/* <img src="/logo-black.png" alt="logo" className="w-full h-[120%] dark:hidden flex" /> */}
        </div>
        <div className="h-full w-[70%] flex items-center">
          <div className="w-[50%] flex h-15 rounded justify-center items-center mx-20">
            <select className="rounded-l h-9 w-24 text-center text-white bg-red-600 inset-0">
              <option className="dark:bg-[#0B1215] dark:text-white">
                Athletic
              </option>
              <option className="dark:bg-[#0B1215] dark:text-white">
                Formal
              </option>
              <option className="dark:bg-[#0B1215] dark:text-white">
                Casual
              </option>
            </select>
            <div className="w-full text-base border h-9 flex items-center rounded-r bg-[#0B1215] text-white">
              <input
                placeholder="  Search ShoeShack"
                className="w-full text-base bg-[#0B1215] text-white border-none h-full"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="search-icon w-14 h-9 rounded-full bg-red-500 ml-2 flex justify-center items-center">
              <FaSearch className="text-white " onClick={handleSearch} />
            </div>
          </div>
        </div>
        <div className="h-full w-28 flex justify-end items-end">
          <div className="h-full w-full flex justify-center items-center gap-3 text-white">
            {/* <ModeToggle/> */}
            <Link href="/cart" className="size-full">
              <div className="h-[90%] w-full flex justify-center items-center pt-3">
                <IoCartOutline className="size-[80%]" />
                <span>{cartItem}</span>
              </div>
            </Link>

            {auth ? (
              <Link href="/profile" className="h-14 w-28 rounded-full">
                <div
                  className="size-full rounded-full bg-center bg-no-repeat bg-cover"
                  style={{
                    backgroundImage: `url(${
                      profile?.avatar ? profile.avatar : "/navAvatar.jpg"
                    })`,
                  }}
                ></div>
              </Link>
            ) : (
              <div className="h-9 w-full bg-red-600 rounded px-1">
                <Link
                  href="/login"
                  className="h-full w-full flex items-center justify-center text-white font-medium text-base"
                >
                  LOGIN
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
