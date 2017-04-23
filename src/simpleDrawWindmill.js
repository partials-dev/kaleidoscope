const PIXI = window.PIXI

const bladeTip = (radius, angle) => (
  {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle)
  }
)

const color = 0xFF0000

function randomColor () {
  return Math.round(Math.random() * 0xFFFFFF)
}

function drawBlade (angleStart, angleEnd, center, graphics) {
  // graphics.lineStyle(10, color, 1)
  const radius = 10000
  const a = bladeTip(radius, angleStart)
  const b = bladeTip(radius, angleEnd)
  graphics.moveTo(center.x, center.y)
  graphics.lineTo(a.x + center.x, a.y + center.y)
  graphics.lineTo(b.x + center.x, b.y + center.y)
  graphics.closePath()
  return graphics
}

export default function drawWindmill (numberOfBlades, graphics = new PIXI.Graphics(), center = { x: 0, y: 0 }) {
  const offset = ((2 * Math.PI) / numberOfBlades)
  graphics.beginFill(randomColor())
  drawBlade(0, offset, center, graphics)
  graphics.endFill()
  return graphics
}
