"use client";
import Navbar from "@/components/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

const page = () => {
  const router = useRouter();
  const [profile, setProfile] = useState({});
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  useEffect(() => {
    (async () => {
      const token = Cookies.get("token");
      if (!token) {
        console.log("Unauthorized Request");
      }
      const response = await fetch(`/api/auth/profile`, {
        headers: JSON.stringify({
          Authorization: `Bearer ${token}`,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProfile(data);
      console.log(data);
    })();
  }, []);


  const handleLogout = () => {
    axios.post(`/api/auth/logout`).then((response) => {
      if (response.status === 200) {
      router.push('/login');
      }
    }).catch((err)=>{
      console.log("Error at logout"+ err)
    })
  };

  return (
    <div className="h-screen max-w-screen">
      {/* <Navbar /> */}
      <div className="flex justify-between items-center h-[100vh] w-screen">
        <div className="h-[90vh] w-[30%] flex flex-col gap-5 py-5 border">
          <div className="w-full h-[40%] flex justify-center items-center">
            <div className="size-28 rounded-full">
              <img
                src="/navAvatar.jpg"
                alt="hola"
                className="size-full rounded-full"
              />
            </div>
          </div>
          <div className="w-full h-[55%] flex flex-col gap-5 items-center pb-5">
            <div className="w-full h-20 flex justify-center items-center gap-5">
              <div className="h-14 w-32 bg-white rounded">
                <button
                  onClick={() => {
                    router.push(`/avatar`);
                  }}
                  className="size-full font-semibold"
                >
                  Change Avatar
                </button>
              </div>
              <div className="h-14 w-32 bg-white rounded">
                <button
                  onClick={handleLogout}
                  className="size-full font-semibold"
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="w-full h-20 flex justify-center items-center gap-5">
              <div className="h-14 w-32 bg-white rounded">
                <button
                  onClick={() => {
                    router.push(`/cart`);
                  }}
                  className="size-full font-semibold"
                >
                  Cart
                </button>
              </div>
              <div className="h-14 w-32 bg-white rounded">
                <button
                  onClick={()=>{router.push('/orders')}}
                  className="size-full font-semibold"
                >
                  My Orders
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-[55%] bg-red-500"></div>
      </div>
    </div>
  );
};

export default page;
