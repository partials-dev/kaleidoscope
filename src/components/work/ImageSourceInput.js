import TextInput from '../look/TextInput'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    value: state.imageSource
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChange (text) {
      dispatch({
        type: 'UPDATE_IMAGE_SOURCE',
        imageSource: text
      })
    }
  }
}

const ImageSourceInput = connect(mapStateToProps, mapDispatchToProps)(TextInput)

export default ImageSourceInput
