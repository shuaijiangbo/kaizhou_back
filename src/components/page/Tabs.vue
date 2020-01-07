<template>
    <div class="">
        <div class="container">
            <div class="dz-zz-table-box">
            <el-tabs v-model="message" type="card">
                <el-tab-pane :label="`预警提醒(${earlyWarning})`" name="first">
                    <template v-if="message === 'first'">
                        <div style="margin-bottom: 15px">
                            <span style="font-size: 14px;">状态：</span>
                            <el-select v-model="readState" placeholder="请选择">
                                <el-option key="全部" label="全部" value=""></el-option>
                                <el-option key="已读" label="已读" value="0"></el-option>
                                <el-option key="未读" label="未读" value="1"></el-option>
                            </el-select>
                            <span style="font-size: 14px;">&nbsp;&nbsp;&nbsp;&nbsp;站点：</span>
                            <el-select v-model="deviceName" placeholder="请选择">
                                <el-option key="全部" label="全部" value=""></el-option>
                                <el-option v-for="item in devideList" :key="item.deviceName+item.id" :label="item.deviceName" :value="item.deviceName"></el-option>
                            </el-select>
                            <el-input v-model="warningName" placeholder="请输入关键字" style="width: 215px;margin-left: 15px;"></el-input>
                            <el-button type="primary" style="margin-left: 15px;" @click="geteEarlyWarningList">搜索</el-button>
                            <el-button type="primary" style="margin-left: 15px; float: right" @click="batchMarkedRead('earlyWarning')">批量标记已读</el-button>
                        </div>
                        <el-table
                              ref="multipleTable"
                              :data="earlyWarningList"
                              tooltip-effect="dark"
                              style="width: 100%;"
                              border
                              v-loading="listLoading"
                              :height="tableHeight"
                              @selection-change="selsChange">
                            <el-table-column
                                  type="selection"
                                  width="55"
                                  :selectable="checkSelectable">
                            </el-table-column>
                            <el-table-column
                                  prop="warningName"
                                  label="报警指标"
                                  width="180">
                            </el-table-column>
                            <el-table-column
                                  prop="deviceName"
                                  label="站点"
                                  width="180">
                            </el-table-column>
                            <el-table-column
                                  prop="min"
                                  label="最小指标">
                            </el-table-column>
                            <el-table-column
                                  prop="max"
                                  label="最大指标">
                            </el-table-column>
                            <el-table-column
                                  prop="actualValue"
                                  label="实际指标">
                            </el-table-column>
                            <el-table-column
                                  label="内容"
                                  prop="msg"
                                width="250">
                            </el-table-column>
                            <el-table-column
                                  label="时间"
                                  prop="createTime"
                                  width="150">
                            </el-table-column>
                            <el-table-column
                                  label="发送人"
                                  width="120">
                                <template slot-scope="scope">
                                    <span class="dz-detail-btn" @click="goDetail(scope.row.createUserId)">{{scope.row.createUserName}} <i class="el-icon-caret-right" v-if="scope.row.createUserName"></i></span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                  label="状态"
                                  width="120">
                                <template slot-scope="scope">
                                    <span style="color:green" v-if="scope.row.readState==0">已读</span>
                                    <span style="color: red;" v-else>未读</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                  label="操作"
                                  width="120">
                                <template slot-scope="scope">
                                    <el-button
                                          size="mini"
                                          type="primary"
                                          @click="markedRead(scope.row.id,'earlyWarning')"  v-if="scope.row.readState!=0"><i class="el-icon-lx-edit"></i>&nbsp;标记已读</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="block" style="text-align: center;margin-top: 25px;">
                            <el-pagination
                                  layout="total, sizes, prev, pager, next, jumper"
                                  @size-change="handleSizeChange"
                                  @current-change="handleCurrentChange"
                                  background
                                  :page-sizes="[5,10,20,30,40]"
                                  :page-size="pageSize"
                                  :total="total">
                            </el-pagination>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`专家提醒(${farmerRemind})`" name="second">
                    <template v-if="message === 'second'">
                        <div style="margin-bottom: 15px">
                            <span style="font-size: 14px;">状态：</span>
                            <el-select v-model="readState2" placeholder="请选择">
                                <el-option key="全部" label="全部" value=""></el-option>
                                <el-option key="已读" label="已读" value="0"></el-option>
                                <el-option key="未读" label="未读" value="1"></el-option>
                            </el-select>
                            <el-input v-model="remindTitle" placeholder="请输入关键字" style="width: 215px;margin-left: 15px;"></el-input>
                            <el-button type="primary" style="margin-left: 15px;" @click="getFarmerRemindList">搜索</el-button>
                            <el-button type="primary" style="margin-left: 15px; float: right" @click="batchMarkedRead('farmerRemind')">批量标记已读</el-button>
                        </div>
                        <el-table
                              ref="multipleTable"
                              :data="farmerRemindList"
                              tooltip-effect="dark"
                              style="width: 100%;"
                              border
                              v-loading="listLoading"
                              :height="tableHeight"
                              @selection-change="selsChange2">
                            <el-table-column
                                  type="selection"
                                  width="55"
                                  :selectable="checkSelectable">
                            </el-table-column>
                            <el-table-column
                                  label="提醒标题" width="220">
                                <template slot-scope="scope">
                                    <span class="dz-detail-btn" @click="goDetail2(scope.row.id)">{{scope.row.remindTitle}} <i class="el-icon-caret-right"></i></span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                  label="专家名称"
                                  prop="expertName">
                                <template slot-scope="scope">
                                    <span class="dz-detail-btn" @click="goDetail(scope.row.expertId)">{{scope.row.expertName}} <i class="el-icon-caret-right" v-if="scope.row.expertName"></i></span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                  label="类型"
                                  prop="remindType">
                            </el-table-column>
                            <el-table-column
                                  label="提醒等级"
                                  prop="remindLevel">
                            </el-table-column>
                            <el-table-column
                                  label="适应作物"
                                  prop="adaptCrop">
                            </el-table-column>
                            <el-table-column
                                  label="提醒内容"
                                  width="400">
                                <template slot-scope="scope">
                                    <div class="textOver">{{scope.row.remindContent}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                  label="时间"
                                  prop="dateTime"
                                  width="150">
                            </el-table-column>
                            <el-table-column
                                  label="发送人">
                                <template slot-scope="scope">
                                    <span class="dz-detail-btn" @click="goDetail(scope.row.createUserId)">{{scope.row.createUserName}} <i class="el-icon-caret-right" v-if="scope.row.createUserName"></i></span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                  label="状态"
                                  width="120">
                                <template slot-scope="scope">
                                    <span style="color:green" v-if="scope.row.readState==0">已读</span>
                                    <span style="color: red;" v-else>未读</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                  label="操作"
                                  width="120">
                                <template slot-scope="scope">
                                    <el-button
                                          size="mini"
                                          type="primary"
                                          @click="markedRead(scope.row.id,'farmerRemind')"  v-if="scope.row.readState!=0"><i class="el-icon-lx-edit"></i>&nbsp;标记已读</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="block" style="text-align: center;margin-top: 25px;">
                            <el-pagination
                                  layout="total, sizes, prev, pager, next, jumper"
                                  @size-change="handleSizeChange2"
                                  @current-change="handleCurrentChange2"
                                  background
                                  :page-sizes="[5,10,20,30,40]"
                                  :page-size="pageSize2"
                                  :total="total2">
                            </el-pagination>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`任务提醒(${task})`" name="third">
                    <template v-if="message === 'third'">
                        <div style="margin-bottom: 15px">
                            <span style="font-size: 14px;">状态：</span>
                            <el-select v-model="readState3" placeholder="请选择">
                                <el-option key="全部" label="全部" value=""></el-option>
                                <el-option key="已读" label="已读" value="0"></el-option>
                                <el-option key="未读" label="未读" value="1"></el-option>
                            </el-select>
                            <el-input v-model="taskName" placeholder="请输入关键字" style="width: 215px;margin-left: 15px;"></el-input>
                            <el-button type="primary" style="margin-left: 15px;" @click="getTaskList">搜索</el-button>
                            <el-button type="primary" style="margin-left: 15px; float: right" @click="batchMarkedRead('task')">批量标记已读</el-button>
                        </div>
                        <el-table
                              ref="multipleTable"
                              :data="taskList"
                              tooltip-effect="dark"
                              style="width: 100%;"
                              border
                              v-loading="listLoading"
                              :height="tableHeight"
                              @selection-change="selsChange3">
                            <el-table-column
                                  type="selection"
                                  width="55"
                                  :selectable="checkSelectable">
                            </el-table-column>
                            <el-table-column
                                  label="任务名称"
                                  width="220">
                                <template slot-scope="scope">
                                    <span class="dz-detail-btn" @click="goDetail3(scope.row.id)">{{scope.row.taskName}} <i class="el-icon-caret-right"></i></span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                  prop="typeName"
                                  label="任务类型"
                                  width="120">
                            </el-table-column>
                            <el-table-column
                                  label="任务描述"
                                  prop="describes">
                            </el-table-column>
                            <el-table-column
                                  label="时间"
                                  prop="createTime"
                                  width="150">
                            </el-table-column>
                            <el-table-column
                                  label="发布人"
                                  width="120">
                                <template slot-scope="scope">
                                    <span class="dz-detail-btn" @click="goDetail(scope.row.createUserId)">{{scope.row.createUserName}} <i class="el-icon-caret-right" v-if="scope.row.createUserName"></i></span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                  label="状态"
                                  width="120">
                                <template slot-scope="scope">
                                    <span style="color:green" v-if="scope.row.readState==0">已读</span>
                                    <span style="color: red;" v-else>未读</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                  label="操作"
                                  width="120">
                                <template slot-scope="scope">
                                    <el-button
                                          size="mini"
                                          type="primary"
                                          @click="markedRead(scope.row.id,'task')"  v-if="scope.row.readState!=0"><i class="el-icon-lx-edit"></i>&nbsp;标记已读</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="block" style="text-align: center;margin-top: 25px;">
                            <el-pagination
                                  layout="total, sizes, prev, pager, next, jumper"
                                  @size-change="handleSizeChange3"
                                  @current-change="handleCurrentChange3"
                                  background
                                  :page-sizes="[5,10,20,30,40]"
                                  :page-size="pageSize3"
                                  :total="total3">
                            </el-pagination>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
            </div>
        </div>
        <el-drawer
              title="人员信息"
              :visible.sync="dialog"
              direction="rtl"
              size="35%"
              destroy-on-close>
            <detail :id="detailId"></detail>
        </el-drawer>
        <el-drawer
              title="专家信息详情"
              :visible.sync="dialog2"
              direction="rtl"
              size="35%"
              destroy-on-close>
            <detail2 :id="detailId2"></detail2>
        </el-drawer>
        <el-drawer
              title="任务信息"
              :visible.sync="dialogT"
              direction="rtl"
              destroy-on-close>
            <detail-t :id="detailIdT"></detail-t>
        </el-drawer>
    </div>
</template>

<script>
    import axios from 'axios';
    import {get, post,put,deletes} from '@/api/fetch.js';
    import url from '@/api/serviceAPI.config.js';
    import detail from '@/components/common/personDetail';
    import detail2 from '@/components/common/expertInfoDetail';
    import detailT from '@/components/common/taskDetail'
    export default {
        name: 'tabs',
        data() {
            return {
                tableHeight: document.body.clientHeight-310,
                message: 'first',
                showHeader: false,
                earlyWarning:null,
                farmerRemind:null,
                task:null,
                earlyWarningList:[],
                farmerRemindList:[],
                taskList:[],
                readState:null,
                warningName:null,
                deviceName:null,
                pageNum:0,
                pageSize:10,
                readState2:null,
                remindTitle:null,
                pageNum2:0,
                pageSize2:10,
                readState3:null,
                taskName:null,
                pageNum3:0,
                pageSize3:10,
                listLoading:false,
                total:null,
                total2:null,
                total3:null,
                sels:null,
                sels2:null,
                sels3:null,
                devideList:[],
                dialog:false,
                detailId:null,
                dialog2:false,
                detailId2:null,
                dialogT:false,
                detailIdT:null,
            }
        },
        components: {
            detail,detail2,detailT
        },
        created(){
            this.getNum();
            this.geteEarlyWarningList();
            this.getFarmerRemindList();
            this.getTaskList();
            this.getDevide()
        },
        methods: {
            checkSelectable(row){
                return row.readState != 0;
            },
            handleRead(index) {
                const item = this.unread.splice(index, 1);
                console.log(item);
                this.read = item.concat(this.read);
            },
            //改变分页信息
            handleCurrentChange(val) {
                this.pageNum = val-1;
                this.geteEarlyWarningList();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.geteEarlyWarningList();
            },
            handleCurrentChange2(val) {
                this.pageNum2 = val-1;
                this.getFarmerRemindList();
            },
            handleSizeChange2(val) {
                this.pageSize2 = val;
                this.getFarmerRemindList();
            },
            handleCurrentChange3(val) {
                this.pageNum3 = val-1;
                this.getTaskList();
            },
            handleSizeChange3(val) {
                this.pageSize3 = val;
                this.getTaskList();
            },
            selsChange: function(sels) {
                this.sels = sels;
            },
            selsChange2: function(sels) {
                this.sels2 = sels;
            },
            selsChange3: function(sels) {
                this.sels3 = sels;
            },
            getNum(){
                get(url.inMal.inMailFetchRegistry).then(res=>{
                    this.farmerRemind=res.data.farmerRemind;
                    this.task=res.data.task;
                    this.earlyWarning=res.data.earlyWarning
                }).catch(err=>{
                    console.log(err);
                })
            },
            geteEarlyWarningList(){
                this.listLoading=true;
                get(url.inMal.inMailFindEarlyWarning,{pageNum: this.pageNum,pageSize: this.pageSize,readState:this.readState, warningName:this.warningName,deviceName:this.deviceName}).then(res=>{
                    this.earlyWarningList=res.datas;
                    this.total = res.totalNum;
                    this.listLoading=false;
                }).catch(err=>{
                    console.log(err);
                })
            },
            getFarmerRemindList(){
                this.listLoading=true;
                get(url.inMal.inMailFindFarmerRemind,{pageNum: this.pageNum2,pageSize: this.pageSize2,readState:this.readState2, remindTitle:this.remindTitle}).then(res=>{
                    this.farmerRemindList=res.datas;
                    this.total2 = res.totalNum;
                    this.listLoading=false;
                }).catch(err=>{
                    console.log(err);
                })
            },
            getTaskList(){
                this.listLoading=true;
                get(url.inMal.inMailFindTask,{pageNum: this.pageNum3,pageSize: this.pageSize3,readState:this.readState3, taskName:this.taskName}).then(res=>{
                    this.taskList=res.datas;
                    this.total3 = res.totalNum;
                    this.listLoading=false;
                }).catch(err=>{
                    console.log(err);
                })
            },
            //标记已读
            markedRead(id,type){
                // 创建实例时设置配置的默认值
                var instance = axios.create();
                // 在实例已创建后修改默认值
                instance.defaults.headers.post['Content-Type'] = 'application/json';
                instance.post(url.inMal.inMailAdd,[{dataId:id,readState:0,type:type}]).then(res=>{
                    if(res.status==200){
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1000,
                        })
                        this.geteEarlyWarningList();
                        this.getFarmerRemindList();
                        this.getTaskList();
                        this.getNum();
                    }else{
                        this.$message.err('操作失败')
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            //批量标记已读
            batchMarkedRead(type){
                if(type=='earlyWarning'){
                    if(this.sels.length<1){
                        this.$message.error("请选择需要标记的信息！")
                    }else{
                        var pm=[];
                        for(var i=0;i<this.sels.length;i++){
                            var obj= {
                                dataId: this.sels[i].id,
                                readState: 0,
                                type:'earlyWarning'
                            }
                            pm.push(obj);
                        }
                    }
                }else if(type=='farmerRemind'){
                    if(this.sels2.length<1){
                        this.$message.error("请选择需要标记的信息！")
                    }else{
                        var pm=[];
                        for(var i=0;i<this.sels2.length;i++){
                            var obj= {
                                dataId: this.sels2[i].id,
                                readState: 0,
                                type:'farmerRemind'
                            }
                            pm.push(obj);
                        }
                    }
                }else if(type=='task'){
                    if(this.sels3.length<1){
                        this.$message.error("请选择需要标记的信息！")
                    }else{
                        var pm=[];
                        for(var i=0;i<this.sels3.length;i++){
                            var obj= {
                                dataId: this.sels3[i].id,
                                readState: 0,
                                type:'task'
                            }
                            pm.push(obj);
                        }
                    }
                }
                // 创建实例时设置配置的默认值
                var instance = axios.create();
                // 在实例已创建后修改默认值
                instance.defaults.headers.post['Content-Type'] = 'application/json';
                instance.post(url.inMal.inMailAdd,pm).then(res=>{
                    if(res.status==200){
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1000,
                        })
                        this.geteEarlyWarningList();
                        this.getFarmerRemindList();
                        this.getTaskList();
                        this.getNum();
                    }else{
                        this.$message.err('操作失败')
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            //查询站点
            getDevide(){
                get(url.video.listDevice).then(res=>{
                    console.log(res);
                    this.devideList=res.data;
                }).catch(err=>{
                    console.log(err);
                })
            },
            //人员详情侧边框
            goDetail(id){
                this.detailId=id;
                this.dialog=true;
            },
            goDetail2(id){
                this.detailId2=id;
                this.dialog2=true;
            },
            goDetail3(id){
                this.detailIdT=id;
                this.dialogT=true;
            }
        },
        computed: {

        }
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
</style>

