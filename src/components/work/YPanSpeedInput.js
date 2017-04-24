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
    }
  }
}

const YPanSpeedInput = connect(mapStateToProps, mapDispatchToProps)(NumberInput)

export default YPanSpeedInput
