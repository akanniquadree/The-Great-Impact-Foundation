import express from "express"
import dotenv from "dotenv"
import config from "./config.js";
import mongoose from "mongoose"
import multer from "multer";
import router from "./routes/userRoute/auth.js";
import userRouter from "./routes/userRoute/userRoute.js";
import postRouter from "./routes/blogRoute/postsRoute.js";
import categoryRoute from "./routes/blogRoute/categoriesRoute.js";


dotenv.config()
const app = express();
app.use(express.urlencoded({extended:true}))
const mongodb_url = config.MONGODB_URL
mongoose.connect("mongodb+srv://GIF1234:youngdollar@great-impact-foundation.6itwq.mongodb.net/GIF?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).catch(error=> console.log(error.reason));

 const storage = multer.diskStorage({
     destination: (req, file, cb)=>{
         cb(null, "images");
     }, 
     filename: (req, file, cb)=>{
         cb(null, req.body.name)
     }
 })

 const upload = multer({storage:storage})
 app.post("/api/upload", upload.single("file"), (req, res)=>{
     res.status(200).send("File has been uploaded")
 })


app.use("/api/auth", router);
 app.use("/api/user", userRouter);
 app.use("/api/posts", postRouter);
 app.use("/api/category", categoryRoute);
 







app.listen("5000", ()=>{
    console.log("backend is running effectively")
})