<template>
    <div id="con">
        <div id="allmap" v-if='reset' :style="mapStyle"></div>
    </div>
</template>
<script type="text/javascript">
import axios from 'axios'
export default{
    data(){
        return{
            sourceAddress:'',
            sourceCompany:'',
            startDate:'',
            sourceAttrbute:'',
            sourceType:'',
            wasteComponent:'',
            suggestion:'',
            content:'',

            info_modal:false,
            reset:true,
            data_info:[],
            mapStyle:{
                width:'100%',
                height:window.innerHeight-88+'px'
            }
        }
    },

    mounted(){
        this.ready()
    },
    methods:{
        ready:function(){
               // 百度地图API功能  
            var map = new BMap.Map("allmap");    // 创建Map实例
            map.centerAndZoom(new BMap.Point(116.4, 39.9), 13);  // 初始化地图,设置中心点坐标和地图级别
            //添加地图类型控件
            map.addControl(new BMap.MapTypeControl({
                mapTypes:[
                    BMAP_NORMAL_MAP,//地图
                    BMAP_SATELLITE_MAP,//卫星地图
                    BMAP_HYBRID_MAP//混合地图
                ]}));
            
            // 设置地图风格
            var  mapStyle ={ 
                            style : "midnight"  //设置地图风格
                            }
            map.setMapStyle(mapStyle);
            // 左上角，添加比例尺
            var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});
            map.addControl(top_left_control);
            //左上角添加缩放平移控件
            var top_left_navigation = new BMap.NavigationControl();
            map.addControl(top_left_navigation);

            //添加城市列表的控件
            var size = new BMap.Size(10, 20);
            map.addControl(new BMap.CityListControl({
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
            offset: size,
            }));

            // 向后端发送请求获取数据
            axios({
                headers: {
                  token: this.$store.state.token
                },
                method: "get",
                url:'/api/sourceInfo/si'
                })
                .then(response => {
                    this.data_info=response.data.data

                    var markers = [];
                    for(var i=0;i<this.data_info.length;i++){
                        //创建标注点
                        var marker = new BMap.Marker(new BMap.Point(this.data_info[i]['sourceLong'],this.data_info[i]['sourceLat']));
                        markers.push(marker);
                        map.addOverlay(marker);               // 将标注添加到地图中
                        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //设置点动画
                    }

                    var opts = {
                        boxStyle:{
                        opacity: "0.8",
                        background: "#081832",
                        width: "250px",
                        height: "370px"
                        },
                        closeIconUrl:"http://api0.map.bdimg.com/images/iw_close1d3.gif",
                        closeIconMargin: "10px 10px 0 0",
                        enableAutoPan: true,
                        align: INFOBOX_AT_TOP
                    };
                    

                    //监听点击事件
                    var _this=this
                    for(var i=0;i<markers.length;i++){
                        (function(){
                        var index=i
                        markers[i].addEventListener("click",function(e){
                            var content='测试';
                            var html = "<div class='infoBoxContent'><br><table id='info-table'><tr><th>产生源:</th><th>" 
                                +_this.data_info[index]['sourceAddress']+"</th></tr><tr><th>责任单位:</th><th>"
                                +_this.data_info[index]['sourceCompany']+"</th></tr><tr><th>上报时间:</th><th>"
                                +_this.data_info[index]['startDate']+"</th></tr><tr><th>属性:</th><th>"
                                +_this.data_info[index]['sourceAttrbute']+"</th></tr><tr><th>垃圾类型:</th><th>"
                                +_this.data_info[index]['sourceType']+"</th></tr><tr><th>成分分析:</th><th>"
                                +_this.data_info[index]['wasteComponent']+"</th></tr><tr><th>建议:</th><th>"
                                +_this.data_info[index]['suggestion']+"</th></tr><tr><th>备注:</th><th>"
                                +_this.data_info[index]['content']+"</th></tr></table></div>"
                                
                            // 创建信息窗口对象
                            // var infoWindow = new BMap.InfoWindow(content,opts);
                            var infoWindow =  new BMapLib.InfoBox(map,html,opts);
                            // 打开信息窗口
                            // map.openInfoWindow(infoWindow,point);
                            infoWindow.open(markers[index]);

                        })
                    })();

                    }

            })
            .catch(error => console.log(error))

            map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
            map.enableInertialDragging();       //启用地图惯性拖拽
            map.enableContinuousZoom();         //开启连续缩放效果
        }
    }
}
</script>

<style>
#allmap{
    width:100%;
    overflow: hidden;
    float: left;
}
#info-table{
    font-weight: unset;
    font-size: 16px;
    color: white;
    width: 100%;
    border: 1px;
}
#info-table table,td, th{
    border:1px solid #008CBA;
    text-align: center;
  }

#con{
    overflow: hidden;
}
/* 隐藏百度地图图标和文字 */
.BMap_cpyCtrl
{
display:none; 
}
.anchorBL{
display:none; }

.infoBoxContent{
      margin:20px;
    }
    .infoBoxContent button{
      background-color: #008CBA;
      border: none;
      color: white;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      border-radius: 16px;
      width: 120px;
    }
    .infoBoxContent h3{
      color: white;
    }
    .infoBoxContent p{
      color:white;
    }
    .infoBoxContent:before {
      content: '';
      width: 0;
      height: 0;
      border: 20px solid transparent;
      border-top-color: #081832;
      position: absolute;
      left: 50%;
      top: 100%;
      margin-left: -20px;
    }

</style>
