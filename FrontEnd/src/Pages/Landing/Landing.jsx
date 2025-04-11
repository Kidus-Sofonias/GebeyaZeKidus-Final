import React from 'react'
import CarouselEffect from "/src/Components/Carousel/CarouselEffect.jsx";
import Category from "/src/Components/Category/Category.jsx";
import Product from "/src/Components/Product/Product.jsx";
import Footer from "/src/Components/Footer/Footer.jsx"
import Layout from "/src/Components/Layout/Layout.jsx";

function Landing() {
  return (
      <Layout>
        <CarouselEffect />
        <Category />
        <Product />
        <Footer/>
      </Layout>
  );
}

export default Landing