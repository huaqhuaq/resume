!function(){
  // 添加offset类
  let specialTags = document.querySelectorAll('[data-x]')
  for(let i=0;i<specialTags.length;i++){
    specialTags[i].classList.add('offset') 
  }
  findClosestAndRemoveOffset()
  window.addEventListener('scroll', function(x){
    findClosestAndRemoveOffset()
  }) 

  // helper
  function findClosestAndRemoveOffset() {
    let specialTags = document.querySelectorAll('[data-x]')
    let minIndex = 0
    for(let i=0;i<specialTags.length;i++){
      if(specialTags[i].offsetTop - window.scrollY < Math.abs(specialTags[minIndex].offsetTop - window.scrollY ) ) {
        minIndex = i
      }  
    }
    // minIndex 就是窗口顶部最近的元素
    specialTags[minIndex].classList.remove('offset')
    let id = specialTags[minIndex].id
    let a = document.querySelector('a[href="#' + id + '"]')
    let li = a.parentNode
    let brothersAndMe = li.parentNode.children
    for(let i=0;i<brothersAndMe.length;i++){
      brothersAndMe[i].classList.remove('highlight')
    }
    li.classList.add('highlight')
  }

  let liTags = document.querySelectorAll('nav.menu > ul > li')
  for(let i=0; i<liTags.length; i++){
    liTags[i].onmouseenter = function(x){
      // let li = x.currentTarget
      // let brother = li.getElementsByTagName('ul')[0]
      // while(brother.nodeType == 3){
      //   brother = brother.nextSibling
      // }
      // while(brother.tagName !== 'UL'){
      //   brother = brother.nextSibling
      // }
      // brother.classList.add('active')
      x.currentTarget.classList.add('active')
    }
    liTags[i].onmouseleave = function(x){
      // let li = x.currentTarget
      // let brother = li.getElementsByTagName('ul')[0]
      // brother.classList.remove('active')
      x.currentTarget.classList.remove('active')
    }
  }
}.call()  