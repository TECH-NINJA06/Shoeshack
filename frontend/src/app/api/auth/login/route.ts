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

    const token = jwt.sign({ userId: savedUser._id }, "hola123", { expiresIn: '1d' });

    return NextResponse.json(
        { user: savedUser, token: token, message: "User logged in successfully", success: true },
        { status: 200 }
      );

  } catch (error) {
    console.log("error at login route");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
