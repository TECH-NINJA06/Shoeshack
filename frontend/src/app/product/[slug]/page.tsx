"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, removeCart, updateCart } from "@/lib/redux/features/slices/cart/cartSlice";
import { IoIosAdd } from "react-icons/io";
import { LuMinus } from "react-icons/lu";
import toast from "react-hot-toast";

interface Product {
  id: string;
  title: string;
  images: string;
  brand: string;
  price: number;
  category: string;
  sizes: number[];
  color: string;
}
interface CartItem {
  id: string;
  title: string;
  image: string;
  brand: string;
  price: number;
  size: number;
  quantity: number;
}
interface RootState {
  cartItems: CartItem[];
}

const Page = ({ params }: { params: { slug: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [cartProduct, setCartProduct] = useState(false);
  const dispatch = useDispatch();

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

  const cartItems = useSelector((state: RootState) => state.cartItems);
  const existingProduct = cartItems && cartItems.find(
    (product) => product.id === params.slug && product.size === selectedSize
  );

  useEffect(() => {
    if (existingProduct) {
      console.log("Product with ID", params.slug, "exists in the store");
      setCartProduct(true);
    } else {
      console.log(
        "Product with ID",
        params.slug,
        "does not exist in the store"
      );
      setCartProduct(false);
    }
  }, [cartItems, existingProduct, params.slug]);

  const handleDivClick = (size: number) => {
    setSelectedSize(size);
    console.log("The selected size is: " + size);
  };

  const handleAddCart = (e: any) => {
    e.preventDefault();

    const item = {
      id: params.slug,
      title: product?.title,
      itemImg: product?.images,
      size: selectedSize,
      brand: product?.brand,
      price: product?.price
    };

    dispatch(addCart(item));
    toast.success("Item added to Cart")
  };
  const handleRemoveCart = (e: any) => { 
    e.preventDefault();
  
    // Find the index of the item in the cartItems array
    const itemIndex = cartItems.findIndex((item) => item.id === params.slug && item.size === selectedSize);
  
    // If itemIndex is not -1, it means the item exists in the cart
    if (itemIndex !== -1) {
      if (cartItems[itemIndex].quantity === 1) {
        const removeItem = {
          id: params.slug,
          size: selectedSize
        }
        dispatch(removeCart(removeItem));
      } else {
        const item = {
          id: params.slug,
          size: selectedSize,
          function: 'subtract'
        };
        dispatch(updateCart(item));
      }
    }
    toast.success("Item removed from cart")
  }; 
  const addUpdateCart = (e: any) => {
    e.preventDefault();
  
    if (selectedSize === null) {
      console.log("Please select a size before adding to cart.");
      return;
    }
  
    const item = {
      id: params.slug,
      title: product?.title,
      itemImg: product?.images,
      size: selectedSize,
      brand: product?.brand,
    };
  
    const existingCartItem = cartItems.find((item) => item.id === params.slug && item.size === selectedSize);
    console.log(existingCartItem);
  
    if (existingCartItem) {
      console.log("Item with selected size already exists in the cart");
      const existItem = {
        id: params.slug,
        size: selectedSize,
        function: "add",
      };
      dispatch(updateCart(existItem));
    } else {
      console.log("Item with selected size not found in the cart, adding new item");
      dispatch(addCart(item));
    }
    toast.success("Item added to Cart")
  };
  

  return (
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
                    {cartProduct ? (
                      <div className="flex justify-evenly items-center h-12 w-20 overflow-hidden rounded-full bg-black text-white font-semibold">
                        <button onClick={handleRemoveCart}>
                          <LuMinus className="text-white font-semibold"/>
                        </button>
                        <span>{existingProduct?.quantity}</span>
                        <button onClick={addUpdateCart}>
                        <IoIosAdd  className="text-white font-semibold"/>
                        </button>
                      </div>
                    ) : (
                      <button
                        className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                        onClick={handleAddCart}
                      >
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />             
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                          Add To Cart
                        </span>
                      </button>
                    )}

                    <Link
                      href={`/cart`}
                      className="text-md font-semibold text-slate-600"
                    >
                      Go to Cart
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
