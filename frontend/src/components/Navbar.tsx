'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import axios from "axios";
import { useRouter } from "next/navigation";

// Define an interface representing the structure of a profile
interface Profile {
  avatar?: string;
  id: string;
}

const Navbar = () => {
  const router = useRouter()
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null); // Use the Profile interface as the type
  const [cartItem, setCartItem] = useState(0);

  useEffect(() => {
    (async () => {
     const response = await axios.get(`/api/home`);
     setProfile(response.data)
     console.log("Profile updated" + response.data);
    })();
  }, []);

  const handleSearch = () => {
    console.log(search);
    router.push(`/search/${search}`)
  };

  return (
    <div className="h-20 w-screen border-b">
      <div className="h-full w-full bg-[#0B1215] flex justify-evenly items-center">
        <div className="w-52 h-11 justify-start items-start overflow-hidden">
          <img src="/logoImage.jpg" alt="logo" className="size-full" />
        </div>
        <div className="h-full w-[70%] flex items-center">
          <div className="w-[50%] flex h-15 rounded justify-center items-center mx-20">
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
            <Link href="/cart" className="size-full">
              <div className="h-[90%] w-full flex justify-center items-center pt-3">
                <IoCartOutline className="size-[80%]" />
                <span>{cartItem}</span>
              </div>
            </Link>
            <Link href={`/profile/${profile?.id}`} className="h-14 w-28 rounded-full">
              <div
                className="size-full rounded-full bg-center bg-no-repeat bg-cover"
                style={{
                  backgroundImage: `url(${
                    profile && profile.avatar ? profile.avatar : "/navAvatar.jpg"
                  })`,
                }}
              ></div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
