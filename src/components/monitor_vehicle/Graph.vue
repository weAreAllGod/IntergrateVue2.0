<template>
    <div id="app">
		<Vew></Vew>
		<div id="clear">
		</div>
		<div id="content" >
			<div id="contain" class="containe">
                
				<div class="left">
					
					<div class="heti">车辆行驶统计</div>
					<div style="margin-top:17px">
						<bar></bar>
					</div>
				</div>
				<div class="right">
					<div class="heti">车辆运载统计</div>
					<div style="margin-top:17px">
					<pie></pie>
					</div>
				</div>

				<div class="left">
					
					<div class="heti">车辆状态统计</div>
					<div style="margin-top:17px">
					<lineare></lineare>
					</div>
				</div>
				<div class="right">
					<div class="heti">车辆报警统计</div>
					<div style="margin-top:17px">
					<stbar></stbar>
					</div>
				</div>
			</div>


		</div>
		<!-- <div id="footer">
			<p>
				<a href="#">关于</a>
				<a href="#">广告</a>
				<a href="#">联系</a>
				<a href="#">合作</a>
				<a href="#">版权</a>
			</p>
			<p> -->
				<!-- <a href="#">京ICP备 0000001号</a> -->
				<!-- All right(C) 2008-2010 resved.
			</p>
		</div> -->

		
    </div>
</template>


<script type="text/javascript">
import bar from './bar'
import pie from './pie'
import stbar from './stackedbar'
import lineare from './line'
import Vew from './View.vue'

export default{
    components: {
        bar,
        pie,
        stbar,
		lineare,
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

