<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>果园作业管理</el-breadcrumb-item>
            <el-breadcrumb-item>果园任务管理</el-breadcrumb-item>
            <el-breadcrumb-item>任务管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="background-color: #fff;padding: 10px ;margin-top: 10px;position: absolute;top: 54px;bottom: 20px;right: 10px;left: 10px;">
            <div>
                <span style="font-size: 14px;">完成状态：</span>
                <el-select v-model="filters.taskState" placeholder="完成状态" style="margin-right: 15px; width: 120px">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="已完成" value="2"></el-option>
                    <el-option label="未完成" value="1"></el-option>
                    <el-option label="已延期" value="3"></el-option>
                </el-select>
                <span style="font-size: 14px;">发布状态：</span>
                <el-select v-model="filters.releaseStatus" placeholder="发布状态"  style="margin-right: 15px;width: 120px">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="已发布" value="1"></el-option>
                    <el-option label="未发布" value="0"></el-option>
                </el-select>
                <el-input v-model="filters.taskName" placeholder="请输入关键字查询" style="width: 215px;"></el-input>
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
                    <el-table-column label="任务名称">
                        <template slot-scope="scope">
                            <span class="dz-detail-btn" @click="goDetail(scope.row.task.id)">{{scope.row.task.taskName}} <i class="el-icon-caret-right"></i></span>
                        </template>
                    </el-table-column>

                    <el-table-column
                          label="任务类型">
                        <template slot-scope="scope">
                            {{scope.row.taskTypeName}}
                        </template>
                    </el-table-column>

                    <el-table-column
                          label="任务开始时间">
                        <template slot-scope="scope">
                            {{scope.row.task.startTime}}
                        </template>
                    </el-table-column>

                    <el-table-column
                          label="任务结束时间" >
                        <template slot-scope="scope" >
                            <div :class="scope.row.task.taskState==3?'dz-delay':''">
                                {{scope.row.task.endTime}}
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                          label="成员人数" prop="totalNum">
                    </el-table-column>

                    <el-table-column
                          label="完成人数" prop="completed">
                    </el-table-column>

                    <el-table-column
                          label="未完成人数" prop="noCompleted">
                    </el-table-column>

                    <el-table-column
                          label="完成进度" prop="completedSchedule">
                    </el-table-column>

                    <el-table-column
                          label="任务描述">
                        <template slot-scope="scope">
                            {{scope.row.task.describes}}
                        </template>
                    </el-table-column>
                    <el-table-column
                          label="发布状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.task.releaseStatus!=1" style="color: red;">未发布</span>
                            <span v-else style="color: green;">已发布</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                          label="操作"
                          width="380"
                          show-overflow-tooltip>
                        <template slot-scope="scope">
                            <!--<el-button-->
                                  <!--size="mini"-->
                                  <!--type="primary"-->
                                  <!--@click="taskDetail(scope.row.task.id)"><i class="el-icon-lx-edit"></i>&nbsp;查看详情</el-button>-->
                            <el-button
                                  size="mini"
                                  type="primary"
                                  @click="editRole(scope.row)"><i class="el-icon-lx-edit"></i>&nbsp;编辑</el-button>
                            <el-button
                                  size="mini"
                                  type="primary"
                                  @click="releaseRole(scope.row)" v-if="scope.row.task.releaseStatus!=1"><i class="el-icon-lx-edit"></i>&nbsp;发布</el-button>
                            <el-button
                                  size="mini"
                                  type="warning"
                                  @click="undercarriage(scope.row)" v-if="scope.row.task.releaseStatus==1"><i class="el-icon-lx-edit"></i>&nbsp;下架</el-button>
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
                      :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog  :title="addForm.task.id ? '编辑任务' : '新增任务'" :visible.sync="dialogAddVisible" :close-on-click-modal="false" width="50%" :before-close="addRoleDialogHide">
            <el-form :model="addForm"  :rules="rules" ref="addForm">
                <el-form-item label="任务名称" :label-width="formLabelWidth" prop="task.taskName">
                    <el-input v-model="addForm.task.taskName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属任务类型" :label-width="formLabelWidth"  prop="task.taskType">
                    <el-select v-model="addForm.task.taskType"  style="width: 100%">
                        <el-option
                              v-for="item in typeList"
                              :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="任务时间" :label-width="formLabelWidth"  prop="task.taskTime">
                    <el-date-picker
                          v-model="addForm.task.taskTime"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                          style="width: 100%">
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
                <el-form-item label="任务描述" :label-width="formLabelWidth"  prop="task.describes">
                    <el-input type="textarea" v-model="addForm.task.describes" autocomplete="off" rows="10"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialogHide">取 消</el-button>
                <el-button type="primary" @click="addSubmit"  :loading="addLoading">确 定</el-button>
            </div>
        </el-dialog>

        <!--<el-dialog  title="查看详情" :visible.sync="dialogVisible" :close-on-click-modal="false" width="50%" :before-close="addRoleDialogHide">-->
            <!--&lt;!&ndash;<div style="margin-bottom: 15px;">任务名称：{{taskArr.taskName}}</div>&ndash;&gt;-->
            <!--<el-table-->
                  <!--ref="multipleTable2"-->
                  <!--:data="taskList"-->
                  <!--tooltip-effect="dark"-->
                  <!--style="width: 100%;"-->
                  <!--border-->
                  <!--v-loading="listLoading2">-->
                <!--&lt;!&ndash;<el-table-column&ndash;&gt;-->
                <!--&lt;!&ndash;type="selection"&ndash;&gt;-->
                <!--&lt;!&ndash;width="55">&ndash;&gt;-->
                <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
                <!--<el-table-column-->
                      <!--prop="userName"-->
                      <!--label="成员名称">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                      <!--prop="tel"-->
                      <!--label="联系电话">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                      <!--label="任务照片">-->
                    <!--<template slot-scope="scope">-->
                        <!--<img :src="'/api/task/getTaskImage?taskPersonId='+scope.row.taskPerson.id" alt="" style="width: 150px;height: auto;">-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                      <!--label="完成情况">-->
                    <!--<template slot-scope="scope">-->
                        <!--{{scope.row.taskPerson.taskState==2?'已完成':'未完成'}}-->
                    <!--</template>-->
                <!--</el-table-column>-->
            <!--</el-table>-->
            <!--<div slot="footer" class="dialog-footer">-->
                <!--<el-button @click="addRoleDialogHide">取 消</el-button>-->
                <!--&lt;!&ndash;<el-button type="primary" @click="bindTypeSubmit"  :loading="addLoading">确 定</el-button>&ndash;&gt;-->
            <!--</div>-->
        <!--</el-dialog>-->

        <el-drawer
              title="任务信息"
              :visible.sync="dialog"
              direction="rtl"
              destroy-on-close>
            <detail :id="detailId"></detail>
        </el-drawer>
    </div>
</template>

<script>
    import axios from 'axios';
    import {get, post,put,deletes,patch} from '@/api/fetch.js';
    import url from '@/api/serviceAPI.config.js';
    import detail from '@/components/common/taskDetail'
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
                    taskState: '',
                    releaseStatus:'',
                    complete:''
                },
                dialogAddVisible:false,
                formLabelWidth: '110px',
                addForm:{
                    task:{
                        id:'',
                        taskName:'',
                        taskType:'',
                        describes:'',
                        startTime:'',
                        endTime:'',
                        taskTime:[],
                        notice:[]
                    },
                    perArr:[],
                    per:[]
                },
                rules: {
                    task:{
                        taskName: [
                            { required: true, message: '请输入任务名称', trigger: 'blur' },
                        ],
                        taskType: [
                            { required: true, message: '请选择任务类型', trigger: 'change' },
                        ],
                        taskTime: [
                            { required: true, message: '请选择任务时间', trigger: 'blur' },
                        ],
                        describes:[
                            { required: true, message: '请输入任务详情', trigger: 'blur' },
                        ]
                    },
                    perArr: [
                        { required: true, message: '请选择任务成员', trigger: 'change' },
                    ],
                },
                addLoading:false,
                total:'',
                roleList:[],
                sels:[],
                typeList:[],
                personList:[],
                dialogVisible:false,
                listLoading2:false,
                taskList:[],
                taskArr:{},
                notice:[],
                check:false,
                check2:false,
                check3:false,
                dialog:false,
                detailId:null,
                radio:"",
                villageList:null
            }
        },
        components: {
            detail
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
            this.getVillage();
        },
        methods: {
            //改变分页信息
            handleCurrentChange(val) {
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
                get(url.task.taskSearch,para).then((res)=>{
                    this.total = res.totalNum;
                    this.roleList = res.datas;
                    this.listLoading = false;
                }).catch(error=>{
                    console.log(error);
                });
            },
            //显示添加村组弹框
            addRoleDialogShow(){
                this.dialogAddVisible=true
                this.addForm={
                    task:{
                        id:'',
                        taskName:'',
                        taskType:'',
                        describes:'',
                        startTime:'',
                        endTime:'',
                    },
                    perArr:[],
                    per:[]
                };
                // this.$refs.addForm.clearValidate();
            },
            //隐藏添加村组弹框
            addRoleDialogHide(){
                this.dialogAddVisible=false;
                this.dialogVisible=false;
                this.addForm={
                    task:{
                        id:'',
                        taskName:'',
                        taskType:'',
                        describes:'',
                        startTime:'',
                        endTime:'',
                        taskTime:[],
                        notice:[]
                    },
                    perArr:[],
                    per:[]
                };
                this.notice=[];
                this.check=false;
                this.check2=false;
                this.check3=false
            },
            // 新增/编辑 提交事件
            addSubmit: function () {
                // 创建实例时设置配置的默认值
                var instance = axios.create();
                // 在实例已创建后修改默认值
                instance.defaults.headers.post['Content-Type'] = 'application/json';
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        var formValue={
                            task:{
                                id:'',
                                taskName:'',
                                taskType:'',
                                describes:'',
                                startTime:'',
                                endTime:'',
                            },
                            per:[],
                            notice:''
                        }
                        // 在实例已创建后修改默认值
                        formValue.per = [];
                        for (var i=0;i<this.addForm.perArr.length;i++ ) {
                            var j = {};
                            j.userId = this.addForm.perArr[i]
                            formValue.per.push(j);
                        }
                        formValue.task.startTime=this.addForm.task.taskTime[0];
                        formValue.task.endTime=this.addForm.task.taskTime[1];
                        formValue.task.taskName=this.addForm.task.taskName;
                        formValue.task.describes=this.addForm.task.describes;
                        formValue.task.taskType=this.addForm.task.taskType;
                        formValue.notice="";
                        for(var i=0;i<this.notice.length;i++){
                            formValue.notice+=this.notice[i];
                        }
                        formValue.task.id=this.addForm.task.id;
                        // 创建实例时设置配置的默认值
                        this.addLoading = true;
                        if (this.addForm.task.id) { // 修改
                            // 在实例已创建后修改默认值
                            instance.patch(url.task.taskUpdate, formValue).then(result =>{
                                this.$message({
                                    message: '提交成功',
                                    type: 'success',
                                    duration: 1000,
                                });
                                this.$refs.addForm.clearValidate();
                                this.dialogAddVisible = false;
                            }).catch(err => {
                                console.log(err);
                            }).finally(() => {
                                this.addLoading = false;
                                this.getRole();
                                this.addForm={
                                    task:{
                                        id:'',
                                            taskName:'',
                                            taskType:'',
                                            describes:'',
                                            startTime:'',
                                            endTime:'',
                                            taskTime:[],
                                            notice:[]
                                    },
                                    perArr:[],
                                        per:[]
                                };
                                this.notice=[];
                                this.check=false;
                                this.check2=false;
                                this.check3=false
                            })
                        } else { // 新增
                            instance.put(url.task.taskAdd, formValue).then(result =>{
                                this.$message({
                                    message: '提交成功',
                                    type: 'success',
                                    duration: 1000,
                                });
                                this.$refs.addForm.clearValidate();
                                this.dialogAddVisible = false;
                            }).catch(err => {
                                console.log(err);
                            }).finally(() => {
                                this.addLoading = false;
                                this.getRole();
                                this.addForm={
                                    task:{
                                        id:'',
                                        taskName:'',
                                        taskType:'',
                                        describes:'',
                                        startTime:'',
                                        endTime:'',
                                        taskTime:[],
                                        notice:[]
                                    },
                                    perArr:[],
                                    per:[]
                                };
                                this.notice=[];
                                this.check=false;
                                this.check2=false;
                                this.check3=false
                            })
                        }
                    }
                });
            },
            //搜索
            seachRole:function() {
                this.getRole();
            },
            //删除
            deleteRole: function (row) {
                this.sels.push(row)
                this.batchRemove()
            },
            // 显示编辑界面
            editRole(row) {
                this.getRoleDeatil(row.task.id);
            },
            //回填详情
            getRoleDeatil(id) {
                this.dialogAddVisible = true;
                get(url.task.taskFind,{taskId:id}).then((res) => {
                    // this.addForm = res;  //有现获取列表信息
                    let row=res.data;
                    this.addForm.task.taskName = row.task.taskName;
                    this.addForm.task.taskType = row.task.taskType;
                    this.addForm.task.describes = row.task.describes;
                    this.addForm.task.startTime = row.task.startTime;
                    this.addForm.task.endTime = row.task.endTime;
                    this.addForm.task.id = row.task.id;
                    this.addForm.task.taskTime=[];
                    this.addForm.task.taskTime.push(row.task.startTime);
                    this.addForm.task.taskTime.push(row.task.endTime); //有现获取列表信息
                    this.addForm.per=row.taskPersons;
                    this.addForm.perArr=[];
                    for(var i = 0;i<this.addForm.per.length;i++){
                        this.addForm.perArr.push(this.addForm.per[i].taskPerson.userId)
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {
                console.log(this.sels)
                if(this.sels.length>0) {
                    var ids = this.sels.map(item => item.task.id).toString();
                    this.$confirm('确认删除选中记录吗？', '提示', {
                        type: 'warning'
                    }).then(() => {
                        this.listLoading = true;
                        let para = { ids: ids };
                        deletes(url.task.taskDelete + '?ids=' + ids, para).then((res) => {
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
                post(url.task.taskRelease,{taskId:row.task.id,releaseStatus:1}).then((res)=>{
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
            //区域类型
            typeArea(){
                get(url.type.typeSearch,{pageNum:0,pageSize:999,type:'task'}).then((res)=>{
                    this.typeList = res.datas;
                }).catch(error=>{
                    console.log(error);
                });
            },
            //人员
            getPerson(){
                get(url.user.searchList,{pageNum:0,pageSize:999}).then((res)=>{
                    this.personList = res.datas;
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
            //查看详情
            taskDetail(id){
                this.listLoading2=true;
                this.dialogVisible=true;
                get(url.task.taskFind,{taskId:id}).then((res) => {
                    this.taskList = res.data.taskPersons;  //有现获取列表信息
                    this.taskArr = res.data.task;
                    this.listLoading2=false;
                });
            },
            //详情侧边框
            goDetail(id){
                this.detailId=id;
                this.dialog=true;
            },
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
    .dz-delay{
        color: #fbe000;
        background-color: #b90c0c;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
