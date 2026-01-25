import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'

export async function POST(req: Request) {
  let event

  try {
    const signature = (await headers()).get('stripe-signature');
    if (!signature) {
      console.log('Missing Stripe signature header');
      return NextResponse.json(
        { message: 'Missing Stripe signature header' },
        { status: 400 }
      );
    }
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.log('Missing STRIPE_WEBHOOK_SECRET environment variable');
      return NextResponse.json(
        { message: 'Missing STRIPE_WEBHOOK_SECRET environment variable' },
        { status: 500 }
      );
    }
    event = stripe.webhooks.constructEvent(
      await req.text(),
      signature,
      webhookSecret
    )
  } catch (err) {
    let errorMessage = 'Unknown error';
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    // On error, log and return the error message.
    if (err) console.log(err)
    console.log(`Error message: ${errorMessage}`)
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    )
  }

  const permittedEvents = ['checkout.session.completed']

  if (permittedEvents.includes(event.type)) {
    let data

    try {
      switch (event.type) {
        case 'checkout.session.completed':
          data = event.data.object
          console.log(`CheckoutSession status: ${data.payment_status}`)
          break
        default:
          throw new Error(`Unhandled event: ${event.type}`)
      }
    } catch (error) {
      console.log(error)
      return NextResponse.json(
        { message: 'Webhook handler failed' },
        { status: 500 }
      )
    }
  }
  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: 'Received' }, { status: 200 })
}