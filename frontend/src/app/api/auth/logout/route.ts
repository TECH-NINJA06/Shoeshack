import { NextRequest, NextResponse } from "next/server";


export async function POST (req: NextRequest) {
    const response = NextResponse.json(
        { message: "User logged out successfully", success: true },
        { status: 200 }
    );
    response.cookies.set("token", "", {
      httpOnly: true,  
    })
    return response;
}