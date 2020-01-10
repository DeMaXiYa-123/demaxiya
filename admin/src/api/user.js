import axios from '../utils/axios'
import {getItem} from '../utils/webStorage'
export const userLogin=(userName,passWord)=>{
    return new Promise((resolve,reject)=>{
        let url = '/api/v1/admin/user/login'
        axios.post(url,{userName,passWord})
        .then((res)=>{
            resolve(res)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

export const Logout=()=>{
    return new Promise((resolve,reject)=>{
        let url = '/api/v1/admin/user/logout'
        let uid = getItem('uid')
        let token = getItem('token')
        console.log(uid)
        console.log(token)
        axios.post(url,{uid,token})
        .then((res)=>{  
            resolve(res)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

export const reg=(userName,passWord)=>{
    return new Promise((resolve,reject)=>{
        let url = '/api/v1/admin/reg/reg'
        axios.post(url,{userName,passWord})
        .then((res)=>{
            resolve(res)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}