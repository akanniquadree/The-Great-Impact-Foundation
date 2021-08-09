import express from "express"
import Sponsor from "../../model/SponsorModel/sponsorModel.js"

const sponsorRouter = express.Router()

sponsorRouter.get("/", async(req, res)=>{
    const sponsor = await Sponsor.find({})
        res.status(200).send(sponsor)
})

sponsorRouter.post("/", async(req, res)=>{
    
    try {
       const getSponsor = new Sponsor({
        name: req.body.name,
        image: req.body.image,
        loc:req.body.loc,
        desc: req.body.desc
    })
    const newSponsor = await getSponsor.save() 
    if(newSponsor){
        res.status(200).send(newSponsor)
    }
    res.status(500).send({msg: "Fail to Create Sponsor"})
    } catch (error) {
        res.status(400).send({msg: error.msg})
    }
})

sponsorRouter.put("/:id", async(req, res)=>{
   
    try { 
        const sponsorId = req.params.id;
        const getSponsor = await Sponsor.findById({_id:sponsorId})
        if(getSponsor){
            getSponspor.name = req.body.name;
            getSponspor.image = req.body.image;
            getSponspor.loc = req.body.loc;
            getSponspor.desc = req.body.desc;

            const saveSponsor = await getSponsor.save()
            if (saveSponsor){
                res.status(200).send(saveSponsor)
            }
            res.status(500).send({msg: 'Error in saving Sponsor'})
        }
        res.status(500).send({msg: 'Error in updating Sponsor'})
    } catch (error) {
        res.status(400).send({msg: error.msg})
    }
})

sponsorRouter.delete("/:id", async(req, res)=>{
    try {
        const getSponsor = await Sponsor.findById(req.body.id)
        if(getSponsor){
           await getSponsor.remove()
            res.status(200).send({msg: "Sponsor Deleted"})
        }
        res.status(500).send({msg:"Error in deleting Sponsor"})
    } catch (error) {
        res.status(400).send({msg: error.msg})
    }
})


export default sponsorRouter