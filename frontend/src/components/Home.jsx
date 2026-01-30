import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { productsFetch } from "../redux/thunks/producttunk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const Navigate = useNavigate();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(productsFetch("https://dummyjson.com/products"));
  // }, []);
  return (
    <>
      <div className=" absolute top-20 w-full h-auto bg-white flex flex-col items-center">
        <div className="h-[150%] w-[60%] p-5 relative">
          <img
            src="hero.png"
            alt=""
            className="h-full w-full bg-amber-50 rounded-2xl object-cover"
          />
          <button
            onClick={() => Navigate("/trending")}
            className="w-25 h-10 bg-amber-50 cursor-pointer absolute top-[50%] left-[50%] translate-[-50%] rounded-md border-0"
          >
            Trending
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
        <div className="flex gap-10 h-[30%] justify-evenly items-center px-2 pb-20">
          <div className="w-[20] h-[90%] bg-amber-50 rounded-2xl relative">
            <img
              src="men.png"
              alt=""
              className="h-full w-full bg-amber-50 rounded-2xl object-cover"
            />
            <button
              onClick={() => Navigate("/men")}
              className="w-20 h-10 cursor-pointer bg-amber-50 absolute top-[50%] left-[50%] translate-[-50%] rounded-md border-0"
            >
              Mens
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <div className="w-[20] h-[90%] bg-amber-50 relative rounded-2xl">
            <img
              src="women.png"
              alt=""
              className="h-full w-full bg-amber-50 rounded-2xl object-cover"
            />
            <button
              onClick={() => Navigate("/women")}
              className="w-25 h-10 cursor-pointer bg-amber-50 absolute top-[50%] left-[50%] translate-[-50%] rounded-md border-0"
            >
              Womens
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <div className="w-[20] h-[90%] bg-amber-50 relative rounded-2xl">
            <img
              src="kid.png"
              alt=""
              className="h-full w-full bg-amber-50 rounded-2xl object-cover"
            />
            <button
              onClick={() => Navigate("/kid")}
              className="w-20 h-10 cursor-pointer bg-amber-50 absolute top-[50%] left-[50%] translate-[-50%] rounded-md border-0"
            >
              Kids
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
