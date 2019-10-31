/* 雷达图，各资源厂不同类型建筑垃圾量统计 */
<template>
  <div id="charts" style="width:'100%',height:'35.4rem'">
  <div id="radarChart" :style="{width:'100%',height:'35.4rem'}">雷达图</div>
 </div>
</template>

<script>
import echarts from '../../../../node_modules/echarts/dist/echarts.js'
export default {
    name: 'radarChart',
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
    /*eCharts图表*/
    var myChart = echarts.init(document.getElementById('radarChart'));
    myChart.setOption({
    title: {
            // text: '基础雷达图'
        },
        tooltip: {},
        legend: {
            data: ['神华资源厂', '中华资源厂'],
            textStyle: {
            color: '#fff',
            fontSize: 14
        },
        },
        radar: {
            // shape: 'circle',
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
            }
            },
            
            indicator: [
            { name: '渣土', max: 60},
            { name: '混凝土块', max: 60},
            { name: '随时块', max: 60},
            { name: '泥浆', max: 60},
            { name: '废金属', max: 60},
            { name: '费竹木', max: 60}
            ]
        },
        series: [{
            name: '各资源厂不同类型建筑垃圾量统计',
            type: 'radar',
            // areaStyle: {normal: {}},
            data : [
                {
                    value : [43, 10, 28, 35, 50, 19],
                    name : '神华资源厂',
                    itemStyle: {
                        normal: {
                            color: 'rgba(255,255,0,0.6)',
                            // lineStyle: {
                            //     color: 'rgba(255,225,0,.3)',
                            // },
                        },
                    },
                },
                {
                    value : [50, 14, 28, 30, 40, 21],
                    name : '中华资源厂',
                    normal: {
                            color: 'rgba(0,255,255,0.6)',
                            // lineStyle: {
                            //     color: 'rgba(255,225,0,.3)',
                            // },
                        },
                    
                }
            ]
        }]
        
    })

 /* window.addEventListener("resize",function(){
    myChart.resize();
  }); */
 

 }
}
 
</script>

<style scoped>

</style>
