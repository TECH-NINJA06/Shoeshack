import { connect } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";
import jwt, { JwtPayload } from "jsonwebtoken";


export async function GET(req: NextRequest) {
  try {
    await connect();

    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ message: "Token not found", success: false }, { status: 401 });
    }

    const decodedToken = jwt.verify(token, 'hola123') as JwtPayload; // Explicitly type decodedToken
    console.log('id:', decodedToken);

    if (!decodedToken.email) {
      return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
    }

    const userEmail = decodedToken.email;
    const user = await User.findOne({ email: userEmail }).select("-password")


    if (!user) {
      return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
    }

    const avatar = user.avatar || '/navAvatar.jpg';

    return NextResponse.json({id: user._id, fullName: user.fullName, avatar: avatar}, { status: 200 });
  } catch (error) {
    console.error("Error at home route:", error);
    return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
  }
}