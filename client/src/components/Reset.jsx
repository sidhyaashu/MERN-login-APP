import React from 'react'
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { resetPasswordValidate } from '../helper/validate'

const Reset = () => {

  const formik = useFormik({
    initialValues:{
      password:'',
      confirm_password:''
    },
    validate:resetPasswordValidate,
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
            <h4 >Reset</h4>
            <span >
              Enter new password
            </span>
          </div>
          <form onSubmit={formik.handleSubmit} >
            
            <div className="textbox-reset">
              <input {...formik.getFieldProps('password')} type="password" placeholder='Password' />
              <input {...formik.getFieldProps('confirm_password')} type="password" placeholder='Confirm Password' />
              <button type='submit' >Reset</button>
            </div>
            <div>
              <span>Forgot password? <NavLink to="/recovery">Recover Now</NavLink></span>
            </div>
          </form>
    </div>
    </div>
  )
}

export default Reset

