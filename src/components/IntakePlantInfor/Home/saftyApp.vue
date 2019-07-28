<template>
<html>
  <body>
  <!-- <header class="header left">
    <div class="left nav itemDiv">
        <ul>
            <li><router-link to="/"><i class="nav_1"></i>首页</router-link></li>
            <li><i class="nav_2"></i>产生源</li>
            <li><i class="nav_3"></i>车辆监控</li>
            </ul>
    </div>
    <div class="header_center left itemDiv">
        <h2><strong>建筑垃圾全过程实时监测与智能管控云平台</strong></h2>
        <p class="color_font"><small>Comprehensive service platform for smart tourism</small></p>
    </div>
    <div class="right nav text_right itemDiv">
        <ul> <li><i class="nav_7"></i>资源厂 </li>
           <li> <router-link to="/saftyApp"><i class="nav_8"></i>消纳场</router-link> </li>
            <li><i class="nav_4"></i>运维管理 </li>
        </ul>
    </div>
 </header> -->


 <div id="header">
		<div class="left_nav">
			<ul>
				<li class="nav_li" id="h_p">
         	<router-link  to="/home"><img  src="./img/nav_p.png" class="nav_image"> 首页</router-link> </li>
				<li class="nav_li" id="c_s"><a href="#"><img src="./img/nav_c.png" class="nav_image"/> 产生源监测</a> 
					<ul id="cs" >
						<li><router-link class="a_c" to="/source"><img src="./img/car_mon.png" class="nav_image"/> 产生源地图</router-link></li>
						<li><router-link to="/source/info" class="menu"  id="trace" value = "1"><img  src="./img/trace.png" class="nav_image"/>基本信息</router-link></li>
						<li><router-link to="/source/statistics"> <img  src="./img/table.png" class="nav_image"/>信息统计</router-link></li>
            <li><router-link to="/source/info2"> <img  src="./img/etinfo.png" class="nav_image"/>信息维护</router-link></li>
          </ul>
				</li>
				<li class="nav_li" id="m_v">
				 <a href="#"><img class="nav_image" src="./img/nav_car.png"> 车辆监控</a> 
					<ul id="mv">
						<li><router-link class="a_c" to="/Monitor/MonitorVehicle"><img src="./img/car_mon.png" class="nav_image"/> 实时监控</router-link></li>
						<li><router-link to="/Monitor/HistoricalTrack" class="menu"  id="trace" value = "1"><img  src="./img/trace.png" class="nav_image"/>历史轨迹</router-link></li>
						<li><router-link to="/Monitor/Graph"> <img  src="./img/table.png" class="nav_image"/>统计分析</router-link></li>
            <li><router-link to="/Monitor/Info"> <img  src="./img/etinfo.png" class="nav_image"/>信息录入</router-link></li>
            </ul>
				</li>
			</ul>
		</div>
		<div class="header_center" >
			<h2 style="color:white"><strong>建筑垃圾全过程实时监测与智能管控云平台</strong></h2>
			<p class="color_font" style="color:white"><small>Comprehensive service platform for smart tourism</small></p>
		</div>
		<div class="right_nav">
			<ul>
				<li class="nav_li" id="r_f"><router-link to="/saftyApp"><a href="#"><img  src="./img/nav_z.png"/> 消纳场监测</a></router-link> 
              <ul id="rf" >
						<li @click="showBaseMesgInSafty=true" class="a_c" ><router-link to="/saftyApp"><img  src="./img/car_mon.png" />基本信息</router-link></li>
						<li  @click="showQueryInSafty=true"><router-link to="/saftyApp" class="menu"  id="trace" value = "1"><img  src="./img/trace.png" /> 信息查询</router-link></li>
						<li  @click="showChartInSafty=true"><router-link to="/statGraph "> <img  src="./img/table.png" />信息统计</router-link></li>            
            </ul>
        </li>

				<li class="nav_li" id="g_f"><a href="#"><img src="./img/nav_x.png" > 资源场监测</a> 
          <ul id="gf" >
						<li><router-link class="a_c" to="/mainViewer"><img  src="./img/car_mon.png" /> 地理位置</router-link></li>
						<li><router-link to="/query" class="menu"  id="trace" value = "1"><img  src="./img/trace.png" /> 资源场信息</router-link></li>
						<li><router-link to="/static"> <img  src="./img/table.png" />信息统计</router-link></li>            
            </ul>
				</li>
				<li class="nav_li" id="c_i"><router-link  to="/manage">用户管理</router-link> </li>
        <router-link  to="/"> <img  src="./img/nav_10.png" @click ="loginout()"/></router-link>
        <!-- <img  src="../Ho/img/nav_10.png" @click="loginout()"/> -->
         
			</ul>
		</div>
	</div>

  <div id="appIntakeplant">
    <!-- <img src="./assets/logo.png">  -->
    <!-- <Head/> -->
     <!-- :mouseenter="showMenu=!showMenu" :mouseout="showMenu=!showMenu" -->
    <Menu v-show="true"  :appconsumers="appconsumers" :viewer="viewer" :showBaseMesgInSafty="showBaseMesgInSafty" :showQueryInSafty="showQueryInSafty" :showChartInSafty="showChartInSafty"  />
    <!-- <router-view /> -->
    <!-- <div v-show="!viewer" class="loadingOverlay">Loading...</div> -->
    <!--  -->
   <div id="cesiumContainer" class="div3" >
   </div>
    <!-- <CesiumViewer :viewer="viewer"/> -->
    <Table :appconsumers="appconsumers" :viewer="viewer"   :pickLat="pickLat" :pickLon="pickLon"/>
    <PopUpTable :showThisWindow="showThisWindow" :dataInPopUp="dataInPopUp" /> 
  
    
    
  </div>
  </body>
</html>
</template>

<script>
import bus from '../../../assets/eventbus.js'
// import Head from  '../subComponents/Head'

import Menu from '../subComponents/Menu'
import CesiumViewer from '../subComponents/CesiumViewer'
import Table from '../subComponents/Table'
import statGraph from '../subComponents/graphContainer/statGraph'
import graphContainer from '../subComponents/graphContainer/graphContainer'
import PopUpTable from '../subComponents/PopUpTable'



import Cesium from 'cesium/Source/Cesium.js'
import buildModuleUrl from "cesium/Source/Core/buildModuleUrl"
import "cesium/Source/Widgets/widgets.css";
import {reqMesAppconsums} from '../api'
// import CesiumViewer from './CesiumViewer.vue'



export default {
   
  name: 'saftyApp',
  data() {
    return {
      viewer:new Object(),
      tileset:new Object(),
      showChart:false,  
      appconsumers:[], 
      // appconsumers:[{id:1,name: '京城第一消纳场',latitude:116.39,longtitude: 39.9,type:5,area:100,volume:400,vedio:500,intakeplantid:1,environparaid:1,safepara:1,waterpara:"这里写水环境影响因子",solfpara:"这里写土壤环境因子",atmpara:"在这里写大气环境影响因子",warnpara:"这里写预警" },
      //           {id:2,name: '京城第二消纳场',latitude:116.47,longtitude: 39.9,type:5,area:100,volume:400,vedio:400,intakeplantid:2,environparaid:2,safepara:2,waterpara:"这里写水环境影响因子",solfpara:"这里写土壤环境因子",atmpara:"在这里写大气环境影响因子",warnpara:"这里写预警" },
      //           {id:3,name: '京城第三消纳场',latitude:116.87,longtitude: 39.9,type:5,area:100,volume:400,vedio:400,intakeplantid:3,environparaid:3,safepara:3,waterpara:"这里写水环境影响因子",solfpara:"这里写土壤环境因子",atmpara:"在这里写大气环境影响因子",warnpara:"这里写预警" },
      //           {id:4,name: '京城第四消纳场',latitude:116.27,longtitude: 39.7,type:5,area:100,volume:400,vedio:400,intakeplantid:4,environparaid:4,safepara:4,waterpara:"这里写水环境影响因子",solfpara:"这里写土壤环境因子",atmpara:"在这里写大气环境影响因子",warnpara:"这里写预警" },
      //           {id:5,name: '京城第五消纳场',latitude:116.47,longtitude: 39.6,type:5,area:100,volume:400,vedio:400,intakeplantid:5,environparaid:5,safepara:5,waterpara:"这里写水环境影响因子",solfpara:"这里写土壤环境因子",atmpara:"在这里写大气环境影响因子",warnpara:"这里写预警" }],
      // showdiv45:false,
      // showdiv6:false,
      showMenu:false,
      //监测是否进行经纬度选择的开关变量,默认情况下不能进行选择
      onOffLatLong:false,
      //鼠标点击的经纬度，将这个数值传到Table中作为录入依据
      pickLat:0,
      pickLon:0,
      //向弹窗里发送的数据
      dataInPopUp:new Object(),
      showThisWindow:false,
      // 发送到Menu组件中的数据
      showBaseMesgInSafty:false,
      showQueryInSafty:false,
      showChartInSafty:false
      
      
      
      


    }
  },
 
  computed:{
   

  },
  created:function(){
  
    
  //接受来自Menu是否显示的消息   
  bus.$on("showSfMenu",(msg)=>{

      this.showMenu=msg
    }),
    // 复位操作
    bus.$on("reShowBaseMesg",(msg)=>{

    this.showBaseMesgInSafty=msg
  }),
    bus.$on("reShowQuery",(msg)=>{

    this.showQueryInSafty=msg
  }),
    bus.$on("reShowChart",(msg)=>{

    this.showChartInSafty=msg
  }),


  //接受来自showSfChart是否显示的消息
  bus.$on("showSfChart",(msg)=>{
    if(msg==true){
      this.showChart=!this.showChart
    }
  }),
  //为了做到数据的全局联动，子组件对appconsumers的所有的操作都传回到父组件
//这里接受来自Table中关于删除之后的得到consumer数据
  bus.$on("cgAppcInTab",(msg)=>{ 
  this.appconsumers=msg  
  }),
  bus.$on("insertInTOAppConsum",(msg)=>{
  this.appconsumers.splice(0,0,msg)
  }),
   //这里接受Talbe中添加到consumer从而改变appconsumers的数据
  bus.$on("updateInTOAppConsum",(msg)=>{
    
    // this.appconsumers[msg[0]]=msg[1]
    this.appconsumers.splice(msg[0],1,msg[1])
   
  }),
  bus.$on("onOffLatLong",(msg)=>{
    this.onOffLatLong=msg

  }),
  //接收popuptable中的修改数据
  bus.$on("showThisWindow",msg=>{
    console.log("showthiswindow变成falsele")
    this.showThisWindow=msg
    console.log(this.showThisWindow)
  })
  },
 
 

  

  components:{
   
    Menu,
    CesiumViewer,
    Table,
    statGraph ,
    graphContainer,
    PopUpTable
    },
  methods:{

    showThisMenu:function(){
      alert("showMenu")
      this.showMenu=true
      console.log("showMenu")
      console.log(this.showMenu);
    

  }
  
 


 
  },
  mounted:function() {
      const result=reqMesAppconsums()
    result.then((v)=>{
      this.appconsumers=Array.prototype.slice.call(v.data.data);
      
     
    })
//设置静态资源目录
    buildModuleUrl.setBaseUrl('./../../static/Cesium/');
    //初始化的时候把视角放在中国
    var china=Cesium.Rectangle.fromDegrees(100,10,120,70);
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = china;
    //创建viewer实例
   
    var url = "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali";
    var google=new Cesium.UrlTemplateImageryProvider({url:url})
    this.viewer = new Cesium.Viewer('cesiumContainer',{
        animation: false,
        baseLayerPicker: false,//表示地形地貌
        fullscreenButton: false,
        //geocoder: false,//搜索框
        homeButton: false,
        // sceneModePicker: false,//表示是2d还是3d
        // selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        infoBox: false,//表示消息栏
        //navigationInstructionsInitiallyVisible: false,
        //地形的提供者
        imageryProvider: google
         
    });

    
    this.viewer._cesiumWidget._creditContainer.style.display = "none";  //去掉logo 

    var ellipsoid=this.viewer.scene.globe.ellipsoid;
    
    // //鼠标的监听事件
    var handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    handler.setInputAction((click)=> {
    // 处理鼠标按下事件
    // 获取鼠标当前位置
    // console.log('1111');
    let pick = this.viewer.scene.pick(click.position);
    
    //选中某模型   pick选中的对象
    // console.log(pick.id.id)
    // console.log(pick.id)
    // this.viewer.entities.remove(pick)
    // alert(pick.id.indexOf("alertor"))
    //对于没有选中任何实体的行为进行忽略
    // alert(pick)
    if( pick!=null){
      // console.log("选中了")
      //如果选中的是消纳场激发
    
      console.log("在saftyapp中进行点击事件description的检测")
      // pick.description
      let thisid=pick.id.id
     
      
      if(thisid!="latLonIndex"){
      let temp=pick.id.description._value
      this.dataInPopUp=temp
      this.showThisWindow=true
  
      }
    
    
      // if(thisid=="latLonIndex"){
      //   //什么都不做

      // }
      if(thisid.indexOf("alertor")!=-1){
        //所有的地图实体的操作都放在了Menu中将移除的操作传递到menu
        bus.$emit("removeAlertId",pick.id.id)
      }
      
      
    }
    //如果接受到Table中关于选取经纬度点的消息，执行
    if (this.onOffLatLong){
      var cartesian=this.viewer.camera.pickEllipsoid(click.position,ellipsoid)
      if(cartesian){

      var cartographic=ellipsoid.cartesianToCartographic(cartesian);
      var bePickedLatitudeNumber =Cesium.Math.toDegrees(cartographic.latitude);
      var bePickedLongitudeNumber=Cesium.Math.toDegrees(cartographic.longitude);
      this.pickLat=Number(bePickedLatitudeNumber.toFixed(4));
      this.pickLon=Number(bePickedLongitudeNumber.toFixed(4));
      //向Menu中发送获取地点的位置数据
      bus.$emit("positionBePicked",[this.pickLon,this.pickLat])
      // console.log("in saftyapp")
      // console.log(this.pickLon)
      // console.log(this.pickLat)
    
      }else{

        alert("请点击有效区域")
      }
     

    }

  }, Cesium.ScreenSpaceEventType.LEFT_DOWN);


//       //得到当前的三维场景的椭球体
//       var ellipsoid=this.viewer.scene.globe.ellipsoid;
// //一个标签
//       var entity=this.viewer.entities.add({
//         label:{
//           show:false
//         }
//       })

//       handler.setInputAction((movement)=>{
// //将鼠标的二维坐标转化为三维的坐标
//         var cartesian=this.viewer.camera.pickEllipsoid(movement.endPosition,ellipsoid)
//         if(cartesian){
//           var cartographic=ellipsoid.cartesianToCartographic(cartesian);
//           var latitudeString =Cesium.Math.toDegrees(cartographic.latitude)
//           var longitudeString=Cesium.Math.toDegrees(cartographic.longitude);
//           var height=Math.ceil(this.viewer.camera.positionCartographic.height)
//           entity.position=cartesian;
//           entity.label.show=true;
//           entity.label.text='(' + latitudeString + ', ' + longitudeString + "," + height + ')' ;

//         }else{
//           entity.label.show=false
//         }
        


//       },Cesium.ScreenSpaceEventType.MOUSE_MOVE)

    //相机的监听事件
    this.viewer.scene.camera.moveEnd.addEventListener(()=>{

    //获取当前相机高度
    var height = Math.ceil(this.viewer.camera.positionCartographic.height);
    // && Menu.myentiys.length!=0
    // && Menu.myentiys.length!=0 
    if(height>200000  ){ 
      this.viewer.entities.show=true;
    
    } 
    if(height<200000 ){

      this.viewer.entities.show=true;
    }  
     if(height<100000 ){

    // this.viewer.zoomTo(this.tileset)
    // alert(this.viewer.camera.positionCartographic )
    }  
  });
  this.tileset=new Cesium.Cesium3DTileset({
    url: Cesium.IonResource.fromAssetId(6074)
  })
  this.viewer.scene.primitives.add(this.tileset)

 
  
  },

}



</script>

<style>
*{
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
}
.div3{
    /* display: block;
    float: right;width:100%;
    position: fixed;top: 40px;                          bottom: 0;
    overflow: auto;
     */
    /* display: block; */
    position: absolute;
    /* margin-top: 80px; */
    top:88px;
    bottom: 0px;
    overflow: hidden;
    margin-top: 0px;
    left: 0;
    border: none;
    width: 100%;
    /* height: calc(100%-88px); */
    z-index: 1;

}
.loadingOverlay {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.9;
    width: 100%;
    height: 300px;
    background-color: aliceblue;
    text-align: 100%;
    color: white;
    z-index: 2
}
/* header的东西 */
#header{
	width: 100%;
	margin: 0 auto; /*水平居中*/
	background: #030829;
  overflow: hidden;
  margin-bottom: 0px;
 

	height:88px;
}
#header a{
	color: white;
	line-height:40px;
	text-decoration: none;
}
#header .nav_image{
	vertical-align:middle;
}
#header li:hover{
	/* color:#111111; */
	/* background: linear-gradient(to bottom,#EEEEEE,#555555); */
	/* border:2px solid aqua; */
	box-shadow: -10px 0px 15px #034c6a inset, 
    0px -10px 15px #034c6a inset, 
    10px 0px 15px #034c6a inset, 
    0px 10px 15px #034c6a inset;
	border-radius:5px;
}
.left_nav{
	
	float: left;
	overflow: hidden;
	width: 30%;
	text-align: center;
	margin-top: 22px;
}
.right_nav{
	
	float:right;
	overflow: hidden;
	width: 30%;
	text-align: center;
	margin-top: 22px;
}
.header_center{
	float: left;
	overflow: hidden;
	text-align: center;
	width: 40%;
	background-image: url("./img/logoBg.png");
  background-size:100% 100%;
  /* 修改 */
	height: 88px;
	/* background: url('logoBg.png') */
}
.header_center h2{
	font-size: 18px;
	margin-top: 15px;
}
.color_font{
	margin-top: 10px;
	font-size:15px;
}
#header a{
	font-size: 16px 
}

.left_nav .nav_li{

	list-style: none;
	height: 40px;
	text-align: center;
	display:inline-block;
	/* margin:0 50px; */
	width: 110px;

}
.right_nav .nav_li{
	list-style: none;
	height: 40px;
	text-align: center;
	display:inline-block;
	margin:0 10px;
	width: 110px;
}
#header a{
	color: white;
	line-height:40px;
	text-decoration: none;
}
#header .nav_image{
	vertical-align:middle;
}
#header li:hover{
	/* color:#111111; */
	/* background: linear-gradient(to bottom,#EEEEEE,#555555); */
	/* border:2px solid aqua; */
	box-shadow: -10px 0px 15px #034c6a inset, 
    0px -10px 15px #034c6a inset, 
    10px 0px 15px #034c6a inset, 
    0px 10px 15px #034c6a inset;
	border-radius:5px;
}
/* 车辆监控 */
/* #m_v{
	box-shadow: -10px 0px 15px #034c6a inset, 
    0px -10px 15px #034c6a inset, 
    10px 0px 15px #034c6a inset, 
    0px 10px 15px #034c6a inset;
	border-bottom: 4px solid #4b8df8;
	border-radius:5px;
} */

#mv{
	position: absolute;
	display: none;
	background: #030829;
	margin-top:-2px;
	margin-left: 0px;
	/* padding: 4px; */
	z-index: 100;

}

#m_v:hover #mv{
	display: block;
}
#mv li{
	list-style: none;	
	text-align: center;

}
#mv li:hover{
	box-shadow: -10px 0px 15px #034c6a inset, 
    0px -10px 15px #034c6a inset, 
    10px 0px 15px #034c6a inset, 
    0px 10px 15px #034c6a inset;

}
#mv li a input{
	vertical-align: middle;
	
}
/* 产生源 */

#cs{
	position: absolute;
	display: none;
	background: #030829;
	margin-top:-2px;
	margin-left: 0px;
	/* padding: 4px; */
	z-index: 100;

}

#c_s:hover #cs{
	display: block;
}
#cs li{
	list-style: none;	
	text-align: center;

}
#cs li:hover{
	box-shadow: -10px 0px 15px #034c6a inset, 
    0px -10px 15px #034c6a inset, 
    10px 0px 15px #034c6a inset, 
    0px 10px 15px #034c6a inset;

}
#cs li a input{
	vertical-align: middle;
	
}
/* 资源场 */
#r_f{
	box-shadow: -10px 0px 15px #034c6a inset, 
    0px -10px 15px #034c6a inset, 
    10px 0px 15px #034c6a inset, 
    0px 10px 15px #034c6a inset;
	border-bottom: 4px solid #4b8df8;
	border-radius:5px;
}
 #rf{
	position: absolute;
	display: none;
	background: #030829;
	margin-top:-2px;
	margin-left: 0px;
	/* padding: 4px; */
	z-index: 100;

}

#r_f:hover #rf{
	display: block;
}
#rf li{
	list-style: none;	
	text-align: center;

}
#rf li:hover{
	box-shadow: -10px 0px 15px #034c6a inset, 
    0px -10px 15px #034c6a inset, 
    10px 0px 15px #034c6a inset, 
    0px 10px 15px #034c6a inset;

}
#rf li a input{
	vertical-align: middle;
	
}
/* ziyuanchang*/
 #gf{
	position: absolute;
	display: none;
	background: #030829;
	margin-top:-2px;
	margin-left: 0px;
	/* padding: 4px; */
	z-index: 100;

}

#g_f:hover #gf{
	display: block;
}
#gf li{
	list-style: none;	
	text-align: center;

}
#gf li:hover{
	box-shadow: -10px 0px 15px #034c6a inset, 
    0px -10px 15px #034c6a inset, 
    10px 0px 15px #034c6a inset, 
    0px 10px 15px #034c6a inset;

}
#gf li a input{
	vertical-align: middle;
	
}
/* 消纳场 */

 #xn{
	position: absolute;
	display: none;
	background: #030829;
	margin-top:-2px;
	margin-left: 0px;
	/* padding: 4px; */
	z-index: 100;

}

#x_n:hover #xn{
	display: block;
}
#xn li{
	list-style: none;	
	text-align: center;

}
#xn li:hover{
	box-shadow: -10px 0px 15px #034c6a inset, 
    0px -10px 15px #034c6a inset, 
    10px 0px 15px #034c6a inset, 
    0px 10px 15px #034c6a inset;

}
#xn li a input{
	vertical-align: middle;
	
}
.itemDiv{
    display:table-cell;
  
}

</style>
