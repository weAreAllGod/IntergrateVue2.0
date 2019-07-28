<template>
    <div id="bar" style="width:100%;height:500px;"></div>
</template>

<script type="text/javascript">
export default{
    data(){
        return{
            data:[
            {product: '工程渣土', '2015': 43.3, '2016': 85.8, '2017': 93.7},
            {product: '装修垃圾', '2015': 83.1, '2016': 73.4, '2017': 55.1},
            {product: '拆迁垃圾', '2015': 86.4, '2016': 65.2, '2017': 82.5},
            {product: '工程泥浆', '2015': 72.4, '2016': 53.9, '2017': 39.1}
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
            var myChart = echarts.init(document.getElementById('bar'),'black');
            // 绘制图表
            var option = {
                title: {
                    // text: '产生源垃圾总量柱状图',
                    subtext: '数据来源：沧州市'
                },
                legend: {
                    textStyle: {
                        color: 'white'
                    }
                },
                tooltip: {},
                dataset: {
                    // 这里指定了维度名的顺序，从而可以利用默认的维度到坐标轴的映射。
                    // 如果不指定 dimensions，也可以通过指定 series.encode 完成映射，参见后文。
                    dimensions: ['product', '2015', '2016', '2017'],
                    source: this.data
                },
                xAxis: [
                    {type: 'category', gridIndex: 0},
                    {type: 'category', gridIndex: 1}
                ],
                yAxis: [
                    {gridIndex: 0},
                    {gridIndex: 1}
                ],
                grid: [
                    {bottom: '55%'},
                    {top: '55%'}
                ],
                series: [
                // These series are in the first grid.
                {type: 'bar', seriesLayoutBy: 'row'},
                {type: 'bar', seriesLayoutBy: 'row'},
                {type: 'bar', seriesLayoutBy: 'row'},
                // These series are in the second grid.
                {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
                {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
                {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
                {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
                ]
            };
            myChart.setOption(option);
        }
    }
}
</script>

<style>

</style>
