import { Link, Outlet } from "react-router-dom";
import store from "./assets/store.svg";

export default function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/" className="homeLogoLink" aria-hidden="true" tabIndex="-1"><img src={store} alt="store" /><p>Funk Store</p></Link>
          </li>
          <li>
            <Link to="home" className="homeLink">Home</Link>
          </li>
          <li>
            <Link to="shop" className="shopLink">Shop</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
