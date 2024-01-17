import express from 'express'
import { PORT, mongoDbUrl } from './config.js'
import mongoose from 'mongoose'
import { Visiter } from './models/visitData.js'
import { getLocationFromIp } from './util.js'
import cors from 'cors'

const app = express()
app.use(express.json())

app.use(cors())

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  return res.status(200).send('Welcom to yichao`s portfolio backend.')
})

app.get('/getVisitCount', async (req, res) => {
  try {
    const arr = await Visiter.find({})
    return res.status(200).send({ count: arr.length })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

app.get('/getVisitList', async (req, res) => {
  try {
    const arr = await Visiter.find({})
    return res.status(200).send({ arr })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

app.post('/createVisit', async (req, res) => {
  try {
    // const locationData = await getLocationFromIp('112.10.178.243')
    const location = await getLocationFromIp(req.ip)
    if (location) {
      const visiter = await Visiter.create({
        location,
        ip: req.ip,
        date: new Date(),
        device: req.body.device,
      })
      return res.status(200).send(visiter)
    }
    return res
      .status(500)
      .send({ message: `Can not get location from ip: ${req.ip}` })
  } catch (err) {
    console.log(err.message)
    res.status(500).send({ message: err.message })
  }
})

mongoose
  .connect(mongoDbUrl)
  .then(() => {
    console.log('App connected to database')
    app.listen(PORT, async () => {
      console.log(`App is listening to port: ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(err)
  })


export default app