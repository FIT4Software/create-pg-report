import React, { PureComponent } from 'react'
import styles from './styles.module.scss'
import TabsContainer, {
  TabPanel,
  TabsContent,
  TabsList,
  Tab
} from '../../components/TabsContainer'
import ErrorMessage from '../../components/ErrorMessage'
import { getReportData } from '../../services/report'
import { showMsg } from '../../services/notification'
import RawData from './RawData'
import Loader from './Loader'

const defaultState = {
  activeTab: 0,
  data: [],
  error: {
    title: '',
    messages: []
  },
  isLoading: true
}
class Main extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      ...defaultState
    }
  }

  componentDidMount() {
    this.readReport()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.filters !== this.props.filters) {
      this.readReport()
    }
  }

  render() {
    const { t } = this.props
    const { error, activeTab, isLoading, data } = this.state

    if (isLoading)
      return (
        <div className={styles.mainContainer}>
          <Loader show text={t('Getting data, please wait')} />
        </div>
      )

    if (error.messages.length > 0)
      return <ErrorMessage messageList={error.messages} title={error.title} />
    else {
      return (
        <div className={styles.mainContainer}>
          <TabsContainer
            activeTab={activeTab}
            onTabChange={tabIndex => this.setState({ activeTab: tabIndex })}
          >
            <TabsList>
              <Tab>Raw Data</Tab>
            </TabsList>
            <TabsContent>
              <TabPanel>
                <RawData t={t} data={data} />
              </TabPanel>
            </TabsContent>
          </TabsContainer>
        </div>
      )
    }
  }

  readReport = () => {
    const { filters, t } = this.props

    if (filters.areValid()) {
      this.setState({
        ...defaultState
      })

      getReportData({ ...filters })
        .then(data => {
          this.setState({
            data,
            isLoading: false
          })
        })
        .catch(error => {
          const msg = error.response
            ? t(error.response.data.ExceptionMessage)
            : error.message
          this.setState({
            ...defaultState,
            isLoading: false,
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
    } else {
      this.setState({
        isLoading: false,
        error: {
          title: 'Please complete the required filters',
          messages: filters.getErrorMessages()
        }
      })
    }
  }
}

export default Main
