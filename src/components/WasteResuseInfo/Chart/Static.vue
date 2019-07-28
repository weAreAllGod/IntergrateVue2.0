/* 表格信息 */
<template>
  <div>
    <Vew></Vew>
		<div id="clear">
		</div>
		<div id="content" >
			<div id="contain" class="containe">
                
				<div class="left">
					
					<div class="heti">资源厂收纳垃圾量统计</div>
					<div style="margin-top:17px">
						<bar></bar>
					</div>
				</div>

				<div class="right">
					<div class="heti">不同类型建筑垃圾量统计</div>
					<div style="margin-top:17px">
					<pie></pie>
					</div>
				</div>
        
        <div class="right">
					
					<div class="heti">各个资源厂的收纳垃圾数量</div>
					<div style="margin-top:17px">
					<stbar></stbar>
					</div>
				</div>
				<!-- <div class="right">
					<div class="heti">车辆报警统计</div>
					<div style="margin-top:17px">
					<stbar></stbar>
					</div>
				</div> -->
				
			</div>
		</div>
  </div>
</template>

<script>
// import viw from '../View'
import bar from './C1'
import pie from './C2'
import stbar from './C3'
import Vew from '../View'
export default {
  name: 'Chart',
  components: {
        bar,
        pie,
        stbar,
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
