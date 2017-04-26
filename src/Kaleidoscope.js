import './index.css'
import Blade from './Blade'
import PIXI from './pixi'
import resize from './resize'

const assignDefaults = options => {
  const defaultOptions = {
    slices: 16,
    imageSource: 'oldplum.png',
    xPanSpeed: 0.15,
    yPanSpeed: 0.15,
    view: document.getElementById('kaleidoscope')
  }
  return Object.assign({}, defaultOptions, options)
}

class Kaleidoscope {
  constructor (options) {
    options = assignDefaults(options)
    this.slices = options.slices * 2
    this.xPanSpeed = options.xPanSpeed
    this.yPanSpeed = options.yPanSpeed
    const app = new PIXI.Application({ view: options.view })
    this.app = app
    this.blades = []

    const resizeApp = () => {
      this.center = resize(app, options.view)
      this.blades.forEach(blade => blade.appDidResize(app))
    }
    resizeApp()
    window.addEventListener('resize', resizeApp)

    this.setImage(options.imageSource, options.debugMasks)

    const updateBlades = delta => {
      this.blades.forEach(blade => {
        blade.update(this.center, delta, this.xPanSpeed, this.yPanSpeed, options.debugMasks)
      })
    }
    app.ticker.add(updateBlades)
  }
  setSpeed (xPanSpeed, yPanSpeed) {
    this.xPanSpeed = xPanSpeed
    this.yPanSpeed = yPanSpeed
  }
  setImage (imageSource, debugMasks) {
    this.blades.forEach(blade => blade.destroy())
    const blades = []
    for (let i = 0; i < this.slices; i++) {
      blades.push(new Blade(i, imageSource, this.app, this.center, this.slices, debugMasks))
    }

    this.blades = blades
  }
}

export default Kaleidoscope
