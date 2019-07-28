<template>
 
 <body id="appStatGraph" >

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
				<li class="nav_li" id="g_f"><router-link to="/saftyApp"><img  src="./img/nav_z.png"/> 消纳场监测</router-link> 
              <ul id="gf" >
						<li @click="showBaseMesgInSafty=true"><router-link class="a_c" to="/saftyApp"><img  src="./img/car_mon.png" />基本信息</router-link></li>
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





		
		<div id="clear">
		</div>
		<div id="content" >
			<div id="contain" class="containe">
                
				<div class="left">
					
					<div class="heti">影响因子占比饼图</div>
					<div style="margin-top:17px">
						<div id='test'  style=" width: 600px;height: 300px;margin-left: 10px;line-height: 300px;z-index:10;margin-top:100px" ref="myEchart2">
          </div>
					</div>
				</div>

				<div class="right">
					<div class="heti">影响因子分析折线图</div>
					<div style="margin-top:17px">
					<div id='test'  style=" width: 600px;height: 300px;margin-left: 10px;line-height: 300px;z-index:10;margin-top:100px" ref="myEchart">
          </div>
					</div>
				</div>
				
			</div>
		</div>
	
 </body>

</template>
<script>
import echarts from 'echarts'
export default {
  name:"statGraph",
  // name:'statGraph',
  // props: {
  //   className: {
  //     type: String,
  //     default: 'yourClassName'
  //   },
  //   id: {
  //     type: String,
  //     default: 'yourID'
  //   },
  //   width: {
  //     type: String,
  //     default: '500px'
  //   },
  //   height: {
  //     type: String,
  //     default: '500px'
  //   }
  // },
  data() {
    return {
      chart: null,
      chart2:null
    }
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (!this.chart2) {
      return
    }
    this.chart.dispose();
    this.chart = null;
    this.chart2.dispose();
    this.chart2 = null;
  },
  methods: {
  initChart() {
    this.chart = echarts.init(this.$refs.myEchart);
      // 把配置和数据放这里
      this.chart.setOption({

          // color: ['#3398DB'],
          // title:{
          //     text: '各消纳场因子分析折线图',
          //     subtext: '实验数据'
          // },
      		tooltip : {
						trigger: 'axis'
					},
					legend: {
            data:['因子1','因子2','因子3','因子4','因子5'],
            textStyle:{
                  color: 'white'
              }  
          
					},
					toolbox: {
						show : true,
						feature : {
							mark : {show: true},
							dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              // magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},

							// restore : {show: true},
							// saveAsImage : {show: true}
            },
            x: 'right',                // 水平安放位置，默认为全图右对齐，可选为：
                                  // 'center' ¦ 'left' ¦ 'right'
                                  // ¦ {number}（x坐标，单位px）
            y: 'bottom',                  // 垂直安放位置，默认为全图顶端，可选为：'top' ¦ 'bottom' ¦ 'center'
                 
					},
					calculable : true,
					xAxis : [
						{
							type : 'category',
							boundaryGap : false,
              data : ['周一','周二','周三','周四','周五','周六','周日'],
              position:"center",
              axisLabel:{
                textStyle:{
                    color: 'white'
                }     

              },
            
           
            },
           
  
          ],
        
        
					yAxis : [
						{
              type : 'value',
              axisLabel:{
              textStyle:{
                  color: 'white'
              }     

              },
						}
					],
					series : [
						{
							name:'因子1',
							type:'line',
							stack: '总量',
							data:[120, 132, 101, 134, 90, 230, 210]
						},
						{
							name:'因子2',
							type:'line',
							stack: '总量',
							data:[220, 182, 191, 234, 290, 330, 310]
						},
						{
							name:'因子3',
							type:'line',
							stack: '总量',
							data:[150, 232, 201, 154, 190, 330, 410]
						},
						{
							name:'因子4',
							type:'line',
							stack: '总量',
							data:[320, 332, 301, 334, 390, 330, 320]
						},
						{
							name:'因子5',
							type:'line',
							stack: '总量',
							data:[820, 932, 901, 934, 1290, 1330, 1320]
						}
					]     
     }),
  
        
    this.chart2= echarts.init(this.$refs.myEchart2);
        this.chart2.setOption({
        angleAxis: {
            axisLabel:{
                textStyle:{
                    color: 'white'
                }     
            },
    

        },
        radiusAxis: {
            type: 'category',
            axisLabel:{
            textStyle:{
                color: 'red'
            }     
            },
            data: ['周一', '周二', '周三', '周四'],
            z: 10,
            
            
        },
        polar: {
            
        },
        series: [{
            type: 'bar',
            data: [1, 2, 3, 4],
            coordinateSystem: 'polar',
            name: 'A',
            stack: 'a'
        }, {
            type: 'bar',
            data: [2, 4, 6, 8],
            coordinateSystem: 'polar',
            name: 'B',
            stack: 'a'
        }, {
            type: 'bar',
            data: [1, 2, 3, 4],
            coordinateSystem: 'polar',
            name: 'C',
            stack: 'a'
        }],
        legend: {
            show: true,
            data: ['A', 'B', 'C']
        }
        });
    
    
    
    }
  }
}
</script>
<style>
body,div,p,dl,dt,dd,h1,a{
	margin: 0px;
	padding: 0px;
	
}
.left{
	
	float: left;
	width: 48%;
    box-shadow: -10px 0px 15px #034c6a inset, /*å·¦è¾¹é˜´å½±*/
				0px -10px 15px #034c6a inset, /*ä¸Šè¾¹é˜´å½±*/
				10px 0px 15px #034c6a inset, /*å³è¾¹é˜´å½±*/
				0px 10px 15px #034c6a inset;
    border: 1px solid #034c6a;
    /* box-sizing: border-box; */
	position: relative;
	margin-left: 1%;
	height: 500px;
	margin-top: 100px;

}
.right{
	width: 48%;
	float: left;
	height: 500px;
	margin-left: 2%;
	margin-top: 100px;
	/* overflow: hidden; */
	position: relative;
	/* box-sizing: border-box; */
	box-shadow: -10px 0px 15px #034c6a inset, 
 				0px -10px 15px #034c6a inset, 
				10px 0px 15px #034c6a inset, 
 				0px 10px 15px #034c6a inset;

}
#contain{
	overflow: hidden;
	width: 100%;
	background-color: #081832;;
}
.heti{
	background-color: #034c6a;
    border-radius: 18px;
    height: 35px;
    width: 60%;
	top: -15px;
	/* margin-top: -15px; */
    color: white;
    font-weight: bold;
    font-size: 16px;
    left: 20%;
    line-height: 35px;
	text-align: center;
	position: absolute;
	z-index: 3;
	text-align: center;
	/* margin-left: 20%; */
}
#header{
	width: 100%;
	margin: 0 auto; /*水平居中*/
	background: #030829;
	overflow: hidden;
	height: 88px;
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

</style>
