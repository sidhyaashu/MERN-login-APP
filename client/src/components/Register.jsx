import {useState} from 'react'
import {NavLink , useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { registerValidate } from '../helper/validate'
import ConvertTobase64 from '../helper/convert'
import { registerUser } from '../helper/helper';



const Register = () => {

  const navigate = useNavigate()
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
      values = Object.assign(values, { profile: file || '' })
      let registerPromise = registerUser(values)
      toast.promise(registerPromise,{
        loading:"Creating...",
        success:<b>Register succesfully</b>,
        error:<b>Could not Register</b>
      });
      registerPromise.then(function(){navigate('/')})
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