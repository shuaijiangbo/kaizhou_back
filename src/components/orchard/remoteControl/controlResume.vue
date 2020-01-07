<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>果园远程控制</el-breadcrumb-item>
            <el-breadcrumb-item>水肥一体化</el-breadcrumb-item>
            <el-breadcrumb-item>控操履历</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="background-color: #fff;padding: 10px ;margin-top: 10px;position: absolute;top: 54px;bottom: 20px;right: 10px;left: 10px;">
            <div>
                <!--<el-select v-model="filters.cose" placeholder="控操类型"  value-key="id" @change="getAreaFun($event)" style="margin-right: 15px; width: 120px">
                    <el-option
                          :label="item.name" :value="item" key="打开">
                    </el-option>
                </el-select>-->
                <el-input v-model="filters.userName" placeholder="请输入用户名" style="width: 215px;"></el-input>
                <el-button type="primary" style="margin-left: 15px;" @click="seachRole">搜索</el-button>
            </div>
            <div class="dz-zz-table-box">
                <el-table
                      ref="multipleTable"
                      :data="tableData"
                      tooltip-effect="dark"
                      style="width: 100%;"
                      border
                      v-loading="listLoading"
                      :height="tableHeight"
                      @selection-change="selsChange">
                      <el-table-column
                            prop="name"
                            label="控制名称"
                            width="180">
                      </el-table-column>
                      <el-table-column
                            prop="userName"
                            label="控制人"
                            width="180">
                            <template slot-scope="scope">
                                  <span class="dz-detail-btn" @click="goDetail(scope.row.userId)">{{scope.row.userName}} <i class="el-icon-caret-right" v-if="scope.row.userName"></i></span>
                            </template>
                      </el-table-column>
                      <el-table-column
                            prop="kongKaiRecord.createTime"
                            label="控制时间">
                      </el-table-column>
                      <el-table-column
                            prop="kongKaiRecord.msg"
                            label="控制操作">
                      </el-table-column>
                      <el-table-column
                            label="操作"
                            width="300"
                            show-overflow-tooltip>
                            <template scope="scope">
                                  <!--<el-button
                                        size="mini"
                                        type="primary"
                                        @click="editRole(scope.row)"><i class="el-icon-lx-edit"></i>&nbsp;编辑</el-button>
                                  --><el-button
                                  size="mini"
                                  type="danger"
                                  @click="deleteRole(scope.row.kongKaiRecord.id)"><i class="el-icon-lx-delete"></i>&nbsp;删除</el-button>
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
          <el-drawer
                title="人员信息"
                :visible.sync="dialog"
                direction="rtl"
                size="35%"
                destroy-on-close>
                <detail :id="detailId"></detail>
          </el-drawer>
    </div>
</template>

<script>
    import axios from 'axios';
    import {get, post,put,deletes} from '@/api/fetch.js';
    import url from '@/api/serviceAPI.config.js';
    import detail from '@/components/common/personDetail'
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
                    cose:'',
                    userName:''
                },
                dialogAddVisible:false,
                formLabelWidth: '110px',
                addForm:{
                    id:'',
                    userName:'',
                    tel:'',
                    instancyTel:'',
                    password:'',
                    email:'',
                    area:{
                      id:""
                    }
                },
                rules: {
                    userName: [
                        { required: true, message: '请输入人员名称', trigger: 'blur' },
                    ],
                    tel: [
                        { required: true, message: '请输入联系电话', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    instancyTel: [
                        { required: true, message: '请输入紧急联系电话', trigger: 'blur' },
                    ]
                },
                addLoading:false,
                total:'',
                roleList:[],
                sels:[],
                villageList:[],
                villageId:'',
                areaList:[],
                villageName:'',
                dialogVisible:false,
                userList:[],
                listLoading2:false,
                sels2:[],
                bindUserId:'',
                multipleTable2:[],
                multipleTable:[],
                tableData: [],
                detailId:null,
                dialog:false
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
                let para=Object.assign({pageNum: this.pageNum?this.pageNum-1:this.pageNum, pageSize: this.pageSize,},this.filters);
                this.listLoading = true;
                get(url.video.pageKongKaiRecord,para).then((res)=>{
                    this.total = res.totalNum;
                    console.log(res.datas);
                    this.tableData = res.datas;
                    this.listLoading = false;
                }).catch(error=>{
                    console.log(error);
                });
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
                            instance.put(url.user.update, this.addForm).then(result =>{
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
                            instance.post(url.user.add, this.addForm).then(result =>{
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
                                    id:'',
                                    userName:'',
                                    tel:'',
                                    instancyTel:'',
                                    password:'',
                                    email:'',
                                    area:{
                                        id:""
                                    }
                                };
                                this.villageId="";
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
                    deletes(url.video.deleteKongKaiRecord+'?ids='+id).then((res) => {
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
                console.log(row)
                this.dialogAddVisible = true;
                this.addForm = Object.assign({}, row);  //有现获取列表信息
                if(!row.area){
                    let obj={id:''};
                    this.addForm.area=Object.assign({}, obj);
                }else{
                    this.villageId=row.area.village.id;
                    this.getArea();
                }
            },
            //回填详情
            getRoleDeatil(roleId) {
                get(url.fun.getDeatil,{code:roleId}).then((res) => {
                    this.addForm = res;  //有现获取列表信息
                });
            },
            selsChange2: function (sels) {
                this.sels2 = sels;
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let para = { ids: ids };
                    batchRemoveUser(para).then((res) => {
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
            //村组
            getVillage(){
                get(url.task.villageListVillage).then((res)=>{
                    this.villageList = res;
                    console.log(res)
                }).catch(error=>{
                    console.log(error);
                });
            },
            //区域
            getArea(){
                get(url.task.areaListArea+this.villageId).then((res)=>{
                    this.areaList = res;
                }).catch(error=>{
                    console.log(error);
                });
            },
            getAreaFun(selVal){
                this.villageId=selVal.id
                this.getArea()
            },
            //获取人员类型
            getUser(){
                let para=Object.assign({pageNum: 0, pageSize:30,});
                this.listLoading2 = true;
                get(url.role.searchList,para).then((res)=>{
                    // this.total = res.totalNum;
                    this.userList = res.datas;
                    this.listLoading2 = false;
                }).catch(error=>{
                    console.log(error);
                });
            },
            //显示绑定人员类型弹框
            bindType(row){
                var self=this;
                self.bindUserId=row;
                self.dialogVisible=true;
                get(url.user.getBelongRoleList, {userId:row,pageNum:0,pageSize:100}).then(result =>{
                    var arr=[];
                    for(var i=0;i<self.userList.length;i++){
                        for(var j=0;j<result.datas.length;j++){
                            if(self.userList[i].code==result.datas[j].roleCode){
                                arr.push(self.userList[i])
                            }
                        }
                    }
                    console.log(arr);
                    arr.forEach(row => {
                        self.$refs.multipleTable2.toggleRowSelection(row);
                    });
                }).catch(err => {
                    console.log(err);
                }).finally(() => {
                })
            },
            //绑定
            bindTypeSubmit(){
                var userRoleList=[]
                for (var i=0;i<this.sels2.length;i++ ) {
                    var j={
                        userId:this.bindUserId,
                        roleCode:''
                    }
                    j.roleCode = this.sels2[i].code
                    userRoleList.push(j);
                }
                // 创建实例时设置配置的默认值
                var instance = axios.create();
                // 在实例已创建后修改默认值
                instance.defaults.headers.post['Content-Type'] = 'application/json';
                instance.post(url.user.userAddDatas, userRoleList).then(result =>{
                    this.dialogAddVisible = false;
                    this.$message({
                        message: '提交成功',
                        type: 'success',
                        duration: 1000,
                    });
                }).catch(err => {
                    console.log(err);
                }).finally(() => {
                    this.bindUserId="";
                    this.dialogVisible=false;
                })
            },
            //人员详情侧边框
            goDetail(id){
                this.detailId=id;
                this.dialog=true;
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
