import mongoose from "mongoose";

let labSchema = new mongoose.Schema({
    userid : {
        type:String
    },
    labdata : {
        type:String
    }
})

let label = mongoose.model('label',labSchema)

export default label