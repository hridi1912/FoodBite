import React, {  useState } from 'react'
import './AddProduct.css' 
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
const AddProduct = ({url}) => {


    
    const [image,setImage]=useState(false);
    const [data,setData] = useState({
        name:"",
        description: "",
        price : "",
        catagory: "Nokia"
    })
    const onChangeHandler =(event)=>{
        const name= event.target.name;
        const value= event.target.value;
        setData(data=>({...data,[name]:value}))
    }
    const onSubmitHandler =async(event)=>{
        event.preventDefault();
        const formData =new FormData();
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("price",Number(data.price));
        formData.append("catagory",data.catagory);
        formData.append("image",image);
        const response = await axios.post(`${url}/api/gadget/add`,formData)
        if(response.data.success){
            setData({
                name:"",
                description: "",
                price : "",
                catagory: "Nokia"
            })
            setImage(false)
            toast.success(response.data.message)
        }else{
            toast.error(response.data.message)
        }
    }
  return (
    <div className='add'>
        <form action="" className="flex-col" onSubmit={onSubmitHandler}>
            <div className="add-img flex-col">
                <p>Upload image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
            </div>
            <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="add-product-desc flex-col">
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write here' required ></textarea>
            </div>
            <div className="add-catagory-price">
                <div className="add-catagory flex-col">
                    <p>Product Catagory</p>
                    <select onChange={onChangeHandler} value={data.catagory} name="catagory">
                        <option value="Nokia">Nokia</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Apple">Apple</option>
                        <option value="Oneplus">OnePlus</option>
                        <option value="Motorola">Motorola</option>
                        <option value="Oppo">Oppo</option>
                        <option value="Vivo">Vivo</option>
                        <option value="Xiaomi">Xiaomi</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product price</p>
                    <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$1000' />
                </div>
                
                <button className='add-button flex-col' type='submit'>ADD</button>
            </div>
        </form>

    </div>
  )
}

export default AddProduct