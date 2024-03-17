import { HeroCarousal } from "../../components/HeroCarousal";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="h-[90vh] w-full">
          <HeroCarousal />
        </div>
      </div>
    </>
  );
}
