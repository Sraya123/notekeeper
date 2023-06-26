const connectToMongo = require('./db');
connectToMongo();

const express = require('express')
const app = express()
const port = 3000

//to use req body on api routes 
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Srayashi')
})
// creating routes
app.use('/api/auth',require('./routes/auth'))
//app.use('/api/')


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})