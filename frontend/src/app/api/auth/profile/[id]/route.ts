import { connect } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";

type UserResponse = {
  user: User;
  fullName: string;
  avatar: string;
  message: string;
  success: boolean;
};

export default async function GET(req: NextRequest, { params }): Promise<NextResponse> {
  try {
    await connect();

    const { id } = params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
    }

    const avatar = user.avatar || '/navAvatar.jpg';

    const response: UserResponse = {
      user,
      fullName: user.fullName,
      avatar,
      message: "User data sent successfully",
      success: true,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error at profile route:", error);
    return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
  }
}