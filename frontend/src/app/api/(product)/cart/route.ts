import { connect } from "@/config/dbConfig";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import Product from "@/models/product.models";

//cart route controllers

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { productId, productSize } = await req.json();

    if (!productId || !productSize) {
      console.log(
        "ProductID: " + productId,
        "ProductSize: " + productSize
      );
      console.log("Please enter all fields");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 422 }
      );
    }

    // Verify user token
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Token not found", success: false },
        { status: 401 }
      );
    }
    const decodedToken = jwt.verify(token, "hola123") as JwtPayload;
    if (!decodedToken.email) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    const userEmail = decodedToken.email;

    // Find the user by email
    const savedUser = await User.findOne({ email: userEmail }).select(
      "-password"
    );
    if (!savedUser) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    // Find the product by productId
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 }
      );
    }

    // Find the index of the cart item with the specified product ID and size
    const cartItemIndex = savedUser.cart.findIndex(
      (item: any) =>
        item.product.toString() === productId && item.size === productSize
    );

    if (cartItemIndex !== -1) {
      // If the product already exists in the cart, update the quantity
      savedUser.cart[cartItemIndex].quantity += 1;
    } else {
      // If the product does not exist, add it to the cart
      savedUser.cart.push({
        product: productId,
        size: productSize,
        quantity: 1,
      });
    }

    // Save the user with updated cart
    await savedUser.save();

    console.log(savedUser.cart);

    return NextResponse.json({
      message: "Product added to cart",
      success: true,
    });
  } catch (error) {
    console.error("Error at cart controller:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connect();
    const { productId, productSize } = await req.json();

    if (!productId || !productSize) {
      console.log(
        "ProductID: " + productId,
        "ProductSize: " + productSize
      );
      console.log("Please enter all fields");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 422 }
      );
    } else {
      console.log("Product exists: " + productId, productSize);
    }

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Token not found", success: false },
        { status: 401 }
      );
    }
    const decodedToken = jwt.verify(token, "hola123") as JwtPayload;
    if (!decodedToken.email) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    const userEmail = decodedToken.email;

    const savedUser = await User.findOne({ email: userEmail }).select(
      "-password"
    );
    console.log(savedUser.cart)
    if (!savedUser) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    // Find the index of the cart item with the specified product ID and size
    const cartItemIndex = savedUser.cart.findIndex(
      (item: any) =>
        item.product.toString() === productId && item.size === productSize
    );

    // If the item exists in the cart, remove it
    if (cartItemIndex !== -1) {
      console.log("Product index: " + cartItemIndex);
        // If the quantity is 1, remove the item from the cart
        savedUser.cart.splice(cartItemIndex, 1);
        console.log("Product quantity is 1 " + savedUser.cart);
        await savedUser.save();
        return NextResponse.json({
          message: "Product removed from cart",
          success: true,
        });
    } else {
      console.log("Product not found in cart");
      return NextResponse.json(
        { message: "Product not found in cart", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Cart Operation completed successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error at cart controller:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connect();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Token not found", success: false },
        { status: 401 }
      );
    }
    const decodedToken = jwt.verify(token, "hola123") as JwtPayload;
    if (!decodedToken.email) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    const userEmail = decodedToken.email;

    const savedUser = await User.findOne({ email: userEmail }).select(
      "-password"
    );
    if (!savedUser) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        userId: savedUser._id,
        cart: savedUser.cart,
        message: "User cart sent successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error at cart controller:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connect();
    const { productId, productSize, cartFunction } = await req.json();

    if (!productId || !productSize || !cartFunction) {
      console.log(
        "ProductID: " + productId,
        "ProductSize: " + productSize,
        "CartFunction: " + cartFunction
      );
      console.log("Please enter all fields");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 422 }
      );
    }

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Token not found", success: false },
        { status: 401 }
      );
    }
    const decodedToken = jwt.verify(token, "hola123") as JwtPayload;
    if (!decodedToken.email) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    const userEmail = decodedToken.email;

    const savedUser = await User.findOne({ email: userEmail }).select(
      "-password"
    );
    if (!savedUser) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    // Find the index of the cart item with the specified product ID and size
    const cartItemIndex = savedUser.cart.findIndex(
      (item: any) =>
        item.product.toString() === productId && item.size === productSize
    );

    // If the item exists in the cart, update its quantity
    if (cartItemIndex !== -1) {
      if (cartFunction === "add") {
        savedUser.cart[cartItemIndex].quantity += 1;
      } else if (cartFunction === "subtract") {
        // Check if the quantity is greater than 1 before decrementing
        if (savedUser.cart[cartItemIndex].quantity > 1) {
          savedUser.cart[cartItemIndex].quantity -= 1;
        } else {
          // If the quantity is already 1, remove the item from the cart
          savedUser.cart.splice(cartItemIndex, 1);
        }
      }

      // Save the user with updated cart
      await savedUser.save();

      console.log(savedUser.cart);

      return NextResponse.json({
        message: "Cart updated successfully",
        success: true,
      });
    } else {
      return NextResponse.json(
        { message: "Product not found in cart", success: false },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error at cart controller:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
