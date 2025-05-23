import mongoose from "mongoose";

let newNotesSch = new mongoose.Schema({
    userId :{
        type: String
    },
    data:{
        type: String
    },
    label:{
        type: String,
        required:false
    }
})

let NoteSch = mongoose.model('NoteSch',newNotesSch)

export default NoteSch