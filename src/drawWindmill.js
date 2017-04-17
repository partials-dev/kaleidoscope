const PIXI = window.PIXI

const bladeTip = (radius, angle) => (
  {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle)
  }
)

const black = 0x000000

function drawBlade (angleStart, angleEnd, center, graphics) {
  // graphics.lineStyle(0, black, 1)
  const radius = 10000
  const a = bladeTip(radius, angleStart)
  const b = bladeTip(radius, angleEnd)
  graphics.moveTo(center.x, center.y)
  graphics.lineTo(a.x + center.x, a.y + center.y)
  graphics.lineTo(b.x + center.x, b.y + center.y)
  graphics.closePath()
  return graphics
}

export default function drawWindmill (numberOfBlades, angle, center, graphics = new PIXI.Graphics()) {
  graphics.fillAlpha = 1
  const offset = ((2 * Math.PI) / numberOfBlades)
  for (let i = 0; i < numberOfBlades; i += 2) {
    graphics.beginFill()
    const angleStart = angle + (i * offset)
    const angleEnd = angle + ((i + 1) * offset)
    drawBlade(angleStart, angleEnd, center, graphics)
    graphics.endFill()
  }
  return offset
}
