'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Define an interface representing the structure of a profile
interface Profile {
  fullName: string;
  // Add other properties as needed
}

const Page = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null); // Use the Profile interface as the type
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    (async () => {
      console.log(id);
     const response = await axios.get(`/api/auth/profile`);
     setProfile(response.data)
     console.log("Profile updated" + response.data);
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
      <div className="flex justify-center items-center h-[100vh] w-screen">
        <div className="h-[90vh] w-[30%] flex flex-col gap-5 py-5 border-2">
          <div className="w-full h-[40%] flex flex-col justify-evenly items-center">
            <div className="size-28 rounded-full">
              <img
                src="/navAvatar.jpg"
                alt="hola"
                className="size-full rounded-full"
              />
            </div>
            <div className="w-full h-14 flex justify-center items-center text-white font-semibold ">
              {profile?.fullName}
            </div>
          </div>
          <div className="w-full h-[55%] flex flex-col gap-5 items-center pb-5">
            <div className="w-full h-20 flex justify-center items-center gap-5">
              <div className="h-14 w-32 bg-white rounded">
                <button
                  onClick={() => {
                    router.push(`/avatarChange`);
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
            <div className="w-full h-20 flex justify-center items-center gap-5">
              <div className="h-14 w-32 bg-white rounded">
                <button
                  onClick={() => {
                    router.push(`/home`);
                  }}
                  className="size-full font-semibold"
                >
                  Home
                </button>
              </div>
              {/* <div className="h-14 w-32 bg-white rounded">
                <button
                  onClick={()=>{router.push('/search')}}
                  className="size-full font-semibold"
                >
                  Search
                </button>
              </div> */}
            </div>
          </div>
        </div>
        {/* <div className="h-full w-[55%] bg-red-500"></div> */}
      </div>
    </div>
  );
};

export default Page;
