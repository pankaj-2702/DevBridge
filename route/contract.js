const { acceptProposal} = require('../controller/proposalaccept')
const authentication = require('../middleware/authentication')
const authorise = require('../middleware/authorize')

const Route = require('express').Router()

Route.route( '/:id/accept').post(authentication,authorise('client'),acceptProposal)

module.exports = Route