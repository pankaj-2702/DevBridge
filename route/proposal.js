const {createProposal , getProposal, updateProposals , withdrawProposal, myProposals} = require('../controller/proposal')
const { acceptProposal} = require('../controller/proposalaccept')
const authentication = require('../middleware/authentication')
const authorise = require('../middleware/authorize')

const Route = require('express').Router()

Route.route('/').get(authentication, authorise('client'),getProposal)
Route.route('/:id').post(authentication,authorise('developer'),createProposal)
                    .patch(authentication,authorise('developer'),updateProposals)
                    .delete(authentication,authorise('developer'),withdrawProposal)

Route.route( '/:id/accept').post(authentication,authorise('client'),acceptProposal)
 Route.route('/me').get(authentication, authorise('developer'),myProposals)
module.exports = Route