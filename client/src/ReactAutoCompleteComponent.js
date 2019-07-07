import React, { Component } from "react";
import { Textfield } from "react-mdl";
import "./ReactAutoCompleteComponent.css";

export default class ReactAutoCompleteComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
      value: "",
      selectedLabel: props.defaultValue ? props.defaultValue : "",
      totalSuggestions: props.data,
      filterSuggestion: props.data
    };
    this.closeSuggestionTimeOut = "";
  }

  closePopper = () => {
    this.closeSuggestionTimeOut = setTimeout(() => {
      this.setState({
        open: false
      });
    }, 200);
  };

  openPopper = () => {
    clearTimeout(this.closeSuggestionTimeOut);
    this.setState(state => ({
      open: true
    }));
  };

  clearValue = () => {
    this.setState({ value: "", selectedLabel: "" });
    this.filterSugestion("");
  };

  setValue = (selectValue, label) => {
    let selectedLabel = label + " " + selectValue;
    this.setState({
      value: selectValue,
      open: false,
      selectedLabel: selectedLabel
    });
    this.filterSugestion(selectedLabel);
    this.props.onChange(selectValue, label);
  };

  setValueKeyEvent = (event, selectValue, label) => {
    if (event.charCode === 13) {
      let selectedLabel = label + " " + selectValue;
      this.setState({
        value: selectValue,
        open: false,
        selectedLabel: selectedLabel
      });
      this.filterSugestion(selectedLabel);
      this.props.onChange(selectValue, label);
    }
  };

  formSuggestionList = list => {
    return list.map((value, key) => {
      return (
        <div
          tabIndex="0"
          title={value.label + " " + value.value}
          className="suggestion"
          onKeyPress={event => {
            this.setValueKeyEvent(event, value.value, value.label);
          }}
          onClick={() => {
            this.setValue(value.value, value.label);
          }}
          key={key}
          dummyKey={value.value}
        >
          {value.label + " " + value.value}
        </div>
      );
    });
  };

  filterSugestion = value => {
    const filterList = this.state.totalSuggestions.filter(suggestion =>
      (suggestion.value + " " + suggestion.label)
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    this.setState({ filterSuggestion: filterList, selectedLabel: value });
  };

  render() {
    let { open, selectedLabel } = this.state;
    selectedLabel =
      selectedLabel === "" && this.props.defaultValue
        ? this.props.defaultValue
        : selectedLabel;
    return (
      <React.Fragment>
        <Textfield
          id={this.props.id}
          disabled={this.props.disabled}
          onClick={this.openPopper}
          onFocus={this.openPopper}
          autoComplete="off"
          onBlur={() => {
            this.closePopper();
          }}
          onChange={event => {
            this.filterSugestion(event.currentTarget.value);
            this.props.onChange(undefined, undefined);
          }}
          value={selectedLabel}
          label={this.props.label}
          floatingLabel
          style={{
            width: this.props.width,
            marginRight: this.props.marginRight
          }}
        />
        {open ? (
          <div
            className="suggestion-box"
            onFocus={this.openPopper}
            onBlur={this.closePopper}
            style={{ width: this.props.width, zIndex: "1900" }}
          >
            {this.formSuggestionList(this.state.filterSuggestion)}
          </div>
        ) : (
          <></>
        )}
      </React.Fragment>
    );
  }
}
