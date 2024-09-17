import { useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets/assets";
import './AddProduct.css'
import {toast} from 'react-toastify'
const imageToBase64 = (files) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(files);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

const AddProduct = ({url}) => {


    
   // const [image,setImage]=useState('');
    const [data,setData] = useState({
        name:"",
        description: "",
        price : "",
        catagory: "Nokia",
        image:""
    })
    const onChangeHandler =(event)=>{
        const name= event.target.name;
        const value= event.target.value;
        setData(data=>({...data,[name]:value}))
    }
    const handleUpload = async (e) => {
        const file = e.target.files[0];
       // console.log(file)
        const imagePic = await imageToBase64(file);
       // console.log(imagePic)
        setData((preve) => {
          return {
            ...preve,
            image: imagePic,
          };
        });
      };

    const onSubmitHandler =async(event)=>{
        event.preventDefault();
        if (!data.image) {
            toast.error('Please upload an image.');
            return;
        }
        const productData = {
            name: data.name,
            description: data.description,
            price: Number(data.price),
            catagory: data.catagory,
            image: data.image, // This is the base64 string
           
        };
       //console.log(data.image)
        try {
            const response = await axios.post(`${url}/api/gadget/add`, productData, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    catagory: "Nokia",
                    image:""
                });
                
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('An error occurred while adding the product.');
        }
    }
  return (
    <div className='add'>
        <form action="" className="flex-col" onSubmit={onSubmitHandler}>
            <div className="add-img flex-col">
                <p>Upload image</p>
                <label htmlFor="image">
                    <img src={data.image|| assets.upload_area} alt="" />
                </label>
                <input onChange={handleUpload} type="file" id="image" hidden required />
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
                    <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='৳1000' />
                </div>
                
                <button className='add-button flex-col' type='submit'>ADD</button>
            </div>
        </form>

    </div>
  )
}

export default AddProduct