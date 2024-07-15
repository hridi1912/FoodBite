import gadgetModel from "../models/gadgetModel.js";

// import fs from 'fs'

const addGadget =async(req,res) => {
  
    let image_filename= `${req.file.filename}` ;

    const gadget =new gadgetModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        catagory: req.body.catagory,
        image:image_filename
    })
    try{
       await gadget.save();
       res.json({success:true,message:"Item added"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})

    }
}
//all gadgets list
const listgadget =async(req,res)=>{
    try {
        const gadgets= await gadgetModel.find({});
        res.json({success:true,data:gadgets})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error})
    }
}

export {addGadget,listgadget};