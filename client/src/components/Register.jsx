import {useState} from 'react'
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { registerValidate } from '../helper/validate'
import ConvertTobase64 from '../helper/convert'




const Register = () => {

  const [file, setFile] = useState('');

  const formik = useFormik({
    initialValues:{
      email:'',
      username:'',
      password:''
    },
    validate:registerValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:async values=>{
      values = await Object.assign(values,{profile:file || ''})
      console.log("Values -> ",values)
    }
  })


  // formik dosen't support file upload function
  const onUpload = async e =>{
    const base64 = await ConvertTobase64(e.target.files[0]);
    setFile(base64)
  }


  return (
    <div className='parent'>
    <Toaster reverseOrder={false} />
    <div className="container">
          <div>
            <h4 >Register</h4>
            <span >
              Happy to join you
            </span>
          </div>
          <form onSubmit={formik.handleSubmit} >
            <div className="profile">
              <label htmlFor="pic">
              <img className='register-pic' src={file || "https://th.bing.com/th/id/OIP.y-nGyqT5AwES8oqp344z4gHaHa?pid=ImgDet&rs=1"} alt="avatar" />
              </label>
              <input onChange={onUpload} type="file" id="pic" />
            </div>
            <div className="textbox-register">
              <input {...formik.getFieldProps('email')} type="text" placeholder='Email' />
              <input {...formik.getFieldProps('username')} type="text" placeholder='Username' />
              <input {...formik.getFieldProps('password')} type="password" placeholder='Password' />
              <button type='submit' >Register</button>
            </div>
            <div>
              <span>Already registered? <NavLink to="/">Login now</NavLink></span>
            </div>
          </form>
    </div>
    </div>
  )
}

export default Register