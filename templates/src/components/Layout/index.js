import React, { Component } from 'react'
import TopBar, { TopBarLeft, TopBarButton, TopBarRight } from './TopBar'
import LanguageSelector from './LanguageSelector'
import DateSelector from './DateSelector'
import { getProfile } from '../../services/auth'
import { getDBServerName } from '../../services/site'
import { Icon } from 'react-fa'
import styles from './styles.module.scss'
import logo from '../../resources/PGPhaseLogo_100.png'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      site: ''
    }
  }

  componentDidMount() {
    getDBServerName().then(data => {
      this.setState({ site: data })
    })
  }

  render() {
    const { site } = this.state
    const {
      onFilterBtnClick,
      filterActive,
      onGoClick,
      onExportExcelClick,
      children,
      isLoading,
      showExportButton,
      t
    } = this.props
    const profile = getProfile()
    return (
      <div className={styles.root}>
        <TopBar>
          <TopBarLeft>
            <div
              className={`${styles['hide-768']} ${styles['logo-container']}`}
            >
              <img src={logo} alt="PG" className={styles.logo} />
            </div>
            <div className={styles.header}>
              <h1 className={styles['hide-1024']}>PG iODS Report</h1>
              <Icon
                name="angle-right"
                className={[styles['separator-icon'], styles['hide-1024']].join(
                  ' '
                )}
              />
              <h2 className={`${styles['hide-768']} ${styles.site}`}>{site}</h2>
              <Icon
                name="angle-right"
                className={`${styles['hide-768']} ${styles['separator-icon']}`}
              />
            </div>

            <TopBarButton
              icon="filter"
              onClick={onFilterBtnClick}
              active={filterActive}
            />
            <DateSelector t={t} styles={styles} />
            <TopBarButton
              icon={isLoading ? 'refresh' : 'rocket'}
              spin={isLoading}
              disabled={isLoading}
              className={styles.go}
              onClick={onGoClick}
            />

            <TopBarButton
              icon={'file-excel-o'}
              disabled={isLoading}
              show={showExportButton}
              className={styles.export}
              onClick={onExportExcelClick}
            />
          </TopBarLeft>
          <TopBarRight>
            <div className={`${styles['hide-1024']} ${styles['right-info']} `}>
              <span className={styles.username}>
                <Icon name="user" className="icon" />

                {profile ? profile.UserID : ''}
              </span>
              <LanguageSelector t={t} />
            </div>
          </TopBarRight>
        </TopBar>
        <div className={styles.main}>{children}</div>
      </div>
    )
  }
}

export default Layout
