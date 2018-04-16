<template>
    <div id="button">
        <div>
            <h2>选择日</h2>
            <template>
                <div class="block">
                    <span class="demonstration">默认</span>
                    <el-date-picker v-model="value1" type="date" placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="block">
                    <span class="demonstration">带快捷选项</span>
                    <el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
                    </el-date-picker>
                </div>
            </template>
        </div>
        <div>
            <h2>其他日期单位</h2>
            <div class="block">
                <span class="demonstration">周</span>
                <el-date-picker v-model="value3" type="week" format="yyyy 第 WW 周" placeholder="选择周">
                </el-date-picker>
            </div>
            <div class="block">
                <span class="demonstration">月</span>
                <el-date-picker v-model="value4" type="month" placeholder="选择月">
                </el-date-picker>
            </div>
            <div class="block">
                <span class="demonstration">年</span>
                <el-date-picker v-model="value5" align="right" type="year" placeholder="选择年">
                </el-date-picker>
            </div>
        </div>
        <div>
            <h2>选择日期范围</h2>
            <div class="block">
                <span class="demonstration">默认</span>
                <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <div class="block">
                <span class="demonstration">带快捷选项</span>
                <el-date-picker v-model="value7" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                </el-date-picker>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                value1: '',
                value2: '',
                value3: '',
                value4: '',
                value5: '',
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value6: '',
                value7: ''
            };
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #button {
        margin: 20px 80px;
    }
    
    .block {
        display: inline-block;
    }
</style>