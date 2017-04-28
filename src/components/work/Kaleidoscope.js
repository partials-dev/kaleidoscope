import { connect } from 'react-redux'
import KaleidoscopeCanvas from '../look/KaleidoscopeCanvas'

const mapStateToProps = state => {
  return {
    slices: state.slices,
    imageSource: state.imageSource,
    xPanSpeed: state.xPanSpeed,
    yPanSpeed: state.yPanSpeed
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const Kaleidoscope = connect(mapStateToProps, mapDispatchToProps)(KaleidoscopeCanvas)
export default Kaleidoscope
