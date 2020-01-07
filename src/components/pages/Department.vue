<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>部门管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="background-color: #fff;padding: 10px ;margin-top: 10px;position: absolute;top: 25px;bottom: 20px;right: 10px;left: 10px;">
            <div>
                <span style="font-size: 14px;">区域&nbsp;&nbsp;</span>
                <el-cascader
                      placeholder="区域"
                      :options="options"
                      filterable
                      change-on-select
                ></el-cascader>
                <el-input v-model="input" placeholder="请输入姓名或公民身份号码" style="width: 215px;margin-left:15px;"></el-input>
                <el-button type="primary" style="margin-left: 15px;">搜索</el-button>
                <el-button type="primary" style="margin-left: 15px;"><i class="el-icon-lx-searchlist"></i> 高级搜索</el-button>
                <span class="dz-zz-right-btn-box">
                    <el-button style="margin-left: 15px;" class="btn-green"><i class="iconfont icon-daochu"></i>&nbsp;导出</el-button>
                    <el-button type="primary" style="margin-left: 15px;"><i class="iconfont icon-daoru1"></i>&nbsp;导入</el-button>
                    <el-button style="margin-left: 15px;" class="btn-blue"><i class="el-icon-lx-refresh"></i>&nbsp;刷新</el-button>
                </span>
            </div>
            <div class="dz-zz-btn-box">
                <el-button type="primary"><i class="el-icon-lx-add"></i>&nbsp;新增</el-button>
                <el-button type="primary"><i class="el-icon-lx-settings"></i>&nbsp;设置状态</el-button>
                <el-button type="primary"><i class="iconfont icon-yonghuzhuanhua"></i>&nbsp;转为户籍人口</el-button>
                <el-button type="primary"><i class="iconfont icon-zhuanyi1"></i>&nbsp;转移</el-button>
                <el-button type="danger"><i class="el-icon-lx-delete"></i>&nbsp;批量删除</el-button>
                <span class="dz-zz-right-btn-box">
                    <el-button  type="primary">默认排序</el-button>
                    <el-button >正序</el-button>
                    <el-button>倒序</el-button>
                </span>
            </div>
            <div class="dz-zz-table-box">
                <el-table
                      ref="multipleTable"
                      :data="tableData"
                      tooltip-effect="dark"
                      style="width: 100%;"
                      border
                      :height="tableHeight">
                    <el-table-column
                          type="selection"
                          width="55">
                    </el-table-column>
                    <el-table-column
                          prop="name"
                          label="姓名"
                          width="150">
                    </el-table-column>
                    <el-table-column
                          label="性别"
                          width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.sex==1">女</span>
                            <span v-if="scope.row.sex==2">男</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                          prop="number"
                          label="公民身份号码">
                    </el-table-column>
                    <el-table-column
                          prop="work"
                          label="工作单位或就读学校">
                    </el-table-column>
                    <el-table-column
                          prop="address"
                          label="常住地址">
                    </el-table-column>
                    <el-table-column
                          prop="reason"
                          label="流入原因">
                    </el-table-column>
                    <el-table-column
                          prop="date"
                          label="数据更新时间">
                    </el-table-column>
                    <el-table-column
                          label="操作"
                          show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button
                                  size="mini"
                                  type="primary"
                                  @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-lx-edit"></i>&nbsp;编辑</el-button>
                            <el-button
                                  size="mini"
                                  type="danger"
                                  @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-lx-delete"></i>&nbsp;删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination
                      :current-page="1"
                      :page-sizes="[10, 20, 30, 40]"
                      :page-size="20"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="20">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: 'house',
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
                tableHeight:610,
                tableData: [{
                        id:'1',
                        date: '2016-05-03 14:28:32',
                        name: '王小虎',
                        sex:'1',
                        number:'5002222199007212427',
                        reason:'务工',
                        address: '上海市普陀区金沙江路 1518 弄',
                        work:''
                    }, {
                        id:'2',
                        date: '2016-05-03 14:28:32',
                        name: '王小虎',
                        sex:'1',
                        number:'5002222199007212427',
                        reason:'务工',
                        address: '上海市普陀区金沙江路 1518 弄',
                    work:''
                    }, {
                    id:'2',
                    date: '2016-05-03 14:28:32',
                    name: '王小虎',
                    sex:'1',
                    number:'5002222199007212427',
                    reason:'务工',
                    address: '上海市普陀区金沙江路 1518 弄',
                    work:''
                    }, {
                    id:'2',
                    date: '2016-05-03 14:28:32',
                    name: '王小虎',
                    sex:'1',
                    number:'5002222199007212427',
                    reason:'务工',
                    address: '上海市普陀区金沙江路 1518 弄',
                    work:''
                    }, {
                    id:'2',
                    date: '2016-05-03 14:28:32',
                    name: '王小虎',
                    sex:'1',
                    number:'5002222199007212427',
                    reason:'务工',
                    address: '上海市普陀区金沙江路 1518 弄',
                    work:''
                    }, {
                    id:'2',
                    date: '2016-05-03 14:28:32',
                    name: '王小虎',
                    sex:'1',
                    number:'5002222199007212427',
                    reason:'务工',
                    address: '上海市普陀区金沙江路 1518 弄',
                    work:''
                    }, {
                    id:'2',
                    date: '2016-05-03 14:28:32',
                    name: '王小虎',
                    sex:'1',
                    number:'5002222199007212427',
                    reason:'务工',
                    address: '上海市普陀区金沙江路 1518 弄',
                    work:''
                    }, {
                    id:'2',
                    date: '2016-05-03 14:28:32',
                    name: '王小虎',
                    sex:'1',
                    number:'5002222199007212427',
                    reason:'务工',
                    address: '上海市普陀区金沙江路 1518 弄',
                    work:''
                }, {
                    id:'2',
                    date: '2016-05-03 14:28:32',
                    name: '王小虎',
                    sex:'1',
                    number:'5002222199007212427',
                    reason:'务工',
                    address: '上海市普陀区金沙江路 1518 弄',
                    work:''
                }, {
                    id:'2',
                    date: '2016-05-03 14:28:32',
                    name: '王小虎',
                    sex:'1',
                    number:'5002222199007212427',
                    reason:'务工',
                    address: '上海市普陀区金沙江路 1518 弄',
                    work:''
                }, {
                    id:'2',
                    date: '2016-05-03 14:28:32',
                    name: '王小虎',
                    sex:'1',
                    number:'5002222199007212427',
                    reason:'务工',
                    address: '上海市普陀区金沙江路 1518 弄',
                    work:''
                }, {
                    id:'2',
                    date: '2016-05-03 14:28:32',
                    name: '王小虎',
                    sex:'1',
                    number:'5002222199007212427',
                    reason:'务工',
                    address: '上海市普陀区金沙江路 1518 弄',
                    work:''
                }, {
                    id:'2',
                    date: '2016-05-03 14:28:32',
                    name: '王小虎',
                    sex:'1',
                    number:'5002222199007212427',
                    reason:'务工',
                    address: '上海市普陀区金沙江路 1518 弄',
                    work:''
                }, {
                    id:'2',
                    date: '2016-05-03 14:28:32',
                    name: '王小虎',
                    sex:'1',
                    number:'5002222199007212427',
                    reason:'务工',
                    address: '上海市普陀区金沙江路 1518 弄',
                    work:''
                }, {
                    id:'2',
                    date: '2016-05-03 14:28:32',
                    name: '王小虎',
                    sex:'1',
                    number:'5002222199007212427',
                    reason:'务工',
                    address: '上海市普陀区金沙江路 1518 弄',
                    work:''
                }, {
                    id:'2',
                    date: '2016-05-03 14:28:32',
                    name: '王小虎',
                    sex:'1',
                    number:'5002222199007212427',
                    reason:'务工',
                    address: '上海市普陀区金沙江路 1518 弄',
                    work:''
                }, {
                    id:'2',
                    date: '2016-05-03 14:28:32',
                    name: '王小虎',
                    sex:'1',
                    number:'5002222199007212427',
                    reason:'务工',
                    address: '上海市普陀区金沙江路 1518 弄',
                    work:''
                }, {
                    id:'2',
                    date: '2016-05-03 14:28:32',
                    name: '王小虎',
                    sex:'1',
                    number:'5002222199007212427',
                    reason:'务工',
                    address: '上海市普陀区金沙江路 1518 弄',
                    work:''
                }, {
                    id:'2',
                    date: '2016-05-03 14:28:32',
                    name: '王小虎',
                    sex:'1',
                    number:'5002222199007212427',
                    reason:'务工',
                    address: '上海市普陀区金沙江路 1518 弄',
                    work:''
                }
                ],
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
                        data:['本月新增','人员总数'],
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
                            name:'本月新增',
                            type:'line',
                            smooth:true,
                            data:[1, 1, 0, 0, 0, 0, 1,0,0],
                            itemStyle:{
                                color:'#2db1df'
                            }
                        },
                        {
                            name:'人员总数',
                            type:'line',
                            smooth:true,
                            data:[2, 1, 0, 0, 3, 1, 2,0,0],
                            itemStyle:{
                                color:'#dcb011'
                            }
                        }
                    ]
                };
                myChart2.setOption(option2);
            }
        }
    }

</script>

<style scoped>
    .dz-zz-right-btn-box{
        float: right;
    }
    .dz-zz-right-btn-box .iconfont{
        font-size: 12px;
    }
    .dz-zz-right-btn-box .btn-green{
        background-color: #2eb976;
        border-color: #2eb976;
        color: #fff;
    }
    .dz-zz-right-btn-box .btn-green:hover{
        opacity: .8;
    }
    .dz-zz-right-btn-box .btn-blue{
        background-color: #1c9ba1;
        border-color: #1c9ba1;
        color: #fff;
    }
    .dz-zz-right-btn-box .btn-blue:hover{
        opacity: .8;
    }
    .dz-zz-btn-box{
        margin-top: 10px;
    }
    .dz-zz-btn-box .iconfont{
        font-size: 12px;
    }
    .dz-zz-table-box{
        margin-top: 15px;
    }
    .block{
        text-align: center;
        width: 100%;
        position: absolute;
        bottom: 10px;
    }
</style>
