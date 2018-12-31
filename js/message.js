!function(){
  var model = Model({resourceName: 'Message'})

  var view = View('section.message')

  var controller = Controller({
    messageList: null,
    form: null,
    init: function(view, model) {
      this.messageList = view.querySelector('#message')
      this.form = view.querySelector('form')
      this.loadMessages()
      // object 上有这三个属性吗
    },
    loadMessages: function() {
      this.model.fetch()
        .then(
          function (messages) {
            let array = messages.map((item) => item.attributes)
            for(var i = 0; i < array.length; i++) {
              var item = array[i]
              let li = document.createElement('li')
              li.innerHTML =  `${item.name}: ${item.content}`
              this.messageList.appendChild(li)
            }
          },
          function (error) {
            alert('提交失败，请改天来留言')
            // 异常处理
          }
        )
    },
    bindEvents: function() {
      this.form.addEventListener('submit', function(e) {
        e.preventDefault()
        this.saveMessage()
      }.bind(this))
    },
    saveMessage: function() {
      let myForm = this.form
      let content = myForm.querySelector('input[name=content').value
      let name = myForm.querySelector('input[name=name').value
      this.model.save({
          'name': name,
          'content': content
        }).then(function(object) {
        let li = document.createElement('li')
        li.innerHTML =  `${object.attributes.name}: ${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.append(li)
        myForm.querySelector('input[name=content').value = ''
      })
    }
  })
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