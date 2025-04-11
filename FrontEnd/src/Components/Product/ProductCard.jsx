import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../Currencyformat/CurrencyFormat'
import styles from './Product.module.css'
import {Type} from '../../Utility/action.type'
import { DataContext } from '../DataProvider/DataProvider'

function ProductCard({ data, flex, renderDesc, renderAdd }) {
  const { image, title, id, rating, price, description } = data || {}; // Add default empty object to avoid destructuring errors
  
  const [state, dispatch] = useContext(DataContext)

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id, image, title, price, rating, description
      }
    });
  }

  const truncateDescription = (desc, limit) => {
    if (!desc) return "";
    return desc.split(" ").slice(0, limit).join(" ") + (desc.split(" ").length > limit ? "..." : "");
  };

  return (
    <div
      className={`${styles.card__container} ${
        flex ? styles.product__flexed : ""
      }`}
    >
      <Link to={`/products/${id}`} className={styles.card__link}>
        <img src={image} alt={title} />
      </Link>
      <div>
        <h3>{truncateDescription(title, 7)}</h3>
        {
          renderDesc && <div style={{ maxWidth: "60%" }}>{description}</div> // Add conditional rendering for truncated description
        }
        <div className={styles.rating}>
          <Rating value={rating?.rate || 0} precision={0.1} />{" "}
          {/* Add optional chaining */}
          <small>{rating?.count || 0}</small> {/* Add optional chaining */}
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={styles.button} onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
