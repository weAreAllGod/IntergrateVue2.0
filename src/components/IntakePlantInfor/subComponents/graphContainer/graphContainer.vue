<template>
<!-- 
 width: 600px;
    height: 300px;
    margin-left: 10px;
  -->
<div>
    <div id='test'  style=" width: 600px;height: 300px;margin-left: 10px;line-height: 300px;z-index:10" ref="myEchart">
    </div>
    <div  style="width: 600px;height: 300px;margin-left: 10px;line-height: 300px;z-index:10" ref="myEchart1">
    </div>
    <div   style="width: 600px;height: 300px;margin-left: 10px;line-height: 300px;z-index:10" ref="myEchart2" ></div> 
</div>

</template>

<script>
import echarts from 'echarts'
// import statGraph from './statGraph'
import Swiper from "swiper"
import "swiper/dist/css/swiper.min.css"
export default {
    name:"graphContainer",
  data(){
      return{
          data:"",
          chart: null,
          chart1:null,
          chart2:null,
          chart3:null,
          mySwiper:''



      }
      

  },
  watch:{
   

  },

  components:{
    


  },
  methods:{


  },
  created:function(){
      

  },
  methods:{
    initChart() {

        alert("正在冲洗你加载")
    this.chart = echarts.init(this.$refs.myEchart);
        // 把配置和数据放这里
        this.chart.setOption({

            // color: ['#3398DB'],
            tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
            data:['因子1','因子2','因子3','因子4','因子5'],
            textStyle:{
                    color: 'white'
                }  
            
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                // magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},

                            // restore : {show: true},
                            // saveAsImage : {show: true}
            },
            x: 'right',                // 水平安放位置，默认为全图右对齐，可选为：
                                    // 'center' ¦ 'left' ¦ 'right'
                                    // ¦ {number}（x坐标，单位px）
            y: 'bottom',                  // 垂直安放位置，默认为全图顶端，可选为：'top' ¦ 'bottom' ¦ 'center'
                    
                    },
                    // calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六','周日'],
                position:"center",
                axisLine:{
                    lineStyle:{
                    color: 'white',
                    width: 2,
                    type: 'solid'
                    }

                },
                axisLabel:{
                textStyle:{
                    color: 'white'
                }     

                },
            
            
            },
            

            ],
        
        
            yAxis : [
                        {
                type : 'value',
            axisLine:{
                lineStyle:{
                color: 'white',
                width: 2,
                type: 'solid'
                }

            },
                axisLabel:{
                textStyle:{
                    color: 'white'
                }     

                },
                        }
                    ],
                    series : [
                        {
                            name:'因子1',
                            type:'line',
                            stack: '总量',
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'因子2',
                            type:'line',
                            stack: '总量',
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name:'因子3',
                            type:'line',
                            stack: '总量',
                            data:[150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name:'因子4',
                            type:'line',
                            stack: '总量',
                            data:[320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name:'因子5',
                            type:'line',
                            stack: '总量',
                            data:[820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ] 
        
        
        
        
    });

    this.chart1 = echarts.init(this.$refs.myEchart1);
        var dataBJ = [
            [55,9,56,0.46,18,6,1],
            [25,11,21,0.65,34,9,2],
            [56,7,63,0.3,14,5,3],
            [33,7,29,0.33,16,6,4],
            [42,24,44,0.76,40,16,5],
            [82,58,90,1.77,68,33,6],
            [74,49,77,1.46,48,27,7],
            [78,55,80,1.29,59,29,8],
            [267,216,280,4.8,108,64,9],
            [185,127,216,2.52,61,27,10],
            [39,19,38,0.57,31,15,11],
            [41,11,40,0.43,21,7,12],
            [64,38,74,1.04,46,22,13],
            [108,79,120,1.7,75,41,14],
            [108,63,116,1.48,44,26,15],
            [33,6,29,0.34,13,5,16],
            [94,66,110,1.54,62,31,17],
            [186,142,192,3.88,93,79,18],
            [57,31,54,0.96,32,14,19],
            [22,8,17,0.48,23,10,20],
            [39,15,36,0.61,29,13,21],
            [94,69,114,2.08,73,39,22],
            [99,73,110,2.43,76,48,23],
            [31,12,30,0.5,32,16,24],
            [42,27,43,1,53,22,25],
            [154,117,157,3.05,92,58,26],
            [234,185,230,4.09,123,69,27],
            [160,120,186,2.77,91,50,28],
            [134,96,165,2.76,83,41,29],
            [52,24,60,1.03,50,21,30],
            [46,5,49,0.28,10,6,31]
        ];

        var dataGZ = [
            [26,37,27,1.163,27,13,1],
            [85,62,71,1.195,60,8,2],
            [78,38,74,1.363,37,7,3],
            [21,21,36,0.634,40,9,4],
            [41,42,46,0.915,81,13,5],
            [56,52,69,1.067,92,16,6],
            [64,30,28,0.924,51,2,7],
            [55,48,74,1.236,75,26,8],
            [76,85,113,1.237,114,27,9],
            [91,81,104,1.041,56,40,10],
            [84,39,60,0.964,25,11,11],
            [64,51,101,0.862,58,23,12],
            [70,69,120,1.198,65,36,13],
            [77,105,178,2.549,64,16,14],
            [109,68,87,0.996,74,29,15],
            [73,68,97,0.905,51,34,16],
            [54,27,47,0.592,53,12,17],
            [51,61,97,0.811,65,19,18],
            [91,71,121,1.374,43,18,19],
            [73,102,182,2.787,44,19,20],
            [73,50,76,0.717,31,20,21],
            [84,94,140,2.238,68,18,22],
            [93,77,104,1.165,53,7,23],
            [99,130,227,3.97,55,15,24],
            [146,84,139,1.094,40,17,25],
            [113,108,137,1.481,48,15,26],
            [81,48,62,1.619,26,3,27],
            [56,48,68,1.336,37,9,28],
            [82,92,174,3.29,0,13,29],
            [106,116,188,3.628,101,16,30],
            [118,50,0,1.383,76,11,31]
        ];

        var dataSH = [
            [91,45,125,0.82,34,23,1],
            [65,27,78,0.86,45,29,2],
            [83,60,84,1.09,73,27,3],
            [109,81,121,1.28,68,51,4],
            [106,77,114,1.07,55,51,5],
            [109,81,121,1.28,68,51,6],
            [106,77,114,1.07,55,51,7],
            [89,65,78,0.86,51,26,8],
            [53,33,47,0.64,50,17,9],
            [80,55,80,1.01,75,24,10],
            [117,81,124,1.03,45,24,11],
            [99,71,142,1.1,62,42,12],
            [95,69,130,1.28,74,50,13],
            [116,87,131,1.47,84,40,14],
            [108,80,121,1.3,85,37,15],
            [134,83,167,1.16,57,43,16],
            [79,43,107,1.05,59,37,17],
            [71,46,89,0.86,64,25,18],
            [97,71,113,1.17,88,31,19],
            [84,57,91,0.85,55,31,20],
            [87,63,101,0.9,56,41,21],
            [104,77,119,1.09,73,48,22],
            [87,62,100,1,72,28,23],
            [168,128,172,1.49,97,56,24],
            [65,45,51,0.74,39,17,25],
            [39,24,38,0.61,47,17,26],
            [39,24,39,0.59,50,19,27],
            [93,68,96,1.05,79,29,28],
            [188,143,197,1.66,99,51,29],
            [174,131,174,1.55,108,50,30],
            [187,143,201,1.39,89,53,31]
        ];

        var lineStyle = {
            normal: {
                width: 1,
                opacity: 0.5
            }
        };
        this.chart1.setOption({
                backgroundColor: '#161627',
                title: {
                    text: 'AQI - 雷达图',
                    left: 'center',
                    textStyle: {
                        color: '#eee'
                    }
                    },
            legend: {
                bottom: 5,
                data: ['北京', '上海', '广州'],
                itemGap: 20,
                textStyle: {
                    color: '#fff',
                    fontSize: 14
                },
                selectedMode: 'single'
            },
            // visualMap: {
            //     show: true,
            //     min: 0,
            //     max: 20,
            //     dimension: 6,
            //     inRange: {
            //         colorLightness: [0.5, 0.8]
            //     }
            // },
            radar: {
                indicator: [
                    {name: 'AQI', max: 300},
                    {name: 'PM2.5', max: 250},
                    {name: 'PM10', max: 300},
                    {name: 'CO', max: 5},
                    {name: 'NO2', max: 200},
                    {name: 'SO2', max: 100}
                ],
                shape: 'circle',
                splitNumber: 5,
                name: {
                    textStyle: {
                        color: 'rgb(238, 197, 102)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: [
                            'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                            'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                            'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                        ].reverse()
                    }
                },
                splitArea: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(238, 197, 102, 0.5)'
                    }
                }
            },
            series: [
                {
                    name: '北京',
                    type: 'radar',
                    lineStyle: lineStyle,
                    data: dataBJ,
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#F9713C'
                        }
                    },
                    areaStyle: {
                        normal: {
                            opacity: 0.1
                        }
                    }
                },
                {
                    name: '上海',
                    type: 'radar',
                    lineStyle: lineStyle,
                    data: dataSH,
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#B3E4A1'
                        }
                    },
                    areaStyle: {
                        normal: {
                            opacity: 0.05
                        }
                    }
                },
                {
                    name: '广州',
                    type: 'radar',
                    lineStyle: lineStyle,
                    data: dataGZ,
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: 'rgb(238, 197, 102)'
                        }
                    },
                    areaStyle: {
                        normal: {
                            opacity: 0.05
                        }
                    }
                }
            ]
                
    });

    this.chart2= echarts.init(this.$refs.myEchart2);
        this.chart2.setOption({
        angleAxis: {
            axisLabel:{
                textStyle:{
                    color: 'white'
                }     
            },
    

        },
        radiusAxis: {
            type: 'category',
            axisLabel:{
            textStyle:{
                color: 'red'
            }     
            },
            data: ['周一', '周二', '周三', '周四'],
            z: 10,
            
            
        },
        polar: {
            
        },
        series: [{
            type: 'bar',
            data: [1, 2, 3, 4],
            coordinateSystem: 'polar',
            name: 'A',
            stack: 'a'
        }, {
            type: 'bar',
            data: [2, 4, 6, 8],
            coordinateSystem: 'polar',
            name: 'B',
            stack: 'a'
        }, {
            type: 'bar',
            data: [1, 2, 3, 4],
            coordinateSystem: 'polar',
            name: 'C',
            stack: 'a'
        }],
        legend: {
            show: true,
            data: ['A', 'B', 'C']
        }
        });

    
        },
        
        
    
    
    
    
    
    },
  mounted(){

        
        
        
        
 

    this.initChart();
    var shli=this;
// var mySwiper = new Swiper ('.swiper-container', {
   

//     // direction: 'vertical', // 垂直切换选项
//     effect : 'coverflow',
//     observer: true, //修改swiper自己或子元素时，自动初始化swiper        
//     observeParents: true, //修改swiper的父元素时，自动初始化swiper 
//     // loop: true, // 循环模式选项
//     // autoplay: {
//     // delay: 9000,//1秒切换一次
//     //   },
        
    
//     on:{
//       click:function(){

        
//         // shli.initChart()
//         // alert(shli)
//         // mySwiper.update()
//         //  alert( mySwiper)
//       },
//       updated() {
//           alert("yijing")
//       },
    
//     slideNextTransitionEnd: function(){
//     //   graphContainer.initChart()
//     },

//     },
    
//     paginationClickable: true,
   
    
//     // 如果需要分页器
//     pagination: {
//       el: '.swiper-pagination',
//     },
    
//     // 如果需要前进后退按钮
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },
    
//     // 如果需要滚动条
//     scrollbar: {
//       el: '.swiper-scrollbar',
//     },
//     onSlideChangeEnd: function(Swiper){ 
//         alert(Swiper.activeIndex)
//         // mySwiper.update(); //swiper更新
//     //  var mytest=document.getElementById('test');
//     // for(let i=0;i<mytest.length;i++){
//     //     var myChart = echarts.init(mytest[i]);
//     //     myChart.setOption(option);
//     // }
//     } ,



// });
  
   
       
    },
  beforeDestroy() {
  if (!this.chart || !this.chart1||!this.chart2 ) {
    return
  }
//   this.chart.dispose();
//   this.chart = null;
//   this.chart1.dispose();
//   this.chart1 = null;
//   this.chart2.dispose();
//   this.chart2 = null;
 
  },
  

 
    
}
</script>
<style>
.swiper-container {
    width: 650px;
    height: 300px;
    /* margin-top: 100px; */
    /* background-color: rgb(128, 98, 0); */
} 
.swiper-wrapper{
    width: 650px;
    height: 300px;
    /* margin-top: 100px; */
    /* background-color: rgb(245, 95, 8); */

} 
.swiper-slide{
    width: 600px;
    height: 300px;
    margin-left: 10px;
    
    /* background-color: green; */
    /* line-height: 300px;
    text-align:center */
    

}
/* .visibility{visibility: hidden;position: absolute;z-index: -1;} */
</style>
