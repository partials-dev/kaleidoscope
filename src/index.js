import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import App from './components/work/App'

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(reducer, reduxDevTools)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

let hideControls
window.addEventListener('mousemove', () => {
  clearTimeout(hideControls)
  hideControls = setTimeout(() => {
    store.dispatch({ type: 'UPDATE_MOUSE_MOVED_RECENTLY', mouseMovedRecently: false })
  }, 1000)
  store.dispatch({ type: 'UPDATE_MOUSE_MOVED_RECENTLY', mouseMovedRecently: true })
})

console.log('Boston Ivy: Jacek Halicki - Own work, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=44903471')
