import PIXI from './pixi'
import BladeMask from './BladeMask'

class KaleidoscopeImage extends PIXI.extras.TilingSprite {
  static fromImage (source, width, height) {
    const image = super.fromImage(source, width, height)
    image.anchor.set(0.5)
    image.mask = new BladeMask()
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

class Blade {
  constructor (i, imageSource, app, center, numberOfBlades) {
    const offset = ((2 * Math.PI) / numberOfBlades)
    const image = KaleidoscopeImage.fromImage(imageSource, app.renderer.width * 2, app.renderer.height * 2)
    const container = new KaleidoscopeContainer(image, offset, center, i)
    image.mask.draw(numberOfBlades)
    app.stage.addChild(container)
    return { container, image }
  }
}

export default Blade
