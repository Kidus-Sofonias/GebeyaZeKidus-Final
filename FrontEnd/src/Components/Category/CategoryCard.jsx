import React from "react";
import styles from "./Category.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function CategoryCard({ data }) {
  const { t } = useTranslation();

  return (
    <div className={styles.category}>
      <Link to={`/category/${data.category}`}>
        <span>
          <h2>{t(data.category)}</h2> {/* Translate category */}
        </span>
        <img src={data.image} alt="" />
        <p>{t("shopNow")}</p> {/* Translate "Shop now" */}
      </Link>
    </div>
  );
}

export default CategoryCard;
