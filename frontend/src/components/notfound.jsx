"use client";
import { Empty } from "keep-react";

export const NotFound = () => {
  return (
    <Empty
      title="Oops! You seem to be lost"
      content="Algi baar se hath pakaad ke le chalte hai"
      buttonText="Go To Home Page"
      redirectBtnSize="md"
      redirectUrl="/"
      image={
        <img
          src="https://staticmania.cdn.prismic.io/staticmania/499b23f3-41ed-4bc9-a9eb-43d13779d2f8_Property+1%3DSad+screen_+Property+2%3DSm.svg"
          height={234}
          width={350}
          alt="404"
        />
      }
    />
  );
};
