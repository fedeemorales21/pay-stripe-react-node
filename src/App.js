import React from 'react';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import FormCheckout from './components/FormCheckout'

import 'bootstrap/dist/css/bootstrap.min.css'

const stripePromise = loadStripe('pk_test_51HS5NiI3jHmWNZxOVX7WAsM3IgAOKpLlIricao3Giwv2c8F95R7naau7P152quz3ARJOtP39UyivgQTh2hQJMOyr00bczpyOl9')

function App() {
  return (
    <Elements stripe={stripePromise}>
      <FormCheckout/>
    </Elements>
  );
}

export default App;
