import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/user.models";
import { connect } from "@/config/dbConfig";


export async function POST(request: NextRequest) {
  try {
    await connect();
    const { fullName, email  } = await request.json();

    if (!fullName || !email) {
      console.log("Please enter fields");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 422 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const token = jwt.sign({ email: email }, "hola123", { expiresIn: '1d' });

        const response =  NextResponse.json(
            { user: existingUser, id: existingUser._id, fullName: existingUser.fullName, token: token, message: "User logged in successfully", success: true },
            { status: 200 }
        );
        response.cookies.set("token", token, {
            httpOnly: true,  
        })
        return response;
    }

    const token = jwt.sign({ email: email }, "hola123", { expiresIn: '1d' })
    
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: token,
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
    console.log("error at Google-signup route")
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
