<template>
    <div id="pie" style="width: 100%;height:500px;"></div>
</template>

<script type="text/javascript">
import axios from 'axios'
export default{
    data(){
        return{
            data:[],
        }
    },

    props:{
      
    },
    mounted(){
        this.ready()
    },
    methods:{
            ready:function(){
            axios({
            headers: {
                token: this.$store.state.token
            },
            method: "get",
            url:'/api/constructionWasteInfo/total'
            })
            .then(response => {
                for(var i=0;i<response.data.data.length;i++){
                    this.data.push({'type':response.data.data[i]['sourceType'],'value':response.data.data[i]['constructionWasteWeight']})
                };
            var echarts = require('echarts');
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('pie'),'black');
            // 绘制图表
            var option = {
                title: {
                    // text: '产生源垃圾类型占比饼图',
                    subtext: '数据来源：沧州市'
                },
                legend: {
                    textStyle: {
                        color: 'white'
                    }
                },
                tooltip: {
                    trigger: 'item',
                },
                dataset: {
                    // 这里指定了维度名的顺序，从而可以利用默认的维度到坐标轴的映射。
                    // 如果不指定 dimensions，也可以通过指定 series.encode 完成映射，参见后文。
                    // dimensions: ['type', 'value'],
                    source: this.data
                },
 
                series: [{
                    name:'垃圾类型',
                    type: 'pie',
                    radius: '70%',
                    center: ['50%', '50%'],
                    encode: {
                        itemName: 'type',
                        value: 'value'
                    }
                }]
            };
            myChart.setOption(option);
            }
            ).catch(error => console.log(error))

         
        }
    }
}
</script>

<style>

</style>
