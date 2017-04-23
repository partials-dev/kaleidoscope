import Button from '../look/Button'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    text: 'Change the speed'
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick () {
      dispatch({
        type: 'UPDATE_SPEED'
      })
    }
  }
}

const ChangeSpeedButton = connect(mapStateToProps, mapDispatchToProps)(Button)

export default ChangeSpeedButton
