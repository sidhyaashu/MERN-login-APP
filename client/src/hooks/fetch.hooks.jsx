import axios from 'axios'
import { useEffect, useState } from 'react'


axios.defaults.baseURL = 'http://localhost:8000'


/** Custom Hooks */
export default function useFetch(query){
    const [ getData,setData ] = useState({isLoading:false,apiData:undefined , status:null, serverError:null})

    useEffect(()=>{
        if(!query) return;

        const fetchData = async()=>{
            try {
                setData(prev => ({...prev, isLoading:false}))

                const { data , status } = await axios.get(`/api/${query}`)

                if(status === 201){
                    setData(prev =>({...prev, isLoading:false}))
                    setData(prev => ({...prev, apiData:data, status:status}))
                }

                setData(prev => ({...prev, isLoading:false}))
            } catch (error) {
                setData(prev => ({...prev, isLoading:false,serverError:error}))
            }
        }
    },[query])

    return [getData,setData];
}