import { DropdownComponent } from "../components/dropdown.jsx";
import ProductCard from "../components/productCard.jsx";
import Footer from "../components/footer.jsx";
import Navbar from "../components/navbar.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

const Products = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.post("http://localhost:3000/products", {});

				if (
					response.data &&
					Array.isArray(response.data) &&
					response.data.length > 0
				) {
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
		// Now you can safely use products here
		if (products.length > 0) {
			console.log(products[0].title);
		}
	}, [products]);

	return (
		<div>
			<Navbar />
			<div className="categories my-20 pl-10 bg-slate-100 shadow-md mb-4 ">
				<DropdownComponent />
			</div>

			<div className="services-container flex justify-center items-center gap-16 flex-wrap">
				{products.length > 0 ? (
					products.map((product) => (
						<ProductCard
							key={product.id}
							id={product.id}
							img={product.product_image_url}
							price={product.price}
							per={product.per}
							title={product.title}
						/>
					))
				) : (
					<p className="text-xl mb-4">No products found</p>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default Products;
