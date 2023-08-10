import React, { useEffect } from 'react'
import { NavLink , useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import  toast, { Toaster } from "react-hot-toast";
import { passwordValidate } from '../helper/validate'
import useFetch from '../hooks/fetch.hooks';
import { useAuthStore } from '../store/store';
import { verifyPassword } from '../helper/helper'



const Password = () => {

  const navigate = useNavigate()
  const  username  = useAuthStore(state => state.auth.username)
  const [{isLoading,apiData,serverError}] = useFetch(`user/${username}`)

  // useEffect(()=>{
  //   console.log(username)
  // })

  const formik = useFormik({
    initialValues:{
      password:''
    },
    validate:passwordValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:async values=>{
      let loginPromise = verifyPassword({username,password:values.password})
      toast.promise(loginPromise,{
        loading:"Cheking...!",
        success: <b>Login Succesfullyyyyy</b>,
        error: <b>Password dose't match</b>
      });

      console.log(loginPromise)


      loginPromise.then(res=>{
        let { token } = res.data
        localStorage.setItem('token',token)
        navigate('/profile')
      })

    }
  })

  if(isLoading) { return <h1>Loading...!</h1> }
  if(serverError) { return <h1>{serverError.message}</h1> }


  return (
    <div className='parent'>
    <Toaster reverseOrder={false} />
    <div className="container">
          <div>
            <h4 >Hello {apiData?.firstname || apiData?.username}</h4>
            <span >
              Explore more by connecting with us
            </span>
          </div>
          <form onSubmit={formik.handleSubmit} >
            <div className="profile">
              <img src={apiData?.profile || "https://th.bing.com/th/id/OIP.y-nGyqT5AwES8oqp344z4gHaHa?pid=ImgDet&rs=1"} alt="avatar" />

            </div>
            <div className="textbox">
              <input {...formik.getFieldProps('password')} type="password" placeholder='Password' />
              <button type='submit' >Sign In</button>
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

