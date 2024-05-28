"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { HeroCarousal } from "../../../components/HeroCarousal";
import Navbar from "@/components/Navbar";
import { ProductItem } from "../../components/Search/Product";
import { useDispatch } from "react-redux";
import { dbCartUpdate } from "@/lib/redux/features/slices/cart/cartSlice";
import Footer from "@/components/Footer";

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
        dispatch(dbCartUpdate(response.data.cart));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center w-screen overflow-y-scroll overflow-x-hidden">
        <div className="h-[90vh] w-full">
          <div className="w-full flex justify-center items-center mt-5">
            <HeroCarousal />
          </div>

          <div className="h-screen w-screen sm:mt-40 mt-14 flex flex-col justify-between items-center px-10 text-white">
            <div className="h-[10%] w-full md:text-4xl sm:text-3xl text-xl md:leading-[0] leading-6 font-semibold">
              <h2>Check Out our Products</h2>
            </div>
            <div className="h-[88%] sm:w-full md:grid lg:grid-cols-3 md:grid-cols-2 sm:flex sm:flex-col sm:items-center">
              {results?.map((product) => {
                const productTitle = product ? product?.title : "";
                const truncatedTitle =
                  productTitle.length > 20
                    ? productTitle.substring(0, 20) + "..."
                    : productTitle;
                return (
                  <ProductItem
                    key={product._id}
                    title={truncatedTitle}
                    desc={product.category}
                    brand={product.brand}
                    image={product.images}
                    productLink={product._id}
                  />
                );
              })}
              <Footer />
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
  );
}
