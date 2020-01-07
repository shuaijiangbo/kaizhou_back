<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">特殊人群</el-breadcrumb-item>
            <el-breadcrumb-item>社区人员矫正管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="background-color: #fff;padding: 10px ;margin-top: 10px;">
            <div>
                <el-cascader
                      placeholder="区域"
                      :options="options"
                      filterable
                      change-on-select
                ></el-cascader>
                <!--<el-date-picker style="margin:0 10px; width:150px;"-->
                        <!--v-model="value5"-->
                        <!--align="right"-->
                        <!--type="year"-->
                        <!--placeholder="选择年">-->
                <!--</el-date-picker>-->
                <!--<span class="demonstration">年</span>-->
                <el-date-picker style="margin:0 10px;width:150px;"
                        v-model="value4"
                        type="month"
                        placeholder="选择年/月">
                </el-date-picker>
                <span class="demonstration">年/月</span>
                <el-button type="primary" style="margin-left: 15px; ">查询</el-button>
                <span class="demonstration" style="margin-left:10px;">自定义时间</span>
                <el-date-picker style="margin:0 10px;"
                        v-model="value3"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <div class="dz-zz-charts-box">
                <div class="dz-zz-title">【2019】年特殊人员总况</div>
                <el-row style="padding: 15px 20px">
                    <el-col :span="12">
                        <div><span style="border:2px solid #185198;margin-right: 6px;"></span>12个月内关注特殊人群总量变化趋势</div>
                        <div id="chart_line"> </div>
                    </el-col>
                    <el-col :span="12">
                        <el-table
                              :data="tableData6"
                              border
                              height="338"
                              :summary-method="getSummaries"
                              show-summary>
                            <el-table-column
                                  prop="name"
                                  label="特殊人群分类">
                            </el-table-column>
                            <el-table-column
                                  prop="amount1"
                                  label="总人数">
                            </el-table-column>
                            <el-table-column
                                  prop="amount2"
                                  label="关注人数">
                            </el-table-column>
                            <el-table-column
                                  prop="amount3"
                                  label="走访人数">
                            </el-table-column>
                            <el-table-column
                                    prop="amount3"
                                    label="走访次数">
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <el-row style="padding: 15px 20px">
                    <el-col :span="12">
                        <div><span style="border:2px solid #185198;margin-right: 6px;"></span> 关注特殊人群类型分布占比</div>
                        <div id="chart_ltem" style="height: 340px;margin:20px 10px 0 0;padding:20px;border:1px solid #ddd;"> </div>
                    </el-col>
                    <el-col :span="12">
                        <div><span style="border:2px solid #185198;margin-right: 6px;"></span> 关注特殊人群各地数量排名</div>
                        <div id="chart_axix"  style="height: 340px;margin:20px 0 0 10px;padding:20px;border:1px solid #ddd;"> </div>
                    </el-col>
                </el-row>

            </div>
            <div class="dz-zz-charts-box">
                <div class="dz-zz-title"> 【2019】年【9】月特殊人群工作开展情况</div>
                <el-row style="padding: 15px 20px">
                    <el-col :span="24">
                        <template>
                            <el-table
                                    :data="tableData3"
                                    style="width: 100%">
                                <el-table-column
                                        prop="date"
                                        label=" "
                                        width=" ">
                                </el-table-column>
                                <el-table-column label="本月新增情况">
                                    <el-table-column
                                            prop="name"
                                            label="新增人数"
                                            width=" ">
                                    </el-table-column>

                                        <el-table-column
                                                prop="province"
                                                label="环比"
                                                width=" ">
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="同比"
                                                width=" ">
                                        </el-table-column>
                                        <el-table-column
                                                prop="address"
                                                label="占比"
                                                width=" ">
                                        </el-table-column>
                                </el-table-column>
                                <el-table-column label="取消关注情况">
                                    <el-table-column
                                            prop="name"
                                            label="取消关注人数"
                                            width=" ">
                                    </el-table-column>

                                    <el-table-column
                                            prop="province"
                                            label="环比"
                                            width=" ">
                                    </el-table-column>
                                    <el-table-column
                                            prop="city"
                                            label="同比"
                                            width=" ">
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column
                                        prop="date"
                                        label="死亡人数"
                                        width=" ">
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-col>

                </el-row>
                <el-row style="padding: 15px 20px">
                    <el-col :span="12">
                        <div><span style="border:2px solid #185198;margin-right: 6px;"></span>12个月内特殊人群增量趋势</div>
                        <div id="chart_lineadd" style="height: 340px;margin:20px 10px 0 0;padding:20px;border:1px solid #ddd;"> </div>
                    </el-col>
                    <el-col :span="12">
                        <div><span style="border:2px solid #185198;margin-right: 6px;"></span>特殊人群走访比例</div>
                        <div id="chart_bar" style="height: 340px;margin:20px 10px 0 0;padding:20px;border:1px solid #ddd;"></div>

                    </el-col>
                </el-row>


                <el-row style="padding: 15px 20px">
                    <el-col :span="12">
                        <div><span style="border:2px solid #185198;margin-right: 6px;"></span> 新增特殊人群类型分布占比图</div>
                        <div id="chart_ltemadd" style="height: 340px;margin:20px 10px 0 0;padding:20px;border:1px solid #ddd;"> </div>
                    </el-col>
                    <el-col :span="12">
                        <div><span style="border:2px solid #185198;margin-right: 6px;"></span> 新增特殊人群各地数量排名图</div>
                        <div id="chart_axixadd"  style="height: 340px;margin:20px 0 0 10px;padding:20px;border:1px solid #ddd;"> </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: 'specialPopulation',
        data() {
            return {
                options: [{
                    value: '重庆',
                    label: '重庆',
                    children: [{
                        value: '两江新区',
                        label: '两江新区',
                        children: [{
                            value: '鸳鸯街道',
                            label: '鸳鸯街道',
                        },{
                            value: '人和街道',
                            label: '人和街道',
                        },{
                            value: '天宫殿街道',
                            label: '天宫殿街道',
                        },{
                            value: '翠云街道',
                            label: '翠云街道',
                        },{
                            value: '大竹林街道',
                            label: '大竹林街道',
                        },{
                            value: '礼嘉街道',
                            label: '礼嘉街道',
                        },{
                            value: '金山街道',
                            label: '金山街道',
                        },{
                            value: '康美街道',
                            label: '康美街道',
                        },{
                            value: '鱼嘴街道',
                            label: '鱼嘴街道',
                        },{
                            value: '复盛街道',
                            label: '复盛街道',
                        },{
                            value: '郭家沱街道',
                            label: '郭家沱街道',
                        },{
                            value: '龙兴街道',
                            label: '龙兴街道',
                        }]
                    }]
                }],
                input:'',
                value3:'',
                value4:'',
                value5:'',
                value6:'',
                tableData6: [{
                    id: '12987122',
                    name: '社区矫正人员',
                    amount1: '20',
                    amount2: '19',
                    amount3: '1',
                    amount4: '1'
                }, {
                    id: '12987123',
                    name: '刑释人员',
                    amount1: '101',
                    amount2: '88',
                    amount3: '1',
                    amount4: '1'
                },{
                    id: '12987124',
                    name: '精神病人员',
                    amount1: '96',
                    amount2: '96',
                    amount3: '0',
                    amount4: '0'
                }, {
                    id: '12987124',
                    name: '吸毒人员',
                    amount1: '23',
                    amount2: '22',
                    amount3: '0',
                    amount4: '0'
                }, {
                    id: '12987125',
                    name: '重点青少年',
                    amount1: '36',
                    amount2: '35',
                    amount3: '3',
                    amount4: '3'
                }, {
                    id: '12987126',
                    name: '危险品从业人员',
                    amount1: '0',
                    amount2: '0',
                    amount3: '0',
                    amount4: '0'
                }, {
                    id: '12987126',
                    name: '信访人员',
                    amount1: '6',
                    amount2: '6',
                    amount3: '0',
                    amount4: '0'
                }, {
                    id: '12987126',
                    name: '艾滋病人员',
                    amount1: '0',
                    amount2: '0',
                    amount3: '0',
                    amount4: '0'
                }, {
                    id: '12987126',
                    name: '其他人员',
                    amount1: '44',
                    amount2: '44',
                    amount3: '0',
                    amount4: '0'
                }, {
                    id: '12987126',
                    name: '社会闲散人员',
                    amount1: '0',
                    amount2: '0',
                    amount3: '0',
                    amount4: '0'
                }, {
                    id: '12987126',
                    name: '扬言报复社会人员',
                    amount1: '0',
                    amount2: '0',
                    amount3: '0',
                    amount4: '0'
                }],
                tableData1: [{
                    id: '12987122',
                    name: '2019-09',
                    amount1: '0',
                    amount2: '0',
                }, {
                    id: '12987123',
                    name: '2019-08',
                    amount1: '0',
                    amount2: '0',
                },{
                    id: '12987124',
                    name: '2019-07',
                    amount1: '1',
                    amount2: '2',
                }, {
                    id: '12987124',
                    name: '2019-06',
                    amount1: '0',
                    amount2: '1'
                }, {
                    id: '12987125',
                    name: '2019-05',
                    amount1: '0',
                    amount2: '3',
                }, {
                    id: '12987126',
                    name: '2019-04',
                    amount1: '0',
                    amount2: '0',
                }, {
                    id: '12987126',
                    name: '2019-03',
                    amount1: '0',
                    amount2: '0',
                }, {
                    id: '12987126',
                    name: '2019-02',
                    amount1: '1',
                    amount2: '1',
                }, {
                    id: '12987126',
                    name: '2019-01',
                    amount1: '1',
                    amount2: '2',
                }],
                tableData3: [{
                    date: '刑释人员',
                    name: '19',
                    province: '下降78.16%',
                    city: '上升1900%',
                    address: '占比21.11%',
                    province1: '0',
                    city1: '下降100%',
                    address1: '无变化',
                    province2: '0',
                    zip: 200333
                },{
                    date: '社区矫正人员',
                    name: '19',
                    province: '下降78.16%',
                    city: '上升1900%',
                    address: '占比21.11%',
                    province1: '0',
                    city1: '下降100%',
                    address1: '无变化',
                    province2: '0',
                    zip: 200333
                }, {
                    date: '精神病人员',
                    name: '19',
                    province: '下降78.16%',
                    city: '上升1900%',
                    address: '占比21.11%',
                    province1: '0',
                    city1: '下降100%',
                    address1: '无变化',
                    province2: '0',
                    zip: 200333
                },{
                    date: '吸毒人员',
                    name: '19',
                    province: '下降78.16%',
                    city: '上升1900%',
                    address: '占比21.11%',
                    province1: '0',
                    city1: '下降100%',
                    address1: '无变化',
                    province2: '0',
                    zip: 200333
                },{
                    date: '重点青少年',
                    name: '19',
                    province: '下降78.16%',
                    city: '上升1900%',
                    address: '占比21.11%',
                    province1: '0',
                    city1: '下降100%',
                    address1: '无变化',
                    province2: '0',
                    zip: 200333
                },{
                    date: '危险品从业人员',
                    name: '19',
                    province: '下降78.16%',
                    city: '上升1900%',
                    address: '占比21.11%',
                    province1: '0',
                    city1: '下降100%',
                    address1: '无变化',
                    province2: '0',
                    zip: 200333
                },{
                    date: '信访人员',
                    name: '19',
                    province: '下降78.16%',
                    city: '上升1900%',
                    address: '占比21.11%',
                    province1: '0',
                    city1: '下降100%',
                    address1: '无变化',
                    province2: '0',
                    zip: 200333
                },{
                    date: '艾滋病人员',
                    name: '19',
                    province: '下降78.16%',
                    city: '上升1900%',
                    address: '占比21.11%',
                    province1: '0',
                    city1: '下降100%',
                    address1: '无变化',
                    province2: '0',
                    zip: 200333
                },{
                    date: '其他人员',
                    name: '19',
                    province: '下降78.16%',
                    city: '上升1900%',
                    address: '占比21.11%',
                    province1: '0',
                    city1: '下降100%',
                    address1: '无变化',
                    province2: '0',
                    zip: 200333
                }, {
                    date: '社会闲散人员',
                    name: '19',
                    province: '下降78.16%',
                    city: '上升1900%',
                    address: '占比21.11%',
                    province1: '0',
                    city1: '下降100%',
                    address1: '无变化',
                    province2: '0',
                    zip: 200333
                }, {
                    date: '其他人员',
                    name: '19',
                    province: '下降78.16%',
                    city: '上升1900%',
                    address: '占比21.11%',
                    province1: '0',
                    city1: '下降100%',
                    address1: '无变化',
                    province2: '0',
                    zip: 200333
                },  ]
            }
        },
        components: {
        },
        computed: {
        },
        created(){
        },
        activated(){
        },
        deactivated(){
        },
        mounted(){
            this.chartsBar();
            this.chartsLine();
            this.chartsLineadd();
            this.chartsLtem();
            this.chartsAxix();
            this.chartsLtemadd();
            this.chartsAxixadd();
        },
        methods: {
            chartsBar:function() {
                let myChart = echarts.init(document.getElementById('chart_bar'));
                let option = {
                    legend: {
                        left:10
                    },
                    tooltip: {},
                    grid: {
                        left: '1%',
                        right: '2%',
                        bottom: '1%',
                        top:'12%',
                        containLabel: true
                    },
                    dataset: {
                        dimensions: ['product', '走访服务次数', '被走访人员占总数的百分比(%)'],
                        source: [
                            {product: '回兴街道', '走访服务次数': 0, '被走访人员占总数的百分比(%)':0 },
                            {product: '龙溪街道', '走访服务次数': 48, '被走访人员占总数的百分比(%)': 0 },
                            {product: '龙山街道', '走访服务次数': 1, '被走访人员占总数的百分比(%)': 2 },
                            {product: '龙塔街道', '走访服务次数':0, '被走访人员占总数的百分比(%)': 1 },
                            {product: '悦来街道', '走访服务次数': 0, '被走访人员占总数的百分比(%)': 3 },
                            {product: '两路街道', '走访服务次数': 0, '被走访人员占总数的百分比(%)': 0 },
                            {product: '双凤桥街道', '走访服务次数': 161, '被走访人员占总数的百分比(%)': 0 },
                            {product: '王家街道', '走访服务次数': 1, '被走访人员占总数的百分比(%)': 1 },
                            {product: '玉峰山镇', '走访服务次数': 50, '被走访人员占总数的百分比(%)': 2 },
                            {product: '龙兴镇', '走访服务次数': 17, '被走访人员占总数的百分比(%)': 0 },
                            {product: '统景镇', '走访服务次数': 1, '被走访人员占总数的百分比(%)': 1 },
                        ]
                    },
                    xAxis: {type: 'category'},
                    yAxis: {},
                    series: [
                        {
                            type: 'bar',
                            itemStyle:{
                                color:'#2666bb'
                            }
                        },
                        {
                            type: 'bar',
                            itemStyle:{
                                color:'#2db1df'
                            }
                        },

                    ]
                };
                myChart.setOption(option);
            },
            chartsLine:function() {
                let myChart2 = echarts.init(document.getElementById('chart_line'));
                let option2= {
                    grid: {
                        left: '1%',
                        right: '2%',
                        bottom: '1%',
                        top:'12%',
                        containLabel: true
                    },
                    tooltip : {
                        trigger: 'axis',
                    },
                    xAxis: {
                        type: 'category',
                        data: ['2018年10月', '2018年11月', '2018年12月', '2019年01月', '2019年02月', '2019年03月', '2019年04月', '2019年05月', '2019年06月', '2019年07月', '2019年08月', '2019年09月' ]
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        name:'特殊人群总量',
                        data: [0, 0, 0,0, 0, 0, 0, 0, 0, 94, 163, 69],
                        smooth:true,
                        type: 'line'
                    }]
                };
                myChart2.setOption(option2);
            },
            chartsLineadd:function() {
                let myChart7 = echarts.init(document.getElementById('chart_lineadd'));
                let option7= {
                    grid: {
                        left: '1%',
                        right: '2%',
                        bottom: '1%',
                        top:'12%',
                        containLabel: true
                    },
                    tooltip : {
                        trigger: 'axis',
                    },
                    xAxis: {
                        type: 'category',
                        data: ['2018年10月', '2018年11月', '2018年12月', '2019年01月', '2019年02月', '2019年03月', '2019年04月', '2019年05月', '2019年06月', '2019年07月', '2019年08月', '2019年09月' ]
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        name:'特殊人群增量',
                        data: [0, 0, 0,0, 0, 0, 0, 0, 0, 94, 163, 69],
                        smooth:true,
                        type: 'line'
                    }]
                };

                myChart7.setOption(option7);
            },
            chartsLtem:function() {
                let myChart3 = echarts.init(document.getElementById('chart_ltem'));
                let option3 = {
                    grid: {
                        left: '1%',
                        right: '2%',
                        bottom: '1%',
                        top:'12%',
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:['社区矫正人员','刑释人员','精神病人员','吸毒人员','重点青少年','危险品从业人员','信访人员','艾滋病人员','其他人员','社会闲散人员','扬言报复社会人员']
                    },
                    series: [
                        {
                            name:'特殊人群类型',
                            type:'pie',
                            radius: ['50%', '65%'],
                            center: ['60%', '50%'],
                            label: {
                                normal: {
                                    formatter: '{b|{b}：}{c}%',
                                    fontsize:12,
                                    rich: {
                                        a: {
                                            color: '#999',
                                            lineHeight: 22,
                                            align: 'center'
                                        },
                                        hr: {
                                            borderColor: '#aaa',
                                            width: '100%',
                                            borderWidth: 0.5,
                                            height: 0
                                        },
                                        b: {
                                            fontSize: 12,
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
                            data:[
                                {value:6.13, name:'社区矫正人员'},
                                {value:30.98, name:'刑释人员'},
                                {value:29.45, name:'精神病人员'},
                                {value:7.06, name:'吸毒人员'},
                                {value:11.04, name:'重点青少年'},
                                {value:0, name:'危险品从业人员'},
                                {value:1.84, name:'信访人员'},
                                {value:0, name:'艾滋病人员'},
                                {value:13.5, name:'其他人员'},
                                {value:0, name:'社会闲散人员'},
                                {value:0, name:'扬言报复社会人员'}
                            ]
                        }
                    ]
                };

                myChart3.setOption(option3);
            },
            chartsAxix:function() {
                let myChart4 = echarts.init(document.getElementById('chart_axix'));
                let option4 = {
                    grid: {
                        left: '1%',
                        right: '2%',
                        bottom: '1%',
                        top:'5%',
                        containLabel: true
                    },
                    color: ['#3398DB'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },

                    xAxis : [
                        {
                            type : 'category',
                            data : ['龙溪街道', '龙山街道', '龙塔街道', '双凤桥街道', '两路街道', '王家街道', '双龙湖街道','回兴街道', '宝圣湖街道', '悦来街道', '仙桃街道', '石船镇', '洛啧镇', '龙兴镇', '大湾镇', '古路镇', '统景镇', '大盛镇', '木耳镇', '兴隆镇', '茨竹镇', '玉峰山镇' ],
                    axisTick: {
                    alignWithLabel: true
                },
                    axisLabel: {
                          rotate:40
                    }
                 }
            ],

                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                    series : [
                    {
                        name:'特殊人群',
                        type:'bar',
                        barWidth: '100%',
                        data:[0, 29, 0, 0, 52, 3, 10, 0, 4, 0, 1, 0, 0, 0, 0, 175, 52, 0, 0, 0, 0, 0]
                    }
                ]
            };
                myChart4.setOption(option4);
            },
            chartsLtemadd:function() {
                let myChart5 = echarts.init(document.getElementById('chart_ltemadd'));
                let option5 = {
                    grid: {
                        left: '2%',
                        right: '2%',
                        bottom: '1%',
                        top:'12%',
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:['社区矫正人员','刑释人员','精神病人员','吸毒人员','重点青少年','危险品从业人员','信访人员','艾滋病人员','其他人员','社会闲散人员','扬言报复社会人员']
                    },
                    series: [
                        {
                            name:'新增特殊人群类型',
                            type:'pie',
                            radius: ['50%', '65%'],
                            center: ['60%', '50%'],
                            label: {
                                normal: {
                                    formatter: '{b|{b}：}{c}%',
                                    fontsize:12,
                                    rich: {
                                        a: {
                                            color: '#999',
                                            lineHeight: 22,
                                            align: 'center'
                                        },
                                        hr: {
                                            borderColor: '#aaa',
                                            width: '100%',
                                            borderWidth: 0.5,
                                            height: 0
                                        },
                                        b: {
                                            fontSize: 12,
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
                            data:[
                                {value:6.13, name:'社区矫正人员'},
                                {value:30.98, name:'刑释人员'},
                                {value:29.45, name:'精神病人员'},
                                {value:7.06, name:'吸毒人员'},
                                {value:11.04, name:'重点青少年'},
                                {value:0, name:'危险品从业人员'},
                                {value:1.84, name:'信访人员'},
                                {value:0, name:'艾滋病人员'},
                                {value:13.5, name:'其他人员'},
                                {value:0, name:'社会闲散人员'},
                                {value:0, name:'扬言报复社会人员'}
                            ]
                        }
                    ]
                };

                myChart5.setOption(option5);
            },
            chartsAxixadd:function() {
                let myChart6 = echarts.init(document.getElementById('chart_axixadd'));
                let option6 = {
                    grid: {
                        left: '1%',
                        right: '2%',
                        bottom: '1%',
                        top:'5%',
                        containLabel: true
                    },
                    color: ['#3398DB'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },

                    xAxis : [
                        {
                            type : 'category',
                            data : ['龙溪街道', '龙山街道', '龙塔街道', '双凤桥街道', '两路街道', '王家街道', '双龙湖街道','回兴街道', '宝圣湖街道', '悦来街道', '仙桃街道', '石船镇', '洛啧镇', '龙兴镇', '大湾镇', '古路镇', '统景镇', '大盛镇', '木耳镇', '兴隆镇', '茨竹镇', '玉峰山镇' ],
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {
                                rotate:40
                            }
                        }
                    ],

                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'新增特殊人群',
                            type:'bar',
                            barWidth: '100%',
                            data:[0, 29, 0, 0, 52, 3, 10, 0, 4, 0, 1, 0, 0, 0, 0, 175, 52, 0, 0, 0, 0, 0]
                        }
                    ]
                };
                myChart6.setOption(option6);
            },
        }
    }

</script>


<style scoped>
.dz-zz-charts-box{
    margin-top: 15px;
    border: 1px solid #dddddd;
}
.dz-zz-charts-box .dz-zz-title{
    height: 50px;
    border-bottom: 1px solid #dddddd;
    line-height: 48px;
    text-align: center;
    background-color: #eeeeed;
    font-size: 16px;
}
#chart_bar,
#chart_line{
    width: 100%;
    height: 340px;
}

</style>


