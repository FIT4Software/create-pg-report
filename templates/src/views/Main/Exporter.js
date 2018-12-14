import React, { Component } from 'react'
import {
  ExcelExport,
  ExcelExportColumn
} from '@progress/kendo-react-excel-export'

import ExportModal from '../../components/ExportModal'
import { getReportCurrentData } from '../../services/report'

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
      invalidInput: false,
      fileName: `PG IODS Report-${filename}.xlsx`,
      showModal: true,
      data: {
        cvtgELPRawData: [],
        pmELPRawData: [],
        stopsData: [],
        causeData: [],
        rawData: [],
        defData: []
      }
    }
  }

  export = () => {
    const { onMessage, t } = this.props
    onMessage(true, t('Getting data, please wait'), 'fetching data', () =>
      setTimeout(() => {
        this.setState({ data: getReportCurrentData() }, () => this.save())
      }, 100)
    )
  }

  save = () => {
    const { onMessage, t } = this.props
    let worksheet, options

    Object.keys(this._sheets).forEach((key, index) => {
      if (index === 0) {
        worksheet = this._sheets[key]
        options = worksheet.workbookOptions()
        if (options.sheets.length > 0) {
          options.sheets[0].title = t(key)
        }
      } else {
        const sheet = this._sheets[key].workbookOptions()
        if (sheet.sheets.length > 0) {
          sheet.sheets[0].title = t(key)
          options.sheets.push(sheet.sheets[0])
        }
      }
    })

    onMessage(false, '', 'finished')
    worksheet.save(options)
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

  getRawDataColumns = () => {
    return this.state.data.length > 0 ? Object.keys(this.state.data[0]) : []
  }

  render() {
    const { fileName, invalidInput, showModal, data } = this.state
    const { t, onCancel } = this.props

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

        <ExcelExport
          key={'RawData'}
          data={data}
          fileName={fileName}
          ref={exporter => {
            this._sheets['Raw Data'] = exporter
          }}
        >
          {this.getRawDataColumns().map(column => (
            <ExcelExportColumn key={column} field={column} title={column} />
          ))}
        </ExcelExport>

        <ExcelExport
          key={'RawData'}
          data={data}
          fileName={fileName}
          ref={exporter => {
            this._sheets['Example Tab 2'] = exporter
          }}
        >
          {this.getRawDataColumns().map(column => (
            <ExcelExportColumn key={column} field={column} title={column} />
          ))}
        </ExcelExport>
      </div>
    )
  }
}

export default Exporter
