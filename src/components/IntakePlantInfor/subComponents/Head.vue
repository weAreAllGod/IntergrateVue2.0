<template>
  <div class="div1" id="div1">
            <a class="menue">首页</a> 
            <a class="menue">产生源监测 </a> 
            <a class="menue">电子联单 </a> 
            <a class="menue">运转车辆监控</a> 
            <a class="menue">安全与环境检测</a> 
            <a class="menue">资源化信息管理 </a> 
            <a class="menue">运维管理 </a>     
    </div>       
</template>

<script>
export default {
  name: 'Head',
  data () {
    return {
    //   msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
 .div1{
        background-image: url('/static/IntakePlantStaticSource/Image/test.png');
        background-size: cover;
        /* background-position-y: -500px; */
        padding-top: 0px;
        margin-left: 0;
        margin-right: 0;
        height: 40px;
        position: fixed;        
        top: 0;left: 0;right: 0;
        text-align:center; line-height: 40px;
        z-index: 1;
         /* background-color: greenyellow; */

    }
    .menue{
        color:white


    }
    .menue:hover{
        cursor:pointer;
        color:yellow;
        font-size: 18px;
        

        }
</style>
