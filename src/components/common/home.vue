<template>
    <el-container class="mains">
        <el-aside width="200px" :style="{'background-color': bgcolor}">
            <el-nav></el-nav>
        </el-aside>

        <el-container>
            <el-header style="padding:0; font-size: 12px;">
                <el-headers></el-headers>
            </el-header>

            <el-main>
                <router-view></router-view>
            </el-main>
            <!-- <el-footer style="height:30px;" :style="{'background-color': tbgcolor}" class="footers">Copyright © 2018-2026 All Rights Reserved</el-footer> -->
        </el-container>
    </el-container>
</template>

<script>
    import ElNav from '@/components/common/nav'
    import ElHeaders from '@/components/common/header'
    import {mapState, mapMutations} from 'vuex'
    export default {
        data() {
            return {}
        },
        components: {
            ElNav,
            ElHeaders
        },
        computed: {
            ...mapState([
                'tbgcolor',
                'bgcolor',
            ])
        },
        mounted: function() {
            console.log(this.tbgcolor)
            console.log(this.bgcolor)
            // this.tbgcolor = JSON;
            // this.tbgcolor = 
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-aside {
        color: #333;
    }
    
    .mains {
        margin: 0 auto;
        position: absolute;
        height: 100%;
        width: 100%;
    }
    
    .footers {
        background: #fff;
        border-top: 1px solid rgba(48, 54, 62, .14);
        text-align: center;
        padding: 5px 0;
        color: #7A7676;
        font-size: 12px;
    }
</style>