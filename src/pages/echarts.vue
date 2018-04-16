<template>
    <div v-loading="loading2">
        <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
            <el-radio-button label="top">top</el-radio-button>
            <el-radio-button label="right">right</el-radio-button>
            <el-radio-button label="left">left</el-radio-button>
        </el-radio-group>

        <el-tabs :tab-position="tabPosition" style="height: 100%;">
            <el-tab-pane label="Bar">
                <div id="cid" style="width:900px; height:500px"></div>
            </el-tab-pane>
            <el-tab-pane label="Pie">
                <div id="bid" style="width:900px; height:900px"></div>
                <div id="aid" style="width:900px; height:900px"></div>
            </el-tab-pane>
            <el-tab-pane label="Line">
                <div id="did" style="width:900px; height:500px"></div>
            </el-tab-pane>
            <el-tab-pane label="Radar">
                <div id="eid" style="width:900px; height:500px"></div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        data() {
            return {
                loading2: false,
                tabPosition: 'top'
            };
        },
        mounted: function() {
            this.loading2 = true;
            setTimeout(() => {
                this.drawLine();
                this.drawLineb();
                this.drawLinec();
                this.drawLined();
                this.drawLinee();
                this.loading2 = false;
            }, 500);

        },
        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                this.charts = echarts.init(document.getElementById('aid'))
                // 绘制图表
                this.charts.setOption({
                    title: {
                        text: '某站点用户访问来源',
                        subtext: '纯属虚构',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                    },
                    series: [{
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '40%'],
                        data: [{
                                value: 335,
                                name: '直接访问'
                            },
                            {
                                value: 310,
                                name: '邮件营销'
                            },
                            {
                                value: 234,
                                name: '联盟广告'
                            },
                            {
                                value: 135,
                                name: '视频广告'
                            },
                            {
                                value: 1548,
                                name: '搜索引擎'
                            }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                });
            },
            drawLineb() {
                // 基于准备好的dom，初始化echarts实例
                this.charts = echarts.init(document.getElementById('bid'))
                // 绘制图表
                this.charts.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
                    },
                    series: [{
                            name: '访问来源',
                            type: 'pie',
                            selectedMode: 'single',
                            radius: [0, '30%'],

                            label: {
                                normal: {
                                    position: 'inner'
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                    value: 335,
                                    name: '直达',
                                    selected: true
                                },
                                {
                                    value: 679,
                                    name: '营销广告'
                                },
                                {
                                    value: 1548,
                                    name: '搜索引擎'
                                }
                            ]
                        },
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['40%', '55%'],
                            label: {
                                normal: {
                                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                    backgroundColor: '#eee',
                                    borderColor: '#aaa',
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    // shadowBlur:3,
                                    // shadowOffsetX: 2,
                                    // shadowOffsetY: 2,
                                    // shadowColor: '#999',
                                    // padding: [0, 7],
                                    rich: {
                                        a: {
                                            color: '#999',
                                            lineHeight: 22,
                                            align: 'center'
                                        },
                                        // abg: {
                                        //     backgroundColor: '#333',
                                        //     width: '100%',
                                        //     align: 'right',
                                        //     height: 22,
                                        //     borderRadius: [4, 4, 0, 0]
                                        // },
                                        hr: {
                                            borderColor: '#aaa',
                                            width: '100%',
                                            borderWidth: 0.5,
                                            height: 0
                                        },
                                        b: {
                                            fontSize: 16,
                                            lineHeight: 33
                                        },
                                        per: {
                                            color: '#eee',
                                            backgroundColor: '#334455',
                                            padding: [2, 4],
                                            borderRadius: 2
                                        }
                                    }
                                }
                            },
                            data: [{
                                    value: 335,
                                    name: '直达'
                                },
                                {
                                    value: 310,
                                    name: '邮件营销'
                                },
                                {
                                    value: 234,
                                    name: '联盟广告'
                                },
                                {
                                    value: 135,
                                    name: '视频广告'
                                },
                                {
                                    value: 1048,
                                    name: '百度'
                                },
                                {
                                    value: 251,
                                    name: '谷歌'
                                },
                                {
                                    value: 147,
                                    name: '必应'
                                },
                                {
                                    value: 102,
                                    name: '其他'
                                }
                            ]
                        }
                    ]
                });
            },
            drawLinec() {
                // 基于准备好的dom，初始化echarts实例
                this.charts = echarts.init(document.getElementById('cid'))
                // 绘制图表
                this.charts.setOption({
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }],
                    yAxis: [{
                        type: 'value'
                    }],
                    series: [{
                        name: '直接访问',
                        type: 'bar',
                        barWidth: '60%',
                        data: [10, 52, 200, 334, 390, 330, 220]
                    }]
                });
            },
            drawLined() {
                // 基于准备好的dom，初始化echarts实例
                this.charts = echarts.init(document.getElementById('did'))
                // 绘制图表
                this.charts.setOption({
                    title: {
                        text: '折线图堆叠'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '10%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                            name: '邮件营销',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '联盟广告',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '视频广告',
                            type: 'line',
                            stack: '总量',
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name: '直接访问',
                            type: 'line',
                            stack: '总量',
                            data: [320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name: '搜索引擎',
                            type: 'line',
                            stack: '总量',
                            data: [820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                });
            },
            drawLinee() {
                // 基于准备好的dom，初始化echarts实例
                this.charts = echarts.init(document.getElementById('eid'))
                // 绘制图表
                this.charts.setOption({
                    title: {
                        text: '基础雷达图'
                    },
                    tooltip: {},
                    legend: {
                        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
                    },
                    radar: {
                        // shape: 'circle',
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        indicator: [{
                                name: '销售（sales）',
                                max: 6500
                            },
                            {
                                name: '管理（Administration）',
                                max: 16000
                            },
                            {
                                name: '信息技术（Information Techology）',
                                max: 30000
                            },
                            {
                                name: '客服（Customer Support）',
                                max: 38000
                            },
                            {
                                name: '研发（Development）',
                                max: 52000
                            },
                            {
                                name: '市场（Marketing）',
                                max: 25000
                            }
                        ]
                    },
                    series: [{
                        name: '预算 vs 开销（Budget vs spending）',
                        type: 'radar',
                        // areaStyle: {normal: {}},
                        data: [{
                                value: [4300, 10000, 28000, 35000, 50000, 19000],
                                name: '预算分配（Allocated Budget）'
                            },
                            {
                                value: [5000, 14000, 28000, 31000, 42000, 21000],
                                name: '实际开销（Actual Spending）'
                            }
                        ]
                    }]
                });
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>