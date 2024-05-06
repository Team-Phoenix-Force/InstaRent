import { DropdownComponent } from "../components/dropdown.jsx";
import ProductCard from "../components/productCard.jsx";
import Footer from "../components/footer.jsx";
import Navbar from "../components/navbar.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const FilteredProducts = () => {
	const [products, setProducts] = useState([]);
	const { searchedText } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userCity = localStorage.getItem("city");
				console.log("searchedText", searchedText);
				console.log("city", userCity);
				const response = await axios.post(
					"https://26d7-35-187-148-235.ngrok-free.app/search",
					{ searchedText, userCity }
				);
				console.log(response.data);
				if (response.data) {
					setProducts(response.data);
				} else {
					console.log("No products found in the response");
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
		<div>
			<Navbar />

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
					<p>No products found</p>
				)}
			</div>

			<Footer />
		</div>
	);
};

export default FilteredProducts;
