import { NextRequest, NextResponse } from "next/server";
import { plaidClient } from "@/lib/plaid";
import prisma from "@/lib/prisma";
import { CountryCode, Products } from "plaid";

export async function POST(request: NextRequest) {
  try {
    //Parse request body
    const { userId } = await request.json();

    // Fetch user from the database
    const user = await prisma.user.findUnique({ where: { userId: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    // Construct Plaid link token request
    const plaidRequest = {
      user: {
        client_user_id: user.userId,
      },
      client_name: "CGM Bank",
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };

    // Call Plaid API to create a link token
    const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest);
    return NextResponse.json(createTokenResponse.data);
  } catch (error) {
    console.error("Error creating link token:", error);
    return NextResponse.json(
      { error: "Failed to create link token" },
      { status: 500 }
    );
  }
}

//PLAID QUICKSTART CODE FOR REFERENCE
// app.post('/api/create_link_token', async function (request, response) {
//   // Get the client_user_id by searching for the current user
//   const user = await User.find(...);
//   const clientUserId = user.id;
//   const request = {
//     user: {
//       // This should correspond to a unique id for the current user.
//       client_user_id: clientUserId,
//     },
//     client_name: 'Plaid Test App',
//     products: ['auth'],
//     language: 'en',
//     webhook: 'https://webhook.example.com',
//     redirect_uri: 'https://domainname.com/oauth-page.html',
//     country_codes: ['US'],
//   };
//   try {
//     const createTokenResponse = await client.linkTokenCreate(request);
//     response.json(createTokenResponse.data);
//   } catch (error) {
//     // handle error
//   }
// });
