"use client";
import React, { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/signup", {
        fullName,
        email,
        password,
      });
      console.log(response.data);
      if (response.status === 200) {
        const data = await response.data;
        const token = data.token;
        console.log(token);

        const id = data.id;
        const fullname = data.fullname;

        toast.success("Signup successful");

        router.push(`/profile/${id}`);
        console.log(
          `"fullName" ${fullName}, "email" ${email}, "password" ${password}`
        );
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="max-h-screen h-screen w-screen flex justify-center items-center bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url("./authBG.jpg")`,
        filter: "grayscale(100%)",
      }}
    >
      <div className="sm:h-[80%] sm:w-[30%] z-50 flex justify-center items-center rounded-md backdrop-blur-[4px] border border-white">
        <div className="h-full w-full mx-5 flex flex-col justify-evenly pb-3">
          <div className="h-20 w-full flex justify-center items-center font-semibold text-3xl text-[#0B1215]">
            <h1>{loading ? "Loading" : "SIGNUP"}</h1>
          </div>
          <div className="h-[75%] w-full bg-white rounded py-4 sm:py-0">
            <div className="flex items-center flex-col sm:mt-7 justify-between">
              <div className="flex flex-col justify-center">
                <h6 className="text-black font-bold">Full Name: </h6>
                <input
                  type="text"
                  name="username"
                  className="rounded-r-md bg-transparent text-black placeholder:text-black border"
                  placeholder="Enter your Name"
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col justify-center mt-7">
                <h6 className="text-black font-bold">Email: </h6>
                <input
                  type="text"
                  name="email"
                  className="rounded-r-md bg-transparent text-black placeholder:text-black border"
                  placeholder="Enter your Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col justify-center gap-1 mt-7 mb-10">
                <h6 className="text-black font-bold">Password: </h6>
                <input
                  type="password"
                  name="password"
                  className="rounded-r-md bg-transparent text-black placeholder:text-black border"
                  placeholder="Enter your Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="h-10 w-36 bg-black text-white flex justify-center items-center rounded-md">
                <button className="h-full w-full" onClick={handleSubmit}>
                  Signup
                </button>
              </div>
              <div className="h-10 w-full flex justify-center items-center mt-10 text-black">
                <p className="text-[#0B1215]">
                  Already have an account? <Link href="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
