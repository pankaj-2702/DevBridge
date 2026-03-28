const Proposal = require('../model/proposal')
const { findOneAndUpdate } = require('../model/user')
const {NotFoundError} = require('../errors/index')
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

const updateProposals = async (req, res)=>{
    const {id} = req.params
    const {coverLetter ,bidAmount }  = req.body
    req.body.developerId =req.user.userI ;
    
    

    const proposals = await Proposal.findOneAndUpdate({_id : id, developerId: req.user.userId , status : 'PENDING'},
                                                      req.body,
                                                     {returnDocument : 'after' , runValidators: true})

               if(!proposals){
                    throw new NotFoundError('No Proposal is found');
               }                                                 
             
                 res.status(200).json({proposals})                                         
}

const withdrawProposal = async (req, res)=>{
   const {id} = req.params

   const proposal = await Proposal.findOneAndDelete({_id : id , developerId : req.user.userId})
     if(!proposal){
                    throw new NotFoundError('No Proposal is found');
               }                                                 
             
                 res.status(200).send('Successful DELETE the Porposal') 

}
const myProposals = async (req, res)=>{
   
   const proposals = await Proposal.find({ developerId : req.user.userId})
     if(!proposals){
                    throw new NotFoundError('No Proposal is found');
               }                                                 
             
                 res.status(200).json({proposals}) 

}

module.exports = {
    createProposal,
    getProposal,
    updateProposals,
    withdrawProposal,
    myProposals
}