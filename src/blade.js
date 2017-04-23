import PIXI from './pixi'
import BladeMask from './BladeMask'

class KaleidoscopeImage extends PIXI.extras.TilingSprite {
  static fromImage (source, width, height, debugMasks) {
    const image = super.fromImage(source, width, height)
    image.anchor.set(0.5)
    if (!debugMasks) {
      image.mask = new BladeMask()
      return image
    } else {
      return { mask: new BladeMask() }
    }
  }
}

const isEven = n => (n % 2) === 0

class KaleidoscopeContainer extends PIXI.Container {
  constructor (image, offset, center, i, numberOfBlades, debugMasks) {
    super()
    if (!debugMasks) {
      this.addChild(image, image.mask)
    } else {
      this.addChild(image.mask)
    }
    // this.pivot = this.center
    // this.position = center
    this.rotation = offset * i
    if (isEven(i)) this.mirror(offset, numberOfBlades)
  }
  mirror (offset, numberOfBlades) {
    this.scale.x = -1
    if (isEven(numberOfBlades / 2)) this.rotation += offset
  }
  get center () {
    return new PIXI.Point(this.width / 2, this.height / 2)
  }
}

class Blade {
  constructor (i, imageSource, app, center, numberOfBlades, debugMasks = false) {
    const offset = ((2 * Math.PI) / numberOfBlades)
    const image = KaleidoscopeImage.fromImage(imageSource, app.renderer.width * 2.3, app.renderer.height * 2.3, debugMasks)
    const container = new KaleidoscopeContainer(image, offset, center, i, numberOfBlades, debugMasks)
    image.mask.draw(offset)
    app.stage.addChild(container)
    this.image = image
    this.container = container
  }
  update (center, delta, xPanSpeed, yPanSpeed, debugMasks) {
    if (!debugMasks) {
      this.image.tilePosition.x -= xPanSpeed * delta
      this.image.tilePosition.y -= yPanSpeed * delta
    }
    this.container.position = center
  }
  destroy () {
    this.image.destroy()
    this.container.destroy()
  }
}

export default Blade
