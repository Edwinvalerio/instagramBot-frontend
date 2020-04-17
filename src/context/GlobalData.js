import React, { createContext } from "react";

export const GlobalData = createContext();

export class GlobalDataProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isDark: true };
    this.updatecontext = this.updatecontext.bind(this);
  }
  updatecontext(val) {
    this.setState(val);
  }
  render() {
    return (
      <GlobalData.Provider
        value={{ state: this.state, updatecontext: this.updatecontext }}
      >
        {this.props.children}
      </GlobalData.Provider>
    );
  }
}
