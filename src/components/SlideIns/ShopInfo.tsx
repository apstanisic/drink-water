import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { visitWebsite } from "../../state/actions/nativeActions";
import { hideShopInfo } from "../../state/actions/uiActions";

import fourBottles from "../../appRes/img/bottles-4.jpg";
import { useTranslation } from "react-i18next";

const ShopInfo = (props: { show: boolean }) => {
  const { t } = useTranslation();
  return (
    <div className={"slide-in si-shop-info " + (props.show ? "si-grow" : "")}>
      <button
        className="si-button si-button-shop-info-close"
        onTouchStart={hideShopInfo}
      >
        {/* <i className="fas fa-times"></i> */}
        <FontAwesomeIcon icon="times" />
      </button>
      <div className="si-content">
        <h3 className="text-left shop-info-header">{t("shop.header")}</h3>
        <div
          className="shop-info-desc text-left"
          dangerouslySetInnerHTML={{ __html: t("shop.text") }}
        />
        <button className="button website-button" onTouchStart={visitWebsite}>
          {t("shop.button")}
        </button>
        <img src={fourBottles} className="shop-img" alt="4-bottles" />
      </div>
    </div>
  );
};

export default ShopInfo;
