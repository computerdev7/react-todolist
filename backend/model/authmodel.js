import mongoose from "mongoose"

let authSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    }
})

const auth = mongoose.model('auth',authSchema)
export default auth 