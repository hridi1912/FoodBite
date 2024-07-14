import mongoose from "mongoose";
const gadgetSchema = new mongoose.Schema({
    name: {type:String,required : true},
    description : {type: String, required:true},
    price :{type:Number, required:true},
    image:{type:String,required:true},
    catagory:{type:String,required:true}
})

const gadgetModel = mongoose.models.gadget || mongoose.model("gadget",gadgetSchema);

export default gadgetModel;