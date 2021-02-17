const { Client, PROJECTION } = require('./model')
const bcrypt = require('bcryptjs')
const { currentClient, generateToken } = require('../../utils/jwt')

const authClient = (req, res) => {
  Client.findOne({ email: req.body.email }, (error, client) => {
    if (error) {
      res.status(422).send(error)
    } else if (client && bcrypt.compareSync(req.body.password, client.password)) { // Si el cliente es encontrado, debemos construir y devolver la llave (JWT)
      res.send({ jwt: generateToken(client) })
    } else { // Cuando el cliente esta vacio, es decir, cuando no se encontró
      res.status(401).send({ msg: 'Invalid email or password' })
    }
  })
}

const createClient = (req, res) => {
  // Encriptación de la contraseña
  req.body.password = bcrypt.hashSync(req.body.password)

  const newClient = new Client(req.body)
  newClient.save((error, clientSaved) => {
    if (error) {
      res.status(422).send(error)
    } else {
      // Pasos necesarios para no devolver el campo password
      let client = clientSaved.toObject()
      delete client.password

      res.status(201).send(client)
    }
  })
}

const deleteClient = (req, res) => {
  Client.findByIdAndDelete(req.params.id, (error, result) => {
    if (error) {
      res.status(422).send(error)
    } else {
      res.status(204)
    }
  })
}

const getClient = (req, res) => {
  Client.findById(req.params.id, PROJECTION, (error, client) => {
    if (error) {
      res.status(404).send(error)
    } else {
      res.send(client)
    }
  })
}

const getClients = (req, res) => {
  let query = req.query
  if (req.query.name) {
    query = { name: new RegExp(`.*${req.query.name}.*`, 'i') }
  }

  Client.find(query, PROJECTION, (error, clients) => {
    if (error) {
      res.status(404).send(error)
    } else {
      res.send(clients)
    }
  })
}

const updateClient = (req, res) => {
  if (req.body.password) {
    // Encriptación de la contraseña
    req.body.password = bcrypt.hashSync(req.body.password)
  }

  Client.updateOne({ _id: req.params.id }, req.body, (error, result) => {
    if (error) {
      res.status(422).send(error)
    } else {
      res.send(result)
    }
  })
}

module.exports = { authClient, createClient, deleteClient, getClient, getClients, updateClient }
