!function(){
  var view = document.querySelector('section.message')

  var model = {
    init: function() {
      var APP_ID = 'EoG2WvQSfLNcHX51F9Cpj667-gzGzoHsz';
      var APP_KEY = 'WQR4qUndcKqWNz42Vs49A28B';
      AV.init({appId: APP_ID, appKey: APP_KEY});
    },
    // 获取数据
    fetch: function() {
      var query = new AV.Query('Message');
      return query.find() // Promise 对象
    },
    // 创建数据
    save: function(name, content) {
      var Message = AV.Object.extend('Message');
      var message = new Message()
      return message.save({ // Promise 对象
        'content': content,
        'name': name
      })
    }
  }

  var controller = {
    view: null,
    model: null,
    messageList: null,
    init: function(view, model) {
      this.view = view
      this.model = model
      
      this.messageList = view.querySelector('#message')
      this.form = view.querySelector('form')
      this.model.init()
      this.loadMessage()
      this.bindEvents()
    },
    loadMessage: function() {
      this.model.fetch()
        .then(
          function (messages) {
            let array = messages.map((item) => item.attributes)
            array.forEach((item) => {
              let li = document.createElement('li')
              li.innerHTML =  `${item.name}: ${item.content}`
              this.messageList.append(li)
            });
          },
          function (error) {
            alert('提交失败，请改天来留言')
            // 异常处理
          }
        )
    },
    bindEvents: function() {
      var _this = this
      this.form.addEventListener('submit', function(e) {
        e.preventDefault()
        _this.saveMessage()
      })
    },
    saveMessage: function() {
      let myForm = this.form
      let content = myForm.querySelector('input[name=content').value
      let name = myForm.querySelector('input[name=name').value
      this.model.save(name, content).then(function(object) {
        let li = document.createElement('li')
        li.innerHTML =  `${object.attributes.name}: ${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.append(li)
        myForm.querySelector('input[name=content').value = ''
      })
    }
  }
  controller.init(view, model)
}.call()





// // 创建 TestObject 表
// var TestObject = AV.Object.extend('TestObject');
// // 在表中创建一行数据
// var testObject = new TestObject();
// // 数据内容是 words: 'Hello World!' 保存
// // 如果保存成功，则运行 alert('')
// testObject.save({
//   words: 'Hello World!'
// }).then(function(object) {
//   console.log(arguments[0])
// })