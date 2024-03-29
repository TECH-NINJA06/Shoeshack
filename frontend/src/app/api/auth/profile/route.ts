// import { connect } from "@/config/dbConfig";
// import { NextRequest, NextResponse } from "next/server";
// import User from "@/models/user.models";
// import jwt from "jsonwebtoken";


// export async function GET(req: NextRequest) {
//   try {
//     await connect();

//     const token = req.cookies.get('token')?.value;
//     if (!token) {
//       return NextResponse.json({ message: "Token not found", success: false }, { status: 401 });
//     }
//     const decodedToken = jwt.verify(token, 'hola123')
//     console.log('id:', decodedToken);

//     if (!decodedToken.userId) {
//       return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
//     }
//     const userId = decodedToken.userId;
//     const user = await User.findOne({ _id: userId }).select("-password")

//     if (!user) {
//       return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
//     }

//     const avatar = user.avatar || '/navAvatar.jpg';

//     return NextResponse.json({id: user._id, fullName: user.fullName, avatar: avatar}, { status: 200 });
//   } catch (error) {
//     console.error("Error at profile route:", error);
//     return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
//   }
// }

import { connect } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";
import jwt, { JwtPayload } from "jsonwebtoken"; // Import JwtPayload type

export async function GET(req: NextRequest) {
  try {
    await connect();

    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ message: "Token not found", success: false }, { status: 401 });
    }

    const decodedToken = jwt.verify(token, 'hola123') as JwtPayload; // Explicitly type decodedToken
    console.log('id:', decodedToken);

    if (!decodedToken.userId) {
      return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
    }

    const userId = decodedToken.userId;
    const user = await User.findOne({ _id: userId }).select("-password")

    if (!user) {
      return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
    }

    const avatar = user.avatar || '/navAvatar.jpg';

    return NextResponse.json({ id: user._id, fullName: user.fullName, avatar: avatar }, { status: 200 });
  } catch (error) {
    console.error("Error at profile route:", error);
    return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
  }
}
