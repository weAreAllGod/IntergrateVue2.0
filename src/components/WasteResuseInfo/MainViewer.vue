<template>
    <div id="mainDiv" style="height=100%">
		<div><viw></viw></div>
        <div id="cesiumContainer">
        	<CesiumViewer></CesiumViewer>
        </div>
		
    </div>
</template> 

<script>
	import viw from './View'
	import CesiumViewer from './CesiumViewer.vue'
	import Cesium from '../../../node_modules/cesium/Source/Cesium.js'
	import buildModuleUrl from "../../../node_modules/cesium/Source/Core/buildModuleUrl"
    import "../../../node_modules/cesium/Source/Widgets/widgets.css";
	

export default {
  name: 'MainViewer',
	components:{
		CesiumViewer,
		Cesium,
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
        //初始化的时候把视角放在中国
    // 设置好我的密匙
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ZmJiMTQzMC0xYjFlLTRlZDktYjI5ZS1mOGIxMzY2ZDQ1NTciLCJpZCI6ODYwOCwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU1MjM3OTcyN30.MSLoEjzlm83XTm1qRlt521SlgoU2jsthi566S6-9m_w';
    var china=Cesium.Rectangle.fromDegrees(100,10,120,70);
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = china;
    //创建viewer实例
    // 天地图http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles

   
    var url = "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali";
    var google=new Cesium.UrlTemplateImageryProvider({url:url})
 
  // 矢量底图
   var tdtImagerLayerProvider = new Cesium.WebMapTileServiceImageryProvider({
            url:"http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=aacbbcb77eaa21d2af0e4c4b03a2de88",
            layer: "tdtImgAnnoLayer",
            style: "default",
            // format: "image/jpeg",
            tileMatrixSetID: "GoogleMapsCompatible",
            show: false,
            // maximumLevel:18
        });
    // 影像底图
    var tdtImagerLayerProvider1 = new Cesium.WebMapTileServiceImageryProvider({
      url:"http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=aacbbcb77eaa21d2af0e4c4b03a2de88",
      layer: "tdtImgAnnoLayer",
      style: "default",
      // format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible", 
      show: false,
      // maximumLevel:18
    });
    // 标注底图
    var tdtImagerLayerProvider2 = new Cesium.WebMapTileServiceImageryProvider({
    url:"http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=aacbbcb77eaa21d2af0e4c4b03a2de88",
    layer: "tdtImgAnnoLayer",
    style: "default",
    // format: "image/jpeg",
    tileMatrixSetID: "GoogleMapsCompatible",
    show: false,
    // maximumLevel:18
  });


    this.viewer = new Cesium.Viewer('cesiumContainer',{
        animation: false,
        baseLayerPicker: false,//表示地形地貌
        fullscreenButton: false,
        geocoder: true,//搜索框
        homeButton: false,
        // sceneModePicker: false,//表示是2d还是3d
        // selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        infoBox: true,//表示消息栏
        navigationInstructionsInitiallyVisible: false,
        //地形的提供者
        // imageryProvider: tdtImagerLayerProvider,
        imageryProvider:tdtImagerLayerProvider1,
        // imageryProvider:tdtImagerLayerProvider2
        terrainProvider : Cesium.createWorldTerrain()
         
    });
    this.viewer.imageryLayers.addImageryProvider( tdtImagerLayerProvider2); 

    
    this.viewer._cesiumWidget._creditContainer.style.display = "none";  //去掉logo 
		



          // 设置点
		this.viewer.entities.add({
			id : 'entity001',
			name : '          资源厂信息',
			code : "123456789",
			position : Cesium.Cartesian3.fromDegrees(116.39, 39.90),
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
										+ '<tr><th>资源场名称  </th><td>'
										+ '神华资源厂'
										+ '</td></tr>'
										+ '<tr><th>位置</th><td>'
										+ '北京市昌平区21号'
										+ '</td></tr>'
										+ '<tr><th>法人</th><td>'
										+ '王鹏'
										+ '</td></tr>'
										+ '<tr><th>类型</th><td>'
										+ '只固体'
										+ '</td></tr>'
										+ '<tr><th>每日收纳量</th><td>'
										+ '200t'
										+ '</td></tr>'
										+ '<tr><th>日产出量</th><td>'
										+ '10t'
										+ '</td></tr>'
										+ '<tr><th> 备注</th><td>'
										+ '无'
										+ '</td></tr>' + '</tbody></table>',
		});
		var selectedEntity2 = this.viewer.entities.add({
			id : 'entity002',
			name : '          资源厂信息',
			code : "12345",
			position : Cesium.Cartesian3.fromDegrees(115.393726, 38.905776),
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
										+ '<tr><th>资源场名称  </th><td>'
										+ '中华资源厂'
										+ '</td></tr>'
										+ '<tr><th>位置</th><td>'
										+ '河北省沧州市经济技术开发区'
										+ '</td></tr>'
										+ '<tr><th>法人</th><td>'
										+ '赵毅'
										+ '</td></tr>'
										+ '<tr><th>类型</th><td>'
										+ '全类型建筑垃圾'
										+ '</td></tr>'
										+ '<tr><th>每日收纳量</th><td>'
										+ '500t'
										+ '</td></tr>'
										+ '<tr><th>日产出量</th><td>'
										+ '50t'
										+ '</td></tr>'
										+ '<tr><th> 备注</th><td>'
										+ '无'
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
        height:100%; 
    }
	
	
</style>