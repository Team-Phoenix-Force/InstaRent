"use client";

import { CarouselComponent } from "../components/carousel";
import { Chat, Phone, PlusCircle } from "phosphor-react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { Badge } from "keep-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function View() {
	const [Itemstatus, setItemStatus] = useState("Available");
	const [wishStatus, setWishStatus] = useState("ADD TO WISHLIST");
	const [sellerid, setSellerid] = useState("");

	const { id } = useParams();

	const [product, setProduct] = useState({});
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.post("http://localhost:3000/products/product", {
					id,
				});
				console.log(response.data);

				if (response.data.product) {
					setProduct(response.data.product);
					setSellerid(response.data.product.userid);
				} else {
					console.log("No product found in the response.");
				}
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchData();
	}, []);

	// useEffect(() => {
	// 	// Now you can safely use product here
	// 	if (product) {
	// 		console.log(product);
	// 		setSellerid(product.userid);
	// 	}
	// }, [product]);

	const userid = localStorage.getItem("userid");

	useEffect(() => {
		const wishChecker = async () => {
			const response = await axios.post(
				"http://localhost:3000/wishlist/checkWish",
				{
					userid,
					id,
				}
			);
			if (response.data.status === true) {
				setWishStatus("CHECK WISHLIST");
			} else {
				setWishStatus("ADD TO WISHLIST");
			}
		};
		wishChecker();
	}, [userid, id]);

	const handleWish = async () => {
		if(wishStatus === "CHECK WISHLIST"){
			navigate("/wishlist");
		}
		const response = await axios.post(
			"http://localhost:3000/wishlist/addWish",
			{
				userid,
				id,
				page: "product",
			}
		);
		console.log(response.data.status);
		console.log("above");
		if (response.data.status === true) {
			console.log("added");
			setWishStatus("CHECK WISHLIST");
		} else {
			setWishStatus("ADD TO WISHLIST");
		}
	};


	const navigate = useNavigate();

	const handleChat = () => {
		if (sellerid) navigate(`/chat/${userid}/${sellerid}`);
	};

	return (
		<div>
			<Navbar />
			<div className="body h-full bg-[#F2F4F5] mt-20">
				<div className="flex flex-col md:flex-row justify-around h-400">
					<div className="left-section flex flex-col w-full md:w-3/3 my-10">
						<div className="img px-24 mx-10 bg-black border h-[30rem] pt-0">
							{product && (
								<img
									className="w-full h-full object-cover"
									src={product.product_image_url}
								/>
							)}
						</div>
						<div class="description shadow-md border bg-white flex flex-col justify-between m-8 rounded-md w-[48rem]">
							<div class="text-4xl font-bold text-gray-900 m-2">
								Description
							</div>

							<p className="text-gray-900 m-2 text-sm">
								{product && <p>{product.description}</p>}
							</p>
						</div>
					</div>
					<div className="right-section w-full md:w-2/3 flex flex-col my-16 gap-8">
						<div className="pricecard border border-gray-100 h-48 flex flex-col justify-around p-4 mr-4 bg-white rounded-md">
							<div className="price font-bold text-8xl">
								{product && <p>Rs.{product.price} / {product.per}  </p>}
							</div>
							<div className="w-16 flex gap-4">
								<Badge size="sm" colorType="light" color="gray">
									Status
								</Badge>
								<Badge
									size="sm"
									colorType="light"
									color={Itemstatus == "Available" ? "success" : "error"}
								>
									{Itemstatus}
								</Badge>
							</div>

							<div className="bottom flex justify-between">
								<p className="city">
									{product && (
										<p className="text-xl font-medium">{product.title}</p>
									)}
								</p>
								<span>
									<Badge size="sm" colorType="light" color="gray">
										{product.city}
									</Badge>
								</span>
							</div>
						</div>
						<div className="ownerdetail h-50 border border-gray-100 flex flex-col justify-center items-center gap-4 mr-4 bg-white rounded-md mt-3">
							<p className="text-gray-900 font-bold py-2 mx-4 align-left">
								{product && <p>{product.userid}</p>}
							</p>
							<button
								onClick={handleChat}
								className=" text-gray-900 font-bold py-2 mx-4 w-3/4 outline outline-custom_primary flex justify-center items-center gap-2 rounded-xl"
							>
								<Chat size={32} color="#5AE4A8" weight="bold" />
								<p>CHAT WITH OWNER</p>
							</button>
							<button
								className=" text-gray-900 font-bold py-2 mx-4 w-3/4 outline outline-custom_primary flex justify-center items-center gap-2 rounded-xl"
								onClick={handleWish}
							>
								<PlusCircle size={32} color="#5AE4A8" weight="bold" />
								<p>{wishStatus}</p>
							</button>
							<div className="text-gray-900 font-bold py-2 mx-4 flex justify-center items-center gap-2">
								<Phone size={32} weight="bold" />
								<p>Mobile No. {product.seller_mobile_number}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default View;
