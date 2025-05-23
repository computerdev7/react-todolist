import jwt from "jsonwebtoken"

export const verifyToken = (req,res,next) => {
    let token = req.headers.authorization;

    if(!token){
        return res.status(403).json({success:false,message:"Access denied"})
    }
    
    try {
        token = token.split(" ")[1];
        let decode = jwt.verify(token,process.env.SECRET_KEY);
        req.userid = decode.userId;
        next();
    }catch(err){
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
}