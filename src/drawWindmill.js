const PIXI = window.PIXI

const bladeTip = (radius, angle) => (
  {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle)
  }
)

const color = 0xFF0000

function randomColor () {
  // const replaceWithHex = () => {
  //   return (~~(Math.random() * 16)).toString(16)
  // }
  // const randomColor = '#000000'.replace(/0/g, replaceWithHex)
  // return randomColor
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

export default function drawWindmill (numberOfBlades, bladeToFill, angle, center, graphics = new PIXI.Graphics()) {
  const offset = ((2 * Math.PI) / numberOfBlades)
  // bladeToFill *= 2
  // for (let i = 0; i < numberOfBlades; i += 2) {
  //   if (i === bladeToFill) graphics.beginFill()
  //   const angleStart = angle + (i * offset)
  //   const angleEnd = angle + ((i + 1) * offset)
  //   drawBlade(angleStart, angleEnd, center, graphics)
  //   if (i === bladeToFill) graphics.endFill()
  // }
  const i = bladeToFill
  graphics.beginFill(randomColor())
  // const angleStart = angle + (i * offset)
  // const angleEnd = angle + ((i + 1) * offset)
  const angleStart = 0
  const angleEnd = offset
  drawBlade(angleStart, angleEnd, center, graphics)
  graphics.endFill()
  return offset
}
