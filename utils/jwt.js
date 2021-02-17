const jwt = require('jwt-simple')
const { DateTime } = require('luxon')
const { SECRET } = require('../config')

const generateToken = (client) => {
  const payload = {
    id: client._id,
    name: client.name,
    expirationDate : DateTime.now().plus({ days: 7 }).toSeconds()
  }

  return jwt.encode(payload, SECRET)
}

const currentClient = (authorization) => {
  const token = getToken(authorization)
  if (token) {
    try {
      return jwt.decode(token, SECRET)
    } catch (error) {
      console.error('Error getting current client info: ', error)
    }
  }

  return {}
}

const getToken = (authorization) => {
  return authorization.split(' ')[1]
}

const checkAuthentication = (authorization) => {
  const token = getToken(authorization)
  if (token) {
    try {
      const payload = jwt.decode(token, SECRET)
      if (payload.expirationDate < DateTime.now().toSeconds()) {
        console.error('Token has expired')
        return false
      }
      return true
    } catch (error) {
      console.error('Error checking authorization: ', error)
    }
  }

  return false
}

module.exports = { currentClient, generateToken, checkAuthentication }
