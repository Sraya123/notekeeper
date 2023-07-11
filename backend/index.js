const connectToMongo = require('./db');
connectToMongo();

const express = require('express')
const app = express()
//
const port = process.env.PORT || 8000;

//to use req body on api routes 
app.use(express.json())
app.post('/',(req,res)=>{
  res.send('welcome to main page')
})

// creating routes
app.use('/api/auth',require('./routes/auth'))
//app.use('/api/')


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})