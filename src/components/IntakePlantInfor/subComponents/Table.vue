<template>
<div id="div45" class="clear" v-cloak>


    <div  v-if="showdiv45" class=" table_div " >
            
    <div class="table_find">
    <p style="margin-left:10px">
    <label style="font-size: 20px;width:70px">筛选>></label>
    <label>名字：</label><input type="text" v-model="query" placeholder="请输入名称"/>
    <label>id号：</label><input type="text" v-model="query1" placeholder="请输入编号"/>
    </p> 
    <br>
    </div>

    <p class="table_but">
        <a href="javascript:void(0)" v-on:click="addInQuery" >
            <i class="glyphicon glyphicon-plus"></i>新增
        </a>
        <a href="javascript:void(0)" v-on:click="remove" >
            <i class="glyphicon glyphicon-remove"></i> 删除
        </a>
        <a href="javascript:void(0)" v-on:click="updateInQuery"><i class="glyphicon glyphicon-print"></i>更改
        </a>
        <a href="javascript:void(0)" @click="showdiv45=false" ><i class="glyphicon glyphicon-export"></i>退出
        </a> 
    </p>

                

    <table id="table" class="table_style" border="0" >
        <caption>全市信息                                      
        </caption>              
        <thead style="height:34px">
        <tr>
            <th>选择</th>

            <th>名字</th>
            <th>id号</th>
            <th>经度</th>
            <th>维度</th>
            <th>类型</th>
            <th>面积</th>
            <th>体积</th>
        </tr>
        </thead>
        <!-- name="list" is="transition-group"  -->
      
        <tbody style="height:100px;overflow:auto" >
         
            <tr v-for="(item, index) in filterconsumers" :key="index">
                <td><input type="checkbox" :value="index" v-model="allchecks"><label></label></td>
                <td>{{ item.name }}</td>
                <td>{{item.id}}</td>
                <td>{{item.latitude}}</td>
                <td>{{item.longtitude}}</td>
                <td>{{item.type}}</td>
                <td>{{item.area}}</td>
                <td>{{item.volume}}</td>
            </tr>
           
        </tbody>
       
    </table>  
    </div>
        <!-- //后面的那层砂纸 -->
       <div v-if="showdiv45" class="div5" ></div>
    <!-- //    录入信息的入口 -->
    <!-- style="width:400px;height:500px;background-color:white;z-index: 4;padding-top: 30px; position: absolute;top: 20px;left: 40px;" -->

        <div v-show="showdiv6" v-drag class="Content-Main">
            <!-- <form style="z-index: 4;"> -->
                <!-- bootstrap的样式 -->
                <!-- <div class="form-group"> -->
                <h1>>>信息录入\更改</h1>
                
                  <label >
                      <span>名称：</span>
                      <input type="text" v-model="this.nextNum.name" placeholder="名字" >
                  </label>
                  <!-- class="form-control" -->  
                  <label  >
                      <span>编号：</span>
                      <input type="text"  v-model="nextNum.id" placeholder="ID" readonly="readonly" style= "background:#EBEBEB">
                 </label>
                <label  >
                      <span>位置：</span>
                      <input type="text"  v-model="nextNum.addr" placeholder="位置信息" >
                 </label>

                  
                <label  >
                    <span>经纬度：</span>
                    <input type="text"  v-model="nextNum.latitude"  style="width:32%; margin-right: 0px;" >    
                    <input type="text"  v-model="nextNum.longtitude"  style="width:32%; margin-right: 0px;"  >
                    <!-- <input class="test" type="button"  url="static/Image/apoint1.png"> -->
                    <img v-on:click="getLatLong" src="static/IntakePlantStaticSource/Image/apoint1.png" class="test" ref="imgLatLon">
                </label>  
                <!-- <label > 
                    <span>维度：</span>
                    <input type="text"  v-model="nextNum.longtitude" placeholder="39.9" >
                </label> -->             
                <label  >
                    <span>类型：</span>
                    <input type="text"   placeholder="类型" v-model="nextNum.type" >
                </label>
                 
                <label >
                    <span>面积：</span>
                    <input type="text"   v-model="nextNum.volume" placeholder="体积" >
                </label>
               
                <label  >
                    <span>体积：</span>
                 <input type="text"   placeholder="面积" v-model="nextNum.area" >        
                </label>          
            <!-- <label  >
                <span>录入人：</span>
                <input type="text"    placeholder="录入人姓名" v-model="nextNum.inputname" >
            </label> -->
            <label  >
                <span>备注：</span>
                <input type="text"    placeholder="just for test" v-model="nextNum.content" >
            </label>
            <div>
                <button class="button" v-on:click="submmite" style="font-size: 11px;background:rgb(8, 199, 33) ">提交</button>
                <button class="button" v-on:click="exite"  style="font-size: 11px;background:red">退出</button>     
            </div>
               
            <!-- </form>   -->
           
        
        </div>
     

    </div> 
</template>

<script>

import bus from '../../../assets/eventbus.js'
import  {deletById} from '../api'
import {postInsert} from '../api'
import {getMaxIndex} from '../api'
import {postUpdate} from '../api'
import axios from 'axios'
export default {
    
  name: 'Table',
  props:{
    appconsumers:{
        type:Array,
        required:true
    },
    viewer:{
    type:Object,
    required:true

    },
    pickLat:{
        type:Number,
        required:true
    },
    pickLon:{
        type:Number,
        required:true

    }
   
  },

  data () {
    return {
    //   msg: 'Welcome to Your Vue.js App'
    showdiv45:false,
    showdiv6:false,
    //这里对应的是后端的VO层，也就是saftyconsumerVo的类
    nextNum: {id: "2019I0000000000",
                name: "京城第一消纳场",
                addr: "我们的大故宫里",
                latitude:39.9  ,
                longtitude: 116.39,
                inputname: "小王",
                content: "测试用",
                conswasteid: "2019W0000000001",
                type: "固体砖头",
                area: "100",
                volume: "目前不确定",
                vedio: "http://www.JZLJ.com/vieo1",
                environparaid: "2019E0000000001",
                safepara: "0",
                waterpara: "0",
                solfpara: "0",
                atmpara: "0",
                warnpara: "0"},

    allchecks:[],
    //用来判断是否选的是全选反选还是不选
    radioValue:"",
    thisallchecks:[],

    query:"",
    query1:"",
    // arr:[],
    //add函数中加一个传递的变量，主要是为了区别更新和添加操作
    paraInAdd:0
    }
  },
   directives:{
        drag(el, bindings){
            el.onmousedown = function(e){
                var disx = e.pageX - el.offsetLeft;
                var disy = e.pageY - el.offsetTop;
                document.onmousemove = function (e){
                    el.style.left = e.pageX - disx + 'px';
                    el.style.top = e.pageY - disy + 'px';
                }
                document.onmouseup = function(){
                    document.onmousemove = document.onmouseup = null;
                }
            }
        }
    },
    
  created:function(){
  
      
      bus.$on("show",(msg)=>{
               
              this.showdiv45=msg
      })


  },
  mounted:function(){
      

  },
    methods:{ 
        //在查询列表中中的添加按钮激发的方法
        addInQuery:function(){
            //进行添加操作，paraInAdd赋值为1
            this.paraInAdd=1;
           this.showdiv6=!this.showdiv6
           //点击增加立即从后台获取ID最大编号,并在此时修改nextNum中的id属性
            getMaxIndex().then((v)=>{
                console.log("ddddddddddddddd")
                console.log(v)
                console.log(v.data)
               this.nextNum.id=v.data.data
            })
         
            
            


        },

        randomIndex: function () {
         return Math.floor(Math.random() * this.consumers.length)
        },
        // this.nextNum.name,this.nextNum.lat,this.nextNum.longtitude,this.nextNum.type,this.nextNum.are,this.nextNum.volume
        submmite: function () {
        //对于表ENVIRON_PARA中的数据，不需要前端的录入全部都由后端来做
        //对于SECURITY_PARA中的数据也只有位置的描述需要前端输入目前还不对其进行操作
        //所以重点的对INTAKE_PLANT_INFO中的数据进行操作录入工作
        //录入的说明：
        // 1.id是自增的录入，这一块不需要前端来做，每次录入人员打开界面就有一个ID号，是写死的
        // 2.主要录入消纳场的名字、面积

         //初始化操作  
         if(this.paraInAdd==1){

             this.radioValue=""
            //nextNum这里当做一个静态变量来用，copy是为了切断它与其他地方的联系,如果这里不用深度复制列表框会跟着添加内容一块动

            const copyNextNum=JSON.parse(JSON.stringify(this.nextNum)) 
            //更新页面导入数据库
            bus.$emit("insertInTOAppConsum",copyNextNum)
            console.log(copyNextNum)
            postUpdate(copyNextNum)
        
            if(confirm("导入成功，是否继续输入？")){
                
                this.showdiv6=false
            
                setTimeout(()=>{

                this.addInQuery()
                },500)           
            }else{
                this.showdiv6=false

            }
            //在这里将用户输入的关于消纳场的基本的信息插入到数据库
            

            //添加实体
            //Menue中添加实体的时候吧数据库内关于这个实体的安全类信息和环境类信息加进去
            bus.$emit('addentity',copyNextNum);
            // this.allchecks.push(this.allchecks.length-1)

         } 
         //如果等于2进行跟新操作
         if(this.paraInAdd==2){
            //  alert("在2这里")
            //  this.nextNum.id=this.allchecks[0].id
            //先copy
           
            //关联数据
           //更新页面导入数据库
           let copyNextNum1=JSON.parse(JSON.stringify(this.nextNum)) 
            bus.$emit("updateInTOAppConsum",[this.allchecks[0],copyNextNum1])
            postUpdate(copyNextNum1)
            console.log(this.consumers[this.allchecks[0]])
            // this.showdiv45=false
            // setTimeout(()=>{

            //     this.showdiv45=true
            //     },500)  
            // postInsert(copyNextNum)

         }
         //将获取经纬度的操作进行复位
        this.$refs.imgLatLon.src="static/IntakePlantStaticSource/Image/apoint1.png";
        this.showdiv45=true
        //将需要获取经纬度点的这个指令 传递给saftyapp 将该开关变量打开
        bus.$emit("onOffLatLong",false)
        this.viewer.entities.removeById("latLonIndex")
            
        },
        exite:function(){
            this.showdiv6=false
            //获取经纬度的操作进行复位
            this.$refs.imgLatLon.src="static/IntakePlantStaticSource/Image/apoint1.png";
            this.showdiv45=true
            //将需要获取经纬度点的这个指令 传递给saftyapp 将该开关变量打开
            bus.$emit("onOffLatLong",false)
            this.viewer.entities.removeById("latLonIndex")
        },
        //删除记录
        remove: function () {
        var arr=[]
        for(var i=0;i<this.consumers.length;i++){
            // var thisid=this.allchecks[i]
            //如果这个checkbox被选了就删除
            if(this.allchecks.indexOf(i)>=0){
                // this.viewer.entities.removeById("'"+this.consumers[i].id+"'")
               
                var thisnum=this.consumers[i].id
                //数据库中删除
                //获取传递到后端的对象
                // var thisbody=this.nextNum
                // thisbody.id=thisnum
                
                deletById(this.consumers[i])
                //从地图上移除
                 
                 this.viewer.entities.removeById(thisnum);
                 this.viewer.entities.removeById("balloon"+thisnum);
                 this.viewer.entities.removeById("construct"+thisnum)      
            }
            else{
                arr.push(this.consumers[i])

            }
           

        }

        // this.consumers=arr
        //这里接受来自saftyApp得到cousumer数据
        bus.$emit("cgAppcInTab",arr)
        this.allchecks=[]
        
        },
        updateInQuery:function(){
            console.log("更新操作")
            if(this.allchecks.length==0){
                alert("警告！！！你没有选择任何对象！")

            }
            if(this.allchecks.length>1){
                alert("更新操作，不可多选！！！")
            }
            if(this.allchecks.length==1){
                 console.log(this.allchecks[0])
                console.log(this.consumers[this.allchecks[0]])
                // this.nextNum=JSON.parse(JSON.stringify(this.consumers[this.allchecks[0]])) 
                this.paraInAdd=2
                this.nextNum=JSON.parse(JSON.stringify(this.consumers[this.allchecks[0]])) 
                //关联数据
                // this.consumers[this.allchecks[0]]=this.nextNum
                this.showdiv6=!this.showdiv6

            }
         


        },
        shuffle: function () {
        this.consumers = _.shuffle(this.consumers)
        // this.consumers = this.consumers.sort()
        
        },
        getLatLong:function(){
            console.log("开始获取经纬度")
            // console.log(this.$refs.imgLatLon.style.height)
            this.$refs.imgLatLon.src="static/IntakePlantStaticSource/Image/apoint3.png";
            this.showdiv45=!this.showdiv45
            //将需要获取经纬度点的这个指令 传递给saftyapp 将该开关变量打开
            bus.$emit("onOffLatLong",true)
          

        }
        
    },

    computed: {
        // appconsumers:function(){
        //  this.consumers=this.appconsumers
        // },
        
        // ,
        consumers:{
            // for(const i=0;i<this.appconsumers.length;i++){

            // }
            get :function(){
                return this.appconsumers
            },
            // set: function(value){

            //     this.appconsumers=value

            // }
            
        },
        filterconsumers:function(){
            var vm=this
            return this.consumers.filter(function (item) {                         
                //进这个函数之后this的意思进变了指的是当前的作用于范围所以要在外面声明一下this,其实这里的this是表示这个变量所在的范围也就是当前的窗口
                return item.name.indexOf(vm.query) !== -1 &&item.id.indexOf(vm.query1) !== -1
                })
        }
    },
    watch: {
        radioValue: function(){
            if(this.radioValue=="all"){
                this.allchecks=[]
                for(var i=0;i<this.consumers.length;i++){
                    this.allchecks.push(i)

                }

            }else{
                if(this.radioValue=="ops"){ 
                    for(var i=0;i<this.consumers.length;i++){
                        if(this.allchecks.indexOf(i)!=-1){
                            this.allchecks.splice(this.allchecks.indexOf(i),1);
                        }else{
                            this.allchecks.push(i);
                        }
                    }
                
                    
                }
                if(this.radioValue=="no"){
                    this.allchecks=[]       
                }
                else{
                    
                }
            }
        },
        pickLat:function(){
            this.nextNum.latitude=this.pickLat
        },
        pickLon:function(){
            this.nextNum.longtitude=this.pickLon
        },
        // allchecks:function(){
        //     if(this.allchecks.length!=0){
        //         this.radioValue="no"


        //     }
        // }
        
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
}
.div4{

 
    /* height: 500px; */
    /* margin: auto; */
    /* border-radius: 10px;  */
    /* position: absolute; */
    background-color:#034c6a;;
    
    
    box-shadow: -10px 0px 15px #034c6a inset, /*å·¦è¾¹é˜´å½±*/
    0px -10px 15px #034c6a inset, /*ä¸Šè¾¹é˜´å½±*/
    10px 0px 15px #034c6a inset, /*å³è¾¹é˜´å½±*/
    0px 10px 15px #034c6a inset;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 3;
    color: white
    
    
    /* display: none; */

}
 .div4 h1{
            padding: 2px 0px 5px 8px;
          
            display: block;
            
            border-bottom: 1px solid #444;
  }
.div4 .button{
            padding: 8px 24px 8px 24px;
            margin-bottom: 8px;
            border: none;
            border-radius: 4px;
            -moz-border-radius: 4px;
            -webkit-border-radius: 4px;
            font-weight: bold;
            text-shadow: 1px 1px 1px #FFE477;
            box-shadow: 1px 1px 1px  #3D3D3D;
            -moz-box-shadow: 1px 1px 1px  #3D3D3D;
            -webkit-box-shadow: 1px 1px 1px  #3D3D3D;
            color: #585858;
            background:rgb(8, 199, 33) ;
            
        }
.div4 .button:hover{
            color:  #333;
            /* background-color:   #f6ff0a ; */
            margin-left: 10px
}
.div5{
    margin: auto;
    /* margin-top: 80px; */
    
    background-color:#081832;
    position: absolute;



    /* height: calc(100%-88px); */
    top: 88px;
    bottom: 0;
    right: 0;
    left: 0;
    /* opacity: 0.4; */
    z-index: 1;
    /* display: none; */


}



.Content-Main{
        /* max-width: 500px;
        margin: auto;
        border: none;
        border-radius: 5px; 
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px;
        font: 12px "Helvetica Neue", Helvetica, Arial, sans-serif;
        text-shadow: 1px 1px 1px #444;
        z-index: 4;
        color: #D3D3D3;
        background: #555; */
        
        width:400px;
        height:550px;
        /* 修饰边角 */
        border-radius: 10px; 
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px;
        background-color:#034c6a;
    
        box-shadow: -10px 0px 15px #034c6a inset /*å·¦è¾¹é˜´å½±*/;
        z-index: 4;
        padding-top: 10px; 
        position: absolute;
        top: 20px;left: 40px;
        text-shadow: 1px 1px 1px #444;
        color:white

}

  .Content-Main h1{
            padding: 8px 0px 20px 10px;
            display: block;
            border-bottom: 1px solid #444;
  }
  .Content-Main label{
            margin: 0px 0px 1px;
            display: block;
            margin-left: 10px
  }
    .Content-Main label>span{
            width: 20%;
            float: left;
            text-align: right;
            padding-right: 10px;
            margin-top: 10px;
            font-weight: bold;
    }
/* [type="text"],.Content-Main input[type="email"],.Content-Main textarea */
    .Content-Main input{
            height: 25px;
            width: 70%;
            line-height: 15px;
            padding: 5px 0px 5px 5px; 
            margin-bottom: 16px;
            margin-right: 6px;
            margin-top: 2px;
            border: none;
            /* border-radius:2px;
            -webkit-border-radius:2px;
            -moz-border-radius:2px; */
            outline: 0 none; 
            background:  #DFDFDF;
            color: #525252;
            /* color: olive */
            
}
.Content-Main .button {
            padding: 8px 24px 8px 24px;
            margin-bottom: 8px;
            border: none;
            border-radius: 4px;
            -moz-border-radius: 4px;
            -webkit-border-radius: 4px;
            font-weight: bold;
            text-shadow: 1px 1px 1px #FFE477;
            box-shadow: 1px 1px 1px  #3D3D3D;
            -moz-box-shadow: 1px 1px 1px  #3D3D3D;
            -webkit-box-shadow: 1px 1px 1px  #3D3D3D;
            color: #585858;
            background:#EBEBEB ;
        }

.Content-Main .button:hover {
            color:  #333;
            background-color:   #f6ff0a ;
            margin-left: 10px
}
.Content-Main .test{
    width:6%;
    height: 25px;
    background-color: white


}
.Content-Main .test:hover {
            color:  #333;
            background-color: rgb(31, 107, 97)
            
}


.list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
    }
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
opacity: 0;
transform: translateY(30px);
}
.list-complete-leave-active {
position: absolute;
}



/* 新加的样式 */
.clear{
    clear: both;
}
.table_style{
    color: #FFFFff;
    box-shadow: -8px 0px 10px #034c6a inset,
    8px 0px 10px #034c6a inset;
    border: none !important;
    font-size: 13px;
    overflow: auto;
    width:100%;
    z-index: 3;
}
.table_style a{
    margin-right: 10px;
}
.table_style td{
    border: none !important;
    height: 34px;
}
.table_style tbody tr:nth-child(2n+1){
    background-color: #072951;
    box-shadow: -10px 0px 15px #034c6a inset,
    10px 0px 15px #034c6a inset;
}
.table_style thead tr{
    color: #4b8df8;
    height: 34px;
}
.table_style thead th{
    border-bottom: none !important;
}
.table_style tbody tr:nth-child(2n):hover{
    /*color: #072951;*/
    background-color: rgba(75, 141, 248, 0.12);
}
.table_div{
    margin-top: 5px;
    color: #FFFFff;
    width: 100%;
    height: 500px;
    overflow: auto;
    position: absolute;; 
    z-index: 3;
    
    
    
}
.table_but{
    text-align: right;
    font-size: 13px;
    padding-bottom: 5px;
    padding-top: 10px;

}
.table_but a{
    margin-right: 15px;
    color: #FFFFff;
}
.table_but a i{
    margin-right: 5px;
}
/* 搜多的样式 */
.table_find{
 
    width: 100%;
    height: 50px;
    
    
    padding: 0px 0;
    border-bottom: 2px solid #a5c5f83b;
    font-size: 13px;
  
}
.more_find{

    cursor: pointer;
    position: relative;
    top:5px;
}
.table_find .glyphicon{
    margin-right: 10px;
    
}
.table_find button{
    padding: 4px 4px;
    /* width: 20px; */
    /* height: 40px; */
}
.table_find p{
    margin-top: 8px;
}
.table_find label{

    color: #eeeeee;

    width: 50px;
    display: inline-block;
    text-align: left;

}
.table_find input[type=text],.table_find input[type=date]{
    width: 16%;
    height: 24px;
    border-radius: 3px;
    text-indent: 1em;
    border:1px solid#4b8df8;
    background-color: #cccccc4f;
}
.table_find select{
    width: 12%;
    height: 24px;
    border-radius: 3px;
    text-indent: 1em;
    border:1px solid #4b8df8;
    background-color: #cccccc4f;
}
.table_find input[type=checkbox]{
    width: 14px;
    height: 14px;
    position: relative;
    top:3px;
    margin-right: 5px;
}
.table_find span{
    color: #b2cbf3;

    margin-right: 2%;
}
.find_button{
    width: 5%;
    height: 26px;
    border: none;
    border-radius: 2px;
    background-color: #4b8df8;
    color: #FFFFff;
    font-size: 14px;

}



</style>
