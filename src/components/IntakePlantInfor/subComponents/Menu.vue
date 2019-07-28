

<template>
<div></div>

<!-- 
        <div class="map_select">
          <p @click=showBaseMesg><span><img src="../Home/img/nav_1.png">基本信息</span></p>
          <p @click=showQuery ><span><img src="../Home/img/nav_9.png">信息查询</span></p>
          <p @click=showChart><router-link style="color:white" to="/statGraph "><span><img src="../Home/img/nav_7.png">基本统计</span></router-link></p>
          
        </div> -->
        <!-- <p><span>测试</span></p> -->
<!-- 
        <ul id="rfw" >
           
            <li><img src="../Home/img/car_mon.png" class="nav_image"/> 产生源地图</li>
            <li><img  src="../Home/img/trace.png" class="nav_image"/>基本信息</li>
            <li> <img  src="../Home/img/table.png" class="nav_image"/>信息统计</li>
        </ul>
         -->
        

    
 
</template>

<script>
import bus from '../../../assets/eventbus.js'
import Cesium from 'cesium/Source/Cesium.js'
import {reqMessage, postUpdate} from '../api'
import {postDeletById} from '../api'
// import statGraph from './statGraph'
import axios from 'axios'

export default {
    components:{

        // statGraph
    },

    props:{
        
       
        // addEnity:{
        // type:Function,
        // required:true

        // },
        appconsumers:{
        type:Array,
        required:true

        },
        viewer:{
        type:Object,
        required:true

        },
        showBaseMesgInSafty:{
            type:Boolean,
            required:true
        },
        showQueryInSafty:{
                type:Boolean,
                required:true
            },
        showChartInSafty:{
                type:Boolean,
                required:true
            },
        
      
      
  
    },
  
    // props:['viewer'],
    name: 'Menu',
    data () {
        return {
        cityId:0,
        // allCitys:[{id:1,name:"北京"},{id:2,name:"上海"},
        //             {id:3,name:"广州"},{id:4,name:"深圳"}],
        // enitys:[],
        myentiys:[],
        alerEntitys:[],
        // thisenty:""
        showAllEntitis:false,
        audio:new Audio('../static/IntakePlantStaticSource/Sounds/6175.mp3'),
        tilSets:[]
        
       
        
        }
    },
    watch: {
            cityId:function(value){
                if(value==1){
                    this.flyToskyThenP(116.39, 39.9, 65000.0)
                    
                }
                if(value==2){
                    this.flyToskyThenP(121.47,31.23 , 65000.0)
                                    
                }
                if(value==3){
                    this.flyToskyThenP(113.27,23.13, 65000.0)
                    
                    
                }
                if(value==4){
                    
                    this.flyToskyThenP(114.00,22.5, 65000.0)
                }
            },
            alerEntitys:function(){
                  // //如果有超标的就发出有声音
                if(this.alerEntitys.length==0){
                    this.audio.pause()
                }
                
              

            },
            showBaseMesgInSafty:function(){
                if(this.showBaseMesgInSafty||this.showBaseMesgInSafty!=this.showBaseMesgInSafty){
                    this.showBaseMesg()
                    // 向sftyapp中发消息复位
                    bus.$emit("reShowBaseMesg",false)
                    // 不管什么时候只要点击该按钮，其他消息一律退出
                    bus.$emit("show",false)
                }

            },
            showQueryInSafty:function(){
                if(this.showQueryInSafty || this.showQueryInSafty!=this.showQueryInSafty){
                    this.showQuery()
                    bus.$emit("reShowQuery",false)
                }

            },
            showChartInSafty:function(){
                  if(this.showChart){
                    this.showChart()
                    bus.$emit("reShowChart",false)
                }

            }
      

            
    },
   
    //        // //鼠标的监听事件
    //     var handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    //     this.handler.setInputAction((click)=>{
    //     // 处理鼠标按下事件
    //     // 获取鼠标当前位置
    //     // console.log('1111');
    //     let pick = this.viewer.scene.pick(click.position);
    //     //选中某模型   pick选中的对象
    //     console.log(pick)
    //     console.log(pick.id)
    //     if(this.alerEntitys.indexOf(pick)!=-1){

    //         alert('cuzai')
    //     }

    //   }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

created:function(){
    console.log("0000000000000000000000000000000000>")
    console.log(this.appconsumers)
bus.$on("addentity",(msg)=>{ 
    console.log("Menu中由Table提交的实体")     
    console.log(msg.latitude)
    var thatenty=this.addEnity(msg);
    this.myentiys.splice(1,0,thatenty) ;            

}),
//接受组件saftyApp发送过来的数据
bus.$on("removeAlertId",(msg)=>{

    if(msg=="removeAll"){
            for(var i=0;i<this.alerEntitys.length;i++){
            this.viewer.entities.removeById(this.alerEntitys[i].id)
            }
            this.alerEntitys=[]


    }
    else{
        if(confirm("该消纳场发生警报，是否处理？")){
        this.viewer.entities.removeById(msg)
        for (let i=0;i<this.alerEntitys.length;i++){
            if(String(this.alerEntitys[i].id)===msg){
                    this.alerEntitys.splice(i,1)
            }


            }
        }
    }       
}),
    //接受saftyApp中发送的鼠标点击的位置信息
bus.$on("positionBePicked",(msg)=>{
    this.addLatLonIndex(msg[0],msg[1])


})

},

mounted:function(){
 

},
   
methods:{
 
showQuery() {
    // div45.showdiv45=!div45.showdiv45
    // alert("进来了")
    bus.$emit('show',true);
    bus.$emit("showSfMenu",false)  

},
showChart(){
    bus.$emit("showSfChart",true)

},
showBaseMesg() { 
    // alert("请先输入城市！！！")
    bus.$emit("showSfMenu",false)  
    //如果实体集合为空说明需要添加
    if(this.myentiys.length==0){
        for(var i=0;i<this.appconsumers.length;i++)
            {
                //命名的时候千万不能乱命名不然会出现调错
                    
                // var thisenty=addCousumerImg(div45.consumers[i].latitude,div45.consumers[i].longtitude);
                //返回两个值，一个是消纳场实体，一个是警报实体
                var listArray=this.addEnity(this.appconsumers[i])
                var thisenty=listArray[1];
                var thisAlertEnity=listArray[0]
                this.myentiys.splice(1,0,thisenty) ;
                if(thisAlertEnity!=null){

                    this.alerEntitys.splice(1,0,thisAlertEnity)
                }
                
            }
    } 
    else{
        //如果不是为空，则只需要显示一下
        this.showAllEntitis=!this.showAllEntitis
        this.viewer.entities.show=this.showAllEntitis;

    }
    
    //如果有超标的就发出有声音
    if(this.alerEntitys.length!==0){
    
    this.audio.loop=true;
    this.audio.play();  
    

    }
    //此时询问是进行批量删除
    if(this.alerEntitys.length>1){

        setTimeout(()=>{
            if(confirm("有"+this.alerEntitys.length+"个消纳场发生警报，是否批处理？")){
                //在creat中统一处理
                bus.$emit("removeAlertId","removeAll")
    
            }

    },2000)
    

    }

    
    
},
test(){
   const BASE_URL='/api'
    // const test= axios.request({
    //     url:BASE_URL+'//intakePlantInfo/upConsumer',
    //     method:"post",
    //     data:{
    //         id: "2019I0000000102",
    //         name: "京城第一消纳场",
    //         addr: "我们的大故宫里",
    //         latitude: 40.1,
    //         longtitude: 116.39,
    //         inputname: "小王",
    //         content: "测试用",
    //         conswasteid: "2019W0000000001",
    //         type: "固体砖头",
    //         area: "100",
    //         volume: "目前不确定",
    //         vedio: "http://www.JZLJ.com/vieo1",
    //         environparaid: "2019E0000000001",
    //         safepara: "3",
    //         waterpara: "1",
    //         solfpara: "3",
    //         atmpara: "1",
    //         warnpara: "1"
    //     }
    // }).then(
    //     (v)=>{
    //     console.log("--------------------")
    //     console.log(v)
        
    //     }
        
    // )
     const data={
            id: "2019I0000000102",
            name: "京城第一消纳场",
            addr: "我们的大故宫里",
            latitude: 40.1,
            longtitude: 116.39,
            inputname: "小王",
            content: "测试用",
            conswasteid: "2019W0000000001",
            type: "固体砖头",
            area: "100",
            volume: "目前不确定",
            vedio: "http://www.JZLJ.com/vieo1",
            environparaid: "2019E0000000001",
            safepara: "3",
            waterpara: "1",
            solfpara: "3",
            atmpara: "1",
            warnpara: "1"
        }
    
    alert(typeof(data))
    postUpdate(data)

   
                                
},

addLatLonIndex(longtitude,latitude){
    // console.log(this.viewer.entities.getById("latLonIndex"));
    //如果存在删除
    if(this.viewer.entities.getById("latLonIndex")!=null){
        this.viewer.entities.removeById("latLonIndex")
    };
   console.log("在Menue中创建时的地址")
   console.log(longtitude)
   console.log(latitude)
   
    this.viewer.entities.add({
    id:"latLonIndex",
    description:"",
    position : Cesium.Cartesian3.fromDegrees(longtitude,latitude, 0),
    billboard : {
        image : '/static/IntakePlantStaticSource/Image/apoint4.png',
        width:32,
        height:32
    },
    })
   

},
addEnity(myconsum){
   //消纳场基本信息
    //如果风险因子大于3添加警报
    var saftyEntity=null;
    if(myconsum.safepara>=3){
    var saftyEntity = this.viewer.entities.add({

    position : Cesium.Cartesian3.fromDegrees(myconsum.longtitude,myconsum.latitude, 150),
    id:"alertor"+myconsum.id,
    name:myconsum.name, 
    description:myconsum,  
    billboard : {
    image : '/static/IntakePlantStaticSource/Image/alertor.png',
    width:50,
    height:50
    },
            });    
        }   
//气球实体
var ddd=this.viewer.entities.add({
    id:"balloon"+myconsum.id,
    name:myconsum.name,
    position : Cesium.Cartesian3.fromDegrees(myconsum.longtitude,myconsum.latitude, 55),
    model: {
            
            // uri: 'static/glft/test2.gltf',
            uri: 'static/IntakePlantStaticSource/glft/test/CesiumBalloon.glb',
            // maximumScale=2000,
            // modelMatrix : modelMatrix,  
            // scale : 20.0     //放大倍数
    }
});
this.tilSets.push(ddd )
//地面房屋实体
var dd4=this.viewer.entities.add({
    id:"construct"+myconsum.id,
    name:myconsum.name,
    position : Cesium.Cartesian3.fromDegrees(myconsum.longtitude,myconsum.latitude, 0),
    model: {
            
            // uri: 'static/glft/test2.gltf',
            uri: 'static/IntakePlantStaticSource/glft/mydae3.gltf',
            // maximumScale=2000,
            // modelMatrix : modelMatrix,  
            scale : 20.0     //放大倍数
    }
});

    
  
 //表示消纳场的实体   
var entity = this.viewer.entities.add({
    
    position : Cesium.Cartesian3.fromDegrees(myconsum.longtitude,myconsum.latitude, 50),
    id:myconsum.id,
    name:myconsum.name,  
    //
    description:myconsum,
    billboard : {
        image : '/static/IntakePlantStaticSource/Image/facility.gif',
        width:32,
        height:32
    },
            });
    return [saftyEntity,entity]
},
}}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    /* .div2{
        width:40px;
        height: 100px;
        margin-top:40px;
        background-color: black;
        display: block;float: left;
        position: absolute;top: 0;bottom: 0;left: 0;
        z-index: 5;
    } */
    .div2_div1{
        /* color:white ;
        background-color:black;
        position: fixed;top: 40px;
        left: 480px;
        z-index: 20; */
        z-index: 20;
        position: fixed;top: 40px;
        left: 480px;
        display: block;
        padding: 0 14px;
        margin: 6px 0;
        line-height: 28px;
        text-decoration: none;
        border-left: 1px solid #393942;
        border-right: 1px solid #4f5058;
        font-family: Helvetica, Arial, sans-serif;
        font-weight: bold;
        font-size: 13px;
        color: #f3f3f3;
        text-shadow: 1px 1px 1px rgba(0,0,0,.6);
        -webkit-transition: color .2s ease-in-out;
        -moz-transition: color .2s ease-in-out;
        -o-transition: color .2s ease-in-out;
        -ms-transition: color .2s ease-in-out;
        transition: color .2s ease-in-out;



    }
    .div2_div1_p{
        font-size: 15px;
        z-index: 5;
        

    }
    .div2_div1_p:hover{
        font-size: 20px;
        color:yellow; 
        cursor: pointer;
        z-index: 5; 
    }

    .map_select{
    position: fixed;
    top:160px;
    right: 7%;
    box-shadow: -10px 0px 15px #034c6a inset, /*å·¦è¾¹é˜´å½±*/
    0px -10px 15px #034c6a inset, /*ä¸Šè¾¹é˜´å½±*/
    10px 0px 15px #034c6a inset, /*å³è¾¹é˜´å½±*/
    0px 10px 15px #034c6a inset;
    border: 1px solid #034c6a;
    width: 120px;
    height: 160px;
    border-radius: 5px;
    background-color: #081832e3;
     z-index:20; 
    
    }
    .map_select p{
        padding: 8px 15px;
        color: #FFFFff;
        font-size: 14px;
        /* background-image: url("../Home/img/nav_7.png"); */
    }
    .map_select p:hover{
        border-bottom: 4px solid #4b8df8;
        box-shadow: -10px 0px 15px #034c6a inset, /*å·¦è¾¹é˜´å½±*/
        0px -10px 15px #034c6a inset, /*ä¸Šè¾¹é˜´å½±*/
        10px 0px 15px #034c6a inset, /*å³è¾¹é˜´å½±*/
        0px 10px 15px #034c6a inset;
        cursor: pointer;
    }
    .map_select p img{
        margin-right: 4px
    }
  


</style>
