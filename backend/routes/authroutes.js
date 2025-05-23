import express from "express"
import auth from "../model/authmodel.js"
import bcrptjs from "bcryptjs"
import jwt from "jsonwebtoken"

let router = express.Router()

router.post('/signup', async(req,res)=> {
    try{
        let {username,password,confirmPassword,name} = req.body

        const data = await auth.find({username:username})

        let salt = await bcrptjs.genSalt(10);

        if( !username || !password || !name){
            
            res.status(400).json({success:false,message:'authentication detail incomplete'})
        }else if(password!==confirmPassword){
            res.status(400).json({success:false,message:'confirm passwords and password not matched'})
        }else if(data.length>0){
            res.status(400).json({success:false,message:'username taken'})
        } else {
            
            let hashPass = await bcrptjs.hash(password,salt);

            const insert =  new auth({
                username,
                password : hashPass,
                name
            })
    
            const insertdata = await insert.save()
    
            res.status(200).json({success:true,message:'successfully received signup info',insertdata})
        }
        

    }catch(err){
        console.log('error in receving data')
        res.status(500).json({success:false,message:'unsuccessfully in receving signup info'})
    }
})


router.post('/login',async(req,res)=> {

    let {username,password} = req.body
    
try {

    let data = await auth.find({username:username})

    let comppass = await bcrptjs.compare( password , data[0].password )


    if(comppass){
        let token =jwt.sign({userId: data[0]._id},process.env.SECRET_KEY,{expiresIn: '1h'});
        res.status(200).json({success:true,message:'successfully received login info',token,data})
    }else {
        res.status(400).json({success:false,message:'password not matched'})
    }
}catch(err){
    res.status(500).json({success:false,message:'server error'})
}
})

export default router;