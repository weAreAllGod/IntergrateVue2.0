<template>
    <div id="header">
		<div class="left_nav">
			<ul>
				<!-- <img class="nav_image" src="./image/monitor_vehicle/table.png" /> -->
				<li class="nav_li" id="h_p" ><router-link  to="/home"><img src="./image/monitor_vehicle/nav_p.png" class="nav_image"/> 首页</router-link> </li>
				<li class="nav_li" id="c_s" ><a href="#"><img src="./image/monitor_vehicle/nav_c.png" class="nav_image"/> 产生源监测</a> 
					<ul id="cs" >
						<li><router-link class="a_c" to="/source"><img src="./image/monitor_vehicle/car_mon.png" class="nav_image"/> 产生源地图</router-link></li>
						<li><router-link to="/source/info" class="menu"  id="trace" value = "1"><img  src="./image/monitor_vehicle/trace.png" class="nav_image"/>基本信息</router-link></li>
						<li><router-link to="/source/statistics"> <img  src="./image/monitor_vehicle/table.png" class="nav_image"/>信息统计</router-link></li>
						<li><router-link to="/source/info2"> <img  src="./image/monitor_vehicle/etinfo.png" class="nav_image"/>信息维护</router-link></li>
					</ul>
				</li>
				<li class="nav_li" id="m_v">
					<a href="#"><img class="nav_image" src="./image/monitor_vehicle/nav_car.png"> 车辆监控</a>
					<ul id="mv">
						<li><router-link class="a_c" to="/Monitor/MonitorVehicle"><img class="nav_image" src="./image/monitor_vehicle/car_mon.png" /> 实时监控</router-link></li>
						<li><router-link to="/Monitor/HistoricalTrack" class="menu"  id="trace" value = "1"><img class="nav_image" src="./image/monitor_vehicle/trace.png" />历史轨迹</router-link></li>
						<li><router-link to="/Monitor/Graph"> <img class="nav_image" src="./image/monitor_vehicle/table.png" />统计分析</router-link></li>
                        <li><router-link to="/Monitor/Info"> <img class="nav_image" src="./image/monitor_vehicle/etinfo.png" />信息录入</router-link></li>
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
				<li class="nav_li" id="r_f" ><router-link to="/saftyApp"><img class="nav_image" src="./image/monitor_vehicle/nav_z.png"> 消纳场监测</router-link> 
				</li>

				<li class="nav_li" id="g_f"><a href="#"><img class="nav_image" src="./image/monitor_vehicle/nav_x.png"> 资源场监测</a> 
					<ul id="gf">
						<li><router-link class="a_c" to="/mainViewer"><img class="nav_image" src="./image/monitor_vehicle/car_mon.png" /> 地理位置</router-link></li>
						<li><router-link to="/query" class="menu"  id="trace" value = "1"><img class="nav_image" src="./image/monitor_vehicle/trace.png" />资源场信息</router-link></li>
						<li><router-link to="/static"> <img class="nav_image" src="./image/monitor_vehicle/table.png" />信息统计</router-link></li>
                    </ul>
				</li>
				<li class="nav_li" id="c_i"><router-link  to="/manage">用户管理</router-link> </li>
				<img  src="./image/monitor_vehicle/nav_10.png" @click ="loginout()"/>
			</ul>
		</div>
            
	</div>

</template>
<script>
export default {
	data(){
		return{
			judge:[['h_p',false], ['c_s',false], ['m_v',false], ['r_f',false], ['g_f',false],['c_i',false]]
		}
	},
	methods:{
		loginout() {
      this.$router.replace("/");
    },
		clickmenu(event){
			// console.log(event.currentTarget);
			// document.getElementById().style.borderRadius 
			var navli = document.getElementsByClassName('nav_li');
			console.log(navli.length)
			for(var count = 0; count<navli.length;count++){
				console.log(1111)
				navli[count].style.borderBottom = "none";
				navli[count].style.boxShadow = "none";
				navli[count].style.borderRadius = "none"
			}
			event.currentTarget.style.borderBottom = '4px solid #4b8df8'
			event.currentTarget.style.boxShadow = '-10px 0px 15px #034c6a inset, 0px -10px 15px #034c6a inset, 10px 0px 15px #034c6a inset, 0px 10px 15px #034c6a inset'
			event.currentTarget.style.borderRadius = '5px'

			var code = event.currentTarget.id
			for(var cou = 0;cou<this.judge.length;cou++){
				if(this.judge[cou][0] ==code){
					this.judge[cou][1] = true
				}else{
					this.judge[cou][1] = false
				}
				
			}
			// this.judge.m_v = true;
		},
		clicksubmenu(event){
			var navli = document.getElementsByClassName('nav_li');
			console.log(navli.length)
			for(var count = 0; count<navli.length;count++){
				navli[count].style.borderBottom = "none";
				navli[count].style.boxShadow = "none";
				navli[count].style.borderRadius = "none"
			}
			event.currentTarget.parentNode.style.borderBottom = '4px solid #4b8df8'
			event.currentTarget.parentNode.style.boxShadow = '-10px 0px 15px #034c6a inset, 0px -10px 15px #034c6a inset, 10px 0px 15px #034c6a inset, 0px 10px 15px #034c6a inset'
			event.currentTarget.parentNode.style.borderRadius = '5px'

			var code = event.currentTarget.parentNode.id
			console.log(code)
			for(var cou = 0;cou<this.judge.length;cou++){
				if(this.judge[cou][0] ==code){
					this.judge[cou][1] = true
				}else{
					this.judge[cou][1] = false
				}
				
			}
		},
		enter(event){
			event.currentTarget.style.boxShadow = '-10px 0px 15px #034c6a inset, 0px -10px 15px #034c6a inset, 10px 0px 15px #034c6a inset, 0px 10px 15px #034c6a inset'
			event.currentTarget.style.borderRadius = '5px'
		},
		leave(event){
			
			var navli = document.getElementsByClassName('nav_li');
			for(var count = 0; count<navli.length;count++){
				navli[count].style.boxShadow = "none";
				navli[count].style.borderRadius = "none"
				var code =  navli[count].id
				for(var cou = 0;cou<this.judge.length;cou++){
					if(code == this.judge[cou][0] && this.judge[cou][1] == true){
						navli[count].style.boxShadow = '-10px 0px 15px #034c6a inset, 0px -10px 15px #034c6a inset, 10px 0px 15px #034c6a inset, 0px 10px 15px #034c6a inset'
						navli[count].style.borderRadius = '5px'
					}
			}
				
			}
			
		}

	}
}
</script>

<style scoped>
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
	background-image: url("./image/monitor_vehicle/logoBg.png");
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
/* 车辆监控 */
#m_v{
	box-shadow: -10px 0px 15px #034c6a inset, 
    0px -10px 15px #034c6a inset, 
    10px 0px 15px #034c6a inset, 
    0px 10px 15px #034c6a inset;
	border-bottom: 4px solid #4b8df8;
	border-radius:5px;
}

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
</style>
