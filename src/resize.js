import PIXI from './pixi'

const pageDimensions = () => {
  const pageWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  const pageHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  return { pageWidth, pageHeight }
}

const resize = app => {
  const { pageWidth, pageHeight } = pageDimensions()
  app.renderer.resize(pageWidth * 2, pageHeight * 2)
  const newCenter = new PIXI.Point(app.renderer.width / 2, app.renderer.height / 2)
  return newCenter
}

export default resize
