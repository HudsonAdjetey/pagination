import React, { useEffect, useState } from "react";

const App = () => {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const fetchProduct = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();

    if (data && data.products) {
      setProduct(data.products);
      setTotalPages(data.total / 10);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [page]);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  return (
    <div className="App">
      {product.length > 0 && (
        <div className="products">
          {product.map((item, index) => {
            return (
              <span className="products__single" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <span>{item.title}</span>
              </span>
            );
          })}
        </div>
      )}

      {totalPages > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disabled"}
            onClick={() => selectPageHandler(page - 1)}
          >
            ⬅️{" "}
          </span>{" "}
          {[...Array(totalPages)].map((_, id) => {
            return (
              <span
                key={id}
                className={page == id + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(id + 1)}
              >
                {id + 1}
              </span>
            );
          })}
          <span
            className={page < totalPages ? " " : "pagination__disabled"}
            onClick={() => selectPageHandler(page + 1)}
          >
            ▶️{" "}
          </span>
        </div>
      )}
    </div>
  );
};

export default App;
