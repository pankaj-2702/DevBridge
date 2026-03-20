const {createProposal , getProposal} = require('../controller/proposal')

const authentication = require('../middleware/authentication')
const authorise = require('../middleware/authorize')

const Route = require('express').Router()

Route.route('/').get(authentication, authorise('client'),getProposal)
Route.route('/:id').post(authentication,authorise('developer'),createProposal)

module.exports = Route