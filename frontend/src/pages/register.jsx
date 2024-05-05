import React from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const navigate = useNavigate();
	const toastOptions = {
		position: "top-center",
		duration: 1000,
	};
	const [formval, setFormval] = React.useState({
		userid: "",
		name: "",
		email: "",
		city: "",
		password: "",
		confirmPassword: "",
		phone: "",
	});

	const handleChange = (e) => {
		setFormval({ ...formval, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (handleValidation()) {
			const { userid, name, password, email, phone, city } = formval;

			const response = await axios.post(
				"http://localhost:3000/users/register",
				{
					userid,
					name,
					phone,
					password,
					email,
					city,
				}
			);

			const data = response.data;

			if (data.status === false) {
				toast.error(data.message, toastOptions);
			}

			if (data.status === true) {
				toast.success(data.message, toastOptions);
				setTimeout(() => navigate("/login"), 1000);
			}
		}
	};
	const handleValidation = () => {
		const { userid, name, password, confirmPassword, email, phone, city } =
			formval;

		if (password !== confirmPassword) {
			toast.error("Confirm Password do not match!", toastOptions);
			return false;
		}
		if (
			userid === "" ||
			password === "" ||
			confirmPassword === "" ||
			email === "" ||
			phone === "" ||
			name === "" ||
			city === ""
		) {
			toast.error("Please fill out all fields!", toastOptions);
			return false;
		}
		if (userid.length < 3) {
			toast.error("Username must be at least 3 characters long!", toastOptions);
			return false;
		}
		if (phone.length < 10) {
			toast.error(
				"Phone number must be at least 10 digits long!",
				toastOptions
			);
			return false;
		}
		if (password.length < 6) {
			toast.error("Password must be at least 6 characters long!", toastOptions);
			return false;
		}
		return true;
	};

	return (
		<div className="bg-[#f9fafb] flex gap-8 flex-col justify-center items-center min-h-screen min-w-screen">
			<div className="text-3xl font-semibold">Register Your Account</div>
			<div className="p-8 bg-slate-100 shadow-md rounded-md flex flex-col items-center">
				<form
					action=""
					method="post"
					className="w-96 flex flex-col gap-4"
					onSubmit={(e) => handleSubmit(e)}
				>
					<label htmlFor="username" className="font-medium">
						Username
					</label>
					<input
						type="text"
						name="userid"
						id="username"
						className="px-2 w-full border-2 rounded-md outline-2 py-1.5 focus:outline-indigo-600"
						onChange={(e) => handleChange(e)}
					/>

					<label htmlFor="name" className="font-medium">
						Name
					</label>
					<input
						type="text"
						name="name"
						id="name"
						className="px-2 w-full border-2 rounded-md outline-2 py-1.5 focus:outline-indigo-600"
						onChange={(e) => handleChange(e)}
					/>

					<label htmlFor="email" className="font-medium">
						Email address
					</label>
					<input
						type="email"
						name="email"
						id="email"
						className="px-2 w-full border-2 rounded-md outline-2 py-1.5 focus:outline-indigo-600"
						onChange={(e) => handleChange(e)}
					/>

					<label htmlFor="phone" className="font-medium">
						Phone
					</label>
					<input
						type="text"
						name="phone"
						id="phone"
						className="px-2 w-full border-2 rounded-md outline-2 py-1.5 focus:outline-indigo-600"
						onChange={(e) => handleChange(e)}
					/>

					<label htmlFor="city" className="font-medium">
						City
					</label>
					<input
						type="city"
						name="city"
						id="city"
						className="px-2 w-full border-2 rounded-md outline-2 py-1.5 focus:outline-indigo-600"
						onChange={(e) => handleChange(e)}
					/>

					<label htmlFor="password" className="font-medium">
						Password
					</label>
					<input
						type="password"
						name="password"
						id="password"
						className="px-2 w-full border-2 rounded-md outline-2 py-1.5 focus:outline-indigo-600"
						onChange={(e) => handleChange(e)}
					/>

					<label htmlFor="confirmPassword" className="font-medium">
						Confirm Password
					</label>
					<input
						type="password"
						name="confirmPassword"
						id="confirmPassword"
						className="px-2 w-full border-2 rounded-md outline-2 py-1.5 focus:outline-indigo-600"
						onChange={(e) => handleChange(e)}
					/>

					<button
						type="submit"
						className="w-full mt-4 bg-custom_primary text-white font-medium rounded-md outline-2 py-1.5 hover:bg-indigo-500"
					>
						Register
					</button>

					<div className="flex gap-4 justify-center">
						<span className=" text-gray-700">Already have an account?</span>
						<a
							href="/login"
							className=" text-custom_primary font-semibold cursor-pointer"
						>
							Login
						</a>
					</div>
				</form>
			</div>
			<Toaster position="top-center" />
		</div>
	);
};
export { Register };
