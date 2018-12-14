import React, { Component } from 'react'
import DataGrid, {
  Column,
  FilterRow,
  Paging,
  LoadPanel,
  HeaderFilter,
  Export
} from 'devextreme-react/ui/data-grid'

class RawDataGrid extends Component {
  getColumns = () => {
    return this.props.data.length > 0 ? Object.keys(this.props.data[0]) : []
  }

  render() {
    const { data } = this.props

    return (
      <DataGrid
        dataSource={data}
        allowColumnReordering={false}
        rowAlternationEnabled={true}
        showColumnLines={true}
        showRowLines={true}
        showBorders={true}
        wordWrapEnabled={true}
        scrolling={{
          mode: 'virtual',
          columnRenderingMode: 'virtual'
        }}
      >
        <LoadPanel showIndicator={false} showPane={false} text="" />
        <FilterRow visible={false} />
        <HeaderFilter visible={true} />
        <Export enabled={true} />
        {this.getColumns().map(col => (
          <Column
            key={col}
            dataField={col}
            caption={col}
            width={'auto'}
            allowHeaderFiltering={true}
          />
        ))}

        <Paging enabled={false} />
      </DataGrid>
    )
  }
}

export default RawDataGrid
