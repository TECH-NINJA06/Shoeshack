import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
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

    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    
    return NextResponse.json(
      { user: savedUser, message: "User created successfully", success: true },
      { status: 200 }
    );

  } catch (error) {
    console.log("error at signup route")
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
