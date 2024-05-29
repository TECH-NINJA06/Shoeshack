'use client'
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import { dbCartUpdate, removeCart } from "@/lib/redux/features/slices/cart/cartSlice";
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
  const [updatedCartItems, setUpdatedCartItems] = useState<CartItem[]>([]);

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
  }, [cartItems]);
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
        const cartItemsWithProductDetails = await fetchCartItemsWithProductDetails(reduxCartItems);
        setUpdatedCartItems(cartItemsWithProductDetails);
        console.log("Updated cart", cartItemsWithProductDetails);
      } catch (error) {
        console.error("Error fetching cart items with product details", error);
      }
    };

    updateCartItems();
  }, [cartItems]);

  const calculateTotalPrice = () => {
    if (updatedCartItems.length === 0) {
      return 0;
    }
    let totalPrice = 0;
    updatedCartItems.forEach((item) => {
      totalPrice += (item.productDetails?.price || 0) * item.quantity;
    });
    return totalPrice;
  };

  const handleDeleteCart = async (productId: string, productSize: number) => {
    try {
      const delItems = {
        productId: productId,
        size: productSize
      }
      // Dispatch the removeCart action with the product ID and size
      dispatch(removeCart(delItems));
      // After successful removal, fetch updated cart items from the server
      const response = await axios.get(`/api/cart`);
      console.log("Cart updated", response.data.cart);
      const items = await response.data.cart;
      // Update the local state with the updated cart items
      setCartItems(items);
      console.log("Cart items updated", items.length);
    } catch (error) {
      console.error("Error deleting cart item", error);
    }
  };
  
  async function handleCheckout() {
    if (updatedCartItems.length === 0) {
      toast.error("Please select a product");
      return;
    }
    const response = await axios.post("/api/checkout", {
      items: updatedCartItems,
    });
    router.push(`${response.data.session_url}`);
  }

  return (
    <div className="">
      <Navbar />
      <div className="w-full sm:h-[90vh] sm:px-20 text-white flex sm:flex-row flex-col justify-center items-center sm:overflow-y-hidden overflow-y-scroll">
        <div className="sm:h-full h-[100%] sm:w-[60%] w-screen sm:border-r sm:border-white flex flex-col justify-center items-center sm:px-10">
          <div className="w-full h-20 flex items-center border-b border-white sm:pl-0 pl-3">
            <h1 className="font-semibold text-xl text-center">Shopping Cart</h1>
          </div>
          <div className="sm:w-full w-screen h-20 flex justify-end sm:gap-10 gap-5 items-center border-b border-white sm:pr-14 pr-2">
            <p className="text-slate-300">Product</p>
            <p className="text-slate-300">Size</p>
            <p className="text-slate-300">Quantity</p>
            <p className="text-slate-300">SubTotal</p>
          </div>
          <div className="sm:w-full w-screen h-72 overflow-y-scroll flex flex-col items-center border-b border-white sm:pr-10 my-5 gap-2">
            {updatedCartItems.map((cartItem) => {

              const productTitle = cartItem.productDetails
                ? cartItem.productDetails.title
                : '';
              const truncatedTitle =
                productTitle.length > 8
                  ? productTitle.substring(0, 8) + "..."
                  : productTitle;
              
              const subtotal = cartItem.productDetails ? cartItem.productDetails.price*cartItem.quantity : 0
                  return (
                <div
                  className="w-full h-[45%] flex sm:gap-8 gap-4 items-center justify-between sm:justify-normal border-b"
                  key={cartItem._id}
                >
                  <div className="h-full sm:w-[40%] w-28 flex sm:gap-16 gap-4 items-center px-2">
                    <button onClick={() => handleDeleteCart(cartItem?.productDetails?._id || '', cartItem.size)} className="sm:w-auto w-4">
                      <RiDeleteBin5Line className="text-white" />
                    </button>
                    <Link
                      href={`/product/${cartItem.productDetails?._id}`}
                      className="h-[95%] w-20 flex justify-center items-center"
                    >
                      <div className="h-[95%] w-full flex justify-center items-center overflow-hidden">
                        <img
                          src={cartItem.productDetails?.images}
                          alt="item_Img"
                          className="sm:size-full size-auto max-h-full"
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="h-full w-[80%] sm:w-[52%] flex items-center gap-5 sm:gap-10">
                    <div className='sm:flex hidden w-20 justify-center items-center'>
                    <p className="text-center">{truncatedTitle}</p>
                    </div>
                    <div className="w-9 flex justify-center items-center">
                    <p>{cartItem.size}</p>
                    </div>
                    <div className="w-16 flex justify-center items-center">
                    <p>{cartItem.quantity}</p>
                    </div>
                    <div className="w-16 flex justify-center items-center">
                    <p>{subtotal}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="sm:h-full h-[100%] sm:w-[40%] w-full sm:mb-0 mb-10 flex flex-col justify-center sm:items-center sm:px-10 sm:gap-0 gap-2 px-5">
          <div className="w-full h-20 flex items-center border-b border-white">
            <h1 className="font-semibold sm:text-xl">Cart Total</h1>
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
            className="w-full h-14 rounded flex justify-between items-center sm:mt-20 mt-7 bg-white"
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
