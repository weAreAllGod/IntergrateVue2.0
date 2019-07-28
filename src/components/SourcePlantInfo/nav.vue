<template>
    <Menu mode="horizontal" :theme="theme" active-name="1" @on-select="clicklit">
        <MenuItem name="0">
        <div class="navbar-header">
            <a href="#" class="navbar-brand"></a>
        </div>
        </MenuItem>
        <MenuItem name="1">
            <Icon type="ios-paper"/>
            首页
        </MenuItem>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-stats" />
                产生源监测
            </template>
            <MenuItem name="2-1" to="/">产生源地图</MenuItem>
            <MenuItem name="2-2">基本信息</MenuItem>
            <MenuItem name="2-3" to="/statistics">信息统计</MenuItem>
            <MenuItem name="2-4">信息维护</MenuItem>
        </Submenu>
        <Submenu name="3">
            <template slot="title">
                <Icon type="ios-stats" />
                运转/处理电子联单
            </template>
            <MenuGroup title="电子联单">
                <MenuItem name="3-1">基本信息</MenuItem>
                <MenuItem name="3-2">联单查询</MenuItem>
                <MenuItem name="3-3">审批</MenuItem>
            </MenuGroup>
            <MenuGroup title="信息维护">
                <MenuItem name="3-4">历史数据</MenuItem>
                <MenuItem name="3-5">删改</MenuItem>
            </MenuGroup>
        </Submenu>
        <MenuItem name="4">
            <Icon type="ios-car" />
            运转车辆实时监控
        </MenuItem>
        <MenuItem name="5">
            <Icon type="ios-construct" />
            安全与环境监测
        </MenuItem>
        <MenuItem name="6">
            <Icon type="ios-keypad" />
            资源化信息管理
        </MenuItem>
        <!-- modal对话框，点击nav上的选项后弹出 -->
        <modal1 ref="modal1"></modal1>
        <modal2 ref="modal2"></modal2>
    </Menu>
</template>

<script>
// 导入Modal组件
import modal1 from './modal1'
import modal2 from './modal2'
import axios from 'axios'

    export default {
        data () {
            return {
                theme: 'dark',
                data:[]
            }
        },

        created () {
            axios
                .get('/api/sourceInfo/si')
                .then(response => (this.data = response.data.data))
                .catch(error => console.log(error))
        },
        // updated () {
        //     axios
        //         .get('/api/sourceInfo/si')
        //         .then(response => (this.data = response.data))
        //         .catch(error => console.log(error))
        // },
      
        methods:{
            clicklit (name) {
                if(name=="2-2"){
                    this.$refs.modal1.modal = true
                    this.$refs.modal1.data = this.data
                }
                if(name=="2-4"){
                    this.$refs.modal2.modal = true
                    this.$refs.modal2.initData = this.data
                }
            }  
        },
        components: {
            modal1,
            modal2
        }
    }
</script>

<style scoped>
.navbar-brand{
    background-image: url(../../static/img/logo.png);
    width: 50px;
    background-size: 70%;
    background-repeat: no-repeat;
    background-position: center center;
    margin-top: 5px;
}
</style>
