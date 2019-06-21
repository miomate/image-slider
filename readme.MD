# Image slider ![badge]

<img src="xgithub/slider.png" align="right"
     title="imgage slider" width="163" height="178">

Images slides in a div

[badge]: https://img.shields.io/badge/status-stable-green.svg

### Project completed

All features are implemented and working.

![](xgithub/slider.gif)

### Features

- Images loaded into a div and get values for their position (stairs effect)
and position values again if user hovers on them. Both generated and provided
through JS.
- When hovering over div, button appears, which indicates that user can scroll to the right,
button disappears, when user can't scroll further.
- Lazy load and the IntersectionObserver load images when they are about to become visible.
- The function, which builds the images as HTML string, gets a object with options:
```js
init({
  buttons: true,
  lazy: true,
  items: ['/path of images']
})
```
