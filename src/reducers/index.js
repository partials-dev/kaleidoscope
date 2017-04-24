import Kaleidoscope from '../Kaleidoscope'
import uiReducer from './ui'

const defaultState = {
  imageSource: 'oldplum.png',
  xPanSpeed: 0.15,
  yPanSpeed: 0.15
}

const options = {
  slices: 15,
  imageSource: defaultState.imageSource,
  xPanSpeed: defaultState.xPanSpeed,
  yPanSpeed: defaultState.yPanSpeed,
  view: document.getElementById('kaleidoscope'),
  debugMasks: false
}

let k = new Kaleidoscope(options)

export default function (state = defaultState, action) {
  const ui = uiReducer(state.ui, action)
  state = Object.assign({}, { ui })
  switch (action.type) {
    case 'UPDATE_IMAGE_SOURCE': {
      const newState = Object.assign(
        {},
        state,
        { imageSource: ui.imageSourceInput }
      )
      k.setImage(newState.imageSource)
      return newState
    }
    case 'UPDATE_PAN_SPEED': {
      const newState = Object.assign(
        {},
        state,
        {
          xPanSpeed: ui.xPanSpeedInput,
          yPanSpeed: ui.yPanSpeedInput
        }
      )
      k.setSpeed(newState.xPanSpeed, newState.yPanSpeed)
      return newState
    }
    default:
      return state
  }
}
