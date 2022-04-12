const express = require('express')
const app = express()
const port = 3001
const budget = require('./models/budget')
const bodyParser = require('body-parser')
/////////////////////////////////
// adds middleware for serving static files
///////////////////////////////////
app.use('/public', express.static('public'))
///////////////////////////////////
/////////////middleware - used for post route - tells express to use middleware
///////////////////////////////////
app.use(express.urlencoded({ extended: false }));
// app.use((req,res, next) => {
//     console.log('i run for all routes')
//     next()
// })
///////////////////////////////////
app.get('/', (req, res) => {
    res.send('Hello World')
})
// index route
app.get('/budgets', (req,res) => {
   res.render('index.ejs', {allBudgets: budget})
})

app.get('/budgets/new', (req,res) => {
    res.render('new.ejs')
})
// show route
app.get('/budgets/:index', (req, res) => {
    res.render('show.ejs',{budgets: budget[req.params.index]})
})

app.post('/budgets', (req, res) => {
    //console.log(req.body);
    budget.push(req.body)
    res.redirect('/budgets')
    
  });

app.listen(port, () => {
console.log(`We are listening on ${port}`)
})