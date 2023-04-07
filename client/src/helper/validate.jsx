import  toast  from "react-hot-toast";


// validate usernaame
const usernameVerify=(error={},values)=>{
    if(!values.username){
        error.username = toast.error('Username Required...!')
    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username...!')
    }
    return error
}

// validate username
export const usernameValidate=async(values)=>{
    const errors = usernameVerify({},values)
    return errors
}









// validate password
const passwordVerify=(error={},values)=>{

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        error.password = toast.error('Password Required...!')
    }else if(values.password.includes(" ")){
        error.password = toast.error('Invalid format...!')
    }else if(values.password.length <4){
        error.password = toast.error("Password must be more than 4 charecter")
    }else if(!specialChars.test(values.password)){
        error.password = toast.error("Password must have special charecter")
    }
    return error
}

// validate password 
export const passwordValidate=async(values)=>{
    const errors = passwordVerify({},values)

    return errors
}

//validate reset Pasword
export const resetPasswordValidate = async (values)=>{
    const errors = passwordVerify({},values)
    if(values.password !== values.confirm_password){
        errors.exist = toast.error("Password don't match....!")
    }

    return errors
}











//validate register form

export const registerValidate = async (values)=>{
    const errors = usernameVerify({},values)
    passwordVerify(errors,values)
    emailVerify(errors,values)

    return errors
}


// validate email 

const emailVerify =(error={},value)=>{
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!value.email){
        error.email = toast.error("Email Required...!")
    }else if(value.email.includes(" ")){
        error.email = toast.error("Wrong Email...!")
    }else if(!emailRegex.test(value.email)){
        error.email = toast.error("Invalid email format...!")
    }
    return error
}






//validate profile page

export const profileValidate = async(values)=>{
    const errors = emailVerify({},values)
    return errors
}