import { Link } from "react-router-dom";

const Footer = () => {
    
  return (
    <div className="h-[67px] w-full bg-amber-100 fixed bottom-0 flex gap-10 px-10 justify-between items-center">
      <Link to={"/trending"}>Trending</Link>
      <Link to={"/men"}>mens</Link>
      <Link to={"/women"}>womens</Link>
      <Link to={"/kids"}>kids</Link>
      <Link to={"/"}>home</Link>
    </div>
  );
};

export default Footer;
