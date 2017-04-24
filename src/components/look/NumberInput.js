import React from 'react'

const NumberInput = props => {
  const onChange = event => {
    props.onChange(event.target.value)
  }
  return <input type='number' onFocus={props.onFocus} onBlur={props.onBlur} value={props.value} step='1' onChange={onChange} />
}

export default NumberInput
