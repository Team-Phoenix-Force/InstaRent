/* eslint-disable react/prop-types */
"use client";
import { Avatar, Popover } from "keep-react";
import { User, Chat,Heart, SignOut, Gear, Question } from "phosphor-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const PopoverContent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/users/logout")
      .then((res) => {
        if (res.data.status === true) {
          console.log("Logout successful");
          navigate("/login");
        } else {
          alert("Logout failed");
        }
      })
      .catch((err) => {
        console.error("Logout error:", err);
        alert("Logout failed. Please try again.");
      });
  };
  const userid = localStorage.getItem("userid");

  return (
    <div className="flex flex-col justify-center gap-2 w-40">
      <div className="flex gap-4 hover:outline rounded-md hover:outline-custom_primary hover:outline-2 py-2 text-textcolor font-medium">
        <User size={20} fontWeight="bold" />
        <Link to={`/profile/${userid}`}>View Profile</Link>
      </div>
      <div className="flex gap-4 hover:outline rounded-md hover:outline-custom_primary hover:outline-2 py-2 text-textcolor font-medium">
        <Chat size={20} fontWeight="bold" />
        <Link to={`/chatlist/`}>Chats</Link>
      </div>
      <div className="flex gap-4 hover:outline rounded-md hover:outline-custom_primary hover:outline-2 py-2 text-textcolor font-medium">
        <Heart size={20} fontWeight="bold" />
        <a href="/wishlist">Wishlist</a>
      </div>
      <hr />
      <div className="flex gap-4 hover:outline rounded-md hover:outline-custom_primary hover:outline-2 py-2 text-textcolor font-medium">
        <Gear size={20} fontWeight="bold" />
        <a href="not-found">Settings</a>
      </div>
      <div className="flex gap-4 hover:outline rounded-md hover:outline-custom_primary hover:outline-2 py-2 text-textcolor font-medium">
        <Question size={20} fontWeight="bold" />
        <a href="not-found">Help</a>
      </div>
      <div className="flex gap-4 hover:outline rounded-md hover:outline-custom_primary hover:outline-2 py-2 text-textcolor font-medium">
        <SignOut size={20} fontWeight="bold" />
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export const AvatarComponent = ({ avatar }) => {
  return (
    <Popover additinalContent={<PopoverContent />} customClass="shadow-md">
      <Avatar shape="rounded" img={avatar} size="md" />
    </Popover>
  );
};
