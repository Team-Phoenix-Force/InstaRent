import ProductCard from "../components/productCard.jsx";

const Topdeals = () => {
	return (
		<section
			className="services flex flex-col justify-center items-center gap-10 my-10"
			id="services"
		>
			<div className="heading flex flex-col justify-center items-center gap-4">
				<span className="text-lg font-semibold text-custom_primary">
					Best Services
				</span>
				<div className="text-[32px] font-bold text-center">
					Explore Our Top Deals
				</div>
			</div>
			<div className="services-container flex justify-center items-center gap-16 flex-wrap">
				<div className="services-container flex justify-center items-center gap-16 flex-wrap">
					<ProductCard
						img="https://images.prismic.io/staticmania/45ce2799-f29b-462f-a795-5d3d5d10c9ad_product-1.avif?auto=compress,format"
						price="1000"
						title="Nike Shoes"
					/>
					<ProductCard
						img="https://images.prismic.io/staticmania/45ce2799-f29b-462f-a795-5d3d5d10c9ad_product-1.avif?auto=compress,format"
						price="1000"
						title="Nike Shoes"
					/>{" "}
					<ProductCard
						img="https://images.prismic.io/staticmania/45ce2799-f29b-462f-a795-5d3d5d10c9ad_product-1.avif?auto=compress,format"
						price="1000"
						title="Nike Shoes"
					/>{" "}
					<ProductCard
						img="https://images.prismic.io/staticmania/45ce2799-f29b-462f-a795-5d3d5d10c9ad_product-1.avif?auto=compress,format"
						price="1000"
						title="Nike Shoes"
					/>{" "}
					<ProductCard
						img="https://images.prismic.io/staticmania/45ce2799-f29b-462f-a795-5d3d5d10c9ad_product-1.avif?auto=compress,format"
						price="1000"
						title="Nike Shoes"
					/>{" "}
					<ProductCard
						img="https://images.prismic.io/staticmania/45ce2799-f29b-462f-a795-5d3d5d10c9ad_product-1.avif?auto=compress,format"
						price="1000"
						title="Nike Shoes"
					/>{" "}
					<ProductCard
						img="https://images.prismic.io/staticmania/45ce2799-f29b-462f-a795-5d3d5d10c9ad_product-1.avif?auto=compress,format"
						price="1000"
						title="Nike Shoes"
					/>
				</div>
			</div>
		</section>
	);
};

export default Topdeals;
