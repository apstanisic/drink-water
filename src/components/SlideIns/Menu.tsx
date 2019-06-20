import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toggleLanguage } from "../../state/actions/settingsActions";
import { shareApp, shareScreenshot } from "../../state/actions/nativeActions";
import {
  showTutorial,
  showProductInfo,
  showSettings,
  hideMenu,
  showSplashScreen
} from "../../state/actions/uiActions";
import { useTranslation } from "react-i18next";

const Menu = ({ show }: { show: boolean }) => {
  const { t } = useTranslation();
  return (
    <div className={"slide-in si-menu " + (show ? "si-grow" : "")}>
      <button
        className="si-button si-button-menu-close"
        onTouchStart={hideMenu}
      >
        {/* <i className="fas fa-times"></i> */}
        <FontAwesomeIcon icon="times" />
      </button>
      <div className="si-content si-content-menu">
        <h2 className="menu-header"> {t("menu.header")}</h2>
        <button className="button-transparent " onTouchStart={showSplashScreen}>
          {t("menu.home")}
        </button>
        <button className="button-transparent" onTouchStart={showSettings}>
          {t("menu.settings")}
        </button>
        <button className="button-transparent " onTouchStart={shareScreenshot}>
          {" "}
          {t("menu.shareScreen")}
        </button>
        <button className="button-transparent " onTouchStart={toggleLanguage}>
          {" "}
          {t("menu.changeLanguage")}
        </button>
        <button className="button-transparent " onTouchStart={showProductInfo}>
          {" "}
          {t("menu.info")}
        </button>
      </div>
    </div>
  );
};

export default Menu;
