import React from 'react'

const NumberInput = props => {
  const onChange = event => {
    props.onChange(event.target.value)
  }
  return <input type='number' value={props.value} onChange={onChange} />
}

export default NumberInput
