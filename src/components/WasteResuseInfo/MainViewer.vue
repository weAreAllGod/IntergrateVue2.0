<template>
    <div id="mainDiv">
		<viw></viw>
        <div id="cesiumContainer">

        </div>
        <CesiumViewer v-if="viewer" :viewer="viewer"></CesiumViewer>
    </div>
</template>

<script>

   
	import Cesium from '../../../node_modules/cesium/Source/Cesium.js'

	import buildModuleUrl from "../../../node_modules/cesium/Source/Core/buildModuleUrl"
    import "../../../node_modules/cesium/Source/Widgets/widgets.css";
	import CesiumViewer from './CesiumViewer.vue'
	import viw from './View'

export default {
  name: 'MainViewer',
	components:{
		CesiumViewer,
		viw
	},
  data () {
    return {
        viewer:''
    }
  },
    mounted:function(){
        //设置静态资源目录
        buildModuleUrl.setBaseUrl('../../../static/Cesium/');
        //创建viewer实例
         // 加载谷歌卫星影像
	        var url = "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali";
	        var google = new Cesium.UrlTemplateImageryProvider({
		        url : url
	        });
            this.viewer = new Cesium.Viewer('cesiumContainer',{
            animation: false,
            baseLayerPicker: false,
            fullscreenButton: true,
            geocoder: true,
            homeButton: true,
            sceneModePicker: false,
            selectionIndicator: true,
            timeline: false,
            navigationHelpButton: true,
            infoBox: true,
            navigationInstructionsInitiallyVisible: false,
           
            imageryProvider : google,
		// 地形
		terrainProvider : new Cesium.CesiumTerrainProvider({
			url : Cesium.IonResource.fromAssetId(3956),
			requestVertexNormals : true
		}),

		terrainProvider : Cesium.createWorldTerrain({
			requestWaterMask : true,
			requestVertexNormals : true
		})
        });
        this.viewer._cesiumWidget._creditContainer.style.display = "none";  //去掉logo

          // 设置点

	var selectedEntity1 = this.viewer.entities.add({
		id : 'entity001',
		name : '          资源厂信息',
		code : "123456789",
		position : Cesium.Cartesian3.fromDegrees(115.393726, 38.905776),
		point : { // 点
			pixelSize : 5,
			color : Cesium.Color.RED,
			outlineWidth : 2
		},
		billboard : { // 图标
            /* image : '../assets/treatment_plant.png',  */ 
            /* image : "../assets/treatment_plant.png",  */
			width : 25,
			height : 25
        },
        description:
        '<table class="cesium-infoBox-defaultTable1"><tbody>'
									+ '<tr><th>资源场</th><td>'
									+ '1'
									+ '</td></tr>'
									+ '<tr><th>数据字段</th><td>'
									+ '数据内容1'
									+ '</td></tr>'
									+ '<tr><th>资源场单位基本信息</th><td>'
									+ '名称、法人、负责人1'
									+ '</td></tr>'
									+ '<tr><th>资源场位置</th><td>'
									+ '经纬度和地理信息1'
									+ '</td></tr>'
									+ '<tr><th>资源场类型</th><td>'
									+ '能够收纳的建筑垃圾类型1'
									+ '</td></tr>'
									+ '<tr><th>资源场每日收纳量</th><td>'
									+ '能够收集的建筑垃圾量1'
									+ '</td></tr>'
									+ '<tr><th> 资源场每日产出量</th><td>'
									+ '产品产出量1'
									+ '</td></tr>' + '</tbody></table>',
	});
	 var selectedEntity2 = this.viewer.entities.add({
		id : 'entity002',
		name : '          资源厂信息',
		code : "12345",
		position : Cesium.Cartesian3.fromDegrees(116.39, 39.90),
		point : { // 点
			pixelSize : 5,
			color : Cesium.Color.GREEN,
			outlineWidth : 2
		},

		billboard : { // 图标
			/* image : '../../assets/logo.png', */
			width : 25,
			height : 25
        },
        description : '<table class="cesium-infoBox-defaultTable2"><tbody>'
									+ '<tr><th>资源场</th><td>'
									+ '2'
									+ '</td></tr>'
									+ '<tr><th>数据字段</th><td>'
									+ '数据内容2'
									+ '</td></tr>'
									+ '<tr><th>资源场单位基本信息</th><td>'
									+ '名称、法人、负责人2'
									+ '</td></tr>'
									+ '<tr><th>资源场位置</th><td>'
									+ '经纬度和地理信息2'
									+ '</td></tr>'
									+ '<tr><th>资源场类型</th><td>'
									+ '能够收纳的建筑垃圾类型2'
									+ '</td></tr>'
									+ '<tr><th>资源场每日收纳量</th><td>'
									+ '能够收集的建筑垃圾量2'
									+ '</td></tr>'
									+ '<tr><th> 资源场每日产出量</th><td>'
									+ '产品产出量2'
									+ '</td></tr>' + '</tbody></table>',
  }); 
        


        

        // Set position with a top-down view
	    this.viewer.camera.setView({
		destination : Cesium.Cartesian3.fromDegrees(116.39, 39.9, 16000000.0),
		orientation : {
			heading : Cesium.Math.toRadians(0), // east, default value is 0.0
												// (north)
			pitch : Cesium.Math.toRadians(-90), // default value (looking down)
			roll : 0.0
		// default value
		},
    });
    




    }
}
</script>


<style scoped>
    #mainDiv{
        width:100%;
       height:100%; 
    }
    #cesiumContainer{
        width:100%;
        height:80%; 
    }
</style>