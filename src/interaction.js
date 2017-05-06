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

const setupOrientationInput = dispatch => {
  let lastNormalizedBeta = null
  let lastNormalizedGamma = null

  const updateKaleidoscopeFromOrientation = event => {
    const normalizedBeta = ((event.beta / 180) + 1) / 2
    const normalizedGamma = ((event.gamma / 90) + 1) / 2
    if (lastNormalizedBeta == null) {
      lastNormalizedBeta = normalizedBeta
      lastNormalizedGamma = normalizedGamma
    }

    const db = normalizedBeta - lastNormalizedBeta
    const dg = normalizedGamma - lastNormalizedGamma

    lastNormalizedBeta = normalizedBeta
    lastNormalizedGamma = normalizedGamma

    const x = getAveragedX(db) * 5000
    const y = getAveragedY(dg) * 5000
    dispatch({ type: 'UPDATE_TILE_POSITION', tilePosition: { x, y }})
  }

  window.addEventListener('deviceorientation', updateKaleidoscopeFromOrientation)
}

const setupInteraction = dispatch => {
  determineModality().then(modality => {
    if (modality === 'mouse') {
      setupMouseInput(dispatch)
    } else if (modality === 'orientation') {
      setupOrientationInput(dispatch)
    }
  })
}

export default setupInteraction
