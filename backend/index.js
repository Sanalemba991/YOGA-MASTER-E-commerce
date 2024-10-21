const express = require('express')
const app = express()
const port = process.env.PORT || 4000;

// laitonjamsanalembameitei99
//jhSzk7Q881b7RMAO

app.get('/', (req, res) => {
  res.send('Rom Start')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})