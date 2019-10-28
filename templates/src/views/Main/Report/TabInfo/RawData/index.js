import React, { Component } from 'react'
import DataGrid, {
  Column,
  FilterRow,
  Export,
  Grouping,
  GroupPanel,
  LoadPanel,
  SearchPanel,
  ColumnChooser,
  Scrolling,
  FilterPanel,
  Paging
} from 'devextreme-react/ui/data-grid'

export default class RawData extends Component {
  getColumns = () => {
    return this.props.data.length > 0 ? Object.keys(this.props.data[0]) : []
  }

  render() {
    const { t, data } = this.props

    return (
      <React.Fragment>
        <DataGrid
          dataSource={data}
          allowColumnReordering={true}
          allowColumnResizing={true}
          hoverStateEnabled={true}
          columnResizingMode={'widget'}
          rowAlternationEnabled={false}
          headerFilter={{ visible: false }}
          columnAutoWidth={true}
          showBorders={true}
          height="100%"
        >
          <Scrolling
            mode="virtual"
            preloadEnabled={true}
            showScrollbar="onHover"
          />
          <SearchPanel visible={false} />
          <ColumnChooser enabled={false} />
          <Export enabled={false} />
          <GroupPanel visible={false} />
          <Grouping autoExpandAll={true} contextMenuEnabled={true} />
          <FilterRow visible={false} />
          <FilterPanel filterEnabled={true} />
          <Paging enabled={false} />
          <LoadPanel enabled={true} showIndicator={true} />
          {this.getColumns().map(column => (
            <Column key={column} caption={t(column)} dataField={column} />
          ))}
        </DataGrid>
      </React.Fragment>
    )
  }
}
