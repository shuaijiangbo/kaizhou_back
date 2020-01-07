<template>
    <div>
        <v-head></v-head>
        <div class="dz-zz-left-box">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="辖区分布" name="first">
                    <div class="dz-zz-select-box">
                        <el-select v-model="value" placeholder="请选择" style="width: 100%;">
                            <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="dz-zz-left-main-box">
                        <div style="margin-bottom: 10px">
                            <el-row class="dz-zz-row">
                                <el-col :span="12" class="dz-zz-col-12">人口信息</el-col>
                                <el-col :span="12" class="dz-zz-col-12">
                                    <span>57878</span>
                                    <span style="float: right">
                                    <img src="@/assets/img/gisi1.png" alt="" @click="chartsBar()">&nbsp;
                                     <img src="@/assets/img/gisi2.png" alt="" @click="chartsCircle()">
                                </span>
                                </el-col>
                            </el-row>
                            <el-row class="dz-zz-row" v-for="item in data1" :key="item">
                                <el-col :span="12" class="dz-zz-col-12">{{item.name}}</el-col>
                                <el-col :span="12" class="dz-zz-col-12">
                                    <span>{{item.number}}</span>
                                    <span style="float: right">
                                    <img src="@/assets/img/gisi3.png" alt="">
                                </span>
                                </el-col>
                            </el-row>
                        </div>
                        <div style="margin-bottom: 10px">
                            <el-row class="dz-zz-row">
                                <el-col :span="12" class="dz-zz-col-12">特殊人群</el-col>
                                <el-col :span="12" class="dz-zz-col-12">
                                    <span>53</span>
                                    <span style="float: right">
                                    <img src="@/assets/img/gisi1.png" alt="" @click="chartsBar()">&nbsp;
                                     <img src="@/assets/img/gisi2.png" alt="" @click="chartsCircle()">
                                </span>
                                </el-col>
                            </el-row>
                            <el-row class="dz-zz-row" v-for="item in data2" :key="item">
                                <el-col :span="12" class="dz-zz-col-12">{{item.name}}</el-col>
                                <el-col :span="12" class="dz-zz-col-12">
                                    <span>{{item.number}}</span>
                                    <span style="float: right">
                                    <img src="@/assets/img/gisi3.png" alt="">
                                </span>
                                </el-col>
                            </el-row>
                        </div>
                        <div style="margin-bottom: 10px">
                            <el-row class="dz-zz-row">
                                <el-col :span="12" class="dz-zz-col-12">关怀对象</el-col>
                                <el-col :span="12" class="dz-zz-col-12">
                                    <span>12533</span>
                                    <span style="float: right">
                                    <img src="@/assets/img/gisi1.png" alt="" @click="chartsBar()">&nbsp;
                                     <img src="@/assets/img/gisi2.png" alt="" @click="chartsCircle()">
                                </span>
                                </el-col>
                            </el-row>
                            <el-row class="dz-zz-row" v-for="item in data3" :key="item">
                                <el-col :span="12" class="dz-zz-col-12">{{item.name}}</el-col>
                                <el-col :span="12" class="dz-zz-col-12">
                                    <span>{{item.number}}</span>
                                    <span style="float: right">
                                    <img src="@/assets/img/gisi3.png" alt="">
                                </span>
                                </el-col>
                            </el-row>
                        </div>
                        <div style="margin-bottom: 10px">
                            <el-row class="dz-zz-row">
                                <el-col :span="12" class="dz-zz-col-12">其他关注对象</el-col>
                                <el-col :span="12" class="dz-zz-col-12">
                                    <span>15616</span>
                                    <span style="float: right">
                                    <img src="@/assets/img/gisi1.png" alt="" @click="chartsBar()">&nbsp;
                                     <img src="@/assets/img/gisi2.png" alt="" @click="chartsCircle()">
                                </span>
                                </el-col>
                            </el-row>
                            <el-row class="dz-zz-row" v-for="item in data4" :key="item">
                                <el-col :span="12" class="dz-zz-col-12">{{item.name}}</el-col>
                                <el-col :span="12" class="dz-zz-col-12">
                                    <span>{{item.number}}</span>
                                    <span style="float: right">
                                    <img src="@/assets/img/gisi3.png" alt="">
                                </span>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="详细列表" name="second">
                    <div class="dz-zz-select-box" style="color: #fff;font-size: 12px;">
                        <span>共有46313条搜索记录</span>
                        <i class="el-icon-lx-delete" style="float: right"></i>
                    </div>
                    <div class="dz-zz-left-details-box">
                        <div>
                            <el-row v-for="item in details" :key="item" style="border-bottom: 1px solid #000;padding-bottom: 10px;margin-bottom: 10px">
                                <el-col :span="4"><img src="@/assets/img/default.png" alt=""></el-col>
                                <el-col :span="20">
                                    <div>姓名：<span>{{item.name}}</span></div>
                                    <div>证件号码：<span>{{item.number}}</span></div>
                                    <div>地址：<span>{{item.address}}</span></div>
                                    <div>人员类别：<span>{{item.type}}</span></div>
                                    <div>人员属性：<span>{{item.attribute}}</span></div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="dz-zz-left-pagination">
                        <el-pagination
                              small
                              layout="prev, pager, next"
                              :total="10">
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="dz-zz-right-box">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="dz-breadcrumb">
                <el-breadcrumb-item :to="{ path: '/' }">X扩展应用</el-breadcrumb-item>
                <el-breadcrumb-item>GIS数字网格</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="dz-zz-map"></div>
        </div>
        <!--柱状图-->
        <el-dialog
              title="人口信息柱状图显示"
              :visible.sync="dialogVisible"
              width="50%">
            <div style="width: 850px;height: 400px;margin:0 auto" id="barChart"></div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
        <!--饼图-->
        <el-dialog
              title="人口信息饼状图显示"
              :visible.sync="dialogVisible2"
              width="50%">
            <div style="width: 850px;height: 400px;margin:0 auto" id="circleChart"></div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import vHead from '../common/Header.vue';
    import echarts from 'echarts'
    export default {
        name: 'index',
        data() {
            return {
                show:1,
                activeName: 'first',
                value:'选项1',
                options: [
                    {
                    value: '选项1',
                    label: '人口信息'
                }, {
                    value: '选项2',
                    label: '单位场所'
                }, {
                    value: '选项3',
                    label: '事件处理'
                }, {
                    value: '选项4',
                    label: '房屋信息'
                }, {
                    value: '选项5',
                    label: '城市部件'
                }],
                data1:[
                    {
                    id:'1',
                    name:'户籍人口',
                    number:'46313'
                },{
                    id:'2',
                    name:'流动人口',
                    number:'11562'
                },{
                    id:'3',
                    name:'未落户人口',
                    number:'0'
                },{
                    id:'4',
                    name:'境外人员',
                    number:'3'
                }],
                data2:[
                    {
                    id:'1',
                    name:'吸毒人员',
                    number:'15'
                },{
                    id:'2',
                    name:'社区矫正人员',
                    number:'30'
                },{
                    id:'3',
                    name:'精神病人员',
                    number:'0'
                },{
                    id:'4',
                    name:'刑满解救人员',
                    number:'4'
                },{
                    id:'5',
                    name:'重点青少年',
                    number:'0'
                },{
                    id:'6',
                    name:'其他人员',
                    number:'4'
                }],
                data3:[
                    {
                    id:'1',
                    name:'老年人',
                    number:'12499'
                },{
                    id:'2',
                    name:'残疾人',
                    number:'30'
                },{
                    id:'3',
                    name:'优抚对象',
                    number:'0'
                },{
                    id:'4',
                    name:'需解助人员',
                    number:'4'
                }],
                data4:[
                    {
                    id:'1',
                    name:'育龄妇女',
                    number:'15616'
                }],
                details:[
                    {
                    id:'1',
                    name:'宋泽浩',
                    number:'5002222196009186789',
                    address:'四川省遂宁市船山区涪江花园',
                    type:'户籍人口',
                    attribute:'老年人'
                },{
                    id:'1',
                    name:'宋泽浩',
                    number:'5002222196009186789',
                    address:'四川省遂宁市船山区涪江花园',
                    type:'户籍人口',
                    attribute:'老年人'
                },{
                    id:'1',
                    name:'宋泽浩',
                    number:'5002222196009186789',
                    address:'四川省遂宁市船山区涪江花园',
                    type:'户籍人口',
                    attribute:'老年人'
                },{
                    id:'1',
                    name:'宋泽浩',
                    number:'5002222196009186789',
                    address:'四川省遂宁市船山区涪江花园',
                    type:'户籍人口',
                    attribute:'老年人'
                },{
                    id:'1',
                    name:'宋泽浩',
                    number:'5002222196009186789',
                    address:'四川省遂宁市船山区涪江花园',
                    type:'户籍人口',
                    attribute:'老年人'
                },{
                    id:'1',
                    name:'宋泽浩',
                    number:'5002222196009186789',
                    address:'四川省遂宁市船山区涪江花园',
                    type:'户籍人口',
                    attribute:'老年人'
                }],
                dialogVisible:false,
                dialogVisible2:false,
            }
        },
        components:{
            vHead
        },
        computed: {
        },
        created(){
        },
        activated(){
        },
        deactivated(){
        },
        mounted:function(){

        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            chartsBar:function() {
               this.dialogVisible=true;
                setTimeout(function(){
                    let myChart = echarts.init(document.getElementById('barChart'));
                    let option = {
                        grid: {
                            left: '1%',
                            right: '2%',
                            bottom: '1%',
                            top:'12%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'category',
                            data: ['户籍人口', '流动人口', '未落户人口', '境外人口']
                        },
                        legend: {
                            data: ['人口信息']
                        },
                        yAxis: {
                            type: 'value',
                            axisLabel:{
                                formatter:'{value}k'
                            }
                        },
                        series: [{
                            name:'人口信息',
                            data: [340, 100, 0, 40],
                            type: 'bar',
                            barWidth:20,
                        }]
                    };
                    myChart.setOption(option);
                },500);

            },
            chartsCircle:function() {
                this.dialogVisible2=true;
                setTimeout(function(){
                    let myChart = echarts.init(document.getElementById('circleChart'));
                    let option = {
                        title : {
                            text: '类型分布图',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        series : [
                            {
                                name: '访问来源',
                                type: 'pie',
                                radius : '65%',
                                center: ['50%', '60%'],
                                label:{
                                    normal:{
                                        formatter:'{b}：{d}%'
                                    }
                                },
                                data:[
                                    {value:350, name:'户籍人口'},
                                    {value:100, name:'流动人口'},
                                    {value:0, name:'未落户人口'},
                                    {value:40, name:'境外人口'}
                                ],
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    };
                    myChart.setOption(option);
                },500);

            },
        },
    }
</script>

<style scoped>
    .dz-zz-left-box{
        width: 250px;
        position: fixed;
        bottom: 0;
        left: 0px;
        top: 86px;
        background: #121f3f url(../../assets/img/leftbg.png) no-repeat left bottom;
        background-size: 100% 60%;
    }
    .dz-zz-right-box{
        position: fixed;
        top: 86px;
        right: 0;
        left: 250px;
        bottom: 0;
        background-color: #eeeeed;
    }
    .dz-zz-right-box .dz-breadcrumb{
        padding: 10px;
    }
    .dz-zz-map{
        position: fixed;
        left: 260px;
        right: 10px;
        bottom: 10px;
        top:120px ;
        background-color: #fff;
    }
    .dz-zz-select-box{
        padding: 10px;
        background-color: #19375b;
    }
    .dz-zz-left-main-box{
        padding: 10px;
        color: #fff;
        font-size: 12px;
        line-height: 28px;
    }
    .dz-zz-left-main-box .dz-zz-row{
        border-right: 1px solid #000;
        border-bottom: 1px solid #000;
    }
    .dz-zz-left-main-box .dz-zz-col-12{
        background-color:#355a86;
        padding-left: 10px;
        padding-right: 10px;
        border-top: 1px solid #000;
        border-left: 1px solid #000;
    }
    .dz-zz-left-main-box .dz-zz-row:first-child .dz-zz-col-12{
        background-color: #1f2e55;
    }
    .dz-zz-left-main-box .dz-zz-col-12 img{
        position: relative;
        top: -1px;
    }
    .dz-zz-left-details-box{
        position: fixed;
        color: #fff;
        top: 160px;
        left: 10px;
        bottom: 40px;
        width: 260px;
        overflow-y: auto;
        padding: 10px;
        font-size: 12px;
        padding-right: 20px;
        line-height: 20px;
    }
    .dz-zz-left-details-box>div{
        width: 100%;
        overflow-y: auto;
    }
    .dz-zz-left-pagination{
        position: fixed;
        bottom: 10px;
        width: 230px;
        left: 10px;
        text-align: center;
    }
</style>
