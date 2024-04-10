import { useEffect, useState } from "react";
import { EmptyComponent } from "../components/emptyresult.jsx";
import Footer from "../components/footer.jsx";
import Navbar from "../components/navbar.jsx";
import { ProductCard } from "../components/productCard.jsx";
import axios from "axios";

export const Wishlist = () => {
  const [products, setProducts] = useState({});
  const userid = localStorage.getItem("userid");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:7000/showWishlist",
          { userid }
        );
        console.log(response.data);
        if (response.data) {
          setProducts(response.data);
        } else {
          console.log("No products found in the response.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      console.log(products);
    }
  }, [products]);

  return (
    <div className="h-screen flex flex-col justify-between">
      <Navbar />
      {products && products.length > 0 ? ( // Check if products is not null
        <div className="flex justify-start h-full mt-32 mx-8 gap-4 mb-10">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              img={product.product_image_url}
              price={`Rs ${product.price}`}
              title={product.title}
            />
          ))}
        </div>
      ) : (
        <EmptyComponent
          title="You haven't liked anything yet."
          content="Express your love for the products you like."
        />
      )}

      <Footer />
    </div>
  );
};