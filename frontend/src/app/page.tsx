import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen">
      <div className="size-[50%] bg-white rounded-xl flex flex-col gap-10 items-center justify-evenly">
        <h1 className="font-semibold text-xl">New to ShoeShack? Please Login Here</h1>
        <Link href='/login' className="h-14 w-32 flex justify-center items-center"><div className="size-full flex justify-center items-center bg-black text-white rounded-lg text-xl">LOGIN</div></Link>
      </div>     
      </div>
    </>
  );
}
