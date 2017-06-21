const express = require('express')
const app = express()
const mustache = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

app.engine('mustache', mustache())
app.set('views', './views') // default
app.set('view engine', 'mustache')

app.use(expressValidator())
app.use(bodyParser.urlencoded({ extended: false }))
app.listen(3000, function () {
  console.log('Go to 0.0.0.0:3000/index')
})

var todos = []
var complete = []

app.get('/', function (request, response) {
  response.render('index', {pageTitle: 'To Do List', todos: todos, complete: complete})
})

app.post('/', function (request, response) {
  todos.push(request.body.todos)
  response.redirect('/')
})

app.post('/completed', function (request, response) {
  const remove = request.body.completed
  todos.splice(todos.indexOf(remove), 1)
  complete.push(remove)
  response.redirect('/')
})

//
// app.post('/index', function (request, response) {
//   todos.push(request.body.todo)
//   response.redirect('/index', {todos: todos})
//   // response.redirect('/index')
// })
