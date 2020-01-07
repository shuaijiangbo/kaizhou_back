<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>功能管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="background-color: #fff;padding: 10px ;margin-top: 10px;position: absolute;top: 25px;bottom: 20px;right: 10px;left: 10px;">
            <div>
                <el-input v-model="filters.name" placeholder="功能名称" style="width: 215px;"></el-input>
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
                          label="功能名称"
                          width="150">
                    </el-table-column>
                    <el-table-column
                          label="功能编码"
                          width="150"
                          prop="code">
                    </el-table-column>
                    <el-table-column
                          prop="createTime"
                          width="150"
                          label="创建时间">
                    </el-table-column>
                    <el-table-column
                          prop="description"
                          label="功能说明">
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
        <el-dialog  :title="addForm.id ? '编辑功能' : '新增功能'" :visible.sync="dialogAddVisible" :close-on-click-modal="false" width="30%" :before-close="addRoleDialogHide">
            <el-form :model="addForm"  :rules="rules" ref="addForm">
                <el-form-item label="功能名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="addForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="功能编码" :label-width="formLabelWidth"  prop="code">
                    <el-input v-model="addForm.code" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="功能说明" :label-width="formLabelWidth"  prop="description">
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
                tableHeight:665,
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
                    code:'',
                    description:''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入功能名称', trigger: 'blur' },
                    ],
                    code: [
                        { required: true, message: '请输入功能编码', trigger: 'blur' },
                    ],
                    description: [
                        { required: true, message: '请输入功能说明', trigger: 'blur' },
                    ],
                },
                addLoading:false,
                total:'',
                roleList:[],
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
            this.getRole()
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
                get(url.fun.funSearch,para).then((res)=>{
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
            //隐藏添加功能弹框
            addRoleDialogHide(){
                this.dialogAddVisible=false;
                this.addForm={
                    name:'',
                    code:'',
                    description:''
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
                            instance.put(url.fun.funAdd, this.addForm).then(result =>{
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
                        } else { // 新增
                            // 在实例已创建后修改默认值
                            instance.post(url.fun.funAdd, this.addForm).then(result =>{
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
                    code:'',
                    description:''
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
                    deletes(url.fun.delete+'/'+id).then((res) => {
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
            // 显示编辑界面
            editRole(row) {
                this.dialogAddVisible = true;
                this.addForm = Object.assign({}, row);  //有现获取列表信息
                this.getRoleDeatil(row.code);
            },
            //回填详情
            getRoleDeatil(roleId) {
                get(url.fun.getDeatil,{code:roleId}).then((res) => {
                    this.addForm = res;  //有现获取列表信息
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
