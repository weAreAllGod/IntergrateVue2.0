
	// 百度地图API功能
	var map = new BMap.Map("allmap");    // 创建Map实例
	map.centerAndZoom(new BMap.Point(116.83, 38.30), 13);  // 初始化地图,设置中心点坐标和地图级别
	//添加地图类型控件
	map.addControl(new BMap.MapTypeControl({
		mapTypes:[
            BMAP_NORMAL_MAP,//地图
            BMAP_SATELLITE_MAP,//卫星地图
            BMAP_HYBRID_MAP//混合地图
        ]}));
    //设置地图风格
    var  mapStyle ={ 
			features: ["road", "building","water","land"],//隐藏地图上的poi
					style : "dark"  //设置地图风格为高端黑
                    }
	map.setMapStyle(mapStyle);
    // 左上角，添加比例尺
    var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});
    map.addControl(top_left_control);
    //左上角添加缩放平移控件
    var top_left_navigation = new BMap.NavigationControl();
    map.addControl(top_left_navigation);
    //右下角添加缩略图
    var overView = new BMap.OverviewMapControl();
    var overViewOpen = new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT});
    map.addControl(overView);
    map.addControl(overViewOpen);
    //添加城市列表的控件
    var size = new BMap.Size(10, 20);
    map.addControl(new BMap.CityListControl({
    anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
    offset: size,
    // 切换城市之间事件
    // onChangeBefore: function(){
    //    alert('before');
    // },
    // 切换城市之后事件
    // onChangeAfter:function(){
    //   alert('after');
    // }
    }));
	map.setCurrentCity("沧州");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    map.enableInertialDragging();       //启用地图惯性拖拽
    map.enableContinuousZoom();         //开启连续缩放效果
    map.removeViewAt(1);
