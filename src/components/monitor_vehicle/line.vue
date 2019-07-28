<template>
    <div id="line" style="width: 100%;height:500px;"></div>
</template>

<script type="text/javascript">
export default{
    data(){
        return{
            data:[
            [320, 302, 301, 334, 390, 330, 320],
            [120, 132, 101, 134, 90, 230, 210],
            [220, 182, 191, 234, 290, 330, 310],
            [150, 212, 201, 154, 190, 330, 410],
            [820, 832, 901, 934, 1290, 1330, 1320]
            ]
        }
    },

    props:{
      
    },
    mounted(){
        this.ready()
    },
    methods:{
        ready:function(){
            var echarts = require('echarts');
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('line'),'black');
            // 绘制图表
            var option = {
                title: {
                    text: '车辆速度图',
                    subtext: '111'
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
                    data:['0', '1','2','3','4']
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
                        data : ['12:10','12:20','12:30','12:40','12:50','13:00','13:00']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'0',
                        type:'line',
                        stack: '总量',
                        areaStyle: {},
                        data:[55, 60, 20, 30, 50, 63, 41]
                    },
                    {
                        name:'1',
                        type:'line',
                        stack: '总量',
                        areaStyle: {},
                        data:[20, 32, 50, 62, 63, 50, 20]
                    },
                    {
                        name:'2',
                        type:'line',
                        stack: '总量',
                        areaStyle: {},
                        data:[32, 50, 50, 30, 25, 55, 10]
                    },
                    {
                        name:'3',
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:[32, 50, 50, 30, 25, 30, 10]
                    },
                    {
                        name:'4',
                        type:'line',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        areaStyle: {normal: {}},
                        data:[32, 50, 50, 30, 25, 20, 10]
                    }
                ]
            };
            myChart.setOption(option);
        }
    }
}
</script>

<style>

</style>
