var container = document.getElementById('container')
var btnNext = document.getElementById('btnNext')

// var btnPrev = document.getElementById('btnPrev')
var translateHoverValues = []
var translateValues = []

function init (settings) {
  function calcTranslateValue () {
    var x = settings.items.length
    var translateValue = 60
    var translateHoverValue = 0

    for (var i = 0; i < x; i++) {
      translateValues.push(translateValue)
      translateHoverValues.push(translateHoverValue)
      translateValue += 60
      translateHoverValue += 60
    }
  }
  calcTranslateValue()

  var selector = document.querySelector(settings.selector)
  // not finished

  var lazyOptions = {
    root: selector,
    rootMargin: '5px'
  }
  var sliderListUl = document.getElementsByClassName('ulImages')[0]
  var newHTML = ''
  var k = settings.items.length

  for (var i = 0; i < settings.items.length; i++) {
    newHTML += `<li class="images" class="images jpg" onmouseover="imgHover(this)" onmouseout="imgHoverOut(this)" style="z-index: ` + k + `; transform: translateX(-` + translateValues[i] + `px)" id="img` + i + `">`

    if (settings.lazy) {
      newHTML += `<img class="lazy" data-lazy="` + settings.items[i] + `">`
    } else {
      newHTML += `<img src="` + settings.items[i] + `">`
    }
    newHTML += `</li>`
    --k // z-index
  }
  sliderListUl.innerHTML = newHTML
  var lazyloadImages = document.querySelectorAll('img.lazy')

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        var src = entry.target.getAttribute('data-lazy')
        entry.target.setAttribute('src', src)
        observer.unobserve(entry.target)
      }
    })
  }, lazyOptions)

  lazyloadImages.forEach(function (img) {
    observer.observe(img)
  })
  if (!settings.buttons) {
    var x = document.getElementById('buttonsID')
    x.innerHTML = ''
    console.log('buttons are false')
  }
  if (settings.selector) {

  }
  return selector
}

function imgHover (element) {
  var x = element.id.slice(3.1) // gives ID as number back, 0,2,3,etc.
  var y = document.getElementById('img' + x)
  y.style.transform = 'translateX(-' + translateHoverValues[x] + 'px)'
}

function imgHoverOut (element) {
  var x = element.id.slice(3.1)
  var y = document.getElementById('img' + x)
  y.style.transform = 'translateX(-' + translateValues[x] + 'px)'
}

container.addEventListener('scroll', function () {
  var x = this.scrollLeft
  // hide and show right button
  if (x > 401) {
    btnNext.style.opacity = 0
    btnNext.style.display = 'none'
  }
  if (x > 0 && x < 400) {
    btnNext.style.opacity = 1
    btnNext.style.display = 'block'
  }
  // hide and show left button
  if (x < 10) {
    btnPrev.style.opacity = 0
    btnPrev.style.display = 'none'
  }
  if (x > 10) {
    btnPrev.style.opacity = 1
    btnPrev.style.display = 'block'
  }
})

function btnScrollSlider (a) {
  if (a === 0) {
    container.scrollLeft -= 300
  } else {
    container.scrollLeft += 300
  }
}

// function call, object as parameter
init({
  selector: '#container',

  buttons: true,
  // lazy: false,
  lazy: true,

  items: ['/images/0.jpg', '/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg', '/images/6.jpg', '/images/7.jpg', '/images/8.jpg', '/images/9.jpg' ]
  // items: ['https://i.imgur.com/DbAtCfY.jpg', 'https://i.imgur.com/DbAtCfY.jpg', 'https://i.imgur.com/DbAtCfY.jpg', 'https://i.imgur.com/DbAtCfY.jpg', 'https://i.imgur.com/DbAtCfY.jpg', 'https://i.imgur.com/DbAtCfY.jpg', 'https://i.imgur.com/DbAtCfY.jpg', 'https://i.imgur.com/DbAtCfY.jpg', 'https://i.imgur.com/DbAtCfY.jpg', 'https://i.imgur.com/z9ebsJE.jpg' ]
})
