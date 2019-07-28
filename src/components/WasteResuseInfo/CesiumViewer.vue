<template>
    <div id="cesiumDiv">
    </div>
</template>

<script>
import Cesium from '../../../node_modules/cesium/Source/Cesium.js'
export default {
  name: 'CesiumViewer',
    props:['viewer'],
  data () {
    return {

    }
  },
    mounted:function(){
      console.log(this.viewer);
      console.log("在这里进行Cesium和viewer的操作！");

  
  
    }
}
</script>

<style scoped>

</style>
