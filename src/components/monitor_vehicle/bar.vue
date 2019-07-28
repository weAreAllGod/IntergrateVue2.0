<template>
    <div id="bar" style="width: 100%;height:500px;"></div>
</template>

<script type="text/javascript">
export default{
    data(){
        return{
            data:[
            {product: '1', '2015': 50, '2016': 60.2, '2017': 90.7},
            {product: '2', '2015': 83.1, '2016': 73.4, '2017': 52.1},
            {product: '3', '2015': 80.4, '2016': 65.2, '2017': 84.5},
            {product: '4', '2015': 79.4, '2016': 52.9, '2017': 50.1}
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
                legend: {},
                tooltip: {},
                dataset: {
                    dimensions: ['product', '2015', '2016', '2017'],
                    source: [
                        {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
                        {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
                        {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
                        {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
                    ]
                },
                xAxis: {type: 'category'},
                yAxis: {},
                // Declare several bar series, each will be mapped
                // to a column of dataset.source by default.
                series: [
                    {type: 'bar'},
                    {type: 'bar'},
                    {type: 'bar'}
                ]
            };

          
            myChart.setOption(option);
        }
    }
}
</script>

<style>

</style>
