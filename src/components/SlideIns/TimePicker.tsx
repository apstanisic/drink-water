import React from "react";
import moment from "moment";
import Picker from "pickerjs";
import { withTranslation } from "react-i18next";

moment.locale("en-gb");

class TimePicker extends React.Component<any> {
  state = {
    picker: null as any
  };

  componentDidMount() {
    const save = this.props.save;
    const t = this.props.t;

    const picker: any = new Picker(document.createElement("input"), {
      format: "HH:mm",
      date: moment(this.props.time).format("HH:mm"),
      text: {
        title: t("settings.picker.title"),
        cancel: t("settings.picker.cancel"),
        confirm: t("settings.picker.confirm")
      },
      hidden: () => this.props.cancel(),
      pick: () => save(moment(picker.getDate()))
    });
    picker.show();
    this.setState({ picker });
  }

  componentWillUnmount() {
    this.state.picker.destroy();
    this.setState({ picker: null });
  }

  render() {
    return null;
  }
}

export default withTranslation()(TimePicker);
