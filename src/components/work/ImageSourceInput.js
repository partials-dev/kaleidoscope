import TextInput from '../look/TextInput'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    value: state.ui.imageSourceInput
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChange (text) {
      dispatch({
        type: 'UPDATE_IMAGE_SOURCE_INPUT',
        imageSourceInput: text
      })
    }
  }
}

const ImageSourceInput = connect(mapStateToProps, mapDispatchToProps)(TextInput)

export default ImageSourceInput
