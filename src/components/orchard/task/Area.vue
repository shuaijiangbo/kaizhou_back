<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>果园作业管理</el-breadcrumb-item>
            <el-breadcrumb-item>果园区域管理</el-breadcrumb-item>
            <el-breadcrumb-item>区域管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="background-color: #fff;padding: 10px ;margin-top: 10px;position: absolute;top: 54px;bottom: 20px;right: 10px;left: 10px;">
            <div>
                <el-input v-model="filters.name" placeholder="请输入关键字进行查询" style="width: 215px;"></el-input>
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
                          prop="name"
                          label="区域名称">
                    </el-table-column>
                    <el-table-column
                          label="区域类型"
                          prop="type">
                        <template slot-scope="scope">
                            {{scope.row.type.name}}
                        </template>
                    </el-table-column>
                    <el-table-column
                          label="区域面积(亩)"
                          width="150">
                        <template slot-scope="scope">
                            <span>{{(Number(scope.row.areaSize)/666.67).toFixed(2)}}</span>
                        </template>
                    </el-table-column>
                      <el-table-column
                            label="所属村组">
                          <template slot-scope="scope">
                              <span class="dz-detail-btn" @click="goDetail2(scope.row.village.id)">{{scope.row.village.name}}<i class="el-icon-caret-right"></i></span>
                          </template>
                      </el-table-column>
                    <el-table-column
                          label="区域人员">
                        <template slot-scope="scope">
                            <span class="dz-detail-btn" @click="goDetail(scope.row.id)">{{scope.row.num}}<i class="el-icon-caret-right" v-if="scope.row.num>0"></i></span>
                        </template>
                    </el-table-column>
                    <el-table-column
                          prop="createTime"
                          label="创建时间">
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
        <el-dialog  :title="addForm.id ? '编辑区域' : '新增区域'" :visible.sync="dialogAddVisible" :close-on-click-modal="false" width="50%" top="50px" :before-close="addRoleDialogHide">
            <el-form :model="addForm"  :rules="rules" ref="addForm">
                <el-form-item label="区域名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="addForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属区域类型" :label-width="formLabelWidth"  prop="type">
                    <el-select v-model="addForm.type.id"  style="width: 100%">
                        <el-option
                              v-for="item in areaList"
                              :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属村组" :label-width="formLabelWidth"  prop="village">
                    <el-select v-model="addForm.village.id"   style="width: 100%">
                        <el-option
                              v-for="item in villageList"
                              :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="区域范围" :label-width="formLabelWidth"  prop="scope">
                    <el-input v-model="addForm.scope" autocomplete="off" v-show="false" style="width: 80px;height: 10px;" ></el-input>
                    <el-button type="success" @click="clearFeatures" style="float: right" v-if="redraw">清除重画</el-button>
                </el-form-item>
                <div id="map" style="width: 100%;height:450px"></div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialogHide">取 消</el-button>
                <el-button type="primary" @click="addSubmit"  :loading="addLoading">确 定</el-button>
            </div>
        </el-dialog>
        <el-drawer
              title="村组信息"
              :visible.sync="dialogV"
              direction="rtl"
              destroy-on-close>
            <detail-v :id="detailIdV" ></detail-v>
        </el-drawer>
        <el-drawer
              title="已有人员信息"
              :visible.sync="dialogP"
              direction="rtl"
              destroy-on-close>
            <detail-p :id="detailIdP" :type="'area'"></detail-p>
        </el-drawer>
    </div>
</template>

<script>
    import axios from 'axios';
    import {get, post,put,deletes} from '@/api/fetch.js';
    import url from '@/api/serviceAPI.config.js';
    import detailV from '@/components/common/villageDetail';
    import detailP from '@/components/common/villagePersonDetail'
    export default {
        name: 'role',
        data() {
            return {
                superMap:null,
                input:'',
                tableHeight: document.body.clientHeight-255,
                pageNum:0,
                pageSize:10,
                listLoading: false, //loading
                filters: {
                    name: '',
                    village:""
                },
                villageList:[],
                dialogAddVisible:false,
                formLabelWidth: '110px',
                addForm:{
                    name: "",
                    scope: "",
                    areaSize:'',
                    type: {
                        id:""
                    },
                    village: {
                        id:""
                    }
                },
                rules: {
                    name: [
                        { required: true, message: '请输入区域名称', trigger: 'blur' },
                    ],
                    type: [
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ],
                    village: [
                        { required: true, message: '请选择村组', trigger: 'change' },
                    ],
                    scope: [
                        { required: true, message: '请画出区域范围', trigger: 'blur' },
                    ],
                },
                addLoading:false,
                total:'',
                roleList:[],
                sels:[],
                areaList:[],
                redraw:false,
                dialogV:false,
                detailIdV:null,
                dialogP:false,
                detailIdP:null
            }
        },
        components: {
            detailV,detailP
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
            this.getArea();
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
            //获取区域列表
            getRole(){
                let para=Object.assign({pageNum: this.pageNum?this.pageNum-1:this.pageNum, pageSize: this.pageSize,}, {'name':this.filters.name,'village.name':this.filters.village});
                this.listLoading = true;
                get(url.task.areaSearch,para).then((res)=>{
                    this.total = res.totalNum;
                    this.roleList = res.datas;
                    this.listLoading = false;
                }).catch(error=>{
                    console.log(error);
                });
            },
            //显示添加区域弹框
            addRoleDialogShow(){
                this.dialogAddVisible=true;
                var self=this;
                setTimeout(function(){
                    //加载地图
                    self.superMap= map.init("map");//容器的ID
                    self.drawPlan(self);
                },1000);
            },
            //隐藏添加区域弹框
            addRoleDialogHide(){
                this.dialogAddVisible=false;
                this.addForm={
                    name: "",
                    scope: "",
                    areaSize:'',
                    type: {
                        id:""
                    },
                    village: {
                        id:""
                    }
                }
                this.superMap.map.destroy();
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
                            instance.post(url.task.areaUpdate, this.addForm).then(result =>{
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
                                    name: "",
                                    scope: "",
                                    areaSize:'',
                                    type: {
                                        id:""
                                    },
                                    village: {
                                        id:""
                                    }
                                }
                                this.$refs.addForm.clearValidate();
                                this.superMap.map.destroy();
                            })
                        } else { // 新增
                            // 在实例已创建后修改默认值
                            instance.post(url.task.areaAdd, this.addForm).then(result =>{
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
                                    name: "",
                                    scope: "",
                                    areaSize:'',
                                    type: {
                                        id:""
                                    },
                                    village: {
                                        id:""
                                    }
                                }
                                this.superMap.map.destroy();
                                this.$refs.addForm.clearValidate();
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
                    deletes(url.task.areaDelete+id).then((res) => {
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
                this.getRoleDeatil(row.id);
            },
            //回填详情
            getRoleDeatil(roleId) {
                this.redraw=true;
                get(url.task.areaView+roleId).then((res) => {
                    this.addForm = res;  //有现获取列表信息
                    var self=this;
                    setTimeout(function(){
                        //加载地图
                        self.superMap= map.init("map");//容器的ID
                        console.log(eval('('+res.scope+')'))
                        var obj={
                            vectorLayer:self.superMap.vectorLayer,
                            data:[
                                {
                                    name: res.name,
                                    color:"#1E9FFF",
                                    // lonLat: JSON.stringify(res.scope)
                                    lonLat:eval('('+res.scope+')')
                                }
                            ]}
                        //绘制面
                        kaizhou.polygon(obj);
                    },1000);
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
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {
                if(this.sels.length>0) {
                    var ids = this.sels.map(item => item.id).toString();
                    this.$confirm('确认删除选中记录吗？', '提示', {
                        type: 'warning'
                    }).then(() => {
                        this.listLoading = true;
                        let para = { ids: ids };
                        deletes(url.task.areaDeleteBatch + '?ids=' + ids, para).then((res) => {
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
            //区域类型
            getArea(){
                get(url.type.typeSearch,{pageNum:0,pageSize:999,type:'area'}).then((res)=>{
                    this.areaList = res.datas;
                }).catch(error=>{
                    console.log(error);
                });
            },
            // 清除绘制面
            clearFeatures() {
                var self=this;
                var clearFeatures=kaizhou.clear(self.superMap);
                self.drawPlan(self);
                this.redraw=false;
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
            //人员详情侧边框
            goDetail2(id){
                this.detailIdV=id;
                this.dialogV=true;
            },
            //人员详情侧边框
            goDetail(id){
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
