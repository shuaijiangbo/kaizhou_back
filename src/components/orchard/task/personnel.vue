<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>果园作业管理</el-breadcrumb-item>
            <el-breadcrumb-item>果园人员管理</el-breadcrumb-item>
            <el-breadcrumb-item>人员管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="background-color: #fff;padding: 10px ;margin-top: 10px;position: absolute;top: 54px;bottom: 20px;right: 10px;left: 10px;">
            <div>
                <span style="font-size: 14px;">村组：</span>
                <el-select v-model="villageName" placeholder="村组"  value-key="id" @change="getAreaFun($event)" style="margin-right: 15px; width: 120px">
                    <el-option label="全部" value=""></el-option>
                    <el-option
                          v-for="item in villageList"
                          :label="item.name" :value="item" :key="item.id"></el-option>
                </el-select>
                <span style="font-size: 14px;" v-if="villageName">区域：</span>
                <el-select v-model="filters.areaName" placeholder="区域" v-if="villageName" style="margin-right: 15px; width: 120px">
                    <el-option label="全部" value=""></el-option>
                    <el-option
                          v-for="item in areaList"
                          :label="item.name" :value="item.name"></el-option>
                </el-select>
                <el-input v-model="filters.userName" placeholder="请输入人员名称" style="width: 215px;"></el-input>
                <el-button type="primary" style="margin-left: 15px;" @click="seachRole">搜索</el-button>
                <span class="dz-zz-right-btn-box">
                    <el-button type="primary" @click="addRoleDialogShow"><i class="el-icon-lx-add"></i>&nbsp;新增</el-button>
                    <!--<el-button type="danger" @click="batchRemove"><i class="el-icon-lx-delete"></i>&nbsp;批量删除</el-button>-->
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
                          label="人员照片">
                        <template slot-scope="scope">
                            <span v-if="scope.row.headPortraitUrl!=null&&scope.row.headPortraitUrl!=''">
                                <img :src="scope.row.headPortraitUrl" alt="" style="width: 105px;">
                            </span>
                            <span v-else>
                                <img src="@/assets/img/headimg.png" alt="">
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                          label="人员名称">
                        <template slot-scope="scope">
                            <span class="dz-detail-btn" @click="goDetail(scope.row.id)">{{scope.row.userName}} <i class="el-icon-caret-right" v-if="scope.row.userName"></i></span>
                        </template>
                    </el-table-column>
                    <el-table-column
                          label="账号" prop="account">
                    </el-table-column>
                    <el-table-column
                          label="联系电话"
                          prop="tel">
                    </el-table-column>
                    <el-table-column
                          label="紧急联系电话"
                          prop="instancyTel">
                    </el-table-column>
                    <el-table-column
                          label="所属村组">
                        <template slot-scope="scope">
                            <span v-if="scope.row.area!=null" class="dz-detail-btn" @click="goDetail2(scope.row.area.village.id)">{{scope.row.area.village.name}}<i class="el-icon-caret-right"></i></span>
                        </template>
                    </el-table-column>
                    <el-table-column
                          label="所属区域">
                        <template slot-scope="scope">
                            <span v-if="scope.row.area">{{scope.row.area.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                          label="操作"
                          width="380">
                        <template slot-scope="scope">
                            <el-button
                                  type="success"
                                  size="mini"
                                  @click="bindType(scope.row.id)">人员类型</el-button>
                            <el-button
                                  type="warning"
                                  size="mini"
                                  @click="showReset=true;passwordForm.userId=scope.row.id">重置密码</el-button>
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
        <el-dialog  :title="addForm.id ? '编辑人员' : '新增人员'" :visible.sync="dialogAddVisible" :close-on-click-modal="false" width="50%" :before-close="addRoleDialogHide">
            <el-form :model="addForm"  :rules="rules" ref="addForm">
                <el-form-item label="人员照片" :label-width="formLabelWidth">
                    <el-upload
                          class="avatar-uploader"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="人员名称" :label-width="formLabelWidth" prop="userName">
                    <el-input v-model="addForm.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="账号" :label-width="formLabelWidth" prop="account" v-show="!addForm.id">
                    <el-input v-model="addForm.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth"  prop="password" v-show="!addForm.id">
                    <el-input v-model="addForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" :label-width="formLabelWidth"  prop="tel">
                    <el-input v-model="addForm.tel" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="紧急联系电话" :label-width="formLabelWidth"  prop="instancyTel">
                    <el-input v-model="addForm.instancyTel" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth"  prop="email">
                    <el-input v-model="addForm.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属村组" :label-width="formLabelWidth">
                    <el-select v-model="villageId" @change="getArea" style="width: 100%">
                        <el-option
                              v-for="item in villageList"
                              :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属区域" :label-width="formLabelWidth" style="width: 100%" v-if="villageId">
                    <el-select v-model="addForm.area.id"  style="width: 100%">
                        <el-option
                              v-for="item in areaList"
                              :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialogHide">取 消</el-button>
                <el-button type="primary" @click="addSubmit"  :loading="addLoading">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog  title="绑定人员类型" :visible.sync="dialogVisible" :close-on-click-modal="false" width="50%" :before-close="addRoleDialogHide">
            <el-table
                  ref="multipleTable2"
                  :data="userList"
                  tooltip-effect="dark"
                  style="width: 100%;"
                  border
                  v-loading="listLoading2"
                  @selection-change="selsChange2">
                <el-table-column
                      type="selection"
                      width="55">
                </el-table-column>
                <el-table-column
                      prop="name"
                      label="人员类型">
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialogHide">取 消</el-button>
                <el-button type="primary" @click="bindTypeSubmit"  :loading="addLoading">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog  title="重置密码" :visible.sync="showReset" :close-on-click-modal="false" width="50%" :before-close="addRoleDialogHide">
            <el-form :model="passwordForm"  :rules="passwordRules" ref="passwordForm">
                <el-form-item label="新密码" :label-width="formLabelWidth" prop="password">
                    <el-input v-model="passwordForm.password" autocomplete="off" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth"  prop="passwordConfirm">
                    <el-input v-model="passwordForm.passwordConfirm" autocomplete="off"  type="password"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialogHide">取 消</el-button>
                <el-button type="primary" @click="resetPassword"  :loading="addLoading">确 定</el-button>
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
              title="村组信息"
              :visible.sync="dialogV"
              direction="rtl"
              destroy-on-close>
            <detail-v :id="detailIdV"></detail-v>
        </el-drawer>

    </div>
</template>

<script>
    import axios from 'axios';
    import {get, post,put,deletes} from '@/api/fetch.js';
    import url from '@/api/serviceAPI.config.js';
    import detail from '@/components/common/personDetail';
    import detailV from '@/components/common/villageDetail'
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
                    userName: '',
                    villageName:'',
                    areaName:''
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
                    account:[
                        { required: true, message: '请输入账号', trigger: 'blur' },
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
                userRoleFull:false,
                userRoleList:[],
                showReset:false,
                passwordForm:{
                    password:'',
                    passwordConfirm:'',
                    userId:""
                },
                passwordRules: {
                    password: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                    ],
                    passwordConfirm: [
                        { required: true, message: '请确认密码', trigger: 'blur' },
                    ]
                },
                imageUrl: '',
                detailId:null,
                dialog:false,
                dialogV:false,
                detailIdV:null
            }
        },
        components: {
            detail,detailV
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
            this.getVillage();
            this.getUser();
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
                this.filters.villageName=this.villageName.name;
                let para=Object.assign({pageNum: this.pageNum?this.pageNum-1:this.pageNum, pageSize: this.pageSize,},this.filters);
                this.listLoading = true;
                get(url.user.searchList,para).then((res)=>{
                    this.total = res.totalNum;
                    this.roleList = res.datas;
                    this.listLoading = false;
                }).catch(error=>{
                    console.log(error);
                });
            },
            //显示添加村组弹框
            addRoleDialogShow(){
                if(!this.addForm.id){
                    this.villageId=""
                }
                this.imageUrl="";
                this.dialogAddVisible=true;
            },
            //隐藏添加村组弹框
            addRoleDialogHide(){
                if(this.dialogAddVisible){
                    this.$refs.addForm.clearValidate();
                    this.dialogAddVisible=false;
                }
                this.dialogVisible=false;
                this.showReset=false;
                this.addForm={
                    id:'',
                    userName:'',
                    tel:'',
                    instancyTel:'',
                    password:'',
                    email:'',
                    account:'',
                    area:{
                        id:""
                    }
                };
                this.passwordForm={
                    password:'',
                    passwordConfirm:'',
                    userId:""
                },
                this.sels2=[];
                this.$refs.multipleTable2.clearSelection();
            },
            //上传头像
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isJPG2 = file.type === 'image/png';
                const isJPG3 = file.type === 'image/gif';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG&&!isJPG2&&!isJPG3) {
                    this.$message.error('上传头像图片只能是 JPG/PNG/GIF 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                this.addForm.files=file;
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
                    this.imageUrl  = e.target.result;
                }
            },
            // 新增/编辑 提交事件
            addSubmit: function () {
                // 创建实例时设置配置的默认值
                var instance = axios.create();
                // 在实例已创建后修改默认值
                instance.defaults.headers.post['Content-Type'] = 'multipart/form-data'
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                            var formDate = new FormData();
                            formDate.append('file',this.addForm.files);
                        // 创建实例时设置配置的默认值
                        if (this.addForm.id) { // 修改
                            // 在实例已创建后修改默认值
                            this.addLoading = true;
                            instance.put(url.user.update+'?id='+this.addForm.id+'&userName='+this.addForm.userName+'&account='+this.addForm.account+'&tel='+this.addForm.tel+'&instancyTel='+this.addForm.instancyTel+'&password='+this.addForm.password+'&email='+this.addForm.email+'&area.id='+this.addForm.area.id,formDate).then(result =>{
                                this.dialogAddVisible = false;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success',
                                    duration: 1000,
                                });
                                this.getRole()
                                this.$refs.addForm.clearValidate();
                                this.dialogAddVisible=false;
                            }).catch(err => {
                                console.log(err);
                            }).finally(() => {
                                this.addLoading = false;
                            })
                        } else { // 新增
                            // 在实例已创建后修改默认值
                            instance.post(url.user.findConfirmRepeat,{account:this.addForm.account}).then(res =>{
                                if(res.data.data=='exist'){
                                    this.$message.error('该账号已存在！')
                                    this.addLoading = false;
                                }else{
                                    this.addLoading = true;
                                    instance.post(url.user.add+'?id='+this.addForm.id+'&userName='+this.addForm.userName+'&account='+this.addForm.account+'&tel='+this.addForm.tel+'&instancyTel='+this.addForm.instancyTel+'&password='+this.addForm.password+'&email='+this.addForm.email+'&area.id='+this.addForm.area.id, formDate).then(result =>{
                                        console.log(result)
                                        if(result.data.msg=="ok") {
                                            this.dialogAddVisible = false;
                                            this.$message({
                                                message: '提交成功',
                                                type: 'success',
                                                duration: 1000,
                                            });
                                            this.addForm = {
                                                id: '',
                                                userName: '',
                                                tel: '',
                                                instancyTel: '',
                                                password: '',
                                                email: '',
                                                area: {
                                                    id: ""
                                                }
                                            };
                                            this.villageId = "";
                                            this.$refs.addForm.clearValidate();
                                            this.dialogAddVisible=false;
                                        }else{
                                            this.$message.error(result.msg)
                                        }
                                    }).catch(err => {
                                        console.log(err);
                                    }).finally(() => {
                                        this.addLoading = false;
                                        this.getRole();
                                    })
                                }
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
                    deletes(url.user.delete+id).then((res) => {
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
                this.imageUrl=row.headPortraitUrl;
                this.addForm = Object.assign({}, row);  //有现获取列表信息
                if(!row.area){
                    let obj={id:''};
                    this.addForm.area=Object.assign({}, obj);
                }else{
                    this.villageId=row.area.village.id;
                    // this.getArea();
                    get(url.task.areaListArea+this.villageId).then((res)=>{
                        this.areaList = res;
                    }).catch(error=>{
                        console.log(error);
                    });
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
                this.addForm.area.id="";
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
                    this.userRoleList=result.datas;
                    var arr=[];
                    for(var i=0;i<self.userList.length;i++){
                        for(var j=0;j<result.datas.length;j++){
                            if(self.userList[i].code==result.datas[j].roleCode){
                                arr.push(self.userList[i])
                            }
                        }
                    }
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
                var userRoleList={
                    userId:this.bindUserId
                };
                userRoleList.roleCode=[]
                for (var i=0;i<this.sels2.length;i++ ) {
                    userRoleList.roleCode.push(this.sels2[i].code);
                }
                // 创建实例时设置配置的默认值
                var instance = axios.create();
                // 在实例已创建后修改默认值
                instance.defaults.headers.post['Content-Type'] = 'application/json';
                instance.post(url.user.saveRole, userRoleList).then(result => {
                    this.dialogAddVisible = false;
                    this.$message({
                        message: '提交成功',
                        type: 'success',
                        duration: 1000,
                    });
                }).catch(err => {
                    console.log(err);
                }).finally(() => {
                    this.bindUserId = "";
                    this.dialogVisible = false;
                    this.$refs.multipleTable2.clearSelection();
                })
            },
            //重置密码
            resetPassword(){
                this.$refs.passwordForm.validate((valid) => {
                    if (valid) {
                        if(this.passwordForm.password.length<6){
                            this.$message.error('密码至少为6位！');
                        }else{
                            if (this.passwordForm.password === this.passwordForm.passwordConfirm) {
                                this.addLoading = true;
                                // 创建实例时设置配置的默认值
                                var instance = axios.create();
                                // 在实例已创建后修改默认值
                                instance.defaults.headers.post['Content-Type'] = 'application/json';
                                instance.post(url.user.resetPassword, this.passwordForm).then(result => {
                                    this.dialogAddVisible = false;
                                    this.$message({
                                        message: '重置密码成功',
                                        type: 'success',
                                        duration: 1000,
                                    });
                                    this.addLoading = false;
                                }).catch(err => {
                                    console.log(err);
                                }).finally(() => {
                                    this.showReset = false;
                                    this.addLoading = false;
                                    this.passwordForm = {
                                        password: '',
                                        passwordConfirm: '',
                                        userId: ""
                                    }
                                })
                            } else {
                                this.$message.error('两次密码输入不一样！');
                            }
                        }
                    }
                })
            },
            //人员详情侧边框
            goDetail(id){
                this.detailId=id;
                this.dialog=true;
            },
            //人员详情侧边框
            goDetail2(id){
                this.detailIdV=id;
                this.dialogV=true;
            }
        },
    }

</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        border: 1px dashed #dddddd;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
        border: 1px dashed #dddddd;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
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
