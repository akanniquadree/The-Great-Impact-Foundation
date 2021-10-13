import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import router from "./Backend/routes/userRoute/auth.js";
import userRouter from "./Backend/routes/userRoute/userRoute.js";
import postRouter from "./Backend/routes/blogRoute/postsRoute.js";
import categoryRoute from "./Backend/routes/blogRoute/categoriesRoute.js";
import teamRoute from "./Backend/routes/teamRoute/team.js";
import volunteeRouter from "./Backend/routes/volunteeRoute/volunteeRoute.js";
import sponsorRouter from "./Backend/routes/sponsorRoute/sponsorRoute.js";
import eventRouter from "./Backend/routes/eventRoute/eventRoute.js";
import projectRouter from "./Backend/routes/projectRoute/projectRoute.js";
import galleryRouter from "./Backend/routes/galleryRoute/galleryRoute.js";
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


 app.use(express.static(path.join(__dirname, "frontend", "build")))

 app.get("*", (req, res) => {
     res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
 });



app.listen(process.env.PORT || "5000", ()=>{
    console.log("backend is running effective")
})