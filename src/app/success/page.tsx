import { redirect } from 'next/navigation'

import { stripe } from '../../lib/stripe'
import EPub from '../epub/page'

export default async function Success({ searchParams }: { searchParams: { session_id?: string } }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status  
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <EPub />
    )
  }
}