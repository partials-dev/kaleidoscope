import NumberInput from '../look/NumberInput'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    value: state.ui.yPanSpeedInput
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChange (number) {
      dispatch({
        type: 'UPDATE_Y_PAN_SPEED_INPUT',
        yPanSpeedInput: number
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

const YPanSpeedInput = connect(mapStateToProps, mapDispatchToProps)(NumberInput)

export default YPanSpeedInput
