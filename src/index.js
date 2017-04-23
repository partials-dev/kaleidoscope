import Kaleidoscope from './Kaleidoscope'

const options = {
  slices: 15,
  imageSource: 'oldplum.png',
  xPanSpeed: 0.15,
  yPanSpeed: 0.15,
  view: document.getElementById('kaleidoscope'),
  rotationSpeed: 0.000,
  debugMasks: false
}

let k = new Kaleidoscope(options)
setTimeout(() => {
  k.setImage('garden.jpg')
  // k = new Kaleidoscope(options)
}, 2000)

setTimeout(() => {
  k.setImage('oldplum.png')
  // k = new Kaleidoscope(options)
}, 4000)
