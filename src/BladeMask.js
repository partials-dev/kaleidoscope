const PIXI = window.PIXI

const bladeTip = (radius, angle) => (
  {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle)
  }
)

function randomColor () {
  return Math.round(Math.random() * 0xFFFFFF)
}

function drawBlade (angleStart, angleEnd, center, graphics) {
  // graphics.lineStyle(10, 0xFF0000, 1)
  const radius = 10000
  const a = bladeTip(radius, angleStart)
  const b = bladeTip(radius, angleEnd)
  graphics.moveTo(center.x, center.y)
  graphics.lineTo(a.x + center.x, a.y + center.y)
  graphics.lineTo(b.x + center.x, b.y + center.y)
  graphics.closePath()
  return graphics
}

function drawWindmill (numberOfBlades, graphics, center = { x: 0, y: 0 }) {
  const offset = ((2 * Math.PI) / numberOfBlades)
  graphics.beginFill(randomColor())
  drawBlade(0, offset, center, graphics)
  graphics.endFill()
}

export default class BladeMask extends PIXI.Graphics {
  draw (numberOfBlades) {
    drawWindmill(numberOfBlades, this)
  }
}
