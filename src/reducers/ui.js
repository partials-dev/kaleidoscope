const defaultState = {
  imageSourceInput: '',
  xPanSpeedInput: 0.15,
  yPanSpeedInput: 0.15
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'UPDATE_IMAGE_SOURCE_INPUT': {
      const newState = Object.assign(
        {},
        state,
        { imageSourceInput: action.imageSourceInput }
      )
      return newState
    }
    case 'UPDATE_X_PAN_SPEED_INPUT': {
      const newState = Object.assign(
        {},
        state,
        { xPanSpeedInput: action.xPanSpeedInput }
      )
      return newState
    }
    case 'UPDATE_Y_PAN_SPEED_INPUT': {
      const newState = Object.assign(
        {},
        state,
        { yPanSpeedInput: action.yPanSpeedInput }
      )
      return newState
    }
    default:
      return state
  }
}
