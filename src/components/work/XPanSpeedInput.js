import NumberInput from '../look/NumberInput'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    value: state.ui.xPanSpeedInput
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChange (number) {
      dispatch({
        type: 'UPDATE_X_PAN_SPEED_INPUT',
        xPanSpeedInput: number
      })
    },
    onFocus () {
      dispatch({
        type: 'UPDATE_CONTROLS_HAVE_FOCUS',
        controlsHaveFocus: true
      })
    },
    onBlur () {
      dispatch({
        type: 'UPDATE_CONTROLS_HAVE_FOCUS',
        controlsHaveFocus: false
      })
    }
  }
}

const XPanSpeedInput = connect(mapStateToProps, mapDispatchToProps)(NumberInput)

export default XPanSpeedInput
