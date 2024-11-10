import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function CheckoutPage() {
  const [goHome, setGoHome] = useState(false);

  if (goHome) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <main className="checkoutPage">
        <div className="checkoutImg"></div>
        <h1>Thank you for shopping with us today!</h1>
        <p>
          Your order will be processed shortly and we will get your order placed
        </p>
        <p>
          Your Order Number is #
          {Math.floor(Math.random() * (9999999999 - 1000000001)) + 1000000000}
        </p>
        <p>Click here to return home: </p>
        <button id="homeButton" onClick={() => setGoHome(true)}>
          Go Home
        </button>
      </main>

      <footer className="checkoutFooter">
        <p>Note: no information has been collected</p>
        <p>This is merely for project use</p>
      </footer>
    </>
  );
}
