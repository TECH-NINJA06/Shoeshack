"use client";
import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import Image from "next/image";
import { IoCartOutline } from "react-icons/io5";

interface PageHeadProps {
  title: string;
  desc: string;
  cartlink: string;
  buylink: string;
  image: string;
}

export function ProductItem({
  title,
  desc,
  cartlink,
  buylink,
  image,
}: PageHeadProps) {
  return (
    <div className="w-52 h-96">
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <Image
          src={image}
          alt={title}
          height="140"
          width="140"
          className="object-contain"
        />
        <p className="text-sm font-semibold sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          {title}
        </p>
        <div className="flex justify-center items-center gap-2">
          <button
            className="rounded-full pl-4 pr-1 py-1 text-white flex gap-1 items-center space-x-1 bg-black mt-4 text-xs font-semibold dark:bg-zinc-800"
            onClick={() => {
              console.log("added to cart");
            }}
          >
            <span>Cart</span>
            <span className="bg-zinc-700 rounded-full text-xs px-2 py-0 text-white">
              <IoCartOutline />
            </span>
          </button>
          <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-semibold dark:bg-zinc-800" onClick={()=> {console.log(" open buy page")}}>
            <span>Buy </span>
            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
              $100
            </span>
          </button>
        </div>
      </BackgroundGradient>
    </div>
  );
}
