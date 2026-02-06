import axios from "axios";
import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/admin/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => (console.log(res.data.data), setProducts(res.data.data)));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Products</h2>
      {products.length && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h4 className="font-semibold text-lg">{p.name}</h4>
              <p className="text-gray-600 mt-2 overflow-hidden">
                {p.description}
              </p>
              <p className="text-gray-600 mt-2">sizes: {p.sizes.join(", ")}</p>
              <p className="text-gray-600 mt-2">₹{p.price}</p>
            </div>
          ))}
        </div>
      )}
      {!products.length && (
        <div>
          <p>no products added</p>
        </div>
      )}
    </div>
  );
};

export default Products;
