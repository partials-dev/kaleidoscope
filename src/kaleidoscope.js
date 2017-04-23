import './index.css'
import drawWindmill from './simpleDrawWindmill'
import makeBlade from './blade'
import PIXI from './pixi'

const defaultOptions = {
  slices: 16,
  imageSource: 'oldplum.png',
  xPanSpeed: 0.15,
  yPanSpeed: 0.15,
  view: document.getElementById('kaleidoscope'),
  rotationSpeed: 0.0005
}

const kaleidoscope = options => {
  options = Object.assign({}, defaultOptions, options)
  const n = options.slices * 2
  const imageSource = options.imageSource
  const xSpeed = options.xPanSpeed
  const ySpeed = options.yPanSpeed
  const rotationSpeed = options.rotationSpeed

  const view = options.view
  const app = new PIXI.Application({ view })

  let center
  const resize = () => {
    const pageWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    const pageHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    app.renderer.resize(pageWidth * 2, pageHeight * 2)
    center = new PIXI.Point(app.renderer.width / 2, app.renderer.height / 2)
  }
  resize()
  window.onresize = resize

  const blades = []
  for (let i = 0; i < n; i++) {
    blades.push(makeBlade(i, imageSource, app, center, n))
  }

  app.ticker.add(delta => {
    blades.forEach(blade => {
      blade.image.tilePosition.x = blade.image.tilePosition.x - (xSpeed * delta)
      blade.image.tilePosition.y = blade.image.tilePosition.y - (ySpeed * delta)
      blade.image.rotation += rotationSpeed * delta
      blade.container.x = center.x
      blade.container.y = center.y
    })
  })
}

export default kaleidoscope
