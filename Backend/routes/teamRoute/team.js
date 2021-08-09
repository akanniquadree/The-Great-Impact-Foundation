import express from "express"
import Team from "../../model/TeamModel/teamModel.js"


const teamRoute = express.Router()

teamRoute.get("/", async(req, res)=>{
    const team = await Team.find({})
    res.send(team)
})

teamRoute.post("/", async(req, res)=>{
    const newTeam = new Team({
        image: req.body.image,
        name: req.body.name,
        post: req.body.post,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        instagram: req.body.instagram
    })
    const saveTeam = await newTeam.save()
    if(newTeam){
        return res.status(201).send({msg: "New Team member uploaded", data: newTeam})
    }
    return res.status(500).send({message: "Error in creating team member"})
})

teamRoute.put("/:id", async(req, res)=>{
    try {
        const TeamId = req.params.id;
        const getTeam = await Team.findById({_id:TeamId})
        if(getTeam){
            getTeam.image= req.body.image;
            getTeam.name= req.body.name;
            getTeam.post= req.body.post;
            getTeam.facebook= req.body.facebook,
            getTeam.twitter= req.body.twitter,
            getTeam.instagram= req.body.instagram
            const updatedTeam = await getTeam.save();
            if(updatedTeam){
                return res.status(200).send({message: "Team member Updated", data: updatedTeam})
            }
    }
        return res.status(500).send({message: "Error in updating Team member"})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

teamRoute.delete("/:id", async(req, res)=>{
    const deleteTeam = await Team.findById(req.body.id)
    if(deleteTeam){
        await deleteTeam.remove()
        res.send({message: "Product Deleted"})
    }
    res.status(400).send({message: "Error in deleting Team member"})
})



export default teamRoute;