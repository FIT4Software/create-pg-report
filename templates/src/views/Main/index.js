import React from 'react'
import ErrorMessage from '../../components/ErrorMessage'
import ReportDate from '../../components/ReportDate'
import TabsContainer, {
  TabPanel,
  TabsContent,
  TabsList,
  Tab
} from '../../components/TabsContainer'
import { getErrorMessages } from './../../services/filters'
import { connect } from 'react-redux'
import TabInfo from './Report/TabInfo'
import styles from './styles.module.scss'

const defaultState = {
  activeTab: 0,
  error: {
    title: '',
    received: false,
    messages: []
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...defaultState
    }
  }

  componentDidMount = () => {
    this.requiredFilters()
  }

  // shouldComponentUpdate = (nextProps, nextState) => {
  //   return (
  //     nextProps.filters.runTime !== this.props.filters.runTime ||
  //     nextState.activeTab !== this.state.activeTab ||
  //     nextState.error !== this.state.error
  //   )
  // }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.filters.runTime !== this.props.filters.runTime) {
      this.setState({ activeTab: 0 })
      this.requiredFilters()
    }
  }

  render = () => {
    const { t, filters, onFilterBtnClick } = this.props
    const { error, activeTab } = this.state

    if (error.messages.length > 0 || !error.received) {
      return (
        <ErrorMessage
          t={t}
          onFilterBtnClick={onFilterBtnClick}
          messageList={error.messages}
          title={error.title}
        />
      )
    }

    return (
      <div className={styles.container}>
        <ReportDate
          t={t}
          startTime={filters.selected.startTime}
          endTime={filters.selected.endTime}
        />
        <TabsContainer
          activeTab={activeTab}
          onTabChange={tabIndex => this.setState({ activeTab: tabIndex })}
        >
          <TabsList>
            {filters.selected.lines.map(item => (
              <Tab key={item.equipmentDesc}>{item.equipmentDesc}</Tab>
            ))}
          </TabsList>
          <TabsContent>
            {filters.selected.lines.map(item => (
              <TabPanel
                key={item.equipmentDesc}
                class={styles.tabsize}
                visible={true}
              >
                <TabInfo
                  t={t}
                  lineId={item.equipmentId}
                  lineDesc={item.equipmentDesc}
                />
              </TabPanel>
            ))}
          </TabsContent>
        </TabsContainer>
      </div>
    )
  }

  requiredFilters = () => {
    const { t } = this.props
    let error = getErrorMessages()

    if (error.length > 0) {
      this.setState({
        error: {
          title: t('Please complete the required filters'),
          messages: error.map(message => t(message)),
          received: true
        }
      })
    } else {
      this.setState({
        error: {
          title: '',
          messages: [],
          received: true
        }
      })
    }
  }
}

const mapStateToProps = ({ filters, dataSource }) => {
  return { filters, dataSource }
}

export default connect(mapStateToProps)(Main)
