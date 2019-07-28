<template>
    <div id="app">
		<Vew></Vew>
		<div id="clear">
		</div>
		<div id="content">
			<div id="left_content" @mouseover="enter($event)" @mouseout="leave($event)">
				<div id="nav1" style="margin-top: 20px; margin-left: 20px;" >
					<ul id="carmenu" v-for="(item,index) in company_list" :key="index">
						<li>
							<input type="checkbox" :value="item.CAR_COMPANY_NAME"   @click="CheckItem(item)"/>{{item.CAR_COMPANY_NAME}}
							<ul v-for="(item1,index) in carbelong_list" :key="index"  class="le" :value="item1.CAR_BELONG_COMPANY" style="display: none;">
								<li v-if="item1.CAR_BELONG_COMPANY===item.CAR_COMPANY_NAME" class="left_li" ><input type="checkbox" :value="item1.CAR_BELONG_COMPANY" @click.stop="CheckItem1(item1)"><img class="p_r" v-if="item1.value!='J00001'" src="./image/run.png" />{{item1.CAR_NAME}}</li>
							</ul>
						</li>
					</ul>
				</div>
				<div id="menu">菜<br><br>单<br><br>栏</div>
			</div>
			<!-- <div id="ent"></div> -->

			<div id="right">
				
			</div>

				<!-- 车辆信息的窗口 -->
			<div id="floatWindow" class="table_p"> 
				<div id='one'>
					<a id='close' href="#" style="text-decoration: none;font-size:20px; color: white;" @click="fclose">×</a>
				</div>
				<table>
					<tr>
						<th>指标</th>
						<th>状态</th>
					</tr>
					
					<tr><td class="m_td">车牌</td><td class="d_td">{{cardata.CAR_ID}}</td></tr>
					<tr><td class="m_td">坐标</td><td class="d_td">{{cardata.CAR_LONG}}/{{cardata.CAR_LAT}}</td></tr>
					<tr><td class="m_td">位置</td><td class="d_td">{{pos}}</td></tr>
					<tr><td class="m_td">速度</td><td class="d_td">{{cardata.SPEED}}</td></tr>
					<tr><td class="m_td">海拔</td><td class="d_td">{{cardata.HEIGHT}}</td></tr>
					<tr><td class="m_td">密闭</td><td class="d_td">{{cardata.AIRTIGHT}}</td></tr>
					<tr><td class="m_td">举升</td><td class="d_td">{{cardata.LIFT}}</td></tr>
					<tr><td class="m_td">里程</td><td class="d_td">{{cardata.MILE}}</td></tr>
				
				</table>
			</div>

			<div id="videoWindow"> 
				<div id='one'>
					<a id='close' href="#" style="text-decoration: none; font-size:20px; color: white;" @click="vclose">×</a>
				</div>
				<form style="text-align: center;font-size:16px;">
						<label>信号源:</label>
						<br>
						<input type="radio" name="gender" value="1" checked="true"> 1
						<input type="radio" name="gender" value="2"> 2
						<input type="radio" name="gender" value="3"> 3
						<input type="radio" name="gender" value="4"> 4
					</form>
				<video width="250" height="240" controls>
					<source src="http://fishc.oss-cn-hangzhou.aliyuncs.com/Web/video_tag.mp4"  type="video/mp4">
				</video>
			</div>
		</div>
		<div id="footer">
			<p>
				<a href="#">关于</a>
				<a href="#">广告</a>
				<a href="#">联系</a>
				<a href="#">合作</a>
				<a href="#"> 版权</a>
			</p>
			<p>
				<!-- <a href="#">京ICP备 0000001号</a> -->
				<!-- <a href="#">京ICP备 0000001号</a> -->
				All right(C) 2008-2010 resved.
			</p>
		</div>
		</div>
</template>


<script>

import axios from 'axios'
import Vew from './View.vue'
import carla from './image/monitor_vehicle/car1.png'
import carala from './image/monitor_vehicle/car_a.png'
import { mixedTypeAnnotation } from '@babel/types';
// import BMapLib from 'BMapLib'
export default {

    name: 'MonitorVehicle', 
    data() {
        return{
		company_list: [],
		carbelong_list: [],
		obj_line: [], //存放线路的数据
		obj_car: [], //存放车辆的数据
		point_pre: [], //存放第一个点的数据
		cun: [],//存放查询第几条数据
		car_line: [],
		obj_va:[],
		obj_judge:[],
		marker_judge:[],
		marker_click:[],
		colo:["red","green","black"],
		car_length:0,
		sum:-1,//存放车辆的数量
		map:'',
		cardata:'',
		carMk_af:'',
		pos:'',
		apolygon:'',
		apolygon_admin_region:'',
		da_few: '', 
        }
	},
	components:{
    	Vew,
  	},
	mounted:function(){
        // console.log(ssss);
		this.map = new BMap.Map("right");
		// 创建地图实例  
		var point = new BMap.Point(116.408208, 39.913963);
		// 创建点坐标  
		this.map.centerAndZoom(point, 10);
		//能移动
		this.map.enableScrollWheelZoom(true); 
		var opt_sca = {anchor:BMAP_ANCHOR_BOTTOM_LEFT};//定义控件位置
		
		this.map.addControl(new BMap.NavigationControl());    
		this.map.addControl(new BMap.ScaleControl(opt_sca));    
		this.map.addControl(new BMap.OverviewMapControl());    
		this.map.addControl(new BMap.MapTypeControl());    
		// midnight
		this.map.setMapStyle({style:'light'});

		// ./image/monitor_vehicle/car_a.png
		var myIcon = new BMap.Icon(carala, new BMap.Size(48, 48), {
			        // 指定定位位置。   
			        // 当标注显示在地图上时，其所指向的地理位置距离图标左上
			        // 角各偏移10像素和25像素。您可以看到在本例中该位置即是   
			        // 图标中央下端的尖角位置。    
			        anchor: new BMap.Size(24, 24),
			        // 设置图片偏移。   
			        // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您   
			        // 需要指定大图的偏移位置，此做法与css sprites技术类似。    
			        imageOffset: new BMap.Size(0, 0)// 设置图片偏移    
			    }); 
        this.carMk_af = new BMap.Marker(point,{icon:myIcon});
		
		
		//设置电子围栏
		// var apolygon_points=new Array();
		// apolygon_points.push(new BMap.Point(116.224895,39.999222));
		// apolygon_points.push(new BMap.Point(116.288136,39.838078));
		// apolygon_points.push(new BMap.Point(116.490506,39.838965));
		// apolygon_points.push(new BMap.Point(116.538799,39.977994));
		// this.apolygon = new BMap.Polygon(apolygon_points, {
		//                              strokeColor: "red",
		//                              strokeWeight: 2,
		//                              strokeOpacity: 0.5,
		//                              fillOpacity: 0.4
		//                          });
		// this.map.addOverlay(this.apolygon);

		this.getBoundary();

		axios({
			headers: {
                  token: this.$store.state.token
                },
			method:'get',
			url:'/api/CarCompany/select'
		}).then((data)=>{
			this.company_list = data.data.data;
			console.log(this.company_list);
		});
		
		
		axios({
			headers: {
                  token: this.$store.state.token
                },
			method:'get',
			url: '/api/CarBelong/select'
		
		}).then((data)=>{
			this.carbelong_list = data.data.data;
			console.log(this.carbelong_list);
		});
		
    },
    beforeDestroy: function () {
        for (var i =0; i<this.obj_judge.length; i++){
            this.obj_judge[i] = false;
		}
		this.vclose();
    },
	methods:{
		run:function(CarName){		
			var url='/api/carTrailInfo/select/'+ '?id=0&carname='+CarName;
			axios({
				headers: {
                  token: this.$store.state.token
                },
				method:'get',
				url
			
			}).then((data)=>{
				
		
			var myIcon = new BMap.Icon(carla, new BMap.Size(48, 48), {
			        // 指定定位位置。   
			        // 当标注显示在地图上时，其所指向的地理位置距离图标左上
			        // 角各偏移10像素和25像素。您可以看到在本例中该位置即是   
			        // 图标中央下端的尖角位置。    
			        anchor: new BMap.Size(24, 24),
			        // 设置图片偏移。   
			        // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您   
			        // 需要指定大图的偏移位置，此做法与css sprites技术类似。    
			        imageOffset: new BMap.Size(0, 0)// 设置图片偏移    
			    }); 
			

			var ve_info_pre = data.data.data;
			var ss = this.wgs2bd(ve_info_pre[0].CAR_LAT, ve_info_pre[0].CAR_LONG)
			var point_pre = new BMap.Point(ss[1], ss[0]);
			this.point_pre[this.sum] = ss;
			var ce_lat = 0;
			var ce_long = 0; 
			for(var co = 0; co<this.point_pre.length;co++){
				ce_lat = ce_lat + this.point_pre[co][0]
				ce_long = ce_long + this.point_pre[co][1]
			}
			var cen = new BMap.Point(ce_long/this.car_length, ce_lat/this.car_length);
			this.map.centerAndZoom(cen, 12);

			for(var ce = 0; ce<this.point_pre.length; ce++){
				if(this.point_pre[ce][0] != 0 && this.point_pre[ce][1] != 0 ){
				var pos = new BMap.Point(this.point_pre[ce][1], this.point_pre[ce][0]);
				var bound=this.map.getBounds();
				if(bound.containsPoint(pos)==true){
				}else{
					while(1){
						this.map.zoomOut();
						var bound=this.map.getBounds();
						if(bound.containsPoint(pos)==true){
							break;
						}
					}
				}					
			}
			}
			var carMk = new BMap.Marker(point_pre,{icon:myIcon});
			this.map.addOverlay(carMk);
			this.obj_car[this.sum] = carMk;
			resetMkPoint(this.map, this.sum, this.cun, this.obj_line, this,CarName,point_pre);

			function resetMkPoint(map, sum, cun, obj_line,th,CarName,point_pre){
				var car_i = "{'id':" + cun[sum] + ", 'Carname':"+CarName+"}"
					url='/api/carTrailInfo/select/'+'?id='+cun[sum]+'&carname='+CarName;
					axios({
						headers: {
                  			token: th.$store.state.token
                		},
						method:'get',
						url: url
					}).then((data)=>{
					const ve_info_aft = data.data.data;
					if(ve_info_aft[0]!=null){

					var ss_a = th.wgs2bd(ve_info_aft[0].CAR_LAT, ve_info_aft[0].CAR_LONG)
					var point_aft = new BMap.Point(ss_a[1], ss_a[0]);
					
					th.setRotation(point_pre,point_aft,th.obj_car[sum])
					th.obj_car[sum].setPosition(point_aft);
					
                    
					const polyline = new BMap.Polyline([
						point_pre,
						point_aft
						],
						{strokeColor:th.colo[sum], strokeWeight:6, strokeOpacity:0.5}
						);
					th.car_line[sum][cun[sum]-1] = polyline;
					map.addOverlay(polyline);
					}
					// var infoWindow = new BMap.InfoWindow(th.sContent);
					var han = function(){
						for(var m_l=0; m_l<th.marker_judge.length;m_l++){
							th.marker_judge[m_l]=false;
						}
						th.marker_judge[sum] = true;
					};
					// var close = function(){
					// 	th.marker_judge[sum] = false
					// };
					// infoWindow.addEventListener("clickclose", close);

					var ht = th.obj_car[sum].addEventListener("click", han);
					if(th.marker_judge[sum]){
						th.setRotation(point_pre,point_aft,th.carMk_af)
						th.carMk_af.setPosition(point_aft);
						th.carMk_af.setTop(true);
						th.map.addOverlay(th.carMk_af);
						
						axios({
							headers: {
                  				token: th.$store.state.token
                			},
							method:'get',
							url: '/apmap/geocoder/v2/?location='+ss_a[0]+','+ss_a[1]+'&output=json&pois=1&latest_admin=1&ak=hKwhYngdC7zlLhqNekMxrMXgnhWfxI6r'
						}).then((data)=>{
							console.log(data.data)
							console.log(data.data.result.formatted_address);
							th.pos= data.data.result.formatted_address
							// console.log(ve_info_aft[0])
						});
						th.cardata = ve_info_aft[0];
						console.log(th.cardata)
						document.getElementById('floatWindow').style.display = 'block'
						document.getElementById('videoWindow').style.display = 'block'
					}
					th.marker_click[sum][cun[sum]-1] = ht
					console.log("hshfh",th.marker_click)
					if(th.marker_click[sum].length != 1){
						th.obj_car[sum].removeEventListener("click", han)
						th.marker_click[sum].splice(cun[sum] - 1, 1)
					}

					point_pre = point_aft;
					
				});
			
				if(th.obj_judge[sum]){
					setTimeout(function(){
						cun[sum]++;
						resetMkPoint(map, sum, cun, obj_line,th,CarName,point_pre);
					}, 1500);
				}
			}
			});
		},
		CheckItem:function(item){
            item.state = !item.state;
            console.log(item)
			var le = document.getElementsByClassName('le');
			console.log(item.CAR_COMPANY_NAME,le[0].getAttribute("value"))
			for(var i=0;i<le.length;i++){
				if(item.state == false && item.CAR_COMPANY_NAME == le[i].getAttribute("value")){
					// this.dis = 'none';
					le[i].style.display='none';


				}else if(item.state == true && item.CAR_COMPANY_NAME == le[i].getAttribute("value")){
					le[i].style.display='block';
					
					
				}
			}
            
		},
		CheckItem1:function(item){
			item.state = !item.state;

			if(item.state == true){
			this.sum ++;
			this.car_length ++;
			this.cun[this.sum] = 1;
			this.obj_judge[this.sum] = true;
			this.obj_va[this.sum] = item.CAR_NAME;
			this.car_line[this.sum] = [];
			this.marker_click[this.sum] = [];
			this.run(item.CAR_NAME);
			}else{
				for(var su = 0; su<this.obj_va.length; su++){
					if(this.obj_va[su] == item.CAR_NAME){

						console.log(su)
						console.log(this.obj_car);
						console.log(this.car_line);
						this.obj_judge[su] = false;

						console.log('ddddddd'+this.car_line[su]);
						for(var m = 0; m <this.car_line[su].length; m++){
							this.map.removeOverlay(this.car_line[su][m]);
						}
						this.map.removeOverlay(this.obj_car[su])
						this.point_pre[su] = [0,0];
						// this.obj_va.splice(su, 1);
						// this.cun.splice(su, 1);
						// this.car_line.splice(su, 1);
						// this.obj_car.splice(su, 1);
						// this.obj_judge.splice(su,1);
						// this.sum--;
						 this.car_length--;
						 this.obj_va[su] = "00"
						if(this.marker_judge[su]){
							this.marker_judge[su] = false
							this.fclose();
							this.vclose();
							this.map.removeOverlay(this.carMk_af)
						}
					}
				}
				}
		},
		//世界大地坐标转为百度坐标
		wgs2bd:function(lat,lon) {
			var wgs2gcjR = this.wgs2gcj(lat, lon);
			var gcj2bdR = this.gcj2bd(wgs2gcjR[0], wgs2gcjR[1]);
			return gcj2bdR;
		},
		gcj2bd:function(lat,lon) {
			var pi = 3.14159265358979324;
			var a = 6378245.0;
			var ee = 0.00669342162296594323;
			var x_pi = 3.14159265358979324*3000.0/180.0;
			var x = lon, y = lat;
			var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
			var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
			var bd_lon = z * Math.cos(theta) + 0.0065;
			var bd_lat = z * Math.sin(theta) + 0.006;
			var result = [];
			result.push(bd_lat);
			result.push(bd_lon);
			return result;
		},
		
		wgs2gcj:function(lat,lon) {
			var pi = 3.14159265358979324;
			var a = 6378245.0;
			var ee = 0.00669342162296594323;
			var x_pi = 3.14159265358979324*3000.0/180.0;
			var dLat = this.transformLat(lon - 105.0, lat - 35.0);
			var dLon = this.transformLon(lon - 105.0, lat - 35.0);
			var radLat = lat / 180.0 * pi;
			var magic = Math.sin(radLat);
			magic = 1 - ee * magic * magic;
			var sqrtMagic = Math.sqrt(magic);
			dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
			dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
			var mgLat = lat + dLat;
			var mgLon = lon + dLon;
			var result = [];
			result.push(mgLat);
			result.push(mgLon);
			return result;
		},

		transformLat: function(lat,lon) {
			var pi = 3.14159265358979324;
			var a = 6378245.0;
			var ee = 0.00669342162296594323;
			var x_pi = 3.14159265358979324*3000.0/180.0;
			var ret = -100.0 + 2.0 * lat + 3.0 * lon + 0.2 * lon * lon + 0.1 * lat * lon + 0.2 * Math.sqrt(Math.abs(lat));
			ret += (20.0 * Math.sin(6.0 * lat * pi) + 20.0 * Math.sin(2.0 * lat * pi)) * 2.0 / 3.0;
			ret += (20.0 * Math.sin(lon * pi) + 40.0 * Math.sin(lon / 3.0 * pi)) * 2.0 / 3.0;
			ret += (160.0 * Math.sin(lon / 12.0 * pi) + 320 * Math.sin(lon * pi  / 30.0)) * 2.0 / 3.0;
			return ret;
		},

		transformLon:function(lat,lon) {
			var pi = 3.14159265358979324;
			var a = 6378245.0;
			var ee = 0.00669342162296594323;
			var x_pi = 3.14159265358979324*3000.0/180.0;
			var ret = 300.0 + lat + 2.0 * lon + 0.1 * lat * lat + 0.1 * lat * lon + 0.1 * Math.sqrt(Math.abs(lat));
			ret += (20.0 * Math.sin(6.0 * lat * pi) + 20.0 * Math.sin(2.0 * lat * pi)) * 2.0 / 3.0;
			ret += (20.0 * Math.sin(lat * pi) + 40.0 * Math.sin(lat / 3.0 * pi)) * 2.0 / 3.0;
			ret += (150.0 * Math.sin(lat / 12.0 * pi) + 300.0 * Math.sin(lat / 30.0 * pi)) * 2.0 / 3.0;
			return ret;
		},

		//鼠标移入移出
		enter: function($event){
			// $event.currentTarget.style.margin_left = '10px';
			document.getElementById("left_content").style.marginLeft = '-10px';
			document.getElementById("nav1").style.display = 'block';
			document.getElementById('menu').style.display = 'none';
		},
		leave: function($event){
			document.getElementById("left_content").style.marginLeft = '-210px';
			document.getElementById("nav1").style.display = 'none';
			document.getElementById('menu').style.display = 'block';
		},
		//车头移动
		setRotation:function(curPos, targetPos,carmarker){
			var deg = 0;
			curPos = this.map.pointToPixel(curPos);
			targetPos = this.map.pointToPixel(targetPos);
			if (targetPos.x != curPos.x) {
				var tan = (targetPos.y - curPos.y) / (targetPos.x - curPos.x),
				atan = Math.atan(tan);
				deg = atan * 360 / (2 * Math.PI);
				if (targetPos.x < curPos.x) {
					deg = -deg + 90 + 90;
				} else {
					deg = -deg;
				}
				carmarker.setRotation(-deg);
			} else {
				var disy = targetPos.y - curPos.y;
				var bias = 0;
				if (disy > 0)
					bias = -1
				else
					bias = 1
				carmarker.setRotation(-bias * 90);
			}
				return;
		},
		//关闭右边的窗口
		fclose:function(){
			document.getElementById('floatWindow').style.display = 'none';
			for(var i=0; i<this.marker_judge.length; i++){
				this.marker_judge[i]=false
			}
			
			this.map.removeOverlay(this.carMk_af)
			this.vclose();
		},
		vclose:function(){
			document.getElementById('videoWindow').style.display = 'none';
			for(var i=0; i<this.marker_judge.length; i++){
				this.marker_judge[i]=false;
			}
			this.map.removeOverlay(this.carMk_af)
			this.fclose();
		},
		//添加行政区
		getBoundary:function(){       
			var bdary = new BMap.Boundary();
			bdary.get("北京市房山区", (rs)=>{       //获取行政区域
				console.log(rs)
				console.log(this)
				// this.map.clearOverlays();        //清除地图覆盖物       
				var count = rs.boundaries.length; //行政区域的点有多少个
				if (count === 0) {
					alert('未能获取当前输入行政区域');
					return ;
				}
				var pointArray = [];
				for (var i = 0; i < count; i++) {
					var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000",fillOpacity:0.01}); //建立多边形覆盖物
					this.apolygon_admin_region = ply;
					this.map.addOverlay(ply);  //添加覆盖物
					pointArray = pointArray.concat(ply.getPath());
				}    
				this.map.setViewport(pointArray);    //调整视野  
			            
			});   
		}
}





}
</script>

<style scoped>
body,div,p,dl,dt,dd,h1,a{
	margin: 0px;
	padding: 0px;
	
}
#left_content{
	float: left;
	width: 250px;
	height: 500px;
	background: #ffffff;
	/* margin-top: 65px; */
	margin-top: 100px;
	margin-left: -210px;
	position: fixed;
	z-index: 10;
	background: rgb(127, 155, 118);
	border-radius:20px;
	overflow: auto;
	/* margin-top: calc(50% - 600px); */
	/* top: calc(100vh/2); */
	/* text-align: center; */
	/* font-family: ; */

	/* background: #FF0000; */
	background: #072951;
	box-shadow: -8px 0px 10px #034c6a inset, 8px 0px 10px #034c6a inset;
}

#menu{
	margin-left: 210px;
	margin-top: 190px;
	font-family:"楷体";
	font-size: 25px;
	color: white;
}
#nav1{
	display: none;
}

#ent{
	float: left;
	width: 200px;
	height: 500px;
	background: #ffffff;
	/* margin-top: 65px; */
	margin-top: 200px;
	margin-left: 0px;
	position: fixed;
	/* z-index: 10; */
	background: #66cc66

	/* text-align: center; */
	/* font-family: ; */

	/* background: #FF0000; */
}
#content{
	
	overflow: hidden;
	z-index: 1;
}

#footer{
	text-align: center;
	background:  #030829;
	color: rgb(114, 108, 108);
}
#footer a{
	text-decoration: none;
	color: white;
}
/* #nav1 li{
	padding: 15px;
	font-size: 15px;
	text-align: center;
/* 	height: 32px; 
}

#nav1 li a{
	height: 32px;
	text-decoration: none;

	color: #666666;
	text-align: center;
	
	
}
#nav1 li a input{
	vertical-align: middle;
	
} */

#right{
	/* height: 800px; */
	height: calc(100vh - 120px);
	/* margin-top: 65px; */
	/* width：calc（100%-235px）； */
	/* width: calc(100% - 200px); */
	width: 100%;
	float: right;
	overflow: hidden;
}

#li1{
	background: #66cc66;
	
}
#nav1 li {
	color: #FFFFFF;
	margin-left: 17px;
	font-size: 17px;

}
#nav1 #carmenu{
	margin-left: 5px;
	margin-top: 5px
}

/* #nav1 li:hover{
	background:  #66cc66;
/* 	color: #FFFFFF; 
} */
#img1{
	margin-top: 18px;
	margin-left: 60px;
	float: left;
}
#nav1 .left_li{
    
    text-align: left;
	text-decoration-color: white;
}

#floatWindow{
	/* float: right; */
	width: 250px;
	height: 280px;
	background: #ffffff;
	/* margin-top: 65px; */
	margin-top: 100px;
	/* margin-left: -210px; */
	position: fixed;
	z-index: 10;
	background: white;
	border-radius:20px;
	overflow: auto;
	right: 20px;
	text-align:right;
	display: none;
	background: #072951;
	box-shadow: -8px 0px 10px #034c6a inset, 8px 0px 10px #034c6a inset;
	font-size: 16px;

}
#videoWindow{
	/* float: right; */
	width: 250px;
	height: 260px;
	background: #ffffff;
	/* margin-top: 65px; */
	margin-top: 390px;
	/* margin-left: -210px; */
	position: fixed;
	z-index: 10;
	background: white;
	border-radius:20px;
	overflow: auto;
	right: 20px;
	text-align: right;
	display: none;
	background: #072951;
	box-shadow: -8px 0px 10px #034c6a inset, 8px 0px 10px #034c6a inset;
	color: white
}

/* 表格 */
table{

	border-collapse: collapse;

	margin: 0 auto;

	text-align: center;
	margin-top: 10px;
	/* margin-left: 2px;
	margin-right: 2px; */
	width:100%;
}

table td, table th{

	border: 1px solid #cad9ea;

	color: white;

	height: 30px;
	text-align: center;

}

table thead th{

	background-color: #CCE8EB;
	text-align: center;
	width: 100px;

}

table tr:nth-child(odd){

	background-color: #072951;
    box-shadow: -10px 0px 15px #034c6a inset,
    10px 0px 15px #034c6a inset;

}
.m_td{
	width: 20%;
}
.d_td{
	width: 90%;
}

</style>



