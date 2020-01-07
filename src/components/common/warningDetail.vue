<template>
    <div>
        <div class="dz-expert-box">
            <div style="margin-bottom: 10px;font-size: 15px;"><b class="dz-b"></b> 预警信息</div>
            <div class="dz-side-box">
                <el-row>
                    <el-col :span="6" class="dz-small">站点名</el-col>
                    <el-col :span="18" class="dz-big">{{info.deviceName}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="dz-small">预警信息</el-col>
                    <el-col :span="18" class="dz-big">{{info.warningName}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="dz-small">指标最大值</el-col>
                    <el-col :span="18" class="dz-big">{{info.max}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="dz-small">指标最小值</el-col>
                    <el-col :span="18" class="dz-big">{{info.min}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="dz-small">指标实际值</el-col>
                    <el-col :span="18" class="dz-big" style="color: red;">{{info.actualValue}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="dz-small">预警时间</el-col>
                    <el-col :span="18" class="dz-big">{{info.createTime}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="dz-small">预警消息</el-col>
                    <el-col :span="18" class="dz-big">{{info.msg?info.msg:'无'}}</el-col>
                </el-row>
            </div>
            <div style="margin-bottom: 10px;font-size: 15px;margin-top: 15px"><b class="dz-b"></b> 预警走势</div>
            <div id="chart_line" style="height: 300px;"></div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import bus from '../common/bus';
    import echarts from 'echarts';
    import {get, post} from '@/api/fetch.js';
    import url from '@/api/serviceAPI.config.js';
    export default {
        props: ['id'],
        data() {
            return {
                info:null,
                listLoading:false,
            };
        },
        created(){
        },
        computed: {

        },
        mounted(){
            this.getInfo();

        },
        methods: {
            getInfo(){
                get(url.warning.warningOne,{id:this.id}).then((res) => {
                    this.info=res.data;
                    this.$nextTick(function() {
                        this.chartsLine();
                    })
                })
            },
            chartsLine() {
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
        },
    };
</script>
<style scoped>
    .dz-expert-box{
        padding: 20px;
    }
    .dz-side-box{
        font-size: 14px;
    }
    .dz-side-box>div{
        border: 1px solid #dddddd;
        border-bottom: none;
        color: #666666;
        background-color: #f5f5f5;
    }
    .dz-side-box>div:last-child{
        border-bottom:  1px solid #dddddd;
    }
    .dz-small{
        padding: 10px 10px;
        min-height: 40px;
    }
    .dz-big{
        padding: 10px 10px;
        min-height: 40px;
        background-color: #fff;
        border-left: 1px solid #ddd;
        line-height: 1.5;
    }
    .dz-b{
        display: inline-block;
        vertical-align: middle;
        width: 4px;
        height: 14px;
        background-color:#3896db ;
        position: relative;
        top: -1px;
    }

</style>
