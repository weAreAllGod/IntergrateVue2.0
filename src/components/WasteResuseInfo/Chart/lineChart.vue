/* 折线图，资源厂产出量 */
<template>
  <div id="charts" style="width:'100%',height:'35.4rem'">
  <div id="lineChart" :style="{width:'100%',height:'35.4rem'}">折线图</div>
 </div>
</template>

<script>
import echarts from '../../../../node_modules/echarts/dist/echarts.js'

export default {
 name: 'lineChart',
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
 var myChart = echarts.init(document.getElementById('lineChart'));
 myChart.setOption({
   title: {
        // text: '堆叠区域图'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data:['中华资源厂','神华资源厂','兴隆资源厂'],
        textStyle: { //图例文字的样式
                            color: '#fff',
                            fontSize: 16
                    },
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日'],
            axisLine: {
                    lineStyle: {
                        color: "#fff",
                    }
                }
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLine: {
                    lineStyle: {
                        color: "#fff",
                    }
                }
        }
    ],
    
    series : [
        {
            name:'中华资源厂',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[12,32, 10, 13, 40, 23, 210]
        },
        {
            name:'神华资源厂',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[22, 18, 19, 23, 29, 33, 31]
        },
        {
            name:'兴隆资源厂',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[15, 23, 20, 15, 19, 33, 41]
        },
        
    ]
    
 })

 /* window.addEventListener("resize",function(){
    myChart.resize();
  }); */

 }
}
</script>


<style scoped>


</style>
