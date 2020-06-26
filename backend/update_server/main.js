const express = require('express')
const app = express()

app.get('/update', function (req, res) {
  res.send('Hello World!')
  console.log('req get ')
})  


app.listen(3000, function () {
  console.log('server listening on port 3000!')
})
