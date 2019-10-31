<template>
  <div id="mainDiv">
    <viw></viw>
    <div class="con" :style="backgroundDiv">
      <!--统计分析图-->
      <div class="div_any" >
        <div class="div_any01">
          <div class="right right_table"></div>
          <div class="table_find">
               <p><label>用户名：</label><input type="text" placeholder="请输入用户名"/><label>密码：</label><input type="text" placeholder="请输入密码"/>
                <label>选择权限：</label><select><option>管理员</option><option>普通用户</option></select><label></label>
                <button class="btn btn-primary btn-sm">
                <span class="glyphicon glyphicon-search"></span>查询</button>
                </p>
        </div>
         <div class="table_div">
            <p class="table_but"><a href="javascript:void(0)" onclick="add()"><i class="glyphicon glyphicon-plus"></i>新增</a><a href="javascript:void(0)"><i class="glyphicon glyphicon-remove"></i> 删除</a><a href="javascript:void(0)"><i class="glyphicon glyphicon-print"></i>打印</a><a href="javascript:void(0)"><i class="glyphicon glyphicon-export"></i>导出</a> </p>
            <p>
            <table id="table" class="table_style" border="0"></table>
            </p>
        </div>
           <div class="col-12">
            <table class="table table-hover table-success">
                <thead class="thead-default">
                <tr>
                    <th><input type="checkbox"></th>
                    <th>序号</th>
                    <th>设备编号</th>
                    <th>设备名称</th>
                    <th>设备状态</th>
                    <th>采购日期</th>
                    <th>设备管理员</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(facility,index) in facilities">
                    <td><input type="checkbox" :value="index" v-model="checkedRows"></td>
                    <td>{{index+1}}</td>
                    <td>{{facility.code}}</td>
                    <td>{{facility.name}}</td>
                    <td>{{facility.states}}</td>
                    <td>{{facility.date}}</td>
                    <td>{{facility.admin}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        </div>
      </div>

      <!--分析表格-->
    </div>
  </div>
</template>


<script>
import viw from "./View";


var datas = [
  {
    code: "A2017-001",
    name: "3800充电器",
    states: "正常",
    date: "2017-01-21",
    admin: "andy"
  },
  {
    code: "A2017-002",
    name: "Lenovo Type-c转接器",
    states: "正常",
    date: "2017-01-21",
    admin: "zero"
  }
];

export default {
  name: "MainViewer",
  components: {
    viw
  },
  data() {
    return {
      backgroundDiv: {
        // src\assets
        
        hight: "",
        weight: ""
      },
      checkAll: false, // 是否全选
      checkedRows: [], // 选中的行标，用于删除行
      facilities: datas, // 表格数据
      newRow: {}, // 新增的行数据，用于新增行
      striped: true,
    };
  },
  created() {
    this.hh();
  },
  methods: {
    hh() {
      this.backgroundDiv.height = window.innerHeight - 92 + "px";
      this.backgroundDiv.weight = window.innerWeight + "px";
    }
  }
};
</script>


<style scoped>
#mainDiv {
  width: 100%;
  height: 100%;
}
.right_table {
  height: 100%;

  border-radius: 5px;
  width: 100%;
  background-color: #081832;
  /* margin-left: 1.5%; */
  /* padding:20px; */
  /* margin: 0px; */
}

.table_find {
  width: 100%;
  padding: 8px 0;
  border-bottom: 2px solid #a5c5f83b;
  font-size: 13px;
}
.more_find {
  cursor: pointer;
  position: relative;
  top: 5px;
}
.table_find .glyphicon {
  margin-right: 5px;
}
.table_find button {
  padding: 4px 10px;
}
.table_find p {
  margin-top: 8px;
}
.table_find label {
  color: #eeeeee;

  width: 8%;
  display: inline-block;
  text-align: right;
}
.table_find input[type="text"],
.table_find input[type="date"] {
  width: 16%;
  height: 24px;
  border-radius: 3px;
  text-indent: 1em;
  border: 1px solid#4b8df8;
  background-color: #cccccc4f;
}
.table_find select {
  width: 12%;
  height: 24px;
  border-radius: 3px;
  text-indent: 1em;
  border: 1px solid #4b8df8;
  background-color: #cccccc4f;
}
.table_find input[type="checkbox"] {
  width: 14px;
  height: 14px;
  position: relative;
  top: 3px;
  margin-right: 5px;
}
.table_find span {
  color: #b2cbf3;

  margin-right: 4%;
}
.table_but {
  text-align: right;
  font-size: 13px;
  padding-bottom: 5px;
  padding-top: 10px;
}
.table_but a {
  margin-right: 15px;
  color: #ffffff;
}
.table_but a i {
  margin-right: 5px;
}
.table_del {
  color: orangered;
}
.table_edit {
  color: #0d8bbd;
}
.table_div {
  margin-top: 20px;
  color: #ffffff;
}
.table_style {
  /* color: #ffffff; */
  color: #072951;
  
  box-shadow: -8px 0px 10px #034c6a inset, 8px 0px 10px #034c6a inset;
  border: none !important;
  font-size: 13px;
}
.table_style a {
  margin-right: 10px;
}
.table_style td {
  border: none !important;
  /* background-color: #f56c6c; */
}
.table_style tbody tr:nth-child(2n + 1) {
  background-color: #072951;
  box-shadow: -10px 0px 15px #034c6a inset, 10px 0px 15px #034c6a inset;
}
.table_style thead tr {
  color: #4b8df8;
}
/* .el-table__body tr:hover>td {
  
    background-color: #f56c6c;
} */
.table_style thead th {
  border-bottom: none !important;
}
.table_style tbody tr:nth-child(2n):hover {
  /*color: #072951;*/
  background-color: rgba(75, 141, 248, 0.12);
}
.div_any {
  /* width: 98%; */
  /* margin-left: 2%; */
  /* margin-right: 2%; */
  margin-bottom: 25px;
  /* height: 980px; */
  height: 100%;
}
.div_any01 {
  width: 100%;
  /* margin-right: 2%; */
  /* height: 800px; */
  /* height: 100%; */
}
.con {
  width: 100%;
  background-color: #081832;
  padding-top: 20px;
  /* padding-bottom: 20px; */
}

</style>