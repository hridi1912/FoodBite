import userModel from "../models/userModel.js";

const addToCart= async(req,res)=>{
  try {
    let userData =await userModel.findOne({_id:req.body.userId});
    let cartData =await userData.cartData;
    if(!cartData[req.body.itemId]){
    cartData[req.body.itemId]= 1;
    }
    else{
        cartData[req.body.itemId]+=1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"Added to cart"})
  } catch (error) {
    console.log(error);
    res.json({success: false,message:"ERROR!"})
  }
}

//remove items from user cart
const removeCart = async(req,res) =>{

}
//fetch cart data
const getCart = async(req,res)=>{

} 
export {addToCart, removeCart, getCart}