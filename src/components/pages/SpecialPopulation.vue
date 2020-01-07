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
                <el-input v-model="input" placeholder="请输入组织机构名称" style="width: 215px;margin-left:15px;"></el-input>
                <el-button type="primary" style="margin-left: 15px;">搜索</el-button>
                <el-button type="primary" style="margin-left: 15px;" @click="dialogFormVisible=true"><i class="el-icon-lx-searchlist"></i> 高级搜索</el-button>
            </div>
            <div class="dz-zz-charts-box">
                <div class="dz-zz-title">刑满释放人员管理概况</div>
                <el-row style="padding: 15px 20px">
                    <el-col :span="16">
                        <div id="chart_bar"></div>
                    </el-col>
                    <el-col :span="8">
                        <el-table
                              :data="tableData6"
                              border
                              height="338"
                              :summary-method="getSummaries"
                              show-summary>
                            <el-table-column
                                  prop="name"
                                  label="地区">
                            </el-table-column>
                            <el-table-column
                                  prop="amount1"
                                  label="本月新增">
                            </el-table-column>
                            <el-table-column
                                  prop="amount2"
                                  label="本年新增">
                            </el-table-column>
                            <el-table-column
                                  prop="amount3"
                                  label="人员总数">
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </div>
            <div class="dz-zz-charts-box">
                <div class="dz-zz-title">刑满释放人员管理各月份图标</div>
                <el-row style="padding: 15px 20px">
                    <el-col :span="16">
                        <div id="chart_line"></div>
                    </el-col>
                    <el-col :span="8">
                        <el-table
                              :data="tableData1"
                              border
                              height="338"
                              :summary-method="getSummaries">
                            <el-table-column
                                  prop="name"
                                  label="月份">
                            </el-table-column>
                            <el-table-column
                                  prop="amount1"
                                  label="本月新增">
                            </el-table-column>
                            <el-table-column
                                  prop="amount2"
                                  label="人员总数">
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!--高级搜索-->
        <el-dialog title="高级查询" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="关注状态" :label-width="formLabelWidth">
                            <el-select v-model="form.option1" placeholder="请选择" style="width: 250px;">
                                <el-option label="全部" value="全部"></el-option>
                                <el-option label="现在关注" value="现在关注"></el-option>
                                <el-option label="曾经关注" value="曾经关注"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="死亡状态" :label-width="formLabelWidth">
                            <el-select v-model="form.option2" placeholder="请选择" style="width: 250px;">
                                <el-option label="全部" value="全部"></el-option>
                                <el-option label="正常" value="正常"></el-option>
                                <el-option label="已死亡" value="已死亡"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="公民身份号码" :label-width="formLabelWidth">
                            <el-input v-model="form.idNumber" autocomplete="off" style="width: 250px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="姓名" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off" style="width: 250px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="刑法执行类别" :label-width="formLabelWidth">
                            <el-select v-model="form.option3" placeholder="请选择" style="width: 250px;">
                                <el-option label="监外执行罪犯" value="监外执行罪犯"></el-option>
                                <el-option label="管制人员" value="管制人员"></el-option>
                                <el-option label="缓刑人员" value="缓刑人员"></el-option>
                                <el-option label="假释人员" value="假释人员"></el-option>
                                <el-option label="剥夺政治权利人员" value="剥夺政治权利人员"></el-option>
                                <el-option label="其他" value="其他"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系手机" :label-width="formLabelWidth">
                            <el-input v-model="form.phone" autocomplete="off" style="width: 250px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="矫正日期" :label-width="formLabelWidth">
                            <div class="block">
                                <el-date-picker
                                      v-model="form.date1"
                                      type="daterange"
                                      range-separator="至"
                                      start-placeholder="开始日期"
                                      end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="性别" :label-width="formLabelWidth">
                            <el-select v-model="form.option4" placeholder="请选择" style="width: 250px;">
                                <el-option label="女性" value="女性"></el-option>
                                <el-option label="男性" value="男性"></el-option>
                                <el-option label="未知的性别" value="未知的性别"></el-option>
                                <el-option label="未说明的性别" value="未说明的性别"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="文化程度" :label-width="formLabelWidth">
                            <el-select v-model="form.option5" placeholder="请选择" style="width: 250px;">
                                <el-option label="博士" value="博士"></el-option>
                                <el-option label="研究生" value="研究生"></el-option>
                                <el-option label="大学本科" value="大学本科"></el-option>
                                <el-option label="大专" value="大专"></el-option>
                                <el-option label="高中/中专" value="高中/中专"></el-option>
                                <el-option label="初中" value="初中"></el-option>
                                <el-option label="小学" value="小学"></el-option>
                                <el-option label="文盲" value="文盲"></el-option>
                                <el-option label="学龄前" value="学龄前"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="有无服务成员" :label-width="formLabelWidth">
                            <el-select v-model="form.option6" placeholder="请选择" style="width: 250px;">
                                <el-option label="全部" value="全部"></el-option>
                                <el-option label="有" value="有"></el-option>
                                <el-option label="无" value="无"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="有无服务记录" :label-width="formLabelWidth">
                            <el-select v-model="form.option7" placeholder="请选择" style="width: 250px;">
                                <el-option label="全部" value="全部"></el-option>
                                <el-option label="有" value="有"></el-option>
                                <el-option label="无" value="无"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="数据更新日期" :label-width="formLabelWidth">
                            <div class="block">
                                <el-date-picker
                                      v-model="form.date2"
                                      type="daterange"
                                      range-separator="至"
                                      start-placeholder="开始日期"
                                      end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="操作账号" :label-width="formLabelWidth">
                            <el-input v-model="form.account" autocomplete="off" style="width: 250px;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div style="cursor: pointer;margin-bottom: 15px;">
                    <b @click="isShowMore=!isShowMore">显示更多条件</b><i class="el-icon-caret-right"></i>
                </div>
                <el-row  v-if="isShowMore">
                    <el-col :span="12">
                        <el-form-item label="出生日期" :label-width="formLabelWidth">
                            <el-date-picker
                                  v-model="form.date3"
                                  align="right"
                                  type="date"
                                  placeholder="选择日期"
                                  :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="户籍详址" :label-width="formLabelWidth">
                            <el-input v-model="form.address" autocomplete="off" style="width: 700px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="常住地址" :label-width="formLabelWidth">
                            <el-input v-model="form.address2" autocomplete="off" style="width: 700px;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: 'specialPopulation',
        data() {
            return {
                options: [
                    {
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
                tableData6: [
                    {
                    id: '12987122',
                    name: '回兴街道',
                    amount1: '0',
                    amount2: '0',
                    amount3: '4'
                }, {
                    id: '12987123',
                    name: '龙溪街道',
                    amount1: '0',
                    amount2: '0',
                    amount3: '5'
                },{
                    id: '12987124',
                    name: '龙山街道',
                    amount1: '1',
                    amount2: '2',
                    amount3: '3'
                }, {
                    id: '12987124',
                    name: '龙塔街道',
                    amount1: '0',
                    amount2: '1',
                    amount3: '3'
                }, {
                    id: '12987125',
                    name: '悦来街道',
                    amount1: '0',
                    amount2: '3',
                    amount3: '3'
                }, {
                    id: '12987126',
                    name: '两路街道',
                    amount1: '0',
                    amount2: '0',
                    amount3: '0'
                }, {
                    id: '12987126',
                    name: '双凤桥街道',
                    amount1: '0',
                    amount2: '0',
                    amount3: '3'
                }, {
                    id: '12987126',
                    name: '王家街道',
                    amount1: '1',
                    amount2: '1',
                    amount3: '3'
                }, {
                    id: '12987126',
                    name: '玉峰山镇',
                    amount1: '1',
                    amount2: '2',
                    amount3: '5'
                }, {
                    id: '12987126',
                    name: '龙兴镇',
                    amount1: '0',
                    amount2: '0',
                    amount3: '3'
                }, {
                    id: '12987126',
                    name: '统景镇',
                    amount1: '1',
                    amount2: '1',
                    amount3: '6'
                }],
                tableData1: [
                    {
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
                dialogFormVisible:false,
                form: {
                    name: '',
                    option1: '',
                    option2:'',
                    option3:'',
                    option4:'',
                    option5:'',
                    option6:'',
                    option7:'',
                    idNumber:'',
                    phone: '',
                    date1: '',
                    date2: '',
                    date3: '',
                    date4: '',
                    account:'',
                    address:''
                },
                formLabelWidth: '120px',
                isShowMore:false,
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                }
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
