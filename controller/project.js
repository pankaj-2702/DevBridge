
const Project = require('../model/project')
const {BadRequest , NotFoundError} = require('../errors/index')

//create Project
const createProject = async (req,res) =>{
    const { title , description ,budget } = req.body

     if(title=='' || description=='' || !budget || budget==0){
          throw new BadRequest('Please provide the Vaild INFO!')
      }
     req.body.clientId = req.user.userId

    const project = await Project.create(req.body)

    res.status(201).json({project})
}

// get ALL Project
const getAllProjects = async (req,res) =>{

    const projects = await Project.find({status : 'OPEN'})

    res.status(200).json({projects})
}

const getProject = async (req,res) =>{
    const {id} = req.params
    console.log(id)
    const project = await Project.findOne({_id : id})
  if(!project){
   new NotFoundError('No Project is found');
  }
    res.status(200).json({project})
}

const updateProject = async (req,res) =>{
    const {id} = req.params
    const { title , description ,budget } = req.body
     if(title=='' || description=='' || !budget || budget==0){
          throw new BadRequest('Please provide the Vaild INFO!')
      }
    const project = await Project.findOneAndUpdate({_id : id, clientId : req.user.userId},
                                                     req.body,
                                                     {returnDocument : 'after' , runValidators: true})
     if(!project){
    NotFoundError('No Project is found');
  }                                                 

    res.status(200).json({project})
}

const deleteProject = async (req,res) =>{
    const {id} = req.params
    const project = await Project.findOneAndDelete({_id : id,clientId : req.user.userId})

    
    res.status(200).send("Success")
}

module.exports ={
    createProject,
    getAllProjects,
    getProject,
    updateProject,
    deleteProject
}