import jwt from "jsonwebtoken";

const authMiddleware = async (req,res,next)=>{
     const {token} =req.headers;
     if(!token){
        return res.json({success: false,message:"Not authorized"})
     }
     try {
        const decode= jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = decode.id;
        next();
     } catch (error) {
      if (error.name === 'TokenExpiredError') {
         return res.status(401).json({ success: false, message: 'Token expired' });
     }
        res.status(401).json({success: false,message:"Invalid token!"})
     }
}

export default authMiddleware;