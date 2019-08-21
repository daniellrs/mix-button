import React, { Component } from 'react'

import MixButton from '../../dist/index'

import s1 from './songs/r/01 First of the Year (Equinox)-54.wav'
import s2 from './songs/r/01 First of the Year (Equinox)-55.wav'
import s3 from './songs/r/01 First of the Year (Equinox)-56.wav'
import s4 from './songs/r/01 First of the Year (Equinox)-57.wav'
import s5 from './songs/r/01 First of the Year (Equinox)-58.wav'
import s6 from './songs/r/01 First of the Year (Equinox)-46.wav'

const buttons = [
  [{
    audio: s1,
    shortcut: 81
  },{
    audio: s2,
    shortcut: 87
  },{
    audio: s3,
    shortcut: 69
  }],
  [{
    audio: s4,
    shortcut: 65
  },{
    audio: s5,
    shortcut: 83
  },{
    audio: s6,
    shortcut: 68
  }]
]

export default class App extends Component {

  componentDidMount() {
    document.addEventListener('keydown', e => {
      console.log(e.keyCode)
    })
  }

  render () {
    return (
      <React.Fragment>
        {buttons.map((c, index) => 
          <div key={`c-${index}`} style={{display: 'flex'}}>
            {c.map((r, index) => 
              <MixButton 
                key={`r-${index}`}
                style={{width: 80, height: 80, background: '#81b', margin: 5, border: '1px solid #61b'}}
                {...r}
              />
            )}
          </div>
        )}
      </React.Fragment>
    )
  }
}
