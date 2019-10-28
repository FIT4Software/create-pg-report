import React from 'react'
import Layout from './components/Layout'
import FiltersContainer from './components/FiltersContainer'
import MessageScreen from './components/MessageScreen'
import Notification from './components/Notification'
import Filters from './views/Filters'
import Main from './views/Main'
import Exporter from './views/Main/Report/Export/Exporter'
import { getUrlParameter } from './services/helpers'
import { axiosComplete, axiosStart } from './services/axiosConfig'
import { getErrorMessages } from './services/filters'
import { subscribeNotification } from './services/notification'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateFilters } from './redux/ducks/filters'
import { clearDataSource } from './redux/ducks/dataSource'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showFilterPanel: false,
      messageScreen: {
        text: props.message
          ? props.message
          : !getUrlParameter('id')
          ? 'Error to get report type. Please try again from Landing page.'
          : '',
        show: props.message || !getUrlParameter('id')
      },
      loading: { isLoading: false, definition: false },
      showModalExport: false,
      showExportButton: false,
      showMainComponent: false,
      notification: {
        type: 'error',
        icon: 'star',
        message: '',
        position: '',
        title: '',
        closable: true,
        show: false
      }
    }
  }

  componentDidMount = () => {
    axiosStart().subscribe(() => {
      this.setState({
        loading: { ...this.state.loading, isLoading: true }
      })
    })

    axiosComplete().subscribe(() => {
      this.setState({ loading: { ...this.state.loading, isLoading: false } })
    })

    subscribeNotification().subscribe(notification =>
      this.setState({
        notification: { ...this.state.notification, ...notification }
      })
    )

    this.setState({ showFilterPanel: true })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.loading.definition && !this.state.loading.isLoading) {
      this.setState({
        loading: { ...this.state.loading, definition: false },
        messageScreen: {
          show: false,
          text: ''
        }
      })
    }
  }

  handleFilterPanelBtn = () => {
    this.setState({
      showFilterPanel: !this.state.showFilterPanel
    })
  }

  handleGoButton = () => {
    this.props.updateFilters({ runTime: new Date() })
    this.props.clearDataSource()

    this.setState({
      showFilterPanel: false,
      showExportButton: !getErrorMessages().length > 0,
      showMainComponent: true,
      loading: { ...this.state.loading, definition: false },
      messageScreen: {
        show: false,
        text: ''
      }
    })
  }

  handleRunDefinition = () => {
    const { t } = this.props
    this.setState({
      loading: {
        isLoading: true,
        definition: true
      },
      messageScreen: {
        show: true,
        text: t('Loading Definition')
      }
    })
  }

  handleExportButton = () => {
    this.setState({ showModalExport: true })
  }

  onExportMessage = (loading, message, status) => {
    this.setState({
      loading: { isLoading: loading, definition: false },
      messageScreen: {
        show: loading,
        text: message
      },
      showModalExport: status !== 'finished'
    })
  }

  render = () => {
    const {
      showFilterPanel,
      loading,
      messageScreen,
      showModalExport,
      notification,
      showExportButton,
      showMainComponent
    } = this.state
    const { t } = this.props

    return (
      <React.Fragment>
        <Notification
          show={notification.show}
          icon={notification.icon}
          type={notification.type}
          position={notification.position}
          closable={notification.closable}
          title={notification.title}
          message={notification.message}
        />
        <MessageScreen
          show={messageScreen.show}
          text={messageScreen.text}
          type={loading.isLoading ? 'loading' : 'error'}
        />
        {showModalExport && (
          <Exporter
            t={t}
            onMessage={this.onExportMessage}
            onCancel={() => this.setState({ showModalExport: false })}
          />
        )}
        <Layout
          onFilterBtnClick={this.handleFilterPanelBtn}
          filterActive={showFilterPanel}
          onGoClick={this.handleGoButton}
          onExportExcelClick={this.handleExportButton}
          isLoading={loading.isLoading}
          showExportButton={showExportButton}
          t={t}
        >
          {showMainComponent && (
            <Main
              isShowFilterPanel={showFilterPanel}
              t={t}
              onCancel={() => this.setState({ showModalExport: false })}
              onError={() => this.setState({ showExportButton: false })}
              onFilterBtnClick={this.handleFilterPanelBtn}
            />
          )}
        </Layout>
        <FiltersContainer open={showFilterPanel}>
          <Filters onRunDefinition={this.handleRunDefinition} t={t} />
        </FiltersContainer>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateFilters, clearDataSource }, dispatch)
}

export default connect(
  null,
  mapDispatchToProps
)(translate()(App))
