import React, { Component } from 'react'
import {
  ExcelExport,
  ExcelExportColumn
} from '@progress/kendo-react-excel-export'
import ExportModal from '../../../../components/ExportModal'
import { process } from '@progress/kendo-data-query'
import { saveAs } from 'file-saver/dist/FileSaver'
import { connect } from 'react-redux'
import { getReportData } from '../../../../services/report'
import { makeSheetHeader } from './SheetHeader'

const CustomGroupHeader = ({ aggregates, value, group }) => {
  return `${value}`
}

class Exporter extends Component {
  constructor(props) {
    super(props)
    let filename = new Date()
      .toLocaleString()
      .split('/')
      .join('_')
      .split(' ')
      .join('_')
      .split(':')
      .join('_')
    this._sheets = {}
    this.state = {
      data: [],
      invalidInput: false,
      fileName: `Quality Deviation Report-${filename}.xlsx`,
      showModal: true
    }
  }

  readData = () => {
    let promises = []
    const { onMessage, filters, t } = this.props
    const ds = this.props.dataSource

    onMessage(true, t('Getting data, please wait'), 'fetching data')

    filters.selected.lines.forEach(item => {
      promises.push(
        ds[item.equipmentDesc] !== undefined
          ? item.equipmentDesc
          : getReportData(item.equipmentId, item.equipmentDesc).then(() => {
              return item.equipmentDesc
            })
      )
    })

    return Promise.all(promises)
  }

  export = () => {
    this.readData().then(() => {
      const ds = this.props.dataSource

      Object.keys(ds).forEach(line => {
        Object.keys(ds[line]).forEach(key => {
          if (key === 'Summary' || key === 'Detail') {
            ds[line][key] = this.processData(ds[line][key], [{ field: 'Type' }])
          }
        })
      })

      this.setState({ data: ds }, () => this.save())
    })
  }

  save = () => {
    const { onMessage, t } = this.props
    let worksheet, options

    Object.keys(this._sheets).forEach((key, index) => {
      let sheetTitle = key.split('||')[0].replace(new RegExp('[:/*]', 'g'), ' ')

      if (index === 0) {
        worksheet = this._sheets[key]
        options = worksheet.workbookOptions()

        if (options.sheets.length > 0) {
          options.sheets[0].title = sheetTitle
        }
      } else {
        const sheet = this._sheets[key].workbookOptions()

        if (key.includes('Summary')) {
          sheet.sheets[0].title = sheetTitle
          delete sheet.sheets[0].freezePane
          options.sheets.push(sheet.sheets[0])
        } else {
          let sheetIndex = options.sheets.map(e => e.title).indexOf(sheetTitle)
          options.sheets[sheetIndex === -1 ? 0 : sheetIndex].rows.push(
            [],
            ...sheet.sheets[0].rows
          )
        }
      }
    })

    makeSheetHeader(t, this.props.dataSource, options.sheets)

    worksheet.toDataURL(options).then(dataURI => {
      const byteString = atob(dataURI.split(',')[1])

      const mimeString = dataURI
        .split(',')[0]
        .split(':')[1]
        .split(';')[0]

      const ab = new ArrayBuffer(byteString.length)
      const ia = new Uint8Array(ab)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }

      const blobData = new Blob([ab], { type: mimeString })

      saveAs(blobData, this.state.fileName)
      onMessage(false, '', 'finished')
    })
  }

  handleExportOkButton = () => {
    let fileName = this.state.fileName.trim()
    if (fileName.length > 0) {
      this.setState({ invalidInput: false, showModal: false })
      this.export()
    } else {
      this.setState({ invalidInput: true })
    }
  }

  handleExportInputChange = e => {
    this.setState({
      fileName: e.target.value,
      invalidInput: false
    })
  }

  processData = (data, groups) => {
    return process(data, {
      group: groups
    }).data
  }

  render() {
    const { fileName, invalidInput, showModal } = this.state
    const { t, onCancel, dataSource } = this.props

    var regExp = new RegExp('^[a-zA-Z]$')

    return (
      <div>
        <ExportModal
          show={showModal}
          value={fileName}
          onOk={this.handleExportOkButton}
          onCancel={onCancel}
          onInputChange={this.handleExportInputChange}
          invalidInput={invalidInput}
          t={t}
        />
        {Object.keys(dataSource).map(line => (
          <React.Fragment key={line}>
            <ExcelExport
              data={dataSource[line].Summary}
              fileName={fileName}
              group={[{ field: 'Type' }]}
              ref={exporter => {
                this._sheets[line + '||Summary'] = exporter
              }}
            >
              {dataSource[line].SummaryColumns.map((column, i) =>
                column.dataField !== 'Type' ? (
                  <ExcelExportColumn
                    key={i}
                    field={column.dataField}
                    title={
                      regExp.test(column.caption)
                        ? column.caption
                        : t(column.caption)
                    }
                    groupHeader={props => <CustomGroupHeader {...props} />}
                  />
                ) : null
              )}
            </ExcelExport>
            <ExcelExport
              data={dataSource[line].Detail}
              fileName={fileName}
              group={[{ field: 'Type' }]}
              ref={exporter => {
                this._sheets[line + '||Detail'] = exporter
              }}
            >
              {dataSource[line].DetailsColumns.filter(
                c => c.dataField !== 'Type'
              ).map((column, i) => (
                <ExcelExportColumn
                  key={i}
                  field={column.dataField}
                  title={t(column.caption)}
                  groupHeader={props => <CustomGroupHeader {...props} />}
                />
              ))}
            </ExcelExport>
          </React.Fragment>
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({ filters, dataSource }) => {
  return { filters, dataSource }
}

export default connect(mapStateToProps)(Exporter)
