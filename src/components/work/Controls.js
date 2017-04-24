import React from 'react'
import Showable from '../look/Showable'
import { connect } from 'react-redux'
import ImageSourceInput from './ImageSourceInput'
import ChangeImageButton from './ChangeImageButton'
import ChangeSpeedButton from './ChangeSpeedButton'
import XPanSpeedInput from './XPanSpeedInput'
import YPanSpeedInput from './YPanSpeedInput'

const mapStateToProps = state => {
  const children = <div>
    <ImageSourceInput /><ChangeImageButton />
    <XPanSpeedInput /><YPanSpeedInput /><ChangeSpeedButton />
  </div>

  return {
    children,
    show: state.ui.showControls
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMouseEnter () {
      dispatch({ type: 'UPDATE_MOUSE_IS_HOVERING_OVER_CONTROLS', mouseIsHoveringOverControls: true })
    },
    onMouseLeave () {
      dispatch({ type: 'UPDATE_MOUSE_IS_HOVERING_OVER_CONTROLS', mouseIsHoveringOverControls: false })
    }
  }
}

const Controls = connect(mapStateToProps, mapDispatchToProps)(Showable)

export default Controls
