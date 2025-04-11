import React from "react";
import styles from "./Footer.module.css";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <div className={styles.footer}>
      <p>{t("footerText")}</p>
    </div>
  );
}

export default Footer;
