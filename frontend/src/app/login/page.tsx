"use client";
import React, { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/auth/login`,{
        email,
        password
      })
      if (response.status === 200) {
        const data = response.data;
        const token = data.token;
        console.log(token);

        const id = data.id;
        const fullname = data.fullName;
        toast.success("Login successful");
        router.push(`/profile?id=${id}&name=${fullname}`);
      }
      console.log(`"email" ${email}, "password" ${password}`);
    } catch (error) {
      console.log(error);
      toast.error("Error while loggin in");
      setLoading(false)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className=" h-[100vh] w-[100vw] relative">
      <img
        src="./authBG.jpg"
        alt="bgimage"
        className="h-full -z-50 grayscale w-full"
      />
      <div className=" h-[80%] w-[30%] z-50  flex justify-center items-center absolute top-[5%] left-[35%] rounded-md backdrop-blur-[4px] border border-white">
        <div className="h-full w-full mx-5 flex flex-col justify-evenly">
          <div className=" h-20 w-full flex justify-center items-center font-semibold text-3xl text-[#0B1215]">
            <h1>{loading? "Loading": "LOGIN"}</h1>
          </div>
          <div className="h-[75%] w-full bg-white rounded">
            <div className="flex items-center flex-col pap-5 mt-7 justify-between">
              <div className="flex justify-center items-center gap-10">
                <h6 className="text-black font-bold">Email: </h6>
                <input
                  type="text"
                  name="email"
                  className=" rounded-r-md bg-transparent text-black placeholder:text-black "
                  placeholder="Enter your Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="flex justify-center items-center gap-1 mt-7 mb-10">
                <h6 className="text-black font-bold ">Password: </h6>
                <input
                  type="password"
                  name="password"
                  className=" rounded-r-md bg-transparent text-black placeholder:text-black "
                  placeholder="Enter your Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="h-10 w-36 bg-black text-white flex justify-center items-center rounded-md">
                <button className="h-full w-full" onClick={handleSubmit}>
                  Login
                </button>
              </div>
              <div className="h-10 w-40 bg-[#0B1215] flex justify-center items-center rounded-md mt-10">
                <button
                  className="h-full w-full border flex justify-center items-center gap-1 border-slate-700 rounded-lg text-slate-200 hover:border-slate-500 hover:text-slate-300 hover:shadow transition duration-150"
                  onClick={() => signIn("google")}
                >
                  <img
                    className="w-6 h-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                  <span className="font-medium text-sm justify-center text-white">
                    Login with Google
                  </span>
                </button>
              </div>
              <div className="h-10 w-full flex justify-center items-center mt-20 text-black">
                <p className=" text-[#0B1215]">
                  New to ShoeShack? <Link href="/signup">Signup</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
