<template>
      <div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item>果园远程控制</el-breadcrumb-item>
                  <el-breadcrumb-item>水肥一体化</el-breadcrumb-item>
                  <el-breadcrumb-item>联动控制</el-breadcrumb-item>
            </el-breadcrumb>
            <div style="background-color: #fff;padding: 10px ;margin-top: 10px;position: absolute;top: 54px;bottom: 20px;right: 10px;left: 10px;">
                  <div>
                        <span style="font-size: 14px;">状态：</span>
                        <el-select v-model="filters.state" placeholder="状态"  value-key="id" @change="getAreaFun($event)" style="margin-right: 15px; width: 120px">
                              <el-option label="全部" value="" key=""></el-option>
                              <el-option label="启用" value="0" key="0"></el-option>
                              <el-option label="停用" value="1" key="1"></el-option>
                        </el-select>
                        <el-input v-model="filters.name" placeholder="请输入关键字" style="width: 215px;"></el-input>
                        <el-button type="primary" style="margin-left: 15px;" @click="seachRole">搜索</el-button>

                        <span class="dz-zz-right-btn-box">
                        <el-button type="primary" @click="addRoleDialogShow"><i class="el-icon-lx-add"></i>&nbsp;新增</el-button>
                        <el-button type="danger" @click="batchRemove"><i class="el-icon-lx-delete"></i>&nbsp;批量删除</el-button>
                </span>
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
                                    type="selection"
                                    width="55">
                              </el-table-column>
                              <el-table-column
                                    prop="name"
                                    label="联动控制名称">
                              </el-table-column>
                              <el-table-column
                                    prop="duration"
                                    label="联动控制时长(分)">
                              </el-table-column>
                              <el-table-column
                                    label="创建人">
                                    <template slot-scope="scope">
                                          <span class="dz-detail-btn" @click="goDetail(scope.row.createUserId)">{{scope.row.createUserName}} <i class="el-icon-caret-right" v-if="scope.row.createUserName"></i></span>
                                    </template>
                              </el-table-column>
                              <el-table-column
                                    prop="createTime"
                                    label="创建时间">
                              </el-table-column>
                              <el-table-column
                                    label="编辑人">
                                    <template slot-scope="scope">
                                          <span class="dz-detail-btn" @click="goDetail(scope.row.updateUserId)">{{scope.row.updateUserName}} <i class="el-icon-caret-right" v-if="scope.row.updateUserName"></i></span>
                                    </template>
                              </el-table-column>
                              <el-table-column
                                    prop="updateTime"
                                    label="编辑时间">
                              </el-table-column>
                              <el-table-column
                                    prop="description"
                                    label="联动控制描述">
                              </el-table-column>
                              <el-table-column
                                    label="状态">
                                    <template scope="scope">
                                          <span v-if="scope.row.state==0" style="color: green;">启用</span>
                                          <span v-else style="color: red;">停用</span>
                                    </template>
                              </el-table-column>
                              <el-table-column
                                    label="操作"
                                    width="300">
                                    <template scope="scope">
                                          <el-button
                                                size="mini"
                                                type="success"
                                                @click="startOrStop(scope.row.id,0)" v-if="scope.row.state==1"><i class="el-icon-circle-check"></i>&nbsp;启用</el-button>
                                          <el-button
                                                size="mini"
                                                type="warning"
                                                @click="startOrStop(scope.row.id,1)" v-if="scope.row.state==0"><i class="el-icon-circle-close"></i>&nbsp;停用</el-button>
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
            <el-dialog  :title="addForm.id ? '编辑联动控制任务' : '新增联动控制任务'" :visible.sync="dialogAddVisible" :close-on-click-modal="false" width="50%" :before-close="addRoleDialogHide">
                  <el-form :model="addForm"  :rules="rules" ref="addForm">
                        <el-form-item label="联动控制名称" :label-width="formLabelWidth" prop="name">
                              <el-input v-model="addForm.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="联动控制时长" :label-width="formLabelWidth" prop="duration">
                              <el-input v-model="addForm.duration" autocomplete="off">
                                    <i slot="suffix" style="font-style: normal">分</i>
                              </el-input>
                        </el-form-item>
                        <el-form-item label="联动控制描述" :label-width="formLabelWidth" >
                              <el-input v-model="addForm.description" type="textarea" rows="3" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="触发条件" :label-width="formLabelWidth">
                              <el-input v-model="addForm.warningSet" autocomplete="off" v-show="false"></el-input>
                              <el-button type="primary" size="mini" @click="appendCondition">追加</el-button>
                        </el-form-item>
                        <el-table
                              border
                              :data="tableData2"
                              style="width: 100%">
                              <el-table-column
                                    label="站点">
                                    <template slot-scope="scope">
                                          <el-select v-model="scope.row.deviceId" placeholder="请选择" @change="getWarningList(scope.$index,scope.row.deviceId)">
                                                <el-option
                                                      v-for="item in listDevice"
                                                      :key="item.deviceName+item.id"
                                                      :label="item.deviceName"
                                                      :value="item.id">
                                                </el-option>
                                          </el-select>
                                    </template>
                              </el-table-column>
                              <el-table-column
                                    label="指标"
                                    width="180">
                                    <template slot-scope="scope">
                                          <el-select v-model="scope.row.warningSetId" placeholder="请选择">
                                                <el-option
                                                      v-for="item in scope.row.warningSetList"
                                                      :key="item.name+item.id"
                                                      :label="item.name"
                                                      :value="item.id">
                                                </el-option>
                                          </el-select>
                                    </template>
                              </el-table-column>
                              <el-table-column label="条件">
                                    <template slot-scope="scope">
                                          <el-select placeholder="请选择"  v-model="scope.row.conditional">
                                                <el-option v-for="item in options"
                                                           :key="item.value"
                                                           :label="item.label"
                                                           :value="item.value"></el-option>
                                          </el-select>
                                    </template>
                              </el-table-column>
                              <el-table-column
                                    label="指标值">
                                    <template slot-scope="scope">
                                          <el-input v-model="scope.row.warningSetVal"></el-input>
                                    </template>
                              </el-table-column>
                              <el-table-column label="操作" width="80">
                                    <template slot-scope="scope">
                                          <el-button
                                                size="mini"
                                                type="danger"
                                                @click="handleDelete(scope.$index)"
                                                :disabled="tableData2.length>1?false:true"
                                          >删除</el-button>
                                    </template>
                              </el-table-column>
                        </el-table>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                        <el-button @click="addRoleDialogHide">取 消</el-button>
                        <el-button type="primary" @click="addSubmit"  :loading="addLoading">确 定</el-button>
                  </div>
            </el-dialog>
            <el-drawer
                  title="我是标题"
                  :visible.sync="dialog"
                  direction="rtl"
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
                    state:null,
                    name:null
                },
                timeFrame:null,
                dialogAddVisible:false,
                formLabelWidth: '110px',
                addForm:{
                    id:'',
                    name:'',
                    description:'',
                    listLinkageIndex:"",
                    state:1,
                    duration:""
                },
                rules: {
                    name: [
                        { required: true, message: '请输入联动控制名称', trigger: 'blur' },
                    ],
                    duration: [
                        { required: true, message: '请输入联动控制时长', trigger: 'blur' },
                    ]
                },
                addLoading:false,
                total:'',
                roleList:[],
                sels:[],
                dialogVisible:false,
                listDevice:null,
                tableData:[],
                tableData2: [{
                    deviceId:null,
                    conditional:null,
                    warningSetId:null,
                    warningSetVal:null,
                    warningSetList:[]
                }],
                options: [{
                    value: '小于',
                    label: '小于'
                }, {
                    value: '大于',
                    label: '大于'
                }],
                detailId:null,
                dialog:false,
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
            this.getDevideList();
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
            selsChange: function (sels) {
                this.sels = sels;
            },
            //获取村组列表
            getRole(){
                let para=Object.assign({pageNum: this.pageNum?this.pageNum-1:this.pageNum, pageSize: this.pageSize,},this.filters);
                this.listLoading = true;
                get(url.contrl.linkageSearch,para).then((res)=>{
                    this.total = res.totalNum;
                    this.tableData = res.datas;
                    this.listLoading = false;
                }).catch(error=>{
                    console.log(error);
                });
            },
            //显示添加村组弹框
            addRoleDialogShow(){
                this.addForm={
                    id:'',
                    name:'',
                    description:'',
                    listLinkageIndex:"",
                    state:1,
                    duration:''
                },
                    this.dialogAddVisible=true;
            },
            addRoleDialogHide(){
                this.$refs.addForm.resetFields();
                this.dialogAddVisible=false;
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
                        this.addForm.listLinkageIndex=this.tableData2;
                        this.addLoading = true;
                        if (this.addForm.id) { // 修改
                            // 在实例已创建后修改默认值
                            instance.post(url.contrl.linkageUpdate, this.addForm).then(result =>{
                                this.$refs.addForm.resetFields();
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
                                    id:'',
                                    name:'',
                                    description:'',
                                    listLinkageIndex:"",
                                    state:1,
                                    duration:''
                                };
                                this.getRole();
                            })
                        } else { // 新增
                            // 在实例已创建后修改默认值
                            instance.post(url.contrl.linkageAdd, this.addForm).then(result =>{
                                this.$refs.addForm.resetFields();
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
                                    name:'',
                                    description:'',
                                    listLinkageIndex:"",
                                    state:1,
                                    duration:''
                                };
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
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    deletes(url.contrl.linkageDelete+id).then((res) => {
                        this.listLoading = false;
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getRole();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 显示编辑界面
            editRole(row) {
                this.getRoleDeatil(row.id)
                this.dialogAddVisible = true;
            },
            //回填详情
            getRoleDeatil(id) {
                get(url.contrl.linkageView+id).then((res) => {
                    this.addForm = res;  //有现获取列表信息
                    this.tableData2=res.listLinkageIndex;
                    console.log(res)
                });
            },
            //批量删除
            batchRemove: function () {
                if(this.sels.length<1){
                    this.$message.error('请选择需要删除的数据！');
                }else {
                    var ids = this.sels.map(item => item.id).toString();
                    this.$confirm('确认删除选中记录吗？', '提示', {
                        type: 'warning'
                    }).then(() => {
                        this.listLoading = true;
                        let para = { ids: ids };
                        deletes(url.contrl.linkageDeleteBatch + '?ids=' + ids, para).then((res) => {
                            this.listLoading = false;
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getRole();
                        });
                    }).catch(() => {

                    });
                }
            },
            //启用和停用
            startOrStop:function(id,state) {
                post(url.contrl.linkageStartOrStop,{id:id,state:state}).then((res) => {
                    if(res.code==200){
                        this.$message({
                            message: '操作成功！',
                            type: 'success'
                        });
                        this.getRole();
                    }else{
                        this.$message.error('操作失败！')
                    }
                });
            },
            //查询站点
            getDevideList:function() {
                get(url.video.listDevice).then((res) => {
                    this.listDevice=res.data;
                });
            },
            //删除站点
            handleDelete(index, row) {
                this.tableData2.splice(index,1);
            },
            //获取指标
            getWarningList(index,id){
                get(url.video.findByDeviceId,{deviceId:id}).then((res) => {
                    this.tableData2[index].warningSetList=res.data;

                });
            },
            // 追加
            appendCondition(){
                var obj={
                    deviceId:null,
                    conditional:null,
                    warningSetId:null,
                    warningSetVal:null,
                    warningSetList:[]
                }
                this.tableData2.push(obj);
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
