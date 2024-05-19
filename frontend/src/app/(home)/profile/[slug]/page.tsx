'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { dbCartUpdate } from "@/lib/redux/features/slices/cart/cartSlice";
// import { dbCartUpdate } from "@/lib/redux/features/slices/cart/cartSlice";

// Define an interface representing the structure of a profile
interface Profile {
  fullName: string;
  // Add other properties as needed
}

const Page = () => {
  const session = useSession()
  const dispatch = useDispatch()
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [cart, setCart] = useState([])

  useEffect(() => {
    (async () => {
     const response = await axios.get(`/api/auth/profile`);
     setProfile(response.data)
     console.log("Profile updated" + response.data);
     console.log(session)
    })();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/cart");
        setCart(response.data);
        console.log("Redux Cart updated", response.data);
        dispatch(dbCartUpdate(response.data.cart))
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`/api/auth/logout`);
      // signOut();
      router.push('/login');
    } catch (error) {
      console.error("Error at logout:", error);
    }
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

export default Page