"use client";
import { Heart } from "phosphor-react";
import { Badge, Button, Card } from "keep-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export const ProductCard = (props) => {
  const navigate = useNavigate();

  const [wishStatus, setWishStatus] = useState(false);

  const id = props.id;
  console.log(id);
  const handleClick = () => {
    console.log("clicked");
    navigate(`/products/product/${id}`);
  };

  const userid = localStorage.getItem("userid");

  const handleWish = async () => {
    const response = await axios.post(
      "http://localhost:3000/wishlist/addWish",
      {
        userid,
        id,
      },
    );
    console.log(response.data.status);
    console.log("above");
    if (response.data.status === true) {
      console.log("true");
      setWishStatus(true);
    } else {
      console.log("false");
      setWishStatus(false);
    }
  };

  useEffect(() => {
    const wishChecker = async () => {
      const response = await axios.post(
        "http://localhost:3000/wishlist/checkWish",
        {
          userid,
          id,
        },
      );
      if (response.data.status === true) {
        setWishStatus(true);
      }
    };
    wishChecker();
  }, [userid, id]);

  return (
    <>
      <Card
        className="max-w-xs overflow-hidden rounded-md shadow-md"
        imgSrc={props.img}
        imgSize="md"
      >
        <Card.Container className="absolute top-3.5 right-3.5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-50/50">
          <Heart
            size={20}
            weight="bold"
            color={wishStatus ? "red" : "white"}
            onClick={handleWish}
          />
        </Card.Container>
        <Card.Container className="p-6">
          <Card.Container className="flex items-center justify-between">
            <Badge size="xs" colorType="light" color="gray">
              For Rent
            </Badge>
            <Card.Title>{props.price}</Card.Title>
          </Card.Container>
          <Card.Container className="my-3">
            <Card.Title className="truncate font-semibold text-xl">
              {props.title}
            </Card.Title>
          </Card.Container>
        </Card.Container>
      </Card>
    </>
  );
};
