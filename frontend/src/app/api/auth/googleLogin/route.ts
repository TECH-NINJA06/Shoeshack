import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/user.models";
import { connect } from "@/config/dbConfig";

export async function POST(request: NextRequest) {
  try {
    await connect();
    const { fullName, email } = await request.json();
    console.log(fullName, email);

    if (!fullName || !email) {
      console.log("Please enter fields");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 422 }
      );
    }

    const existingUsers = await User.find({ email });

// Check if there are any existing users with the specified email
if (existingUsers.length > 0) {
    // Iterate through each existing user
    for (const existingUser of existingUsers) {
        // Check if the current user has a non-empty googleId
        if (existingUser.googleId) {
            const token = jwt.sign({ email: existingUser.email }, "hola123", { expiresIn: '1d' });

            const response = NextResponse.json(
                { 
                    user: existingUser, 
                    id: existingUser._id, 
                    fullName: existingUser.fullName, 
                    token: token, 
                    message: "User logged in successfully", 
                    success: true 
                },
                { status: 200 }
            );
            
            response.cookies.set("token", token, {
                httpOnly: true,
            });

            return response;
        }
    }
}

    const token = jwt.sign({ email: email }, "hola123", { expiresIn: "1d" });
    const googleToken = jwt.sign({ email: email }, "hola123", {
      expiresIn: "1d",
    });

    const newUser = new User({
      googleId: googleToken,
      fullName: fullName,
      email: email,
      password: token,
      access_token: token,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);

    const response = NextResponse.json(
      {
        user: savedUser,
        id: savedUser._id,
        fullName: savedUser.fullName,
        token: token,
        message: "User created successfully",
        success: true,
      },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    console.log("error at Google-signup route");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
