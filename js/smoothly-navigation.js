!function(){
  var view = document.querySelector('nav.menu')
  var controller = {
    view: null,
    aTags: null,
    init: function(view) {
      this.view = view
      this.initAnimation()
      this.bindEvents()
    },
    initAnimation: function() {
      function animate(time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      requestAnimationFrame(animate)
    },
    scrollToElement: function(element) {
      let top = element.offsetTop
      // let n = 25 // 一共动多少次
      // let t = 500 / n  // 多少时间动一次
      let currentTop = window.scrollY
      let targetTop = top - 80
      // let s = (targetTop - currentTop) / n
      // let i = 0
      // let id = setInterval(()=>{
      //   if(i===n){
      //     window.clearInterval(id)
      //     return
      //   }
      //   i = i + 1
      //   window.scrollTo(0, currentTop + s * i)
      // },t)
      let s = targetTop - currentTop  // 路程
      var coords = {y: currentTop}   // 起始位置
      var t = Math.abs((s/100)*300)   // 时间
      if(t>500){t=500}
      var tween = new TWEEN.Tween(coords)   // 起始位置
        .to({ y: targetTop}, t)   // 结束位置 和 时间
        .easing(TWEEN.Easing.Cubic.InOut)   // 缓动类型
        .onUpdate(function() {
          // coords.y 已经变了
          window.scrollTo(0, coords.y)   // 如何更新界面
        })
        .start()
    },
    bindEvents: function() {
      let aTags = this.view.querySelectorAll('nav.menu > ul > li > a')
      for(let i=0;i<aTags.length;i++){
        aTags[i].onclick = (x) =>{
          x.preventDefault()
          let a = x.currentTarget
          // a.href 是被浏览器处理过的
          // a.getAttribute('href') 写了什么就是什么
          let href = a.getAttribute('href') // '#siteAbout'
          let element = document.querySelector(href)
          this.scrollToElement(element)
        }
      }
    }
  }
  controller.init(view)
}.call()