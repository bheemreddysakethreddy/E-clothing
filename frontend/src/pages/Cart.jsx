import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  increaseQuantity,
  decreaseQuantity,
  deletetoCart,
} from "../redux/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartData);

  const user = JSON.parse(localStorage.getItem("user"))._id;
  async function HandleCartDecrease(obj) {
    dispatch(
      decreaseQuantity({
        id: obj.product._id,
      }),
    );
    await axios.patch("http://localhost:8000/cart", {
      user,
      product: obj.product._id,
      quantityIncrease: false,
    });
  }
  async function HandleCartIncrease(obj) {
    dispatch(
      increaseQuantity({
        id: obj.product._id,
      }),
    );
    await axios.patch("http://localhost:8000/cart", {
      user,
      product: obj.product._id,
      quantityIncrease: true,
    });
  }
  async function HandleDeleteCartItem(obj) {
    dispatch(
      deletetoCart({
        id: obj.product._id,
      }),
    );

    await axios.delete("http://localhost:8000/cart", {
      data: {
        user,
        product: obj.product._id,
      },
    });
  }
  const total = cart.data.reduce(
    (acc, cur) => acc + cur.product.price * cur.quantity,
    0,
  );
  return (
    <div>
      <div className="w-full h-[80%] flex items-center flex-col overflow-auto absolute top-20 mt-2 mb-3 left-0 right-0">
        <ul className="w-[45%] flex flex-wrap gap-4 justify-center items-center">
          {cart.data.length == 0 && (
            <div className="absolute z-10">
              <h1 className="mt-20">no items in cart</h1>
            </div>
          )}
          {!cart.loading &&
            cart.data.map((obj) => (
              <li
                key={obj.id || obj.product._id}
                className="w-[90%] h-50 bg-gray-100 rounded-2xl border-2 border-transparent hover:border-black"
              >
                <div className="flex justify-center items-center w-full h-full gap-4">
                  <div className="flex flex-col justify-center items-center m-1 gap-2">
                    <img
                      src={`http://localhost:8000/images/${obj.product.image}`}
                      alt="no"
                      className="h-30 w-30 rounded-2xl "
                    />
                    <div className="flex gap-2 justify-center items-center bg-white rounded-2xl px-2">
                      <button
                        onClick={() => HandleCartDecrease(obj)}
                        className={
                          obj.quantity == 1
                            ? "cursor-not-allowed w-8 h-7 rounded-[5px] invisible"
                            : "cursor-pointer w-8 h-7 rounded-[5px]"
                        }
                        disabled={obj.quantity == 1}
                      >
                        -
                      </button>
                      <p>{obj["quantity"]}</p>
                      <button
                        onClick={() => HandleCartIncrease(obj)}
                        className="w-8 h-7 cursor-pointer rounded-[5px]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="w-[75%] h-50 flex flex-col justify-between items-start py-5">
                    <p className="text-2xl">{obj.product.name}</p>
                    <div className="w-[70%]">
                      <p className="whitespace-normal wrap-break-word line-clamp-2">
                        {obj.product.description}
                      </p>
                    </div>
                    <p className="text-xl">Price: {obj.product.price}/-</p>
                    <div className="flex gap-10 items-center ">
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className="text-xl cursor-pointer"
                        onClick={() => HandleDeleteCartItem(obj)}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      {cart.data.length >= 1 && (
        <div className="absolute bottom-0 flex justify-center flex-col items-center w-full h-20">
          <button
            className="bg-yellow-500 text-white text-xl w-[40%] font-bold py-2 rounded-2xl cursor-pointer"
            onClick={() => Navigate("/order")}
          >
            Proceed to Buy
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
