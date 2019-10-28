import React from 'react'
import LoaderTab from '../LoaderTab'
import RawData from './RawData'
import { showMsg } from '../../../../services/notification'
import { getTimeOptionSelection } from '../../../../services/filters'
import { getReportData } from '../../../../services/report'
import { updateFilters } from '../../../../redux/ducks/filters'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class TabInfo extends React.Component {
  constructor(props) {
    super(props)
    this.runned = false
    this.state = {
      data: [],
      isRendered: false
    }
  }

  componentDidMount = () => {
    if (this.props.active) this.readReport()
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextProps.filters.runTime !== this.props.filters.runTime)
      this.runned = true
    return (
      !this.state.isRendered ||
      nextProps.filters.runTime !== this.props.filters.runTime
    )
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.filters.runTime !== this.props.filters.runTime) {
      this.setState({ isRendered: false }, () => {
        if (this.props.active) {
          this.readReport()
        }
      })
    } else {
      if (!prevProps.active && this.props.active && !this.state.isRendered) {
        this.readReport()
      }
    }
  }

  render = () => {
    const { t } = this.props
    const { data } = this.state

    if (this.runned || !this.state.isRendered || !this.props.active) {
      return <LoaderTab show text={t('Getting data, please wait')} />
    }

    return (
      <React.Fragment>
        <RawData t={t} data={data} />
      </React.Fragment>
    )
  }

  readReport = () => {
    const { filters } = this.props
    this.runned = false

    if (filters.selected.timeOption === 'UserDefined') {
      this.getData()
    } else {
      getTimeOptionSelection(filters.selected.timeOption).then(response => {
        this.props.updateFilters({
          selected: {
            startTime: response.data[0].dtmStartTime,
            endTime: response.data[0].dtmEndTime
          }
        })

        this.getData()
      })
    }
  }

  getData = () => {
    const { t, lineId, lineDesc, filters } = this.props

    getReportData(lineId, lineDesc, filters)
      .then(response => {
        this.setState({
          data: response,
          isRendered: true
        })
      })
      .catch(error => {
        const msg = error.response
          ? t(error.response.data.ExceptionMessage)
          : error.message
        this.setState({
          error: {
            title: '',
            messages: [msg]
          }
        })
        showMsg({
          type: 'error',
          icon: 'exclamation-triangle',
          message: msg,
          position: '',
          title: error.name,
          closable: true,
          show: true
        })
        if (this.props.onError) this.props.onError(error.response)
      })
  }
}

const mapStateToProps = ({ filters }) => {
  return { filters }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateFilters }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabInfo)
