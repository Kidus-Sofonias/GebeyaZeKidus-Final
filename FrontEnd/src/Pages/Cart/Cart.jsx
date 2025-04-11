import React, { useContext } from "react";
import Layout from "/src/Components/Layout/Layout.jsx";
import styles from "./Cart.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { Link } from "react-router-dom";
import CurrencyFormat from "../../Components/Currencyformat/CurrencyFormat";
import { Type } from "../../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useTranslation } from "react-i18next";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const { t } = useTranslation();
  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <Layout>
      <section className={styles.container}>
        <div className={styles.cart__container}>
          <h2>{t("yourCart")}</h2>
          <hr />
          {basket?.length == 0 ? (
            <p>{t("cartEmpty")}</p>
          ) : (
            basket.map((item) => {
              return (
                <section className={styles.cart_product}>
                  <ProductCard
                    data={item}
                    renderDesc={true}
                    flex={true}
                    renderAdd={false}
                  />
                  <div className={styles.btn_container}>
                    <button onClick={() => increment(item)}>
                      <IoIosArrowUp size={20} />
                    </button>
                    <span>{item.amount}</span>
                    <button onClick={() => decrement(item.id)}>
                      <IoIosArrowDown size={20} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>

        {basket?.length !== 0 && (
          <div className={styles.subtotal}>
            <div>
              <p>{t("subtotal", { count: basket?.length })}</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>{t("giftOption")}</small>
            </span>
            <Link to="/payment">{t("checkout")}</Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
