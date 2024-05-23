'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="sm:size-[50%] h-[30%] w-[50%] bg-white rounded-xl flex flex-col sm:gap-10 gap-3 items-center justify-evenly">
        <h1 className="font-semibold sm:text-xl text-lg text-center">
          New to ShoeShack? Please Login Here
        </h1>
        <button
          onClick={ () =>{router.push('/login')}}
          className="sm:h-14 sm:w-32 h-10 w-24 flex justify-center items-center bg-black text-white rounded-lg sm:text-xl text-base"
        >
            LOGIN
        </button>
      </div>
    </div>
  );
}
