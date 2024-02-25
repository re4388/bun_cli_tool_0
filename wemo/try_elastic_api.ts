const axios = require('axios')
const moment = require('moment')
const momenttz = require('moment-timezone')

const now = new Date()

const ES_BASE_URL =
  process.env.NODE_ENV === 'ci'
    ? 'https://elasticsearch.wemoscooter-intra.com:443'
    : 'https://elasticsearch.wemoscooter.com:443'

const filter = [
  {
    bool: {
      should: [{ match_phrase: { 'matchPath.keyword': '/v23/scooters' } }],
      minimum_should_match: 1
    }
  },
  { bool: { should: [{ match: { method: 'GET' } }], minimum_should_match: 1 } }
]

let gte = moment(now).subtract(1, 'days').toISOString()
console.log('------->gte: ', gte)
// 2024-02-22T09:19:50.736Z
let lte = now.toISOString()
console.log('------->lte: ', lte)

const range = {
  timestamp: {
    gte,
    lte,
    format: 'strict_date_optional_time'
  }
}

axios({
  method: 'get',
  url: `${ES_BASE_URL}/fluentd.app.hermes.accesslog-*/_count`,
  headers: { Authorization: 'Basic YmFja2VuZDpiQGNrM25kJCQ=' },
  data: {
    query: {
      bool: {
        must: [],
        filter: [{ bool: { filter } }, { range }],
        should: [],
        must_not: []
      }
    }
  }
})
