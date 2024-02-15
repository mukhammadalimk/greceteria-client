import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import RightArrowIcon from "../UI/Icons/RightArrowIcon";
import { Link } from "react-router-dom";
import { CategoryItemTypes } from "../../utils/user-types";
import CategoryItem from ".";

const Categories = ({ categories }: { categories: CategoryItemTypes[] }) => {
  return (
    <div className="section-md category">
      <div className="container">
        <div
          className="section__head"
          style={{ justifyContent: "space-between" }}
        >
          <h2>Shop By Categories</h2>
          <Link to="/categories" className="view-all">
            View All
            <RightArrowIcon />
          </Link>
        </div>
        <div className="category__main">
          <Swiper
            grabCursor={true}
            modules={[Autoplay]}
            slidesPerView="auto"
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            draggable={true}
          >
            {categories.map((category: CategoryItemTypes) => (
              <SwiperSlide key={category._id}>
                <CategoryItem category={category} key={category._id} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Categories;