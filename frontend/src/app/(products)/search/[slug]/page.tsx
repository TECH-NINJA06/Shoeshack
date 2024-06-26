"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { ProductItem } from "../../../components/Search/Product";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import { Provider } from "react-redux";
// import { store } from "@/lib/redux/store";

interface Product {
  _id: string;
  title: string;
  category: string;
  brand: string;
  images: string;
}

function Page({ params }: { params: { slug: string } }) {
  const [results, setResults] = useState<Product[]>([]);

  const result = params.slug;
  let slug = params.slug.replace("%20", " ");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(result);
        const response = await axios.get(`/api/search/${result}`);
        setResults(response.data);
        console.log("Products found:", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProduct();
  }, [params.slug]);
  return (
    <div className="text-white w-screen">
      <Navbar />
      <div className="mt-7 flex flex-col gap-5">
        <Link href={"/home"} className="mx-2">
          &#8592; Back To Home
        </Link>
        <h1 className="text-2xl font-bold border-b mx-5">
          Search results for: {slug}
        </h1>
        <div className="w-full px-10 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results?.map((product) => {
            const productTitle = product ? product?.title : "";
            const truncatedTitle =
              productTitle.length > 20
                ? productTitle.substring(0, 20) + "..."
                : productTitle;
            return (
              <div
                className="flex justify-center items-center sm:w-full"
                key={product?.title}
              >
                <ProductItem
                  title={truncatedTitle}
                  desc={product?.category}
                  brand={product?.brand}
                  image={product?.images}
                  productLink={product._id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Page;
