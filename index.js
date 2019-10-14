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

app.get('/routes/:routeId', (req, res) => {
  routes.findOne(routeId)
    .then(route => res.send(route))
})

app.listen( 8000, () => console.log(`Server is listening on port 8000`))
module.exports = app;