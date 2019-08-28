import React, { Component } from 'react'

export default class MixButton extends Component {
  audio = undefined
  continuousInterval = undefined
  playtimeout = undefined
  definitiveAction = undefined
  
  componentDidMount() {
    this.handleAudio()
    this.handleShortcut()
  }

  componentWillUnmount() {
    this.stopAudio()
    clearTimeout(this.playtimeout)
    if(this.props.shortcut) document.removeEventListener('keydown', this.shortcut)
  }
  
  componentDidUpdate(prevProps) {
    if(this.props.audio !== prevProps.audio) this.handleAudio()
    if(this.props.volume !== prevProps.volume) this.handleVolume()
    if(this.props.shortcut !== prevProps.shortcut) this.handleShortcut()
  }

  handleShortcut = () => {
    if(this.props.shortcut) document.removeEventListener('keydown', this.shortcut)
    if(this.props.shortcut) document.addEventListener('keydown', this.shortcut)
  }

  handleAudio = () => {
    if(this.props.audio) this.audio = new Audio(this.props.audio)
    if(this.props.volume) this.handleVolume()
  }

  handleVolume = () => {
    if(this.audio && this.props.volume) this.audio.volume = this.props.volume
  }

  shortcut = e => {
    if(e.keyCode === this.props.shortcut) this.playAudio()
  }

  playAudio = () => {
    if(!this.audio) return
    
    if(this.props.continuous) {
      if(this.continuousInterval) {
        this.stopAudio()
        return
      } else {
        this.handlePlay()
        this.continuousInterval = setInterval(() => this.handlePlay(), this.audio.duration * 1000)
      }
    } else {
      this.handlePlay()
      clearTimeout(this.playtimeout)
      this.playtimeout = setTimeout(() => this.stopAudio(true), this.audio.duration * 1000)
    }

    if(this.props.onPlay) this.props.onPlay()
  }

  stopAudio = (notContinuous) => {
    if(this.audio) {
      this.audio.pause()
      this.audio.currentTime = 0
    }
    if(notContinuous || this.continuousInterval) {
      if(this.props.onStop) this.props.onStop()

      clearInterval(this.continuousInterval)
      this.continuousInterval = undefined
    }
  }

  handlePlay = () => {
    this.audio.pause()
    this.audio.currentTime = 0
    this.audio.play()
  }

  activeButton = (action) => {
    return e => {
      if(!this.definitiveAction) this.definitiveAction = action
      if(this.definitiveAction === action) this.playAudio()
      if(this.props[action]) this.props[action](e)
    }
  }

  render() {
    const {element='div', children, shortcut, audio, volume, continuous, onPlay, onStop, ...rest} = this.props

    rest.onMouseDown = this.activeButton('onMouseDown')
    rest.onTouchStart = this.activeButton('onTouchStart')

    return React.createElement(
      element,
      rest,
      children
    )
  }
}
