import { plaidClient } from "@/lib/plaid";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest)
{
    try {
        const {accessToken} = await request.json();
        const plaidRequest = 
        {
            access_token: accessToken
        }
        const plaidResponse = await plaidClient.authGet(plaidRequest);
        return NextResponse.json(plaidResponse.data);
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch auth data"}, {status: 500});
    }
}