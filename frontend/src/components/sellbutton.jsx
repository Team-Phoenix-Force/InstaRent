"use client";
import { Button } from "keep-react";
import { Plus } from "phosphor-react";
import { useNavigate } from "react-router-dom";

export const ButtonComponent = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    console.log("clicked");
    navigate("/sellform");
  };

  return (
    <>
      <div className="btn rounded-lg flex gap-2 border-custom_primary border-2 shadow-sm ">
        <Button type="outlinePrimary" size="sm" onClick={handleOnClick}>
          <span className="pr-2">
            <Plus size={24} />
          </span>
          POST
        </Button>
      </div>
    </>
  );
};
