import kaleidoscope from './kaleidoscope'

const options = {
  slices: 15,
  imageSource: 'oldplum.png',
  xPanSpeed: 0.15,
  yPanSpeed: 0.15,
  view: document.getElementById('kaleidoscope'),
  rotationSpeed: 0.000,
  debugMasks: false
}

kaleidoscope(options)
