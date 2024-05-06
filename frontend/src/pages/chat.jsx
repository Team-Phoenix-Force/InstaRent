import React, { useState, useEffect } from "react";
import axios from "axios";
import "./chat.css";

export const Chat = () => {
	const [messageList, setMessageList] = useState([]);
	const [currentMessage, setCurrentMessage] = useState("");
	const [mainUser, setMainUser] = useState("");
	const [otherUser, setOtherUser] = useState("");

	useEffect(() => {
		// Extract mainUser and otherUser from the current URL
		const pathname = window.location.pathname;
		console.log(pathname);
		const users = pathname.split("/").filter((user) => user !== "chat");
		console.log(users);
		if (users) {
			setMainUser(users[1]);
			setOtherUser(users[2]);
		} else {
			console.error("Invalid URL format");
		}
	}, []);

	useEffect(() => {
		if (mainUser && otherUser) {
			fetchMessages(); // Fetch messages initially
			const interval = setInterval(fetchMessages, 2500); // Poll for new messages every 2.5 seconds
			return () => clearInterval(interval); // Cleanup interval on component unmount
		}
	}, [mainUser, otherUser]);

	const fetchMessages = () => {
		axios
			.get(`http://localhost:8000/chat/${mainUser}/${otherUser}/`)
			.then((response) => {
				setMessageList(response.data.messages || []);
			})
			.catch((error) => {
				console.error("Error fetching messages:", error);
			});
	};

	const sendMessage = (e) => {
		e.preventDefault();
		if (currentMessage.trim() !== "") {
			axios
				.post(`http://localhost:8000/send/${mainUser}/${otherUser}/`, {
					message: currentMessage,
					csrfmiddlewaretoken: document.querySelector(
						"input[name=csrfmiddlewaretoken]"
					).value,
				})
				.then((response) => {
					console.log(response.data.message);
					setCurrentMessage("");
					fetchMessages(); // Fetch messages again after sending
				})
				.catch((error) => {
					console.error("Error sending message:", error);
				});
		}
	};

	return (
		<div className="chat-container">
			<div className="message-list">
				{messageList.map((message, index) => (
					<div
						key={index}
						className={message.sender !== mainUser ? "sent" : "received"}
					>
						<p>{message.message}</p>
					</div>
				))}
			</div>
			<form id="message" onSubmit={sendMessage}>
				<div className="message-input">
					<input
						type="text"
						value={currentMessage}
						onChange={(e) => setCurrentMessage(e.target.value)}
					/>
					<input
						type="hidden"
						name="csrfmiddlewaretoken"
						value="{% csrf_token %}"
					></input>
					<button type="submit">Send</button>
				</div>
			</form>
		</div>
	);
};
