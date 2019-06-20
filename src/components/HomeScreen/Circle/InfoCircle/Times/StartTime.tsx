import React from "react";
import { useTranslation } from "react-i18next";

const StartTime = props => {
  const { t } = useTranslation();
  return (
    <div className="drink-time start-time f-column">
      <span className="drink-time-desc">{t("circle.start")}</span>
      <span id="circleStartTime">{props.time}</span>
    </div>
  );
};

export default StartTime;
