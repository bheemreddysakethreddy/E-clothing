import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 pt-8">
        <div className="relative rounded-4xl overflow-hidden shadow-sm">
          <img
            src="hero.png"
            alt="Latest fashion"
            className="w-full h-[280px] sm:h-[380px] md:h-[460px] object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent flex items-center">
            <div className="pl-6 sm:pl-12 max-w-md text-white">
              <h1 className="text-2xl sm:text-4xl font-bold leading-tight">
                Discover the <br /> Latest Trends
              </h1>
              <p className="mt-3 text-sm sm:text-base text-gray-200">
                Upgrade your wardrobe with handpicked styles for every season.
              </p>

              <button
                onClick={() => navigate("/trending")}
                className="mt-6 inline-flex items-center gap-2 cursor-pointer bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                Shop Trending
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Shop by Category
          </h2>
          <p className="text-gray-500 mt-2">Styles curated just for you</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <CategoryCard
            image="men.png"
            title="Men"
            subtitle="Everyday & Formal"
            onClick={() => navigate("/men")}
          />

          <CategoryCard
            image="women.png"
            title="Women"
            subtitle="Modern & Elegant"
            onClick={() => navigate("/women")}
          />

          <CategoryCard
            image="kid.png"
            title="Kids"
            subtitle="Comfort & Fun"
            onClick={() => navigate("/kid")}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;

/* ---------- Category Card ---------- */
const CategoryCard = ({ image, title, subtitle, onClick }) => {
  return (
    <div onClick={onClick} className="group cursor-pointer">
      <div className="relative rounded-2xl overflow-hidden shadow-md">
        <img
          src={image}
          alt={title}
          className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
      </div>

      <div className="mt-4 flex items-center justify-between px-1">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>

        <FontAwesomeIcon
          icon={faArrowRight}
          className="text-gray-400 group-hover:text-black transition"
        />
      </div>
    </div>
  );
};
