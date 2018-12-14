import React from 'react'
import PivotGrid, {
  FieldChooser,
  FieldPanel,
  Export
} from 'devextreme-react/ui/pivot-grid'

const Pivot = ({ t, fields, data, showRowGrandTotals = true }) => {
  return (
    <PivotGrid
      allowSortingBySummary={false}
      allowSorting={true}
      allowFiltering={true}
      showBorders={true}
      showColumnTotals={false}
      showColumnGrandTotals={false}
      rowHeaderLayout={'tree'}
      showRowTotals={true}
      showRowGrandTotals={showRowGrandTotals}
      wordWrapEnabled={false}
      texts={{ total: title => title }}
      dataSource={{
        fields: fields,
        store: data,
        retrieveFields: false
      }}
    >
      <FieldChooser enabled={true} height={400} />
      <FieldPanel
        visible={true}
        showDataFields={false}
        showColumnFields={false}
        allowFieldDragging={false}
        showFilterFields={false}
      />
      <Export enabled={true} />
    </PivotGrid>
  )
}

export default Pivot
