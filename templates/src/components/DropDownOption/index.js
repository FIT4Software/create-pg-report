import React from 'react'

const DropDownOption = ({
  value,
  children,
  onClick,
  className,
  optionComponent: OptionComponent
}) => {
  return (
    <li className={className} onClick={onClick}>
      {OptionComponent && (
        <OptionComponent value={value}>{children}</OptionComponent>
      )}
      {!OptionComponent && children}
    </li>
  )
}

export default DropDownOption
