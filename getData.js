const fs = require('fs')
const fetch = require('./fetch')

let count = 0
let store = []

console.log('start')
setInterval(()=>{
  let fetchP = new Promise((resolve, reject) => {
    fetch(resolve)
  })
  count++
  console.log(count)
  fetchP.then(val=> {
    store.push(val)
    console.log(val)
  })
  if(count === 5) {
    count = 0
    fs.readFile('./data.txt', (err, data) => {
      data = JSON.parse(data)
      data = [...data, ...store]
      fs.writeFile('./data.txt', JSON.stringify(data), (err) => {
        console.log('success')
      })
    })
    store = []
  }
}, 30000)
