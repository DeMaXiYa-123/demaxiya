import axios from '../utils/axios'

//日报
export const GetGoods = async (page,pageSize,uid) => {
  let url = "/not/v1/admin/good/getGoods"
  let result = await axios.post(url,{page,pageSize,uid})
  if(result.err == 0){
    return result
  }else{
    return result
  }
}

export const AddGood = async (title, content, time, img, mark, uid) => {
  let url = "/not/v1/admin/good/addGood"
  let result = await axios.post(url,{title, content, time, img, mark, uid})
  if(result.err == 0){
    return result
  }else{
    return result
  }
}

export const UpdataGood = async (_id, title, content, time, img, mark) => {
  let url = "/not/v1/admin/good/updateGood"
  let result = await axios.post(url,{_id, title, content, time, img, mark})
  if(result.err == 0){
    return result
  }else{
    return result
  }
}


//周报


export const Getzhoubao = async (page,pageSize,uid) => {
  let url = "/not/v1/admin/zhoubao/getzhoubao"
  let result = await axios.post(url,{page,pageSize,uid})
  if(result.err == 0){
    return result
  }else{
    return result
  }
}

export const Addzhoubao = async (title, content, time, img, mark, uid) => {
  let url = "/not/v1/admin/zhoubao/addzhoubao"
  let result = await axios.post(url,{title, content, time, img, mark, uid})
  if(result.err == 0){
    return result
  }else{
    return result
  }
}

export const Updatazhoubao = async (_id, title, content, time, img, mark) => {
  let url = "/not/v1/admin/zhoubao/updatezhoubao"
  let result = await axios.post(url,{_id, title, content, time, img, mark})
  if(result.err == 0){
    return result
  }else{
    return result
  }
}


//月报

export const Getyuebao = async (page,pageSize,uid) => {
  let url = "/not/v1/admin/yuebao/getyuebao"
  let result = await axios.post(url,{page,pageSize,uid})
  if(result.err == 0){
    return result
  }else{
    return result
  }
}

export const Addyuebao = async (title, content, time, img, mark, uid) => {
  let url = "/not/v1/admin/yuebao/addyuebao"
  let result = await axios.post(url,{title, content, time, img, mark, uid})
  if(result.err == 0){
    return result
  }else{
    return result
  }
}

export const Updatayuebao = async (_id, title, content, time, img, mark) => {
  let url = "/not/v1/admin/yuebao/updateyuebao"
  let result = await axios.post(url,{_id, title, content, time, img, mark})
  if(result.err == 0){
    return result
  }else{
    return result
  }
}