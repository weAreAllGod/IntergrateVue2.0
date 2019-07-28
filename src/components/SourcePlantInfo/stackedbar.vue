<template>
    <div id="stbar" style="width: 100%;height:500px;"></div>
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
            var myChart = echarts.init(document.getElementById('stbar'),'black');
            // 绘制图表
            var option = {
                title: {
                    // text: '建筑垃圾周产生量占比堆叠条形图',
                    subtext: '数据来源：沧州市'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['工程渣土', '装修垃圾','拆迁垃圾','工程泥浆','淤泥以及弃料'],
                    textStyle: {
                        color: 'white'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis:  {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    data: ['周一','周二','周三','周四','周五','周六','周日']
                },
                dataset: {
                    dimensions: ['周一','周二','周三','周四','周五','周六','周日'],
                    source: this.data
                },
                series: [
                    {
                        name: '工程渣土',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [320, 302, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '装修垃圾',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '拆迁垃圾',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '工程泥浆',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [150, 212, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '淤泥以及弃料',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [820, 832, 901, 934, 1290, 1330, 1320]
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
