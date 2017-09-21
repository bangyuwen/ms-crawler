const request = require('request')
const cheerio = require('cheerio')

let store1m = []
let store3m = []
let store = {}

let fetch = (callback) => {
  request('http://monnsutogatya.com/', (error, response, body) => {
    let $ = cheerio.load(body)
    $('div#tab_1m tr td span').each(function(i, elem) {
      if (i % 2 === 0) store1m[i / 2] = $(this).text().replace(/\s/g, '')
    })
    $('div#tab_3m tr td span').each(function(i, elem) {
      if (i % 2 === 0) store3m[i / 2] = $(this).text().replace(/\s/g, '')
    })
    store = {
      date: new Date(),
      oneMin: {
        times: [parseInt(store1m[0]), parseInt(store1m[1])],
        probability: parseFloat(store1m[2])/100 || 0
      },
      threeMin: {
        times: [parseInt(store3m[0]), parseInt(store3m[1])],
        probability: parseFloat(store3m[2])/100 || 0
      }
    }
    callback(store)
  })
}

module.exports = fetch
