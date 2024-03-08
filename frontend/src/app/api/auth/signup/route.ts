import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { fullName, email, password, avatar } = body;
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 409 }
      );
    }

    const existingUser = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await db.user.create({
      data: { fullName, email, password: hashedPassword, avatar },
    });

    return NextResponse.json({ user: newUser, message: "User created successfully"}, { status: 200 });
  } catch (error) {
    NextResponse.json(error);
  }
}
