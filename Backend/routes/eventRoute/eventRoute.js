import express from "express";
import Event from "../../model/EventModel/eventModel.js";


const eventRouter = express.Router()


eventRouter.get("/", async(req, res)=>{
    const event = await Event.find({})
    res.send(event)
})

eventRouter.get("/:id", async(req, res)=>{
        const EventId = req.params.id
        try {
            const getEvent = await Event.findById({_id:EventId})
            if(getEvent){
                res.send(getEvent)
            }else{
                res.status(401).send("The Event does not exist")
            }
       } catch (error) {
            res.status(500).send({msg: error.msg})
        }
})

eventRouter.post("/", async(req, res)=>{
    try {
        const newEvent = new Event({
            image: req.body.image,
            heading: req.body.heading,
            date: req.body.date,
            month: req.body.month,
            loc: req.body.loc,
            text1: req.body.text1,
            text2: req.body.text2 ,
            require: req.body.require,
            starTime:req.body.starTime ,
            phone: req.body.phone ,
        })
        const saveEvent = await newEvent.save()
        if(savedEvent){
            res.status(200).send({msg: "Event Successfully Created"})
        }else{
            res.status(401).send({msg: "Error in creating event"})
        }
    } catch (error) {
        res.status(500).send({msg: error.msg})
    }
})

eventRouter.delete("/:id", async(req, res)=>{
    try {
        const getEvent = await Event.findById(req.body.id)
        if(getEvent){
            await getEvent.remove();
            res.send("Event Successfully Deleted")
        }else{
            res.status(401).send({msg: "Error in deleting Event"})
        }
    } catch (error) {
        res.status(500).send({msg: error.msg})
    }
})



export default eventRouter;