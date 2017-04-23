import Kaleidoscope from '../Kaleidoscope'

const defaultState = {
  imageSource: '',
  currentImageSource: 'oldplum.png',
  xPanSpeed: 0.15,
  yPanSpeed: 0.15,
  currentXPanSpeed: 0.15,
  currentYPanSpeed: 0.15
}

const options = {
  slices: 15,
  imageSource: defaultState.currentImageSource,
  xPanSpeed: defaultState.xPanSpeed,
  yPanSpeed: defaultState.yPanSpeed,
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
    case 'UPDATE_PAN_SPEED': {
      let xPanSpeed
      if (action.xPanSpeed == null) {
        xPanSpeed = state.xPanSpeed
      } else {
        xPanSpeed = action.xPanSpeed
      }
      let yPanSpeed
      if (action.yPanSpeed == null) {
        yPanSpeed = state.yPanSpeed
      } else {
        yPanSpeed = action.yPanSpeed
      }
      const newState = Object.assign(
        {},
        state,
        {
          xPanSpeed,
          yPanSpeed
        }
      )
      return newState
    }
    case 'UPDATE_SPEED': {
      const newState = Object.assign(
        {},
        state,
        {
          currentXPanSpeed: state.xPanSpeed,
          currentYPanSpeed: state.yPanSpeed
        }
      )
      k.setSpeed(state.xPanSpeed, state.yPanSpeed)
      return newState
    }
    default:
      return state
  }
}
