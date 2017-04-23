import NumberInput from '../look/NumberInput'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    value: state.xPanSpeed
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChange (number) {
      dispatch({
        type: 'UPDATE_PAN_SPEED',
        xPanSpeed: number
      })
    }
  }
}

const XSpeedInput = connect(mapStateToProps, mapDispatchToProps)(NumberInput)

export default XSpeedInput
