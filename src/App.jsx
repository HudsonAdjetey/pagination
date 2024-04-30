import React, { useEffect, useState } from "react";

const App = () => {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(2);
  const fetchProduct = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    if (data && data.products) {
      setProduct(data.products);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div className="App">
      {product.length > 0 && (
        <div className="products">
          {product.slice(page * 10 - 10, page * 10).map((item, index) => {
            return (
              <span className="products__single" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <span>{item.title}</span>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
