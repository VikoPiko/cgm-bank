// // app/api/dwolla/add-funding-source/route.ts
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import dwollaClient from "@/lib/dwolla";

// export async function POST(req: Request) {
//   try {
//     const { userId, processorToken } = await req.json();

//     if (!userId || !processorToken) {
//       return NextResponse.json(
//         { error: "Missing userId or processorToken" },
//         { status: 400 }
//       );
//     }

//     const user = await prisma.user.findUnique({
//       where: { userId },
//     });

//     if (!user || !user.dwollaCustomerUrl) {
//       return NextResponse.json(
//         { error: "User or Dwolla customer not found" },
//         { status: 404 }
//       );
//     }

//     const response = await dwollaClient.post(
//       `${user.dwollaCustomerUrl}/funding-sources`,
//       {
//         plaidToken: processorToken,
//         name: "Bank Account via Plaid",
//       },
//       {
//         headers: {
//           "Content-Type": "application/vnd.dwolla.v1.hal+json",
//           Accept: "application/vnd.dwolla.v1.hal+json",
//         } as Record<string, string>, // fix typing error
//       }
//     );

//     const fundingSourceUrl = response.headers.get("location");
//     if (!fundingSourceUrl) {
//       return NextResponse.json(
//         { error: "Funding source URL not returned from Dwolla" },
//         { status: 500 }
//       );
//     }

//     await prisma.banks.updateMany({
//       where: { userId },
//       data: { fundingSourceUrl }, // fundingSourceUrl guaranteed non-null now
//     });

//     return NextResponse.json({
//       message: "Funding source added",
//       fundingSourceUrl,
//     });
//   } catch (error: any) {
//     console.error(
//       "Dwolla funding source error:",
//       error?.response?.body || error
//     );
//     return NextResponse.json(
//       { error: "Failed to add funding source to Dwolla" },
//       { status: 500 }
//     );
//   }
// }
