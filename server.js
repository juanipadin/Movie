const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const authWebRouter = require('./src/auth/auth')
const moviesInput = require('./src/movies/movies')


/* CARGA LOS ROUTERS */
app.use(authWebRouter)
app.use(moviesInput)

/* app.get('/movie', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/views/movies.html'))
}) */


app.listen(port, () => {
  console.log(`App listening at ${port}`)
})