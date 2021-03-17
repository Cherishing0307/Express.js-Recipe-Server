/*
This version of the answer code uses handlebars template rendering on the
servers side for the initial page

To Start App use one of the following:
http://localhost:3000
http://localhost:3000/
http://localhost:3000/recipes
http://localhost:3000/recipes?ingredient=Basil
http://localhost:3000/recipes?ingredient=Basil,Cumin
http://localhost:3000/recipes.html
http://localhost:3000/index.html

To get just the JSON data:
http://localhost:3000/api
http://localhost:3000/api?ingredient=Basil
http://localhost:3000/api?ingredient=Basil,Cumin

*/
const express = require('express')
const requestModule = require('request')
const path = require('path')
const hbs = require('hbs')
const PORT = 3000
const API_KEY = '15f46b303afe7783497d3207403f9e47' //L.D. Nel food2fork app id 2406fall2018

const app = express()

// view engine setup to use handlebars
//requires: npm install hbs
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs') //use hbs handlebars wrapper

function handleError(response) {
  //report file reading error to console and client
  console.log('ERROR: ' + JSON.stringify(err));
  //respond with not found 404 to client
  response.writeHead(404);
  response.end(JSON.stringify(err));
}


app.use(express.static(__dirname + '/public'))

app.use(function(request, response, next) {
  console.log('LOG:')
  console.log(`URL: ${request.url}`)
  console.log(request.query)
  next()
})

app.listen(PORT, err => {
  if (err) console.log(err)
  else {
    console.log(`Server listening on port: ${PORT} CNTL-C to quit`)
    console.log(`To Test:`)
    console.log(`http://localhost:3000/recipes`)
    console.log(`http://localhost:3000/recipes?ingredient=Basil`)
    console.log(`http://localhost:3000/recipes?ingredient=Basil,Cumin`)
    console.log(`To get just the JSON data:`)
    console.log(`http://localhost:3000/api`)
    console.log(`http://localhost:3000/api?ingredient=Basil`)
    console.log(`http://localhost:3000/api?ingredient=Basil,Cumin`)
  }
})

app.get('/', (request, response) => {
  let ingredient = request.query.ingredient
  //use handlebars rendering
  if (!ingredient) {
    response.render('index', {
      ingredient: ""
    })
  } else {
    response.render('index', {
      ingredient: request.query.ingredient
    })
  }
})


app.get('/recipes.html', (request, response) => {
  //Example of redirect
  response.redirect('/')
})
app.get('/index.html', (request, response) => {
  //Example of redirect
  response.redirect('/')
})

app.get('/recipes', (request, response) => {
  let ingredient = request.query.ingredient
  //use handlebars rendering
  if (!ingredient) {
    response.render('index', {
      ingredient: ""
    })
  } else {
    response.render('index', {
      ingredient: request.query.ingredient
    })
  }
})

app.get('/api', (request, response) => {
  let url = ''
  let ingredient = request.query.ingredient
  if (!ingredient) {
    //return response.json({message: 'Please enter a proper ingredient'})
    url = `https://food2fork.com/api/search?key=${API_KEY}`
  } else {
    url = `https://food2fork.com/api/search?key=${API_KEY}&q=${ingredient}`
  }
  requestModule.get(url, (err, res, data) => {
    return response.contentType('application/json').json(JSON.parse(data))
  })
})
