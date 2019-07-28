<template>
    <div>
        <!-- 定义Modal对话框的title和宽度 -->
        <div  draggable scrollable title="基本信息" width="2500" style="width=2500px;margin-top:50px;margin-left:50px;">         
            <Row>
                <!-- 定义增加和删除按钮 -->
                <i-Col span="12">
                    <div> 
                        <Button type="primary" @click="add" class="bt">增加</Button>
                        <Button type="error" @click="del" class="bt">删除</Button>      
                    </div>
                </i-Col>
                <!-- 定义搜索框 -->
                <i-Col span="12">
                    <div>
                        <span class="submd">搜索条件:</span>
                        <!-- 搜索条件选择 -->
                        <select v-model="search" class="select">
                            <option selected value="wasteReuseId">再利用序号</option>
                            <option value="resourcePlantId">资源场序号</option>
                            <option value="constructionWasteId">建筑垃圾序号</option>
                            <option selected value="processingTime">加工时间</option>
                            <option value="expla">说明</option>
                            <option value="inputName">录入人名称</option>
                            <option selected value="inputTime">录入时间</option>
                            <option value="content">备注</option>
                        </select>
                        <!-- 输入框 -->
                        <Input v-model="input" placeholder="查找信息" class="input" clearable/>
                    </div>
                </i-Col>
            </Row>
            <!-- 定义表table -->
            <Table border :columns="columns" :data="filterData" @on-selection-change="select"></Table>
            <br>
            <!-- 定义分页 -->
            <Page :total="dataCount" :page-size="pageSize" :page-size-opts="sizeopts" @on-change="changepage" @on-page-size-change="changesize" show-total show-sizer show-elevator/>
            <!-- 定义点击增加按钮跳出的Modal对话框 -->
            <Modal v-model="submodal" @on-ok="preserved" draggable scrollable title="信息录入表" width="1000" :transfer="false">
                <Row>
                    
                    <i-Col span="12">
                        <div>
                            <p class="submd">资源场序号:</p>                  
                            <Input v-model="resourcePlantId" placeholder="请添加数据" class="input" clearable/>          
                        </div>
                    </i-Col>
                </Row>
                <Row>
                    <i-Col span="12">
                        <div> 
                            <p class="submd">建筑垃圾序号:</p>                  
                            <Input v-model="constructionWasteId" placeholder="请添加数据" class="input" clearable/>       
                        </div>
                    </i-Col>
                    <i-Col span="12">
                        <div> 
                            <p class="submd">垃圾用量:</p>                  
                            <Input v-model="actualWeight" placeholder="请添加数据" class="input" clearable/>          
                        </div>
                    </i-Col>
                </Row>
                <Row>
                    <i-Col span="12">
                        <div> 
                            <p class="submd">建筑垃圾用量单位:</p>                  
                            <Input v-model="actualWeightUnit" placeholder="请添加数据"  class="input" clearable/>          
                        </div>
                    </i-Col>
                    <i-Col span="12">
                        <div> 
                            <p class="submd">加工时间:</p>   
                            <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss"  v-model="processingTime"
                            placeholder="Select date and time" ></DatePicker>               
                        </div>
                    </i-Col>
                </Row>
                <Row>
                    <i-Col span="12">
                        <div>
                            <p class="submd">说明:</p>                  
                            <Input v-model="expla" placeholder="请添加数据" class="input" clearable/>          
                        </div>
                    </i-Col>
                    <i-Col span="12">
                        <div> 
                            <p class="submd">录入人名称:</p>                  
                            <Input v-model="inputName" placeholder="请添加数据"  class="input" clearable/>          
                        </div>
                    </i-Col>
                </Row>
                <Row>
                   
                    <i-Col span="12">
                        <div>
                            <p class="submd">备注:</p>                  
                            <Input v-model="content" placeholder="请添加数据" class="input" clearable/>          
                        </div>
                    </i-Col>
                </Row>
               
            </Modal>
    </div>
    </div>
</template>
<script>
import axios from 'axios'
// import map from './map'
    export default {
        data () {
            return {
                search:'',
                temp:[],
                initData:[],
                input:'',
               // 输入框默认值
                wasteReuseId: '',
                resourcePlantId: '2019R0000000001',
                constructionWasteId: '2019W0000000001',
                actualWeight: 30,
                actualWeightUnit: '吨',
                processingTime: '',
                expla: '11111111',
                inputName: '刘鹏',
                inputTime: '',
                content: '无',
                selection:[],
                submodal:false,
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
                        title: '再利用序号',
                        key: 'wasteReuseId',
                        sortable: true
                    },
                    {
                        title: '资源场序号',
                        key: 'resourcePlantId'
                    },
                    {
                        title: '建筑垃圾序号',
                        key: 'constructionWasteId'
                    },
                    {
                        title: '垃圾用量',
                        key: 'actualWeight'
                    },
                    {
                        title: '建筑垃圾用量单位"',
                        key: 'actualWeightUnit'
                    },
                    {
                        title: '加工时间',
                        key: 'processingTime'
                    },
                    {
                        title: '说明',
                        key: 'expla'
                    },
                    {
                        title: '录入人名称',
                        key: 'inputName'
                    },
                    {
                        title: '录入时间',
                        key: 'inputTime',
                        sortable: true
                    },
                    {
                        title: '备注',
                        key: 'content',
                    },
                    
                ]
            }
        },

        created(){
            axios
            .get('/api/wasteReuseInfo/wri')
            .then(response=>{this.initData=response.data.data
                }
            )
            .catch(error=>console.log(error))
        },
        updated(){
            this.dataCount = this.temp.length
            
        },

        computed:{
             
            // 计算属性filterData，根据搜索条件过滤数据
            filterData: function () {
                var input = this.input 
                var items = this.initData
                var items1
                var filtered
                var len
                // if判断，如果存在搜索条件，则执行
                if (input) {
                    // filter遍历items中的元素，返回包含满足过滤条件元素的新的数组
                    filtered = items.filter((item) => {
                        return item[this.search].match(input);
                    });
                    this.temp=filtered;
                    len = this.temp.length;     
                } 
                else {
                    filtered = this.initData;
                    this.temp=filtered
                    len = this.temp.length;
                }

                    // 是否进行分页，如果分页...
                if(len< this.pageSize){
                    return filtered;
                }
                else{
                    var indexStart = ( this.pageindex - 1 ) * this.pageSize;
                    var indexEnd = this.pageindex * this.pageSize;
                    if(indexEnd%5 == 0){
                        return filtered.slice(indexStart,indexEnd);
                    }else{
                        return filtered.slice(indexStart,len);
                    }
                    
                }
                    
                
            }
    },

        methods:{
           
            //显示新增信息输入框
            add(){
                this.submodal=true;
                //获取当前时间
                axios.get('/api/wasteReuseInfo/queryTime')
                .then(response=>{
                    this.inputTime=response.data
                    }
                )
                .catch(error=>console.log(error));

                //自动生成ID
                axios.get('/api/wasteReuseInfo/creationID')
                .then(response=>{
                    this.wasteReuseId=response.data
                    }
                )
                .catch(error=>console.log(error))
            },
            // 提交保存输入的信息
            preserved(){
                // 增加信息
                this.initData.push(
                    {
                        wasteReuseId: this.wasteReuseId,
                         resourcePlantId: this.resourcePlantId,
                         constructionWasteId: this.constructionWasteId,
                         actualWeight:this.actualWeight,
                         actualWeightUnit:this.actualWeightUnit,
                         processingTime:this.processingTime,
                         expla:this.expla,
                         inputName: this.inputName,
                         inputTime: this.inputTime,
                         content: this.content,
                    });
                    axios({
                            method:"post",
                            url:"/api/wasteReuseInfo/add",
                            data:{
                                "wasteReuseId": this.wasteReuseId,
                                 "resourcePlantId": this.resourcePlantId,
                                 "constructionWasteId": this.constructionWasteId,
                                 "actualWeight":this.actualWeight,
                                 "actualWeightUnit":this.actualWeightUnit,
                                 "processingTime":this.processingTime,
                                 "expla":this.expla,
                                 "inputName": this.inputName,
                                 "inputTime": this.inputTime,
                                 "content": this.content,
                            }
                        })
                        .catch(error => console.log(error))

            },

            //记录选中返回的selection数据
            select(selection){
                this.selection=selection
            },
            // 根据wasteReuseId删除数据（需要保证wasteReuseId的唯一性）
            del(){
                for (var i=0;i<this.initData.length;i++){
                    for(var j=0;j<this.selection.length;j++){
                        if(this.initData[i]['wasteReuseId']==this.selection[j]['wasteReuseId']){
                            console.log(this.selection[j]['wasteReuseId']),
                            //要同时完成
                            this.initData.splice(i,1)
                            axios
                                .put('/api/wasteReuseInfo/'+this.selection[j]['wasteReuseId'])
                                .catch(error => console.log(error))
                        }
                    }
                }
            },
            // 记录页码
            changepage(index){
                this.pageindex=index
                // console.log("index:"+index)
            },
            // 更改页码
            changesize(pagesize){
                this.pageSize=pagesize
            }
        }   
    }
</script>

<style scoped>
.bt{
    margin-bottom: 10px;
}
.select{
    margin-bottom: 10px;
    width:100px;
    display: inline-block; 
    overflow-x: hidden; 
    height: 25px; 
    line-height: 25px; 
    border: 1px solid #dcdbdb; 
    vertical-align: middle;
}
.input{
    margin-bottom: 10px;
    width:400px;
}
.submd{
    font-size: 15px;
    margin-right: 10px;
}
</style>

