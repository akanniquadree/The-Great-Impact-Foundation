import express from "express"
import dotenv from "dotenv"
import config from "./config.js";
import mongoose from "mongoose"
import multer from "multer";
import router from "./routes/userRoute/auth.js";
import userRouter from "./routes/userRoute/userRoute.js";
import postRouter from "./routes/blogRoute/postsRoute.js";
import categoryRoute from "./routes/blogRoute/categoriesRoute.js";
import teamRoute from "./routes/teamRoute/team.js";
import volunteeRouter from "./routes/volunteeRoute/volunteeRoute.js";
import sponsorRouter from "./routes/sponsorRoute/sponsorRoute.js";
import eventRouter from "./routes/eventRoute/eventRoute.js";
import projectRouter from "./routes/projectRoute/projectRoute.js";
import galleryRouter from "./routes/galleryRoute/galleryRoute.js";
import path from "path"
import cors from "cors"


const __dirname = path.resolve();

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json({limit: "25mb"}));
app.use(express.urlencoded({limit: "25mb", extended: true, parameterLimit:50000}));


// const mongodb_url = config.MONGODB_URL
mongoose.connect("mongodb+srv://GIF1234:youngdollar@great-impact-foundation.6itwq.mongodb.net/GIF?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).catch(error=> console.log(error.reason));



app.use("/uploads", express.static('upload'));
app.use("/api/auth", router);
 app.use("/api/user", userRouter);
 app.use("/api/posts", postRouter);
 app.use("/api/category", categoryRoute);
 app.use("/api/team", teamRoute);
 app.use("/api/volunteer", volunteeRouter);
 app.use("/api/sponsor", sponsorRouter);
 app.use("/api/event", eventRouter);
 app.use("/api/project", projectRouter);
 app.use("/api/gallery", galleryRouter);
 
 if(process.env.NODE_ENV === 'production'){
     app.use(express.static(path.resolve(__dirname, "./frontend/build")))

     app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"))
     })
 }





app.listen(process.env.PORT || "5000", ()=>{
    console.log("backend is running effectively")
})