import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/config/dbConfig";
import User from "@/models/user.models";

export async function POST (req: NextRequest) {
    const response = NextResponse.json(
        { message: "User logged out successfully", success: true },
        { status: 200 }
    );
    response.cookies.delete("token");
    return response;
}