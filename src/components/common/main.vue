<template>
   <el-main>
        <div style="font-size:13px;">
            <h2>ThinkPHP5.0 + Vue.js2.0 + Element UI 2.1.0</h2>
            <el-alert
              title="本人PHPer，平时喜欢写一些开源的东西，同时也希望有前端、后台的小伙伴能一起合作。本项目开源并且一直更新，扫描下方二维码了解更多"
              type="success"
              :closable="false">
            </el-alert>
        </div>
        <div style="padding-top:100px;">
            <img src="../../assets/456.png" alt="">
        </div>
        <div >
            <img style="width:500px;height:375px;" src="../../assets/123.gif" alt="">
            <br/>
            <img style="width:500px;height:375px;" src="../../assets/sudo.gif" alt="">
        </div>
   </el-main>
</template>

<script>
    export default {
        data() {
            return {
            };
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-main {
        background-color: #e3e3e3;
        color: #333;
        text-align: center;
        line-height: 40px;
        height: 100%;
        width: 100%;
    }
</style>