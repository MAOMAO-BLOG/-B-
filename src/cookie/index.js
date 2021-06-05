import Cookies from 'js-cookie';
/**
 * 
 * @param {*用户信息是一个对象} userInfo 
 */
export function setCookie(userInfo){
    //把一个对象转化为一个数组
    const arr=Object.entries(userInfo); 
    for(let i=0;i<arr.length;i++){
        Cookies.set(arr[i][0],arr[i][1]);
    }
    return true;
}

export function getCookie(){
    return {
        username: Cookies.get('username'),
        appkey: Cookies.get('appkey'),
        email:Cookies.get('email'),
        role:Cookies.get('role'),
    }
}
export function removeCookie(){
    Cookies.remove('username');
    Cookies.remove('appkey');
    Cookies.remove('email');
    Cookies.remove('role');
    return true;
}
export default{
    setCookie,
    getCookie,
    removeCookie
}