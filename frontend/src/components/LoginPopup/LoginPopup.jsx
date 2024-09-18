import React, { useContext, useState ,useEffect} from 'react'
import './LoginPopup.css'
import {assets} from '../../assets/assets'
import { storeContext } from '../../context/storeContext'
import axios from "axios"
import {FaEye} from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'

const LoginPopup = ({setShowLogin}) => {

  const {url,setToken,setEmail,setRefreshToken}= useContext(storeContext)  

  const[currState,setCurrState] = useState("Login")
    const[data, setData]= useState({
      name: "",
      email: "",
      password:""
    })
    const [passwordVisible, setPasswordVisible] = useState(false);
    const onChangeHandler =(event)=>{
      const name =event.target.name;
      const value=event.target.value;
      setData(data=>({...data,[name]:value}))
    }
    const onLogin = async (event)=>{
        event.preventDefault()
        let newUrl= url;
        if(currState==="Login"){
          newUrl +="api/user/login"
        }
        else{
          newUrl +="api/user/register"
        }
        try {
        const response = await axios.post(newUrl,data);
        if(response.data.success){
          const { token, refreshToken} = response.data;
          if(token && refreshToken){
             setToken(response.data.token);
             setRefreshToken(response.data.refreshToken)
             localStorage.setItem("token",response.data.token)
           
              localStorage.setItem("refreshToken", response.data.refreshToken);
             // localStorage.setItem("user", JSON.stringify(user)); // Save user data
           
             console.log("Email:",response.data.data.email)
             console.log("Token is: ",response.data.token);
             console.log("Refresh token is: ",response.data.refreshToken);
             //console.log(response.data)
             const mail=response.data.data.email;
             localStorage.setItem("email",mail)

             setEmail(mail);
             setShowLogin(false)
            //  setTimeout(() => {
            //   localStorage.removeItem("token");
            //   localStorage.removeItem("email");
            //   setToken("");
            //   setEmail("");
              
            //   alert("Session expired. Please log in again.");
            // }, 15 * 60 * 1000);
          } else{
            alert("missing token or refresh token");
          }   
        }
        else{
          alert(response.data.message)
          console.log("Problem in onLogin of loginpopup");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred. Please try again."); 
      }
    }
    useEffect(() => {
      const requestInterceptor = axios.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem('token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );
  
      const responseInterceptor = axios.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;
          if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            console.log("response interceptor refresh token:",refreshToken)
            if (refreshToken) {
              try {
                const response= await axios.post(`${url}api/user/refreshToken`, {refreshToken}
                );
                const { token} = response.data;
                console.log("token from req interceptor",token)
                // Update the tokens in local storage and context
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                setToken(token);
                setRefreshToken(refreshToken);
  
                // Retry the original request with the new access token
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axios(originalRequest);
              } catch (refreshError) {
                console.error('Refresh token failed: ', refreshError);
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                setToken('');
                setRefreshToken('');
                setEmail('');
                alert('Session expired. Please log in again.');
                setShowLogin(true); // Show the login popup again
                return Promise.reject(refreshError);
              }
            }
          }
          return Promise.reject(error);
        }
      );
  
      // Clean up interceptors when component unmounts
      return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
      };
    }, [url, setToken, setRefreshToken, setEmail, setShowLogin]);


  return (
    <div className='login-popup'>
       <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            {/* <img onClick={()=> setShowLogin(false)} src = {assets.cross_icon} /> */}
         </div>
         <div className="login-popup-inputs">
          {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type = "text" placeholder= 'Your Name' required/>}
            
            <input name='email' onChange={onChangeHandler} value={data.email} type = "email"  placeholder= 'Your email' required/>
            <div className="password-input-container">
            <input
              name='password'
              onChange={onChangeHandler}
              value={data.password}
              type={passwordVisible ? "text" : "password"}
              placeholder='Password'
              required
            />
            <button
              type="button"
              className="password-toggle-button"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ?<FaEyeSlash /> : <FaEye />}
            </button>
          </div>
         </div>
         <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>

         {currState==="Login"
         ?<p>Create a new account?<span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>
         :<p>Already have an account?<span onClick={()=>setCurrState("Login")}>Login here</span></p>
         }
         
         
      </form> 
      
    </div>
  )
}

export default LoginPopup
