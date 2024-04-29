const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')
const subscriber = require('../models/subscriber')

// // Getting All Test
// router.get('/', (req, res) => {
//     res.send("Hello World")
// })

// Getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

// Getting One
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
})
// creating one 
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})
// Updating One
router.patch('/:id', getSubscriber, async (req, res) => {
    // req.set('Hello world')
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)

    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
})
// Deleting One
router.delete('/:id', getSubscriber, async (req, res) => {
    // req.set('Hello world')
    try {
        await res.subscriber.remove()
        res.status(404).json({
            message: 'Deleted subscriber'
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})

async function getSubscriber(req, res, next) {
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({
                message: 'Cannot find subscriber'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
    res.subscriber = subscriber
    next()
}


module.exports = router