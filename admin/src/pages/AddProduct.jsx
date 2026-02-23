import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../services/axiosinterceptors";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    subcategory: "",
    trending: false,
    sizes: [],
  });
  const params = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "sizes") {
      setForm((prev) => ({
        ...prev,
        sizes: checked
          ? [...prev.sizes, value]
          : prev.sizes.filter((s) => s !== value),
      }));
    } else if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleSubmit = async () => {
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (Array.isArray(form[key])) {
        form[key].forEach((val) => formData.append(key, val));
      } else {
        formData.append(key, form[key]);
      }
    });
    formData.append("image", image);

    if (params.id) {
      await axiosInstance.patch(`/admin/product/edit/${params.id}`, formData);
      navigate("/");
    } else {
      await axiosInstance.post(`/admin/auth/products`, formData);
      alert("Product added successfully");
      navigate("/");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-8">
        {params.id ? "Edit product" : "Add New Product"}
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          name="name"
          placeholder="Product Name"
          className="input"
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          className="input"
          onChange={handleChange}
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          className="input"
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          className="input"
          onChange={handleChange}
        />

        <input
          name="subcategory"
          placeholder="Subcategory"
          className="input"
          onChange={handleChange}
        />

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Description */}
      <textarea
        name="description"
        placeholder="Product Description"
        className="input mt-6 h-28"
        onChange={handleChange}
      />

      {/* Sizes */}
      <div className="mt-6">
        <p className="font-semibold mb-2">Available Sizes</p>
        <div className="flex gap-6">
          {["s", "m", "l", "xl", "xxl"].map((size) => (
            <label key={size} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="sizes"
                value={size}
                onChange={handleChange}
              />
              {size.toUpperCase()}
            </label>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div className="mt-6">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="trending" onChange={handleChange} />
          Trending Product
        </label>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="mt-8 w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition"
      >
        {params.id ? "Edit product" : "Add Product"}
      </button>
    </div>
  );
};

export default AddProduct;
