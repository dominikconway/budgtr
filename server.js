const express = require('express')
const app = express()
const port = 3001
const budget = require('./models/budget')
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.send('Hello World')
})
// index route
app.get('/budgets', (req,res) => {
    res.send(budget)
})
// new route
app.get('/budgets/new', (req, res) => {

})
// show route
app.get('/budgets/:index', (req, res) => {
    res.send(req.params.index)
})

app.post('/', (req, res) => {

})
app.listen(port, () => {
console.log(`We are listening on ${port}`)
})