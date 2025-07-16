
const express = require('express')

const router = express.Router()
const authorizeRole = require('../middleware/roleMiddleware')
const verifyToken = require('../middleware/authMiddleware')

router.get('/admin', verifyToken, authorizeRole('admin'), (req, res) => {
    res.json({ message: 'Admin access granted' })
})


router.get('/manager',verifyToken, authorizeRole('manager','admin'), (req, res) => {
    res.json({ message: 'Manager access granted' })
})


router.get('/user',verifyToken, authorizeRole('manager','admin','user'), (req, res) => {
    res.json({ message: 'User access granted' })
})



module.exports = router;