import React from 'react'

const Showable = props => {
  const show = props.show ? 'show' : 'hide'
  return <div
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave}
    className={'showable ' + show}>
    {props.children}
  </div>
}

export default Showable
