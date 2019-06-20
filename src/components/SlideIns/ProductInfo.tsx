import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WaterContainer from "../WaterContainer";
import { hideProductInfo } from "../../state/actions/uiActions";
import { useTranslation } from "react-i18next";

const ProductInfo = props => {
  const { t } = useTranslation();
  let text = t("info.text");

  let show;

  switch (props.show) {
    case null:
      show = "none";
      break;
    case true:
      show = "move-water-up";
      break;
    case false:
      show = "move-water-down";
      break;
  }

  return (
    <React.Fragment>
      <WaterContainer move={show}>
        <div className="product-info-container">
          <div className="slide-in si-product-info">
            <div className="si-content si-content-product-info">
              <h3 className="product-info-header"> {t("info.header")} </h3>
              {text}
              <button
                className="si-button si-button-product-info-close"
                onTouchStart={hideProductInfo}
              >
                {/* <i className="fas fa-times"></i> */}
                <FontAwesomeIcon icon="times" />
              </button>
            </div>
          </div>
        </div>
      </WaterContainer>
    </React.Fragment>
  );
};

export default ProductInfo;
