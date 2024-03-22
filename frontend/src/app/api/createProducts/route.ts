import { connect } from "@/config/dbConfig";
import Product from "@/models/product.models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { title, brand, images, color, price, inventory, sizes } = await req.json();

    if (!title || !brand || !images || !price || !inventory || !sizes) {
      console.log("Please enter fields");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 422 }
      );
    }

    const newProduct = new Product({
        title: title,
        brand: brand,
        images: images,
        color: color,
        price: price,
        inventory: inventory,
        sizes: sizes
      });
      const savedProducts = await newProduct.save();
      console.log(savedProducts);
  
      
      return NextResponse.json(
        { products: savedProducts, message: "Products created successfully", success: true },
        { status: 200 }
      );


  } catch (error) {
    console.log("error at product route");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
