import Navbar from "../components/navbar";
import c1 from "../assets/c1.png";
import c2 from "../assets/c2.png";
import {
  DotsThreeVertical,
  Chats,
  Smiley,
  PaperPlaneRight,
  PaperclipHorizontal,
} from "phosphor-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
const socket = io.connect("http://localhost:7000");
import { useEffect, useState, useCallback } from "react";

export const Chat = () => {
  const name = localStorage.getItem("userid");
  const { sellerid } = useParams();
  const [userid, setUserid] = useState(name);
  const linkName = joinInAlphabeticalOrder(name, sellerid);
  function joinInAlphabeticalOrder(name, sellerId) {
    const lowerCaseName = name.toLowerCase();
    const lowerCaseSellerId = sellerId.toLowerCase();

    const sortedStrings = [lowerCaseName, lowerCaseSellerId].sort((a, b) =>
      a.localeCompare(b),
    );

    return sortedStrings.join("");
  }

  const [room, setRoom] = useState(linkName);
  const [showChat, setShowChat] = useState(false);
  useEffect(() => {
    socket.emit("join_room", room);
  }, []);

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      console.log("message sent");
      const messageData = {
        room: room,
        author: userid,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const updateMessageList = useCallback(
    (data) => {
      setMessageList((list) => [...list, data]);
    },
    [setMessageList],
  );

  useEffect(() => {
    socket.on("receive_message", updateMessageList);
    return () => {
      socket.off("receive_message", updateMessageList);
    };
  }, [updateMessageList]);

  return (
    // Inside the return statement of the Chat component:

<div className="flex flex-col bg-[#d9d4d4] h-screen">
  <Navbar />
  <div className="flex justify-center bg-white shadow-md h-[80vh] mx-20 mt-28">
    <div className="right-side w-full">
      <div className="header flex justify-between items-center h-20 bg-[#EDEDED]">
        <div className="flex w-full">
          <div className="flex">
            <img className="h-10 rounded-full mx-4" src={c1} alt="" />
            <div className="flex flex-col">
              <div className="title ml-1 text-lg font-medium">{sellerid}</div>
              <div className="text-[#686C72] ml-1">Online</div>
            </div>
          </div>
        </div>
        <div className="group flex gap-2">
          <DotsThreeVertical size={32} />
        </div>
      </div>

      <div className="h-[360px] bg-[#ebe7e4] flex flex-col justify-end overflow-y-scroll">
        {messageList.map((messageContent, index) => (
          <div
            key={index}
            className={`flex ${messageContent.author === userid ? "justify-end" : "justify-start"
              } items-end mb-2 ${messageContent.author === userid ? 'ml-12' : 'mr-12'}`}
          >
            <div className={`max-w-[75%] p-2 ${messageContent.author === userid ? 'bg-gray-200 rounded-br-lg rounded-bl-lg rounded-tr-lg' : 'bg-gray-300 rounded-br-lg rounded-bl-lg rounded-tl-lg'}`}>
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
  </div>
</div>


  );
};
