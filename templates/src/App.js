import React, { Component } from 'react'
import FiltersContainer from './components/FiltersContainer'
import Layout from './components/Layout'
import Filters from './views/Filters'
import Main from './views/Main'
import MessageScreen from './components/MessageScreen'
import Exporter from './views/Main/Exporter'
import Notification from './components/Notification'
import { translate } from 'react-i18next'
import { getUrlParameter } from './services/helpers'
import { axiosComplete, axiosStart } from './services/axiosConfig'
import { getSelectedFilters } from './services/filters'
import { subscribeNotification } from './services/notification'
import { onFiltersChange } from './services/filters'

class App extends Component {
  constructor(props) {
    super(props)
    this.scheduled = false
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
      filters: null,
      showModalExport: false,
      showExportButton: true,
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

  componentDidMount() {
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
    onFiltersChange().subscribe(({ scheduled }) => {
      if (this.scheduled !== scheduled) {
        this.scheduled = scheduled
        this.setState({
          showFilterPanel: true
        })
      }
    })
    this.setState({ showFilterPanel: true })
  }

  componentDidUpdate(prevProps, prevState) {
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
    this.setState({
      showFilterPanel: false,
      filters: { ...getSelectedFilters() },
      loading: { ...this.state.loading, definition: false },
      showExportButton: true,
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

  onExportMessage = (loading, message, status, callback) => {
    this.setState(
      {
        loading: { isLoading: loading, definition: false },
        messageScreen: {
          show: loading,
          text: message
        },
        showModalExport: status !== 'finished'
      },
      () => {
        if (callback) callback()
      }
    )
  }

  render() {
    const {
      showFilterPanel,
      loading,
      filters,
      messageScreen,
      showModalExport,
      notification,
      showExportButton
    } = this.state
    const { t } = this.props

    return (
      <div>
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
        {showModalExport &&
          filters.areValid() && (
            <Exporter
              t={t}
              onMessage={this.onExportMessage}
              onCancel={() => this.setState({ showModalExport: false })}
              filters={filters}
            />
          )}
        <Layout
          onFilterBtnClick={this.handleFilterPanelBtn}
          filterActive={showFilterPanel}
          onGoClick={this.handleGoButton}
          onExportExcelClick={this.handleExportButton}
          isLoading={loading.isLoading}
          showExportButton={filters && filters.areValid() && showExportButton}
          t={t}
        >
          {filters && (
            <Main
              filters={filters}
              t={t}
              onError={() => this.setState({ showExportButton: false })}
            />
          )}
        </Layout>
        <FiltersContainer open={showFilterPanel}>
          <Filters onRunDefinition={this.handleRunDefinition} t={t} />
        </FiltersContainer>
      </div>
    )
  }
}

export default translate()(App)
