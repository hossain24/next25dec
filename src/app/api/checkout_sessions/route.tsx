import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'

export async function POST() {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: 'price_1StDHl8kCdEVfm77hvHBeswn',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`
    });
    if (session.url) {
      return NextResponse.redirect(session.url, 303)
    } else {
      return NextResponse.json(
        { error: 'Session URL is null' },
        { status: 500 }
      )
    }
  } catch (err) {
    let message = 'An unknown error occurred';
    let statusCode = 500;
    if (err && typeof err === 'object' && 'message' in err) {
      message = (err as { message: string }).message;
    }
    if (err && typeof err === 'object' && 'statusCode' in err) {
      statusCode = (err as { statusCode: number }).statusCode || 500;
    }
    return NextResponse.json(
      { error: message },
      { status: statusCode }
    )
  }
}