"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import { removeCart } from "@/lib/redux/features/slices/cart/cartSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface CartItem {
  id: string;
  title: string;
  itemImg: string;
  brand: string;
  price: number;
  size: number;
  quantity: number;
}
interface RootState {
  cartItems: CartItem[];
}

function Page() {
  const router = useRouter()
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cartItems);
  console.log(cartItems);

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

  const handleDeleteCart = (productId: string) => {
    dispatch(removeCart(productId));
  };

  function handleCheckout() {
    if (cartItems.length === 0) {
      toast.error("Please select a product");
    }
    router.push('/checkout');
  }

  return (
    <div className="size-full">
      <Navbar />
      <div className="w-full h-[90vh] px-20 text-white flex justify-center items-center">
        <div className="h-full w-[60%] border-r border-white flex flex-col justify-center items-center px-10">
          <div className="w-full h-20 flex items-center border-b border-white">
            <h1 className="font-semibold text-xl">Shopping Cart</h1>
          </div>
          <div className="w-full h-20 flex justify-end gap-10 items-center border-b border-white pr-14">
            <p className="text-slate-300">Product</p>
            <p className="text-slate-300">Size</p>
            <p className="text-slate-300">Quantity</p>
            <p className="text-slate-300">SubTotal</p>
          </div>
          <div className="w-full h-72 overflow-y-scroll flex flex-col items-center border-b border-white pr-10 my-5 gap-2">
            {cartItems.map((cartItem) => {
              const truncatedTitle =
                cartItem.title.length > 8
                  ? cartItem.title.substring(0, 8) + "..."
                  : cartItem.title;
              return (
                <div
                  className="w-full h-[45%] flex gap-4 items-center justify-between border-b"
                  key={cartItem.id}
                >
                  <div className="h-full w-[40%]  flex gap-16 items-center px-2">
                    <button onClick={() => handleDeleteCart(cartItem.id)}>
                      <RiDeleteBin5Line className="text-white" />
                    </button>
                    <Link href={`/product/${cartItem.id}`} className="h-[95%] w-52 flex justify-center items-center">
                      <div className="size-full flex justify-center items-center">
                      <img
                        src={cartItem.itemImg}
                        alt="item_Img"
                        className="size-auto max-h-full"
                      />
                    </div>
                    </Link>
                  </div>
                  <div className="h-full w-[53%] flex items-center gap-2">
                    <p>{truncatedTitle}</p>
                    <p className="pl-10">{cartItem.size}</p>
                    <p className="px-16">{cartItem.quantity}</p>
                    <p className="pl-4">{cartItem.price}</p>
                  </div>
                </div>
              );
            })}
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
          <button
            onClick={handleCheckout}
            className="w-full h-14 rounded flex justify-between items-center mt-20 bg-white"
          >
            <div className="size-full flex items-center justify-center text-[#0B1215] font-semibold">
              Proceed to Checkout
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
