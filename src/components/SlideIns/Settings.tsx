import React, { Component } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "../../state/actions/langActions";
import { ISettings, SettingsItems } from "../../core/Settings";
import { changeSettings } from "../../state/actions/settingsActions";
import { hideSettings } from "../../state/actions/uiActions";
import TimePicker from "./TimePicker";
import defaultSettings from "../../core/data/defaultSettings";
import { withTranslation } from "react-i18next";

moment.locale("en-gb");

interface Props {
  settings: ISettings;
  show: boolean;
  t: any;
  i18n: any;
}

class Settings extends React.Component<Props | any> {
  state = {
    settings: defaultSettings,
    showPicker: false
  };

  componentDidMount() {
    this.setState({ settings: this.props.settings });
  }

  showPicker = () => {
    // this.props.dispatch({ type: "SHOW_PICKER", payload: { time: this.props.temp.alarmsStartTime } });
    this.setState({ showPicker: true });
  };

  hidePicker = () => {
    this.setState({ showPicker: false });
  };

  cancel = () => {
    this.setState({ settings: this.props.settings });
    hideSettings();
  };

  save = () => {
    changeSettings(this.state.settings);
    hideSettings();
  };

  changeFreq = (time: number) => () =>
    this.changeSetting(SettingsItems.timeBetweenAlarms, time);

  changeStartTime = (newTime: moment.Moment) => {
    const endTime = newTime.clone().add(8, "hours");

    this.changeSetting(SettingsItems.alarmsStartTime, {
      hours: newTime.get("hours"),
      minutes: newTime.get("minutes")
    });
    this.changeSetting(SettingsItems.alarmsEndTime, {
      hours: endTime.get("hours"),
      minutes: endTime.get("minutes")
    });
    this.setState({ showPicker: false });
  };

  toggleSetting = (name: any) => () =>
    this.changeSetting(name, !this.state.settings[name]);

  changeSetting = (name, value) =>
    this.setState({
      settings: {
        ...this.state.settings,
        ...{ [name]: value }
      }
    });

  render() {
    const startTime = moment(this.state.settings.alarmsStartTime).format(
      "HH:mm"
    );
    const endTime = moment(this.state.settings.alarmsEndTime).format("HH:mm");
    const t = this.props.t;

    return (
      <div
        className={"slide-in si-settings " + (this.props.show ? "si-grow" : "")}
      >
        <div className="si-content si-content-settings">
          <div className="settings-row">
            <h2 className="settings-header"> {t("settings.header")} </h2>
          </div>
          <hr />

          <div className="settings-row">
            <span> {t("settings.startTime")} </span>
            <div className="timepicker-wrapper" onClick={this.showPicker}>
              {this.state.showPicker && (
                <TimePicker
                  save={this.changeStartTime}
                  cancel={this.hidePicker}
                  time={this.state.settings.alarmsStartTime}
                />
              )}
              <span className="timepicker">{startTime}</span>
              {/* {picker} */}
              <FontAwesomeIcon icon={"clock"} />
            </div>
          </div>

          <div className="settings-row">
            <span className="disabled-color"> {t("settings.endTime")} </span>
            <div className="timepicker-wrapper">
              <span className="timepicker disabled-color">{endTime}</span>
            </div>
          </div>

          <div className="settings-row">
            <span> {t("settings.reminders")} </span>
            <div>
              <input
                className="tgl tgl-ios"
                id="alarmsOn"
                type="checkbox"
                checked={this.state.settings.alarmsOn}
                onChange={this.toggleSetting("alarmsOn")}
              />
              <label className="tgl-btn" htmlFor="alarmsOn" />
            </div>
          </div>

          <div className="settings-to-disable">
            <span
              className={
                this.state.settings.alarmsOn ? "" : "settings-disabled"
              }
            />

            <div className="settings-row">
              <div className="alarm-freq">
                <div className="alarm-freq-label">
                  {" "}
                  {t("settings.alarmsFreq")}{" "}
                </div>
                <div className="alarm-freq-buttons">
                  <button
                    className={
                      "alarm-freq-button border-right " +
                      (this.state.settings.timeBetweenAlarms === 15
                        ? "selected"
                        : "")
                    }
                    onTouchStart={this.changeFreq(15)}
                  >
                    15
                  </button>
                  <button
                    className={
                      "alarm-freq-button border-right " +
                      (this.state.settings.timeBetweenAlarms === 30
                        ? "selected"
                        : "")
                    }
                    onTouchStart={this.changeFreq(30)}
                  >
                    30
                  </button>
                  <button
                    className={
                      "alarm-freq-button border-right " +
                      (this.state.settings.timeBetweenAlarms === 60
                        ? "selected"
                        : "")
                    }
                    onTouchStart={this.changeFreq(60)}
                  >
                    60
                  </button>
                  <button
                    className={
                      "alarm-freq-button " +
                      (this.state.settings.timeBetweenAlarms === 120
                        ? "selected"
                        : "")
                    }
                    onTouchStart={this.changeFreq(120)}
                  >
                    120
                  </button>
                </div>
              </div>
            </div>

            <div className="settings-row">
              <span> {t("settings.alarmsSound")} </span>
              <div>
                <input
                  className="tgl tgl-ios"
                  id="alarmsSound"
                  type="checkbox"
                  checked={this.state.settings.alarmsSound}
                  onChange={this.toggleSetting("alarmsSound")}
                />
                <label className="tgl-btn" htmlFor="alarmsSound" />
              </div>
            </div>

            <div className="settings-row">
              <span> {t("settings.alarmsVibration")} </span>
              <div>
                <input
                  className="tgl tgl-ios"
                  id="alarmsVibrate"
                  type="checkbox"
                  checked={this.state.settings.alarmsVibrate}
                  onChange={this.toggleSetting("alarmsVibrate")}
                />
                <label className="tgl-btn" htmlFor="alarmsVibrate" />
              </div>
            </div>
          </div>

          <hr />

          <div className="settings-row">
            <button
              className="button-transparent upcase"
              onTouchStart={this.cancel}
            >
              {t("settings.cancelButton")}
            </button>

            <button className="button button-save" onTouchStart={this.save}>
              {t("settings.saveButton")}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default withTranslation()(Settings);
