import { useSelector, useDispatch } from "react-redux";
import { addtoCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { productsFetch } from "../redux/thunks/productTunk";
import { store } from "../redux/store";

const Men = () => {
  const token = localStorage.getItem("token");
  let response = useSelector((state) => state.products.fetchedData.data);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleProductDetials(id) {
    localStorage.setItem("singleProduct", JSON.stringify(id));
    Navigate("/productdetail");
  }

  async function HandlenewCartItem(obj) {
    if (!token) {
      Navigate("/login");
      return;
    }
    dispatch(
      addtoCart({
        id: obj._id,
        title: obj.name,
        description: obj.description,
        price: obj.price,
        image: obj.image,
        quantity: 1,
      }),
    );
    await axios.post(
      "http://localhost:8000/cart",
      {
        product: obj._id,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let timer = setTimeout(() => {
      store.dispatch(
        productsFetch(
          `http://localhost:8000/products?category=men&name=${searchQuery}`,
        ),
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 pb-16">
      <div className="mb-10 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold">Men's Collection</h1>
        <p className="text-gray-500 mt-2">Explore the latest styles for mens</p>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="search by product name"
          className="px-3 w-100 mt-2 py-1 border rounded-xl"
        />
      </div>
      {response.loading && <h1 className="text-center text-lg">Loading...</h1>}

      {response.error && (
        <h1 className="text-center text-red-500">Error occurred...</h1>
      )}
      {!response.loading && !response.data.length && (
        <div>
          <p>
            no products found with the name{" "}
            {<span className="font-bold">{searchQuery}</span>}
          </p>
        </div>
      )}

      {!response.loading && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {response.data.map((obj) => (
            <li
              key={obj._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
            >
              <div
                className="cursor-pointer overflow-hidden"
                onClick={() => handleProductDetials(obj._id)}
              >
                <img
                  src={`http://localhost:8000/images/${obj.image}`}
                  alt={obj.name}
                  className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 space-y-2">
                <h2
                  className="font-medium text-gray-900 text-lg cursor-pointer hover:text-blue-600"
                  onClick={() => handleProductDetials(obj._id)}
                >
                  {obj.name}
                </h2>

                <p className="text-sm text-gray-500 line-clamp-2">
                  {obj.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-semibold">₹{obj.price}</span>

                  <button
                    onClick={() => HandlenewCartItem(obj)}
                    className="bg-black cursor-pointer text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Men;
