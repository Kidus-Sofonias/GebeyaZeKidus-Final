import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import styles from "./Product.module.css";
import Loader from "../Loader/Loader";

function Product() {
  const [product, setProduct] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProduct(res.data);
        isLoading(false);
      })
      .catch((err) => {
        //console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={styles.product__container}>
          {product.map((item) => (
            <ProductCard key={item.id} data={item} renderAdd={true} />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;
