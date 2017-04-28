import Kaleidoscope from '../Kaleidoscope'
import uiReducer from './ui'
import firebase from 'firebase/app'
import db from 'firebase/database'

const config = {
  apiKey: 'AIzaSyAfXK9K41iWoZRus__OBOn9LPrfhgjJz30',
  authDomain: 'kaleidoscope-937e0.firebaseapp.com',
  databaseURL: 'https://kaleidoscope-937e0.firebaseio.com',
  projectId: 'kaleidoscope-937e0',
  storageBucket: 'kaleidoscope-937e0.appspot.com',
  messagingSenderId: '773670076024'
}

firebase.initializeApp(config)

const defaultState = {
  imageSource: 'processed_star.png',
  xPanSpeed: 0.15,
  yPanSpeed: 0.15,
  tilePosition: {
    x: 0,
    y: 0
  }
}

const options = {
  slices: 8,
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
