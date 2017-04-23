import NumberInput from '../look/NumberInput'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    value: state.yPanSpeed
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChange (number) {
      dispatch({
        type: 'UPDATE_PAN_SPEED',
        yPanSpeed: number
      })
    }
  }
}

const YSpeedInput = connect(mapStateToProps, mapDispatchToProps)(NumberInput)

export default YSpeedInput
