<template>
  <div>
   <div>
    <div id="header">
		<div class="left_nav">
			<ul>
				<li class="nav_li" id="h_p_h">
          <router-link  to="/home"> <img  src="./img/nav_p.png" class="nav_image"> 首页</router-link> </li>
				<li class="nav_li" id="c_s"><a href="#"><img  src="./img/nav_c.png" class="nav_image"> 产生源监测</a> 
					<ul id="cs" >
						<li><router-link class="a_c" to="/source"><img src="./img/car_mon.png" class="nav_image"/> 产生源地图</router-link></li>
						<li><router-link to="/source/info" class="menu"  id="trace" value = "1"><img  src="./img/trace.png" class="nav_image"/>基本信息</router-link></li>
						<li><router-link to="/source/statistics"> <img  src="./img/table.png" class="nav_image"/>信息统计</router-link></li>
                        <li><router-link to="/source/info2"> <img  src="./img/etinfo.png" class="nav_image"/>信息维护</router-link></li>
                    </ul>
				</li>
				<li class="nav_li" id="m_v">
				 <a href="#"><img class="nav_image" src="./img/nav_car.png"> 车辆监控</a> 
					<ul id="mv" >
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
				<li class="nav_li" id="r_f"><router-link to="/saftyApp"><img class="nav_image" src="./img/nav_z.png"> 消纳场监测</router-link> 
				</li>

				<li class="nav_li" id="g_f"><a href="#"><img class="nav_image" src="./img/nav_x.png"> 资源场监测</a> 
					<ul id="gf" >
						<li><router-link class="a_c" to="/mainViewer"><img  src="../Home/img/monitor_vehicle/car_mon.png" /> 地理位置</router-link></li>
						<li><router-link to="/query" class="menu"  id="trace" value = "1"><img  src="../Home/img/monitor_vehicle/trace.png" /> 资源场信息</router-link></li>
						<li><router-link to="/static"> <img  src="../Home/img/monitor_vehicle/table.png" />信息统计</router-link></li>            
            		</ul>
				</li>
				<li class="nav_li" id="c_i">	
        <router-link  to="/manage">用户管理</router-link> </li>
        <img  src="../Home/img/nav_10.png" @click ="loginout()"/>
			</ul>
		</div>
	</div>
</div>

    <div id="bd" :style="backgroundDiv">
      <data-table></data-table>

    </div>
  </div>
</template>
<script>

import Vue from "vue";
import DataTable from './DataTable'
export default {

   components: {
    DataTable
  },

data() {
    return {
      backgroundDiv: {
        // src\assets
       
        hight: "",
        weight: ""       
      },
      pass: "",
      namel: "",
      flag: true,
      identity: ""
    };
  },
  created() {
    this.hh();
  },
  methods:{
       hh() {
      this.backgroundDiv.height = window.innerHeight -94 + "px";
      this.backgroundDiv.weight = window.innerWeight + "px";
    },
     loginout() {
      this.$router.replace("/");
    },
    home(){
      this.$router.replace("/home");
    },
  }
};
</script>

<style>
/* @import "../../static/css/style.css";
 */

.itemDiv {
  display: table-cell;
}
body,div,p,#header ul,#header li,dl,dt,dd,h1,a{
	margin: 0px;
	padding: 0px;
	
}
#header{
	width: 100%;
	margin: 0 auto; /*水平居中*/
	background: #030829;
	overflow: hidden;
	height: 88px;
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
/* 首页 */
#h_p_p{
	box-shadow: -10px 0px 15px #034c6a inset, 
    0px -10px 15px #034c6a inset, 
    10px 0px 15px #034c6a inset, 
    0px 10px 15px #034c6a inset;
	border-bottom: 4px solid #4b8df8;
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
/* 消纳场 */
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


#bd{
     /* filter: blur(9px);
        color: white;
        background-color: #000000 */
		width: 100%;
  background-color: #081832;
  padding-top: 20px;
}
</style>
