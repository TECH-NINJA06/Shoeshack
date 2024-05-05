import { connect } from "@/config/dbConfig";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { email, password } = await req.json();

    if (!email || !password) {
      console.log("Please enter fields");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 422 }
      );
    }

    const savedUser = await User.findOne({ email });
    if (!savedUser) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 409 }
      );
    }

    const correctPassword = await bcrypt.compare(password, savedUser.password);
    if (!correctPassword) {
      return NextResponse.json(
        { error: "The Password provided is incorrect" },
        { status: 409 }
      );
    }

    const token = jwt.sign({ email: email }, "hola123", { expiresIn: '1d' });
    savedUser.access_token = token;
    await savedUser.save();

    const response = NextResponse.json(
        { user: savedUser, id: savedUser._id, fullName: savedUser.fullName, token: token, message: "User logged in successfully", success: true },
        { status: 200 }
    );
    console.log(response);
    response.cookies.set("token", token, {
      httpOnly: true,  
    })
    return response;

  } catch (error) {
    console.log("error at login route");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
