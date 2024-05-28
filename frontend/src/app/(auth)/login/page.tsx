"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function LoginPage() {
  const session = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);


  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/auth/login`, {
        email,
        password,
      });
      console.log(response);
      const data = response.data;
      if (response.status === 200) {
        const token = data.token;
        console.log(token);

        const id = data.id;
        const fullname = data.fullName;
        toast.success("Login successful");
        router.push(`/home`);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Please check details");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // //Google login
  // async function handleGoogleLogin() {
  //   signIn("google");
  //   if (session.status === "loading") {
  //     setLoading(true);
  //     console.log("Loading...");
  //   } else if (session.status === "authenticated") {
  //     console.log(session); //session contains only email, image and name

  //     const fullName = session?.data?.user?.name;
  //     const email = session?.data?.user?.email;
  //     const id = session?.data?.user?.name;
  //     const response = await axios.post(`/api/auth/googleLogin`, {
  //       fullName,
  //       email,
  //     });
  //     const data = response.data;

  //     if (response.status === 200) {
  //       const token = data.token;
  //       console.log(token);

  //       const id = data.id;
  //       const fullname = data.fullName;
  //       toast.success("Login successful");
  //       router.push(`/profile/${id}`);
  //       setButtonClicked(false);
  //       setLoading(false);
  //     }
  //   } else if (session.status === "unauthenticated") {
  //     setLoading(false);
  //     setButtonClicked(false);
  //   } else {
  //     setLoading(false);
  //     setButtonClicked(false);
  //   }
  // }

  return (
    <div className="max-h-screen h-screen w-screen flex justify-center items-center bg-center bg-cover bg-no-repeat" style={{backgroundImage: `url("./authBG.jpg")`, filter:'grayscale(100%)' }}>
      {/* <img
        src="./authBG.jpg"
        alt="bgimage"
        className="h-full w-full absolute top-0 left-0 -z-50 grayscale object-cover"
      /> */}
      <div className="sm:h-[80%] sm:w-[30%] z-50 flex justify-center items-center rounded-md backdrop-blur-[4px] border border-white">
        <div className="h-full w-full mx-5 flex flex-col justify-evenly pb-3">
          <div className=" h-20 w-full flex justify-center items-center font-semibold text-3xl text-[#0B1215]">
            <h1>{loading ? "Loading" : "LOGIN"}</h1>
          </div>
          <div className="h-[75%] w-full bg-white rounded py-4 sm:py-0">
            <div className="flex items-center flex-col sm:mt-7 justify-between">
              <div className="flex flex-col justify-center">
                <h6 className="text-black font-bold">Email: </h6>
                <input
                  type="text"
                  name="email"
                  className=" rounded-r-md bg-transparent text-black placeholder:text-black border"
                  placeholder="Enter your Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col justify-center gap-1 mt-7 mb-10">
                <h6 className="text-black font-bold ">Password: </h6>
                <input
                  type="password"
                  name="password"
                  className=" rounded-r-md bg-transparent text-black placeholder:text-black border"
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
              {/* <div className="h-10 w-40 bg-[#0B1215] flex justify-center items-center rounded-md mt-10">
                <button
                  className="h-full w-full border flex justify-center items-center gap-1 border-slate-700 rounded-lg text-slate-200 hover:border-slate-500 hover:text-slate-300 hover:shadow transition duration-150"
                  onClick={handleGoogleLogin}
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
              </div> */}
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
