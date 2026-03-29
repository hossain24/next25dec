'use client'

import axios from "axios"

export default async function IndexPage() {

  const createCheckoutSession = () => {
   axios.post('http://localhost:5000/create-checkout-session', {
   items: [
        { id: 1, quantity: 3 },
        { id: 2, quantity: 2 }
      ],
  })
    .then(({ data }) => {
      window.location = data.url
    })
  .catch(function (error) {
    console.log(error);
  });
}

  return (
      <section>
        <button type="submit" onClick={createCheckoutSession}>
          Checkout
        </button>
      </section>
  )
}
