import express from 'express'
import cors from 'cors'
const db = require('monk')('localhost/14ers-db')

const app = express()

app.use(cors())

const peaks = db.get('peaks')
const trailheads = db.get('trailheads')
const routes = db.get('routes')

app.get('/peaks/:pkKey', (req, res) => {
  Promise.all([
    routes.find({}),
    trailheads.find({})
  ]).then(([routes, trailheads]) => {
    const peakRoutes = routes.filter(({ peakKeys }) => peakKeys.includes(req.params.pkKey))
    const peakTrailheads = trailheads.filter(({ pkKeys }) => {
      if (pkKeys){
        if (pkKeys.includes(req.params.pkKey)) return true
      } else {
        return false
      }
    })
    res.send({peakRoutes, peakTrailheads})
  })
})

app.get('/routes/:_id', (req, res) => {
  routes.findOne(req.params._id)
    .then(route => res.send(route))
    .catch(err => console.log(err))
})

app.get('/trailheads/:_id', (req, res) => {
  trailheads.findOne(req.params._id)
    .then(trailhead => {
      peaks.find({})
        .then(peaks => peaks.filter(peak => trailhead.pkKeys.includes(peak.pkKey)))
        .then(peaks => res.send({trailhead, peaks}))
    })
})

app.listen( 8000, () => console.log(`Server is listening on port 8000`))
module.exports = app;