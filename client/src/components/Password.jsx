import React from 'react'
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { passwordValidate } from '../helper/validate'

const Password = () => {

  const formik = useFormik({
    initialValues:{
      password:''
    },
    validate:passwordValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:async values=>{
      console.log("Values -> ",values)
    }
  })


  return (
    <div className='parent'>
    <Toaster reverseOrder={false} />
    <div className="container">
          <div>
            <h4 >Hello Again</h4>
            <span >
              Explore more by connecting with us
            </span>
          </div>
          <form onSubmit={formik.handleSubmit} >
            <div className="profile">
              <img src="https://th.bing.com/th/id/OIP.y-nGyqT5AwES8oqp344z4gHaHa?pid=ImgDet&rs=1" alt="avatar" />

            </div>
            <div className="textbox">
              <input {...formik.getFieldProps('password')} type="password" placeholder='Password' />
              <button type='submit' >Sign Up</button>
            </div>
            <div>
              <span>Forgot password? <NavLink to="/recovery">Recover Now</NavLink></span>
            </div>
          </form>
    </div>
    </div>
  )
}

export default Password

