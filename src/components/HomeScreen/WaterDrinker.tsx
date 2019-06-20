import React, { Component } from "react";

import SmallCircles from "./Circle/SmallCircles";
import InfoCircle from "./Circle/InfoCircle/InfoCircle";
import ChangeAmountDrankButton from "./Circle/ChangeAmountDrankButton";

const WaterDrinker = () => {
  return (
    <div id="waterDrinker" className="water-drinker">
      <div className="biggest-circle">
        <SmallCircles />
        <InfoCircle />
      </div>
      <div className="drink-water-buttons">
        <div className="drink-water-wrapper">
          <ChangeAmountDrankButton type="minus" />
          <ChangeAmountDrankButton type="plus" />
        </div>
      </div>
    </div>
  );
};

export default WaterDrinker;
