/** Make an api request */
import axios from 'axios'
import jwt_decode from 'jwt-decode'
axios.defaults.baseURL = 'http://localhost:8000'
// process.env.REACT_APP_SERVER_DOMAIN


/**Get username */
export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Can't find token")
    let decode = jwt_decode(token)
console.log(`return from helper helper jwt decode ${decode}`)
    return decode
}



/** Authenticate functions */
export async function authenticate(username){
    try {
        return await axios.post('/api/authenticate',{username})

    } catch (error) {
        return { error : "Username dosn't exist"}
    }
}

/** get user function*/
export async function getUser({username}){
    try {
        const { data } = await axios.get(`/api/user/${username}`)
        return data
    } catch (error) {
        return { error : "Password dosen't match"}
    }
}

/** Register user function*/
export async function registerUser(creadentials){
    try {
        const { data :{message},status } = await axios.post(`/api/register`,creadentials)

        let { username , email } = creadentials
        /**send email */
        if(status === 201 ){
            await axios.post('/api/registerMail',{
                username,
                userEmail : email,
                text:message
            })
        }

        return Promise.resolve(message)
    } catch (error) {
        return Promise.reject({ error })
    }
}

/** Login Function  */
export async function verifyPassword({username,password}){
    try {
        if(username){
            const  { data } = await axios.post('/api/login',{username,password})
            console.log(`data -- ${data}`)
            return Promise.resolve({data})
        }else{
            console.log("No username")
        }
    } catch (error) {
        return Promise.reject({error:"Password dosen't match"})
    }

}

/**Update user profile function */
export async function updateUser(response){
    try {
        const token = localStorage.getItem('token')
        const data = await axios.put('/api/updateuser',response,{headers : {
            "Authorization":`Bearer ${token}`
        }})

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({error:"Couldn't Update Profile ... !"})
    }
}


/** Generate otp function */
export async function generateOTP(username){
    try {
        const { data : {code},status} = await axios.get('/api/generateOTP',{ params : {username}})

        if(status === 201){
            let { data : {email}} = await getUser({username})
            let text = `Your Recovery OTP is ${code} . recover and verify your password`
            await axios.post('/api/registerMail',{username,userEmail:email ,text , subject:"Password Recovry OTP" })
        }

        return Promise.resolve(code)
    } catch (error) {
        return Promise.reject({ error })
    }
}


/** Verify OTP functions */
export async function verifyOTP({username,code}){
    try {
        const { data , status } = await axios.get('/api/verifyOTP',{ params:{username,code}})
        return { data , status }
    } catch (error) {
        return Promise.reject(error)
    }
}

        // const { data , status } = await axios.get('/api/verifyOTP',{ params:{username,code}})

/** Reset Password function */
export async function resetPassword({ username , password}){
    try {
        const { data , status } = await axios.put("/api/resetPassword",{username,password})
        return Promise.resolve({ data, status })
    } catch (error) {
        return Promise.reject({ error })
    }
}