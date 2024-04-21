"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

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

const page = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cartItems);

  const calculateTotalPrice = () => {
    if (cartItems.length === 0) {
      return 0;
    }
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  return (
    <div className="size-full">
      <Navbar />
      <div className="w-full h-[90vh] px-20 text-white flex justify-center items-center">
        <div className="h-full w-[60%] border-r border-white flex flex-col justify-center items-center">
          <div className="w-full h-20 flex items-center border-b border-white">
            <h1 className="font-semibold text-xl">Shopping Cart</h1>
          </div>
          <div className="w-full h-20 flex justify-between items-center border-b border-white">
            <p className="text-slate-300"></p>
          </div>
        </div>
        <div className="h-full w-[40%] flex flex-col justify-center items-center px-10">
          <div className="w-full h-20 flex items-center border-b border-white">
            <h1 className="font-semibold text-xl">Cart Total</h1>
          </div>
          <div className="w-full h-20 flex justify-between items-center border-b border-white">
            <h4>SubTotal</h4>
            <p className="text-slate-300">₹{calculateTotalPrice()}</p>
          </div>
          <div className="w-full h-20 flex justify-between items-center border-b border-white">
            <h4>Shipping</h4>
            <p className="text-slate-300">free shipping</p>
          </div>
          <div className="w-full h-20 flex justify-between items-center border-b border-white">
            <h4>Total</h4>
            <p className="text-slate-300">₹{calculateTotalPrice()}</p>
          </div>
          <Link
            href={"/checkout"}
            className="w-full h-14 rounded flex justify-between items-center mt-20 bg-white"
          >
            <div className="size-full flex items-center justify-center text-[#0B1215] font-semibold">
              Proceed to Checkout
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
