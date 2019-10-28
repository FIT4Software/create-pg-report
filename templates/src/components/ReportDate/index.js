import React from 'react'
import styles from './styles.module.scss'
import moment from 'moment'

const ReportDate = ({ t, startTime, endTime }) => {
    return (
        <div className={styles.root}>
            <span>{t('Start Time of the Report')}:</span>
            <span>
                <b>{(startTime !== null && startTime !== '' && startTime !== undefined)
                    ? moment(new Date(startTime)).format("YYYY-MM-DD HH:mm:ss")
                    : '-'}</b>
                    &nbsp;
            </span>
            <span>{t('End Time of the Report')}:</span>
            <span>
                <b>{(endTime !== null && endTime !== '' && endTime !== undefined)
                    ? moment(new Date(endTime)).format("YYYY-MM-DD HH:mm:ss")
                    : '-'}</b>
            </span>
        </div>
    )
}

export default ReportDate