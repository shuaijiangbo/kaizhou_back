<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>果园作业管理</el-breadcrumb-item>
            <el-breadcrumb-item>果园人员管理</el-breadcrumb-item>
            <el-breadcrumb-item>村组管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="background-color: #fff;padding: 10px ;margin-top: 10px;position: absolute;top: 54px;bottom: 20px;right: 10px;left: 10px;">
            <div>
                <el-input v-model="filters.name" placeholder="请输入村组" style="width: 215px;"></el-input>
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
                          label="村组名称"
                          width="150">
                        <template slot-scope="scope">
                            <span class="dz-detail-btn" @click="goDetail2(scope.row.id)">{{scope.row.name}} <i class="el-icon-caret-right"></i></span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="村组面积(亩)"
                    width="100">
                        <template slot-scope="scope">
                            <span>{{(Number(scope.row.areaSize)/666.67).toFixed(2)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                          label="组长"
                          width="100">
                          <template slot-scope="scope">
                                <span class="dz-detail-btn" @click="goDetail(scope.row.userId)">{{scope.row.userName}} <i class="el-icon-caret-right" v-if="scope.row.userName"></i></span>
                          </template>
                    </el-table-column>
                    <el-table-column
                          label="组长联系方式"
                          width="150"
                          prop="userTel">
                    </el-table-column>
                    <el-table-column
                          prop="userTelInstancy"
                          width="150"
                          label="紧急联系方式">
                    </el-table-column>
                      <el-table-column
                            width="100"
                            label="村组人员">
                            <template slot-scope="scope">
                                  <span class="dz-detail-btn" @click="goDetail3(scope.row.id)">{{scope.row.num}} <i class="el-icon-caret-right" v-if="scope.row.num>0"></i></span>
                            </template>
                      </el-table-column>
                    <el-table-column
                          prop="description"
                          label="村组描述">
                    </el-table-column>

                    <el-table-column
                          label="操作"
                          width="420"
                          show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button
                                  size="mini"
                                  type="primary"
                                  @click="goLook(scope.row.id)"><i class="el-icon-lx-edit"></i>&nbsp;查看村组范围</el-button>
                            <el-button
                                  size="mini"
                                  type="primary"
                                  @click="teamManage(scope.row.id)"><i class="el-icon-lx-edit"></i>&nbsp;成员管理</el-button>
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
        <el-dialog  :title="addForm.id ? '编辑村组' : '新增村组'" :visible.sync="dialogAddVisible" :close-on-click-modal="false" width="50%" top="50px" :before-close="addRoleDialogHide">
            <el-form :model="addForm"  :rules="rules" ref="addForm">
                <el-form-item label="村组名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="addForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="组长" :label-width="formLabelWidth"  prop="userId">
                    <el-select v-model="addForm.userId"  style="width: 100%">
                        <el-option
                              v-for="item in userList"
                              :label="item.userName" :value="item.userId" :key="item.userId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="村组描述" :label-width="formLabelWidth"  prop="description">
                    <el-input type="textarea" v-model="addForm.description" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="村组范围" :label-width="formLabelWidth"  prop="scope">
                    <el-input v-model="addForm.scope" autocomplete="off" v-show="false" style="width: 80px;height: 10px;" ></el-input>
                    <el-button type="success" @click="clearFeatures" style="float: right" v-if="redraw">清除重画村组</el-button>
                      <!--<el-button type="success" @click="modifFeatures" style="float: right">编辑村组区域</el-button>-->
                </el-form-item>
            </el-form>

            <div id="map" style="width:100%;height:450px;"></div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialogHide">取 消</el-button>
                <el-button type="primary" @click="addSubmit"  :loading="addLoading">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog  title="成员管理" :visible.sync="dialogVisible" :close-on-click-modal="false" width="50%" :before-close="addRoleDialogHide">
              <div style="margin-bottom: 15px;">
                    <span>区域：</span>
                    <el-select v-model="areaId" >
                          <el-option
                                v-for="item in areaList"
                                :label="item.name" :value="item.id" :key="item.name+item.id"></el-option>
                    </el-select>
              </div>
            <div style="text-align: center">
                <el-transfer
                      style="text-align: left; display: inline-block"
                      v-model="value4"
                      filterable
                      :titles="['空闲成员', '已有人员']"
                      :button-texts="['删除', '添加']"
                      :format="{
                        noChecked: '${total}',
                        hasChecked: '${checked}/${total}'
                      }"
                      @change="handleChange"
                      :data="data">
                    <span slot-scope="{ option }">{{ option.label }}</span>
                </el-transfer>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialogHide">取 消</el-button>
                <el-button type="primary" @click="bindTypeSubmit"  :loading="addLoading">确 定</el-button>
            </div>
        </el-dialog>
          <el-drawer
                title="人员类型"
                :visible.sync="dialog"
                direction="rtl"
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
          <el-drawer
                title="已有人员信息"
                :visible.sync="dialogP"
                direction="rtl"
                destroy-on-close>
                <detail-p :id="detailIdP"  :type="'village'"></detail-p>
          </el-drawer>
    </div>
</template>

<script>
    import axios from 'axios';
    import {get, post,put,deletes} from '@/api/fetch.js';
    import url from '@/api/serviceAPI.config.js'
    import detail from '@/components/common/personDetail'
    import detailV from '@/components/common/villageDetail'
    import detailP from '@/components/common/villagePersonDetail'
    export default {
        name: 'village',
        data() {
            return {
                data: null,
                value4: [],
                superMap:null,
                input:'',
                tableHeight:  document.body.clientHeight-255,
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
                    scope:'',
                    description:'',
                    userId:'',
                    areaSize:''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入村组名称', trigger: 'blur' },
                    ],
                    scope: [
                        { required: true, message: '请画出村组范围', trigger: 'blur' },
                    ],
                    description: [
                        { required: true, message: '请输入村组说明', trigger: 'blur' },
                    ],
                    userId: [
                        { required: true, message: '请选择组长', trigger: 'change' },
                    ],
                },
                addLoading:false,
                total:'',
                roleList:[],
                sels:[],
                userList:[],
                dialogVisible:false,
                listLoading2:false,
                redraw:false,
                modifyCtrl:null,
                control:null,
                userNoList:[],
                userAll:[],
                userAreaArr:[],
                areaList:[],
                areaId:'',
                villageId:null,
                dialog:false,
                detailId:null,
                dialogV:false,
                detailIdV:null,
                dialogP:false,
                detailIdP:null,
            }
        },
        components: {
            detail,detailV,detailP
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
            this.getGropLeader();
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
            getRole() {
                let para = Object.assign({
                    pageNum: this.pageNum ? this.pageNum - 1 : this.pageNum,
                    pageSize: this.pageSize,
                }, this.filters);
                this.listLoading = true;
                get(url.task.villageSearch, para).then((res) => {
                    this.total = res.totalNum;
                    this.roleList = res.datas;
                    this.listLoading = false;
                }).catch(error => {
                    console.log(error);
                });
            },
            //显示添加村组弹框
            addRoleDialogShow() {
                this.dialogAddVisible = true;
                var self = this;
                setTimeout(function() {
                    //加载地图
                    self.superMap = map.init("map");//容器的ID
                    self.drawPlan(self);
                }, 1000);
            },
            //隐藏添加村组弹框
            addRoleDialogHide() {
                this.dialogAddVisible = false;
                this.dialogVisible = false;
                this.addForm = {
                    name: '',
                    scope: '',
                    description: '',
                    userId: '',
                    areaSize: ''
                }
                this.superMap.map.destroy();
            },
            // 新增/编辑 提交事件
            addSubmit: function() {
                // 创建实例时设置配置的默认值
                var instance = axios.create();
                // 在实例已创建后修改默认值
                instance.defaults.headers.post['Content-Type'] = 'application/json';
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        // 创建实例时设置配置的默认值e
                        this.addLoading = true;
                        if (this.addForm.id) { // 修改
                            // 在实例已创建后修改默认值
                            instance.post(url.task.villageUpdate, this.addForm).then(result => {
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
                                this.addForm = {
                                    name: '',
                                    scope: '',
                                    description: '',
                                    userId: '',
                                    areaSize: ''
                                };
                                this.$refs.addForm.clearValidate();
                                this.superMap.map.destroy();
                            })
                        } else { // 新增
                            // 在实例已创建后修改默认值
                            instance.post(url.task.villageAdd, this.addForm).then(result => {
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
                                this.addForm = {
                                    name: '',
                                    scope: '',
                                    description: '',
                                    userId: '',
                                    areaSize: ''
                                };
                                this.$refs.addForm.clearValidate();
                                this.superMap.map.destroy();
                            })
                        }
                    }
                });

            },
            //搜索
            seachRole: function() {
                this.getRole();
            },
            //删除
            deleteRole: function(id) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    deletes(url.task.villageDelete + id).then((res) => {
                        if (res.msg == 'ok') {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                        } else {
                            this.$message.error('该村组下有区域，不可删除');
                        }
                        this.listLoading = false;
                        this.getRole();
                    });
                }).catch(() => {

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
                this.redraw = true;
                get(url.task.villageView + id).then((res) => {
                    this.addForm = res;  //有现获取列表信息
                    var self = this;
                    setTimeout(function() {
                        //加载地图
                        self.superMap = map.init("map");//容器的ID
                        var obj = {
                            vectorLayer: self.superMap.vectorLayer,
                            data: [
                                {
                                    name: res.name,
                                    color: "#1E9FFF",
                                    // lonLat: JSON.stringify(res.scope)
                                    lonLat: eval('(' + res.scope + ')')
                                }
                            ]
                        }
                        //绘制面
                        kaizhou.polygon(obj);
                        if (obj.data.length > 0) {
                            self.superMap.map.panTo(new SuperMap.LonLat(obj.data[0].lonLat[0].lon, obj.data[0].lonLat[0].lat));
                        }
                    }, 1000);
                });
            },
            selsChange: function(sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function() {
                if(this.sels.length>0) {
                    var ids = this.sels.map(item => item.id).toString();
                    this.$confirm('确认删除选中记录吗？', '提示', {
                        type: 'warning'
                    }).then(() => {
                        this.listLoading = true;
                        let para = { ids: ids };
                        deletes(url.task.villageDeleteBatch + '?ids=' + ids, para).then((res) => {
                            if (res.msg == 'ok') {
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                            } else {
                                this.$message.error('该村组下有区域，不可删除');
                            }
                            this.listLoading = false;
                            this.getRole();
                        });
                    }).catch(() => {

                    });
                }else{
                    this.$message.error('请先选择需要删除的数据！');
                }
            },
            //组长
            getGropLeader: function() {
                get(url.user.fetchUserByRole).then((res) => {
                    this.userList = res.data;  //有现获取列表信息
                });
            },
            //查看地图
            goLook(id) {
                this.$router.push({ path: '/map', query: { id: id } });
            },
            // 清除绘制面
            clearFeatures() {
                var self = this;
                var clearFeatures = kaizhou.clear(self.superMap);
                self.drawPlan(self);
                this.redraw = false;
            },
            // 编辑绘制面
            modifFeatures(){
                this.modifyCtrl.deactivate();
                this.modifyCtrl.activate();
            },
            //画面及计算面积
            drawPlan(self){
                //监听 measure 和 measurepartial 两个事件，量算完成时触发时
                //量算完成时触发 measure 事件，当点被添加到量算过程中时触发 measurepartial
                var control = new SuperMap.Control.Measure(SuperMap.Handler.Polygon,{persist:true});
                control.events.on({
                    "measure": function(event) {
                        var component=event.geometry.components[0].components;
                        var lonLat=[];
                        for(var i=0;i<component.length;i++){
                            lonLat.push({lon:component[i].x,lat:component[i].y});
                        }
                        console.log(JSON.stringify(lonLat));
                        self.addForm.scope=JSON.stringify(lonLat);
                        self.addForm.areaSize=(event.measure).toFixed(2);
                    }
                });
                //添加控件到 map 上
                self.superMap.map.addControl(control);
                //激活控件
                control.activate();
            },
            //强制刷新
            reload(){
                this.$forceUpdate();
            },
            //成员管理
            teamManage(id) {
                var self=this;
                self.villageId=id;
                //区域
                get(url.task.areaListArea+id ).then((res) => {
                    this.areaList=res;
                        self.$nextTick(function() {
                            //已有的成员
                            get(url.task.villageTeam, { villageId: id }).then((res) => {
                                this.userList = res.data;  //有现获取列表信息
                                for(var a=0;a<this.userList.length;a++){
                                    this.value4.push(this.userList[a].userId);
                                }
                                self.$nextTick(function() {
                                    //未分组的成员
                                    get(url.task.listUserVoByVillageId, { villageId: id }).then((res) => {
                                        this.userNoList = res.data;  //有现获取列表信息
                                        self.$nextTick(function() {
                                            this.userAll=this.userList.concat(this.userNoList);
                                            this.data=[];
                                            for(var i=0;i<this.userAll.length;i++){
                                                var obj={
                                                    key:this.userAll[i].userId,
                                                    label:this.userAll[i].userName,
                                                    areaId:this.userAll[i].areaId?this.userAll[i].areaId:"",
                                                }
                                                this.data.push(obj)
                                            }
                                            this.listLoading2 = true;
                                            this.dialogVisible = true;
                                        })
                                    });
                                })
                            });
                        })
                })
            },
            handleChange(value, direction, movedKeys) {
                this.userAreaArr=[];
                for(var i=0;i<this.userAll.length;i++){
                    for(var j=0;j<value.length;j++) {
                        if (this.userAll[i].userId == value[j]) {
                            var obj = {
                                userId: this.userAll[i].userId,
                                areaId: this.userAll[i].areaId
                            }
                            this.userAreaArr.push(obj);
                        }
                    }
                }
            },
            //成员绑定
            bindTypeSubmit(){
                for(var i=0;i<this.userAreaArr.length;i++){
                    if(this.userAreaArr[i].areaId==""){
                       if(this.areaId==""){
                           this.$message.error('请先选择区域！')
                       }else{
                           this.userAreaArr[i].areaId=this.areaId;
                       }
                    }
                }
                this.addLoading=true;
                // 创建实例时设置配置的默认值
                var instance = axios.create();
                // 在实例已创建后修改默认值
                instance.defaults.headers.post['Content-Type'] = 'application/json';
                instance.post(url.task.villageUpdateUserArea+'?villageId='+this.villageId,this.userAreaArr).then((res) => {
                    if(res.status==200){
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1000,
                        });
                        this.dialogVisible = false;
                        this.addLoading=false;
                    }
                });
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
            },
            goDetail3(id){
                this.detailIdP=id;
                this.dialogP=true;
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
