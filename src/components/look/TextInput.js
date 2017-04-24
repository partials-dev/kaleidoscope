import React from 'react'

const TextInput = props => {
  const onChange = event => {
    props.onChange(event.target.value)
  }
  return <input onFocus={props.onFocus} onBlur={props.onBlur} type='text' value={props.value} onChange={onChange} />
}

export default TextInput
