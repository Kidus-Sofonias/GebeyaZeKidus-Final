import React, { useContext, useEffect, useState } from "react"; // Import necessary modules from React
import styles from "./Orders.module.css"; // Import CSS module for styling
import Layout from "/src/Components/Layout/Layout.jsx"; // Import Layout component
import { db } from "../../Utility/firebase"; // Import Firebase database
import { DataContext } from "../../Components/DataProvider/DataProvider"; // Import DataContext for state management
import ProductCard from "../../Components/Product/ProductCard"; // Import ProductCard component
import { useTranslation } from "react-i18next"; // Import translation hook

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext); // Get user and dispatch from DataContext
  const [orders, setOrders] = useState([]); // Initialize orders state as an empty array
  const { t } = useTranslation(); // Initialize translation hook

  useEffect(() => {
    if (user) {
      // Check if user is logged in
      db.collection("users") // Access users collection in Firebase
        .doc(user.uid) // Get document for the current user
        .collection("orders") // Access orders collection for the user
        .orderBy("created", "desc") // Order orders by creation date in descending order
        .onSnapshot((snapshot) => {
          // Listen for real-time updates
          setOrders(
            snapshot.docs.map((doc) => ({
              // Map each document to an order object
              id: doc.id, // Set order ID
              data: doc.data(), // Set order data
            }))
          );
        });
    } else {
      setOrders([]); // If no user, set orders to an empty array
    }
  }, [user]); // Dependency array includes user

  return (
    <Layout>
      {" "}
      {/* Render Layout component */}
      <section className={styles.container}>
        {" "}
        {/* Apply container styles */}
        <div className={styles.orders__container}>
          {" "}
          {/* Apply orders container styles */}
          <h2>{t("yourOrders")}</h2> {/* Display heading */}
          {
            orders?.length === 0 && <div>{t("noOrders")}</div> // Display message if no orders
          }
          <div>
            {orders?.map((eachOrder) => {
              // Map through each order
              return (
                <div key={eachOrder.id}>
                  {" "}
                  {/* Add key for each order */}
                  <hr /> {/* Horizontal line */}
                  <p>
                    {t("orderId")}: {eachOrder?.id}
                  </p>{" "}
                  {/* Display order ID */}
                  {eachOrder?.data?.basket.map((order) => {
                    // Map through each item in the order
                    return (
                      <ProductCard
                        flex={true} // Pass flex prop
                        data={order} // Pass order data
                        key={order.id} // Add key for each product
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Orders; // Export Orders component
