import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import toast,{ Toaster } from "react-hot-toast";
import { profileValidate } from "../helper/validate";
import ConvertTobase64 from "../helper/convert";
import useFetch from "../hooks/fetch.hooks";
import { useAuthStore } from "../store/store";
import { updateUser } from "../helper/helper";

const Profile = () => {

  // const  username  = useAuthStore(state => state.auth.username)
  const [{ isLoading, apiData, serverError }] = useFetch();
  const [file, setFile] = useState("");
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      firstname:apiData?.firstName|| "",
      lastname:apiData?.lastName|| "",
      email:apiData?.email||  "",
      address:apiData?.address||  "",
      mobile: apiData?.mobile||"",
    },
    enableReinitialize:true,
    validate: profileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = Object.assign(values, { profile: file || "" });
      let updatePromise = updateUser(values)
      toast.promise(updatePromise,{
        loading:"Updating",
        success: <b>update Succesfull</b>,
        error: <b>Couldn't update</b>
      });
    },
  });

  // formik dosen't support file upload function
  const onUpload = async (e) => {
    const base64 = await ConvertTobase64(e.target.files[0]);
    setFile(base64);
  };

  /**Logout function */
  const handleLogout =()=>{
    localStorage.removeItem('token')
    navigate('/')
  }

  if (isLoading) {
    return <h1>Loading...!</h1>;
  }
  if (serverError) {
    return <h1>{serverError.message}</h1>;
  }

  return (
    <div className="parent">
      <Toaster reverseOrder={false} />
      <div className="container">
        <div>
          <h4>Profile</h4>
          <span>You can Update Your Details</span>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="profile">
            <label htmlFor="pic">
              <img
                className="register-pic"
                src={
                apiData?.profile || file ||
                  "https://th.bing.com/th/id/OIP.y-nGyqT5AwES8oqp344z4gHaHa?pid=ImgDet&rs=1"
                }
                alt="avatar"
              />
            </label>
            <input onChange={onUpload} type="file" id="pic" />
          </div>

          <div className="textbox-profile">
            <div className="name">
              <input
                {...formik.getFieldProps("firstname")}
                type="text"
                placeholder="First Name"
              />
              <input
                {...formik.getFieldProps("lastname")}
                type="text"
                placeholder="Last Name"
              />
            </div>
            <div className="name">
              <input
                {...formik.getFieldProps("mobile")}
                type="text"
                placeholder="Mobile Number"
              />
              <input
                {...formik.getFieldProps("email")}
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="name-add">
              <input
                {...formik.getFieldProps("address")}
                type="text"
                placeholder="Address"
              />
            </div>

            <button type="submit">Update</button>
          </div>
          <div>
            <span>
              Come back later? <NavLink to="/">Logout</NavLink>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
