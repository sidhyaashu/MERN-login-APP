import {useState} from 'react'
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { profileValidate } from '../helper/validate'
import ConvertTobase64 from '../helper/convert'




const Profile = () => {

  const [file, setFile] = useState('');

  const formik = useFormik({
    initialValues:{
      firstname:'',
      lastname:'',
      email:'',
      address:'',
      mobile:''
    },
    validate:profileValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:async values=>{
      values =Object.assign(values,{profile:file || ''})
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
            <h4 >Profile</h4>
            <span >
              You can Update Your Details
            </span>
          </div>
          <form onSubmit={formik.handleSubmit} >
            <div className="profile">
              <label htmlFor="pic">
              <img className='register-pic' src={file || "https://th.bing.com/th/id/OIP.y-nGyqT5AwES8oqp344z4gHaHa?pid=ImgDet&rs=1"} alt="avatar" />
              </label>
              <input onChange={onUpload} type="file" id="pic" />
            </div>

            <div className="textbox-profile">

              <div className="name">
                <input {...formik.getFieldProps('firstname')} type="text" placeholder='First Name' />
                <input {...formik.getFieldProps('lastname')} type="text" placeholder='Last Name' />
              </div>
              <div className="name">
                <input {...formik.getFieldProps('mobile')} type="text" placeholder='Mobile Number' />
                <input {...formik.getFieldProps('email')} type="text" placeholder='Email' />
              </div>
              <div className="name-add">
                <input {...formik.getFieldProps('address')} type="text" placeholder='Address' />
              </div>

              <button type='submit' >Register</button>
            </div>
            <div>
              <span>Come back later? <NavLink to="/">Logout</NavLink></span>
            </div>
          </form>
    </div>
    </div>
  )
}

export default Profile
