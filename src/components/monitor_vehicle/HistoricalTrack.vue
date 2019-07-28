<template>
  <div id="app">
    <Vew></Vew>
    <div id="clear"></div>
    <div id="content">
      <div id="left_content" @mouseover="enter($event)" @mouseout="leave($event)">
        <div id="nav1">
          <div style="text-align: center; font-size: 15px;">
            <label style="text-align: left;  color: white; font-size: 15px;">开始时间：</label>
            <br>
            <input type="datetime-local" id="sta" style="margin_left: 20px；font-size: 15px;" v-model="startTime">
            <br>
            <label style=" color: white; font-size: 15px;">结束时间：</label>
            <br>
            <input type="datetime-local" id="end" v-model="endTime">
          </div>
          <br>
          <form style="text-align: center;  color: white; font-size: 15px;">
            <label style=" color: white; font-size: 15px;">播放速度:</label>
            <br>
            <input type="radio" name="gender" value="1" checked="true" @click="CheckItem2('1')"> 1x
            <input type="radio" name="gender" value="2" @click="CheckItem2('2')"> 2x
            <input type="radio" name="gender" value="3" @click="CheckItem2('3')"> 3x
            <input type="radio" name="gender" value="4" @click="CheckItem2('4')"> 4x
          </form>

          <ul id="carmenu" v-for="(item,index) in company_list" :key="index">
            <li style="	text-align: left;">
              <input type="checkbox" :value="item.CAR_COMPANY_NAME" @click="CheckItem(item)">
              {{item.CAR_COMPANY_NAME}}
              <ul
                v-for="(item1,index) in carbelong_list"
                :key="index"
                class="le"
                :value="item1.CAR_BELONG_COMPANY"
                style="display: none;"
              >
                <li v-if="item1.CAR_BELONG_COMPANY===item.CAR_COMPANY_NAME" class="left_li">
                  <input
                    type="checkbox"
                    :value="item1.CAR_BELONG_COMPANY"
                    @click.stop="CheckItem1(item1)"
                  >
                  <img
                    class="p_r"
                    v-if="item1.value!='J00001'"
                    
                    src="./image/run.png"
                    
                  >
                 
                  {{item1.CAR_NAME}}
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div id="menu">
          菜
          <br>
          <br>单
          <br>
          <br>栏
        </div>
      </div>
      <div id="right"></div>
      <!-- 车辆信息的窗口 -->
      <div id="floatWindow">
        <div id="one">
          <a
            id="close"
            href="#"
            style="text-decoration: none;font-size:20px;  color: white;"
            @click="fclose"
          >×</a>
        </div>
        <table>
          <!-- <tr>
            <th>指标</th>
            <th></th>
          </tr> -->

          <tr>
            <td class="m_td">指标</td>
            <td class="d_td">状态</td>
          </tr>
          <tr>
            <td class="m_td">车牌</td>
            <td class="d_td">{{cardata.CAR_ID}}</td>
          </tr>
          <tr>
            <td class="m_td">坐标</td>
            <td class="d_td">{{cardata.CAR_LONG}}/{{cardata.CAR_LAT}}</td>
          </tr>
          <tr>
            <td class="m_td">位置</td>
            <td class="d_td">{{pos}}</td>
          </tr>
          <tr>
            <td class="m_td">速度</td>
            <td class="d_td">{{cardata.SPEED}}</td>
          </tr>
          <tr>
            <td class="m_td">海拔</td>
            <td class="d_td">{{cardata.HEIGHT}}</td>
          </tr>
          <tr>
            <td class="m_td">密闭</td>
            <td class="d_td">{{cardata.AIRTIGHT}}</td>
          </tr>
          <tr>
            <td class="m_td">举升</td>
            <td class="d_td">{{cardata.LIFT}}</td>
          </tr>
          <tr>
            <td class="m_td">里程</td>
            <td class="d_td">{{cardata.MILE}}</td>
          </tr>
        </table>
      </div>

      <div id="videoWindow">
        <div id="one">
          <a
            id="close"
            href="#"
            style="text-decoration: none; font-size:20px; color: white;"
            @click="vclose"
          >×</a>
        </div>
        <form style="text-align: center;font-size:16px;">
          <label>信号源:</label>
          <br>
          <input type="radio" name="gender" value="1" checked="true"> 1
          <input type="radio" name="gender" value="2"> 2
          <input type="radio" name="gender" value="3"> 3
          <input type="radio" name="gender" value="4"> 4
        </form>
        <video width="250" height="240" controls>
          <source
            src="http://fishc.oss-cn-hangzhou.aliyuncs.com/Web/video_tag.mp4"
            type="video/mp4"
          >
        </video>
      </div>
    </div>
    <div id="footer">
      <p>
        <a href="#">关于</a>
        <a href="#">广告</a>
        <a href="#">联系</a>
        <a href="#">合作</a>
        <a href="#">版权</a>
      </p>
      <p>
        <!-- <a href="#">京ICP备 0000001号</a> -->
        All right(C) 2008-2010 resved.
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vew from "./View.vue";
import carla from './image/monitor_vehicle/car1.png'
import carala from './image/monitor_vehicle/car_a.png'

export default {
  name: "HistoricalTrack",
  data() {
    return {
      dis: "block",
      cou: 0,
      company_list: [],
      carbelong_list: [],
      map: "",
      obj_line: [], //存放线路的数据
      obj_car: [], //存放车辆的数据
      da_few: "", //存
      point_pre: [], //存放第一个点的数据
      cun: [], //存放查询第几条数据
      sum: -1, //存放车辆的数量
      speed: 100,
      car_line: [],
      judge: true,
      obj_va: [],
      obj_judge: [],
      colo: ["red", "green", "black"],
      marker_judge: [],
      marker_click: [],
      sp: 1,
      car_length: 0,
      sContent: "",
      startTime: "",
      endTime: "",
      cardata: "",
      carMk_af: "",
      pos: ""
    };
  },
  components: {
    Vew
  },
  mounted: function() {
    // console.log(ssss);
    this.map = new BMap.Map("right");
    // 创建地图实例
    var point = new BMap.Point(116.408208, 39.913963);
    // 创建点坐标
    this.map.centerAndZoom(point, 10);
    //能移动
    this.map.enableScrollWheelZoom(true);
    var opt_sca = { anchor: BMAP_ANCHOR_BOTTOM_LEFT }; //定义控件位置

    this.map.addControl(new BMap.NavigationControl());
    this.map.addControl(new BMap.ScaleControl(opt_sca));
    this.map.addControl(new BMap.OverviewMapControl());
    this.map.addControl(new BMap.MapTypeControl());
		this.map.setMapStyle({style:'midnight'});

    document.getElementById("sta").value = "";
    document.getElementById("end").value = "";

    axios({
      headers: {
        token: this.$store.state.token
      },
      method: "get",
      url: "/api/CarCompany/select"
    }).then(data => {
      this.company_list = data.data.data;
      console.log(this.company_list);
    });

    axios({
      headers: {
        token: this.$store.state.token
      },
      method: "get",
      url: "/api/CarBelong/select"
    }).then(data => {
      this.carbelong_list = data.data.data;
      console.log(this.carbelong_list);
    });

    var myIcon = new BMap.Icon(
      carala,
      new BMap.Size(48, 48),
      {
        // 指定定位位置。
        // 当标注显示在地图上时，其所指向的地理位置距离图标左上
        // 角各偏移10像素和25像素。您可以看到在本例中该位置即是
        // 图标中央下端的尖角位置。
        anchor: new BMap.Size(24, 24),
        // 设置图片偏移。
        // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
        // 需要指定大图的偏移位置，此做法与css sprites技术类似。
        imageOffset: new BMap.Size(0, 0) // 设置图片偏移
      }
    );
    this.carMk_af = new BMap.Marker(point, { icon: myIcon });
  },
  beforeDestroy: function() {
    for (var i = 0; i < this.obj_judge.length; i++) {
      this.obj_judge[i] = false;
    }
    this.vclose();
    this.fclose();
  },
  methods: {
    sh_hid: function() {
      window.alert("0000");
    },
    run: function(CarName, startTime, endTime) {
      // this.cun = 1;
      var data_time = {
        CAR_ID: CarName,
        START_TIME: startTime,
        END_TIME: endTime
      };
      axios({
        headers: {
          token: this.$store.state.token
        },
        method: "post",
        url: "/api/carTrailInfo/selectByTime",
        data: data_time
      }).then(data => {
        console.log(data);
        Date.prototype.toLocaleString = function() {
          return (
            this.getFullYear() +
            "-" +
            (this.getMonth() + 1) +
            "-" +
            this.getDate() +
            " " +
            this.getHours() +
            ":" +
            this.getMinutes() +
            ":" +
            this.getSeconds()
          );
        };
        var unixTimestamp = new Date(data.data.data[0].INPUT_TIME);
        var commonTime = unixTimestamp.toLocaleString();
        console.log(commonTime);

        var ve_info_pre1 = data.data.data[0];
        console.log(ve_info_pre1);
        var ss = this.wgs2bd(ve_info_pre1.CAR_LAT, ve_info_pre1.CAR_LONG);
        var point_pre1 = new BMap.Point(ss[1], ss[0]);
        var see = 0;
        // console.log(data.length)
        for (var count = 1; count < data.data.data.length; count++) {
          var ve_info_aft1 = data.data.data[count];
          console.log(ve_info_aft1);
          console.log("?????");
          var ss_a = this.wgs2bd(ve_info_aft1.CAR_LAT, ve_info_aft1.CAR_LONG);
          var point_aft1 = new BMap.Point(ss_a[1], ss_a[0]);
          // this.setRotation(point_pre,point_aft,this.obj_car[sum])
          // this.obj_car[sum].setPosition(point_aft);

          const polyline = new BMap.Polyline([point_pre1, point_aft1], {
            strokeColor: this.colo[this.sum],
            strokeWeight: 6,
            strokeOpacity: 0.5
          });
          this.car_line[this.sum][see] = polyline;
          this.map.addOverlay(polyline);
          point_pre1 = point_aft1;
          see++;
        }
      });

      // var url='http://localhost:8080/carTrailInfo/selectHistory/'+ '?start'+startTime+'&carname='+CarName;
      // console.log(this)
      var data_time1 = {
        CAR_ID: CarName,
        START_TIME: startTime,
        END_TIME: endTime,
        ID: 0
      };
      axios({
        headers: {
          token: this.$store.state.token
        },
        method: "post",
        url: "/api/carTrailInfo/selectHistory",
        data: data_time1
      }).then(data => {
        console.log(data);
        var infoWindow = new BMap.InfoWindow(this.sContent);
        var myIcon = new BMap.Icon(
          carla,
          new BMap.Size(48, 48),
          {
            // 指定定位位置。
            // 当标注显示在地图上时，其所指向的地理位置距离图标左上
            // 角各偏移10像素和25像素。您可以看到在本例中该位置即是
            // 图标中央下端的尖角位置。
            anchor: new BMap.Size(24, 24),
            // 设置图片偏移。
            // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
            // 需要指定大图的偏移位置，此做法与css sprites技术类似。
            imageOffset: new BMap.Size(0, 0) // 设置图片偏移
          }
        );

        var ve_info_pre = data.data.data;
        var ss = this.wgs2bd(ve_info_pre[0].CAR_LAT, ve_info_pre[0].CAR_LONG);
        var point_pre = new BMap.Point(ss[1], ss[0]);

        this.point_pre[this.sum] = ss;
        var ce_lat = 0;
        var ce_long = 0;
        for (var co = 0; co < this.point_pre.length; co++) {
          ce_lat = ce_lat + this.point_pre[co][0];
          ce_long = ce_long + this.point_pre[co][1];
        }
        var cen = new BMap.Point(
          ce_long / this.car_length,
          ce_lat / this.car_length
        );
        this.map.centerAndZoom(cen, 12);

        for (var ce = 0; ce < this.point_pre.length; ce++) {
          if (this.point_pre[ce][0] != 0 && this.point_pre[ce][1] != 0) {
            var pos = new BMap.Point(
              this.point_pre[ce][1],
              this.point_pre[ce][0]
            );
            var bound = this.map.getBounds();
            console.log(6666);
            if (bound.containsPoint(pos) == true) {
              console.log(5555);
            } else {
              while (1) {
                this.map.zoomOut();
                var bound = this.map.getBounds();
                if (bound.containsPoint(pos) == true) {
                  break;
                }
              }
            }
          }
        }

        var carMk = new BMap.Marker(point_pre, { icon: myIcon });
        this.map.addOverlay(carMk);
        this.obj_car[this.sum] = carMk;

        resetMkPoint(
          this.map,
          this.sum,
          this.cun,
          this.obj_line,
          this,
          CarName,
          point_pre,
          data_time1
        );

        function resetMkPoint(
          map,
          sum,
          cun,
          obj_line,
          th,
          CarName,
          point_pre,
          data_time1
        ) {
          // var car_i = "{'id':" + cun[sum] + ", 'Carname':"+CarName+"}"
          // url='http://localhost:8080/carTrailInfo/select/'+'?id='+cun[sum]+'&carname='+CarName;
          console.log(data_time1);
          data_time1.ID = cun[sum];
          axios({
            headers: {
              token: th.$store.state.token
            },
            method: "post",
            url: "/api/carTrailInfo/selectHistory",
            data: data_time1
          }).then(data => {
            var ve_info_aft = data.data.data;
            console.log(ve_info_aft);
            if (ve_info_aft[0] != null) {
              var ss_a = th.wgs2bd(
                ve_info_aft[0].CAR_LAT,
                ve_info_aft[0].CAR_LONG
              );
              var point_aft = new BMap.Point(ss_a[1], ss_a[0]);
              th.setRotation(point_pre, point_aft, th.obj_car[sum]);
              th.obj_car[sum].setPosition(point_aft);

              // const polyline = new BMap.Polyline([
              // 	point_pre,
              // 	point_aft
              // 	],
              // 	{strokeColor:th.colo[sum], strokeWeight:6, strokeOpacity:0.5}
              // 	);
              // th.car_line[sum][cun[sum]-1] = polyline;
              // map.addOverlay(polyline);

              th.sContent =
                "<div style='text-align: center;'>" +
                "<table style='border-collapse: collapse; border: 2px solid #333333; float: left; height:126px; '>" +
                "<tr style='border-collapse: collapse; border: 2px solid #333333;'><th>指标</th> <th>状态</th></tr>" +
                "<tr><td>车牌号</td><td>" +
                ve_info_aft[0].CAR_ID +
                "</td></tr>" +
                "<tr><td>速度</td><td>" +
                ve_info_aft[0].SPEED +
                "</td></tr>" +
                "<tr><td>位置</td><td>" +
                ve_info_aft[0].CAR_LONG +
                "/" +
                ve_info_aft[0].CAR_LAT +
                "</td></tr>" +
                "<tr><td>海拔</td><td>" +
                ve_info_aft[0].HEIGHT +
                "</td></tr>" +
                "<tr><td>里程</td><td>" +
                ve_info_aft[0].MILE +
                "</td></tr>" +
                "<tr><td>密闭</td><td>" +
                ve_info_aft[0].AIRTIGHT +
                "</td></tr>" +
                "<tr><td>举升</td><td>" +
                ve_info_aft[0].LIFT +
                "</td></tr>" +
                "</table>" +
                "<input type='image' id='imgDemo' src='/image/monitor_vehicle/car_b.jpg' />" +
                "</div>";
              // +"<button onclick='sh_hid()'>sssss</button>"
              // +"<div id = 'ssk'></div>";
            }
            var infoWindow = new BMap.InfoWindow(th.sContent);
            var han = function() {
              for (var m_l = 0; m_l < th.marker_judge.length; m_l++) {
                th.marker_judge[m_l] = false;
              }
              th.marker_judge[sum] = true;
              // this.openInfoWindow(infoWindow);
              //图片加载完毕重绘infowindow
              // window.alert("sss")
            };
            var ht = th.obj_car[sum].addEventListener("click", han);

            var close = function() {
              th.marker_judge[sum] = false;
            };
            infoWindow.addEventListener("clickclose", close);
            if (th.marker_judge[sum]) {
              th.cardata = ve_info_aft[0];
              document.getElementById("floatWindow").style.display = "block";
              document.getElementById("videoWindow").style.display = "block";
              th.setRotation(point_pre, point_aft, th.carMk_af);
              th.carMk_af.setPosition(point_aft);
              th.carMk_af.setTop(true);
              th.map.addOverlay(th.carMk_af);
              axios({
							headers: {
                  				token: th.$store.state.token
                			},
							method:'get',
							url: '/apmap/geocoder/v2/?location='+ss_a[0]+','+ss_a[1]+'&output=json&pois=1&latest_admin=1&ak=hKwhYngdC7zlLhqNekMxrMXgnhWfxI6r'
						}).then((data)=>{
							console.log(data.data)
							console.log(data.data.result.formatted_address);
							th.pos= data.data.result.formatted_address
							// console.log(ve_info_aft[0])
						});
              // th.obj_car[sum].openInfoWindow(infoWindow);
              // document.getElementById('imgDemo').onload = function(){
              // 	infoWindow.redraw();//防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
              // }
            }
            th.marker_click[sum][cun[sum] - 1] = ht;
            console.log("hshfh", th.marker_click);
            if (th.marker_click[sum].length != 1) {
              th.obj_car[sum].removeEventListener("click", han);
              th.marker_click[sum].splice(cun[sum] - 1, 1);
            }
            point_pre = point_aft;
          });
          console.log(th.sp);
          if (th.obj_judge[sum]) {
            setTimeout(function() {
              cun[sum]++;
              resetMkPoint(
                map,
                sum,
                cun,
                obj_line,
                th,
                CarName,
                point_pre,
                data_time1
              );
            }, 1000 / th.sp);
          }
        }
      });
    },
    CheckItem: function(item) {
      item.state = !item.state;
      console.log(item);
      var le = document.getElementsByClassName("le");
      console.log(item.CAR_COMPANY_NAME, le[0].getAttribute("value"));
      for (var i = 0; i < le.length; i++) {
        if (
          item.state == false &&
          item.CAR_COMPANY_NAME == le[i].getAttribute("value")
        ) {
          // this.dis = 'none';
          le[i].style.display = "none";
        } else if (
          item.state == true &&
          item.CAR_COMPANY_NAME == le[i].getAttribute("value")
        ) {
          le[i].style.display = "block";
        }
      }

      // var sta = document.getElementById('end').value
      // console.log(sta)
      // console.log(this.startTime)
      // console.log(this.endTime)
      var ti = this.datetimeconvert(this.endTime);
      console.log(ti);
    },
    CheckItem1: function(item) {
      console.log(item);
      item.state = !item.state;
      var sta = this.datetimeconvert(document.getElementById("sta").value);
      var end = this.datetimeconvert(document.getElementById("end").value);
      console.log(sta);
      console.log(end);
      var st = /[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{2}:[0-9]{2}/;
      var arr = sta.match(st);
      var arr1 = end.match(st);
      console.log(arr);
      console.log(arr1);
      if (arr != null && arr1 != null) {
        console.log(item);
        console.log(item.CAR_NAME);
        if (item.state == true) {
          this.sum++;
          this.car_length++;
          this.cun[this.sum] = 1;
          this.obj_judge[this.sum] = true;
          this.obj_va[this.sum] = item.CAR_NAME;
          this.car_line[this.sum] = [];
          this.marker_click[this.sum] = [];
          this.run(item.CAR_NAME, sta, end);
        } else {
          for (var su = 0; su < this.obj_va.length; su++) {
            if (this.obj_va[su] == item.CAR_NAME) {
              this.obj_judge[su] = false;
              console.log("ddddddd" + this.car_line[su]);
              for (var m = 0; m < this.car_line[su].length; m++) {
                this.map.removeOverlay(this.car_line[su][m]);
              }
              this.map.removeOverlay(this.obj_car[su]);
              this.point_pre[su] = [0, 0];
              // this.obj_va.splice(su, 1);
              // this.cun.splice(su, 1);
              // this.car_line.splice(su, 1);
              // this.obj_car.splice(su, 1);
              // this.obj_judge.splice(su,1);
              // this.sum--;
              this.obj_va[su] = "00"
              this.car_length--;
              if (this.marker_judge[su]) {
                this.marker_judge[su] = false;
                this.fclose();
                this.vclose();
                this.map.removeOverlay(this.carMk_af);
              }
            }
          }
        }
      } else if (item.state == true && (arr == null || arr1 == null)) {
        window.alert("请输入正确的时间");
        console.log(item);
        // item.state = !item.state;
      }
    },
    CheckItem2: function(item) {
      console.log(item);
      this.sp = item;
      console.log(this.sp);
    },
    //世界大地坐标转为百度坐标
    wgs2bd: function(lat, lon) {
      var wgs2gcjR = this.wgs2gcj(lat, lon);
      var gcj2bdR = this.gcj2bd(wgs2gcjR[0], wgs2gcjR[1]);
      return gcj2bdR;
    },
    gcj2bd: function(lat, lon) {
      var pi = 3.14159265358979324;
      var a = 6378245.0;
      var ee = 0.00669342162296594323;
      var x_pi = (3.14159265358979324 * 3000.0) / 180.0;
      var x = lon,
        y = lat;
      var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
      var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
      var bd_lon = z * Math.cos(theta) + 0.0065;
      var bd_lat = z * Math.sin(theta) + 0.006;
      var result = [];
      result.push(bd_lat);
      result.push(bd_lon);
      return result;
    },

    wgs2gcj: function(lat, lon) {
      var pi = 3.14159265358979324;
      var a = 6378245.0;
      var ee = 0.00669342162296594323;
      var x_pi = (3.14159265358979324 * 3000.0) / 180.0;
      var dLat = this.transformLat(lon - 105.0, lat - 35.0);
      var dLon = this.transformLon(lon - 105.0, lat - 35.0);
      var radLat = (lat / 180.0) * pi;
      var magic = Math.sin(radLat);
      magic = 1 - ee * magic * magic;
      var sqrtMagic = Math.sqrt(magic);
      dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * pi);
      dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * pi);
      var mgLat = lat + dLat;
      var mgLon = lon + dLon;
      var result = [];
      result.push(mgLat);
      result.push(mgLon);
      return result;
    },

    transformLat: function(lat, lon) {
      var pi = 3.14159265358979324;
      var a = 6378245.0;
      var ee = 0.00669342162296594323;
      var x_pi = (3.14159265358979324 * 3000.0) / 180.0;
      var ret =
        -100.0 +
        2.0 * lat +
        3.0 * lon +
        0.2 * lon * lon +
        0.1 * lat * lon +
        0.2 * Math.sqrt(Math.abs(lat));
      ret +=
        ((20.0 * Math.sin(6.0 * lat * pi) + 20.0 * Math.sin(2.0 * lat * pi)) *
          2.0) /
        3.0;
      ret +=
        ((20.0 * Math.sin(lon * pi) + 40.0 * Math.sin((lon / 3.0) * pi)) *
          2.0) /
        3.0;
      ret +=
        ((160.0 * Math.sin((lon / 12.0) * pi) +
          320 * Math.sin((lon * pi) / 30.0)) *
          2.0) /
        3.0;
      return ret;
    },

    transformLon: function(lat, lon) {
      var pi = 3.14159265358979324;
      var a = 6378245.0;
      var ee = 0.00669342162296594323;
      var x_pi = (3.14159265358979324 * 3000.0) / 180.0;
      var ret =
        300.0 +
        lat +
        2.0 * lon +
        0.1 * lat * lat +
        0.1 * lat * lon +
        0.1 * Math.sqrt(Math.abs(lat));
      ret +=
        ((20.0 * Math.sin(6.0 * lat * pi) + 20.0 * Math.sin(2.0 * lat * pi)) *
          2.0) /
        3.0;
      ret +=
        ((20.0 * Math.sin(lat * pi) + 40.0 * Math.sin((lat / 3.0) * pi)) *
          2.0) /
        3.0;
      ret +=
        ((150.0 * Math.sin((lat / 12.0) * pi) +
          300.0 * Math.sin((lat / 30.0) * pi)) *
          2.0) /
        3.0;
      return ret;
    },
    //鼠标移入移出
    enter: function($event) {
      console.log("sssss");
      // $event.currentTarget.style.margin_left = '10px';
      document.getElementById("left_content").style.marginLeft = "-10px";
      document.getElementById("nav1").style.display = "block";
      document.getElementById("menu").style.display = "none";
    },
    leave: function($event) {
      document.getElementById("left_content").style.marginLeft = "-210px";
      document.getElementById("nav1").style.display = "none";
      document.getElementById("menu").style.display = "block";
    },
    //车头移动
    setRotation: function(curPos, targetPos, carmarker) {
      var deg = 0;
      curPos = this.map.pointToPixel(curPos);
      targetPos = this.map.pointToPixel(targetPos);
      if (targetPos.x != curPos.x) {
        var tan = (targetPos.y - curPos.y) / (targetPos.x - curPos.x),
          atan = Math.atan(tan);
        deg = (atan * 360) / (2 * Math.PI);
        if (targetPos.x < curPos.x) {
          deg = -deg + 90 + 90;
        } else {
          deg = -deg;
        }
        carmarker.setRotation(-deg);
      } else {
        var disy = targetPos.y - curPos.y;
        var bias = 0;
        if (disy > 0) bias = -1;
        else bias = 1;
        carmarker.setRotation(-bias * 90);
      }
      return;
    },
    //时间转换
    datetimeconvert: function(datetime) {
      var date = datetime.split("T");
      console.log(date);
      return date[0] + " " + date[1];
    },
    //关闭右边的窗口
    fclose: function() {
      document.getElementById("floatWindow").style.display = "none";
      for (var i = 0; i < this.marker_judge.length; i++) {
        this.marker_judge[i] = false;
      }
      this.map.removeOverlay(this.carMk_af);
      // this.vclose();
    },
    vclose: function() {
      document.getElementById("videoWindow").style.display = "none";
      for (var i = 0; i < this.marker_judge.length; i++) {
        this.marker_judge[i] = false;
      }
      this.map.removeOverlay(this.carMk_af);
      // this.fclose();
    }
  }
};
function sh_hid() {
  window.alert("0000");
}
</script>




<style scoped>
body,
div,
p,
dl,
dt,
dd,
h1,
a {
  margin: 0px;
  padding: 0px;
}

#left_content {
  float: left;
  width: 250px;
  height: 500px;
  background: #ffffff;
  /* margin-top: 65px; */
  margin-top: 100px;
  margin-left: -210px;
  position: fixed;
  z-index: 10;
  background: rgb(127, 155, 118);
  border-radius: 20px;
  overflow: auto;
  background: #072951;
  box-shadow: -8px 0px 10px #034c6a inset, 8px 0px 10px #034c6a inset;
}

#nav1 .left_li {
  text-align: left;
}

#floatWindow {
  /* float: right; */
  width: 250px;
  height: 280px;
  background: #ffffff;
  /* margin-top: 65px; */
  margin-top: 100px;
  /* margin-left: -210px; */
  position: fixed;
  z-index: 10;
  background: white;
  border-radius: 20px;
  overflow: auto;
  right: 20px;
  text-align: right;
  display: none;
  background: #072951;
  box-shadow: -8px 0px 10px #034c6a inset, 8px 0px 10px #034c6a inset;
}
#videoWindow {
  /* float: right; */
  width: 250px;
  height: 260px;
  background: #ffffff;
  /* margin-top: 65px; */
  margin-top: 390px;
  /* margin-left: -210px; */
  position: fixed;
  z-index: 10;
  background: white;
  border-radius: 20px;
  overflow: auto;
  right: 20px;
  text-align: right;
  display: none;
  background: #072951;
  box-shadow: -8px 0px 10px #034c6a inset, 8px 0px 10px #034c6a inset;
  color: white;
}

#menu {
  margin-left: 210px;
  margin-top: 190px;
  font-family: "楷体";
  font-size: 25px;
  color: white;
}
#nav1 {
  display: none;
  font-size: 15px;
}
#nav1 li {
  color: #ffffff;
	margin-left: 15px;
	font-size: 15px;
}
#carmenu{
  margin-left: 20px;
  margin-top: 5px;
  font-size: 17px;
}
/* #right{
	float: left;
	width: 90%;
	height: 800px;
	margin-top: 65px;
	/* background:firebrick; 
} */
#content {
  overflow: hidden;
  z-index: 1;
  /* margin-top: 58px; */
}
/* #clear{
	clear: both;
} */
#footer {
  text-align: center;
  background: #030829;
  height: 40px;
}
#footer a {
  text-decoration: none;
  color: white;
}
/* #nav1 li{
	padding: 15px;
	font-size: 15px;
	text-align: center;
/* 	height: 32px; 
}

#nav1 li a{
	height: 32px;
	text-decoration: none;

	color: #666666;
	text-align: center;
	
	
}
#nav1 li a input{
	vertical-align: middle;
	
} */

#right {
  /* height: 800px; */
  height: calc(100vh - 128px);
  /* margin-top: 65px; */
  /* width：calc（100%-235px）； */
  width: 100%;
  float: right;
  overflow: hidden;
}

#li1 {
  background: #66cc66;
}
/* #nav1 li .a_c{
	color: #FFFFFF;
} */

/* #nav1 li:hover{
	background:  #66cc66;
/* 	color: #FFFFFF; 
} */
#img1 {
  margin-top: 18px;
  margin-left: 60px;
  float: left;
}
#nav1 .left_li {
  text-align: left;
}

/* 表格 */
table {
  border-collapse: collapse;

  margin: 0 auto;

  text-align: center;
  margin-top: 10px;
  /* margin-left: 2px;
	margin-right: 2px; */
  width: 100%;
  font-size: 15px;
}

table td,
table th {
  border: 1px solid #cad9ea;
  color: white;
  font-size: 15px;
  height: 30px;
}

table thead th {
  background-color: #cce8eb;
  text-align: center;
  width: 100px;
  font-size: 15px;
}

table tr:nth-child(odd) {
  background-color: #072951;
  box-shadow: -10px 0px 15px #034c6a inset, 10px 0px 15px #034c6a inset;
}

/* table tr:nth-child(even){

	background-color: #034c6a;
    box-shadow: -10px 0px 15px #034c6a inset,
    10px 0px 15px #034c6a inset;

} */
.m_td {
  width: 20%;
  font-size: 15px;

}
.d_td {
  width: 90%;
  font-size: 15px;

}
</style>



