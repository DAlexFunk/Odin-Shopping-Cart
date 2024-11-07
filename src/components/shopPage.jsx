import { useEffect, useState } from "react";

export default function ShopPage() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState({
    query: "",
    category: "",
    rating: 0,
    price: NaN,
  });

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((results) => results.json())
      .then((items) => setItems(items));
  }, []);

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

  return (
    <main className="shopPage">
      <div className="filters">
        <h1>Filters</h1>
        <input
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
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
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
      </div>

      <div className="sortOptions">
        <h1>Sort Options</h1>
      </div>

      <div className="itemsSection">
        <h1>Items</h1>
        <div className="items">
          {filtered.map((item) => (
            <ItemCard item={item}/>
          ))}
        </div>
      </div>
    </main>
  );
}

function ItemCard({ item }) {
  return (
    <div className="itemCard" key={item.id}>
      <img src={item.image} />
      <h2>{item.title}</h2>
    </div>
  );
}
