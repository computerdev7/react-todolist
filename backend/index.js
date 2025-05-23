import express from "express"
import dotenv from "dotenv"
import { connectTo } from "./database/dbconnect.js";
import router from "./routes/authroutes.js";
import cors from "cors"
import noterouter from "./routes/noteroutes.js";
import labelroutes from "./routes/labelroutes.js"

let app = express();

dotenv.config();

app.use(cors());

app.use(express.json())

let PORT = process.env.PORT || 5000;

app.use('/auth/api',router)

app.use('/note',noterouter)

app.use('/label',labelroutes)

app.listen(PORT,()=> {
    connectTo()
    console.log('server running')
})