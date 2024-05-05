import React, { useState } from 'react';

const ChatList = () => {

  const [chatItems, setChatItems] = useState([
    { name: 'Ramesh', time: '4:13 PM', link: '/chat/ramesh', message: 'Hey there!' },
    { name: 'Akash Paloju', time: '3:56 PM', link: '/chat/akash-paloju', message: 'How\'s it going?' },
    { name: 'Priya Sharma', time: '2:22 PM', link: '/chat/priya-sharma', message: 'Just checking in.' },
    { name: 'Vikram Singh', time: '1:45 PM', link: '/chat/vikram-singh', message: 'Ready for the meeting?' },
   
  ]);

  const addChatItem = (name, time, link, message) => {
    setChatItems([...chatItems, { name, time, link, message }]);
  };

  return (
    <div className="chat-window flex flex-col bg-white shadow-md rounded-lg overflow-y-auto">
      <div className="chat-window-header flex flex-col items-center p-4 border-b border-gray-200">
        <p className="font-bold text-lg">Chats</p>
      </div>
      <div className="chat-window-body flex-grow p-4"> 
        {chatItems.map((item) => (
          <div
            className="chat-item flex items-center py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
            key={item.name}
            onClick={() => window.location.href = item.link}
          >
            <img src="c1c.png" alt="Profile picture" className="rounded-full w-10 h-10 mr-4" />
            <div className="chat-item-content">
              <p className="text-base font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">{item.time}</p>
              <p className="text-sm text-gray-700 mt-1">{item.message}</p>
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
