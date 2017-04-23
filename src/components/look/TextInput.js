import React from 'react'

const TextInput = props => {
  const onChange = event => {
    props.onChange(event.target.value)
  }
  return <input type='text' value={props.value} onChange={onChange} />
}

export default TextInput
