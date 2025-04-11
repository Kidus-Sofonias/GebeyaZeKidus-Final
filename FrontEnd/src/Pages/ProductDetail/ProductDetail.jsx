import React, { useEffect, useState } from "react";
import styles from "./ProductDetail.module.css";
import Layout from "../../Components/Layout/Layout";
import { productUrl } from "../../Api/endPoint";
import ProductCard from "../../Components/Product/ProductCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(false); // Initialize as null
  const [isLoading, setLoading] = useState(false); // Initialize as false

  useEffect(() => {
    const url = `${productUrl}/products/${productId}`;
    //console.log("Requesting URL:", url); // Debugging line
    setLoading(true); // Set loading state
    axios
      .get(url)
      .then((res) => {
        //console.log("Fetched product data:", res.data); // Debugging line
        setProduct(res.data);
        setLoading(false); // Set loading state to false
      })
      .catch((err) => {
        //console.log("Product Error:", err); // Improved error logging
        setLoading(false); // Set loading state to false
      });
  }, [productId]); // Add productId as a dependency

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard
          data={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    </Layout>
  );
}

export default ProductDetail;
