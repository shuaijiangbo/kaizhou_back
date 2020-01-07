<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>果园作业管理</el-breadcrumb-item>
            <el-breadcrumb-item>果园历史照片</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="background-color: #fff;padding: 10px ;margin-top: 10px;position: absolute;top: 54px;bottom: 20px;right: 10px;left: 10px;overflow-y: scroll">
            <div>
                <div>
                    <div style="margin-bottom: 15px">
                        <div class="dz-pic" style="vertical-align: bottom">
                              <div style="overflow: hidden;    width: 100%;height: 100%;">
                                  <img :src="albumUrl" v-if="albumUrl" alt="" style="width: 100%;">
                                  <img src="@/assets/img/mrpic.png" v-else alt="" style="width: 100%;height: 100%;">
                              </div>
                        </div>
                        <div class="dz-pic2">
                            <div>{{albumName}}</div>
                            <br>
                            <span style="position: relative;z-index: 100;">
                            <el-button type="primary" @click="addRoleDialogShow"><i class="el-icon-lx-add"></i>&nbsp;新增上传</el-button>
                            <el-button type="danger" @click="batchRemove"><i class="el-icon-lx-delete"></i>&nbsp;批量删除</el-button>
                            <el-button type="success" @click="cancleRemove" v-show="isDelete"><i class="el-icon-lx-delete"></i>&nbsp;取消删除</el-button>
                        </span>
                        </div>
                    </div>
                    <el-checkbox-group v-model="checkList">
                        <div v-for="item in photo" style="width: 20%;padding: 10px;margin-left:-10px;margin-right: 10px;float: left;position: relative">
                            <div class="dz-delete" v-if="isDelete">
                                <el-checkbox :label="item.id"></el-checkbox>
                            </div>
                            <div style="border: 1px solid #dddddd;background: #eeee">
                                <div style="height: 220px;    overflow: hidden;">
                                    <el-image
                                          style="width: 100%;height:auto"
                                          :src="item.url"
                                          :preview-src-list="photoList">
                                    </el-image>
                                </div>
                                <div style="font-size: 12px;color: #999999;line-height: 24px;padding: 5px 15px;border-top:1px solid #ddd"><span>{{item.name}}</span><span style="float: right">{{item.createTime}}</span></div>
                            </div>
                        </div>
                    </el-checkbox-group>
                </div>
                <div class="block">
                    <!--<el-pagination-->
                          <!--layout="total, sizes, prev, pager, next, jumper"-->
                          <!--@size-change="handleSizeChange"-->
                          <!--@current-change="handleCurrentChange"-->
                          <!--background-->
                          <!--:page-sizes="[5,10,20,30,40]"-->
                          <!--:page-size="pageSize"-->
                          <!--:total="total">-->
                    <!--</el-pagination>-->
                </div>
            </div>
        </div>
        <el-dialog  title="新增照片" :visible.sync="dialogAddVisible" :close-on-click-modal="false" width="50%" :before-close="addRoleDialogHide">
            <el-form>
            <el-form-item label="照片上传" label-width="80px">
                <el-upload
                      style="padding-left:0px"
                      class="upload-demo"
                      action="admin/zuul/lcloud-elis-rms-gwb/um/rmsAnnex/upload"
                      :before-upload="uploadFile"
                      :on-remove="handleRemove"
                      :before-remove="beforeRemove"
                      multiple
                      :auto-upload="true"
                      ref="upload"
                      :limit="5"
                      :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
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
    import url from '@/api/serviceAPI.config.js'

    export default {
        name: 'photo',
        data() {
            return {
                dialogAddVisible:false,
                formLabelWidth: '80px',
                addLoading:false,
                photoId:null,
                photo:null,
                pageSize: 10,
                pageNum: 0,
                fileList:[],
                files:null,
                formDate:null,
                total:'',
                photoList:[],
                isDelete:false,
                checkList:[],
            }
        },
        components: {

        },
        computed: {
            albumName(){
                return this.$route.query.name
            },
            albumUrl(){
                return this.$route.query.url
            }
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
            getRole(){
                let para=Object.assign({pageNum:this.pageNum, pageSize: this.pageSize,photoId: this.$route.query.id});
                get(url.photo.pictureSearch,para).then((res)=>{
                    this.photo=res.datas;
                    this.photoList=[];
                    for(var i=0;i<res.datas.length;i++){
                        this.photoList.push(res.datas[i].url);
                    }
                    console.log(this.photoList)
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
                    areaSize:''
                }
            },
            // 新增/编辑 提交事件
            addSubmit: function () {
                this.formDate = new FormData();
                this.formDate.append('files',this.files)
                console.log(this.formDate);
                // 创建实例时设置配置的默认值
                var instance = axios.create();
                // 在实例已创建后修改默认值
                instance.defaults.headers.post['Content-Type'] = 'application/json';
                instance.post(url.photo.pictureAdd+'?photoId='+this.$route.query.id, this.formDate).then(result =>{
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
                        var ids = "?";
                        for (var i = 0; i < this.checkList.length; i++) {
                            ids += ('ids=' + this.checkList[i] + "&")
                        }
                        // 创建实例时设置配置的默认值
                        var instance = axios.create();
                        // 在实例已创建后修改默认值
                        instance.defaults.headers.post['Content-Type'] = 'application/json';
                        instance.delete(url.photo.pictureDelete + ids).then((res) => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: '删除成功',
                                    type: 'success',
                                    duration: 1000,
                                });
                                this.getRole();
                            } else {
                                this.$message.warning('删除失败');
                            }
                            this.listLoading = false;
                            this.isDelete = false;
                        }).catch(error => {
                            console.log(error);
                        });
                    })
                }
            },
            //取消删除
            cancleRemove:function() {
                this.isDelete=false;
                this.checkList=[]
            },
            uploadFile(file){
                this.files=file;
                var img={
                    name:file.name
                }
                this.fileList.push(img)
            },
            beforeRemove(){

            },
            handleExceed(){

            },
            handleRemove(){

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
