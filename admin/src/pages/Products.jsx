import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/axiosinterceptors";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();

  function getAddedProducts() {
    setloading(true);
    axiosInstance
      .get(`/admin/auth/products`)
      .then((res) => (console.log(res.data.data), setProducts(res.data.data)))
      .finally(setloading(false));
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getAddedProducts();
  }, []);

  async function handleDeleteProduct(id) {
    console.log(id);
    let ok = confirm("are you sure to delete the product");
    if (ok) {
      try {
        let res = await axiosInstance.delete(`/admin/product/delete/${id}`);
        setProducts((prev) => prev.filter((p) => p._id !== id));
        console.log(res);
      } catch (error) {
        alert("something went wrong", error.message);
      }
    }
  }

  async function handleEditProduct(id) {
    navigate(`/products/edit/${id}`);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Products</h2>
      {loading && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      {!loading && products.length && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <img
                src={`http://localhost:8000/images/${p.image}`}
                alt=""
                className="h-60 w-60 object-contain"
              />
              <h4 className="font-semibold text-lg">{p.name}</h4>
              <p className="text-gray-600 mt-2 overflow-hidden">
                {p.description}
              </p>
              <p className="text-gray-600 mt-2">sizes: {p.sizes.join(", ")}</p>
              <div className="flex justify-between">
                <p className="text-gray-600 mt-2">₹{p.price}</p>
                <div className="flex gap-1">
                  <button
                    className="border px-2 py-1 rounded"
                    onClick={() => handleEditProduct(p._id)}
                  >
                    edit
                  </button>
                  <button
                    className="border px-2 py-1 rounded"
                    onClick={() => handleDeleteProduct(p._id)}
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && !products.length && (
        <div>
          <p>no products added</p>
        </div>
      )}
    </div>
  );
};

export default Products;
