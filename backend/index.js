import express from "express"
import dotenv from "dotenv"
import { connectTo } from "./database/dbconnect.js";
import router from "./routes/authroutes.js";
import cors from "cors"
import noterouter from "./routes/noteroutes.js";
import labelroutes from "./routes/labelroutes.js"
import path from "path"

let app = express();

dotenv.config();

app.use(cors());

app.use(express.json())

let PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use('/auth/api',router)

app.use('/note',noterouter)

app.use('/label',labelroutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")))

    app.get("*",(req,res)=> {
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    })
}


app.listen(PORT,()=> {
    connectTo()
    console.log('server running')
})