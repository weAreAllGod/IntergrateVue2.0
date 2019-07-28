<template>
<body>
<div class="popuptable"  v-show="showWindow" >
    <div class="cesium-infoBox-title" style="color:white ;background: rgb(92, 99, 92)" >{{myconsum.name}}</div>
    <div class="divpoptable">
    <router-link style="color:white" to="/vedio">
    <button type="button" class="cesium-button cesium-infoBox-camera" style="width:50px ">o_o   
        <!-- <i class="fa fa-tripadvisor" aria-hidden="true" >
        </i> -->  
    </button>
    </router-link>

    <button type="button" class="cesium-infoBox-close" v-on:click="exite()" >×</button>
   
   
           
    <table  class='table table-bordered' style='color:white;width:100%;border: 2px solid'>
        <caption style="color:white">基本信息</caption>
        <tr ><th> 消纳场名称</th><td>{{myconsum.name}}</td>  </tr>
        <tr><th> 消纳场序号</th><td>{{myconsum.id}}</td>  </tr>
        <tr><th> 消纳场地址</th><td>{{myconsum.addr}}</td>  </tr>
        <tr><th> 消纳场经纬度</th><td>{{myconsum.longtitude}},{{myconsum.latitude}}</td>  </tr>
      
    </table>
     <table  class='table table-bordered' style='color:white;width:100%;border: 2px solid'>
        <caption style="color:white">安全类信息</caption>
        <tr ><th> 建筑垃圾序号</th><td>{{myconsum.conswasteid}}</td>  </tr>
        <tr><th> 建筑垃圾堆填体位置</th><td>{{myconsum.longtitude}},{{myconsum.latitude}}</td>  </tr>
        <tr><th> 建筑垃圾类型</th><td>{{myconsum.type}}</td>  </tr>
        <tr><th> 建筑垃圾面积</th><td>{{myconsum.area}}</td>  </tr>
         <tr><th> 建筑垃圾体量</th><td>{{myconsum.volume}}</td>  </tr>
        <tr><th> 现场图像数据</th><td>{{myconsum.vedio}}</td></tr>
        <tr><th> 遥感影像</th><td>点此观看</td>  </tr>   
    </table>
        <table  class='table table-bordered' style='color:white;;width:100%;border: 2px solid'>
        <caption style="color:white">环境类信息</caption>
        <tr ><th> 环境参数序号</th><td>{{myconsum.environparaid}}</td>  </tr>
        <tr><th> 安全风险评价因子</th><td>{{myconsum.safepara}}</td>  </tr>
        <tr><th> 水环境因子</th><td>{{myconsum.waterpara}}</td>  </tr>
        <tr><th> 土壤环境因子</th><td>{{myconsum.solfpara}}</td>  </tr>
         <tr><th> 大气环境因子</th><td>{{myconsum.atmpara}}</td>  </tr>
        <tr><th> 预警阈值</th><td>{{myconsum.warnpara}}</td>  </tr>

    </table>

   </div>  
    
    

</div>
</body>


<!-- <div class="cesium-viewer-infoBoxContainer" >
    
    <div class="cesium-infoBox-title" >京城第三消纳场</div>
    <button type="button" class="cesium-button cesium-infoBox-camera"></button>
    <button type="button" class="cesium-infoBox-close" >×</button>

</div> -->

    
</template>
<script>
//  import 'src/static/lib/bootstrap-3.3.7-dist/css/bootstrap.min.css'
// import 'static/css/table.css'
import bus from '../../../assets/eventbus.js'

import "cesium/Source/Widgets/widgets.css";
export default {
    name:"popUpTable",
    data(){
        return{
            // showWindow:false,
            myconsum: {id: "2019I0000000000",
                name: "京城第一消纳场",
                addr: "我们的大故宫里",
                latitude:39.9  ,
                longtitude: 116.39,
                inputname: "小王",
                content: "测试用",
                conswasteid: "2019W0000000001",
                type: "固体砖头",
                area: "100",
                volume: "目前不确定",
                vedio: "http://www.JZLJ.com/vieo1",
                environparaid: "2019E0000000001",
                safepara: "0",
                waterpara: "0",
                solfpara: "0",
                atmpara: "0",
                warnpara: "0"},



        }

    },
    props:{
        showThisWindow:{
            type: Boolean,
            required:true

        },
        dataInPopUp:{
            type: Object,
            required:true

        }

    },
    computed:{
        showWindow:function(){
            return this.showThisWindow
        }

    },
    watch:{
        dataInPopUp:function(){
            this.myconsum=this.dataInPopUp

        },
        // showThisWindow:function(){
        //     this.showWindow=this.showThisWindow   
        // },
    


    },
    methods:{
        exite:function() {
            bus.$emit("showThisWindow",false)

            
        }
    }
    
}
</script>
<style>
.popuptable{

    height:400px;
    /* width:500px; */
    /* background-color: red; */
    position:absolute;
    top:90px;
    right:0px;
    width:40%;  
    background: rgba(241, 237, 237, 0.95);
    border: 1px solid #444;
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
    /* box-shadow: 0 0 10px 1px #000; */
    background-color: #080533;
    
    box-shadow: -10px 0px 15px #034c6a inset /*å·¦è¾¹é˜´å½±*/;

    white-space: normal;
    line-height: normal;
    font-weight: normal;
    font-size: medium;
    font-style: normal;
    z-index: 21;
}
.popuptable th{
    font-weight: bold;
    text-align: left;
    display: table-cell;
    width: 40%
}
.popuptable tr{
    border: 1px solid
}
.popuptable td{
    border: 1px solid;
    width: 60%
}

.divpoptable{

    width:95%;
    height: 350px;
    margin-left:10px; 
    overflow: auto;


}

</style>

