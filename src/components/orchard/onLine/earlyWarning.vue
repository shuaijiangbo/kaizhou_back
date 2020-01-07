<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>功能管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="background-color: #fff;padding: 10px ;margin-top: 10px;position: absolute;top: 25px;bottom: 20px;right: 10px;left: 10px;">
            <div>
                <el-input v-model="filters.name" placeholder="站点名称" style="width: 215px;"></el-input>
                <el-button type="primary" style="margin-left: 15px;" @click="seachRole">搜索</el-button>
                <span class="dz-zz-right-btn-box">
                    <el-button type="primary" @click="addRoleDialogShow"><i class="el-icon-lx-add"></i>&nbsp;新增</el-button>
                    <!--<el-button type="danger"><i class="el-icon-lx-delete"></i>&nbsp;批量删除</el-button>-->
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
                      :height="tableHeight">
                    <el-table-column
                          type="selection"
                          width="55">
                    </el-table-column>
                    <el-table-column
                          prop="name"
                          label="站点名"
                          width="250">
                    </el-table-column>
                    <el-table-column
                          label="指标名"
                          width="250"
                          prop="code">
                    </el-table-column>
                    <el-table-column
                          prop="type"
                          width="250"
                          label="站点类型">
                    </el-table-column>
                    <el-table-column
                          prop="createTime"
                          width="250"
                          label="指标代码">
                    </el-table-column>
                    <el-table-column
                          prop="minVal"
                          label="最小阈值">
                    </el-table-column>
                    <el-table-column
                          prop="maxVal"
                          label="最大阈值">
                    </el-table-column>

                    <el-table-column
                          label="操作"
                          width="300"
                          show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button
                                  size="mini"
                                  type="primary"
                                  @click="editRole(scope.row)"><i class="el-icon-lx-edit"></i>&nbsp;编辑</el-button>
                            <el-button
                                  size="mini"
                                  :type="!scope.row.isEnabled?'success':'info'"
                                  @click="changeStatus(scope.row)"><i class="el-icon-lx-edit"></i>&nbsp;{{!scope.row.isEnabled?'启用':'停用'}}</el-button>
                            <el-button
                                  size="mini"
                                  type="danger"
                                  @click="deleteRole(scope.row.id)"><i class="el-icon-lx-delete"></i>&nbsp;删除</el-button>
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
        <el-dialog  :title="addForm.id ? '编辑指标' : '新增指标'" :visible.sync="dialogAddVisible" :close-on-click-modal="false" width="30%" :before-close="addRoleDialogHide">
            <el-form :model="addForm"  :rules="rules" ref="addForm">
                <el-form-item label="指标名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="addForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="站点" :label-width="formLabelWidth" prop="name">
                    <el-select style="width: 100%" v-model="addForm.deviceId" placeholder="请选择活动区域">
                        <el-option :label="item.deviceName" :value="item.id" v-for="(item,index) in listDevice"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="code" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="addForm.code" autocomplete="off"></el-input>
                </el-form-item>
                <!--
                <el-form-item label="是否启用" :label-width="formLabelWidth" prop="name">
                    <el-switch v-model="addForm.isEnabled" active-value="1"
                               inactive-value="0"></el-switch>
                </el-form-item>-->
                <el-form-item label="范围" :label-width="formLabelWidth"  required>
                    <el-col :span="11">
                        <el-form-item prop="minVal">
                            <el-input v-model="addForm.minVal" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align: center">-</el-col>

                    <el-col :span="11">
                        <el-form-item prop="maxVal">
                            <el-input v-model="addForm.maxVal" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth"  prop="description">
                    <el-input v-model="addForm.description" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialogHide">取 消</el-button>
                <el-button type="primary" @click="addSubmit"  :loading="addLoading">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios';
    import {get, post,put,deletes} from '@/api/fetch.js';
    import url from '@/api/serviceAPI.config.js';
    export default {
        name: 'role',
        data() {
            return {
                input:'',
                tableHeight:document.body.clientHeight-255,
                pageNum:0,
                pageSize:10,
                listLoading: false, //loading
                filters: {
                    name: '',
                },
                dialogAddVisible:false,
                formLabelWidth: '80px',
                addForm:{
                    name:'',
                    minVal:'',
                    maxVal:'',
                    isEnabled:0,
                    description:'',
                    code:'',
                    deviceId:''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入功能名称', trigger: 'blur' },
                    ],
                    max: [
                        { required: true, message: '请输入最大值', trigger: 'blur' },
                    ],
                    min: [
                        { required: true, message: '请输入最小值', trigger: 'blur' },
                    ],
                    units: [
                        { required: true, message: '请输入单位', trigger: 'blur' },
                    ],
                    description: [
                        { required: true, message: '请输入说明', trigger: 'blur' },
                    ],
                },
                addLoading:false,
                total:'',
                roleList:[],
                listDevice:[],
                obj:{
                circuitBreakers:[{
                    'address':1 ,
                    'state':0 ,
                }],
                keyCode:"e10adc3949ba59abbe56e057f20f883e",
                tid:"98D863162C70",
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
            this.getRole();
            this.getListDevice();
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
            //获取功能列表
            getRole(){
                let para=Object.assign({pageNum: this.pageNum?this.pageNum-1:this.pageNum, pageSize: this.pageSize,}, this.filters);
                this.listLoading = true;
                get(url.video.warningSetList,para).then((res)=>{
                    this.total = res.totalNum;
                    this.roleList = res.datas;
                    this.listLoading = false;
                }).catch(error=>{
                    console.log(error);
                });
            },
            //显示添加功能弹框
            addRoleDialogShow(){
                this.dialogAddVisible=true
            },
            getListDevice(){
                get(url.video.listDevice).then((res)=>{
                    this.listDevice=res.data;
                }).catch(error=>{
                    console.log(error);
                });

            },
            //隐藏添加功能弹框
            addRoleDialogHide(){
                this.dialogAddVisible=false;
                this.addForm={
                    name:'',
                    minVal:'',
                    maxVal:'',
                    isEnabled:0,
                    description:'',
                    code:'',
                    deviceId:''
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
                            instance.post(url.video.warningSetUpdate, this.addForm).then(result =>{
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
                            })
                        }else { // 新增
                            // 在实例已创建后修改默认值
                            instance.post(url.video.warningSetAdd, this.addForm).then(result =>{
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
                            })
                        }
                    }
                });
                this.addForm={
                    name:'',
                    minVal:'',
                    maxVal:'',
                    isEnabled:0,
                    description:'',
                    code:'',
                    deviceId:''
                }
            },
            //搜索
            seachRole:function() {
                this.getRole();
            },
            //删除
            deleteRole: function (id) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    deletes(url.video.warningSetDelete+'/'+id).then((res) => {
                        this.listLoading = false;
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getRole();
                    });
                }).catch(() => {

                });
            },
            //启用停用
            changeStatus:function(res){
                post(url.video.updateIsEnabled,{id:res.id,isEnabled:!res.isEnabled?1:0}).then((res) => {
                    this.listLoading = false;
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.getRole();
                });
            },
            // 显示编辑界面
            editRole(row) {
                this.dialogAddVisible = true;
                this.addForm = Object.assign({}, row);  //有现获取列表信息
                this.getRoleDeatil(row.id);
            },
            //回填详情
            getRoleDeatil(id) {
                get(url.video.warningSetFind,{id:id}).then((res) => {
                    let {name,minVal,maxVal,isEnabled,description,code,deviceId,id}  = res.data;  //有现获取列表信息
                    this.addForm={
                        name:name,
                        minVal:minVal,
                        maxVal:maxVal,
                        isEnabled:isEnabled,
                        description:description,
                        code:code,
                        deviceId:deviceId+'',
                        id:id
                    }
                });
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
</style>
