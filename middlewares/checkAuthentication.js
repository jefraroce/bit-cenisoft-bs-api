const { checkAuthentication } = require('../utils/jwt')

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization

  if (authorization && checkAuthentication(authorization)) {
    next()
  } else {
    res.status(401).send({ msg: 'Must be authenticated to continue.' })
  }
}
