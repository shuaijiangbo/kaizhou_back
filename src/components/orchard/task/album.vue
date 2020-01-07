<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>果园作业管理</el-breadcrumb-item>
            <el-breadcrumb-item>果园历史照片</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="background-color: #fff;padding: 10px ;margin-top: 10px;position: absolute;top: 54px;bottom: 20px;right: 10px;left: 10px;overflow-y: scroll">
            <div>
                <span class="dz-zz-right-btn-box" style="position: relative;z-index: 100;">
                    <el-button type="primary" @click="addRoleDialogShow"><i class="el-icon-lx-add"></i>&nbsp;新增</el-button>
                    <el-button type="danger" @click="batchRemove" :loading="listLoading"><i class="el-icon-lx-delete"></i>&nbsp;批量删除</el-button>
                    <el-button type="success" @click="cancleRemove" v-show="isDelete"><i class="el-icon-lx-delete"></i>&nbsp;取消删除</el-button>
                </span>
            </div>
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="全部" name="first">
                    <el-checkbox-group v-model="checkList">
                        <div class="dz-album-container">
                            <div>
                                <span style="font-size:22px;">任务</span>&nbsp;&nbsp;<span style="font-size: 14px;">{{taskPhoto.length}}个</span>
                            </div>
                            <div class="dz-content">
                                <div v-for="item in taskPhoto" class="dz-box" @click="goPhoto(item)">
                                    <div class="dz-delete" v-if="isDelete">
                                        <el-checkbox :label="item.id"></el-checkbox>
                                    </div>
                                    <div class="dz-img">
                                        <img :src="item.photographUrl" v-if="item.photographUrl!=null" alt="">
                                        <img v-else src="@/assets/img/mrpic.png" alt="">
                                        <span class="dz-num">{{item.num}}</span>
                                    </div>
                                    <div class="dz-title">{{item.name}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="dz-album-container">
                            <div>
                                <span style="font-size:22px;">其他</span>&nbsp;&nbsp;<span style="font-size: 14px;">{{themePhoto.length}}个</span>
                            </div>
                            <div class="dz-content">
                                <div v-for="item in themePhoto" class="dz-box"  @click="goPhoto(item)">
                                    <div class="dz-delete" v-if="isDelete">
                                        <el-checkbox :label="item.id"></el-checkbox>
                                    </div>
                                    <div class="dz-img">
                                        <img :src="item.photographUrl" v-if="item.photographUrl!=null" alt="">
                                        <img v-else src="@/assets/img/mrpic.png" alt="">
                                        <span class="dz-num">{{item.num}}</span>
                                    </div>
                                    <div class="dz-title">{{item.name}}</div>
                                </div>
                            </div>
                        </div>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane label="任务相册" name="second">
                    <div class="dz-album-container">
                        <div>
                            <span style="font-size:22px;">任务</span>&nbsp;&nbsp;<span style="font-size: 14px;">{{taskPhoto.length}}个</span>
                        </div>
                        <div class="dz-content">
                            <div v-for="item in taskPhoto" class="dz-box"  @click="goPhoto(item)">
                                <div class="dz-delete" v-if="isDelete">
                                    <el-checkbox :label="item.id"></el-checkbox>
                                </div>
                                <div class="dz-img">
                                    <img :src="item.photographUrl" v-if="item.photographUrl!=null" alt="">
                                    <img v-else src="@/assets/img/mrpic.png" alt="">
                                    <span class="dz-num">{{item.num}}</span>
                                </div>
                                <div class="dz-title">{{item.name}}</div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="其他相册" name="fourth">
                    <div class="dz-album-container">
                        <div>
                            <span style="font-size:22px;">其他</span>&nbsp;&nbsp;<span style="font-size: 14px;">{{themePhoto.length}}个</span>
                        </div>
                        <div class="dz-content">
                            <div v-for="item in themePhoto" class="dz-box"  @click="goPhoto(item)">
                                <div class="dz-delete" v-if="isDelete">
                                    <el-checkbox :label="item.id"></el-checkbox>
                                </div>
                                <div class="dz-img">
                                    <img :src="item.photographUrl" v-if="item.photographUrl!=''" alt="">
                                    <img v-else src="@/assets/img/mrpic.png" alt="">
                                    <span class="dz-num">{{item.num}}</span>
                                </div>
                                <div class="dz-title">{{item.name}}</div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog  title="新增相册" :visible.sync="dialogAddVisible" :close-on-click-modal="false" width="50%" :before-close="addRoleDialogHide">
            <el-form :model="addForm"  :rules="rules" ref="addForm">
                <el-form-item label="相册名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="addForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="相册类型" :label-width="formLabelWidth" prop="type">
                    <el-select v-model="addForm.type" placeholder="发布状态"  style="margin-right: 15px;width: 100%">
                        <el-option label="任务" value="任务"></el-option>
                        <el-option label="其他" value="其他"></el-option>
                        <!--<el-option label="未发布" value="0"></el-option>-->
                    </el-select>
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
        name: 'village',
        data() {
            return {
                activeName: 'first',
                dialogAddVisible:false,
                formLabelWidth: '80px',
                addForm:{
                    name:'',
                    type:''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入相册名称', trigger: 'blur' },
                    ],
                    type: [
                        { required: true, message: '请选择相册类型', trigger: 'change' },
                    ],
                },
                addLoading:false,
                themePhoto:[],
                taskPhoto:[],
                checkList:[],
                isDelete:false,
                listLoading:false,
            }
        },
        components: {

        },
        computed: {
        },
        created(){
            this.getRole('任务');
            this.getRole('其他')
        },
        activated(){
        },
        deactivated(){
        },
        mounted(){
        },
        methods: {
            getRole(type){
                let para=Object.assign({type:type});
                get(url.photo.photoSearch,para).then((res)=>{
                    if(type=='其他') {
                        this.themePhoto = res.data
                    }else if(type=='任务'){
                        this.taskPhoto = res.data
                    }
                }).catch(error=>{
                    console.log(error);
                });
            },
            //显示添加村组弹框
            addRoleDialogShow(){
                this.dialogAddVisible=true;
            },
            //隐藏添加村组弹框
            addRoleDialogHide(){
                this.dialogAddVisible=false;
                this.addForm={
                    name:'',
                    scope:'',
                    description:'',
                    userId:'',
                    areaSize:'',
                }
            },
            // 新增/编辑 提交事件
            addSubmit: function () {
                // 创建实例时设置配置的默认值
                var instance = axios.create();
                // 在实例已创建后修改默认值
                instance.defaults.headers.post['Content-Type'] = 'application/json';
                // 在实例已创建后修改默认值
                instance.post(url.photo.photoAdd, this.addForm).then(result =>{
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
                    this.getRole('任务');
                    this.getRole('其他')
                    this.addForm = {
                        name: '',
                        type:''
                    };
                    this.$refs.addForm.clearValidate();
                })
            },
            //批量删除
            batchRemove:function() {
                if(this.checkList.length<1){
                    this.isDelete=true;
                }else{
                    this.$confirm('确认删除吗?', '提示', {
                        type: 'warning'
                    }).then(() => {
                        this.listLoading = true;
                        var ids="?";
                        for(var i=0;i<this.checkList.length;i++){
                            ids+=('ids='+this.checkList[i]+"&")
                        }
                        // 创建实例时设置配置的默认值
                        var instance = axios.create();
                        // 在实例已创建后修改默认值
                        instance.defaults.headers.post['Content-Type'] = 'application/json';
                        instance.delete(url.photo.photoDelete+ids).then((res)=>{
                            if(res.data.code==200){
                                this.$message({
                                    message: '删除成功',
                                    type: 'success',
                                    duration: 1000,
                                });
                                this.getRole('任务');
                                this.getRole('其他');
                            }else{
                                this.$message.warning('删除失败');
                            }
                            this.listLoading = false;
                            this.isDelete = false;
                        }).catch(error=>{
                            console.log(error);
                        });
                    }).catch(() => {

                    });
                }
            },
            //取消删除
            cancleRemove:function() {
                this.isDelete=false;
                this.checkList=[]
            },
            //查看照片
            goPhoto:function(item) {
                this.$router.push({path:'/album/photo',query:{id:item.id,name:item.name,url:item.photographUrl}})
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
