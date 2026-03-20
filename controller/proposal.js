const Proposal = require('../model/proposal')

const createProposal = async (req, res)=>{
    const {id} = req.params
    req.body.developerId = req.user.userId
    req.body.projectId = id
    const proposal = await Proposal.create(req.body)

    res.status(201).json({message : 'Created', proposal})
}

const getProposal = async (req,res)=>{
   const{id} = req.params
  console.log(id)

   const proposal = await Proposal.find({projectId : id})

   res.status(200).json({proposal})

}

module.exports = {
    createProposal,
    getProposal
}