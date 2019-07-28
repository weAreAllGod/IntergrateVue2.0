<template>
    <div class="table-div">
        <Table id="source_info_1" :row-class-name="rowClassName" :columns="columns" :data="data"></Table>
    </div>
</template>
<script>
import axios from 'axios'
    export default {
        data () {
            return {
                modal: false,
                columns: [
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
                ],
                data: []
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
                .then(response => (this.data = response.data.data))
                .catch(error => console.log(error))
        },

        methods:{
           rowClassName :function (row, index) {
                if(index%2==0){
                return 'ivu-table-stripe-even';
                }
                else return 'ivu-table-stripe-odd';
      },

        }

  
       
    }
</script>

<style>
/*外层table的border*/
#source_info_1 .ivu-table{
    background-color: #081832;
    padding: 0px;
    margin: 0px;
}
#source_info_1 .ivu-table-wrapper {
    border: none;
}

/*头部th*/
#source_info_1 .ivu-table-header th{
    text-align: center;
    font-size: 12px;
    color: #4b8df8;
    background-color: #072951;
    box-shadow: 0px 8px 8px -8px #034c6a inset, 0px 8px 8px -8px #034c6a inset;
    border: none;
}
/*每行的基本样式*/
#source_info_1 .ivu-table-row td {
    height: 40px;
    font-size: 13px;
    text-align: center;
    color: #fff;
    border:none
  }

/*奇数行*/
#source_info_1 .ivu-table-stripe-even td{
    background-color: #072951;
    box-shadow: 0px 15px 15px -15px #034c6a inset, 0px -15px 15px -15px #034c6a inset;
}
/*偶数行*/
#source_info_1 .ivu-table-stripe-odd td{
    background-color: #081832;
}
/*选中某一行高亮*/
#source_info_1 .ivu-table-row-highlight td {
    background-color: #072951!important;
  }
  /*浮在某行*/
#source_info_1 .ivu-table-row-hover td {
    background-color: #072951!important;
}

#source_info_1 .ivu-table:before{height:0px}
#source_info_1 .ivu-table:after{width:0px}

html{
    height: calc(100vh);
    background: #081832;
}

.table-div{
    padding: 0px;
    margin: 0px
}

</style>
