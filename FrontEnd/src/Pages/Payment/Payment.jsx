import React, { useContext, useState, useEffect } from "react";
import styles from "./Payment.module.css";
import Layout from "/src/Components/Layout/Layout.jsx";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/Currencyformat/CurrencyFormat";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { sendEmail } from "../../Utility/emailService"; // Import email service
import { useTranslation } from "react-i18next"; // Import translation hook

function Payment() {
  // Destructure user and basket from DataContext using useContext hook
  const [{ user, basket }, dispatch] = useContext(DataContext);

  // Calculate the total number of items in the basket
  const totalItem =
    basket?.reduce((amount, item) => item.amount + amount, 0) || 0;

  // Calculate the total price of items in the basket
  const totalPrice = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  // Initialize Stripe and Elements hooks
  const stripe = useStripe();
  const elements = useElements();

  // Initialize useNavigate hook for navigation
  const navigate = useNavigate();

  // Initialize translation hook
  const { t } = useTranslation();

  // State to handle card errors
  const [cardError, setCardError] = useState(null);

  // Function to handle changes in the CardElement and set card errors
  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  // State to handle processing state
  const [processing, setProcessing] = useState(false);

  // State to store the user's detailed location
  const [location, setLocation] = useState("Ethiopia");

  // Fetch the user's detailed location on component mount
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        const detailedLocation = `${data.city || "Unknown City"}, 
        ${data.country || "Unknown Country"}`;
        setLocation(detailedLocation);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocation();
  }, []);

  // Function to handle payment submission
  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);

      // Make a POST request to create a payment intent
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${totalPrice * 100}`,
      });

      // Get the client secret from the response
      const clientSecret = response.data?.clientSecret;

      // Confirm the card payment using Stripe
      const paymentIntent = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      //console.log("Payment Intent:", paymentIntent);

      // Save the order details in the database
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.paymentIntent.amount,
          created: paymentIntent.paymentIntent.created,
        });

      // Send email to the user and yourself
      const emailData = {
        to: user.email,
        subject: "Thank you for your order!",
        message: `Thank you for your purchase! Here are your order details:\n\n${basket
          .map((item) => `Product: ${item.name}, Price: ${item.price}`)
          .join("\n")}\n\nTotal: ${totalPrice}`,
      };
      await sendEmail(emailData);

      // Dispatch an action to empty the basket
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      //console.log("Navigating to /orders");

      // Navigate to the orders page with a success message
      navigate("/orders", { state: { msg: "You have placed a new order" } });
    } catch (error) {
      //console.log(error);
      setProcessing(false);
    }
  };

  return (
    <Layout>
      <div className={styles.payment__header}>
        {t("checkoutHeader", { count: totalItem })}
      </div>
      <section className={styles.payment}>
        <div className={styles.flex}>
          <h3>{t("deliveryAddress")}</h3>
          <div>
            <div>{user?.email || t("noEmail")}</div>
            <div>{location}</div>
          </div>
        </div>
        <hr />

        <div className={styles.flex}>
          <h3>{t("reviewItems")}</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard data={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        <div className={styles.flex}>
          <h3>{t("paymentMethods")}</h3>
          <div className={styles.payment__card__container}>
            <div className={styles.payment__details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />
                <div className={styles.payment__price}>
                  <div>
                    <span className={styles.flex}>
                      <p>{t("totalOrder")} |</p>
                      <CurrencyFormat amount={totalPrice} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={styles.loading}>
                        <ClipLoader size={15} color={"grey"} />
                        <p>{t("pleaseWait")}</p>
                      </div>
                    ) : (
                      t("payNow")
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
