import moment from 'moment'
import { PlantName } from '../../../../services/site'

export const makeSheetHeader = (t, dataSource, sheets) => {
  Object.keys(dataSource).forEach((key, index) => {
    let { StartTime, EndTime, ReportTime } = dataSource[key].RunTime

    const header = {
      freezePanel: true,
      offsetColumn: true,
      title: 'Quality Deviation Report',
      items: [
        { title: t('Plant'), value: PlantName },
        { title: t('Line'), value: key },
        { title: t('Start Time of the Report'), value: format(StartTime) },
        { title: t('End Time of the Report'), value: format(EndTime) },
        { title: t('Report Run Timestamp'), value: format(ReportTime) }
      ]
    }

    buildHeader(index, header, sheets)
  })
}

const format = date => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

const style = (
  value,
  { bold = false, colSpan = 1, fontSize = 13, textAlign = 'left' }
) => {
  return {
    value: value,
    background: '#ffff99',
    color: '#333',
    textAlign,
    bold,
    colSpan,
    rowSpan: 1,
    fontSize
  }
}

const buildHeader = (index, header, sheets) => {
  let content = []

  content.push({
    cells: [
      style(header.title, {
        bold: true,
        colSpan: 11,
        fontSize: 16,
        textAlign: 'center'
      })
    ]
  })

  header.items.forEach(item => {
    let offset = header.offsetColumn ? Array(style(null, {})) : []

    if (!Array.isArray(item.subItems)) {
      content.push({
        cells: [
          ...offset,
          style(item.title, { bold: true, colSpan: 2 }),
          style(item.value, { colSpan: 8 })
        ]
      })
    } else {
      let subItemArray = []
      item.subItems.forEach(subItem => {
        subItemArray.push(
          ...offset,
          style(subItem.title, { bold: true, colSpan: 2 }),
          style(subItem.value, { colSpan: 2 })
        )
      })
      content.push({ cells: [...subItemArray] })
    }
  })

  content.push({ cells: [] })
  sheets[index].rows.unshift(...content)

  if (header.freezePanel)
    sheets[index].freezePane = {
      rowSplit: header.items.length + 1,
      colSplit: 0
    }
}
