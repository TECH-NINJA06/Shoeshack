import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);

export async function POST(req: NextRequest) {
  const { items } = await req.json();

  const transformedItems = items.map((item: any) => ({
    price_data: {
      currency: "inr",
      product_data: {
        images: [],
        name: item.title,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.PRODUCTION_URL || "http://localhost:3000/"}payment-success`,
    cancel_url: `${process.env.PRODUCTION_URL || "http://localhost:3000/"}payment-cancel`,
    metadata: {
      email: "test@gmail.com",
      images: JSON.stringify(items.map((item: any) => item.itemImg)),
    },
  });

  return NextResponse.json({ session: session, session_url: session.url, id: session.id });
}
