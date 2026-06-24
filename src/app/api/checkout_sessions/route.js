import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { getUser } from '@/lib/api/session';

export async function POST() {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin');
    const user = await getUser();
    console.log(user?.email)

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
        customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: 'price_1TlXB5RmQVlfCKH6Fw7EJ8k6',
          quantity: 1,
        },
      ],
      mode: 'subscription',
    // success_url এবং cancel_url একদম নিখুঁতভাবে এভাবে লেখো:
success_url: `${origin}/dashboard/user/success?session_id={CHECKOUT_SESSION_ID}`,
cancel_url: `${origin}/dashboard/user?session_id={CHECKOUT_SESSION_ID}`,
    });

    // console.log(session);

    return NextResponse.json({url:session.url});
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}