/* eslint-disable react/no-unescaped-entities */
import Navbar from "../components/navbar";
import c1 from "../assets/c1.png";
import c2 from "../assets/c2.png";
import c3 from "../assets/c3.png";
import about from "../assets/about.jpg";
import ProductCard from "../components/productCard.jsx";
import { CarouselComponent } from "../components/carousel.jsx";
import Footer from "../components/footer.jsx";
import { Calendar, MapPin, Package } from "phosphor-react";
import { Button } from "keep-react";
import { RatingComponent } from "./rating.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const handleClick = () => {
    navigate("products");
  };

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

  const selectFourNumbers = (val) => {
    const selectedNumbers = new Set();

    while (selectedNumbers.size < 8) {
      const randomNum = getRandomInt(val);
      selectedNumbers.add(randomNum);
    }

    return Array.from(selectedNumbers);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");

        if (
          response.data &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          console.log(response.data);
          const fourNumbers = selectFourNumbers(11);
          setProducts([
            response.data[fourNumbers[0]],
            response.data[fourNumbers[1]],
            response.data[fourNumbers[2]],
            response.data[fourNumbers[3]],
            response.data[fourNumbers[4]],
            response.data[fourNumbers[5]],
            response.data[fourNumbers[6]],
            response.data[fourNumbers[7]],
          ]);
        } else {
          console.log("No products found in the response.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Now you can safely use products here
    if (products.length > 0) {
      console.log(products[0].title);
    }
  }, [products]);

  return (
    <>
      <Navbar />
      <section className="text-image flex justify-between mt-20" id="home">
        <div className="flex flex-col xl:ml-20 md:ml-10 gap-16 w-1/3 my-24">
          <div className="text flex flex-col gap-4">
            <div className=" xl:text-[52px] lg:text-[30px] sm:text-[20px] font-bold tracking-wider">
              <span className="text-custom_primary ">Looking </span> to <br />
              rent anything?
            </div>
            <p className="text-md lg:text-sm text-textcolor font-medium">
              Your go-to rental destination for everything you need. From
              gadgets
              <br /> to furniture, find and rent a diverse range of products
              hassle-free
            </p>
          </div>
          <Button
            type="primary"
            size="lg"
            color="success"
            onClick={handleClick}
          >
            Try it Out!
          </Button>
        </div>
        <div className="w-2/3 my-8 self self-center">
          <CarouselComponent />
        </div>
      </section>

      <section
        className="rent flex flex-col justify-center items-center gap-10 mt-10 mb-20"
        id="rent"
      >
        <div className="heading flex flex-col justify-center items-center gap-4 ">
          <span className="text-lg font-semibold text-custom_primary">
            How It Work's
          </span>
          <div className="text-3xl font-bold">Rent with 3 Easy Steps</div>
        </div>
        <div className="rent-container flex justify-center items-center w-screen gap-10">
          <div className="box flex flex-col justify-center items-center gap-4 shadow-2xl w-1/3 mx-8 py-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            <MapPin size={80} color="#18B5B0" />
            <div className="font-medium text-xl">Choose A Location</div>
            <p className="text-center mx-5 w-2/3">
            Discover your dream getaway with our wide selection 
            of vacation rentals for all purposes general.
            </p>
          </div>
          <div className="box flex flex-col justify-center items-center gap-4 shadow-2xl w-1/3 mx-8 py-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            <Calendar size={80} color="#18B5B0" />
            <div className="font-medium text-xl">Pick-Up Date</div>
            <p className="text-center mx-5 w-2/3">
            Find the perfect time to start your adventure with our diverse range of rental options.
            </p>
          </div>
          <div className="box flex flex-col justify-center items-center gap-4 shadow-2xl w-1/3 mx-8 py-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            <Package size={80} color="#18B5B0" />
            <div className="font-medium text-xl">Rent An Item</div>
            <p className="text-center mx-5 w-2/3">
              Rent An Item: Explore our inventory and elevate your experience with ease and convenience.
            </p>
          </div>
        </div>
      </section>

      <section
        className="services flex flex-col justify-center items-center gap-10 my-10"
        id="services"
      >
        <div className="heading flex flex-col justify-center items-center gap-4">
          <span className="text-lg font-semibold text-custom_primary">
            Best Services
          </span>
          <div className="text-[32px] font-bold text-center">
            Explore Our Top Deals
          </div>
        </div>
        <div className="services-container flex justify-center items-center gap-16 flex-wrap" style={{ boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.1)" }}>
          <div className="services-container flex justify-center items-center gap-16 flex-wrap">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product._idid}
                  id={product._id}
                  img={product.product_image_url}
                  price={product.price}
                  per={product.per}
                  title={product.title}
                />
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>

      </section>

      <section
        className="about flex flex-col justify-center items-center gap-10 mt-10 bg-[#E8EAF6] py-5"
        id="about"
      >
        <div className="heading flex flex-col justify-center items-center gap-2">
          <span className="text-lg font-medium">About Us</span>
          <div className="text-3xl font-bold text-center">
            Best Customer Experience
          </div>
        </div>
        <div className="about-container flex justify-end items-center">
          <div className="about-img  w-1/3 flex justify-center">
            <img src={about} alt="" className="h-72" />
          </div>
          <div className="about-text flex flex-col gap-4 w-2/3">
            <span className="text-custom_primary font-medium">ABOUT US</span>
            <p className="text-left">
              At InstaRent, we believe in transforming the way people access and
              experience products. Our platform serves as a dynamic hub for
              renting a vast array of items, from cutting-edge electronics to
              stylish furniture and beyond. With a commitment to simplicity and
              convenience, we've streamlined the rental process, making it easy
              for users to discover, select, and enjoy the latest products
              without the burden of ownership.
            </p>
            <p className="text-left">
              Built on the principles of sustainability and community, InstaRent
              promotes a sharing economy, reducing waste and promoting
              responsible consumption. Our user-friendly interface ensures a
              seamless browsing and renting experience, while our dedicated
              customer support team is always ready to assist. Whether you're
              looking to upgrade your tech, furnish your space, or simply try
              before you buy, InstaRent is your trusted partner in unlocking a
              world of possibilities through hassle-free rentals. Join us in
              redefining ownership and embracing a more sustainable, accessible
              future.
            </p>
            <a
              href="#"
              className="btn w-fit font-medium text-white px-4 py-1 header-btn bg-custom_primary rounded-md transition-colors duration-500 hover:bg-custom_primary"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section
        className="reviews flex flex-col justify-center items-center gap-10 my-10 "
        id="reviews"
      >
        <div className="heading flex flex-col justify-center items-center gap-4">
          <span className="text-lg font-medium text-custom_primary">
            Reviews
          </span>
          <div className="text-3xl font-bold text-center">
            What Our Customers Say
          </div>
        </div>
        <div className="reviews-container flex justify-center items-center flex-wrap gap-16">
          <div className="box p-10 rounded-lg shadow-md w-96">
            <div className="w-32 h-32">
              <img
                src={c1}
                alt=""
                className="rev-img w-full h-full rounded-full object-cover object-center border-2 border-secondary"
              />
            </div>
            <div className="text-lg font-semibold my-2">Riya Khan</div>
            <div className="stars py-2">
              <RatingComponent />
            </div>
            <p className="italic">
              The Plattform fee is the least among other websites which makes it suitable for new users.
            </p>
          </div>

          <div className="box p-10 rounded-lg shadow-md w-96">
            <div className="w-32 h-32">
              <img
                src={c2}
                alt=""
                className="rev-img w-full h-full rounded-full object-cover object-center border-2 border-secondary"
              />
            </div>
            <div className="text-lg font-semibold my-2">Laura Lammi</div>
            <div className="stars py-2">
              <RatingComponent />
            </div>
            <p className="italic">
             The user experience is very smoothing .I havent felt any difficulty in navigating any pages .I loved the UI.
            </p>
          </div>

          <div className="box p-10 rounded-lg shadow-md w-96">
            <div className="w-32 h-32">
              <img
                src={c3}
                alt=""
                className="rev-img w-full h-full rounded-full object-cover object-center border-2 border-secondary"
              />
            </div>
            <div className="text-lg font-semibold my-2">Smitha Singhania</div>
            <div className="stars py-2">
              <RatingComponent />
            </div>
            <p className="italic">
             The best part about this website is the Chat option.I easily commincated with the receiver gave my old mobile phone on rent for a descent price. 
            </p>
          </div>
        </div>
      </section>

      <section className="newsletter flex flex-col justify-center items-center bg-[linear-gradient(#474fa0,#7d82bb)] h-48">
        <div className="text-3xl text-white font-medium">
          Subscribe To Our Newsletter
        </div>
        <div className="box mt-4 bg-white rounded-md p-2 w-350 flex justify-between">
          <input
            type="text"
            placeholder="Enter Your Email..."
            className="border-none outline-none"
          />
          <a
            href="#"
            className="btn w-fit font-medium text-white px-4 py-2 header-btn bg-red-500 rounded-md transition-colors duration-500 hover:bg-custom_primary"
          >
            Subscribe
          </a>
        </div>
        <br />
      </section>

      <Footer />
    </>
  );
};

export default Home;
