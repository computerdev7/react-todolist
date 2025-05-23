import express from 'express'
import label from '../model/labelmodel.js'
import { verifyToken } from '../middleware/middleware.js'

let route = express.Router()

route.post('/send', verifyToken, async (req, res) => {
    let { labdata } = req.body
    try {
        let data = new label({
            userid: req.userid,
            labdata
        })
        let realdata = data.save()
        res.status(200).json({ success: true, message: realdata })
    } catch (err) {
        res.status(500).json({ success: false, message: 'server error ' })
    }
})

route.get('/get', verifyToken, async (req, res) => {
    try {
        let data = await label.find({ userid: req.userid })
        res.status(200).json({ success: true, message: data })
    } catch (err) {
        res.status(500).json({ success: false, message: 'server error ' })
    }
})


route.delete('/delete/:id',verifyToken, async (req,res) => {
    let {id} = req.params
    try{
        let data = await label.findByIdAndDelete({_id:id})
        res.status(200).json({ success: true, message: data }) 
    }catch(err) {
        res.status(500).json({ success: false, message: 'server error ' })
    }
})

route.put('/update/:id',verifyToken, async (req,res) => {
    let {value} = req.body
    let {id} = req.params
    try{
        let data = await label.findOneAndUpdate({_id:id},{labdata:value})
        res.status(200).json({ success: true, message: data }) 
    }catch(err){
        res.status(500).json({ success: false, message: 'server error ' })
    }
})
export default route