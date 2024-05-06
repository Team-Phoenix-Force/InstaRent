// SellForm.js
import { useState } from "react";
// import { UploadComponent } from "../components/upload";
import Footer from "../components/footer";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SellForm = () => {
	const [selectedOption, setSelectedOption] = useState("");
	const [paymentInitiated, setPaymentInitiated] = useState(false);

	const handleOptionChange = (option) => {
		setSelectedOption(option);
		console.log(option);
	};
	const navigate = useNavigate();
	const [product, setProduct] = useState({
		title: "",
		description: "",
		price: "",
		per: "day",
		city: "",
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
			city,
			seller_mobile_number,
			product_image_url,
		} = product;
		const per = product.per.toLowerCase();
		console.log("per", per);
		const userid = localStorage.getItem("userid").toString();

		const response = await axios.post(
			"http://localhost:3000/products/addProduct",
			{
				title,
				description,
				price,
				per,
				city,
				seller_mobile_number,
				product_image_url,
				userid,
			}
		);

		const data = response.data;
		console.log("1");

		if (data.status === false) {
			console.log("2");
			// toast.error(data.message, toastOptions);
		}

		if (data.status === true) {
			console.log("3");
			// toast.success(data.message, toastOptions);
			alert("added to cart");
			setTimeout(() => navigate("/"), 1000);
		}
		console.log("Form submitted:", product);
		console.log("userid", userid);
	};

	const paymentHandler = async (e) => {
		handleSubmit(e);

		console.log(`selected option is ${selectedOption}`);
		const amount = selectedOption * 100;
		console.log(`selected option is ${amount}`);
		const currency = "INR";
		const receiptId = "abcde";

		const response = await fetch("http://localhost:3000/order", {
			method: "POST",
			body: JSON.stringify({
				amount,
				currency,
				receipt: receiptId,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const order = await response.json();
		console.log(order);

		var options = {
			key: "rzp_test_zRrOrFkl00ULTN", // Enter the Key ID generated from the Dashboard
			amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
			currency: "INR",
			name: "InstaRent",
			description: "Test Transaction",
			image: "https://example.com/your_logo",
			order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
			handler: function (response) {
				alert(response.razorpay_payment_id);
				alert(response.razorpay_order_id);
				alert(response.razorpay_signature);
			},
			prefill: {
				name: "Gaurav Kumar",
				email: "gaurav.kumar@example.com",
				contact: "9000090000",
			},
			notes: {
				address: "Razorpay Corporate Office",
			},
			theme: {
				color: "#3399cc",
			},
		};
		var rzp1 = new window.Razorpay(options);
		rzp1.on("payment.failed", function (response) {
			alert(response.error.code);
			alert(response.error.description);
			alert(response.error.source);
			alert(response.error.step);
			alert(response.error.reason);
			alert(response.error.metadata.order_id);
			alert(response.error.metadata.payment_id);
		});
		setPaymentInitiated(true);

		rzp1.open();
		navigate("/");
		e.preventDefault();
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
							htmlFor="city"
						>
							City
						</label>
						<textarea
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-custom_primary focus:border-2"
							id="city"
							name="city"
							value={product.city}
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

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Posting Options
						</label>
						<div className="flex items-center">
							<input
								className="mr-2 leading-tight"
								id="post_for_1_week"
								type="radio"
								name="selectedOption"
								value="49"
								onChange={() => handleOptionChange(49)}
							/>
							<label
								htmlFor="post_for_1_week"
								className="text-sm text-gray-700"
							>
								Post for 1 week - Platform fees <b> Rs 49.00 </b>
							</label>
						</div>
						<div className="flex items-center mt-2">
							<input
								className="mr-2 leading-tight"
								id="post_for_1_month"
								type="radio"
								name="selectedOption"
								value="179"
								onChange={() => handleOptionChange(179)}
							/>
							<label
								htmlFor="post_for_1_month"
								className="text-sm text-gray-700"
							>
								Post for 1 month - Platform fees <b> Rs 179.00</b>
							</label>
						</div>
						<div className="flex items-center mt-2">
							<input
								className="mr-2 leading-tight"
								id="post_for_1_year"
								type="radio"
								name="selectedOption"
								value="1999"
								onChange={() => handleOptionChange(1999)}
							/>
							<label
								htmlFor="post_for_1_year"
								className="text-sm text-gray-700"
							>
								Post for 1 year - Platform fees<b> Rs 1999.00 </b>
							</label>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-between mt-8">
					<button
						className={`w-full m-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${paymentInitiated ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-custom_primary text-white"}`}
						onClick={paymentHandler}
						disabled={paymentInitiated}
						type="submit"
					>
						Post after paying
					</button>
				</div>

				<div className="flex items-center justify-between mt-8"></div>
			</form>
			<div className="mt-48">
				<Footer />
			</div>
			<Toaster position="top-center" />
		</div>
	);
};

export default SellForm;
