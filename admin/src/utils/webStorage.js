
  //封装第三方缓存模块
  // 1.简化localstorage的存取值过程
  // 2.将localstorage 赋予过期时间
  // 3.低版本浏览器兼容 

export const setItem=(key,value,exptime=30*10*1000)=>{
    if(window.localStorage){
      let  obj={}
      obj.data=value 
      obj.ctime=(new Date()).getTime()
      obj.exptime=exptime
      localStorage.setItem(key,JSON.stringify(obj))
    }else{

    }
  }
export const getItem=(key)=>{
    let data=JSON.parse(localStorage.getItem(key))
    if(!data){return null}
    let nTime=(new Date()).getTime() 
    if(nTime-data.ctime>=data.exptime){
      localStorage.removeItem(key)
      return null
    }else{
      return data.data
    }
}
export const removeItem=(key)=>{
    localStorage.removeItem(key)
}
export const clear=(key)=>{
    localStorage.clear()
}