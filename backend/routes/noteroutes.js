import mongoose from "mongoose";
import express from "express"
import notes from "../model/notes.js"
import { verifyToken } from "../middleware/middleware.js";

let routes = express.Router()

routes.post('/send', verifyToken, async(req,res)=> {
    let {notesVal} = req.body

    try {
        let saveD = new notes({
            userId: req.userid, 
            data: notesVal
        })

        let datoo = await saveD.save()
        res.status(200).json({success:true,message:datoo})
    } catch(err){
        res.status(500).json({success:false,message:"server error"})
    }
})

routes.get('/get',verifyToken, async(req,res)=> {

    try {
        let data = await notes.find({userId: req.userid })
        res.status(200).json({success:true,message:data})
    } catch(err){
        res.status(500).json({success:false,message:"server error"})
    }
})

routes.get('/get/:id',verifyToken, async(req,res)=> {

    let {id} = req.params
    try{
        let data = await notes.find({_id:id})
        res.status(200).json({success:true,message:data})
    } catch(err){
        res.status(500).json({success:false,message:"server error"})
    }

})

routes.put('/update/:id',verifyToken, async(req,res)=> {
    let {data,label} = req.body
    let {id}  = req.params
    try{
        let updateData = await notes.findOneAndUpdate({_id:id},{data,label})
        res.status(200).json({success:true,message:updateData})
    }catch(err){
        res.status(500).json({success:false,message:"server error"})
    }
})

routes.delete('/delete/:id', verifyToken, async(req,res)=> {
    let {id}  = req.params
    try {
        let deletenote = await notes.findOneAndDelete({_id:id})
        res.status(200).json({success:true,message:deletenote})
    }catch(err){
        res.status(500).json({success:false,message:"server error"})
    }
})


routes.get('/label',verifyToken,async(req,res)=> {
    let {label} = req.query
    try{
        let shownote = await notes.find({userId: req.userid,label:label})
        res.status(200).json({success:true,message:shownote})
    }catch(err){
        res.status(500).json({success:false,message:"server error"})
    }
})

export default routes