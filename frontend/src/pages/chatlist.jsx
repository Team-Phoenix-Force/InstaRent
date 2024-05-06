import React, { useEffect, useState } from 'react';
import axios from 'axios';
import c1 from '../assets/c1.png';
import c2 from '../assets/c2.png';
import c3 from '../assets/c3.png';


const ChatList = () => {

  const [chatItems, setChatItems] = useState([]);

  const profilepics = [c1, c2, c3];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userid = localStorage.getItem('userid');
        console.log(userid)
        const response = await axios.get(`http://localhost:8000/messages/${userid}`);
        console.log(response.data.other_users);

        const newChatItems = response.data.other_users.map((friend) => ({
          name: friend,
          link: `/chat/${userid}/${friend}`,
        }));
        setChatItems(newChatItems);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="chat-window flex flex-col bg-white shadow-md rounded-lg overflow-y-auto">
      <div className="chat-window-header flex flex-col items-center p-4 border-b border-gray-200">
        <p className="font-bold text-lg">Chats</p>
      </div>
      <div className="chat-window-body flex-grow p-4"> 
        {chatItems.map((item,index) => (
          <div
            className="chat-item flex items-center py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
            key={item.name}
            onClick={() => window.location.href = item.link}
          >
            <img src={profilepics[index % 3]} alt="Profile picture" className="rounded-full w-10 h-10 mr-4" />
            <div className="chat-item-content">
              <p className="text-base font-medium">{item.name}</p>
              {/* <p className="text-sm text-gray-500">{item.time}</p>
              <p className="text-sm text-gray-700 mt-1">{item.message}</p> */}
            </div>
          </div>
        ))}

        {chatItems.length > 10 && ( 
          <div className="flex justify-center mt-4">
            <div className="h-3 w-3 bg-gray-400 rounded-full animate-ping"></div>
          </div>
        )}
      </div>
      <div className="chat-list-container flex justify-center"> 
        <div className="chat-window flex flex-col">
         
        </div>
      </div>
    </div>
  );
};

export default ChatList;
