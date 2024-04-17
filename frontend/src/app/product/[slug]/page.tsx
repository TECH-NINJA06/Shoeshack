"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/lib/redux/store";
import { addCart } from "@/lib/redux/features/slices/cart/cartSlice";


interface Product {
  title: string;
  images: string;
  brand: string;
  price: number;
  category: string;
  sizes: number[];
  color: string;
}

const Page = ({ params }: { params: { slug: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = params.slug;
        const response = await axios.get(`/api/product/${result}`);
        setProduct(response.data);
        console.log("Product found:", response.data); // Log the updated product
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [params.slug]);

  const handleDivClick = (size: number) => {
    setSelectedSize(size);
    console.log("The selected size is: " + size);
  };

  const handleCart = () => {
    const dispatch = useDispatch();

    const item = {
      id: params.slug,
      title: product?.title,
      itemImg: product?.images,
      size: selectedSize,
      brand: product?.brand
    }

    dispatch(addCart(item));
  }

  return (
    <Provider store={store}>
      <div className="h-screen w-screen bg-slate-100 bg-center flex flex-col justify-center items-center">
        <div className=" w-[90%] h-[80%] bg-white rounded-lg grayscale-0">
          <div className="flex justify-center items-center gap-10 h-full w-full">
            <div className="flex flex-col justify-center w-[45%] h-full text-black">
              <div className="h-[65%] w-full flex justify-center items-center">
                <img
                  src={product?.images}
                  alt="product_image"
                  className="size-auto max-h-full max-w-full"
                />
              </div>
            </div>
            <div className="flex flex-col w-[40%] min-h-full items-center justify-evenly overflow-hidden ">
              {product && (
                <div className="flex flex-col gap-5">
                  <h2 className="text-center text-slate-700 font-bold">
                    {product.brand}
                  </h2>
                  <h1 className="text-[#0B1215] font-bold text-2xl text-center">
                    {product.title}
                  </h1>
                  <p className="text-slate-500 font-bold text-4xl text-center leading-[7.5rem] underline">
                    ₹ {product.price}
                  </p>
                  <p className="text-center text-slate-700 font-bold">
                    color: {product.color}, category: {product.category}
                  </p>
                  <div id="productSize" className="mx-2">
                    <h2 className="text-[#0B1215] font-bold text-xl text-center">
                      Select Size
                    </h2>
                    <div className="flex gap-7 items-center mt-5 justify-center">
                      {product.sizes.map((size) => {
                        return (
                          <div
                            key={size}
                            className={`hover:bg-gray-300 flex items-center justify-center rounded-xl w-10 cursor-pointer ${
                              size === selectedSize ? "bg-slate-400" : ""
                            }`}
                            onClick={() => handleDivClick(size)}
                          >
                            {size}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-center items-center mt-10 gap-5">
                      <button
                        className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                        onClick={handleCart}
                      >
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                          Add To Cart
                        </span>
                      </button>
                      <Link
                        href={`/search/${product.brand}`}
                        className="text-md font-semibold text-slate-600"
                      >
                        &#8592; Back To Search
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default Page;
