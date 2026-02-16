import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addtoCart } from "../redux/cartSlice";
import { useNavigate, useParams } from "react-router-dom";

const Productdetails = () => {
  const { productId } = useParams();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  useEffect(() => {
    let timer;
    async function fetchproduct() {
      setLoading(true);
      let product = await axios(`http://localhost:8000/products/${productId}`);
      setData(product.data.data);
      timer = setTimeout(() => {
        setLoading(false);
      }, 300);
    }
    fetchproduct();
    return () => clearTimeout(timer);
  }, [productId]);

  if (loading) {
    return (
      <div className="absolute top-20 w-full flex justify-center mt-20">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
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

  return (
    <div className="absolute top-20 w-full px-4 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* IMAGE SECTION */}

        <div className="flex justify-center h-[80%]">
          <img
            src={`${import.meta.env.VITE_API_URL}/images/${data.image}`}
            alt={data.name}
            className="w-full max-w-md rounded-2xl h-[400px] object-contain shadow"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold">{data.name}</h1>

          <p className="text-2xl font-bold text-gray-900">₹{data.price}</p>

          <div className="flex gap-3 mt-1">
            {data.trending && (
              <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                Trending
              </span>
            )}
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
              In Stock
            </span>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-1">Description</h3>
            <p className="text-sm text-gray-600 wrap-break-word">
              {data.description}
            </p>
          </div>

          {data.sizes?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">Available Sizes</h3>
              <div className="flex gap-3">
                {data.sizes.map((size) => (
                  <span
                    key={size}
                    className="border px-4 py-1 rounded-lg text-sm uppercase"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 text-sm text-gray-500">
            <p>
              Category: <span className="text-gray-800">{data.category}</span>
            </p>
            <p>
              Subcategory:{" "}
              <span className="text-gray-800">{data.subcategory}</span>
            </p>
          </div>

          <div>
            <button
              className="bg-yellow-300 font-bold cursor-pointer rounded-2xl py-3 w-50"
              onClick={() => HandlenewCartItem(data)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productdetails;
