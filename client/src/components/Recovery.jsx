import React from 'react'
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { passwordValidate } from '../helper/validate'

const Recovery = () => {

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
            <h4 >Recovery</h4>
            <span >
              Enter otp to recover password
            </span>
          </div>
          <form onSubmit={formik.handleSubmit} >
            <span>Enter 6 digit OTP  sent to your email address</span>
            <div className="textbox">
              <input  type="text" placeholder='OTP' />
            </div>
              <button type='submit' >Sign Up</button>
            <div>
              <span>Can't get OTP <button>Resend</button></span>
            </div>
          </form>
    </div>
    </div>
  )
}

export default Recovery
