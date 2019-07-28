/* 饼图，资源厂收纳垃圾量统计 */
<template onload="getData();">
  <div id="charts" style="width:'100%',height:'35.4rem'">
  <div id="ConstructionWeightInfo" :style="{width:'100%',height:'35.4rem'}">饼图</div>
 </div>
</template>
<script>
import axios from 'axios'
import echarts from '../../../../node_modules/echarts/dist/echarts.js'

export default {
 name: 'PieChart',
 data () {
 return {
     totalActualWeight:[],
     temp0:[],
     temp:[],
    //  temp:[
    //         {"value":548,"name": '2019R0000000015'},
    //         {"value":510, "name": '2019R0000000001'},
    //         {"value":634, "name": '2019R0000000002'},
    //     ],
 }
 },
 components: {
 },
 computed: {
     
 },
 methods: {
     //定义获取数据函数
     getData(){
         axios.get('/api/wasteReuseInfo/querychart01',{headers: {
          token: this.$store.state.token
        },})
            .then((response) => {
                    console.log(response.data);   //处理后台返回的数据
                    this.totalActualWeight=response.data;
                    for(var i=0;i<response.data.length;i++){  
                    this.temp.push(
                    {
                        "value":this.totalActualWeight[i].actualWeight,//value
                        "name":"资源场"+this.totalActualWeight[i].resourcePlantId[14]//name
                        
                         
                    });
                    /*ECharts图表*/
                    var myChart = echarts.init(document.getElementById('ConstructionWeightInfo'));
                    myChart.setOption({
                    /* 标题 */
                    title: {
                            // text: '资源厂收纳垃圾量统计',
                            // subtext: '虚构数据',
                            left: '30%' ,
                            textStyle:{
                            color:'#61D2F7'
}
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{b} : {c} ({d}%)"
                        },
                        // dataset:{
                        //     data:this.temp,
                        // },
                        legend: {
                            bottom: 10,
                            left: 'center',
                            // data: ['2019R0000000015','2019R0000000001', '2019R0000000002']
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
                                
                                data:this.temp,

                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            },
                        ],
                         color: ['#9ACD32','#836FFF','#8B2500','#FF4040','rgb(111,0,100)']
                    })

                   
                   

                };

                    this.temp0=JSON.stringify(this.temp)
                    this.temp=this.temp0;
                    console.log(12345678910);
                    console.log(this.temp)

                }
            ).catch(error=>console.log(error));
                },
            
 },
 mounted() {
//自动执行getData()函数
this.getData();
 }
}
</script>


<style scoped>


</style>
