// PaymentComponent.js
import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import stripePromise from './stripe';

function PaymentComponent() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Use the Stripe API to create a PaymentMethod
    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (result.error) {
      console.error(result.error);
    } else {
      // Send the PaymentMethod ID to your server to complete the payment
      const paymentMethodId = result.paymentMethod.id;
      // Make a request to server to charge the user $5
      // Handle success and error responses from your server
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay $5
      </button>
    </form>
  );
}

export default PaymentComponent;
