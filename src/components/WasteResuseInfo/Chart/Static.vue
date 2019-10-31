/* 表格信息 */
<template>
  <div>
    <Vew></Vew>
		<div id="clear">
		</div>
		<div id="content" >
			<div id="contain" class="containe">
                <!-- 饼图 -->
				<div class="left" >
					<div class="heti" >资源厂收纳垃圾量统计</div>
					<div style="margin-top:17px">
						<pie ></pie>
					</div>
				</div>
				<!-- 雷达图  -->
				<div class="right">
					<div class="heti">各资源厂不同类型建筑垃圾量统计</div>
					<div style="margin-top:17px">
					<radarChart></radarChart>
					</div>
				</div>
				<!-- 柱状图 -->
				<div class="left">
					<div class="heti">近三天各个资源厂的收纳垃圾数量</div>
					<div style="margin-top:17px">
					<barChart></barChart>
					</div>
				</div>
				<!-- 折线图 -->
				<div class="right">
					<div class="heti">资源厂产出量</div>
					<div style="margin-top:17px">
					<lineChart></lineChart>
					</div>
				</div>

			</div>
		</div>

  </div>
</template>

<script>
// import viw from '../View'
import pie from './C1'
import radarChart from './C2'
import barChart from './C3'  //雷达图
import lineChart from './lineChart'
import Vew from '../View'
export default {
  name: 'Chart',
  components: {
        pie,
        radarChart,
		barChart,
		lineChart,
      	Vew
  }
}
</script>

<style scoped>
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

</style>
