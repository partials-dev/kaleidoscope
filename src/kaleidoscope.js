import './index.css'
import Blade from './Blade'
import PIXI from './pixi'
import resize from './resize'

const kaleidoscope = options => {
  const defaultOptions = {
    slices: 16,
    imageSource: 'oldplum.png',
    xPanSpeed: 0.15,
    yPanSpeed: 0.15,
    view: document.getElementById('kaleidoscope'),
    rotationSpeed: 0.0005
  }

  options = Object.assign({}, defaultOptions, options)
  const app = new PIXI.Application({ view: options.view })

  let center = resize(app)
  window.onresize = () => { center = resize(app) }

  const blades = []
  for (let i = 0; i < options.slices; i++) {
    blades.push(new Blade(i, options.imageSource, app, center, options.slices))
  }

  app.ticker.add(delta => {
    blades.forEach(blade => {
      blade.image.tilePosition.x -= options.xPanSpeed * delta
      blade.image.tilePosition.y -= options.yPanSpeed * delta
      blade.image.rotation += options.rotationSpeed * delta
      blade.container.position = center
    })
  })
}

export default kaleidoscope
