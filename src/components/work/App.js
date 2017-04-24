import React from 'react'
import ImageSourceInput from './ImageSourceInput'
import ChangeImageButton from './ChangeImageButton'
import ChangeSpeedButton from './ChangeSpeedButton'
import XPanSpeedInput from './XPanSpeedInput'
import YPanSpeedInput from './YPanSpeedInput'

const App = props => {
  return <div>
    <ImageSourceInput /><ChangeImageButton />
    <XPanSpeedInput /><YPanSpeedInput /><ChangeSpeedButton />
  </div>
}

export default App
