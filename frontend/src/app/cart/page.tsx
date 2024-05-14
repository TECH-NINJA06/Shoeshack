'use client'
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import { removeCart } from "@/lib/redux/features/slices/cart/cartSlice";
import toast from "react-hot-toast";
import axios from "axios";

interface CartItem {
  _id: string;
  size: number;
  quantity: number;
  product: string | ProductObject;
  productDetails?: ProductObject; // Add productDetails property
}

interface ProductObject {
  _id: string;
  title: string;
  category: string;
  brand: string;
  images: string;
  color: string;
  price: number;
  inventory: number;
  sizes: [];
}

interface RootState {
  cartItems: CartItem[];
}

function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const reduxCartItems = useSelector((state: RootState) => state.cartItems);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/home`);
        console.log("Cart updated", response.data);
        const items = await response.data.user.cart;
        setCartItems(items);
        console.log("Cart items updated", items.length);
      } catch (error) {
        console.error("Error fetching user cart", error);
      }
    };

    fetchData();
  }, []);
  async function fetchProductDetails(productId: string) {
    try {
      const response = await axios.get(`/api/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching product details for product ID ${productId}`,
        error
      );
      return null;
    }
  }

  useEffect(() => {
    const fetchCartItemsWithProductDetails = async (cartItems: CartItem[]) => {
      const updatedCartItems: CartItem[] = [];
      for (const cartItem of cartItems) {
        console.log(cartItem);
        let productDetails: ProductObject | undefined;
        if (typeof cartItem.product === 'string') {
          // If product is a string, fetch product details using the ID
          productDetails = await fetchProductDetails(cartItem.product);
        } else {
          // If product is an object, use it directly
          productDetails = cartItem.product as ProductObject;
        }
        if (productDetails) {
          const updatedCartItem = {
            ...cartItem,
            productDetails: productDetails,
          };
          updatedCartItems.push(updatedCartItem);
        }
      }
      return updatedCartItems;
    };

    const updateCartItems = async () => {
      try {
        const cartItemsWithProductDetails = await fetchCartItemsWithProductDetails(cartItems);
        setCartItems(cartItemsWithProductDetails);
        console.log("Updated cart", cartItemsWithProductDetails);
      } catch (error) {
        console.error("Error fetching cart items with product details", error);
      }
    };

    updateCartItems();
  }, [cartItems]);

  const calculateTotalPrice = () => {
    if (cartItems.length === 0) {
      return 0;
    }
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += (item.productDetails?.price || 0) * item.quantity;
    });
    return totalPrice;
  };

  const handleDeleteCart = async (productId: string, productSize: number) => {
    try {
      // Dispatch the removeCart action with the product ID and size
      await dispatch(removeCart({ id: productId, size: productSize }));
      // After successful removal, fetch updated cart items from the server
      const response = await axios.get(`/api/home`);
      console.log("Cart updated", response.data);
      const items = await response.data.user.cart;
      // Update the local state with the updated cart items
      setCartItems(items);
      console.log("Cart items updated", items.length);
    } catch (error) {
      console.error("Error deleting cart item", error);
    }
  };
  
  async function handleCheckout() {
    if (cartItems.length === 0) {
      toast.error("Please select a product");
      return;
    }
    const response = await axios.post("/api/checkout", {
      items: cartItems,
    });
    router.push(`${response.data.session_url}`);
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
              const productTitle = cartItem.productDetails
                ? cartItem.productDetails.title
                : '';
              const truncatedTitle =
                productTitle.length > 8
                  ? productTitle.substring(0, 8) + "..."
                  : productTitle;
              return (
                <div
                  className="w-full h-[45%] flex gap-4 items-center justify-between border-b"
                  key={cartItem.productDetails?._id}
                >
                  <div className="h-full w-[40%]  flex gap-16 items-center px-2">
                    <button onClick={() => handleDeleteCart(cartItem?.productDetails?._id || '', cartItem.size)}>
                      <RiDeleteBin5Line className="text-white" />
                    </button>
                    <Link
                      href={`/product/${cartItem.productDetails?._id}`}
                      className="h-[95%] w-52 flex justify-center items-center"
                    >
                      <div className="size-full flex justify-center items-center overflow-hidden">
                        <img
                          src={cartItem.productDetails?.images}
                          alt="item_Img"
                          className="size-full max-h-full"
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="h-full w-[53%] flex items-center gap-2">
                    <p>{truncatedTitle}</p>
                    <p className="pl-10">{cartItem.size}</p>
                    <p className="px-16">{cartItem.quantity}</p>
                    <p className="pl-4">{cartItem.productDetails?.price}</p>
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
