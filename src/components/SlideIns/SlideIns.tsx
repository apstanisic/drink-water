import React from "react";
import { connect } from "react-redux";

import ProductInfo from "./ProductInfo";
import Settings from "./Settings";
import Menu from "./Menu";
import { State } from "../../state/store";
import { UiState } from "../../state/reducers/uiReducer";
import { SettingsState } from "../../state/reducers/settingsReducer";
// import TimePicker from './TimePicker';

const SlideIns = (props: UiState & { settings: SettingsState }) => (
  <React.Fragment>
    <div className={"dark-background " + (props.darkBg ? "show" : "")} />
    <Settings show={props.showSettings} settings={props.settings} />
    <Menu show={props.showMenu} />
    <ProductInfo show={props.showProductInfo} />
  </React.Fragment>
);

export default connect((state: State) => ({
  ...state.ui,
  settings: state.settings
}))(SlideIns);
