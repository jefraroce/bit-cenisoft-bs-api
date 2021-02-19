const express = require('express')
const router = express.Router()
const multer = require('multer')
const coverUploader = multer({ dest: 'covers/' })
const setCover = require('../../middlewares/setCover')
const { createBook, deleteBook, getBook, getBooks, updateBook } = require('./actions')

// GET all
router.get('/', getBooks)

// GET by ID
router.get('/:id', getBook)

// POST Create a Book
router.post('/', coverUploader.single('cover'), setCover, createBook)

// PUT Update Book's info
router.put('/:id', coverUploader.single('cover'), setCover, updateBook)

// DELETE by ID
router.delete('/:id', deleteBook)

module.exports = router
