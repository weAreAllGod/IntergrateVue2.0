/* 表格信息 */
<template>
  <div>
    <viw></viw>
    <!-- <div  style='width:260px' class="row mb-5"> -->
      <div   class="row"  style="background-color: #081832;">
        <div id="elmenu">
    <el-col :span="3">
      <!-- <el-menu :default-active="$route.path" class="el-menu-vertical-demo" 
               theme="dark"
               router> -->
    <el-menu id="meme" default-active="$route.path" class="el-menu-vertical-demo" 
    router>
        <el-menu-item index="/query/WASTE_REUSE_INFO" >垃圾二次利用基本信息表</el-menu-item>
        <el-menu-item index="/query/RESOURCE_PLANT_INFO" >资源场基本信息</el-menu-item>
        
      </el-menu>
    </el-col>
    </div>

      <div class="col-8">
        <!--导航所对应的内容-->
        <!-- 二级导航菜单 -->
        <router-view/> 
      </div>
      
    </div>
  </div>
</template>

<script>
import viw from '../View'
export default {
  name: 'Chart',
  components:{
    viw
  },
  
}
</script>

<style>

.el-menu-item{
  color: blanchedalmond;
  background-color: #04425f;
}
.el-menu-item.is-active{
  color: blanchedalmond;
  background-color: #04425f;
}
.el-menu-item:hover{
  background-color: rgba(50, 104, 205, 0.801);
}
.row{
  height: 800px;
}
#meme{
  height: 100px;
  width:190px;
   z-index: 5;
}
.col-8{
  height: 800px;
  /* margin-left: 160px; */
}

/* 共多少条 */
.ivu-page-total{ 
  color:#FFFFFF;
}

/* 跳至第几页 */
.ivu-page-options-elevator{
  color:#FFFFFF;
}
</style>
