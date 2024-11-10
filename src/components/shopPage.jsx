import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import * as _ from "lodash";

export default function ShopPage() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState({
    query: "",
    category: "",
    rating: 0,
    price: NaN,
  });
  const [sort, setSort] = useState("none");
  const [cart, setCart] = useState([]);
  const [cartVisibility, setCartVisibility] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((results) => results.json())
      .then((items) => setItems(items));
  }, []);

  // Loading Screen
  if (items.length === 0) {
    return (
      <div className="loadingScreen">
        <div className="loadingIcon"></div>
        <div className="loadingText">Loading...</div>
      </div>
    );
  }

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(filter.query.toLowerCase()) &&
      (filter.category ? filter.category === item.category : true) &&
      (filter.rating
        ? filter.rating <= item.rating.rate &&
          item.rating.rate < filter.rating + 1
        : true) &&
      (!Number.isNaN(filter.price)
        ? filter.price <= item.price && item.price < filter.price + 250
        : true)
  );

  const sorted = filtered.toSorted((item1, item2) => {
    switch (sort) {
      case "none":
        return item1.id - item2.id;
      case "PHL":
        return item2.price - item1.price;
      case "PLH":
        return item1.price - item2.price;
      case "RHL":
        return item2.rating.rate - item1.rating.rate;
      case "RLH":
        return item1.rating.rate - item2.rating.rate;
      default:
        throw new Error("Unrecognized Sort");
    }
  });

  return (
    <main className="shopPage">
      <div className="filters">
        <h1>Filters</h1>
        <input
          placeholder="Search this page..."
          type="text"
          value={filter.query}
          onChange={(evt) => setFilter({ ...filter, query: evt.target.value })}
        />

        <select
          className="category"
          onChange={(evt) =>
            setFilter({ ...filter, category: evt.target.value })
          }
        >
          <option value="">No Category Selected</option>
          <option value="men's clothing">Men&apos;s Clothing</option>
          <option value="women's clothing">Women&apos;s Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </select>

        <select
          className="rating"
          onChange={(evt) =>
            setFilter({ ...filter, rating: parseInt(evt.target.value) })
          }
        >
          <option value="0">No Rating Selected</option>
          <option value="1">1-2 stars</option>
          <option value="2">2-3 stars</option>
          <option value="3">3-4 stars</option>
          <option value="4">4-5 stars</option>
        </select>

        <select
          className="price"
          onChange={(evt) =>
            setFilter({ ...filter, price: parseInt(evt.target.value) })
          }
        >
          <option value="">No Price Selected</option>
          <option value="0">$0-$249.99</option>
          <option value="250">$250-$499.99</option>
          <option value="500">$500-$749.99</option>
          <option value="750">$750-$1000</option>
        </select>

        <div className="cart">
          <button
            className="cartButton"
            onClick={() => {
              setCartVisibility(!cartVisibility);
            }}
          ></button>
          <div className={cart.length > 0 ? "cartNumber active" : "cartNumber"}>
            {cart.length}
          </div>
        </div>
      </div>

      <div className="sortOptions">
        <div className="sorts">
          <h1>Sort Options</h1>
          <button
            className={sort === "none" ? "active" : ""}
            onClick={() => setSort("none")}
          >
            No Sort
          </button>
          <button
            className={sort === "PHL" ? "active" : ""}
            onClick={() => setSort("PHL")}
          >
            Price High to Low
          </button>
          <button
            className={sort === "PLH" ? "active" : ""}
            onClick={() => setSort("PLH")}
          >
            Price Low to High
          </button>
          <button
            className={sort === "RHL" ? "active" : ""}
            onClick={() => setSort("RHL")}
          >
            Rating High to Low
          </button>
          <button
            className={sort === "RLH" ? "active" : ""}
            onClick={() => setSort("RLH")}
          >
            Rating Low to High
          </button>
        </div>
      </div>

      <div className="itemsSection">
        <h1>Items</h1>
        <div className="items">
          {sorted.map((item) => (
            <ItemCard item={item} cart={cart} setCart={setCart} key={item.id} />
          ))}
        </div>
        <ItemCart
          cart={cart}
          setCart={setCart}
          cartVisibility={cartVisibility}
        />
      </div>
    </main>
  );
}

function ItemCard({ item, cart, setCart }) {
  return (
    <div className="itemCard" key={item.id}>
      <img src={item.image} />
      <div className="textContent">
        <h2>{item.title}</h2>
        <p className="price">${item.price}</p>
        <p className="rating">
          {item.rating.rate}
          <svg
            className="star"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
          </svg>
        </p>
      </div>
      <button
        onClick={() => {
          for (const itemInCart of cart) {
            if (_.isEqual(itemInCart, { ...item, count: 1 })) {
              return;
            }
          }
          const copy = [...cart];
          copy.push({ ...item, count: 1 });
          setCart(copy);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

ItemCard.propTypes = {
  item: PropTypes.object,
  cart: PropTypes.arrayOf(PropTypes.object),
  setCart: PropTypes.func,
};

function ItemCart({ cart, setCart, cartVisibility }) {
  const [checkout, setCheckout] = useState(false);

  if (checkout) {
    return <Navigate to="/checkout" />;
  }

  return (
    <aside className={cartVisibility ? "cart active" : "cart"}>
      <h1>Cart</h1>
      <ul className="cartItems">
        {cart.map((itemInCart) => {
          return (
            <li className="cartItem" key={itemInCart.id}>
              <p>{itemInCart.title}</p>

              <label htmlFor="cartItem">Amount: </label>
              <input
                id="cartItem"
                type="number"
                min="1"
                value={itemInCart.count}
                onChange={(evt) => {
                  const cartCopy = [...cart];
                  for (const cartItem of cartCopy) {
                    if (_.isEqual(cartItem, itemInCart)) {
                      cartCopy[cart.indexOf(itemInCart)].count =
                        evt.target.value;
                      setCart(cartCopy);
                      return;
                    }
                  }
                }}
              />

              <button
                className="cartItemRemove"
                onClick={() => {
                  const cartCopy = [...cart];
                  for (const cartItem of cartCopy) {
                    if (_.isEqual(cartItem, itemInCart)) {
                      cartCopy.splice(cart.indexOf(itemInCart), 1);
                      setCart(cartCopy);
                      return;
                    }
                  }
                }}
              >
                Remove Item
              </button>
            </li>
          );
        })}
      </ul>
      <p className="totalPrice">
        Total: $
        {cart
          .reduce(
            (sum, currentItem) => sum + currentItem.price * currentItem.count,
            0
          )
          .toFixed(2)}
      </p>

      <button className="clearCart" onClick={() => setCart([])}>
        Clear Cart
      </button>

      <button className="checkout" onClick={() => setCheckout(true)}>
        Checkout
      </button>
    </aside>
  );
}

ItemCart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object),
  setCart: PropTypes.func,
  cartVisibility: PropTypes.bool,
};
