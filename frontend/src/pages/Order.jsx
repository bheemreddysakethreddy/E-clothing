import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const Navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cartData);
  console.log(cart.data);
  return (
    <>
      <div className="absolute top-20 flex flex-col items-center w-full">
        <button onClick={() => Navigate("/cart")}>cart</button>
        {!cart.loading && (
          <div>
            {cart.data.map((obj) => (
              <div>
                <h1>{obj.product.name}</h1>
                <h1>{obj.product.price}</h1>
                <img
                  className="h-100 w-100"
                  src={`http://localhost:8000/images/${obj.product.image}`}
                  alt=""
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
