import { connect } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product.models";

export async function GET(req: NextRequest, { params } : any) {
  try {
    // Connect to the database
    await connect();

    const { slug } = params;
    // console.log('Product_id:', slug);

    const product = await Product.findOne({_id: slug});

    if (!product) {
      console.log("No product found");
      return NextResponse.json({ message: "No products found", success: true }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    // Handle errors
    console.error("Error at search route:", error);
    return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
  }
}
