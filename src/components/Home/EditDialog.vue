<template>
    <el-dialog customClass="customWidth" :visible.sync="localShow" :title="title" :before-close="beforeClose">
        <!-- 插槽区 -->
        <slot></slot>
        <!-- 按钮区 -->
        <span slot="footer">
            <el-button type="success" icon="el-icon-check" @click="save">保存</el-button>
            <el-button type="danger" icon="el-icon-close" @click="close">关闭</el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: '对话框'
            }
        },
        data() {
            return {
                localShow: this.show
            }
        },
        watch: {
            show(val) {
                this.localShow = val
            }
        },
        methods: {
            beforeClose() {
                this.close()
            },
            close() {
                this.$emit('close')
            },
            save() {
                this.$emit('save')
            }
        }
    }
</script>

<style>
 .customWidth{
        width:30%;
        /* height: 50%; */
    }
  
.el-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
}
.el-textarea__inner {
    display: block;
    resize: vertical;
    /* padding: 5px 15px; */
    line-height: 1.5;
    /* -webkit-box-sizing: border-box; */
    /* box-sizing: border-box; */
    width: 70%;
    font-size: inherit;
    color: #606266;
    background-color: #FFF;
    background-image: none;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.el-dialog__footer {
    padding: 0px 20px 20px;
    text-align: right;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.el-dialog__header {
    padding: 15px 25px 15px;
}
.el-dialog__body {
    padding: 0px 25px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
}
</style>
