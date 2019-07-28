/* 饼图，各个资源厂的收纳垃圾数量 */
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
        left: '35%' ,
        textStyle:{color:'#61D2F7'},
        
    },
    
    legend: {/* left: '65%', */
            itemWidth: 10,　　　　　　　//图例大小  我这里用的是圆
            //itemGap: 30,　　　　　　　　//图例之间的间隔
            //orient: 'horizontal',　　　//布局方式，默认水平布局，另可选vertical
            y: 'bottom',　　　　　　　　　　//垂直放的位置，可以写top，center，bottom，也可以写px或者百分比。x轴方向同理，默认center
            icon: "circle",
       textStyle:{
//             fontSize:14,
            color:'#FFF',
            
            }



    },
    tooltip: {},
    dataset: {
        dimensions: ['product', '2017-03-04', '2017-03-05','2017-03-06'],
        source: [
            {product: '神话1', '2017-03-04': 43.3, '2017-03-05': 85.8, '2017-03-06': 93.7},
            {product: '神话2', '2017-03-04': 83.1, '2017-03-05': 73.4, '2017-03-06': 55.1},
            {product: '神话3', '2017-03-04': 86.4, '2017-03-05': 65.2, '2017-03-06': 82.5},
            {product: '神话4', '2017-03-04': 72.4, '2017-03-05': 53.9, '2017-03-06': 39.1}
        ]
    },
    xAxis: {
            type: 'category',
    //设置坐标轴字体颜色和宽度
            axisLine: {
                lineStyle: {
                    color: "#fff",
                    }
                }
            },
    yAxis: {
            axisLine: {
                    lineStyle: {
                        color: "#fff",
                    }
                }
            },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
        {type: 'bar'},
        {type: 'bar'},
        {type: 'bar'}
    ],
    color: ['#FF4040','#C0FF3E','	#EE5C42','rgb(0,155,146)','#BFEFFF']
    
 })

 /* window.addEventListener("resize",function(){
    myChart.resize();
  }); */
 

 }
}
</script>


<style scoped>


</style>
