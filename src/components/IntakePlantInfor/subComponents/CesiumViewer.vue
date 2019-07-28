<template>
    <div id="cesiumDiv" style="z-index:1">
    </div>
</template>

<script>
export default {
  name: 'CesiumViewer',
    props:{
        //  viewer:{
        // type:Object,
        // required:true

        // }
    },
  data () {
    return {

    }
  },
    mounted:function(){
      console.log(this.viewer);
      console.log("在这里进行Cesium和viewer的操作！");
  
      
    },

}
  //监听相机的移动

</script>


<style scoped>

</style>