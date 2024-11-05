import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="home">Home</Link>
          </li>
          <li>
            <Link to="shop">Shop</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
