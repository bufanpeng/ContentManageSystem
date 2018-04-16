<template>
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      :active-text-color="tactivecolor" 
      :background-color="tbgcolor" 
      :text-color="ttextcolor" 
      show-timeout="0"
      router>
        <div class="lefts">
            <el-menu-item index=""><bread-crumb></bread-crumb></el-menu-item>
        </div>
        <el-submenu index="2">
            <template slot="title">{{admin}}</template>
            <el-menu-item index="/logout">退出登录</el-menu-item>
            <!-- <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item> -->
        </el-submenu>
        <el-menu-item index="/"><a style="text-decoration:none;" href="https://github.com/jy960913/ThinkPHP5.0-Vue.js2.0-Element-UI-Admin-" target="_blank">GitHub</a></el-menu-item>
        <el-menu-item index="/emptys">清空缓存</el-menu-item>
        <el-menu-item index="/custom">自定义主题</el-menu-item>
    </el-menu>
</template>

<script>
    import breadCrumb from '@/components/common/breadcrumb.vue'
    import {axiosGet, axiosPost, showMsg, confirm} from '../../common/common.js'
    import {mapState, mapMutations} from 'vuex'
    export default {
        data() {
            return {
                activeIndex2: '1',
            };
        },
        components: {
            breadCrumb
        },
        methods: {
            ...mapMutations([
                'TEXTCOLOR',
                'BGCOLOR',
                'ACTIVECOLOR',
                'TTEXTCOLOR',
                'TBGCOLOR',
                'TACTIVECOLOR',
            ]),
            handleSelect(key, keyPath) {
                if (key == '/') {
                    this.$router.push({
                        path: key
                    })
                }else if (key == '/custom') {
                    this.$router.push({
                        path: key
                    })
                }else if (key == '/logout') {
                    localStorage.removeItem('admin');
                    localStorage.removeItem('nav_arr');
                    showMsg('退出成功', 'success');
                    this.$router.push({
                        path: '/login'
                    })
                }else if (key == '/emptys') {
                    localStorage.removeItem('admin');
                    localStorage.removeItem('nav_arr');
                    localStorage.removeItem('navlist');
                    this.TEXTCOLOR("rgba(6, 247, 114, 1)");
                    this.BGCOLOR("rgba(88, 88, 101, 1)");
                    this.ACTIVECOLOR("rgba(255, 68, 0, 1)");
                    this.TTEXTCOLOR("rgba(56, 176, 110, 1)");
                    this.TBGCOLOR("rgba(244, 244, 249, 1)");
                    this.TACTIVECOLOR("rgba(255, 68, 0, 1)");
                    this.$router.push({
                        path: '/'
                    });
                    showMsg('清空成功，请重新登录', 'success');
                };
            },
        },
        computed: {
            ...mapState([
                'ttextcolor',
                'tbgcolor',
                'tactivecolor',
                'admin',
            ])
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .lefts{float: left}
    .el-menu-demo{padding-right:50px;}
    .el-menu--horizontal .el-menu-item{float:right}
    .el-menu--horizontal .el-submenu .el-menu-item{float:right}
    .el-menu--horizontal .el-submenu{float:right;}
    .el-menu--horizontal .el-submenu .el-menu-item{min-width:130px;text-align:center;}
</style>