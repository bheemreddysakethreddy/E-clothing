import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const Navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cartData);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [showAddress, setShowAddress] = useState(false);

  function handleAddressChange(e) {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  }

  // CALCULATIONS
  const itemsCount = cart.data.reduce((acc, cur) => acc + cur.quantity, 0);

  const subTotal = cart.data.reduce(
    (acc, cur) => acc + cur.product.price * cur.quantity,
    0,
  );

  const deliveryCharge = 50;
  const discountRate = 0.05;
  const discountAmount = subTotal * discountRate;

  const finalTotal = subTotal - discountAmount + deliveryCharge;

  return (
    <div className="max-w-3xl mx-auto px-4 pt-8 pb-24">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold">Order Summary</h1>
        <p className="text-gray-500 text-sm mt-1">
          Review items and charges before placing order
        </p>
      </div>

      {/* BACK */}
      <button
        onClick={() => Navigate("/cart")}
        className="text-sm text-blue-600 cursor-pointer hover:underline mb-6"
      >
        ← Back to Cart
      </button>

      <div className="mb-10 bg-white border rounded-2xl px-6 py-6 space-y-4">
        <h2 className="font-semibold text-lg">Price Details</h2>

        <div className="flex justify-between text-sm">
          <span>Items ({itemsCount})</span>
          <span>₹{subTotal}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Delivery Charges</span>
          <span>₹{deliveryCharge}</span>
        </div>

        <div className="flex justify-between text-sm text-green-600">
          <span>Discount (5%)</span>
          <span>-₹{discountAmount.toFixed(0)}</span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total Amount</span>
          <span>₹{finalTotal.toFixed(0)}</span>
        </div>
      </div>

      <button
        onClick={() => setShowAddress((prev) => !prev)}
        className="mb-6 text-sm font-medium text-blue-600 hover:underline"
      >
        {showAddress ? "Hide Address" : "Add Delivery Address"}
      </button>
      {showAddress && (
        <div className="bg-white border rounded-2xl px-6 py-6 mb-10">
          <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={address.name}
              onChange={handleAddressChange}
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring"
            />

            <input
              type="text"
              name="phone"
              placeholder="Mobile Number"
              value={address.phone}
              onChange={handleAddressChange}
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring"
            />

            <input
              type="text"
              name="street"
              placeholder="Address (House No, Street)"
              value={address.street}
              onChange={handleAddressChange}
              className="border rounded-lg px-4 py-2 w-full col-span-1 md:col-span-2 focus:outline-none focus:ring"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleAddressChange}
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring"
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={address.state}
              onChange={handleAddressChange}
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring"
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={address.pincode}
              onChange={handleAddressChange}
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring"
            />
          </div>
        </div>
      )}

      {/* ITEMS */}
      {!cart.loading && (
        <div className="space-y-6">
          {cart.data.map((obj) => (
            <div
              key={obj._id}
              className="flex gap-6 items-center bg-white border rounded-2xl px-5 py-5"
            >
              <img
                src={`${import.meta.env.VITE_API_URL}/images/${obj.product.image}`}
                alt={obj.product.name}
                className="h-24 w-24 rounded-xl object-cover"
              />

              <div className="flex-1">
                <h2 className="font-medium">{obj.product.name}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Qty: {obj.quantity}
                </p>
              </div>

              <p className="text-lg font-semibold">
                ₹{obj.product.price * obj.quantity}
              </p>
            </div>
          ))}
        </div>
      )}

      <button className="w-full mt-8 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">
        Place Order
      </button>
    </div>
  );
}
