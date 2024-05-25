'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { dbCartUpdate } from "@/lib/redux/features/slices/cart/cartSlice";
import { getUserProfile } from "@/lib/redux/features/actions/profile.actions";
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


  // useEffect(() => {
  //   dispatch(getUserProfile());
  // }, []);




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
        <div className="sm:h-[90vh] sm:w-[30%] w-[70%] flex flex-col gap-5 py-5 border-2 h-auto">
          <div className="w-full h-[40%] flex flex-col justify-evenly items-center">
            <div className="sm:size-28 size-20 rounded-full">
              <img
                src="/navAvatar.jpg"
                alt="hola"
                className="size-full rounded-full"
              />
            </div>
            <div className="w-full h-14 flex justify-center items-center text-white font-semibold text-center">
              {profile?.fullName}
            </div>
          </div>
          <div className="w-full h-[55%] flex flex-col sm:gap-5 gap-2 items-center pb-5 sm:px-0 px-2">
            <div className="w-full sm:h-20 h-16 flex sm:justify-center justify-between items-center sm:gap-5">
              <div className="sm:h-14 h-10 sm:w-32 w-24 bg-white rounded">
                <button
                  onClick={() => {
                    router.push(`/avatarChange`);
                  }}
                  className="size-full font-bold text-xs sm:text-lg"
                >
                  Change Avatar
                </button>
              </div>
              <div className="sm:h-14 h-10 sm:w-32 w-24 bg-white rounded">
                <button
                  onClick={handleLogout}
                  className="size-full font-bold text-xs sm:text-lg"
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="w-full sm:h-20 h-16 flex justify-center items-center gap-5">
              <div className="sm:h-14 h-10 sm:w-32 w-24 bg-white rounded">
                <button
                  onClick={() => {
                    router.push(`/cart`);
                  }}
                  className="size-full font-bold text-xs sm:text-lg"
                >
                  Cart
                </button>
              </div>
              <div className="sm:h-14 h-10 sm:w-32 w-24 bg-white rounded">
                <button
                  onClick={()=>{router.push('/orders')}}
                  className="size-full font-bold text-xs sm:text-lg"
                >
                  My Orders
                </button>
              </div>
            </div>
            <div className="w-full sm:h-20 h-16 flex justify-center items-center gap-5">
              <div className="sm:h-14 h-10 sm:w-32 w-24 bg-white rounded">
                <button
                  onClick={() => {
                    router.push(`/home`);
                  }}
                  className="size-full font-bold text-xs sm:text-lg"
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