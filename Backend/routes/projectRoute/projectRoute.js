import express from "express"
import Project from "../../model/ProjectModel/projectModel.js"


const projectRouter = express.Router()


projectRouter.get("/", async(req, res)=>{
    const projects = await Project.find({})
    re.send(projects)
})


projectRouter.get("/:id", async(req, res)=>{
    const projectId = req.params.id
    try {
        const project = await Project.findById({_id:projectId})
        if(project){
            res.send(project)
        }else{
            res.status(401).send({msg: "Project does not exist"})
        }
    } catch (error) {
        res.status(500).send({msg: error.msg})
    }
})

projectRouter.post("/", async(req, res)=>{
    try {
        const newProject = new Project({
            image: req.body.image,
            heading: req.body.heading,
            desc: req.body.desc,
            goal: req.body.goal,
            raised: req.body.raised
        })
        const savedProject = await newProject.save()
        if(savedProject){
            res.status(200).send(savedProject)
        }else{
            res.send(401).send({msg: "Error in saving Project"})
        }
    } catch (error) {
        res.status(500).send({msg: error.msg})
    }
})

projectRouter.put("/:id", async(req, res)=>{
    try {
        const getProject = await Project.findById(req.params.id)
        if(getProject){
            getProject.image = req.body.image
            getProject.heading = req.body.heading
            getProject.desc = req.body.desc
            getProject.goal = req.body.goal
            getProject.raised = req.body.raised

            const saveProjects = await getProject.save() 
            if(saveProjects){
                res.status(200).send({msg: "Project is Updated Successfully"})
            }else{
                res.status(401).send({msg: "Error in updating Project"})
            }
        }
    } catch (error) {
        res.status(500).send({msg: error.msg})
    }
})

projectRouter.delete("/:id", async(req, res)=>{
    try {
        const projectId = req.params.id
        const getProject = await Project.findById({_id:projectId})
        if(getProject){
            const deleteProject = await getProject.remove()
            res.send({msg: "Project is Deleted"})
        }else{
            res.status(401).send({msg: "Error in deleting Project"})
        }
        
    } catch (error) {
        res.status(500).send({msg: error.msg})
    }
})


export default projectRouter;