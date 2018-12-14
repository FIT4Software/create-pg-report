import React, { PureComponent } from 'react'
import MultiSelectBox from 'react-multiselect-box'
import { getDepartments, getLines } from '../../../services/filters'

class PlantModelSelector extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      departments: [],
      lines: []
    }
  }

  static defaultProps = {
    value: {}
  }

  componentDidMount() {
    getDepartments().then(departments => this.setState({ departments }))
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value.departments !== this.props.value.departments) {
      this.getLines()
    }
  }

  onAddDepartments = departments => {
    const { value } = this.props

    this.onChange({
      departments: [...(value.departments || {}), ...departments],
      lines: []
    })
  }

  onRemoveDepartments = department => {
    const { value } = this.props
    const departments = department
      ? value.departments.filter(
          dep => dep.equipmentId !== department.equipmentId
        )
      : []
    this.onChange({
      departments,
      lines: []
    })
  }

  onAddLines = lines => {
    const { value } = this.props
    this.onChange({
      ...value,
      lines: [...(value.lines || {}), ...lines]
    })
  }

  onRemoveLines = line => {
    const { value } = this.props
    const lines = line
      ? value.lines.filter(pl => pl.equipmentId !== line.equipmentId)
      : []

    this.onChange({
      ...value,
      lines
    })
  }

  onChange = pm => {
    const { onChange } = this.props
    if (onChange) {
      onChange(pm)
    }
  }

  render() {
    const { className, value, t, MSlabels } = this.props

    const { departments, lines } = this.state

    return (
      <div className={className}>
        <label>{t('Areas')}</label>
        <MultiSelectBox
          options={departments}
          labelKey="equipmentDesc"
          valueKey="equipmentId"
          onAdd={department => this.onAddDepartments([department])}
          onSelectAll={this.onAddDepartments}
          onRemove={this.onRemoveDepartments}
          onRemoveAll={this.onRemoveDepartments}
          boxHeight={100}
          valueArray={value.departments.map(dep => dep.equipmentId)}
          {...MSlabels}
        />
        <br />
        <label>{t('Production Lines')} </label>
        <MultiSelectBox
          options={lines}
          labelKey="equipmentDesc"
          valueKey="equipmentId"
          onAdd={line => this.onAddLines([line])}
          onSelectAll={this.onAddLines}
          onRemove={this.onRemoveLines}
          onRemoveAll={this.onRemoveLines}
          boxHeight={100}
          valueArray={value.lines.map(pl => pl.equipmentId)}
          {...MSlabels}
        />
      </div>
    )
  }

  getLines = () => {
    const { value } = this.props
    return getLines(value.departments.map(dep => dep.equipmentId)).then(lines =>
      this.setState({
        lines
      })
    )
  }
}

export default PlantModelSelector
