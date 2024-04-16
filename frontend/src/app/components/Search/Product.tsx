"use client";
import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import Image from "next/image";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";

interface PageHeadProps {
  title: string;
  desc: string;
  image: string;
  brand: string;
  productLink: string;
}

export function ProductItem({
  title,
  desc,
  image,
  brand,
  productLink
}: PageHeadProps) {
  return (
    <Link className="w-80 h-[40rem]" href={`/product/${productLink}`}>
    <div className="w-80 h-[40rem]">
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 flex flex-col items-center">
        <div className=" w-[18rem] h-[15rem] bg-center object-contain rounded-xl">
          <img
          src={image}
          alt={title}
          className="object-contain size-full aspect-video"
        />
        </div>
        
        <p className="text-sm font-semibold sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          {title}
        </p>
        <p className="text-slate-400">{desc} / {brand}</p>
        {/* <div className="flex justify-center items-center gap-2">
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
        </div> */}
      </BackgroundGradient>
    </div>
    </Link>
  );
}
