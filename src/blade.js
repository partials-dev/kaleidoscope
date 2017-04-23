import PIXI from './pixi'
import drawWindmill from './simpleDrawWindmill'

class KaleidoscopeImage extends PIXI.extras.TilingSprite {
  static fromImage (source, width, height, numberOfBlades) {
    const image = super.fromImage(source, width, height)
    image.anchor.set(0.5)
    image.mask = drawWindmill(numberOfBlades)
    return image
  }
}

class KaleidoscopeContainer extends PIXI.Container {
  constructor (image, offset, center, i) {
    super()
    this.addChild(image, image.mask)
    this.pivot = this.center
    this.position = center
    this.rotation = offset * i
    if ((i % 2) === 0) this.mirror(offset)
  }
  mirror (offset) {
    this.scale.x = -1
    this.rotation += offset
  }
  get center () {
    return new PIXI.Point(this.width / 2, this.height / 2)
  }
}

// const makeContainer = (image, offset, center, i) => {
//   const container = new KaleidoscopeContainer()
//   container.addChild(image, image.mask)
//   container.pivot.set(container.width / 2, container.height / 2)
//   container.position = center
//   const mirrored = (i % 2) === 0
//   container.scale.x = mirrored ? -1 : 1
//   container.rotation = (offset * i)
//   if (mirrored) container.rotation += offset
//   return container
// }

// function blade (i, imageSource, offset, app, center, numberOfBlades) {
//   const image = KaleidoscopeImage.fromImage(imageSource, app.renderer.width, app.renderer.height)
//   const container = new KaleidoscopeContainer(image, offset, center, i)
//   app.stage.addChild(container)
//   drawWindmill(numberOfBlades, 0, 0, { x: 0, y: 0 }, image.mask)
//   return { container, image }
// }

class KaleidoscopeBlade {
  constructor (i, imageSource, app, center, numberOfBlades) {
    const offset = ((2 * Math.PI) / numberOfBlades)
    const image = KaleidoscopeImage.fromImage(imageSource, app.renderer.width, app.renderer.height, numberOfBlades)
    const container = new KaleidoscopeContainer(image, offset, center, i)
    app.stage.addChild(container)
    return { container, image }
  }
}

const blade = (...args) => new KaleidoscopeBlade(...args)

export default blade
