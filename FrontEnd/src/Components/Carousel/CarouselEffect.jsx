import React from "react";
import styles from "./CarouselEffect.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { carouselImg } from "./data.js";

function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={true}
        showArrows={true}
      >
        {carouselImg.map((img) => {
          return <img key={img} src={img} alt="image-of-item" />;
        })}
      </Carousel>
      <div className={styles.hero__img}></div>
    </div>
  );
}

export default CarouselEffect;
