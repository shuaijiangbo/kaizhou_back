<template>
    <div>
        <div class="dz-expert-box">
            <div style="margin-bottom: 10px;font-size: 15px;">
                <b class="dz-b"></b> 基本信息
                <el-tag
                  key="已延期"
                  type="danger"
                  effect="dark" v-if="userInfo.task.taskState==3">已延期</el-tag>
            </div>
            <div class="dz-side-box">
                <el-row>
                    <el-col :span="6" class="dz-small">任务名称</el-col>
                    <el-col :span="18" class="dz-big">{{userInfo.task.taskName?userInfo.task.taskName:'无'}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="dz-small">任务类型</el-col>
                    <el-col :span="18" class="dz-big">{{userInfo.taskTypeName?userInfo.taskTypeName:'无'}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="dz-small">任务开始时间</el-col>
                    <el-col :span="18" class="dz-big">{{userInfo.task.startTime?userInfo.task.startTime:'无'}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="dz-small">任务结束时间</el-col>
                    <el-col :span="18" class="dz-big">{{userInfo.task.endTime?userInfo.task.endTime:'无'}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="dz-small">成员人数</el-col>
                    <el-col :span="18" class="dz-big">{{userInfo.totalNum?userInfo.totalNum:'无'}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="dz-small">未完成人数</el-col>
                    <el-col :span="18" class="dz-big">{{userInfo.noCompleted?userInfo.noCompleted:'无'}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="dz-small">所属村组</el-col>
                    <el-col :span="18" class="dz-big">{{userInfo.area?userInfo.area.village.name:'无'}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="dz-small">完成进度</el-col>
                    <el-col :span="18" class="dz-big">
                        <el-progress :stroke-width="18" :percentage="Number(userInfo.completed)/Number(userInfo.totalNum)*100"></el-progress>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="dz-small">发布状态</el-col>
                    <el-col :span="18" class="dz-big">{{userInfo.task.taskState==2?'已发布':'未发布'}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="dz-small">任务描述</el-col>
                    <el-col :span="18" class="dz-big">{{userInfo.task.describes?userInfo.task.describes:'无'}}</el-col>
                </el-row>
            </div>
            <div style="margin-bottom: 10px;font-size: 15px;margin-top: 15px;"><b class="dz-b"></b> 成员信息</div>
            <el-table
                  ref="multipleTable2"
                  :data="taskList"
                  tooltip-effect="dark"
                  style="width: 100%;"
                  border
                  v-loading="listLoading">
                <el-table-column
                      type="index"
                      width="40">
                </el-table-column>
                <el-table-column
                      prop="userName"
                      label="成员名称">
                </el-table-column>
                <el-table-column
                      prop="tel"
                      label="联系电话">
                </el-table-column>
                <el-table-column
                      label="任务照片">
                    <template slot-scope="scope">
                        <img :src="'/api/task/getTaskImage?taskPersonId='+scope.row.taskPerson.id" alt="" style="width: 150px;height: auto;">
                    </template>
                </el-table-column>
                <el-table-column
                      label="完成情况">
                    <template slot-scope="scope">
                        {{scope.row.taskPerson.taskState==2?'已完成':'未完成'}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import bus from '../common/bus';
    import {get, post} from '@/api/fetch.js';
    import url from '@/api/serviceAPI.config.js';
    export default {
        props: ['id'],
        data() {
            return {
                userInfo:null,
                listLoading:false,
                taskList:[]
            };
        },
        created(){
        },
        computed: {

        },
        mounted(){
            this.getInfo()
        },
        methods: {
            getInfo(){
                this.listLoading=true;
                get(url.task.taskFind,{taskId:this.id} ).then((res) => {
                    this.userInfo=res.data;
                    this.taskList = res.data.taskPersons;  //有现获取列表信息
                    this.listLoading=false
                })
            }
        },
    };
</script>
<style scoped>
    .dz-expert-box{
        padding: 10px 20px;
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
