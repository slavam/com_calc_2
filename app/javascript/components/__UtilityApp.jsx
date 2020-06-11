import React from 'react'
import ReactDOM from 'react-dom'

class UtilityApp extends React.Component {
  render() {
    return <p>UtilituApp</p>
  }
}

document.addEventListener('turbolinks:load', () => {
  const app = document.getElementById('utility-app')
  app && ReactDOM.render(<UtilityApp />, app)
})
