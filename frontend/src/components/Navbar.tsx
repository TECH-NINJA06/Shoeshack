"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

interface Profile {
  avatar?: string;
  id: string;
}
interface CartItem {
  id: string;
  title: string;
  image: string;
  brand: string;
  price: number;
  size: number;
  quantity: number;
}
interface RootState {
  cartItems: CartItem[];
}

const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [gAvatar, setGAvatar] = useState(null);
  const [cartItemLength, setCartItemLength] = useState(0);

  const cartItems = useSelector((state: RootState) => state.cartItems);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/home`);
        setProfile(response.data);
        console.log("Profile updated", response.data);
        setCartItemLength(response.data.user.cart.length);
        // if(session) {
        //   const avatar = session?.data?.user?.image;
        //   console.log(avatar)
        //   // setGAvatar(avatar)
        // }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    })();
  }, []);

  const handleSearch = () => {
    console.log(search);
    router.push(`/search/${search}`);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="h-20 w-screen border-b">
      <div className="h-full w-full bg-[#0B1215] flex justify-evenly items-center">
        <Link
          href={"/home"}
          className="w-52 h-11 justify-start items-start overflow-hidden"
        >
          <div className="w-52 h-11 justify-start items-start overflow-hidden">
            <img src="/logoImage.jpg" alt="logo" className="size-full" />
          </div>
        </Link>
        <div className="h-full w-[70%] flex items-center">
          <div className="w-[50%] flex h-15 rounded justify-center items-center mx-20">
            <div className="w-full text-base border h-9 flex items-center rounded-r bg-[#0B1215] text-white">
              <input
                placeholder="  Search ShoeShack"
                className="w-full text-base bg-[#0B1215] text-white border-none h-full"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleInputKeyDown}
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
                <span>
                {cartItems && cartItems.length > 0 ? cartItems.length : (cartItemLength ? cartItemLength : 0)}
                </span>
              </div>
            </Link>
            <Link
              href={`/profile/${profile?.id}`}
              className="h-14 w-28 rounded-full"
            >
              <div
                className="size-full rounded-full bg-center bg-no-repeat bg-cover"
                style={{
                  backgroundImage: `url(${
                    profile && gAvatar
                      ? gAvatar
                      : "/navAvatar.jpg"
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
