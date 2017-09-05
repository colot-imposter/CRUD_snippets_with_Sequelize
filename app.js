const express = require('express'),
  mustacheExpress = require('mustache-express'),
  bodyParser = require('body-parser'),
  sequelize = require('sequelize'),
  models = require("./models");

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache')

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/public', express.static('public'));


// const todo = models.Todo.build({
//   title: 'Finish writing learning objective',
//   description: 'Sequelize has a lot of concepts to learn',
//   deadline: new Date()
// });
//


app.get('/', function(req, res) {
  const hans = models.Snip.build({
    title:'Hans',
    body: 'Hans',
    notes: 'Hans',
    language: 'Hans',
    tags: 'Hans'
  })
  hans.save().then(function (newTodo) {
    console.log(newTodo);
  })
models.Snip.findOne().then(function (user) {
  console.log(user);
})
  res.render("index");
})

app.get('/snippets', function(req, res) {

      res.render('snippetsGui')


})


app.listen(3000, function() {
  console.log('Express running on http://localhost:3000/.')
});

process.on('SIGINT', function() {
  console.log("\nshutting down");
  const index = require('./models/index')
  index.sequelize.close()

  // give it a second
  setTimeout(function() {
    console.log('process exit');
    process.exit(0);
  }, 1000)
});
