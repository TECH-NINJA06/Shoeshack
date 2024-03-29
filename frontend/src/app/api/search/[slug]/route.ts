import { connect } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product.models";

const ignoredWords = ["shoes"]; // Add more words to ignore if needed

export async function GET({ params } : any) {
  try {
    // Connect to the database
    await connect();

    let { slug } = params;
    console.log('keyword:', slug);

    // Remove ignored words from the slug
    ignoredWords.forEach(ignoredWord => {
      slug = slug.replace(new RegExp(`\\b${ignoredWord}\\b`, "gi"), ""); // Match whole words
      slug = slug.replace(new RegExp(`\\s${ignoredWord}\\s`, "gi"), " "); // Match preceded and followed by spaces
      slug = slug.replace(new RegExp(`^${ignoredWord}\\s`, "gi"), ""); // Match at the beginning of the string
      slug = slug.replace(new RegExp(`\\s${ignoredWord}$`, "gi"), ""); // Match at the end of the string
    });

    // Trim any excess spaces
    slug = slug.trim();

    // If slug becomes empty after removing ignored words, return no products found
    if (!slug) {
      console.log("No relevant keyword provided");
      return NextResponse.json({ message: "No relevant keyword provided", success: false }, { status: 400 });
    }

    // Search for products based on the modified keyword (slug)
    const products = await Product.find({
      $or: [
        { title: { $regex: slug, $options: "i" } }, 
        { brand: { $regex: slug, $options: "i" } }, 
        { color: { $regex: slug, $options: "i" } },
        { category: { $regex: slug, $options: "i" } }, 
      ],
    });

    // If no products are found, return a response indicating so
    if (!products || products.length === 0) {
      console.log("No products found");
      return NextResponse.json({ message: "No products found", success: true }, { status: 404 });
    }
    
    console.log(products[0].images[0])
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    // Handle errors
    console.error("Error at search route:", error);
    return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
  }
}
