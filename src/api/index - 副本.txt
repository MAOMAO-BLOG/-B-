import axios from 'axios';
import URLs from './URLs';
import store from '../store';
const instance=axios.create({
    baseURL:URLs.baseURL,
})
// 添加请求拦截器
instance.interceptors.request.use(config=> {
    if(config.url.includes('passport')){
      return config;
    }else{
      return {
        ...config,
        params:{
          ...config.params,
          appkey:store.state.user.appkey,
        }
      };
    }
  }, error=>{
    return Promise.reject(error);
  });
  // 添加响应拦截器
  instance.interceptors.response.use(function (response) {
    if(response.data.status==='fail'){
      return Promise.reject(response.data.msg);
    }else{
      return response.data.data;
    }
  }, function (error) {
    return Promise.reject(error);
  });

const login=(data)=>instance.post(URLs.login,data);
const category=(data)=>instance.get(URLs.category,{params:data});
const productList=(data)=>instance.get(URLs.product,{params:data});
const removeProduct=(data)=>instance.delete(URLs.removeProduct+data.id);
const addProduct=(data)=>instance.post(URLs.addProduct,data);
const getDetail=(id)=>instance.get(URLs.getDetail+id);
const edit=(data)=>instance.put(URLs.edit,data);
export default{
    login,
    category,
    productList,
    removeProduct,
    addProduct,
    getDetail,
    edit
}