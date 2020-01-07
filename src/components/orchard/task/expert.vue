<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>果园作业管理</el-breadcrumb-item>
            <el-breadcrumb-item>果园专家信息管理</el-breadcrumb-item>
            <el-breadcrumb-item>专家信息发布</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="background-color: #fff;padding: 10px ;margin-top: 10px;position: absolute;top: 54px;bottom: 20px;right: 10px;left: 10px;">
            <div>
                <span style="font-size: 14px;">专家：</span>
                <el-select v-model="filters.expertName" placeholder="专家" style="margin-right: 15px; width: 120px">
                    <el-option label="全部" value=""></el-option>
                    <el-option
                          v-for="item in personList"
                          :key="item.userId"
                          :label="item.userName"
                          :value="item.userName">
                    </el-option>
                </el-select>
                <span style="font-size: 14px;">发布状态：</span>
                <el-select v-model="filters.releaseStatus" placeholder="发布状态"  style="margin-right: 15px;width: 120px">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="已发布" value="1"></el-option>
                    <el-option label="未发布" value="0"></el-option>
                </el-select>
                <span style="font-size: 14px;">信息类型：</span>
                <el-select v-model="filters.type" placeholder="信息类型"  style="margin-right: 15px;width: 120px">
                    <el-option label="全部" value=""></el-option>
                    <el-option
                          v-for="item in typeList"
                          :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
                <el-input v-model="filters.remindTitle" placeholder="请输入关键字查询" style="width: 215px;"></el-input>
                <el-button type="primary" style="margin-left: 15px;" @click="seachRole">搜索</el-button>
                <span class="dz-zz-right-btn-box">
                    <el-button type="primary" @click="addRoleDialogShow"><i class="el-icon-lx-add"></i>&nbsp;新增</el-button>
                    <el-button type="danger" @click="batchRemove"><i class="el-icon-lx-delete"></i>&nbsp;批量删除</el-button>
                </span>
            </div>
            <div class="dz-zz-table-box">
                <el-table
                      ref="multipleTable"
                      :data="roleList"
                      tooltip-effect="dark"
                      style="width: 100%;"
                      border
                      v-loading="listLoading"
                      :height="tableHeight"
                      @selection-change="selsChange">
                    <el-table-column
                          type="selection"
                          width="55">
                    </el-table-column>
                    <el-table-column
                          label="信息标题" width="250">
                        <template slot-scope="scope">
                            <span class="dz-detail-btn" @click="goDetail2(scope.row.id)">{{scope.row.remindTitle}}  <i class="el-icon-caret-right"></i></span>
                        </template>
                    </el-table-column>
                    <el-table-column
                          label="信息类型"
                          width="100"
                          prop="remindType">
                    </el-table-column>
                    <el-table-column
                          label="专家"
                          width="80">
                        <template slot-scope="scope">
                            <span class="dz-detail-btn" @click="goDetail(scope.row.expertId)">{{scope.row.expertName}} <i class="el-icon-caret-right" v-if="scope.row.expertName"></i></span>
                        </template>
                    </el-table-column>
                    <el-table-column
                          label="适应作物"
                          width="80" prop="adaptCrop">
                    </el-table-column>
                    <el-table-column
                          width="50"
                          label="提醒级别" prop="remindLevel">
                    </el-table-column>
                    <el-table-column
                          label="信息内容">
                        <template slot-scope="scope">
                            <div class="textOver">{{scope.row.remindContent}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                          label="状态"
                          width="80">
                        <template slot-scope="scope">
                            <span>
                                {{scope.row.releaseStatus==1?'已发布':'未发布'}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                          label="操作"
                          width="400"
                          show-overflow-tooltip>
                        <template slot-scope="scope">

                            <el-button
                                  size="mini"
                                  type="warning"
                                  @click="releaseRole(scope.row)" v-if="scope.row.releaseStatus!=1"><i class="el-icon-lx-edit"></i>&nbsp;信息发布</el-button>
                            <el-button
                                  size="mini"
                                  type="success"
                                  @click="toTask(scope.row)"><i class="el-icon-lx-edit"></i>&nbsp;转成任务</el-button>
                            <el-button
                                  size="mini"
                                  type="primary"
                                  @click="editRole(scope.row)"><i class="el-icon-lx-edit"></i>&nbsp;编辑</el-button>
                            <el-button
                                  size="mini"
                                  type="danger"
                                  @click="deleteRole(scope.row)"><i class="el-icon-lx-delete"></i>&nbsp;删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination
                      layout="total, sizes, prev, pager, next, jumper"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      background
                      :page-sizes="[5,10,20,30,40]"
                      :page-size="pageSize"
                      :total="total"
                      :current-page.sync="currentPage">
                </el-pagination>
            </div>
        </div>
        <el-dialog  :title="addForm.id ? '编辑专家信息' : '新增专家信息'" :visible.sync="dialogAddVisible" :close-on-click-modal="false" width="50%" :before-close="addRoleDialogHide">
            <el-form :model="addForm"  :rules="rules" ref="addForm">
                <el-form-item label="信息名称" :label-width="formLabelWidth" prop="remindTitle">
                    <el-input v-model="addForm.remindTitle" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="提醒等级" :label-width="formLabelWidth"  prop="remindLevel">
                    <el-input v-model="addForm.remindLevel" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="适应作物" :label-width="formLabelWidth"  prop="adaptCrop">
                    <el-input v-model="addForm.adaptCrop" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="专家" :label-width="formLabelWidth"  prop="expertName">
                    <el-select v-model="addForm.expertId" placeholder="请选择" style="width: 100%">
                        <el-option
                              v-for="item in personList"
                              :key="item.userId"
                              :label="item.userName"
                              :value="item.userId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="信息类型" :label-width="formLabelWidth"  prop="type">
                    <el-select v-model="addForm.type" placeholder="请选择" style="width: 100%">
                        <el-option
                              v-for="item in typeList"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="提醒时间" :label-width="formLabelWidth"  prop="dateTime">
                    <el-date-picker
                          v-model="addForm.dateTime"
                          type="date"
                          placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="信息内容" :label-width="formLabelWidth"  prop="remindContent">
                    <el-input type="textarea" v-model="addForm.remindContent" autocomplete="off" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialogHide">取 消</el-button>
                <el-button type="primary" @click="addSubmit"  :loading="addLoading">确 定</el-button>
            </div>
        </el-dialog>


        <el-dialog  title="转为任务" :visible.sync="dialogVisible" :close-on-click-modal="false" width="50%" :before-close="addRoleDialogHide">
            <el-form :model="addForm2"  :rules="rules" ref="addForm">
                <el-form-item label="所属任务类型" :label-width="formLabelWidth"  prop="">
                    <el-select v-model="addForm2.taskType"  style="width: 100%">
                        <el-option
                              v-for="item in typeList"
                              :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="任务时间" :label-width="formLabelWidth"  prop="">
                    <el-date-picker
                          v-model="addForm2.taskTime"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"  style="width: 100%">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="任务分配" :label-width="formLabelWidth"  prop="perArr">
                    <el-radio v-model="radio" label="1">村组</el-radio>
                    <el-radio v-model="radio" label="2">人员</el-radio>
                </el-form-item>
                <el-form-item label="村组" :label-width="formLabelWidth" v-if="radio==1" prop="perArr">
                    <el-select v-model="addForm.perArr" multiple placeholder="请选择" style="width: 100%">
                        <el-option
                              v-for="item in villageList"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="人员" :label-width="formLabelWidth" v-if="radio==2" prop="perArr">
                    <el-select v-model="addForm.perArr" multiple placeholder="请选择" style="width: 100%">
                        <el-option
                              v-for="item in personList"
                              :key="item.id"
                              :label="item.userName"
                              :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="通知方式" :label-width="formLabelWidth" >
                    <el-checkbox-group v-model="notice">
                        <el-checkbox label="1" @change="check=!check">
                            <img v-if="check" src="@/assets/img/duanxin6.png" alt="">
                            <img v-else src="@/assets/img/duanxin3.png" alt=""> 站内信
                        </el-checkbox>
                        <el-checkbox label="2" @change="check2=!check2">
                            <img v-if="check2" src="@/assets/img/duanxin4.png" alt="">
                            <img v-else src="@/assets/img/duanxin1.png" alt=""> 短信</el-checkbox>
                        <el-checkbox label="3" @change="check3=!check3">
                            <img v-if="check3" src="@/assets/img/duanxin5.png" alt="">
                            <img v-else src="@/assets/img/duanxin2.png" alt="">
                            微信</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialogHide">取 消</el-button>
                <el-button type="primary" @click="submitTask"  :loading="addLoading">确 定</el-button>
            </div>
        </el-dialog>

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
    </div>
</template>

<script>
    import axios from 'axios';
    import {get, post,put,deletes,patch} from '@/api/fetch.js';
    import url from '@/api/serviceAPI.config.js';
    import detail from '@/components/common/personDetail';
    import detail2 from '@/components/common/expertInfoDetail'
    export default {
        name: 'village',
        data() {
            return {
                input:'',
                tableHeight:  document.body.clientHeight-255,
                pageNum:0,
                pageSize:10,
                listLoading: false, //loading
                filters: {
                    remindTitle: '',
                    releaseStatus:'',
                    expertName:'',
                    type:'',
                },
                dialogAddVisible:false,
                formLabelWidth: '110px',
                addForm:{
                    expertId:'',
                    type:'',
                    adaptCrop:'',
                    remindLevel:'',
                    remindTitle:'',
                    remindContent:'',
                    dateTime:''
                },
                rules: {
                    expertId: [
                        { required: true, message: '请选择专家', trigger: 'change' },
                    ],
                    type: [
                        { required: true, message: '请选择专家信息类型', trigger: 'change' },
                    ],
                    adaptCrop: [
                        { required: true, message: '请输入适应作物', trigger: 'blur' },
                    ],
                    remindLevel: [
                        { required: true, message: '请输入提醒等级', trigger: 'blur' },
                    ],
                    remindTitle: [
                        { required: true, message: '请输入专家信息标题', trigger: 'blur' },
                    ],
                    remindContent: [
                        { required: true, message: '请输入专家信息内容', trigger: 'blur' },
                    ],
                    dateTime: [
                        { required: true, message: '请选择适应时间', trigger: 'change' },
                    ],
                },
                addLoading:false,
                total:null,
                roleList:[],
                sels:[],
                typeList:[],
                taskTypeList:[],
                personList:[],
                villageList:[],
                userList:[],
                dialogVisible:false,
                listLoading2:false,
                taskList:[],
                addForm2:{
                    taskType:'',
                    startTime:'',
                    endTime:'',
                    taskTime:[],
                    perArr:[],
                    per:[],
                    id:''
                },
                currentPage:0,
                dialog:false,
                detailId:null,
                dialog2:false,
                detailId2:null,
                radio:"",
                notice:[],
                check:false,
                check2:false,
                check3:false,
            }
        },
        components: {
            detail,detail2
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
            this.getRole();
            this.typeArea();
            this.getPerson();
            this.typeTask();
            this.getUser();
            this.getVillage();
        },
        methods: {
            //改变分页信息
            handleCurrentChange(val) {
                console.log(val)
                this.pageNum = val;
                this.getRole();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getRole();
            },
            //获取村组列表
            getRole(){
                let para=Object.assign({pageNum: this.pageNum?this.pageNum-1:this.pageNum, pageSize: this.pageSize,}, this.filters);
                this.listLoading = true;
                get(url.expert.expertSearch,para).then((res)=>{
                    this.total = res.totalNum;
                    this.roleList = res.datas;
                    this.listLoading = false;
                    console.log(this.roleList)
                }).catch(error=>{
                    console.log(error);
                });
            },
            //显示添加村组弹框
            addRoleDialogShow(){
                this.dialogAddVisible=true
            },
            //隐藏添加村组弹框
            addRoleDialogHide(){
                this.dialogAddVisible=false;
                this.dialogVisible=false;
                this.addForm={
                    task:{
                        taskName:'',
                        taskType:'',
                        describes:'',
                        startTime:'',
                        endTime:'',
                    },
                    perArr:[],
                    per:[]
                }
            },
            // 新增/编辑 提交事件
            addSubmit: function () {
                // 创建实例时设置配置的默认值
                var instance = axios.create();
                // 在实例已创建后修改默认值
                instance.defaults.headers.post['Content-Type'] = 'application/json';
                this.$refs.addForm.validate((valid) => {
                    if (valid) {

                        // 创建实例时设置配置的默认值
                        this.addLoading = true;
                        if (this.addForm.id) { // 修改
                            // 在实例已创建后修改默认值
                            this.dialogAddVisible = false;
                            instance.patch(url.expert.expertUpdate, this.addForm).then(result =>{
                                this.dialogAddVisible = false;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success',
                                    duration: 1000,
                                });
                            }).catch(err => {
                                console.log(err);
                            }).finally(() => {
                                this.addLoading = false;
                                this.getRole();
                                this.addForm={
                                    expertName:'',
                                    type:'',
                                    adaptCrop:'',
                                    remindLevel:'',
                                    remindTitle:'',
                                    remindContent:'',
                                    dateTime:''
                                }
                                this.$refs.addForm.clearValidate();
                            })
                        } else { // 新增
                            put(url.expert.expertAdd, this.addForm).then(result =>{
                                this.dialogAddVisible = false;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success',
                                    duration: 1000,
                                });
                            }).catch(err => {
                                console.log(err);
                            }).finally(() => {
                                this.addLoading = false;
                                this.addForm={
                                    expertName:'',
                                    type:'',
                                    adaptCrop:'',
                                    remindLevel:'',
                                    remindTitle:'',
                                    remindContent:'',
                                    dateTime:''
                                }
                                this.getRole();
                                this.$refs.addForm.clearValidate();
                            })
                        }
                    }
                });
            },
            //搜索
            seachRole:function() {
                this.pageNum=0;
                this.pageSize=10;
                this.currentPage=0;
                // this.getRole();
                this.handleCurrentChange(0)
            },
            //删除
            deleteRole: function (row) {
                this.sels.push(row)
                this.batchRemove()
            },
            // 显示编辑界面
            editRole(row) {
                this.dialogAddVisible = true;
                this.addForm = Object.assign({}, row);  //有现获取列表信息
            },
            //回填详情
            getRoleDeatil(id) {
                get(url.task.taskFind,{taskId:id}).then((res) => {
                    // this.addForm = res;  //有现获取列表信息
                    let row=res.data;
                    this.addForm.task.taskName = row.task.taskName;
                    this.addForm.task.taskType = row.task.taskType;
                    this.addForm.task.describes = row.task.describes;
                    this.addForm.task.startTime = row.task.startTime;
                    this.addForm.task.endTime = row.task.endTime;
                    this.addForm.task.taskTime=[];
                    this.addForm.task.taskTime.push(row.task.startTime);
                    this.addForm.task.taskTime.push(row.task.endTime); //有现获取列表信息
                    this.addForm.per=row.taskPersons;
                    this.addForm.perArr=[];
                    for(var i = 0;i<this.addForm.per.length;i++){
                        this.addForm.perArr.push(this.addForm.per[i].taskPerson.id)
                    }
                    this.dialogAddVisible = true;
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {
                if(this.sels.length>0) {
                    var ids = this.sels.map(item => item.id).toString();
                    this.$confirm('确认删除选中记录吗？', '提示', {
                        type: 'warning'
                    }).then(() => {
                        this.listLoading = true;
                        let para = { ids: ids };
                        deletes(url.expert.expertDelete + '?ids=' + ids, para).then((res) => {
                            this.listLoading = false;
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getRole();
                        });
                    }).catch(() => {

                    });
                }else{
                    this.$message.error('请先选择需要删除的数据！');
                }
            },
            //发布
            releaseRole(row){
                post(url.expert.expertRelease,{id:row.id,releaseStatus:1}).then((res)=>{
                    if(res.code==200){
                        this.$message({
                            message: '发布成功',
                            type: 'success'
                        });
                        this.getRole()
                    }else{
                        this.$message.error('发布失败');
                    }
                }).catch(error=>{
                    console.log(error);
                });
            },
            //下架
            undercarriage(row){
                post(url.task.taskRelease,{taskId:row.task.id,releaseStatus:0}).then((res)=>{
                    if(res.code==200){
                        this.$message({
                            message: '下架成功',
                            type: 'success'
                        });
                        this.getRole()
                    }else{
                        this.$message.error('下架失败');
                    }
                }).catch(error=>{
                    console.log(error);
                });
            },
            //信息类型
            typeArea(){
                get(url.type.typeSearch,{pageNum:0,pageSize:999,type:'expertReleaseInfo'}).then((res)=>{
                    this.typeList = res.datas;
                }).catch(error=>{
                    console.log(error);
                });
            },
            //村组
            getVillage(){
                get(url.task.villageListVillage).then((res)=>{
                    this.villageList = res;
                }).catch(error=>{
                    console.log(error);
                });
            },
            //任务类型
            typeTask(){
                get(url.type.typeSearch,{pageNum:0,pageSize:999,type:'task'}).then((res)=>{
                    this.taskTypeList = res.datas;
                }).catch(error=>{
                    console.log(error);
                });
            },
            //人员
            getPerson(){
                get(url.expert.expertPersonList).then((res)=>{
                    this.personList = res.data;
                }).catch(error=>{
                    console.log(error);
                });
            },
            //人员
            getUser(){
                get(url.user.searchList,{pageNum:0,pageSize:999}).then((res)=>{
                    this.userList = res.datas;
                }).catch(error=>{
                    console.log(error);
                });
            },
            //查看详情
            taskDetail(id){
                this.listLoading2=true;
                this.dialogVisible=true;
                get(url.task.taskFind,{taskId:id}).then((res) => {
                    this.taskList = res.data;  //有现获取列表信息
                    this.listLoading2=false;
                });
            },
            //转为任务
            toTask(row){
                this.$confirm('是否转为任务？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.addForm2.id=row.id;
                    this.dialogVisible=true;
                }).catch(() => {

                });
            },
            submitTask(){
                this.addLoading=true;
                this.addForm2.per = [];
                for (var i=0;i<this.addForm2.perArr.length;i++ ) {
                    var j = {};
                    j.userId = this.addForm2.perArr[i]
                    this.addForm2.per.push(j);
                }
                this.addForm2.startTime=this.addForm2.taskTime[0];
                this.addForm2.endTime=this.addForm2.taskTime[1];
                this.addForm2.taskTime=[];
                // 创建实例时设置配置的默认值
                var instance = axios.create();
                // 在实例已创建后修改默认值
                instance.defaults.headers.post['Content-Type'] = 'application/json';
                instance.post(url.expert.expertToTask,this.addForm2).then((res) => {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.addLoading=false;
                }).catch(err => {
                    console.log(err);
                }).finally(() => {
                    this.dialogVisible=false;
                    this.addForm2={
                        taskType:'',
                        startTime:'',
                        endTime:'',
                        taskTime:[],
                        perArr:[],
                        per:[],
                        id:''
                    }
                    this.getRole();
                    this.$refs.addForm2.clearValidate();
                });
            },
            //人员详情侧边框
            goDetail(id){
                this.detailId=id;
                this.dialog=true;
            },
            //专家信息详情侧边框
            goDetail2(id){
                this.detailId2=id;
                this.dialog2=true;
            }
        },
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
