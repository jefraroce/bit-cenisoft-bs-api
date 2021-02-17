const Dropbox = require('dropbox')
const { DROPBOX_TOKEN } = require('../config')

const ACCESS_TOKEN = DROPBOX_TOKEN

const dropbox = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN })

module.exports = dropbox
