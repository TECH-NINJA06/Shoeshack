"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { HeroCarousal } from "../../../components/HeroCarousal";
import Navbar from "@/components/Navbar";
import { ProductItem } from "../../components/Search/Product";
import { useDispatch } from "react-redux";
import { dbCartUpdate } from "@/lib/redux/features/slices/cart/cartSlice";

interface Product {
  _id: string;
  title: string;
  category: string;
  brand: string;
  images: string;
}

export default function Home() {
  const dispatch = useDispatch();
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
  //Redux cart update
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/cart");
        console.log("Redux Cart updated", response.data);
        dispatch(dbCartUpdate(response.data.cart))
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
            <div className="h-[88%] w-full md:grid lg:grid-cols-3 md:grid-cols-2 sm:flex sm:flex-col sm:items-center md:pl-28">
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
