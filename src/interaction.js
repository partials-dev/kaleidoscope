const determineModality = () => {
  let confirmDeviceOrientationSupport
  const supportsDeviceOrientation = new Promise((resolve, reject) => {
    if ('DeviceOrientationEvent' in window) {
      // only resolve when we actually see a device orientation event
      confirmDeviceOrientationSupport = event => {
        const supported = event.alpha != null && event.beta != null && event.gamma != null
        if (supported) {
          resolve('orientation')
        }
        window.removeEventListener('deviceorientation', confirmDeviceOrientationSupport)
      }
      window.addEventListener('deviceorientation', confirmDeviceOrientationSupport)
    } 
  })

  let confirmMouseSupport
  const supportsMouse = new Promise((resolve, reject) => {
    if ('MouseEvent' in window) {
      confirmMouseSupport = event => {
        window.removeEventListener('mousemove', confirmMouseSupport)
        resolve('mouse')
      }
      window.addEventListener('mousemove', confirmMouseSupport)
    }
  })

  return Promise.race([supportsDeviceOrientation, supportsMouse]).then(modality => {
    window.removeEventListener('mousemove', confirmMouseSupport)
    window.removeEventListener('orientation', confirmDeviceOrientationSupport)
    console.log('decided on ' + modality)
    return modality
  })
}

const average = array => {
  let sum = 0
  for(var i = 0; i < array.length; i++) {
    sum += array[i]
  }
  return sum / array.length
}

const averageWindow = size => {
  const memory = []
  return val => {
    if (val !== null) {
      memory.push(val)
    }
    if (memory.length > size) {
      memory.shift()
    }
    return average(memory)
  }
}

const getAveragedX = averageWindow(10)
const getAveragedY = averageWindow(10)

const setupMouseInput = dispatch => {
  const w = window
  const d = document
  const e = d.documentElement
  const g = d.getElementsByTagName('body')[0]
  let windowWidth = w.innerWidth || e.clientWidth || g.clientWidth
  let windowHeight = w.innerHeight|| e.clientHeight|| g.clientHeight

  window.addEventListener('resize', () => {
    windowWidth = w.innerWidth || e.clientWidth || g.clientWidth
    windowHeight = w.innerHeight|| e.clientHeight|| g.clientHeight
  })

  let normalizedMouseX = null
  let normalizedMouseY = null

  const updateMousePosition = event => {
    normalizedMouseX = event.clientX
    normalizedMouseY = event.clientY
  }

  window.addEventListener('mousemove', updateMousePosition)

  let lastNormalizedMouseX = null
  let lastNormalizedMouseY = null

  const updateKaleidoscopeFromMouse = () => {
    if (lastNormalizedMouseX == null) {
      lastNormalizedMouseX = normalizedMouseX
      lastNormalizedMouseY = normalizedMouseY
    }

    const db = normalizedMouseX - lastNormalizedMouseX
    const dg = normalizedMouseY - lastNormalizedMouseY

    lastNormalizedMouseX = normalizedMouseX
    lastNormalizedMouseY = normalizedMouseY

    const x = getAveragedX(db) * -2
    const y = getAveragedY(dg) * 2
    dispatch({ type: 'UPDATE_TILE_POSITION', tilePosition: { x, y }})
    window.requestAnimationFrame(updateKaleidoscopeFromMouse)
  }

  updateKaleidoscopeFromMouse()
}

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
//const roll = (gamma, previous, current) => {
  //if (previous === 'top-right' && current === 'bottom-left') {
    //return gamma + 180
  //}
  
  //return gamma
//}

const setupOrientationInput = dispatch => {
  let lastNormalizedBeta = null
  let lastRawGamma = null
  let lastGamma = null

  const updateKaleidoscopeFromOrientation = event => {
    let rawGamma = event.gamma
    let anyFlipped = false
    let newPointingUp = pointingUp
    let newPointingLeft = pointingLeft

    if (flippedTop(lastRawGamma, rawGamma)) {
      anyFlipped = true
      newPointingUp = !pointingUp
    }

    if (flippedSide(lastRawGamma, rawGamma)) {
      anyFlipped = true
      newPointingLeft = !pointingLeft
    }

    if (anyFlipped) {
      previousQuadrant = quadrant(pointingUp, pointingLeft)
      pointingLeft = newPointingLeft
      pointingUp = newPointingUp
      currentQuadrant = quadrant(pointingUp, pointingLeft)
      const type = flipType(previousQuadrant, currentQuadrant)
      if (flippedTop(lastRawGamma, rawGamma)) {
        switch (type) {
          case 'clockwise': {
            offset += 180
            break
          }
          case 'counterclockwise':
            offset -= 180
            break
        }
      }
    }

    let gamma = rawGamma
    gamma = gamma + offset
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

const setupInteraction = dispatch => {
  determineModality().then(modality => {
    if (modality === 'mouse') {
      //setupMouseInput(dispatch)
      setupOrientationInput(dispatch)
    } else if (modality === 'orientation') {
      setupOrientationInput(dispatch)
    }
  })
}

export default setupInteraction
