import { connect } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/user.models";


// export async function GET (req: NextRequest) {
//     try {
//         await connect();
//         const reqBody = await req.json();
//         const token = reqBody.headers.Authorization;
//         if (!token) {
//             return NextResponse.json(
//                 { error: "Token missing" },
//                 { status: 400 }
//             );
//         }

//         const verifyToken = jwt.verify(token!, 'hola123');

//         const user = await User.findOne({ access_token: verifyToken });


//         return NextResponse.json(
//             { user: user, id: user._id, fullName: user.fullName, token: token, message: "User data fetched successfully", success: true },
//             { status: 200 }
//         );
//     } catch (error) {
//         console.log("Error at profile route: ");
//         return NextResponse.json(
//             { error: "Internal server error" },
//             { status: 500 }
//           );

//     }
// }

