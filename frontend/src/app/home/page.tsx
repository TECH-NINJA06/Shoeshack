"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { HeroCarousal } from "../../components/HeroCarousal";
import Navbar from "@/components/Navbar";
import { ProductItem } from "../components/Search/Product";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";

// Define an interface representing the structure of a product
interface Product {
  _id: string;
  title: string;
  category: string;
  brand: string;
  images: string;
}

export default function Home() {
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/homeProducts");
        setResults(response.data);
        console.log("Home updated", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen w-screen overflow-y-scroll overflow-x-hidden">
        <div className="h-[90vh] w-full">
          <HeroCarousal />
          <div className="h-screen w-screen mt-40 flex flex-col justify-between items-center px-10 text-white">
            <div className="h-[10%] w-full md:text-4xl sm:text-3xl md:leading-[0] leading-6 font-semibold">
              <h2>Check Out our Products</h2>
            </div>
            <div className="h-[88%] w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 md:pl-28">
              {results?.map((product) => (
                <ProductItem
                  key={product._id}
                  title={product.title}
                  desc={product.category}
                  brand={product.brand}
                  image={product.images}
                  productLink={product._id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
