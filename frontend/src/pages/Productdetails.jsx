import axios from "axios";
import { useEffect, useState } from "react";

const Productdetails = () => {
  const productId = JSON.parse(localStorage.getItem("singleProduct"));
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function fet() {
    setLoading(true);
    let product = await axios(`http://localhost:8000/products/${productId}`);
    setData(product.data.data);
    setLoading(false);
  }

  console.log("data", data);
  useEffect(() => {
    fet();
  }, []);

  return (
    <div className="absolute top-20">
      <div>
        {!loading && (
          <div>
            <img
              src={`http://localhost:8000/images/${data.image}`}
              alt="product image"
              className="h-130 w-130"
            />
            <h1>{data.name}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Productdetails;
