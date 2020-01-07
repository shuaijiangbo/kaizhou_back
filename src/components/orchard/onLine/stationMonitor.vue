<template>
    <div>
        <!--<el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>功能管理</el-breadcrumb-item>
        </el-breadcrumb>-->
        <div style="background-color: #fff;padding: 10px ;margin-top: 10px;position: absolute;top: 25px;bottom: 20px;right: 10px;left: 10px;">
                <ul class="first_part">
                    <li class="" v-for="(item,index) in firstPartData">
                        <p class="number_name">{{item.name}}</p>
                        <p class="split_line"></p>
                        <p class="number_box">
                            <span>{{item.number}}</span>
                            <span>{{index==0||index==3?'个':'条'}}</span>
                        </p>
                    </li>
                </ul>

            <div class="second_part">
                <p class="part_title"><span class="shu_line"></span>数据接收平台状态</p>
                <ul>
                    <li :class="item.status=='1'?'online':'offline'" v-for="(item,index) in secondPartData">
                        <p class="number_name">
                            <span class="text_key">节点：</span>
                            <span>{{item.number}}</span>
                        </p>
                        <p class="split_line">
                            <span class="text_key">服务地址：</span>
                            <span>{{item.serviceaddress}}</span>
                        </p>
                        <p class="number_box">
                            <span class="text_key">CPU使用率：</span>
                            <span class="pregress"></span>
                            <span class="number">{{item.cpu}}/10000(MB)</span>
                        </p>
                        <p class="number_box">
                            <span class="text_key">内存使用率：</span>
                            <span class="pregress"></span>
                            <span class="number">{{item.memory}}/10000(MB)</span>
                        </p>
                        <p class="btn_box">
                            <button>查看</button>
                        </p>
                    </li>
                </ul>
            </div>

            <div>
                <p class="part_title"><span class="shu_line"></span>站点统计</p>
                <div style="text-align: right">
                    <el-input v-model="filters.deviceName" placeholder="站点名称" style="width: 215px;"></el-input>
                    <el-button type="primary" style="margin-left: 15px;" @click="seachRole">搜索</el-button>
                    <span class="dz-zz-right-btn-box">
                    <!--<el-button type="primary" @click="addRoleDialogShow"><i class="el-icon-lx-add"></i>&nbsp;新增</el-button>-->
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
                          prop="id"
                          label="站点ID"
                          width="">
                    </el-table-column>
                    <el-table-column
                          label="站点名称"
                          width=""
                          prop="deviceName">
                    </el-table-column>
                    <el-table-column
                          prop="updateTime"
                          width="250"
                          label="最近数据上传时间">
                    </el-table-column>
                    <el-table-column
                          width=""
                          prop=""
                          label="状态">
                       <template scope="scope">
                            <span :style="{color:scope.row.status=='异常'?'red':'green'}">{{scope.row.status}}</span>
                       </template>
                    </el-table-column>
                    <el-table-column
                          prop="msg"
                          width=""
                          label="报警信息">
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
        </div>
        <el-dialog  :title="addForm.id ? '编辑功能' : '新增功能'" :visible.sync="dialogAddVisible" :close-on-click-modal="false" width="30%" :before-close="addRoleDialogHide">
            <el-form :model="addForm"  :rules="rules" ref="addForm">
                <el-form-item label="功能名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="addForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="范围" :label-width="formLabelWidth"  required>
                    <el-col :span="11">
                        <el-form-item prop="max">
                            <el-input v-model="addForm.max" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align: center">-</el-col>

                    <el-col :span="11">
                        <el-form-item prop="min">
                            <el-input v-model="addForm.min" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="单位" :label-width="formLabelWidth"  prop="units">
                    <el-input v-model="addForm.units" autocomplete="off"></el-input>
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
                    deviceName: '',
                },
                dialogAddVisible:false,
                formLabelWidth: '80px',
                allStationData:{},
                addForm:{
                    name:'',
                    min:'',
                    max:'',
                    units:'',
                    description:''
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
                firstPartData:[{
                    name:'监测站点数',
                    number:120,
                    unit:'个'
                },{
                    name:'监测数据总数',
                    number:120,
                    unit:'条'
                },{
                    name:'今日上传监测数据',
                    number:120,
                    unit:'条'
                },{
                    name:'气象站点数',
                    number:120,
                    unit:'个'
                },{
                    name:'气象数据总条数',
                    number:120,
                    unit:'条'
                },{
                    name:'今日上传气象数据',
                    number:120,
                    unit:'条'
                }],

                secondPartData:[{
                    number:120,
                    serviceaddress:'119.54.454.4545:8080',
                    cpu:5435,
                    memory:3224,
                    status:'1'
                },{
                    number:120,
                    serviceaddress:'119.54.454.4545:8080',
                    cpu:5435,
                    memory:3224,
                    status:'1'
                },{
                    number:120,
                    serviceaddress:'119.54.454.4545:8080',
                    cpu:5435,
                    memory:3224,
                    status:'1'
                },{
                    number:120,
                    serviceaddress:'119.54.454.4545:8080',
                    cpu:5435,
                    memory:3224,
                    status:'1'
                },{
                    number:120,
                    serviceaddress:'119.54.454.4545:8080',
                    cpu:5435,
                    memory:3224,
                    status:'1'
                },]
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
            this.getAllStationData();
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
            //获取功能列表
            getRole(){
                let para=Object.assign({pageNum: this.pageNum?this.pageNum-1:this.pageNum, pageSize: this.pageSize,}, this.filters);
                this.listLoading = true;
                get(url.video.searchDevice,para).then((res)=>{
                    this.total = res.totalNum;
                    this.roleList = res.datas;

                    this.roleList.forEach(item=>{
                        let d2 =  new Date(item.updateTime);
                        let d1 = new Date();
                        let chazhi=parseInt(d1 - d2) / 1000 / 60/60;//两个时间相差的小时数
                        let msg=chazhi>2?'超过1小时未上传数据':'暂无报警信息';
                        let status=chazhi>2?'异常':'正常';
                        item.msg=msg;
                        item.status=status;
                    })
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
            getAllStationData(){
                get(url.video.fetchRegister).then((res)=>{
                    this.firstPartData[0].number=res.data.fetchCountDevice;
                    this.firstPartData[1].number=res.data.fetchCountSensorData;
                    this.firstPartData[2].number=res.data.fetchCountSensorDataToday;
                    this.firstPartData[3].number=res.data.fetchCountDeviceMeteorological;
                    this.firstPartData[4].number=res.data.fetchCountMeteorologicalData;
                    this.firstPartData[5].number=res.data.fetchCountMeteorologicalDataToday;
                }).catch(error=>{
                    console.log(error);
                });
            }
        },
    }

</script>

<style lang="scss" type="text/scss" scoped>
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
    .first_part{
        display: flex;
        justify-content: space-between;
        li{
            list-style: none;
            width: 15%;
            height: 100px;
            color: #fff;
            text-align: center;
            padding: 15px 30px;
            .number_name{
                height: 30px;
                line-height: 30px;
            }
            .split_line{
                width: 100%;
                height: 1px;
                background: rgba(255,255,255,0.5);
            }
            .number_box{
                height: 50px;
                line-height: 50px;
                span{
                    &:nth-child(1){
                        font-size: 30px;
                        margin-right: 10px;
                    }
                }
            }
            &:nth-child(1){
                background: #5194f4;
                background: linear-gradient(0deg, #6168f1 0%,
                      #4f99f4 70% , #4f99f4 100%);
                box-shadow:0px 1px 5px #6168f1;
            }
            &:nth-child(2){
                background: linear-gradient(0deg, #ed5b43 0%,
                      #f99457 70% , #f99457 100%);
                box-shadow:0px 1px 5px #ed5b43;
            }
            &:nth-child(3){
                background: linear-gradient(0deg, #7d43e5 0%,
                      #ad5eea 70% , #ad5eea 100%);
                box-shadow:0px 1px 5px #7d43e5;
            }
            &:nth-child(4){
                background: linear-gradient(0deg, #ea8c13 0%,
                      #f8b93f 70% , #f8b93f 100%);
                box-shadow:0px 1px 5px #ea8c13 ;
            }
            &:nth-child(5){
                background: linear-gradient(0deg, #6168f1 0%,
                      #4f99f4 70% , #4f99f4 100%);
                box-shadow:0px 1px 5px rgba(97, 104, 241, 1) ;
            }
            &:nth-child(6){
                background: linear-gradient(0deg, #10b572 0%,
                      #29d7a0 70% , #29d7a0 100%);
                box-shadow:0px 1px 5px rgba(16, 181, 114, 1) ;
            }
        }
    }

    .part_title{
        color:#000 ;
        position: relative;
        height: 40px;
        padding-left: 10px;
        /* line-height: 40px;*/
        font-size: 18px;
        span{
            width: 5px;
            height: 20px;
            position: absolute;
            background: #052f6f;
            left: 0;
            top: 3px;
        }
    }

    .second_part{
        margin:20px 0;
        ul{
            display: flex;
            justify-content: space-between;
            li{
                width: 19%;
                height: 188px;
                list-style: none;
                padding: 20px 0px 10px 0px;
                p{
                    height: 24px;
                    font-size: 13px;
                    line-height: 24px;
                }
                .text_key{
                    width: 32%;
                    display: inline-block;
                    text-align: right;
                }
                .number_box{
                    .number{
                        font-size: 13px;
                    }
                    .pregress{
                        width: 90px;
                        height: 14px;
                        display: inline-block;
                        border: 1px solid #a5a5a7;
                        margin-right: 5px;
                        position: relative;
                    }
                }
                &.online{
                    background: url("../../../assets/img/shuifei/online.png") no-repeat;
                    background-size: 100% 100%;
                    .btn_box{
                        text-align: center;
                        margin-top: 15px;
                        button{
                            background: #2d548e;
                            width: 80%;
                            height: 40px;
                            font-size: 17px;
                            border: none;
                            border-radius: 4px;
                            color: #fff;
                            cursor: pointer;
                            outline: none;
                        }
                    }
                    .pregress{
                        &:after{
                            position: absolute;
                            width: 80%;
                            height: 100%;
                            background: #2d548e;
                            content: "";

                            background-size: 3em 3em;
                            background-image: linear-gradient(-45deg, transparent 0em, transparent 0.8em, #2361c0 0.9em, #246ad5 2.1em, transparent 2.1em, transparent 2.9em, #2361c0 3.1em);//#96D923,
                        }
                    }
                }
                &.offline{
                    background: url("../../../assets/img/shuifei/offline.png") no-repeat;
                    background-size: 100% 100%;
                    .btn_box{
                    text-align: center;
                    margin-top: 15px;
                    button{
                        background: #a1a1a1;
                        width: 80%;
                        height: 40px;
                        font-size: 17px;
                        border: none;
                        border-radius: 4px;
                        color: #fff;
                        cursor: pointer;
                        outline: none;
                    }
                }
                    .pregress{
                        &:after{
                            position: absolute;
                            width: 80%;
                            height: 100%;
                            background: #eee;
                            content: "";

                            background-size: 3em 3em;
                            background-image: linear-gradient(-45deg, transparent 0em, transparent 0.8em, #a1a1a1 0.9em, #a1a1a1 2.1em, transparent 2.1em, transparent 2.9em, #a1a1a1 3.1em);//#96D923,
                        }
                    }
                }
            }
        }
    }
</style>
