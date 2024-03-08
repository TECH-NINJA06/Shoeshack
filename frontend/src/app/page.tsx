import Image from "next/image";
import { HeroCarousal } from "../components/HeroCarousal";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="h-[90vh] w-full">
        <HeroCarousal />
      </div>     
    </div>
  );
}
