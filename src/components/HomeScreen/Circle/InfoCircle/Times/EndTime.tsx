import React, { Component } from "react";
import { useTranslation } from "react-i18next";

const EndTime = props => {
  const { t } = useTranslation();
  return (
    <div className="drink-time text-right f-column">
      <span className="drink-time-desc">{t("circle.end")}</span>
      <span>{props.time}</span>
    </div>
  );
};

export default EndTime;
