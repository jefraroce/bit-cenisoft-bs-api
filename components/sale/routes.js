const express = require('express')
const router = express.Router()
const { createSale, deleteSale, getSale, getSales, updateSale } = require('./actions')

// GET all
router.get('/', getSales)

// GET by ID
router.get('/:id', getSale)

// POST Create a Sale
router.post('/', createSale)

// PUT Update Sale's info
router.put('/:id', updateSale)

// DELETE by ID
router.delete('/:id', deleteSale)

module.exports = router
