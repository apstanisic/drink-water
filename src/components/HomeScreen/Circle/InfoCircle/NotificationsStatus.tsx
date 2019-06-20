import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ISettings } from "../../../../core/Settings";
import { useTranslation } from "react-i18next";

const NotificationsStatus = (props: {
  settings: ISettings;
  minutesAfterStart: number;
}) => {
  const { t } = useTranslation();
  // console.log(props);
  const alarmFreq = props.settings.timeBetweenAlarms; // 15, 30, 60
  const minsPassed = props.minutesAfterStart; // minutes after start time
  const passedAlarms = Math.floor(minsPassed / alarmFreq) + 1; // how many alarm passed
  const totalAlarms = 480 / alarmFreq; // how many alarms there should be

  if (!props.settings.alarmsOn) {
    return (
      <div className="notification-status">
        <FontAwesomeIcon icon="bell" />
        <span className="notification-status-desc">OFF</span>
      </div>
    );

    // } else if(props.drinking.total >= 32) {
  } else if (passedAlarms > totalAlarms) {
    return (
      <div className="notification-status">
        <FontAwesomeIcon icon={["fas", "thumbs-up"]} />
        <span className="notification-status-desc">
          {t("circle.notificationStatus")}
        </span>
      </div>
    );
  } else {
    return (
      <div className="notification-status in-progress">
        <FontAwesomeIcon icon={["fas", "bell"]} />
        <span className="notification-status-alarms">
          <span className="white">{passedAlarms}</span>
          <span className="notification-separator"> / </span>
          <span>{totalAlarms}</span>
        </span>
      </div>
    );
  }
};

export default NotificationsStatus;
