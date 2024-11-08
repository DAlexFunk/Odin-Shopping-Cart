import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function HomePage() {
  const [redirect, setRedirect] = useState(false);

  if (redirect) return <Navigate to="/shop" replace={true} />;

  return (
    <main className="homePage">
      <section className="hero">
        <h1>Shopping your way. Made simple</h1>
        <p>The easiest place to shop for all of your needs</p>
        <button onClick={() => setRedirect(true)}>Start Now</button>
      </section>

      <section className="cards">
        <div className="card">
          <h2>The best online shopping</h2>
          <p>
            We rival all other online shopping methods for the lowest prices and
            best deals.
          </p>
        </div>
        <div className="card">
          <h2>Largest collection of items</h2>
          <p>
            The largest selections of items can be found here and no where else.
            If you find an item elsewhere, we will add it.
          </p>
        </div>
        <div className="card">
          <h2>Only local real sellers</h2>
          <p>
            We go out of our way to find only local sellers near YOUR location.
            We just need your location to find the sellers.
          </p>
        </div>
      </section>
    </main>
  );
}
