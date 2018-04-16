<template>
    <div id="button">
        <el-alert title="不同的颜色代表不同的个性，自定义自己的个性主题" type="success" :closable="false">
        </el-alert>
        <div>
            <h2>左侧导航</h2> 背景色：
            <el-color-picker v-model="bgcolor" @change="getbgcolor" show-alpha></el-color-picker>
            文字色：
            <el-color-picker v-model="textcolor" @change="getcolor" show-alpha></el-color-picker>
            选中色：
            <el-color-picker v-model="activecolor" @change="getactivecolor" show-alpha></el-color-picker>
        </div>
        <div>
            <h2>头部导航</h2> 背景色：
            <el-color-picker v-model="tbgcolor" @change="tgetbgcolor" show-alpha></el-color-picker>
            文字色：
            <el-color-picker v-model="ttextcolor" @change="tgetcolor" show-alpha></el-color-picker>
            选中色：
            <el-color-picker v-model="tactivecolor" @change="tgetactivecolor" show-alpha></el-color-picker>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    export default {
        data() {
            return {

            };
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
            getbgcolor(param) {
                this.BGCOLOR(param);
            },
            getcolor(param) {
                this.TEXTCOLOR(param);
            },
            getactivecolor(param) {
                this.ACTIVECOLOR(param);
            },
            tgetbgcolor(param) {
                this.TBGCOLOR(param);
            },
            tgetcolor(param) {
                this.TTEXTCOLOR(param);
            },
            tgetactivecolor(param) {
                this.TACTIVECOLOR(param);
            }
        },
        computed: {
            ...mapState([
                'textcolor',
                'bgcolor',
                'activecolor',
                'ttextcolor',
                'tactivecolor',
                'tbgcolor'
            ])
            // textcolor: {
            //     // getter
            //     get: function() {
            //         return this.$store.state.textcolor
            //     },
            //     // setter
            //     set: function(newValue) {
            //         this.$store.commit('textcolor', newValue);
            //     }
            // },
            // bgcolor: {
            //     // getter
            //     get: function() {
            //         return this.$store.state.bgcolor
            //     },
            //     // setter
            //     set: function(newValue) {
            //         this.$store.commit('bgcolor', newValue);
            //     }
            // },
            // activecolor: {
            //     // getter
            //     get: function() {
            //         return this.$store.state.activecolor
            //     },
            //     // setter
            //     set: function(newValue) {
            //         this.$store.commit('activecolor', newValue);
            //     }
            // },
            // ttextcolor: {
            //     // getter
            //     get: function() {
            //         return this.$store.state.ttextcolor
            //     },
            //     // setter
            //     set: function(newValue) {
            //         this.$store.commit('ttextcolor', newValue);
            //     }
            // },
            // tbgcolor: {
            //     // getter
            //     get: function() {
            //         return this.$store.state.tbgcolor
            //     },
            //     // setter
            //     set: function(newValue) {
            //         this.$store.commit('tbgcolor', newValue);
            //     }
            // },
            // tactivecolor: {
            //     // getter
            //     get: function() {
            //         return this.$store.state.tactivecolor
            //     },
            //     // setter
            //     set: function(newValue) {
            //         this.$store.commit('tactivecolor', newValue);
            //     }
            // },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #button {
        margin: 20px 80px;
    }
</style>