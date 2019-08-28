# mix-button

This is a library to easily play and configure audio on HTML elements.

## Install

```
npm install mix-button --save
or
yarn add mix-button
```

## Usage

```jsx
import MixButton from 'mix-button'

import audio from './some-audio.wav'

render () {

  return (
    <MixButton 
      audio={audio}
      style={{width: 50, height: 50}}
    />
  )
}
```

## MixButton properties

| Prop       | Type           | Description  |
| ------------- |:-------------:| ------------- |
| audio | string | The audio to play when the element is clicked. |
| shortcut | number | The key code of some key of keyboard to play the audio when pressed. |
| volume | number | The volume of the audio (between 0-1). |
| continuous | boolean | If the audio should play continuously. |
| onPlay | Function | Triggered when the audio starts. |
| onStop | Function | Triggered when the audio stops. |
| element | string | The element that should be rendered (Default is 'div'). |


## License

MIT © [daniellrs](https://github.com/daniellrs)
