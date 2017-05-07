import averageWindow from './averageWindow'

const getAveragedX = averageWindow(10)
const getAveragedY = averageWindow(10)

const flippedTop = (previous, current) => {
  //previous = (previous * 180) - 90 // rescale previous into the -90..90 range
  const difference = previous - current
  const flipped = Math.abs(difference) > 90
  return flipped
}

const flippedSide = (previous, current) => {
  return (previous * current) < 0
}

let pointingUp = true
let pointingLeft = false
let previousQuadrant = null
let currentQuadrant = null

const normalizeGamma = gamma => ((gamma / 90) + 1) / 2
const quadrant = (up, left) => {
  if (up && !left) {
    return 1
  } else if (up && left) {
    return 2
  } else if (!up && left) {
    return 4
  } else {
    return 3
  }
}

let offset = 0
const flipType = (prev, cur) => {
  if (prev === 1 && cur === 4) return 'clockwise'
  if (prev === 4 && cur === 1) return 'counterclockwise'
  if (prev > cur) return 'clockwise'
  if (prev < cur) return 'counterclockwise'
}

const setupOrientationInput = dispatch => {
  let lastNormalizedBeta = null
  let lastRawGamma = null
  let lastGamma = null

  const updateKaleidoscopeFromOrientation = event => {
    let rawGamma = event.gamma
    let newPointingUp = pointingUp
    let newPointingLeft = pointingLeft

    let didFlipTop = false
    if (flippedTop(lastRawGamma, rawGamma)) {
      didFlipTop = true
      newPointingUp = !pointingUp
    }

    let didFlipSide = false
    if (flippedSide(lastRawGamma, rawGamma)) {
      didFlipSide = true
      newPointingLeft = !pointingLeft
    }

    if (didFlipSide || didFlipTop) {
      previousQuadrant = quadrant(pointingUp, pointingLeft)
      pointingLeft = newPointingLeft
      pointingUp = newPointingUp
      currentQuadrant = quadrant(pointingUp, pointingLeft)
      const type = flipType(previousQuadrant, currentQuadrant)
      if (didFlipTop) {
        switch (type) {
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
    }

    let gamma = rawGamma
    gamma += offset
    let normalizedBeta = ((event.beta / 180) + 1) / 2

    if (lastNormalizedBeta == null) {
      lastNormalizedBeta = normalizedBeta
      lastRawGamma = rawGamma
      lastGamma = gamma
    }

    const db = normalizedBeta - lastNormalizedBeta
    const dg = normalizeGamma(gamma) - normalizeGamma(lastGamma)

    lastNormalizedBeta = normalizedBeta
    lastRawGamma = rawGamma
    lastGamma = gamma

    //const x = getAveragedX(db) * 5000
    const x = 0
    const y = getAveragedY(dg) * 5000
    dispatch({ type: 'UPDATE_TILE_POSITION', tilePosition: { x, y }})
  }

  window.addEventListener('deviceorientation', updateKaleidoscopeFromOrientation)
}

export default setupOrientationInput
