let pointingUp = true
let pointingLeft = false
let previousQuadrant = null
let currentQuadrant = null
let offset = 0

const flippedTop = (previousGamma, currentGamma) => {
  const difference = previousGamma - currentGamma
  return Math.abs(difference) > 90
}

const flippedSide = (previous, current) => {
  return (previous * current) < 0
}

const quadrant = (up, left) => {
  if (up) {
    if (!left) return 1
      if (left) return 2
  } else if (!up) {
    // when the device is pointing down,
    // the user is looking up at it
    // so right and left are reversed
    const right = left
    if (!right) return 3
      if (right) return 4
  }
}

const turnDirection = (previousQuadrant, currentQuadrant) => {
  if (previousQuadrant === 1 && currentQuadrant === 4) return 'clockwise'
    if (previousQuadrant === 4 && currentQuadrant === 1) return 'counterclockwise'
      if (previousQuadrant > currentQuadrant) return 'clockwise'
        if (previousQuadrant < currentQuadrant) return 'counterclockwise'
}

const computeQuadrants = (previousGamma, gamma) => {
  let newPointingUp = pointingUp
  let newPointingLeft = pointingLeft

  let didFlipTop = false
  if (flippedTop(previousGamma, gamma)) {
    didFlipTop = true
    newPointingUp = !pointingUp
  }

  let didFlipSide = false
  if (flippedSide(previousGamma, gamma)) {
    didFlipSide = true
    newPointingLeft = !pointingLeft
  }


  previousQuadrant = quadrant(pointingUp, pointingLeft)
  pointingLeft = newPointingLeft
  pointingUp = newPointingUp
  currentQuadrant = quadrant(pointingUp, pointingLeft)
  return { previousQuadrant, currentQuadrant }
}

const getOffset = (previousGamma, gamma) => {
  const { previousQuadrant, currentQuadrant } = computeQuadrants(previousGamma, gamma)
  const didFlipTop = (previousQuadrant < 3 && currentQuadrant >= 3) || (previousQuadrant >=3 && currentQuadrant < 3)
  if (didFlipTop) {
    const direction = turnDirection(previousQuadrant, currentQuadrant)
    switch (direction) {
      case 'clockwise':
        offset += 180
        break
      case 'counterclockwise':
        offset -= 180
        break
      default:
        break
    }
  }
  return offset
}

export default getOffset
