import React from 'react'
import styles from './styles.module.scss'
import RawDataGrid from '../../../components/RawDataGrid'

const RawData = ({ data, active }) => {
  if (!active) return null
  return (
    <div className={styles.container}>
      <RawDataGrid data={data} />
    </div>
  )
}

export default RawData
