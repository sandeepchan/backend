const express = require('express')
const app     = express();
const cors    = require('cors')
const bodyparser= require('body-parser')

const db = require('./query')
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
})
)
app.get('/users', db.getUsers)
app.post("/register", db.registerUser)
app.post('/login',db.loginUser);
app.post('/updateUser', db.updateUser)
app.delete('/users/:id', db.deleteUser)
app.listen(5000, ()=> {
    console.log("server Started")
})