import ajax from "./ajax";

//请求基本信息
// const BASE_URL='http:39.97.111.97:8080';
const BASE_URL='/api';
export const reqIntak=(geohash)=>ajax('${BASE_URL}/position/${geohash}')
export const reqMessage=()=>ajax(BASE_URL+'/environPara/list')
export const reqMesAppconsums=()=>ajax(BASE_URL+'//intakePlantInfo/consumes',"GET",{})
export const getMaxIndex=()=>ajax(BASE_URL+'//intakePlantInfo/getIndex',"GET",{})
export const deletById=(data)=>ajax(BASE_URL+'//intakePlantInfo/Consumer',"delete",data)
// export const postInsert=(data)=>ajax(BASE_URL+'//intakePlantInfo/insConsumer',"post",data)
export const postUpdate=(data)=>ajax(BASE_URL+'//intakePlantInfo/Consumer',"put",data)
