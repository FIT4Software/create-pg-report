import React, { Component } from "react";
import PropTypes from "prop-types";
import ItemRow from "./ItemRow";
import { List, AutoSizer } from "react-virtualized";
import "./MultiSelectBox.css";

class MultiSelectBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: ""
    };
  }

  getFilteredOptions() {
    const { valueKey, labelKey, options, valueArray } = this.props;
    const { filterText } = this.state;
    return options
      .filter(
        item =>
          valueArray.findIndex(value => value === item[valueKey || labelKey]) <
          0
      )
      .filter(item =>
        item[labelKey]
          .toLocaleLowerCase()
          .includes(filterText.toLocaleLowerCase())
      );
  }

  handleAddClick = selectedItem => {
    const { onAdd } = this.props;
    if (onAdd) onAdd(selectedItem);
  };

  handleRemoveClick = (selectedItem, index) => {
    const { onRemove } = this.props;
    if (onRemove) onRemove(selectedItem, index);
  };

  handleSelectAllClick = () => {
    const { onSelectAll } = this.props;
    if (onSelectAll) onSelectAll([...this.getFilteredOptions()]);
  };

  handleRemoveAllClick = () => {
    const { onRemoveAll } = this.props;
    if (onRemoveAll) onRemoveAll();
  };

  handleFilterChange = event => {
    this.setState({ filterText: event.target.value });
  };

  getSelectedRow = index => {
    const { valueKey, labelKey, options, valueArray } = this.props;
    return options.find(
      item => item[valueKey || labelKey] === valueArray[index]
    );
  };

  render() {
    const {
      labelKey,
      addAllLabel,
      removeAllLabel,
      searchPlaceHolder,
      selectedLabel,
      boxHeight,
      valueArray,
      config
    } = this.props;
    const { filterText } = this.state;
    const availableData = this.getFilteredOptions();

    return (
      <div className="multi-select">
        <div className="available-list">
          <div className="header">
            <input
              type="text"
              className="input"
              value={filterText}
              onChange={this.handleFilterChange}
              placeholder={searchPlaceHolder}
            />
            {config.allButton ? (
              <button onClick={this.handleSelectAllClick}>{addAllLabel}</button>
            ) : (
              ""
            )}
          </div>
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                className="list-container"
                height={boxHeight}
                rowCount={availableData.length}
                rowHeight={25}
                width={width}
                rowRenderer={props => (
                  <ItemRow
                    key={props.key}
                    itemData={availableData[props.index]}
                    labelKey={labelKey}
                    onItemClick={this.handleAddClick}
                    icon="icon icon-plus"
                    {...props}
                  />
                )}
              />
            )}
          </AutoSizer>
        </div>

        <div className="selected-list">
          <div className="header">
            <div className="count">
              <span>
                {valueArray.length} {selectedLabel}
              </span>
            </div>
            <button onClick={this.handleRemoveAllClick}>
              {removeAllLabel}
            </button>
          </div>
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                className="list-container"
                height={boxHeight}
                rowCount={valueArray.length}
                rowHeight={25}
                width={width}
                rowRenderer={props => (
                  <ItemRow
                    key={props.key}
                    itemData={this.getSelectedRow(props.index)}
                    labelKey={labelKey}
                    onItemClick={this.handleRemoveClick}
                    icon="icon icon-minus"
                    {...props}
                  />
                )}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }
}

MultiSelectBox.defaultProps = {
  addAllLabel: "Add All",
  removeAllLabel: "Remove All",
  searchPlaceHolder: "Search...",
  selectedLabel: "Items selected",
  boxHeight: 173,
  valueArray: []
};

MultiSelectBox.propTypes = {
  options: PropTypes.array.isRequired,
  id: PropTypes.string,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  addAllLabel: PropTypes.string,
  removeAllLabel: PropTypes.string,
  valueArray: PropTypes.array,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  onRemoveAll: PropTypes.func.isRequired
};

export default MultiSelectBox;
