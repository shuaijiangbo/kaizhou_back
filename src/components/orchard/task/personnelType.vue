<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>果园作业管理</el-breadcrumb-item>
            <el-breadcrumb-item>果园人员管理</el-breadcrumb-item>
            <el-breadcrumb-item>人员类型管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="background-color: #fff;padding: 10px ;margin-top: 10px;position: absolute;top: 55px;bottom: 20px;right: 10px;left: 10px;">
            <div>
                <el-input v-model="filters.name" placeholder="人员类型名称" style="width: 215px;"></el-input>
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
                          label="人员类型名称"
                          width="150">
                    </el-table-column>
                    <el-table-column
                          label="人员类型编码"
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
                          label="人员类型描述">
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
                            <el-button size="mini" type="success" @click="bindFun(scope.row.code)">
                                <i class="el-icon-circle-plus-outline"></i>
                                功能
                            </el-button>
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
        <el-dialog :title="addForm.id ? '编辑人员类型' : '新增人员类型'" :visible.sync="dialogAddVisible" :close-on-click-modal="false" width="50%" :before-close="addRoleDialogHide">
            <el-form :model="addForm"  :rules="rules" ref="addForm">
                <el-form-item label="人员类型名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="addForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="人员类型编码" :label-width="formLabelWidth"  prop="code">
                    <el-input v-model="addForm.code" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="人员类型说明" :label-width="formLabelWidth"  prop="description">
                    <el-input type="textarea" v-model="addForm.description" autocomplete="off" rows="10"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialogHide">取 消</el-button>
                <el-button type="primary" @click="addSubmit"  :loading="addLoading">确 定</el-button>
            </div>
        </el-dialog>

        <!--功能绑定界面-->
        <el-dialog width="50%" title="绑定功能"  :visible.sync="bingFunVisible" :before-close="addRoleDialogHide" :close-on-click-modal="false" >
            <el-form label-width="80px" ref="funsBindForm">
                <el-form-item label="功能树" >
                    <div style="height: 300px;border:1px solid #DCDFE6;">
                        <el-scrollbar>
                            <el-tree
                                  :data="funsTreeData"
                                  show-checkbox
                                  node-key="code"
                                  ref="tree"
                                  @check="handleNodeClick"
                                  :props="props"
                            >
                            </el-tree>
                        </el-scrollbar>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click.native="addRoleDialogHide">取消</el-button>
                <el-button size="small" type="primary" @click.native="funsbindSubmit">提交</el-button>
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
            let instance = axios.create();
            return {
                instance:instance,
                input:'',
                tableHeight: document.body.clientHeight-255,
                pageNum:0,
                pageSize:10,
                listLoading: false, //loading
                filters: {
                    name: '',
                },
                dialogAddVisible:false,
                formLabelWidth: '110px',
                addForm:{
                    name:'',
                    code:'',
                    description:''
                },
                props:{
                    children: 'children',
                    label: 'name',
                    id: 'code'
                },
                rules: {
                    name: [
                        { required: true, message: '请输入人员类型名称', trigger: 'blur' },
                    ],
                    code: [
                        { required: true, message: '请输入人员类型编码', trigger: 'blur' },
                    ],
                    description: [
                        { required: true, message: '请输入人员类型说明', trigger: 'blur' },
                    ],
                },
                addLoading:false,
                total:'',
                roleList:[],
                bingFunVisible:false,
                bindfunForm:{
                    roleCode:'',
                    funsCodes:''
                },
                addOrUpdate:'add',
                funsTreeData:[],
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
            //获取人员类型列表
            getRole(){
                let para=Object.assign({pageNum: this.pageNum?this.pageNum-1:this.pageNum, pageSize: this.pageSize,}, this.filters);
                this.listLoading = true;
                get(url.role.searchList,para).then((res)=>{
                    this.total = res.totalNum;
                    this.roleList = res.datas;
                    this.listLoading = false;
                }).catch(error=>{
                    console.log(error);
                });
            },
            //显示添加人员类型弹框
            addRoleDialogShow(){
                this.dialogAddVisible=true
                this.addForm={
                    name:'',
                    code:'',
                    description:''
                }
            },
            //隐藏添加人员类型弹框
            addRoleDialogHide(){
                this.dialogAddVisible=false;
                this.bingFunVisible=false;
                this.$refs.addForm.clearValidate();
                this.addLoading = false;
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
                            instance.put(url.role.roleBase, this.addForm).then(result =>{
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
                            instance.post(url.role.findConfirmRepeat,{name:this.addForm.name}).then(res=>{
                                console.log(res)
                            })
                            // 在实例已创建后修改默认值
                            instance.post(url.role.roleBase, this.addForm).then(result =>{
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
                    deletes(url.role.roleDelete+'/'+id).then((res) => {
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
                get(url.role.getDeatil,{code:roleId}).then((res) => {
                    this.addForm = res;  //有现获取列表信息
                });
            },
            //绑定功能
            bindFun:function(code){
                this.bingFunVisible=true;
                this.bindfunForm.roleCode=code;
                get(url.fun.funSearch,{pageNum: 0, pageSize: 1000}).then((res)=>{
                    console.log(res.datas);
                    let datas=res.datas;
                    let tree=[];
                    for(let i in datas){
                        let item=datas[i];
                        if(!item.code.split('-')[1]){  //先得出一级
                            item.children=[];
                            tree.push(item);
                        }
                    }
                    for(let i in datas){
                        let item=datas[i];
                        if(item.code.split('-')[1]){  //二级
                            let firstCode=item.code.split('-')[0];
                            for(let j in tree){
                                if(tree[j].code==firstCode){
                                    tree[j].children.push(item);
                                }
                            }
                        }
                    }
                    this.funsTreeData=tree;
                    this.searcnBelongRoles();
                }).catch(error=>{
                    console.log(error);
                });
            },
            //搜索所属功能
            searcnBelongRoles:function(code){
                get(url.role.getBelongFunsList,{pageNum: 0, pageSize: 1000,roleCode:this.bindfunForm.roleCode}).then((res)=>{
                    let keyArr=[];
                    res.datas.map((item)=>{
                        keyArr.push(item.functionCode);
                    })
                    this.$refs.tree.setCheckedKeys(keyArr);
                    this.bindfunForm.funsCodes=keyArr;
                    if(res.datas.length){
                        this.addOrUpdate='update';
                    }else{
                        this.addOrUpdate='add';
                    }
                    console.log(this.addOrUpdate);
                }).catch(error=>{
                    console.log(error);
                });
            },
            // 提交绑定
            funsbindSubmit: function () {
                let sendArr=[];
                for(var i in this.bindfunForm.funsCodes){
                    let obj={
                        roleCode:this.bindfunForm.roleCode,
                        functionCode:this.bindfunForm.funsCodes[i]
                    };
                    sendArr.push(obj);
                }
                if(this.addOrUpdate=='add'){
                    this.instance.post(url.role.saveFunsTreeDada,sendArr).then(result =>{
                        this.bingFunVisible = false;
                        this.$message({
                            message: '提交成功',
                            type: 'success',
                            duration: 1000,
                        });
                    }).catch(err => {
                        console.log(err);
                    }).finally(() => {
                        this.getRole();
                    });
                }else{
                    this.instance.put(url.role.undateFunsTreeDada,sendArr).then(result =>{
                        this.bingFunVisible = false;
                        this.$message({
                            message: '提交成功',
                            type: 'success',
                            duration: 1000,
                        });
                    }).catch(err => {
                        console.log(err);
                    }).finally(() => {
                        this.getRole();
                    });
                }

            },
            handleNodeClick(data,obj) {
                this.bindfunForm.funsCodes=obj.checkedKeys;
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
