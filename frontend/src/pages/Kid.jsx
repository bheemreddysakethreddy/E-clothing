// import useFetch from "../components/useFetch"
import { useSelector, useDispatch } from "react-redux";
import { addtoCart } from "../redux/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Kid = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const response = useSelector((state) => state.products.fetchedData.data);

  async function handleProductDetials(id) {
    localStorage.setItem("singleProduct", JSON.stringify(id));
    Navigate("/productdetail");
  }

  async function HandlenewCartItem(obj) {
    dispatch(
      addtoCart({
        id: obj._id,
        title: obj.name,
        description: obj.description,
        price: obj.price,
        image: obj.image,
      }),
    );
    await axios.post("http://localhost:8000/cart", {
      user: JSON.parse(localStorage.getItem("user"))._id,
      product: obj._id,
      quantity: 1,
    });
  }

  return (
    <div>
      <div className="absolute top-20 w-full ">
        {response.loading && <h1 className="text-2xl">loading...</h1>}
        {response.error && <h1>error occurred...</h1>}
        {!response.loading && (
          <ul className="w-full h-full flex flex-wrap gap-10 p-10 justify-center">
            {response.data.map((obj) => (
              <li
                key={obj.id}
                className=" h-110 w-100 bg-amber-50 rounded-2xl p-6 box-border hover:shadow-black"
              >
                <div className="flex flex-col gap-3 items-center justify-center ">
                  <img
                    src={`http://localhost:8000/images/${obj.images}`}
                    alt="img"
                    className="h-40 w-40 rounded-xl"
                  />
                  <h1
                    className="text-2xl w-max hover:text-blue-500 cursor-pointer hover:font-bold"
                    onClick={() => handleProductDetials(obj._id)}
                  >
                    {obj.name}
                  </h1>
                  <p>{obj.price}</p>
                  <p>{obj.description}</p>
                  <p>{obj.rating}</p>

                  <button
                    className="h-10 w-35 cursor-pointer bg-emerald-500 rounded-4xl border-none"
                    onClick={() => HandlenewCartItem(obj)}
                  >
                    Add to cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Kid;
