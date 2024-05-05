import React, { useEffect } from "react";
import c1 from "../assets/c1.png";
import logo from "../assets/logo.jpeg";
import { AvatarComponent } from "./Avatar.jsx";
import { SearchBarComponent } from "./search.jsx";
import { ButtonComponent } from "./sellbutton.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [loginstatus, setLoginStatus] = React.useState(false);
  const [name, setName] = React.useState("");
  const [userid, setUserid] = React.useState("");
  const [message, setMessage] = React.useState("");

  const navigate = useNavigate();
  // let a = "";

  const handleKeyDown = (event) => {
    console.log("Key pressed:", event.key);
    if (event.key === "Enter") {
      console.log("Inside Enter condition");
      console.log("pressed");
      const enteredValue = event.target.value;
      navigate(`/search/${enteredValue}`);
      window.location.reload();
      // a = "";
    }
  };

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("loginstatus");
    const storedName = localStorage.getItem("name");
    const storedUserid = localStorage.getItem("userid");

    if (storedLoginStatus === "true") {
      setLoginStatus(true);
      setName(storedName);
      setUserid(storedUserid);
    }
  }, []);

  // useEffect(() => {
  // 	localStorage.setItem("loginstatus", loginstatus.toString());
  // 	localStorage.setItem("name", name);
  // 	localStorage.setItem("userid", userid);
  // }, [loginstatus, name, userid]);

  // useEffect(() => {
  // 	axios
  // 		.post(
  // 			"http://localhost:3000/users",
  // 			{ userid: userid },
  // 			{ withCredentials: true }
  // 		)
  // 		.then((res) => {
  // 			if (res.data.status === true) {
  // 				console.log(res.data);
  // 				setName(res.data.name);
  // 				setLoginStatus(true);
  // 				setUserid(res.data.userid);
  // 			}
  // 		})
  // 		.catch((error) => {
  // 			console.error("Error fetching user data:", error);
  // 			// setLoginStatus(false);
  // 		});
  // }, []);

  return (
    <div>
      <div className="navbar flex justify-around items-center h-20 bg-[#ffffff] shadow-md fixed top-0 z-10 w-screen">
        <a href="/">
          <img src={logo} alt="" className="h-16 my-2 rounded-md" />
        </a>

        <div className="search-bar w-1/2" onKeyDown={handleKeyDown}>
          <SearchBarComponent />
        </div>

        {loginstatus ? (
          <div className="flex gap-8">
            <ButtonComponent />
            <div className="mr-8 hover:cursor-pointer ">
              <AvatarComponent avatar={c1} />
            </div>
          </div>
        ) : (
          <span className="h-[2.8rem] px-4 py-1 header-btn bg-custom_primary rounded-md transition-colors duration-500 hover:bg-custom_primary">
            <a href="/login" className=" text-white text-xl ">
              Login
            </a>
          </span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
