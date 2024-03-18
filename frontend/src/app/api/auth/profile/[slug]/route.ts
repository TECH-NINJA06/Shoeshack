import { connect } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";


export async function GET(req: NextRequest, { params }) {
  try {
    await connect();

    const { slug } = params;
    console.log('id:', slug);
    const user = await User.findOne({ _id: slug }).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
    }

    const avatar = user.avatar || '/navAvatar.jpg';

    return NextResponse.json({id: user._id, fullName: user.fullName}, { status: 200 });
  } catch (error) {
    console.error("Error at profile route:", error);
    return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
  }
}