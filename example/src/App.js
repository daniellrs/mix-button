import React, { Component } from 'react'

import MixButton from '../../dist/index'

export default class App extends Component {

  componentDidMount() {
    document.addEventListener('keydown', e => {
      console.log(e.keyCode)
    })
  }

  render () {
    return (
      <div style={{display: 'flex'}}>
        <MixButton 
          style={{width: 80, height: 80, background: '#81b'}}
          audio={importedSong}
          shortcut={81}
        />
      </div>
    )
  }
}
