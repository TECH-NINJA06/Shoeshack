import { HeroCarousal } from "../../components/HeroCarousal";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen w-screen overflow-y-scroll">
        <div className="h-[90vh] w-full">
          <HeroCarousal />
          <div className="h-screen w-screen mt-40 flex flex-col justify-between items-center px-10 text-white">
            <div className="h-[10%] w-full text-4xl font-semibold"><h2>Check Out our Products</h2></div>
            <div className="h-[88%] w-full bg-white">
              
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}
