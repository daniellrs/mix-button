import React, { Component } from 'react'

export default class MixButton extends Component {
  audio = undefined
  continuousInterval = undefined
  playtimeout = undefined
  
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
    if(this.props.shortcut !== prevProps.shortcut) this.handleShortcut()
  }

  handleShortcut = () => {
    if(this.props.shortcut) document.addEventListener('keydown', this.shortcut)
  }

  handleAudio = () => {
    if(this.props.audio) this.audio = new Audio(this.props.audio)
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

  onClick = () => {
    this.playAudio()
    if(this.props.onClick) this.props.onClick()
  }

  render() {
    const {element='div', children, audio, continuous, onPlay, onStop, ...rest} = this.props

    rest.onClick = this.onClick

    return React.createElement(
      element,
      rest,
      children
    )
  }
}
