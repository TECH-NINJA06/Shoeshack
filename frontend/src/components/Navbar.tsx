"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { dbCartUpdate } from "@/lib/redux/features/slices/cart/cartSlice";

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
  const dispatch = useDispatch();
  // const session = useSession();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [gAvatar, setGAvatar] = useState(null);
  const [cartItemLength, setCartItemLength] = useState(0);

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
  //Redux cart update
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/cart");
        console.log("Redux Cart updated", response.data);
        dispatch(dbCartUpdate(response.data.cart));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const cartItems = useSelector((state: RootState) => state.cartItems);

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
    <div className="h-32 sm:h-20 w-screen border-b overflow-y-scroll flex flex-col justify-center items-center">
      <div className="h-20 w-full bg-[#0B1215] flex justify-evenly items-center">
        <Link
          href={"/home"}
          className="w-52 h-11 justify-start items-start overflow-hidden"
        >
          <div className="w-52 h-11 justify-start items-start overflow-hidden">
            <img src="/logoImage.jpg" alt="logo" className="size-full" />
          </div>
        </Link>
        <div className="h-full w-[70%] sm:flex hidden items-center">
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
        <div className="h-full sm:w-28 flex justify-end items-end sm:pr-0 pr-2">
          <div className="h-full w-full flex justify-center items-center gap-3 text-white">
            <Link href="/cart" className="sm:size-full h-full w-5">
              <div className="h-[90%] sm:w-full w-9 flex justify-center items-center pt-3">
                <IoCartOutline className="size-[80%]" />
                <span>{cartItems.length}</span>
              </div>
            </Link>
            <Link
              href={`/profile/${profile?.id}`}
              className="sm:h-14 sm:w-28 h-9 w-9 rounded-full"
            >
              <div
                className="size-full rounded-full bg-center bg-no-repeat bg-cover"
                style={{
                  backgroundImage: `url(${
                    profile && gAvatar ? gAvatar : "/navAvatar.jpg"
                  })`,
                }}
              ></div>
            </Link>
          </div>
        </div>
      </div>
      <div className="sm:hidden w-full h-10">
        <div className="h-full w-full flex items-center pl-6">
          <div className="w-[90%] flex h-15 border rounded-md justify-center items-center">
            <div className="w-full text-base h-9 flex items-center rounded-md bg-[#0B1215] text-white">
              <input
                placeholder="  Search ShoeShack"
                className="w-full text-base bg-[#0B1215] text-white border-none h-[90%]"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleInputKeyDown}
              />
            </div>
            <div className="search-icon w-9 h-9 rounded-full ml-2 flex justify-center items-center">
              <FaSearch className="text-white " onClick={handleSearch} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
