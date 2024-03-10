import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/user.models";
import { connect } from "@/config/dbConfig";


export async function POST(request: NextRequest) {
  try {
    await connect();
    const { fullName, email, password } = await request.json();

    if (!fullName || !email || !password) {
      console.log("Please enter fields");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 422 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 } 
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email: email }, "hola123", { expiresIn: '1d' })
    
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
      access_token: token
    });
    const savedUser = await newUser.save();
    console.log(savedUser);

    
    const response =  NextResponse.json(
      { user: savedUser, id: savedUser._id, fullName: savedUser.fullName, token: token, message: "User created successfully", success: true },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,  
    })
    return response;

  } catch (error) {
    console.log("error at signup route")
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
