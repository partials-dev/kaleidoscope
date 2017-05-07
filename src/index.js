import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import App from './components/work/App'
import setupInteraction from './setupInteraction/index'

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(reducer, reduxDevTools)

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('root')
)

const imageId = window.location.pathname.substring(1)
if (imageId.trim().length > 0) {
  store.dispatch({
    type: 'UPDATE_IMAGE_SOURCE',
    imageSource: `https://i.imgur.com/${imageId}`
  })
}

const imageWasUploaded = res => {
  if (res.success === true) {
    const imageSource = res.data.link.replace('http://', 'https://')
    store.dispatch({
      type: 'UPDATE_IMAGE_SOURCE',
      imageSource
    })
  } else {
    console.log('Got an error')
    console.log(JSON.stringify(res))
  }
}

const imgurUploader = new window.Imgur({
  clientid: process.env.REACT_APP_IMGUR_CLIENT_ID,
  callback: imageWasUploaded
})

let hideControls
window.addEventListener('mousemove', () => {
  clearTimeout(hideControls)
  hideControls = setTimeout(() => {
    store.dispatch({ type: 'UPDATE_MOUSE_MOVED_RECENTLY', mouseMovedRecently: false })
  }, 1000)
  store.dispatch({ type: 'UPDATE_MOUSE_MOVED_RECENTLY', mouseMovedRecently: true })
})


setupInteraction(store.dispatch.bind(store))
