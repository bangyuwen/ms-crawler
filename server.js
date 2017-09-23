const express = require('express')
const app = express()
const http = require('http')
const fs = require('fs')

app.use('/static', express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/chart.html', (err) => {
    res.end()
  })
})

app.listen(3000)
