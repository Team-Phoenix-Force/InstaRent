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
            className={`flex ${messageContent.author === userid ? "justify-end" : "justify-start"
              }`}
          >
            <div className={`max-w-[75%] p-2 ${messageContent.author === userid ? 'bg-gray-200 rounded-br-lg rounded-bl-lg rounded-tr-lg' : 'bg-gray-300 rounded-br-lg rounded-bl-lg rounded-tl-lg'} ${messageContent.author === userid ? 'mr-2' : 'ml-2'}`}>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-400 p-0.5">
                  <img
                    src={messageContent.author === userid ? c2 : c1}
                    alt=""
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
                <div className="">
                  <p className="text-sm">{messageContent.message}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#F0F0F0] h-16 flex justify-around items-center gap-2 py-2">
        <Smiley size={32} />
        <PaperclipHorizontal size={32} className=" rotate-90" />
        <input
          className="rounded-full w-full md:w-4/5 h-10 p-2 pl-4"
          type="text"
          placeholder="Type a Message"
          value={currentMessage}
          onChange={(event) => setCurrentMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          className="hidden md:inline-block w-12" 
          onClick={sendMessage}
        >
          <PaperPlaneRight size={32} />
        </button>
        <button className="md:hidden" onClick={sendMessage}>
          
        </button>
      </div>
    </div>

  );
};