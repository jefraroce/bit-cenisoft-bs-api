/**
 * Para poder utilizar este middleware deben crear una APP en Dropbox y conseguir un token de autenticación
 * Enlace: https://www.dropbox.com/developers/apps/create
 */
const dropbox = require('../utils/dropbox')
const fs = require('fs').promises

module.exports = (req, res, next) => {
  if (req.file) {
    const parts = req.file.originalname.split('.')
    const extension = parts[parts.length - 1]

    const localpath = `./${req.file.destination}${req.file.filename}`
    const path = `/${req.file.filename}.${extension}`

    fs.readFile(localpath)
      .then((contents) => {
        dropbox.filesUpload({path: path, contents: contents})
          .then((response) => {
            dropbox.sharingCreateSharedLinkWithSettings({path: path, settings: { requested_visibility: 'public', audience: 'public', access: 'viewer' }})
            .then((response) => {
              req.body.cover = response.result.url.replace('www.', 'dl.')
              next()
            })
            .catch((error) => {
              console.error('Error creating shared link: ', error)
            })

            fs.unlink(localpath) // delete local file
          })
          .catch((error) => {
            console.error('Error uploading file: ', error)
          })
      })
      .catch((error) => {
        console.error('Error reading local file: ', error)
      })
  } else {
    next()
  }
}
