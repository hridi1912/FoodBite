import express from "express"
import { addGadget,listgadget ,removeGadget} from "../controllers/gadgetController.js"
 import multer from "multer"

const gadgetRouter= express.Router();

//image storage engine
 const storage= multer.diskStorage({
     destination: "uploads",
     filename :(req,file,cb)=>{
         return cb(null,`${Date.now()}${file.originalname}`)
     }
 })

 const upload = multer({storage:storage})

gadgetRouter.post("/add",upload.single("image"),addGadget)
gadgetRouter.get("/list",listgadget)
gadgetRouter.post("/remove",removeGadget)



export default gadgetRouter;