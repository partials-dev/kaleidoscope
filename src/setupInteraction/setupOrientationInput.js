import averageWindow from './averageWindow'
import offset from './offset'

const getAveragedX = averageWindow(10)
const getAveragedY = averageWindow(10)

const normalizeGamma = gamma => ((gamma / 90) + 1) / 2

const setupOrientationInput = dispatch => {
  let lastNormalizedBeta = null
  let lastRawGamma = null
  let lastGamma = null

  const updateKaleidoscopeFromOrientation = event => {
    let rawGamma = event.gamma
    let gamma = rawGamma
    gamma += offset(lastRawGamma, rawGamma)
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
