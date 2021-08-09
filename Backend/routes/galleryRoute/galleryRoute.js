import Gallery from "../../model/GalleryModel/galleryModel"
import express from expresss

const galleryRouter = express.Router()


galleryRouter.get("/", async(req, res)=>{
    const gallery = await Gallery.find({})
    res.send(gallery)
})


galleryRouter.post("/", async(req, res)=>{
    try {
       const newGallery = new Gallery({
        img1 = req.body.img1,
        img2 = req.body.img2
        })
        const savedGallery = await newGallery.save()
        if(savedGallery){
        res.status(200).send(savedGallery)
        }
            res.status(500).send({msg: "Error In Saving Picture"}) 
    } catch (error) {
        res.status(400).send({msg:error.msg})
    }
    
})

galleryRouter.delete("/:id", async(req, res)=>{
    
    try {
        const getGallery = await Gallery.findById(req.body.id)
        if(getGallery){
            const deleteGallery  = await getGallery.remove()
                if(deleteGallery){
                    res.send({msg: "Delete Successful"})
                }
                    res.send({msg: "error in deleting"})
        }
       
    } catch (error) {
        res.status(400).send({msg:error.msg})
    }
})