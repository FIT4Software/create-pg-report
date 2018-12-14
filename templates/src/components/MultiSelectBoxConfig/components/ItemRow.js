import React from 'react'
import PropTypes from 'prop-types'

const ItemRow = ({
  index,
  isScrolling,
  style,
  labelKey,
  itemData,
  onItemClick,
  icon
}) => {
  return (
    <div
      className="item"
      style={style}
      onClick={() => onItemClick(itemData, index)}
    >
      <span>{itemData && itemData[labelKey]}</span>
      <div>
        <i className={icon} aria-hidden="true" />
      </div>
    </div>
  )
}

ItemRow.propTypes = {
  index: PropTypes.number,
  style: PropTypes.object,
  isScrolling: PropTypes.bool,
  labelKey: PropTypes.string,
  itemData: PropTypes.object,
  onItemClick: PropTypes.func,
  icon: PropTypes.string
}

export default ItemRow
