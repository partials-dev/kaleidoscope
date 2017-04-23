import React from 'react'
import ImageSourceInput from './ImageSourceInput'
import ChangeImageButton from './ChangeImageButton'
import ChangeSpeedButton from './ChangeSpeedButton'
import XSpeedInput from './XSpeedInput'
import YSpeedInput from './YSpeedInput'

const App = props => {
  return <div>
    <ImageSourceInput /><ChangeImageButton />
    <XSpeedInput /><YSpeedInput /><ChangeSpeedButton />
  </div>
}

export default App
