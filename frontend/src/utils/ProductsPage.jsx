import { useSelector, useDispatch } from "react-redux";
import { addtoCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { productsFetch } from "../redux/thunks/productTunk";
import { axiosInstance } from "../services/axios";
import { backtoLoading } from "../redux/productSlice";
import Loading from "../pages/Loading";

const ProductsPages = ({ category }) => {
  const token = localStorage.getItem("token");
  let response = useSelector((state) => state.products.fetchedData);
  console.log(response.loading);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 4;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(backtoLoading());
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPageNumber(0);
  }, [searchQuery, category, dispatch]);

  useEffect(() => {
    let skip = pageNumber * limit;
    let timer = setTimeout(() => {
      dispatch(
        productsFetch({
          category: category || "trending",
          searchQuery,
          skip,
          limit,
        }),
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery, pageNumber, category, limit, dispatch]);

  function handleProductDetials(id) {
    navigate(`/productdetail/${id}`);
  }

  async function HandlenewCartItem(obj) {
    if (!token) {
      navigate("/login");
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
    await axiosInstance.post("/cart", {
      product: obj._id,
      quantity: 1,
    });
  }

  function classbtn() {
    return "border-2 px-2 py-1 rounded-lg cursor-pointer";
  }

  function handlePage(i) {
    setPageNumber(i);
  }
  const pageHeading = category || "Trending";

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 pb-16">
      <div className="mb-10 text-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">
            {pageHeading.toUpperCase()}'s Collection
          </h1>
          <p className="text-gray-500 mt-2">
            Explore the latest styles for {pageHeading}s
          </p>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="search by product name"
          className="px-3 w-100 mt-2 py-1 border rounded-xl"
        />
      </div>
      {response.loading && (
        <h1 className="text-center text-lg">
          <Loading skeleton={8} />
        </h1>
      )}

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

      {!response.loading && response.data.length && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {response.data.data.map((obj) => (
            <li
              key={obj._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
            >
              <div
                className="cursor-pointer overflow-hidden"
                onClick={() => handleProductDetials(obj._id)}
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}/images/${obj.image}`}
                  alt={obj.name}
                  className="w-full h-60 object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 space-y-2">
                <h2
                  className="font-medium text-gray-900 text-lg cursor-pointer hover:text-blue-600 line-clamp-1"
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

      {!response.loading && response.data.length && (
        <div className="flex justify-center items-center gap-2 mt-3 w-full">
          <button className={classbtn()}>prev</button>
          {Array(Math.ceil(response.data.length / limit))
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <button
                  className={classbtn()}
                  onClick={() => (handlePage(index), dispatch(backtoLoading()))}
                >
                  {index + 1}
                </button>
              </div>
            ))}
          <button className={classbtn()}>next</button>
        </div>
      )}
    </div>
  );
};

export default ProductsPages;
