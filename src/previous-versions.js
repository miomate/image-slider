--- after max killed, restored
var imgArray = []
var container = document.getElementById('container')
var btnNext = document.getElementById('btnNext')
var btnPrev = document.getElementById('btnPrev')
var lazyOptions = {
  root: container, 
 
}
var translateValues = [] // positioning img values in div
var translateHoverValues = [] // on hover effect values

function calcTranslateValue () {
  var x = imgArray.length // 10
  var translateValue = 60
  var translateHoverValue = 0

  for (var i = 0; i < x; i++) {
    translateValues.push(translateValue)
    translateHoverValues.push(translateHoverValue)
    translateValue += 60
    translateHoverValue += 60
  }
}



function buildImages (a) { 
  var sliderListUl = document.getElementsByClassName('ulImages')[0]
  var newHTML = ''
  var k = imgArray.length 
  if (a === 1) {
    for (var i = 0; i < imgArray.length; i++) {
      newHTML += `<li class="images jpg" onmouseover="imgHover(this)" onmouseout="imgHoverOut(this)" style="z-index: ` + k + `; transform: translateX(-` + translateValues[i] + `px)" id="img` + i + `">`

      //  newHTML += `<img class="lazy" data-lazy="`${imgArray[i]}`"></li>`
      newHTML += `<img class="lazy" data-lazy="` + imgArray[i] + `"></li>`

      --k // deacrese z index with each img
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
  } else if (a === 0) {
    for (var i = 0; i < imgArray.length; i++) {
      newHTML += `<li class="images"  onmouseover="imgHover(this)" onmouseout="imgHoverOut(this)" style="z-index: ` + k + `; transform: translateX(-` + translateValues[i] + `px);" id="img` + i + `"><img class="lazy" src="` + imgArray[i] + `"></li>`
      --k
      sliderListUl.innerHTML = newHTML
    }
  }
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

container.addEventListener('onload', function () {
  btnPrev.style.display = 'none'
  console.log('I am on load')
})
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

var lazyloadImages = document.querySelectorAll('img.lazy')
var lazyloadThrottleTimeout
function lazyload () {
  if (lazyloadThrottleTimeout) {
    clearTimeout(lazyloadThrottleTimeout)
  }

  lazyloadThrottleTimeout = setTimeout(function () {
    var currentScroll = container.scrollLeft
    var maxScrollLeft = container.scrollWidth - container.clientWidth // 151

    var lazyloadTrigger = maxScrollLeft / 100 * 50 // 50% of maxScrollWidth

    lazyloadImages.forEach(function (img) {
      if (currentScroll >= lazyloadTrigger) {
        console.log('lazyload trigger')
        var src = img.getAttribute('data-lazy')
        img.setAttribute('src', src) // img.removeAttribute('data-lazy')
      }
    })

    if (lazyloadImages.length == 0) {
      document.removeEventListener('scroll', lazyload)
      window.removeEventListener('resize', lazyload)
      window.removeEventListener('orientationChange', lazyload)
    }
  }, 20)
}

document.addEventListener('scroll', lazyload)
window.addEventListener('resize', lazyload)
window.addEventListener('orientationChange', lazyload)

window.addEventListener('load', function () {
  calcTranslateValue()
  buildImages()
  lazyload()
})

var init = function (obj) {
  // fill array
  if (obj.items) {
    imgArray = obj.items.slice(0)
    console.log(obj.items)
    calcTranslateValue()
  }
  // ------show buttons?
  if (obj.buttons) {
  } else {
    var x = document.getElementById('imagesID')
    x.innerHTML = ''
    console.log('buttons are false')
  }
  // ------lazy yes or no?
  if (obj.lazy) {
    console.log('lazy is true')
    buildImages(1)
  } else {
    console.log('lazy is false')
    buildImages(0)
  }
}
init({
  // selector: '#slider',
  buttons: true,
  // lazy: false,
  lazy: true,

  // x: showBtn()
  items: ['/images/0.jpg','/images/1.jpg','/images/2.jpg','/images/3.jpg','/images/4.jpg','/images/5.jpg','/images/6.jpg','/images/7.jpg','/images/8.jpg','/images/9.jpg',]
  // items: ['https://i.imgur.com/DbAtCfY.jpg', 'https://i.imgur.com/DbAtCfY.jpg', 'https://i.imgur.com/DbAtCfY.jpg', 'https://i.imgur.com/DbAtCfY.jpg', 'https://i.imgur.com/DbAtCfY.jpg', 'https://i.imgur.com/DbAtCfY.jpg', 'https://i.imgur.com/DbAtCfY.jpg', 'https://i.imgur.com/DbAtCfY.jpg', 'https://i.imgur.com/DbAtCfY.jpg', 'https://i.imgur.com/z9ebsJE.jpg' ]
})

---
Holy fuck, lord's son in heaven, shit pile is steaming
lazyload and translateX working, prise...me?
var imgArray = ['0.jpg','1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg', ]
var container = document.getElementById('container')
var btnNext = document.getElementById('btnNext')
var btnPrev = document.getElementById('btnPrev')
var lazyOptions = {
  root: container,
  rootMargin: '5px',
}
var translateValues = [] //positioning img values in div
var translateHoverValues = [] //on hover effect values

function calcTranslateValue() {
  var x = imgArray.length //10
  var translateValue = 60
  var translateHoverValue = 0

  for (var i = 0; i<x; i++) {
    translateValues.push(translateValue)
    translateHoverValues.push(translateHoverValue)
    translateValue += 60
    translateHoverValue += 60
  }
}
calcTranslateValue()
function buildImages(a) { //if a is 0, do lazy load, if a is 1, no lazy load
  var sliderListUl = document.getElementsByClassName('ulImages')[0]
  var newHTML = ''
  var j = 0 //image id 0-x.jpg
  var k = imgArray.length //z-index
  var n = 0
  
  if(a===1) {
  for(var i = 0; i < imgArray.length; i++) {
    console.log(translateValues[1])
  // newHTML +=`<li class="images" id="img`+j+`"><img class="lazy" data-lazy="/images/`+ i +`.jpg"></li>`
  // newHTML +=`<li class="images" id="img`+j+`" style="z-index: `+k+`; transform: translateX(-`+translateValues[n]+`px);"><img class="lazy" data-lazy="/images/`+ i +`.jpg"></li>`

   newHTML +=`<li class="images jpg" onmouseover="imgHover(this)" onmouseout="imgHoverOut(this)" style="z-index: `+k+`;
   transform: translateX(-`+translateValues[n]+`px)"
   id="img`+j+`"><img class="lazy" test="keke" data-lazy="/images/`+ i +`.jpg"></li>`

    --k; //deacrese z index with each img
    j++; //inceare img file count 1.jpg 2.jpg 3.jpg
    n++;
  }
  sliderListUl.innerHTML = newHTML
  
  var lazyloadImages = document.querySelectorAll("img.lazy");
  
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        var src = entry.target.getAttribute('data-lazy')
        entry.target.setAttribute('src', src)
        observer.unobserve(entry.target)
      }
    });
  }, lazyOptions);

  lazyloadImages.forEach(function(img) {
    observer.observe(img);
  })

} else if (a===0) {
  for(var i = 0; i < imgArray.length; i++) {
  var j = 0
  // newHTML +=`<li class="images" id="img`+j+`"><img class="lazy" src="/images/`+ i +`.jpg"></li>`
  newHTML +=`<li class="images" id="img`+j+`" style="z-index: `+k+`; transform: translateX(-`+translateValues[n]+`px);"><img class="lazy" data-lazy="/images/`+ i +`.jpg"></li>`
  --k; //deacrese z index with each img
  j++; //inceare img file count 1.jpg 2.jpg 3.jpg
  n++;
  sliderListUl.innerHTML = newHTML
    }
  }
}


// function buildImages(a) {
//   var sliderListUl = document.getElementsByClassName('ulImages')[0]
//   var newHTML = ''
//   var j = 0 //image id 0-x.jpg
//   var k = imgArray.length //z-index
//   var n = 0

  
//   for(var i = 0; i < imgArray.length; i++) {
//     if (i === imgArray.length) { //imgArray.length - 1
    

//       newHTML +=`<li class="images" id="img`+j+`" style="z-index: `+k+`; transform: translateX(-`+translateValues[n]+`px);"><img class="lazy" data-lazy="/images2/`+ i +`.jpg"></li>`

//       // working but lazy load is missing:
//     //   newHTML += `
//     //   <li class="images jpg" onmouseover="imgHover(this)" onmouseout="imgHoverOut(this)" style="z-index: `+k+`;
//     //   transform: translateX(-`+translateValues[n]+`px);"
//     //   id="img`+j+`"><img src="/images/`+ i +`.jpg"></li>`
//     // } else {
      
//     //   newHTML += 
//     //   `<li class="images jpg" onmouseover="imgHover(this)" onmouseout="imgHoverOut(this)"  style="z-index: `+k+`;
//     //   transform: translateX(-`+translateValues[n]+`px);"
//     //   id="img`+j+`"><img src="/images/`+ i +`.jpg"></li>`
//     }
//     --k; //deacrese z index with each img
//     j++; //inceare img file count 1.jpg 2.jpg 3.jpg
//     n++;
//   }
//   sliderListUl.innerHTML = newHTML
  
// }
var a  = 0
function imgHover(element){
  var x = element.id.slice(3.1) //gives ID as number back, 0,2,3,etc.
  console.table("mouseon", a) 
a++
var y = document.getElementById('img'+x)
  // var ulID = Array.prototype.slice.call(document.getElementById('ulID').children);
  var ulID = Array.from(document.getElementById('ulID').children);
  y.style.transform= 'translateX(-'+translateHoverValues[x]+'px)' 
// console.log("this hover is "+this)
  // console.log(typeof element)
  // console.log(element)
  // console.log("1mouse over " +idImg)
  // var x = document.getElementById(idImg)
  // console.log(x)
  // x.style.transform= 'translateX(-'+translateHoverValue[index]+'px)'
  // ulID.forEach(function(el, index) {
  //   el.addEventListener('mouseover', function() {
  //     var a = 0
  // var idImg = element.id
  // x = document.getElementById(idImg)
  //     // console.log("mouseon "+index)
  //     console.log(x)
  //     delete this
  //     a++
      
      
  // });
// });
}
var a = 0
function imgHoverOut(element){
  var x = element.id.slice(3.1) //gives ID as number back, 0,2,3,etc.

var y = document.getElementById('img'+x)
  // var ulID = Array.prototype.slice.call(document.getElementById('ulID').children);
  var ulID = Array.from(document.getElementById('ulID').children);
  y.style.transform= 'translateX(-'+translateValues[x]+'px)' 

//----
  // var ulID = Array.prototype.slice.call(document.getElementById('ulID').children);
  // var ulID = Array.from(document.getElementById('ulID').children);
  // var idImg = element.id
  // console.table("mouseout") 
  // a++
  // console.log("imgHover() is called, ",a)
  
  // console.log("this hover is "+this)
  
  // console.log("2mouse out " +idImg)
  
  // ulID.forEach(function(el, index) {
  //   el.addEventListener('mouseout', function() {
  //     // console.log("mouseout "+index)
  //     var idImg = element.id
  //     // console.log("id " +idImg)
  //     x = document.getElementById(idImg)
  //         // console.log("kek " +translateValues[index])
  //         x.style.transform= 'translateX(-'+translateValues[index]+'px)' 
  //         delete this
  //     });
      // x.style.transform= 'translateX(-'+translateHoverValues[index]+'px)' 
      // x.style.transform= 'translateX(-0px)' 
  // });
}

var container = document.getElementById('container')
var btnNext = document.getElementById('btnNext')
var btnPrev = document.getElementById('btnPrev')

container.addEventListener('onload', function(){
  btnPrev.style.display = 'none'
  console.log("I am on load")
})      
container.addEventListener('scroll', function() {
  var x = this.scrollLeft
  //hide and show right button
  if (x > 401) { 
    btnNext.style.opacity = 0
    btnNext.style.display = 'none'
  }
  if (x > 0 && x < 400) {
    btnNext.style.opacity = 1
    btnNext.style.display = 'block'
  } 
  //hide and show left button
  if (x < 10) {
    btnPrev.style.opacity = 0
    btnPrev.style.display = 'none'
  }
  if (x > 10) {
    btnPrev.style.opacity = 1
    btnPrev.style.display = 'block'
  }
})

function btnScrollSlider(a) {
  if(a === 0){
    container.scrollLeft -= 300;
  } else {
    container.scrollLeft += 300;
  }
}

document.addEventListener("scroll", function(){});
container.addEventListener("scroll", function(){});

// buildImages()


  var lazyloadImages = document.querySelectorAll("img.lazy")
  var lazyloadThrottleTimeout;
  function lazyload () {
    if(lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }    
   
    lazyloadThrottleTimeout = setTimeout(function() {
      var currentScroll = container.scrollLeft
      var maxScrollLeft = container.scrollWidth - container.clientWidth; //151

      var lazyloadTrigger = maxScrollLeft/100*50 //50% of maxScrollWidth
        
        lazyloadImages.forEach(function(img) {
          if(currentScroll >= lazyloadTrigger) {
            // console.log(img)
            // console.log("first cehck "+img.hasAttribute('data-lazy'))
            console.log("lazyload trigger")
            var src = img.getAttribute('data-lazy')
            // console.log(img)
            img.setAttribute('src', src)
            // img.removeAttribute('data-lazy')
            console.log(img)
            console.log(src)


            // img.removeAttribute('data-lazy');
            // console.log("second cehck "+img.hasAttribute('data-lazy'))

            // img.setAttribute('data-lazy','src')
              // img.src = img.dataset.src;
              // img.classList.remove('lazy');
            }
        });
        // console.log(lazyloadImages[0])
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
    // console.log("This func has timeout of 20ms but runs only if scrolled")

    }, 20);
  }
  
  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);

window.addEventListener("load", function(){
  calcTranslateValue()
  buildImages()
  lazyload()
})

var init = function (obj) {

  //------show buttons?
    if (obj.buttons) {
    } else {
      var x = document.getElementById('imagesID')
      x.innerHTML=''
      console.log("buttons are false")
    }
  //------lazy yes or no?
    if(obj.lazy){
      console.log("lazy is true")
      buildImages(1)
    }else {
      console.log("lazy is false")
      buildImages(0)
    }
  }
  
  init({ 
    // selector: '#slider',
    buttons: true, 
    lazy: true,
    // x: showBtn()
    // items: [],
  })

-----
Here lazy load works and also Option object
var imgArray = ['0.jpg','1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg', ]
var container = document.getElementById('container')
var btnNext = document.getElementById('btnNext')
var btnPrev = document.getElementById('btnPrev')
var lazyOptions = {
  root: container,
  rootMargin: '5px',
}

function buildImages(a) { //if a is 0, do lazy load, if a is 1, no lazy load
  var sliderListUl = document.getElementsByClassName('ulImages')[0]
  var newHTML = ''
  var j = 0 
  
  if(a===1) {
  for(var i = 0; i < imgArray.length; i++) {
    
    newHTML +=`<li class="images" id="img`+j+`"><img class="lazy" data-lazy="/images2/`+ i +`.jpg"></li>`
    j++; 
  }
  sliderListUl.innerHTML = newHTML
  
  var lazyloadImages = document.querySelectorAll("img.lazy");
  
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        var src = entry.target.getAttribute('data-lazy')
        entry.target.setAttribute('src', src)
        observer.unobserve(entry.target)
      }
    });
  }, lazyOptions);

  lazyloadImages.forEach(function(img) {
    observer.observe(img);
  })

} else if (a===0) {
  for(var i = 0; i < imgArray.length; i++) {
  var j = 0
  newHTML +=`<li class="images" id="img`+j+`"><img class="lazy" src="/images/`+ i +`.jpg"></li>`
  j++;
  sliderListUl.innerHTML = newHTML
    }
  }
}

container.addEventListener('scroll', function() {
  var x = this.scrollLeft
  var maxScrollLeft = container.scrollWidth - container.clientWidth;
  var rightBtnTrigger = maxScrollLeft/100*95
  //hide and show right button
  if (x >= rightBtnTrigger) { 
    btnNext.style.opacity = 0
    btnNext.style.display = 'none'
  }
  if (x > 0 && x < rightBtnTrigger) {
    btnNext.style.opacity = 1
    btnNext.style.display = 'block'
  } 
  //hide and show left button
  if (x < 10) {
    btnPrev.style.opacity = 0
    btnPrev.style.display = 'none'
  }
  if (x > 10) {
    btnPrev.style.opacity = 1
    btnPrev.style.display = 'block'
  }
})

function btnScrollSlider(a) {
  if(a === 0){
    container.scrollLeft -= 300;
  } else {
    container.scrollLeft += 300;
  }
}

var init = function (obj) {

//------show buttons?
  if (obj.buttons) {
  } else {
    var x = document.getElementById('imagesID')
    x.innerHTML=''
    console.log("buttons are false")
  }
//------lazy yes or no?
  if(obj.lazy){
    console.log("lazy is true")
    buildImages(1)
  }else {
    console.log("lazy is false")
    buildImages(0)
  }
}

init({ 
  // selector: '#slider',
	buttons: true, 
  lazy: true,
  // x: showBtn()
  // items: [],
})


// albertSlider.delete()
---
var imgArray = ['0.jpg','1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg', ]
//'10.jpg', '11.jpg','12.jpg',
var translateValues = [] //positioning img values in div
var translateHoverValues = [] //on hover effect values

//my version of lazy loading

function calcTranslateValue() {
  var x = imgArray.length //10
  var translateValue = 60
  var translateHoverValue = 0

  for (var i = 0; i<x; i++) {
    translateValues.push(translateValue)
    translateHoverValues.push(translateHoverValue)
    translateValue += 60
    translateHoverValue += 60
  }
}

function buildImages() {
  var sliderListUl = document.getElementsByClassName('ulImages')[0]
  var newHTML = ''
  var j = 0 //image id 0-x.jpg
  var k = imgArray.length //z-index

  
  for(var i = 0; i < imgArray.length; i++) {
    // if (i === imgArray.length - 1) {
    //   newHTML += `
    //   <li class="images jpg" onmouseover="imgHover(this)" onmouseout="imgHoverOut(this)" style="z-index: `+k+`" 
    //   id="img`+j+`"><img src="/images/`+ i +`.jpg"></li>`
    //   //;transform: translateX(-`+translateValues[n]+`px)"></li>`
    // } else {
    //   newHTML += 
    //   `<li class="images jpg" onmouseover="imgHover(this)" onmouseout="imgHoverOut(this)"  style="z-index: `+k+`"
    //   id="img`+j+`"><img src="/images/`+ i +`.jpg"></li>`
    //   //transform: translateX(-`+translateValues[n]+`px);"></li>`
    // }
    

    if(i <= 5) {
      newHTML += `<li class="images" id="img`+j+`"><img src="/images/`+ i +`.jpg"></li>`
    } else {
      newHTML +=`<li class="images" id="img`+j+`"><img class="lazy" data-lazy="/images/`+ i +`.jpg" src="#"></li>`
    }
    --k; //deacrese z index with each img
    j++; //inceare img file count 1.jpg 2.jpg 3.jpg
  }
  sliderListUl.innerHTML = newHTML
  
}

function imgHover () {}
function imgHoverOut () {}

var container = document.getElementById('container')
var btnNext = document.getElementById('btnNext')
var btnPrev = document.getElementById('btnPrev')

container.addEventListener('onload', function(){
  btnPrev.style.display = 'none'
  console.log("I am on load")
})      
container.addEventListener('scroll', function() {
  var x = this.scrollLeft
  console.log(x)
  //hide and show right button
  if (x > 401) { 
    btnNext.style.opacity = 0
    btnNext.style.display = 'none'
  }
  if (x > 0 && x < 400) {
    btnNext.style.opacity = 1
    btnNext.style.display = 'block'
  } 
  //hide and show left button
  if (x < 10) {
    btnPrev.style.opacity = 0
    btnPrev.style.display = 'none'
  }
  if (x > 10) {
    btnPrev.style.opacity = 1
    btnPrev.style.display = 'block'
  }
})

function btnScrollSlider(a) {
  if(a === 0){
    container.scrollLeft -= 300;
  } else {
    container.scrollLeft += 300;
  }
}

document.addEventListener("scroll", function(){});
container.addEventListener("scroll", function(){});

buildImages()


  var lazyloadImages = document.querySelectorAll("img.lazy");    
  var lazyloadThrottleTimeout;
  function lazyload () {

    if(lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }    
   
    lazyloadThrottleTimeout = setTimeout(function() {
      var currentScroll = container.scrollLeft
      var maxScrollLeft = container.scrollWidth - container.clientWidth; //151

      var lazyloadTrigger = maxScrollLeft/100*50 //50% of maxScrollWidth
      
//img data-lazy=""
        
        lazyloadImages.forEach(function(img) {
          if(currentScroll >= lazyloadTrigger) {
            // console.log(img)
            // console.log("first cehck "+img.hasAttribute('data-lazy'))
            
            var src = img.getAttribute('data-lazy')
            // console.log(img)
            img.setAttribute('src', src)
            // img.removeAttribute('data-lazy')
            console.log(img)
            console.log(src)


            // img.removeAttribute('data-lazy');
            // console.log("second cehck "+img.hasAttribute('data-lazy'))

            // img.setAttribute('data-lazy','src')
              // img.src = img.dataset.src;
              // img.classList.remove('lazy');
            }
        });
        console.log(lazyloadImages[0])
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
    // console.log("This func has timeout of 20ms but runs only if scrolled")

    }, 20);
  }
  
  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);

window.addEventListener("load", function(){
  calcTranslateValue()
  buildImages()
  // lazyload()
})
------
var imgArray = ['0.jpg','1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg', ]
//'10.jpg', '11.jpg','12.jpg',
var translateValues = [] //positioning img values in div
var translateHoverValues = [] //on hover effect values
var container = document.getElementById('container')
var btnNext = document.getElementById('btnNext')
var btnPrev = document.getElementById('btnPrev')
var lazyOptions = {
  root: container,
  rootMargin: '5px',
  // threshold: 0.1
}

function calcTranslateValue() {
  var x = imgArray.length //10
  var translateValue = 60
  var translateHoverValue = 0

  for (var i = 0; i<x; i++) {
    translateValues.push(translateValue)
    translateHoverValues.push(translateHoverValue)
    translateValue += 60
    translateHoverValue += 60
  }
}

function buildImages() {
  var sliderListUl = document.getElementsByClassName('ulImages')[0]
  var newHTML = ''
  var j = 0 //image id 0-x.jpg
  var k = imgArray.length //z-index
  
  for(var i = 0; i < imgArray.length; i++) {
    // if (i === imgArray.length - 1) {
    //   newHTML += `
    //   <li class="images jpg" onmouseover="imgHover(this)" onmouseout="imgHoverOut(this)" style="z-index: `+k+`" 
    //   id="img`+j+`"><img src="/images/`+ i +`.jpg"></li>`
    //   //;transform: translateX(-`+translateValues[n]+`px)"></li>`
    // } else {
    //   newHTML += 
    //   `<li class="images jpg" onmouseover="imgHover(this)" onmouseout="imgHoverOut(this)"  style="z-index: `+k+`"
    //   id="img`+j+`"><img src="/images/`+ i +`.jpg"></li>`
    //   //transform: translateX(-`+translateValues[n]+`px);"></li>`
    // }
  

    newHTML +=`<li class="images" id="img`+j+`"><img class="lazy" data-lazy="/images/`+ i +`.jpg"></li>`
    --k; //deacrese z index with each img
    j++; //inceare img file count 1.jpg 2.jpg 3.jpg
  }

  sliderListUl.innerHTML = newHTML

  var lazyloadImages = document.querySelectorAll("img.lazy");
  
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        var src = entry.target.getAttribute('data-lazy')
        entry.target.setAttribute('src', src)
        observer.unobserve(entry.target)
      }
    });
  }, lazyOptions);

  lazyloadImages.forEach(function(img) {
    observer.observe(img);
  })
}

function imgHover () {}
function imgHoverOut () {}

container.addEventListener('onload', function(){
  btnPrev.style.display = 'none'
  console.log("I am on load")
})  

container.addEventListener('scroll', function() {
  var x = this.scrollLeft
  //hide and show right button
  if (x > 401) { 
    btnNext.style.opacity = 0
    btnNext.style.display = 'none'
  }
  if (x > 0 && x < 400) {
    btnNext.style.opacity = 1
    btnNext.style.display = 'block'
  } 
  //hide and show left button
  if (x < 10) {
    btnPrev.style.opacity = 0
    btnPrev.style.display = 'none'
  }
  if (x > 10) {
    btnPrev.style.opacity = 1
    btnPrev.style.display = 'block'
  }
})

function btnScrollSlider(a) {
  if(a === 0){
    container.scrollLeft -= 300;
  } else {
    container.scrollLeft += 300;
  }
}


buildImages()
---------------------
  lazyloadImages.forEach(function(img) {
    if(img.offsetTop < (window.innerHeight + scrollTop)) {
      img.src = img.dataset.src;
      img.classList.remove('lazy');
    }
});
if(lazyloadImages.length == 0) { 
  document.removeEventListener("scroll", lazyload);
  window.removeEventListener("resize", lazyload);
  window.removeEventListener("orientationChange", lazyload);
}
-----
//funzt alles: css fest
var imgArray = ['0.jpg','1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg', ]
//'10.jpg', '11.jpg','12.jpg',
var translateValues = [] //positioning img values in div
var translateHoverValues = [] //on hover effect values

function calcTranslateValue() {
  var x = imgArray.length //10
  var translateValue = 60
  var translateHoverValue = 0

  for (var i = 0; i<x; i++) {
    translateValues.push(translateValue)
    translateHoverValues.push(translateHoverValue)
    translateValue += 60
    translateHoverValue += 60
  }
}

function buildImages() {
  var sliderListUl = document.getElementsByClassName('ulImages')[0]
  var newHTML = ''
  var j = 0 //image id 0-x.jpg
  var k = imgArray.length //z-index

  
  for(var i = 0; i < imgArray.length; i++) {
    if (i === imgArray.length - 1) {
      newHTML += `
      <li class="images lastImg jpg" onmouseover="imgHover(this)" onmouseout="imgHoverOut(this)" style="z-index: `+k+`" 
      id="img`+j+`"><img src="/images/`+ i +`.jpg"></li>`
      //;transform: translateX(-`+translateValues[n]+`px)"></li>`
    } else {
      newHTML += 
      `<li class="images jpg" onmouseover="imgHover(this)" onmouseout="imgHoverOut(this)"  style="z-index: `+k+`"
      id="img`+j+`"><img src="/images/`+ i +`.jpg"></li>`
      //transform: translateX(-`+translateValues[n]+`px);"></li>`
    }
    --k; //deacrese z index with each img
    j++; //inceare img file count 1.jpg 2.jpg 3.jpg
    // l+=60;
    // n++;


    // if(i === imgArray.length - 1) {
    //   newHTML += `
    //   <li class="images lastImg jpg" id="img`+j+`"><img data-lazy="/images/`+ i +`.jpg"></li>`
    // } else if(i <= 6) {
    //   newHTML += `<li class="images jpg" id="img`+j+`"><img src="/images/`+ i +`.jpg"></li>`

    // } else {
    //   newHTML += 
    //   `<li class="images jpg" id="img`+j+`"><img data-lazy="/images/`+ i +`.jpg"></li>`
    // }

    //for lazy loading, this have to change, so first e.g. 6 img don't have data-lazy atribute
    // if (i === imgArray.length - 1) {
    //   newHTML += `
    //   <li class="images lastImg jpg" id="img`+j+`"><img data-lazy="/images/`+ i +`.jpg"></li>`
    // } else {
    //   newHTML += 
    //   `<li class="images jpg" id="img`+j+`"><img data-lazy="/images/`+ i +`.jpg"></li>`
    // }



  }
  sliderListUl.innerHTML = newHTML
}



// var targets = document.querySelectorAll('img')
// container.addEventListener('scroll', (event) => {
  //   targets.forEach(img => {
    //     console.log('💩')
    //     var rect = img.getBoundingClientRect().top
//     if(rect <= window.innerHeight) {
  //       var src = img.getAttribute('data-lazy')
  //       img.setAttribute('src', src);
  //       img.classList.add('fade')
  //     }
  //   })
  // })
function imgHover () {}
function imgHoverOut () {}

var container = document.getElementById('container')
var btnNext = document.getElementById('btnNext')
var btnPrev = document.getElementById('btnPrev')

container.addEventListener('onload', function(){
  btnPrev.style.display = 'none'
  console.log("I am on load")
})      
container.addEventListener('scroll', function() {
  var x = this.scrollLeft
  //hide and show right button
  if (x > 401) { 
    btnNext.style.opacity = 0
    btnNext.style.display = 'none'
  }
  if (x > 0 && x < 400) {
    btnNext.style.opacity = 1
    btnNext.style.display = 'block'
  } 
  //hide and show left button
  if (x < 10) {
    btnPrev.style.opacity = 0
    btnPrev.style.display = 'none'
  }
  if (x > 10) {
    btnPrev.style.opacity = 1
    btnPrev.style.display = 'block'
  }
})

function btnScrollSlider(a) {
  if(a === 0){
    container.scrollLeft -= 300;
  } else {
    container.scrollLeft += 300;
  }
}

window.addEventListener("load", function(){
  calcTranslateValue()
  buildImages()
})
//css:
* {
  scroll-behavior: smooth;
  /*life-difficulty: easy;*/
}
p {
  top: 350px;
  position:absolute;
  font-size: 30px;
}
/* body{
  height: 1000px;
} */
.divImages {
  max-width: 1000px;
  max-height: auto;
  overflow-x: scroll;
  overflow-y: hidden;
  position: absolute;
  z-index: -1;
}

.btnsDiv {
  max-width: 1000px;
  max-height: auto;
  z-index: 99;
  top: 50%;
  position: relative;
}

#btnPrev{
  display: none;
}
#imagesID {
  opacity: 1;
  visibility: hidden;
  -webkit-transition: opacity 600ms, visibility 600ms;
  transition: opacity 600ms, visibility 600ms;
}
#imagesID #btnPrev {
  opacity: 1;
}
.container:hover #imagesID {
  visibility: visible;
  /* opacity: 1; */
}

.ulImages {
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 0;
}

.buttons {
  top: 100px;
}
.divBtnPrev {
  position: absolute;
}
.divBtnNext {
  position: absolute;
  right: 0;
}
.btnsDiv, .images{
  transition: 500ms ease-in-out;
}
.btnsDiv, .images:hover {
  transition-duration: 500ms;
}
/* img {
  min-height: 100px;
  transform: translate(50%);
  
  transition: all 500ms;
} */
/* .fade {
  transform: translateX(0);
  opacity: 1.0;
  transition: all 500ms;
} */
#img0 {
  z-index: 10;
  transform: translateX(-60px);
}
#img1 {
  z-index: 9;
  transform: translateX(-120px);
}
#img2 {
  z-index: 8;
  transform: translateX(-180px);
}
#img3 {
  z-index: 7;
  transform: translateX(-240px);
}
#img4 {
  z-index: 6;
  transform: translateX(-300px);
}
#img5 {
  z-index: 5;
  transform: translateX(-360px);
}
#img6 {
  z-index: 4;
  transform: translateX(-420px);
}
#img7 {
  z-index: 3;
  transform: translateX(-480px);
}
#img8 {
  z-index: 2;
  transform: translateX(-540px);
}
#img9 {
  z-index: 1;
  transform: translateX(-600px);
} 
#img0:hover {
  transform: translateX(0px) !important;
}
#img1:hover {
  transform: translateX(-60px) !important;
}
#img2:hover {
  transform: translateX(-120px) !important;
}
#img3:hover {
  transform: translateX(-180px);
}
#img4:hover {
  transform: translateX(-240px);
}
#img5:hover {
  transform: translateX(-300px);
}
#img6:hover {
  transform: translateX(-360px);
}
#img7:hover {
  transform: translateX(-420px);
}
#img8:hover {
  transform: translateX(-480px);
}
#img9:hover {
  transform: translateX(-540px);
}

/*
.xxx:hover {


}
/* #img10:hover .divImages .btnsDiv{
  max-width: 1200px;
} */
/* #img10:hover > #img9 {
  transform: translateX(-400px); 
  transform: rotate(50deg)
} */

button {
  height: 8rem;
  width: 3.5rem;
  border-radius: 10px;
  font-size: 30px;

  border: none;
  background: rgba(126, 5, 5, 0.589);
  color: rgb(255, 255, 255);
  cursor: pointer;
}

/* Width - not working */
::-webkit-scrollbar {
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1d0;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

//----------------------------------
var imgArray = ['0.jpg','1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg', ]
//'10.jpg', '11.jpg','12.jpg',
var translateValues = [] //positioning img values in div
var translateHoverValues = [] //on hover effect values

function calcTranslateValue() {
  var x = imgArray.length //10
  var translateValue = 60
  var translateHoverValue = 0

  for (var i = 0; i<x; i++) {
    translateValues.push(translateValue)
    translateHoverValues.push(translateHoverValue)
    translateValue += 60
    translateHoverValue += 60
  }
}

function buildImages() {
  var sliderListUl = document.getElementsByClassName('ulImages')[0]
  var newHTML = ''
  var k = imgArray.length //z-index
  var j = 0 //image id 1-x.jpg
  // var l = 60 //translateX(-+l+px)
  // var m = 600 //translateX(-+l+px) last img
  var n = 0 //translateX(-+l+px) hover
  
  for(var i = 0; i < imgArray.length; i++) {
    if (i === imgArray.length - 1) {
      newHTML += `
      <li class="images lastImg jpg" onmouseover="imgHover(this)" onmouseout="imgHoverOut(this)" style="z-index: `+k+`" 
      id="img`+j+`"><img src="/images/`+ i +`.jpg"></li>`
      //;transform: translateX(-`+translateValues[n]+`px)"></li>`
    } else {
      newHTML += 
      `<li class="images jpg" onmouseover="imgHover(this)" onmouseout="imgHoverOut(this)"  style="z-index: `+k+`"
      id="img`+j+`"><img src="/images/`+ i +`.jpg"></li>`
      //transform: translateX(-`+translateValues[n]+`px);"></li>`
      n++
    }
    --k; //deacrese z index with each img
    j++; //inceare img file count 1.jpg 2.jpg 3.jpg
    // l+=60;
    // n++;
  }
  sliderListUl.innerHTML = newHTML
}




function imgHover(element){
  var x = element.id.slice(3.1)
  console.log(x)

  // var ulID = Array.prototype.slice.call(document.getElementById('ulID').children);
  var ulID = Array.from(document.getElementById('ulID').children);
  element.style.transform= 'translateX(-'+translateHoverValues[x]+'px)' 
// console.log("this hover is "+this)
  // console.log(typeof element)
  // console.log(element)
  // console.log("1mouse over " +idImg)
  // var x = document.getElementById(idImg)
  // console.log(x)
  // x.style.transform= 'translateX(-'+translateHoverValue[index]+'px)'
  // ulID.forEach(function(el, index) {
  //   el.addEventListener('mouseover', function() {
  //     var a = 0
  // var idImg = element.id
  // x = document.getElementById(idImg)
  //     // console.log("mouseon "+index)
  //     console.log(x)
  //     delete this
  //     a++
      
      
  //     // console.log('a is '+a)
  //     ulID.length = 0
  // });
// });
}

function imgHoverOut(element){
  // var ulID = Array.prototype.slice.call(document.getElementById('ulID').children);
  var ulID = Array.from(document.getElementById('ulID').children);
  var idImg = element.id
  
  // console.log("this hover is "+this)
  
  // console.log("2mouse out " +idImg)
  
  ulID.forEach(function(el, index) {
    el.addEventListener('mouseout', function() {
      console.log("mouseout "+index)
      var idImg = element.id
      // console.log("id " +idImg)
      x = document.getElementById(idImg)
          // console.log("kek " +translateValues[index])
          x.style.transform= 'translateX(-'+translateValues[index]+'px)' 
          delete this
      });
      // x.style.transform= 'translateX(-'+translateHoverValues[index]+'px)' 
      // x.style.transform= 'translateX(-0px)' 
  });
  


}
window.onload = calcTranslateValue(), buildImages(), applyTranslate() //,imgHover(), 
// Use this when project done: window.addEventListener("load", function() {
//   calcTranslateValue();
//   buildImages();
//   applyTranslate();
// });

function applyTranslate () { //for each img in ul apply style transform with value from array translateValues
  var array = document.getElementsByClassName('jpg');
  var n = 0

  for (var i = 0; i < array.length; i++){
    array[i].style.transform= 'translateX(-'+translateValues[n]+'px)'
    n++
  }
 
  
  var x = Object.values(ulID)
  //console.log(typeof ulID) //obj
  //console.log(translateValues)
  // console.log( x)
  // console.log( typeof x)
  // console.log( JSON.stringify(x))
  var y = document.querySelectorAll('images')
  // console.log(y)
//queryselectorall
  // for each()

  for (var i = 0; i < imgArray.length; i++) {
    var x = 0
    
    // console.log(ulID[x]+' element in ulID')
    x++
  }

  
  //x.style.transform = 'translateX(-'+translateHoverValues[n]+'px)'
}

//get index of image and sent to other functions
// var ulID = Array.prototype.slice.call(document.getElementById('ulID').children);
// ulID.forEach(function(el, index) {
  //   el.addEventListener('mouseover', function() {
    //     imgHoverOut(index), imgHover(index)
    //     console.log('The index of the image is:', index);
    //   });
    // });
    
    var container = document.getElementById('container')
    var btnNext = document.getElementById('btnNext')
    var btnPrev = document.getElementById('btnPrev')
    var maxScrollLeft = container.scrollWidth - container.clientWidth;
    
container.addEventListener('onload', function(){
  btnPrev.style.display = 'none'
console.log("I am on load")
})    
container.addEventListener('scroll', function() {
 
  var x = this.scrollLeft
  // console.log("x " +x) //0-420
  //hide and show right button
  if (x > 401) {
    btnNext.style.opacity = 0
    btnNext.style.display = 'none'
  }
  if (x > 0 && x < 400) {
    btnNext.style.opacity = 1
    btnNext.style.display = 'block'
  } 
  //hide and show left button
  if (x < 10) {
    btnPrev.style.opacity = 0
    btnPrev.style.display = 'none'
  }
  if (x > 10) {
    btnPrev.style.opacity = 1
    btnPrev.style.display = 'block'
  }
})

function btnScrollSlider(a) {
  if(a === 0){
    container.scrollLeft -= 300;
  } else {
    container.scrollLeft += 300;
  
  }
}


//transform: rotate(20deg);

//can't apply style to previous element while hoovering on last
// var arrayLength = imgArray.length
// var a = 'img'+arrayLength
// console.log(a)
// var lastImage = document.getElementById('img'+arrayLength+'')
// console.log(lastImage)




//[data-role="container"]

--------------------------------------------------------------------------------------------------------------
var imgArray = ['0.jpg','1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg', ]
//'10.jpg', '11.jpg','12.jpg',
var translateValues = [] //positioning img values in div
var translateHoverValues = [] //on hover effect values

function buildImages() {
  var sliderListUl = document.getElementsByClassName('ulImages')[0]
  var newHTML = ''
  var k = imgArray.length //z-index
  var j = 1
  var l = 60 //translateX(-+l+px)
  var m = 600 //translateX(-+l+px) last img
  var n = 0 //translateX(-+l+px) hover
  
 
  for(var i = 0; i < imgArray.length; i++) {
    if (i === imgArray.length - 1) {
      newHTML += `<li class="images lastImg" onmouseover="imgHover(this);" style="z-index: `+k+`" id="img`+j+`"><img src="/images/`+ i +`.jpg" 
      style="z-index: `+k+`;"></li>`

    } else {
      newHTML += '<li class="images" onmouseover="imgHover(this);"  style="z-index: '+k+'" id="img'+j+'"><img src="/images/'+ i +'.jpg" style="z-index: '+k+'; transform: translateX(-'+l+'px);"></li>'
      // console.log(l+"and n is "+n)
    }
    // console.log(k)
    --k; 
    j++;
    l+=60;
    n += 60;
  }
  sliderListUl.innerHTML = newHTML
}
function imgHover(obj){
    var idImg = obj.id
    console.log(typeof idImg) //string
    var imageHover = document.getElementById(idImg)
    console.log(typeof imageHover) //object
    console.log(imageHover) //object
    // imageHover.style.transform = 'translateX(-'++'px)'

  }
function calcTranslateValue(){
  var x = imgArray.length //10

  
  var translateValue = 60
  for(var i = 0; i<x; i++){
    translateValues.push(translateValue)
    console.log(translateValues)
    translateValue +=60
  }
  // var  = 
}

var container = document.getElementById('container')
var btnNext = document.getElementById('btnNext')
var btnPrev = document.getElementById('btnPrev')
var maxScrollLeft = container.scrollWidth - container.clientWidth;

container.addEventListener('scroll', function() {
  // console.log(this.ScrollLeft)//undefined
  // console.log(this) //div id container
  // console.log(container.scrollWidth)
  var x = this.scrollLeft
  // console.log("x " +x) //0-420
  //hide and show right button
  if (x > 401) {
    btnNext.style.opacity = 0
    btnNext.style.display = 'none'

  }
  if (x > 0 && x < 400) {
    btnNext.style.opacity = 1
    btnNext.style.display = 'block'

  } 
  //hide and show left button
  if (x < 10) {
    btnPrev.style.opacity = 0
    btnPrev.style.display = 'none'

  }
  if (x > 10) {
    btnPrev.style.opacity = 1
    btnPrev.style.display = 'block'

  }
})

function btnScrollSlider(a) {
  if(a === 0){
    container.scrollLeft -= 300;
  } else {
    container.scrollLeft += 300;
  
  }
}

function provideStyleImg(){
  // for (var i in imgArray){
  //   console.log("I am in for")
  //   var x = document.getElementsById('img'+i)
  //   x.style.transform = "rotate(20deg)";
    
  // }
  for(var i = 1; i < imgArray.length; i++){
    var x = document.getElementById('x')
    var a = 60;
    // x.style.transform = "rotate(20deg)";
    // x.style.transform = "translateX(60px)";
  }
}
//transform: rotate(20deg);

//can't apply style to previous element while hoovering on last
// var arrayLength = imgArray.length
// var a = 'img'+arrayLength
// console.log(a)
// var lastImage = document.getElementById('img'+arrayLength+'')
// console.log(lastImage)

window.onload = buildImages(), provideStyleImg(), calcTranslateValue()


//[data-role="container"]