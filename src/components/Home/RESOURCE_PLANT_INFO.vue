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
                            <option selected value="resourcePlantId">资源场序号</option>
                            <option value="resourcePlantName">资源场名称</option>
                            <option value="resourcePlantAddress">位置</option>
                            <option value="legalPerson">法人</option>
                            <option value="responsiblePerson">负责人</option>
                            <option value="inputName">录入人名称</option>
                            <option value="content">备注</option>
                        </select>
                        <!-- 输入框 -->
                        <Input v-model="input" placeholder="请添加数据" class="input" clearable/>
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
                            
                            <p class="submd">资源厂序号:</p>                  
                            <Input v-model="resourcePlantId" placeholder="请添加数据"  class="input" clearable/>          
                        </div>
                    </i-Col>
                    <i-Col span="12">
                        <div>
                            <p class="submd">资源厂名称:</p>                  
                            <Input v-model="resourcePlantName" placeholder="请添加数据" class="input" clearable/>          
                        </div>
                    </i-Col>
                </Row>
                <Row>
                    <i-Col span="12">
                        <div> 
                            <p class="submd">位置:</p>                  
                            <Input v-model="resourcePlantAddress" placeholder="请添加数据" class="input" clearable/>       
                        </div>
                    </i-Col>
                    <i-Col span="12">
                        <div> 
                            <p class="submd">法人:</p>                  
                            <Input v-model="legalPerson" placeholder="请添加数据" class="input" clearable/>          
                        </div>
                    </i-Col>
                </Row>
                <Row>
                    <i-Col span="12">
                        <div> 
                            <p class="submd">负责人:</p>                  
                            <Input v-model="responsiblePerson" placeholder="请添加数据"  class="input" clearable/>          
                        </div>
                    </i-Col>
                    <i-Col span="12">
                        <div> 
                            <p class="submd">类型:</p>                  
                            <Input v-model="resourcePlantType" placeholder="请添加数据" class="input" clearable/>          
                        </div>
                    </i-Col>
                </Row>
                 <Row>
                    <i-Col span="12">
                        <div>
                            <p class="submd">经度:</p>                  
                            <Input v-model="resourcePlantLong" placeholder="请添加数据" class="input" clearable/>          
                        </div>
                    </i-Col>
                    <i-Col span="12">
                        <div> 
                            <p class="submd">纬度:</p>                  
                            <Input v-model="resourcePlantLat" placeholder="请添加数据"  class="input" clearable/>          
                        </div>
                    </i-Col>
                </Row>
                <Row>
                    <i-Col span="12">
                        <div>
                            <p class="submd">每日收纳量:</p>                  
                            <Input v-model="dailyAcceptance" placeholder="请添加数据" class="input" clearable/>          
                        </div>
                    </i-Col>
                    <i-Col span="12">
                        <div> 
                            <p class="submd">日产出量:</p>                  
                            <Input v-model="dailyOutput" placeholder="请添加数据"  class="input" clearable/>          
                        </div>
                    </i-Col>
                </Row>
                <Row>
                    <i-Col span="12">
                        <div>
                            <p class="submd">录入人名称:</p>                  
                            <Input v-model="inputName" placeholder="请添加数据" class="input" clearable/>          
                        </div>
                    </i-Col>
                    <i-Col span="12">
                        <div>
                            <p class="submd">备注:</p>                  
                            <Input v-model="content" placeholder="请添加数据" class="input" clearable/>          
                        </div>
                    </i-Col>
                </Row>
                <Row>
                    <i-Col span="12">
                        <div>
                            <p class="submd">录入时间:</p>            
                            <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss"  v-model="inputTime"
                            placeholder="Select date and time" ></DatePicker>      
                            <!-- <Input v-model="inputTime"  placeholder="请添加数据" class="input" clearable/>           -->
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
                "resourcePlantId": "2019R0000000001",
                "resourcePlantName": "神话资源厂",
                "resourcePlantAddress": "北京市昌平区21号院",
                "resourcePlantLong": 115.83,
                "resourcePlantLat": 40.31,
                "legalPerson": "王鹏",
                "responsiblePerson": "李乐",
                "resourcePlantType": "只固体",
                "dailyAcceptance": "200t",
                "dailyOutput": "10t",
                "inputName": "刘宏",
                "inputTime": "",
                "content": "无",
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
                        title: '资源厂序号',
                        key: 'resourcePlantId',
                        sortable: true
                    },
                    {
                        title: '资源厂名称',
                        key: 'resourcePlantName'
                    },
                    {
                        title: '位置',
                        key: 'resourcePlantAddress'
                    },
                    {
                        title: '经度',
                        key: 'resourcePlantLong'
                    },
                    {
                        title: '纬度',
                        key: 'resourcePlantLat'
                    },
                    {
                        title: '法人',
                        key: 'legalPerson'
                    },
                    {
                        title: '负责人',
                        key: 'responsiblePerson'
                    },
                    {
                        title: '类型',
                        key: 'resourcePlantType'
                    },
                    {
                        title: '每日收纳量',
                        key: 'dailyAcceptance',
                        sortable: true
                    },
                    {
                        title: '日产出量',
                        key: 'dailyOutput',
                    },
                    {
                        title: '录入人名称',
                        key: 'inputName',
                    },
                    {
                        title: '录入时间',
                        key: 'inputTime',
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
            .get('/api/resourcePlantInfo/rpi')
            .then(response=>{this.initData=response.data
                console.log(response.data)
                }
            )
            .catch(error=>console.log(error))
        },
        updated(){
            // 更新时更新数据条数
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
            },
            // 提交保存输入的信息
            preserved(){
                // 增加信息
                this.initData.push(
                    {
                        
                         resourcePlantId: this.resourcePlantId,
                         resourcePlantName: this.resourcePlantName,
                         resourcePlantAddress: this.resourcePlantAddress,
                         resourcePlantLong:this.resourcePlantLong,
                         resourcePlantLat:this.resourcePlantLat,
                         legalPerson:this.legalPerson,
                         responsiblePerson:this.responsiblePerson,
                         resourcePlantType: this.resourcePlantType,
                         dailyAcceptance: this.dailyAcceptance,
                         dailyOutput: this.dailyOutput,
                         inputName: this.inputName,
                         inputTime: this.inputTime,
                         content: this.content,
                    });
                    axios({
                            method:"post",
                            url:"/api/resourcePlantInfo/add",
                            data:{
                                resourcePlantId: this.resourcePlantId,
                                resourcePlantName: this.resourcePlantName,
                                resourcePlantAddress: this.resourcePlantAddress,
                                resourcePlantLong:this.resourcePlantLong,
                                resourcePlantLat:this.resourcePlantLat,
                                legalPerson:this.legalPerson,
                                responsiblePerson:this.responsiblePerson,
                                resourcePlantType: this.resourcePlantType,
                                dailyAcceptance: this.dailyAcceptance,
                                dailyOutput: this.dailyOutput,
                                inputName: this.inputName,
                                inputTime: this.inputTime,
                                content: this.content,
                                    }
                        })
                        .catch(error => console.log(error))

            },

            //记录选中返回的selection数据
            select(selection){
                this.selection=selection
            },
            // 根据resourcePlantId删除数据（需要保证resourcePlantId的唯一性）
            del(){
                for (var i=0;i<this.initData.length;i++){
                    for(var j=0;j<this.selection.length;j++){
                        if(this.initData[i]['resourcePlantId']==this.selection[j]['resourcePlantId']){
                            console.log(this.selection[j]['resourcePlantId']),
                            //要同时完成
                            this.initData.splice(i,1)
                            axios
                                .put('/api/resourcePlantInfo/'+this.selection[j]['resourcePlantId'])
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

