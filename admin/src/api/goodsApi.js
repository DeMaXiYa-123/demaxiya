import axios from '../utils/axios'

//获取商品列表
export const GetGoods = async (page,pageSize) => {
  let url = "/api/v1/admin/good/getGoods"
  let result = await axios.post(url,{page,pageSize})
  if(result.err == 0){
    return result
  }else{
    return result
  }
}

export const AddGood = async (title, content, time, img, mark) => {
  let url = "/api/v1/admin/good/addGood"
  let result = await axios.post(url,{title, content, time, img, mark})
  if(result.err == 0){
    return result
  }else{
    return result
  }
}

export const UpdataGood = async (_id, title, content, time, img, mark) => {
  let url = "/api/v1/admin/good/updateGood"
  let result = await axios.post(url,{_id, title, content, time, img, mark})
  if(result.err == 0){
    return result
  }else{
    return result
  }
}