<template>
    <div id="pie" style="width: 100%;height:500px;"></div>
</template>

<script type="text/javascript">
export default{
    data(){
        return{
            data:[
            {product: '0', '2012': 43.3, '2013': 85.8, '2014': 93.7,'2015': 43.3, '2016': 85.8, '2017': 93.7},
            {product: '1', '2012': 83.1, '2013': 73.4, '2014': 55.1,'2015': 83.1, '2016': 73.4, '2017': 55.1},
            {product: '2', '2012': 86.4, '2013': 65.2, '2014': 82.5,'2015': 86.4, '2016': 65.2, '2017': 82.5},
            {product: '3', '2012': 72.4, '2013': 53.9, '2014': 39.1,'2015': 72.4, '2016': 53.9, '2017': 39.1}
            ]
        }
    }
    ,

    props:{
      
    },
    mounted(){
        this.ready()
    },
    methods:{
        ready:function(){
            var echarts = require('echarts');
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('pie'),'black');
            // 绘制图表
            var option = {
                title : {
                    // text: '运载材料图',
                    // subtext: 'test',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    x : 'center',
                    y : 'bottom',
                    data:['1','2','3','4','5','6','7','8']
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                    {
                        name:'半径模式',
                        type:'pie',
                        radius : [20, 110],
                        center : ['25%', '50%'],
                        roseType : 'radius',
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        lableLine: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data:[
                            {value:10, name:'rose1'},
                            {value:5, name:'rose2'},
                            {value:15, name:'rose3'},
                            {value:25, name:'rose4'},
                            {value:20, name:'rose5'},
                            {value:35, name:'rose6'},
                            {value:30, name:'rose7'},
                            {value:40, name:'rose8'}
                        ]
                    },
                    {
                        name:'面积模式',
                        type:'pie',
                        radius : [30, 110],
                        center : ['75%', '50%'],
                        roseType : 'area',
                        data:[
                            {value:10, name:'rose1'},
                            {value:5, name:'rose2'},
                            {value:15, name:'rose3'},
                            {value:25, name:'rose4'},
                            {value:20, name:'rose5'},
                            {value:35, name:'rose6'},
                            {value:30, name:'rose7'},
                            {value:40, name:'rose8'}
                        ]
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
