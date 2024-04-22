"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ProductItem } from "../../components/Search/Product";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";

interface Product {
  _id: string;
  title: string;
  category: string;
  brand: string;
  images: string;
  // Add other properties as needed
}

function Page({ params }: { params: { slug: string } }) {
  const [results, setResults] = useState<Product[]>([]);
  // const searchParams = useSearchParams()
  // const result = searchParams.get('q')
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = params.slug;
        console.log(result);
        const response = await axios.get(`/api/search/${result}`);
        setResults(response.data);
        console.log("Products found:", response.data); // Log the updated product
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProduct();
  }, [params.slug]);
  return (
    <Provider store={store}>
      <div className="text-white">
        <Navbar />
        <div className="mt-7 flex flex-col gap-5">
          <Link href={"/home"} className="mx-2">&#8592; Back To Home</Link>
        <h1 className="text-2xl font-bold border-b mx-5">Search results for: {params.slug}</h1>
        <div className="w-full h-auto grid grid-cols-4 px-10 mt-5">
          {results?.map((product) => {
            return (
              <ProductItem
                key={product?.title}
                title={product?.title}
                desc={product?.category}
                brand={product?.brand}
                image={product?.images}
                productLink={product._id}
              />
            );
          })}
        </div>
        </div>
        
      </div>
    </Provider>
  );
}

export default Page;
