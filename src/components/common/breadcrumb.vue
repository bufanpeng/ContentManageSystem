<template>
    <el-breadcrumb id="lh" separator="/">
        <el-breadcrumb-item v-for="(item,index) in breadList"  :key="item.path">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default{
    created() {
        this.getBreadcrumb();
    },
    data() {
        return {
            breadList: [] // 路由集合
        }
    },
    methods: {
        getBreadcrumb() {
            let matched = this.$route.matched;
            this.breadList = matched;
        }
    },
    watch: {
        //"$route": "getBreadcrumb"
        $route () {
            this.getBreadcrumb();
        }
    },
}
</script>
<style scoped>
    #lh.el-breadcrumb{
        display: inline-block;
        vertical-align: middle;
    }
</style>