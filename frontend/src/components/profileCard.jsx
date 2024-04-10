"use client";
import { Avatar, Button, Card } from "keep-react";
import { Calendar, EnvelopeSimple } from "phosphor-react";
import c1 from "../assets/c1.png";

export const ProfileCard = () => {
  const userid = localStorage.getItem("userid");
  const name = localStorage.getItem("name");

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:5173/profile/${userid}`);
    alert("profile copied to the clipboard");
  };

  return (
    <Card
      imgSrc="https://images.prismic.io/staticmania/821cee7b-6b44-48c4-ab95-8a525056489d_blog.jpg?auto=compress,format"
      imgSize="md"
      className="max-w-xs mt-10"
    >
      <Card.Container className="flex flex-col justify-center">
        <Card.Container className="absolute top-32 left-1/2 transform -translate-x-1/2  rounded-full ring-4 ring-white ring-offset-0 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
          <Avatar size="2xl" shape="circle" img={c1} />
        </Card.Container>
        <Card.Container className="mt-10 mb-3 ml-5">
          <Card.Title className="text-md md:text-base font-semibold text-slate-800">
            Name : {name} <br></br>
            Username : {userid}
          </Card.Title>
        </Card.Container>

        <Card.Container className="ml-5">
          <Card.Title className="text-xs font-semibold text-slate-800">
            User verified with <EnvelopeSimple size={20} weight="bold" />
          </Card.Title>
        </Card.Container>

        <Card.Container className="flex w-full justify-between border-t border-t-slate-50 py-3 px-5"></Card.Container>
        <Card.Container className="flex w-full justify-center my-4">
          <Button
            size="sm"
            type="primary"
            color="success"
            className="mx-5 my-5"
            onClick={handleCopy}
          >
            Share Profile
          </Button>
        </Card.Container>
      </Card.Container>
    </Card>
  );
};
