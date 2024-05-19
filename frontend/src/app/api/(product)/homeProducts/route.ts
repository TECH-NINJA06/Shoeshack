import { connect } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product.models";

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await connect();

    const randomProducts = await Product.aggregate([
        { $sample: { size: 6 } }
      ])

    console.log(randomProducts)  

    if (!randomProducts) {
      console.log("No products found");
      return NextResponse.json({ message: "No products found", success: true }, { status: 404 });
    }
    return NextResponse.json(randomProducts, { status: 200 });
  } catch (error) {
    // Handle errors
    console.error("Error at home route:", error);
    return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
  }
}