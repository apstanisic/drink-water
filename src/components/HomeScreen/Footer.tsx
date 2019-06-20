import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showSettings, showMenu } from "../../state/actions/uiActions";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <button id="shopButton" onTouchStart={showMenu}>
        <FontAwesomeIcon icon={["fas", "bars"]} />
        <span>{t("footer.menu")}</span>
      </button>

      <button id="settingsButton" onTouchStart={showSettings}>
        <FontAwesomeIcon icon="cog" />
        <span>{t("footer.settings")}</span>
      </button>
    </footer>
  );
};

export default Footer;
