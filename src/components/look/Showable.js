import React from 'react'

const Showable = props => {
  const show = props.show ? 'show' : 'hide'
  return <div className={'showable ' + show}>{props.children}</div>
}

export default Showable
