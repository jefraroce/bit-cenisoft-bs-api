const { currentClient } = require('../utils/jwt')

module.exports = (req, res, next) => {
  const clientId = req.params.id || req.params.client_id
  if (clientId && clientId === currentClient(req.headers.authorization).id) {
    next()
  } else {
    res.status(403).send({ msg: 'Action not allowed.' })
  }
}
