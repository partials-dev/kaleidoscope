import './index.css'
import drawWindmill from './drawWindmill'
const PIXI = window.PIXI

const view = document.getElementById('canvas')
const app = new PIXI.Application({ view })

let center
const resize = () => {
  const pageWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  const pageHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  app.renderer.resize(pageWidth, pageHeight)
  center = new PIXI.Point(app.renderer.width / 2, app.renderer.height / 2)
}
resize()
window.onresize = resize

/*
const topBackground = PIXI.Sprite.fromImage('eternity.jpg')
topBackground.anchor.set(0.5)
topBackground.x = center.x
topBackground.y = center.y
// app.stage.addChild(topBackground)

const topMask = new PIXI.Graphics()
topMask.fillAlpha = 1
topMask.beginFill('white')
topMask.drawRect(0, 0, app.renderer.width, app.renderer.height / 2)
topMask.endFill()

topBackground.mask = topMask

const bottomBackground = PIXI.Sprite.fromImage('eternity.jpg')
bottomBackground.anchor.set(0.5)
bottomBackground.x = center.x
bottomBackground.y = center.y
bottomBackground.scale.y = -1
// app.stage.addChild(bottomBackground)

const bottomMask = new PIXI.Graphics()
bottomMask.fillAlpha = 1
bottomMask.beginFill('white')
bottomMask.drawRect(0, app.renderer.height / 2, app.renderer.width, app.renderer.height / 2)
bottomMask.endFill()

bottomBackground.mask = bottomMask

const container = new PIXI.Container()
container.addChild(topBackground, bottomBackground)

const containerMask = new PIXI.Graphics()
app.stage.addChild(container)
*/

const windmill1 = new PIXI.Graphics()
const windmill2 = new PIXI.Graphics()
// app.stage.addChild(windmill1)

const bg1 = PIXI.Sprite.fromImage('eternity.jpg')
bg1.anchor.set(0.5)
bg1.x = center.x
bg1.y = center.y
bg1.mask = windmill1
app.stage.addChild(bg1)

const bg2 = PIXI.Sprite.fromImage('eternity.jpg')
bg2.anchor.set(0.5)
bg2.x = center.x
bg2.y = center.y
bg2.scale.y = -1
bg2.mask = windmill2
app.stage.addChild(bg2)

let theta = 0
const n = 20
app.ticker.add(delta => {
  windmill1.clear()
  windmill2.clear()

  const offset = drawWindmill(n, theta, center, windmill1)
  drawWindmill(n, theta + offset, center, windmill2)
  theta += 0.0025
  // topBackground.rotation += 0.001
  // bottomBackground.rotation += -0.001
})
// app.stage.addChild(graphics)
