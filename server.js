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
// app.get('/budgets', (req,res) => {
//    res.render('index.ejs', {allBudgets: budget})
   
// })

app.get("/budgets", (req, res) => {

    let sum1 = budget.map(item => item.amount) //map extracts all the amounts//
    console.log(sum1) // to see that it worked out//
    const BankAccount = sum1.reduce((a, b) => parseInt(a) + parseInt(b), 0) // .reduce() does the sum //

    console.log(BankAccount) //to corroborate 
    var color = ""; //initiate the variable for the color
    if (BankAccount <= 0) { // logic
        color = "red"

    } else if (BankAccount >= 1000) {
        color = "green"

    }
    console.log(color) // to see that the color is correct
    res.render('index.ejs', {  //passing objects to index.ejs
    allBudgets: budget, // passing Budget object
    bankA: BankAccount, // passing the BankAccount variable to index.ejs
    col:color // passing the color variable to index.ejs
})
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