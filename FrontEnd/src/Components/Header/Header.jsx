import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/images/logo.png";
import logoAm from "../../assets/images/am-logo.png";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";
import { useTranslation } from "react-i18next";

function Header() {
  const [{ user, basket }] = useContext(DataContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
    //console.log(`Language changed to: ${lang}`);
  };

  const totalItem =
    basket?.reduce((amount, item) => item.amount + amount, 0) || 0;

  const [location, setLocation] = useState("Ethiopia");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      //console.log("Search query is empty.");
      return;
    }

    try {
      const response = await fetch(
        `https://gebayazekidus.onrender.com/api/search?query=${encodeURIComponent(
          searchQuery
        )}`
      );

      if (!response.ok) {
        console.error(`Error: ${response.status} ${response.statusText}`);
        return;
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const results = await response.json();

        if (results.length === 0) {
          alert("No results found.");
          return;
        }

        const categoryMatch = results.find((item) => item.type === "category");
        const productMatch = results.find((item) => item.type === "product");

        if (categoryMatch) {
          navigate(`/category/${categoryMatch.name.toLowerCase()}`); // Normalize to lowercase
        } else if (productMatch) {
          navigate(`/products/${productMatch.id}`);
        } else {
          //console.log("No suitable match found.");
        }
      } else {
        console.error("Unexpected response format. Expected JSON.");
      }
    } catch (error) {
      console.error("Error performing search:", error);
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setLocation(data.city || "Ethiopia");
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocation();
  }, []);

  return (
    <nav className={styles.fixed}>
      <div className={styles.header__container}>
        <div className={styles.logo__container}>
          <Link to="/">
            <img src={i18n.language === "am" ? logoAm : logo} alt="Logo" />
          </Link>
        </div>
        <div className={styles.delivery}>
          <span>
            <SlLocationPin />
          </span>
          <div>
            <p>{t("deliveredTo")}</p>
            <span>{location}</span>
          </div>
        </div>
        <div className={styles.search}>
          <select>
            <option value="">{t("all")}</option>
          </select>
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <BsSearch size={45} onClick={handleSearch} />
        </div>
        <div>
          <div className={styles.order__container}>
            <Link to={!user && "/auth"}>
              <div>
                {user && user.email ? (
                  <>
                    <p>
                      {t("hello")}, {user.email.split("@")[0]}
                    </p>
                    <span onClick={() => auth.signOut()}>{t("signOut")}</span>
                  </>
                ) : (
                  <>
                    <p>{t("hello")}</p>
                    <span>{t("accountLists")}</span>
                  </>
                )}
              </div>
            </Link>
            <Link to="/orders">
              <div>
                <p>{t("returns")}</p>
                <span>{t("orders")}</span>
              </div>
            </Link>
            <Link to="/cart" className={styles.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
        <div className={styles.language}>
          <select onChange={(e) => changeLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="am">አማርኛ</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </div>
    </nav>
  );
}

export default Header;
