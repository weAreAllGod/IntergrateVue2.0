
import axios from 'axios'
export default function ajax(thisUrl,thisType,thisData){


return axios({
    headers: {
        token:window.sessionStorage.getItem("token")
      },
    url:thisUrl,
    method:thisType,
    data:thisData
})



}