<template>
    <div style="background: #081832">     
            <Row>
                <!-- 定义增加和删除按钮 -->
                <i-Col span="12">
                    <div> 
                        <Button type="primary" @click="add" class="info2_button ">增加</Button>
                        <Button type="error" @click="del" class="info2_button ">删除</Button>      
                    </div>
                </i-Col>
                <!-- 定义搜索框 -->
                <i-Col span="12">
                    <div>
                        <span class="info2_submd">搜索条件:</span>
                        <!-- 搜索条件选择 -->
                        <select v-model="search" class="info2_select">
                            <option selected value="sourceId">产生源序号</option>
                            <option value="sourceAddress">产生源位置</option>
                            <option value="startDate">上报时间</option>
                            <option value="sourceAttrbute">属性</option>
                            <option value="sourceCompany">责任单位</option>
                            <option value="sourceType">产生垃圾类型</option>
                            <option value="wasteComponent">成分分析</option>
                            <option value="endDate">结束时间</option>
                            <option value="inputName">录入人名称</option>
                        </select>
                        <!-- 输入框 -->
                        <Input v-model="input" placeholder="Enter something..." class="info2_input" clearable/>
                    </div>
                </i-Col>
            </Row>
            <!-- 定义表table -->
            <Table id='source_info_1' :row-class-name="rowClassName" :columns="columns" :data="filterData" @on-selection-change="select"></Table>
            <br>
            <!-- 定义分页 -->
            <Page :total="dataCount" :page-size="pageSize" :page-size-opts="sizeopts" @on-change="changepage" @on-page-size-change="changesize" show-total show-sizer show-elevator/>
            <!-- 定义点击增加按钮跳出的Modal对话框 -->
            <Modal v-model="submodal" @on-ok="preserved" draggable scrollable title="信息录入表" width="1000" :transfer="false">
                <Row>
                    <i-Col span="12">
                        <div> 
                            <p class="info2_submd">产生源序号:</p>                  
                            <Input v-model="sourceId" placeholder="Enter something..."  class="info2_input" clearable/>
                                
                        </div>
                    </i-Col>
                    <i-Col span="12">
                        <div>
                            <p class="info2_submd">产生源位置:</p>                  
                            <Input v-model="sourceAddress" placeholder="Enter something..." class="info2_input" clearable/>          
                            <i-button type="primary" @click="addrchoice" class="mapbutton">选址</i-button>
                        </div>
                    </i-Col>
                </Row>
                <Row>
                    <i-Col span="12">
                        <div> 
                            <p class="info2_submd">经度:</p>                  
                            <Input v-model="sourceLong" disabled class="info2_input" clearable/>
                                
                        </div>
                    </i-Col>
                    <i-Col span="12">
                        <div>
                            <p class="info2_submd">纬度:</p>                  
                            <Input v-model="sourceLat" disabled class="info2_input" clearable/>          
                        </div>
                    </i-Col>
                </Row>
                <Row>
                    <i-Col span="12">
                        <div> 
                            <p class="info2_submd">上报时间:</p>
                            <Date-picker type="datetime" @on-change='changesd' placeholder="选择日期和时间" class="info2_input" editable></Date-picker>                  
                        </div>
                    </i-Col>
                    <i-Col span="12">
                        <div> 
                            <p class="info2_submd">属性:</p>                  
                            <Input v-model="sourceAttrbute" placeholder="Enter something..." class="info2_input" clearable/>          
                        </div>
                    </i-Col>
                </Row>
                <Row>
                    <i-Col span="12">
                        <div> 
                            <p class="info2_submd">责任单位:</p>                  
                            <Input v-model="sourceCompany" placeholder="Enter something..."  class="info2_input" clearable/>          
                        </div>
                    </i-Col>
                    <i-Col span="12">
                        <div> 
                            <p class="info2_submd">产生垃圾类型:</p>                  
                            <Input v-model="sourceType" placeholder="Enter something..." class="info2_input" clearable/>          
                        </div>
                    </i-Col>
                </Row>
                <Row>
                    <i-Col span="12">
                        <div>
                            <p class="info2_submd">成分分析:</p>                  
                            <Input v-model="wasteComponent" placeholder="Enter something..." class="info2_input" clearable/>          
                        </div>
                    </i-Col>
                    <i-Col span="12">
                        <div> 
                            <p class="info2_submd">结束时间:</p>
                            <Date-picker type="datetime" @on-change='changeed' placeholder="选择日期和时间" class="info2_input"></Date-picker>                  

                        </div>
                    </i-Col>
                </Row>
                <Row>
                    <i-Col span="12">
                        <div>
                            <p class="info2_submd">垃圾总量:</p>                  
                            <Input v-model="wasteTotal" placeholder="Enter something..." class="info2_input" clearable/>          
                        </div>
                    </i-Col>
                    <i-Col span="12">
                        <div>
                            <p class="info2_submd">总量单位:</p>                  
                            <Input v-model="wasteUnit" placeholder="Enter something..." class="info2_input" clearable/>          
                        </div>
                    </i-Col>
                </Row>
                <Row>
                    <i-Col span="12">
                        <div> 
                            <p class="info2_submd">处置建议:</p>                  
                            <Input v-model="suggestion" placeholder="Enter something..."  class="info2_input" clearable/>          
                        </div>
                    </i-Col>
                    <i-Col span="12">
                        <div>
                            <p class="info2_submd">录入人名称:</p>                  
                            <Input v-model="inputName" placeholder="Enter something..." class="info2_input" clearable/>          
                        </div>
                    </i-Col>
                </Row>
                <Row>
                    <i-Col span="12">
                        <div> 
                            <p class="info2_submd">录入时间:</p>
                            <Date-picker type="datetime" @on-change='changeit' placeholder="选择日期和时间" class="info2_input"></Date-picker>                  
                        </div>
                    </i-Col>
                    <i-Col span="12">
                        <div>
                            <p class="info2_submd">备注:</p>                  
                            <Input v-model="content" placeholder="Enter something..." class="info2_input" clearable/>          
                        </div>
                    </i-Col>
                </Row>
                <!-- 选址弹窗 -->
                <Modal v-model="mapmodal" width="800" :transfer="false" title="地址选点" >
                        <div id="r-result"><span class="info2_submd">请输入地址:</span><input type="text" id="suggestId" v-model="sourceAddress" size="20" style="width:300px;" /></div>
                        <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
                        <br>
                        <div id="l-map" style ="width:100%;height:400px;padding:0px"></div>
                </Modal>
            </Modal>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        inject:['reload'],
        data () {
            return {
                search:'',
                temp:[],
                initData:[],
                input:'',
                // 输入框默认值
                sourceId: '2019S0000000011', 
                sourceAddress: '',
                sourceLong:'',
                sourceLat:'',
                startDate: '',
                sourceAttrbute:'属性',
                sourceCompany:'责任单位',
                sourceType:'垃圾类型',
                wasteComponent:'成分分析',
                endDate: '',
                wasteTotal: 119,
                wasteUnit:'吨',
                suggestion:'建议',
                inputName:'录入人名称',
                inputTime:'',
                content:'备注',

                selection:[],
                // 默认不显示对话框
                modal: false,
                submodal:false,
                mapmodal:false,
                //一共有多少条信息
                dataCount:0,
                //每页显示的信息条数,默认为5
                sizeopts:[5,10,15,20],
                pageSize:5,
                pageindex:1,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '产生源序号',
                        key: 'sourceId',
                    },
                    {
                        title: '产生源位置',
                        key: 'sourceAddress'
                    },
                    {
                        title: '上报时间',
                        key: 'startDate'
                    },
                    {
                        title: '属性',
                        key: 'sourceAttrbute'
                    },
                    {
                        title: '责任单位',
                        key: 'sourceCompany'
                    },
                    {
                        title: '产生垃圾类型',
                        key: 'sourceType'
                    },
                    {
                        title: '成分分析',
                        key: 'wasteComponent'
                    },
                    {
                        title: '结束时间',
                        key: 'endDate'
                    },
                    {
                        title: '垃圾总量',
                        key: 'wasteTotal',
                    },
                    {
                        title: '总量单位',
                        key: 'wasteUnit',
                    },
                    {
                        title: '处置建议',
                        key: 'suggestion'
                    },
                    {
                        title: '录入人名称',
                        key: 'inputName'
                    },
                    {
                        title: '录入时间',
                        key: 'inputTime'
                    },
                    {
                        title: '备注',
                        key: 'content'
                    }
                ]
            }
        },

        created () {
         axios({
                headers: {
                  token: this.$store.state.token
                },
                method: "get",
                url:'/api/sourceInfo/si'
                })
                .then(response => (this.initData = response.data.data))
                .catch(error => console.log(error))
        },

        updated(){
            // 更新时更新数据条数
               if(this.temp.length==this.initData.length){
                    this.dataCount = this.initData.length;
                }else{
                    this.dataCount = this.filterData.length;
                }
            
        },

        computed:{
            // 计算属性filterData，根据搜索条件过滤数据
            filterData: function () {
                var input = this.input && this.input.toLowerCase()
                var items = this.initData
                var items1
                var temp
                // if判断，如果存在搜索条件，则执行
                if (input) {
                    // filter遍历items中的元素，返回包含满足过滤条件元素的新的数组
                    temp = items.filter((item) => {
                        return item[this.search].toLowerCase().match(input);
                        //console.log(Object.keys(item))
                        //Object.keys(item)遍历item对象里面的键值是否符合回调函数的测试，通过测试则返回true，否则为false。
                        // temp=Object.keys(item).some(function (key) {
                        //     return String(item[key]).toLowerCase().match(input)
                        // })
                    })

                } else {
                    temp = this.initData
                }
                this.temp=temp
                // 判断分页显示
                if(temp.length < this.pageSize){
                    return temp;
                }else{
                    var start = ( this.pageindex - 1 ) * this.pageSize;
                    var end = this.pageindex * this.pageSize;
                    return temp.slice(start,end);
                } 
            }
    },

        methods:{
           
           rowClassName :function (row, index) {
                if(index%2==0){
                return 'ivu-table-stripe-even';
                }
                else return 'ivu-table-stripe-odd';
            },

        
            //创建地图
            addrchoice(){
            var map = new BMap.Map("l-map");
            map.centerAndZoom("北京",12);   // 初始化地图,设置城市和地图级别。
            map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
            map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用

            var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
                {"input" : "suggestId"
                ,"location" : map
            });

            var myValue;
            ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
            var _value = e.item.value;
            myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
          
            setPlace();
            });
            var _this=this;
            //监听点击事件
            map.addEventListener("click",function(e){
                map.clearOverlays();    //清除地图上所有覆盖物
                map.addOverlay(new BMap.Marker(e.point));    //添加标注
                _this.sourceLong=e.point.lng;
                _this.sourceLat=e.point.lat;
                // 创建地理编码实例      
                var myGeo = new BMap.Geocoder();      
                // 根据坐标得到地址描述    
                myGeo.getLocation(e.point, function(result){      
                    if (result){
                        //去掉双引号     
                      _this.sourceAddress=JSON.stringify(result.address).replace(/\"/g, "");
                    }      
                });

            })

            function setPlace(){
                map.clearOverlays();    //清除地图上所有覆盖物

                function myFun(){
                    var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                    _this.sourceLong=pp.lng;
                    _this.sourceLat=pp.lat;
                    map.centerAndZoom(pp, 18);
                    var marker=new BMap.Marker(pp);
                    map.addOverlay(marker);    //添加标注
                }

                var local = new BMap.LocalSearch(map, { //智能搜索
                onSearchComplete: myFun
                });
                local.search(myValue);
                _this.sourceAddress=myValue;
            }
           
            
            //显示弹窗
            this.mapmodal=true
            },

            // addrchoice(){
            //     this.mapmodal=true
            // },
            //改变时间
            changesd(sd){
                this.startDate=sd

            },
            changeed(ed){
                this.endDate=ed
            },
            changeit(it){
                this.inputTime=it
            },

            //刷新地图
            refresh(){
                this.reload()
                // empty.$emit("aevent")
            },
            //显示新增信息输入框
            add(){
                this.submodal=true;
            },
            // 提交保存输入的信息
            preserved(){
                // 增加信息
                this.initData.push(
                    {
                        sourceId: this.sourceId,
                        sourceAddress: this.sourceAddress,
                        startDate: this.startDate,
                        sourceAttrbute:this.sourceAttrbute,
                        sourceCompany:this.sourceCompany,
                        sourceType:this.sourceType,
                        wasteComponent:this.wasteComponent,
                        endDate: this.endDate,
                        wasteTotal: this.wasteTotal,
                        wasteUnit: this.wasteUnit,
                        suggestion:this.suggestion,
                        inputName:this.inputName,
                        inputTime:this.inputTime,
                        content:this.content,
                    });
                if(this.sourceAddress){
                     axios({
                        headers: {
                        token: this.$store.state.token
                        },
                        method: "get",
                        url:'/map/?address='+this.sourceAddress+'&output=json&ak=PbXallYFHH8WyWEPSaXXTCUF421XG7YT'
                        })
                        .then(response => {
                            // console.log('测试：'+JSON.stringify(response.data.data.result.location))
                            this.sourceLong=response.data.data.result.location.lng
                            this.sourceLat=response.data.data.result.location.lat
                        axios({
                            headers: {
                            token: this.$store.state.token
                            },
                            method:"post",
                            url:"/api/sourceInfo/json",
                            data:{
                                "sourceId": this.sourceId,
                                "sourceAddress": this.sourceAddress,
                                "sourceLong": this.sourceLong,
                                "sourceLat": this.sourceLat,
                                "startDate": this.startDate,
                                "sourceAttrbute": this.sourceAttrbute,
                                "sourceCompany": this.sourceCompany,
                                "sourceType": this.sourceType,
                                "wasteComponent": this.wasteComponent,
                                "endDate": this.endDate,
                                "wasteTotal": this.wasteTotal,
                                "wasteUnit": this.wasteUnit,
                                "suggestion": this.suggestion,
                                "inputName": this.inputName,
                                "inputTime": this.inputTime,
                                "content": this.content
                            }
                        })
                        .catch(error => console.log(error))
                        })
                        .catch(error => console.log(error))

                };
                
            },

            //记录选中返回的selection数据
            select(selection){
                this.selection=selection
            },
            // 根据sourceId删除数据（需要保证sourceId的唯一性）
            del(){
                for (var i=0;i<this.initData.length;i++){
                    for(var j=0;j<this.selection.length;j++){
                        if(this.initData[i]['sourceId']==this.selection[j]['sourceId']){
                            //要同时完成
                            this.initData.splice(i,1)
                            axios({
                            headers: {
                                token: this.$store.state.token
                            },
                            method: "put",
                            url:'/api/sourceInfo/'+this.selection[j]['sourceId']
                            })
                            .catch(error => console.log(error))
                        }
                    }
                }
            },
            // 记录页码
            changepage(index){
                this.pageindex=index
            },
            // 记录页码
            changesize(pagesize){
                this.pageSize=pagesize
            }
        }   
    }
</script>

<style scoped>
.info2_button {
    margin-bottom: 10px;
}
.info2_select{
    margin-bottom: 10px;
    width:100px;
    display: inline-block; 
    overflow-x: hidden; 
    height: 25px; 
    line-height: 25px; 
    border: 1px solid #dcdbdb; 
    vertical-align: middle;
}
.info2_input{
    margin-bottom: 10px;
    width:400px;
}
.mapbutton{
    margin-bottom: 10px;
}
.info2_submd{
    font-size: 15px;
    margin-right: 10px;
}
.tangram-suggestion {
    z-index: 9999;
}

/* 隐藏百度地图图标和文字 */
.BMap_cpyCtrl
{
display:none; 
}
.anchorBL{
display:none; }


</style>

