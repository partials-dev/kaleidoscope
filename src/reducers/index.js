import Kaleidoscope from '../Kaleidoscope'

const defaultState = {
  imageSource: '',
  currentImageSource: 'oldplum.png'
}

const options = {
  slices: 15,
  imageSource: defaultState.currentImageSource,
  xPanSpeed: 0.15,
  yPanSpeed: 0.15,
  view: document.getElementById('kaleidoscope'),
  rotationSpeed: 0.000,
  debugMasks: false
}

let k = new Kaleidoscope(options)

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'UPDATE_IMAGE_SOURCE': {
      const newState = Object.assign(
        {},
        state,
        { imageSource: action.imageSource }
      )
      return newState
    }
    case 'UPDATE_IMAGE': {
      const newState = Object.assign(
        {},
        state,
        { currentImageSource: state.imageSource }
      )
      k.setImage(newState.currentImageSource)
      return newState
    }
    default:
      return state
  }
}
