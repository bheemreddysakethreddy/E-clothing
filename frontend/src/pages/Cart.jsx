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
  const token = localStorage.getItem("token");
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartData);

  async function HandleCartDecrease(obj) {
    dispatch(
      decreaseQuantity({
        id: obj.product._id,
      }),
    );
    await axios.patch(
      "http://localhost:8000/cart",
      {
        product: obj.product._id,
        quantityIncrease: false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  async function HandleCartIncrease(obj) {
    dispatch(
      increaseQuantity({
        id: obj.product._id,
      }),
    );
    await axios.patch(
      "http://localhost:8000/cart",
      {
        product: obj.product._id,
        quantityIncrease: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  async function HandleDeleteCartItem(obj) {
    dispatch(
      deletetoCart({
        id: obj.product._id,
      }),
    );

    await axios.delete("http://localhost:8000/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        product: obj.product._id,
      },
    });
  }
  const total = cart.data.reduce(
    (acc, cur) => acc + cur.product.price * cur.quantity,
    0,
  );
  return (
    <div className="max-w-3xl mx-auto px-4 pt-8 pb-32">
      {/* PAGE TITLE */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold">Shopping Cart</h1>
        <p className="text-gray-500 text-sm mt-1">
          Review items before checkout
        </p>
      </div>

      {/* EMPTY CART */}
      {cart.data.length === 0 && (
        <p className="text-center mt-24 text-gray-500">Your cart is empty</p>
      )}

      {/* CART ITEMS */}
      <ul className="space-y-6">
        {!cart.loading &&
          cart.data.map((obj) => (
            <li
              key={obj.id || obj.product._id}
              className="bg-white border rounded-2xl px-5 py-5 hover:shadow-sm transition"
            >
              <div className="flex gap-6">
                {/* IMAGE */}
                <img
                  src={`http://localhost:8000/images/${obj.product.image}`}
                  alt={obj.product.name}
                  className="h-28 w-28 rounded-xl object-cover"
                />

                {/* DETAILS */}
                <div className="flex-1 flex flex-col justify-between">
                  {/* TOP */}
                  <div>
                    <h2 className="text-base font-medium">
                      {obj.product.name}
                    </h2>

                    <p className="text-sm w-50 text-gray-500 mt-2 overflow-hidden line-clamp-2 wrap-break-word">
                      {obj.product.description}
                    </p>
                  </div>

                  {/* BOTTOM */}
                  <div className="flex items-center justify-between mt-6">
                    {/* QUANTITY */}
                    <div className="flex items-center gap-3 border rounded-lg px-3 py-1.5">
                      <button
                        onClick={() => HandleCartDecrease(obj)}
                        disabled={obj.quantity === 1}
                        className={`text-lg px-2 ${
                          obj.quantity === 1
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:text-black cursor-pointer"
                        }`}
                      >
                        −
                      </button>

                      <span className="font-medium">{obj.quantity}</span>

                      <button
                        onClick={() => HandleCartIncrease(obj)}
                        className="text-lg px-2 cursor-pointer hover:text-black"
                      >
                        +
                      </button>
                    </div>

                    {/* PRICE + DELETE */}
                    <div className="flex items-center gap-6">
                      <p className="text-lg font-semibold">
                        ₹{obj.product.price}
                      </p>

                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className="text-gray-400 hover:text-black cursor-pointer text-lg"
                        onClick={() => HandleDeleteCartItem(obj)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>

      {/* CHECKOUT BAR */}
      {cart.data.length >= 1 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
            <p className="text-lg font-medium">
              Total: <span className="font-semibold">₹{total}</span>
            </p>

            <button
              onClick={() => Navigate("/order")}
              className="bg-black text-white cursor-pointer px-8 py-3 rounded-xl text-sm hover:bg-gray-800 transition"
            >
              Proceed to Buy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
