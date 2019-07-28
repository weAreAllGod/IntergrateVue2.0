/* 饼图，不同类型建筑垃圾量统计 */
<template>
  <div id="charts" style="width:'100%',height:'35.4rem'">
  <div id="ConstructionTypeInfo" :style="{width:'100%',height:'35.4rem'}">饼图</div>
 </div>
</template>

<script>
import echarts from '../../../../node_modules/echarts/dist/echarts.js'

export default {
 name: 'PieChart',
 data () {
 return {
 }
 },
 components: {
 },
 computed: {
 },
 methods: {
 },
 mounted() {
 /*ECharts图表*/
 var myChart = echarts.init(document.getElementById('ConstructionTypeInfo'));
 myChart.setOption({
   /* 标题 */
  title: {
        // text: '不同类型建筑垃圾量统计',
        // subtext: '虚构数据',
        left: '30%' ,
        textStyle:{color:'#61D2F7'},
                        
    },
    tooltip : {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
    },
    legend: {
        bottom: 10,
        left: 'center',
        data: ['固体垃圾','半固体垃圾', '危险垃圾'],
        textStyle:{
//             fontSize:14,
            color:'#FFF',
            
            }
        
    },
    series : [
        {
            type: 'pie',
            radius : '75%',
            center: ['40%', '50%'],
            selectedMode: 'single',
            data:[
                {value:300,name: '固体垃圾',},
                {value:1000, name: '半固体垃圾'},
                {value:1392, name: '危险垃圾'},
            ],
            
            itemStyle: {
                
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        },
    ],
    color: ['#BFEFFF','#FFC125','#FF4040','#C0FF3E','#EE5C42',]
 })

 /* window.addEventListener("resize",function(){
    myChart.resize();
  }); */
 

 }
}
</script>


<style scoped>


</style>
