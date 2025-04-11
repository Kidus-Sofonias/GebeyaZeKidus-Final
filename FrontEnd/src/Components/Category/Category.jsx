import React from "react";
import { categoryInfo } from "./categoryInfo.js";
import CategoryCard from "/src/Components/Category/CategoryCard.jsx";
import styles from "./Category.module.css"

function Category() {
  return (
    <div className={styles.category__container}>
      {categoryInfo.map((item) => (
        <CategoryCard key={item.id} data={item} />
      ))}
    </div>
  );
}

export default Category;
