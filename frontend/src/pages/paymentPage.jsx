import React, { useState } from "react";
import { DatePicker, Button, Card } from "keep-react";
import { CurrencyInr, ArrowLeft } from "phosphor-react";
import beats from "../assets/beats.png";

const PaymentPage = () => {
	// State to manage rental per
	const [rangeDate, setRangeDate] = useState(null);

	// State for payment amount
	const [paymentAmount, differenceInDays, setPaymentAmount] = useState(0);

	// Function to handle payment calculation
	const calculatePayment = () => {
		const { startDate, endDate } = rangeDate;
		const differenceInTime = endDate.getTime() - startDate.getTime();
		const differenceInDays = differenceInTime / (1000 * 3600 * 24) + 1;
		const calculatedAmount = 79 * differenceInDays; // Replace this with your actual product price

		setPaymentAmount(calculatedAmount);
	};

	// Function to handle payment submission
	const handlePayment = () => {
		// Here you would integrate with your payment gateway to process the payment
		// This is a mock function and does not handle real payments
		// Replace this with your actual payment processing logic
		alert(`Payment of $${paymentAmount} processed successfully!`);
	};

	return (
		<>
			<div className="w-screen h-screen flex flex-wrap justify-center content-center">
				<div className="bg-white w-3/4 h-2/3 lg:flex lg:flex-wrap justify-center content-center rounded-[30px]">
					{/* Left column */}
					<Card className="w-2/3 h-full p-6 rounded-l-[30px]">
						<Card.Container>
							<ArrowLeft className="text-6xl text-[#1B4DFF] absolute top-5 left-5" />
							<Card.Container className="w-1/2 bg-[#e1e2e6] flex items-center justify-center rounded-full ">
								<img src={beats} alt="Product Image" className="w-full" />
							</Card.Container>
							<Card.Container>
								<Card.Title className="text-4xl font-medium text-primary-500">
									Headphones
								</Card.Title>
								<Card.Title className="flex items-center my-3">
									<span className="text-9xl font-bold text-slate-800">₹79</span>
									<span className="ml-1 text-base font-medium text-slate-400">
										/ per day
									</span>
								</Card.Title>
								<Card.Description className="text-base text-slate-700">
									Lorem ipsum dolor sit, amet consectetur adipisicing elit.
									Aperiam commodi facere vero excepturi explicabo similique,
									unde,
								</Card.Description>
							</Card.Container>
						</Card.Container>
					</Card>

					{/* Right column */}
					<Card className="w-1/3 h-full p-6 bg-[#5962c3] rounded-[30px]">
						<Card.Container>
							<Card.Container>
								<Card.Title className="text-7xl font-bold text-[#ffac38]">
									Payment Details
								</Card.Title>
								<Card.Title className="flex items-center my-3">
									<span className="text-4xl font-medium text-slate-800">
										Number of days for rent
									</span>
								</Card.Title>
							</Card.Container>
							<DatePicker rangeDate={setRangeDate}>
								<DatePicker.Range />
							</DatePicker>
							<Card.Container tag="ul" className="my-4 space-y-5">
								<Button type="primary" onClick={calculatePayment}>
									Calculate Payment
								</Button>

								<Card.List className="flex items-center gap-1.5">
									<CurrencyInr size={24} color="#1B4DFF" />
									<span className="text-base text-slate-700">
										Payment Amount: {paymentAmount} {differenceInDays} days
									</span>
								</Card.List>
							</Card.Container>
							<Button type="primary" width="full" onClick={handlePayment}>
								Make Payment
							</Button>
						</Card.Container>
					</Card>
				</div>
			</div>
		</>
	);
};

export default PaymentPage;
