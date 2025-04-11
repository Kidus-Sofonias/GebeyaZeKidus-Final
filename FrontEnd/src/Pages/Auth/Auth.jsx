import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { ClipLoader } from "react-spinners";
import logo from "../../assets/images/auth-logo.png";
import amharicLogo from "../../assets/images/am-auth-logo.png"; // Import Amharic logo
import { useTranslation } from "react-i18next"; // Import useTranslation

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });
  const [{ user, language }, dispatch] = useContext(DataContext); // Access language from context
  const navigate = useNavigate();
  const { i18n, t } = useTranslation(); // Access i18n for language detection and t for translations

  // //console.log(user);

  const authHandler = async (e) => {
    e.preventDefault();
    if (e.target.name === "signIn") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: "SET_USER",
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate("/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: "SET_USER",
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate("/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={styles.login}>
      <Link to="/">
        <img src={i18n.language === "am" ? amharicLogo : logo} alt="" />{" "}
        {/* Conditional logo */}
      </Link>
      <div className={styles.login__container}>
        <h1>{t("signIn")}</h1>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">{t("email")}</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">{t("password")}</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
        </form>
        <button
          type="submit"
          onClick={authHandler}
          name="signIn"
          className={styles.login__signInButton}
        >
          {loading.signIn ? <ClipLoader size={15}></ClipLoader> : t("signIn")}
        </button>
        <p>{t("termsAndConditions")}</p>
        <button
          type="submit"
          onClick={authHandler}
          name="signUp"
          className={styles.login__registerButton}
        >
          {loading.signUp ? (
            <ClipLoader size={15}></ClipLoader>
          ) : (
            t("createAccount")
          )}
        </button>
      </div>
    </section>
  );
}

export default Auth;
