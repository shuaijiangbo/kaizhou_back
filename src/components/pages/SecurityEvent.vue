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

            </div>
            <div class="dz-zz-charts-box">
                <div class="dz-zz-title">社会治理总况</div>
                <el-row style="padding: 15px 20px">
                    <el-col :span="24"  >
                        <template>
                            <el-table
                                  :data="tableData3"
                                  style="width: 100%"
                                  border>
                                <el-table-column
                                      prop="date"
                                      label="时间"
                                      width="180">
                                </el-table-column>
                                <el-table-column
                                      prop="name"
                                      label="事件总数"
                                      width="180">
                                </el-table-column>
                                <el-table-column
                                      prop="name1"
                                      label="办理总数"
                                      width="180">
                                </el-table-column>
                                <el-table-column
                                      prop="address"
                                      label="办理率">
                                </el-table-column>
                                <el-table-column
                                      prop="address1"
                                      label="办结总数">
                                </el-table-column>
                                <el-table-column
                                      prop="address2"
                                      label="办结率">
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-col>
                </el-row>
                <el-row style="padding: 15px 20px">
                    <el-col :span="12">
                        <div><span style="border:2px solid #185198;margin-right: 6px;"></span>截止到2019年9月各类型事件排行前10</div>
                        <div  style="height: 430px;margin:20px 10px 0 0;overflow: auto;font-size:12px">
                            <div class="eventPresentation" id="eventPresentation">
                                <div class="tit cf">
                                    <div class="left"><strong>事件类型</strong></div>
                                    <div class="right"><strong>事件数量</strong></div>
                                </div>
                                <div class="all cf">
                                    <div class="left">
                                        <p>全部事件数量</p>
                                        <p>排名前10的事件数量</p>
                                        <p>其它类型汇总的事件数量</p>
                                    </div>
                                    <div class="right">
                                        <p id="total">75</p>
                                        <p id="tenDataSum">75，占比100%</p>
                                        <p id="otherDataSum">0，占比0%</p>
                                    </div>
                                </div>
                                <div class="bar cf">
                                    <ul id="issueBar"><li><div class="left"><a href="javascript:;" type="7">参与治安防控</a></div><div class="right"><a href="javascript:;" type="7" style="width: 28%; background-color: rgb(255, 127, 80);">&nbsp;</a><span>21</span></div></li><li><div class="left"><a href="javascript:;" type="3">民生服务</a></div><div class="right"><a href="javascript:;" type="3" style="width: 22.67%; background-color: rgb(135, 206, 250);">&nbsp;</a><span>17</span></div></li><li><div class="left"><a href="javascript:;" type="6">矛盾劝解</a></div><div class="right"><a href="javascript:;" type="6" style="width: 13.33%; background-color: rgb(218, 112, 214);">&nbsp;</a><span>10</span></div></li><li><div class="left"><a href="javascript:;" type="10">政策法规宣传</a></div><div class="right"><a href="javascript:;" type="10" style="width: 12%; background-color: rgb(50, 205, 50);">&nbsp;</a><span>9</span></div></li><li><div class="left"><a href="javascript:;" type="9">社情民意收集</a></div><div class="right"><a href="javascript:;" type="9" style="width: 10.67%; background-color: rgb(100, 149, 237);">&nbsp;</a><span>8</span></div></li><li><div class="left"><a href="javascript:;" type="11">突发事件报告</a></div><div class="right"><a href="javascript:;" type="11" style="width: 4%; background-color: rgb(255, 105, 180);">&nbsp;</a><span>3</span></div></li><li><div class="left"><a href="javascript:;" type="8">参与特殊人群服务管理</a></div><div class="right"><a href="javascript:;" type="8" style="width: 4%; background-color: rgb(186, 85, 211);">&nbsp;</a><span>3</span></div></li><li><div class="left"><a href="javascript:;" type="54">信访问题处理</a></div><div class="right"><a href="javascript:;" type="54" style="width: 2.67%; background-color: rgb(205, 92, 92);">&nbsp;</a><span>2</span></div></li><li><div class="left"><a href="javascript:;" type="12">其它</a></div><div class="right"><a href="javascript:;" type="12" style="width: 1.33%; background-color: rgb(255, 165, 0);">&nbsp;</a><span>1</span></div></li><li><div class="left"><a href="javascript:;" type="141">重大风险防范</a></div><div class="right"><a href="javascript:;" type="141" style="width: 1.33%; background-color: rgb(64, 224, 208);">&nbsp;</a><span>1</span></div></li></ul>
                                </div>
                                <div class="showAll">
                                    <span class="btn_showAll" id="showAllType" @click="dialogTableVisible = true">展开全部类型列表</span>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div><span style="border:2px solid #185198;margin-right: 6px;"></span>截止到2019年9月各类型事件占比</div>
                        <div id="chart_ltem" style="height: 430px;margin:20px 10px 0 0;padding:20px;border:1px solid #ddd;"> </div>
                    </el-col>
                </el-row>
            </div>

            <div class="dz-zz-charts-box">
                <div class="dz-zz-title">近30天事件发展趋势</div>
                <el-row style="padding: 15px 20px">
                    <el-col :span="24">
                        <div id="chart_line"></div>
                    </el-col>

                </el-row>
                <div style="margin:20px 0 0 20px ">
                    <span class="demonstration">统计时间：</span>
                    <el-select v-model="value4" placeholder="请选择" style="width:150px">
                        <el-option
                              v-for="item in tableData"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                        </el-option>
                    </el-select>
                    <span>
                        <el-date-picker style="margin:0 10px; width:150px;"
                                            v-model="value"
                                            align="right"
                                            type="year"
                                            placeholder="选择年">
                        </el-date-picker>
                        <span class="demonstration">年</span>
                    </span>
                    <span v-if="value4==2">
                        <el-select v-model="value2" placeholder="请选择" style="margin-left: 10px;width:150px">
                            <el-option
                                  v-for="item in options2"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                            </el-option>
                        </el-select>
                    </span>
                    <span v-if="value4==3">
                        <el-select v-model="value5" placeholder="请选择" style="margin-left: 10px;width:150px;margin-right:10px">
                            <el-option
                                  v-for="item in options3"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                            </el-option>
                        </el-select>
                        <span class="demonstration">月</span>
                    </span>
                    <el-button type="primary" style="margin-left: 15px; ">查询</el-button>
                    <span class="demonstration" style="margin-left:10px;">自定义时间</span>
                    <el-date-picker style="margin:0 10px;"
                                    v-model="value3"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                    </el-date-picker>
                    <el-select v-model="value6" placeholder="请选择" style="width:150px;margin-right:10px">
                        <el-option
                              v-for="item in options4"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                        </el-option>
                    </el-select>
                    <el-row style="padding: 15px 0">
                        <el-col :span="24">
                            <div><span style="border:2px solid #185198;margin-right: 6px;"></span>事件处理统计</div>
                            <div id="chart_statistics" v-show="value6==1" style="height: 440px;margin:10px 10px 0 0;padding:20px;border:1px solid #ddd; "> </div>
                            <el-row style="margin:10px 15px 0 0 " v-show="value6==2">
                                <template  >
                                    <el-table
                                          :data="tableData5"
                                          style="width: 100%">
                                        <el-table-column label="部门">
                                            <el-table-column
                                                  prop="name"
                                                  label="部门类型"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                  prop="name"
                                                  label="部门层级"
                                            >
                                            </el-table-column>
                                        </el-table-column>
                                        <el-table-column label="办理情况">
                                            <el-table-column
                                                  prop="province"
                                                  label="新增事件"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                  prop="city"
                                                  label="上报事件"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                  prop="address"
                                                  label="上级交办事件"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                  prop="zip"
                                                  label="在办事件"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                  prop="zip"
                                                  label="办结事件"
                                            >
                                            </el-table-column>
                                        </el-table-column>
                                        <el-table-column label="超期情况">
                                            <el-table-column
                                                  prop="name"
                                                  label="超期在办"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                  prop="name"
                                                  label="超期办结"
                                            >
                                            </el-table-column>
                                        </el-table-column>
                                    </el-table>
                                </template>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <el-dialog title="展开全部类型列表" :visible.sync="dialogTableVisible">
            <el-table :data="tableData2" border stripe>
                <el-table-column type="index"> </el-table-column>
                <el-table-column property="type" label="类型" width="500"></el-table-column>
                <el-table-column property="number" label="数量"></el-table-column>
                <el-table-column property="proportion" label="比例"></el-table-column>
            </el-table>
        </el-dialog>
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
                options2:[
                    {
                        value: '1',
                        label: '第一季度'
                    }, {
                        value: '2',
                        label: '第二季度'
                    }, {
                        value: '3',
                        label: '第三季度'
                    }, {
                        value: '4',
                        label: '第四季度'
                    }
                ],
                options3:[
                    {
                        value: '1',
                        label: '一月'
                    },{
                        value: '2',
                        label: '二月'
                    },{
                        value: '3',
                        label: '三月'
                    },{
                        value: '4',
                        label: '四月'
                    },{
                        value: '5',
                        label: '五月'
                    },{
                        value: '6',
                        label: '六月'
                    },{
                        value: '7',
                        label: '七月'
                    },{
                        value: '8',
                        label: '八月'
                    },{
                        value: '9',
                        label: '九月'
                    },{
                        value: '10',
                        label: '十月'
                    },{
                        value: '11',
                        label: '十一月'
                    },{
                        value: '12',
                        label: '十二月'
                    },
                ],
                options4:[
                    {
                        value: '1',
                        label: '柱状图'
                    }, {
                        value: '2',
                        label: '列表信息'
                    }
                ],
                tableData: [
                    {
                    value: '1',
                    label: '按年度'
                }, {
                    value: '2',
                    label: '按季度'
                }, {
                    value: '3',
                    label: '按月份'
                }],
                tableData2:[
                    {
                    type: '参与治安防控',
                    number: '27',
                    proportion: '32.93%'
                }, {
                    type: '民生服务',
                    number: '17',
                    proportion: '20.73%'
                },{
                    type: '矛盾劝解',
                    number: '10',
                    proportion: '12.2%'
                },{
                    type: '政策法规宣传',
                    number: '9',
                    proportion: '10.98%'
                },{
                    type: '社情民意收集',
                    number: '9',
                    proportion: '10.98%'
                },{
                    type: '参与特殊人群服务管理',
                    number: '3',
                    proportion: '3.66%'
                },{
                    type: '其它',
                    number: '2',
                    proportion: '2.44%'
                },{
                        type: '突发事件报告',
                        number: '2',
                        proportion: '2.44%'
                },{
                        type: '信访问题处理',
                        number: '2',
                        proportion: '2.44%'
                },{
                    type: '重大风险防范',
                    number: '1',
                    proportion: '1.22%'
                }],
                tableData3: [{
                    date: '截止到9月份',
                    name: '75',
                    name1: '45',
                    address: '60.0%',
                    address1: '14',
                    address2: '18.67%'
                },],
                tableData4: [
                    {
                    type: '全部事件数量',
                    number: '75'
                },{
                    type: '排名前10的事件数量',
                    number: '75，占比100%'
                },{
                    type: '其它类型汇总的事件数量',
                    number: '0，占比0%'
                },{
                    type: '参与治安防控',
                    number: '21'
                },{
                    type: '民生服务',
                    number: '17'
                },{
                    type: '矛盾劝解',
                    number: '10'
                },{
                    type: '政策法规宣传',
                    number: '9'
                },{
                    type: '社情民意收集',
                    number: '8'
                },{
                    type: '突发事件报告',
                    number: '3'
                },{
                    type: '参与特殊人群服务管理',
                    number: '3'
                },{
                    type: '信访问题处理',
                    number: '2'
                },{
                    type: '其它',
                    number: '1'
                },{
                    type: '重大风险防范',
                    number: '1'
                }, ],
                tableData5: [
                    {
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
                },],
                dialogTableVisible:false,
                value:'2017',
                value2:'1',
                value3:'',
                value4:'1',
                value5:'1',
                value6:'1'
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
            // this.chartsBar();
            this.chartsLine();
            this.chartsLtem();
            this.chartsStatistics();
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
                        dimensions: ['product', '本月新增', '本年新增', '人员总数'],
                        source: [
                            {product: '回兴街道', '本月新增': 0, '本年新增':0, '人员总数': 4},
                            {product: '龙溪街道', '本月新增': 0, '本年新增': 0, '人员总数': 5},
                            {product: '龙山街道', '本月新增': 1, '本年新增': 2, '人员总数': 3},
                            {product: '龙塔街道', '本月新增':0, '本年新增': 1, '人员总数': 3},
                            {product: '悦来街道', '本月新增': 0, '本年新增': 3, '人员总数': 3},
                            {product: '两路街道', '本月新增': 0, '本年新增': 0, '人员总数': 0},
                            {product: '双凤桥街道', '本月新增': 0, '本年新增': 0, '人员总数': 3},
                            {product: '王家街道', '本月新增': 1, '本年新增': 1, '人员总数': 3},
                            {product: '玉峰山镇', '本月新增': 1, '本年新增': 2, '人员总数': 5},
                            {product: '龙兴镇', '本月新增': 0, '本年新增': 0, '人员总数': 3},
                            {product: '统景镇', '本月新增': 1, '本年新增': 1, '人员总数': 6},
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
                        {
                            type: 'bar',
                            itemStyle:{
                                color:'#1ed7d7'
                            }
                        }
                    ]
                };
                myChart.setOption(option);
            },
            chartsLine:function() {
                let myChart2 = echarts.init(document.getElementById('chart_line'));
                let option2 = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['新增数','办理数','办结数'],
                        left:10
                    },
                    grid: {
                        left: '1%',
                        right: '2%',
                        bottom: '1%',
                        top:'12%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['2019-01','2019-02','2019-03','2019-04','2019-05','2019-06','2019-07','2019-08','2019-09']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name:'新增数',
                            type:'line',
                            smooth:true,
                            data:[1, 1, 0, 0, 0, 0, 1,0,0],
                            itemStyle:{
                                color:'#ff895e'
                            }
                        },
                        {
                            name:'办理数',
                            type:'line',
                            smooth:true,
                            data:[2, 1, 0, 0, 3, 1, 2,0,0],
                            itemStyle:{
                                color:'#9ad5fb'
                            }
                        },
                        {
                            name:'办结数',
                            type:'line',
                            smooth:true,
                            data:[0, 0, 0, 0, 4, 1, 0,1,2],
                            itemStyle:{
                                color:'#e089dd'
                            }
                        }
                    ]
                };
                myChart2.setOption(option2);
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
                        data:['参与治安防控','民生服务','矛盾劝解','政策法规宣传','社情民意收集','突发事件报告','参与特殊人群服务管理','信访问题处理','其它','重大风险防范']
                    },
                    series: [
                        {
                            name:'各类型事件',
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
                                {value:6.13, name:'参与治安防控'},
                                {value:30.98, name:'民生服务'},
                                {value:29.45, name:'矛盾劝解'},
                                {value:7.06, name:'政策法规宣传'},
                                {value:11.04, name:'社情民意收集'},
                                {value:0, name:'突发事件报告'},
                                {value:1.84, name:'参与特殊人群服务管理'},
                                {value:0, name:'信访问题处理'},
                                {value:13.5, name:'其它'},
                                {value:0, name:'重大风险防范'}
                            ]
                        }
                    ]
                };
                myChart3.setOption(option3);
            },
            chartsStatistics:function() {
                let myChart4 = echarts.init(document.getElementById('chart_statistics'));
                let option4 = {
                    grid: {
                        left: '1%',
                        right: '2%',
                        bottom: '1%',
                        top:'12%',
                        containLabel: true
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data:['矛盾劝解','突发事件报告','民生服务','参与特殊人群服务管理','参与治安防控','重大风险防范','信访问题处理','政策法规宣传','社情民意宣传','其他']
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['鸳鸯街道','人和街道','天宫殿街道','翠云街道','大竹林街道','礼嘉街道','金山街道','康美街道','鱼嘴','复盛','郭家沱','龙兴街道']
                        },


                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'矛盾劝解',
                            type:'bar',
                            stack: '广告',
                            barWidth:25,
                            data:[0, 0, 2, 0, 4, 0, 0,0,0,0,1,0,0]
                        }, {
                            name:'突发事件报告',
                            type:'bar',
                            stack: '广告',
                            data:[1, 0, 0, 0, 0, 0, 0,0,0,0,0,1,0]
                        }, {
                            name:'民生服务',
                            type:'bar',
                            stack: '广告',
                            data:[0, 0, 0, 5, 0, 0, 0,7,0,0,0,0,0]
                        },{
                            name:'参与特殊人群服务管理',
                            type:'bar',
                            stack: '广告',
                            data:[0, 2, 0, 0, 0, 0, 0,0,0,0,3,0,0]
                        },{
                            name:'参与治安防控',
                            type:'bar',
                            stack: '广告',
                            data:[0, 2, 0, 5, 0, 0, 0,0,0,0,0,0,0]
                        },{
                            name:'重大风险防范',
                            type:'bar',
                            stack: '广告',
                            data:[0, 0, 0, 0, 0, 0, 0,0,0,0,3,0,0]
                        },{
                            name:'信访问题处理',
                            type:'bar',
                            stack: '广告',
                            data:[0, 0, 0, 0, 0, 0, 2,0,0,0,0,0,0]
                        },{
                            name:'政策法规宣传',
                            type:'bar',
                            stack: '广告',
                            data:[0, 0, 0, 1, 0, 0, 0,0,0,3,0,0,0]
                        },{
                            name:'社情民意宣传',
                            type:'bar',
                            stack: '广告',
                            data:[0, 2, 0, 0, 0, 0, 0,0,1,0,0,0,0]
                        },{
                            name:'其他',
                            type:'bar',
                            stack: '广告',
                            data:[0, 0, 0, 0, 0, 0, 0,0,0,1,0,0,0]
                        }

                    ]


                };
                myChart4.setOption(option4);
            }
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
    .eventPresentation{
        border: 1px solid #dfe6ee;
        line-height: 24px;
    }
    .eventPresentation .left{
        width: 40%;
        float: left;
        border-right: 1px solid #dfe6ee;
        border-bottom: 1px solid #dfe6ee;
        text-align: right;
        margin-right: -1px;
        padding: 5px;
    }
    .eventPresentation .right{
        overflow: hidden;
        zoom:1;
        text-align: left;
        float: inherit;
        border-bottom: 1px solid #dfe6ee;
        border-left: 1px solid #dfe6ee;
        padding: 5px;
    }
    .eventPresentation .tit{
        background-color: #f9fbfc;
    }
    .eventPresentation .all{
    }
    .eventPresentation .all a{
        color: #1d8de4;
        text-decoration: underline;
    }
    .eventPresentation .bar{
        overflow-y: auto;
        border-bottom: 1px solid #dfe6ee;
    }
    .eventPresentation .bar li{
        overflow: hidden;}
    .eventPresentation .bar .left{
        padding: 0 5px;
        border-bottom:0 none;
    }
    .eventPresentation .bar .left a{
        color: #333;
        border-bottom: 1px solid #333;
    }
    .eventPresentation .bar .right{
        padding: 0 5px;
        border-bottom:0 none;
    }
    .eventPresentation .bar .right a{
        width: 95%;
        display: inline-block;
        margin-right: 10px;
        background-color: #87cefa;
        color: #333;
        text-align: center;
        line-height: 14px;
        height: 14px;
        margin-top: 4px;
    }
    .eventPresentation .bar .right a:hover{
        background-color: #1c9bea;
    }
    .eventPresentation .bar .right span{}
    .eventPresentation .tips{
        margin-top: -1px;
        position: relative;
        color: #999;
        background-color: #f9fbfc;
        padding: 5px;
    }
    .eventPresentation .showAll{
        background-color: #fff;
        height: 50px;
    }
    .eventPresentation .btn_showAll{
        position: relative;
        display: block;
        margin: 18px auto 0;
        width: 120px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #1ca3e3;
        color: #fff;
        cursor: pointer;
    }
    .eventPresentation .btn_showAll:hover{ top: 1px; }
    .eventPresentation .btn_showAll:active{ top: 2px; }
    .pieChartsShow{
        overflow: hidden;
        zoom:1;
    }
</style>
