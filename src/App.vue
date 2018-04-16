<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    
    html,
    body {
        height: 100%;
        overflow: hidden;
        margin: 0;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }
    
    ::-webkit-scrollbar-track-piece {
        width: 6px;
        background: #424f63;
        border: 0;
        border-radius: 3px;
    }
    
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        border: 0;
        background: #424f63;
        border-radius: 3px;
    }
    
    ::-webkit-scrollbar-thumb {
        background-color: #65cea7;
        border: 0;
        border-radius: 3px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background-color: #57be98
    }
</style>