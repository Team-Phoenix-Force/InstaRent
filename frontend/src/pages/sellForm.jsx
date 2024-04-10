// SellForm.js
import { useState } from "react";
// import { UploadComponent } from "../components/upload";
import Footer from "../components/footer";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SellForm = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    address: "",
    seller_mobile_number: "",
    product_image_url: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      title,
      description,
      price,
      address,
      seller_mobile_number,
      product_image_url,
    } = product;
    const userid = localStorage.getItem("userid");

    const response = await axios.post("http://localhost:7000/addProduct", {
      title,
      description,
      price,
      address,
      seller_mobile_number,
      product_image_url,
      userid,
    });

    const data = response.data;
    console.log("1");

    if (data.status === false) {
      console.log("2");
      toast.error(data.message, toastOptions);
    }

    if (data.status === true) {
      console.log("3");
      // toast.success(data.message, toastOptions);
      alert("added to cart");
      setTimeout(() => navigate("/"), 1000);
    }
    console.log("Form submitted:", product);
  };

  return (
    <div>
      <form
        className="max-w-2xl mx-auto mt-8 bg-slate-100 p-4 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="text-center text-2xl font-semibold mb-8">
          POST YOUR PRODUCT
        </div>
        <div className="box border border-slate-200 p-4 rounded-lg">
          <div className="mb-4 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-custom_primary focus:border-2"
              id="title"
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-custom_primary focus:border-2"
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-custom_primary focus:border-2"
              id="address"
              name="address"
              value={product.address}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-custom_primary focus:border-2"
              id="price"
              type="text"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="seller_mobile_number"
            >
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-custom_primary focus:border-2"
              id="seller_mobile_number"
              type="text"
              name="seller_mobile_number"
              value={product.seller_mobile_number}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="product_image_url"
            >
              Image
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-custom_primary focus:border-2"
              id="product_image_url"
              type="text"
              name="product_image_url"
              value={product.product_image_url}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <button
            className="w-full bg-custom_primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            POST NOW
          </button>
        </div>
      </form>
      <div className="mt-48">
        <Footer />
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default SellForm;
