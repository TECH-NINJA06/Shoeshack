import { connect } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product.models";

export async function GET(req: NextRequest, { params }) {
  try {
    // Connect to the database
    await connect();

    const { slug } = params;
    console.log('keyword:', slug);

    // Search for products based on the provided keyword (slug)
    const products = await Product.find({
      $or: [
        { title: { $regex: slug, $options: "i" } }, 
        { brand: { $regex: slug, $options: "i" } }, 
        { color: { $regex: slug, $options: "i" } }, 
      ],
    });

    // If no products are found, return a response indicating so
    if (!products || products.length === 0) {
      console.log("No products found");
      return NextResponse.json({ message: "No products found", success: true }, { status: 404 });
    }
    
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    // Handle errors
    console.error("Error at search route:", error);
    return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
  }
}
