<template>
    <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :unique-opened="true"
        :active-text-color="activecolor"
        :background-color="bgcolor"
        :text-color="textcolor"
        router>
        <template v-for="item in JSON.parse(nav_arr)">
          <template v-if="item.children">
            <el-submenu :index="item.index">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.label }}</span>
              </template>
              <el-menu-item v-for="(subItem,i) in item.children" :key="i" :index="subItem.index">{{ subItem.label }}</el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.index">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.label }}</span>
            </el-menu-item>
          </template>
        </template>
    </el-menu>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
                // nav_arr: JSON.parse(this.$store.state.nav_arr),
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
        },
        mounted: function (argument) {
            console.log(this.bgcolor)
        },
        computed: {
            ...mapState([
                'textcolor',
                'bgcolor',
                'activecolor',
                'nav_arr'
            ])
        }
        // computed: mapState({
        //     textcolor: state => state.textcolor,
        //     bgcolor: state => state.bgcolor,
        //     activecolor: state => state.activecolor,
        // }),
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-menu-vertical-demo{
      border-right: 0;
    }
</style>