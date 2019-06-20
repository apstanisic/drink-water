import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";

import StartTime from "./Times/StartTime";
import EndTime from "./Times/EndTime";
import CurrentTime from "./Times/CurrentTime";
import ArrowCircle from "./ArrowCircle";
import NotificationsStatus from "./NotificationsStatus";
import { State } from "../../../../state/store";
import { SettingsState } from "../../../../state/reducers/settingsReducer";
import { TimeState } from "../../../../state/reducers/timeReducer";

const InfoCircle = (props: { settings: SettingsState; time: TimeState }) => {
  return (
    <div className="info-circle">
      <ArrowCircle minutesAfterStart={props.time.minutesAfterStart} />

      <div className="info-data-circle">
        <div className="start-end-times">
          <StartTime
            time={moment(props.settings.alarmsStartTime).format("HH:mm")}
          />
          <EndTime
            time={moment(props.settings.alarmsEndTime).format("HH:mm")}
          />
        </div>

        <NotificationsStatus
          settings={props.settings}
          minutesAfterStart={props.time.minutesAfterStart}
        />
      </div>
    </div>
  );
};

export default connect((state: State) => ({
  settings: state.settings,
  time: state.time
}))(InfoCircle);
