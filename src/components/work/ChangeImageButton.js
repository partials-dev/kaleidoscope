import Button from '../look/Button'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    text: 'Change the image'
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick () {
      dispatch({
        type: 'UPDATE_IMAGE_SOURCE'
      })
    }
  }
}

const ChangeImageButton = connect(mapStateToProps, mapDispatchToProps)(Button)

export default ChangeImageButton
