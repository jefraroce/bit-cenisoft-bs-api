const express = require('express')
const router = express.Router()
const { authClient, createClient, deleteClient, getClient, getClients, updateClient } = require('./actions')
const saleRoutes = require('../sale/routes')
const checkAuthentication = require('../../middlewares/checkAuthentication')
const checkAuthorization = require('../../middlewares/checkAuthorization')

// GET all
router.get('/', getClients)

// GET by ID
router.get('/:id', checkAuthentication, checkAuthorization, getClient)

// POST Create a Client
router.post('/', createClient)

// PUT Update Client's info
router.put('/:id', checkAuthentication, checkAuthorization, updateClient)

// DELETE by ID
router.delete('/:id', checkAuthentication, checkAuthorization, deleteClient)

// POST Authenticate
router.post('/auth', authClient)

// Implementing sales routes
router.use('/:client_id/sales', checkAuthentication, checkAuthorization, saleRoutes)

module.exports = router
