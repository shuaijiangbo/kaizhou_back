<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>社会治理实践</el-breadcrumb-item>
            <el-breadcrumb-item>县（市、区）</el-breadcrumb-item>
            <el-breadcrumb-item>司法所</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="background-color: #fff;padding: 10px ;margin-top: 10px;">
            <div class="dz-sge-box">
                <div class="active"><div><i class="iconfont icon-shoujixiang-xiangzi"></i>&nbsp;&nbsp;社情民意收集</div></div>
                <div><div><i class="iconfont icon-service"></i>&nbsp;&nbsp;民生服务</div></div>
                <div><div><i class="iconfont icon-hezuo"></i>&nbsp;&nbsp;矛盾劝解</div></div>
                <div><div><i class="iconfont icon-zhian3"></i>&nbsp;&nbsp;参与治安防控</div></div>
                <div><div><i class="iconfont icon-teshurenyuan"></i>&nbsp;&nbsp;参与特殊人群服务管理</div></div>
                <div><div><i class="iconfont icon-anli"></i>&nbsp;&nbsp;政策法律宣传</div></div>
                <div><div><i class="iconfont icon-tufashijianchuli"></i>&nbsp;&nbsp;突发事件报告</div></div>
                <div><div><i class="iconfont icon-xinxi"></i>&nbsp;&nbsp;其他</div></div>
            </div>
            <div class="dz-sge-operation">
                <div class="active">
                    <span>待办</span>
                    <i></i>
                </div>
                <div>
                    <el-badge :value="0" class="item">
                    <span>待审核</span>
                    <i></i>
                    </el-badge>
                </div>
                <div>
                    <el-badge :value="0" class="item">
                    <span>待验证</span>
                    <i></i>
                    </el-badge>
                </div>
                <div>
                    <el-badge :value="0" class="item">
                    <span>待评分</span>
                    <i></i>
                    </el-badge>
                </div>
                <div>
                    <span>待跟进</span>
                    <i></i>
                </div>
                <div>
                    <span>已办</span>
                    <i></i>
                </div>
                <div>
                    <span>已办结</span>
                    <i></i>
                </div>
                <div>
                    <span>上报</span>
                    <i></i>
                </div>
                <div>
                    <span>上级交办</span>
                    <i></i>
                </div>
                <div>
                    <span>协同办理</span>
                    <i></i>
                </div>
                <div>
                    <span>宣传案例</span>
                    <i></i>
                </div>
                <div>
                    <span>超时事件</span>
                    <i></i>
                </div>
                <div>
                    <span>用户统计</span>
                    <i></i>
                </div>
            </div>
            <div>
                <el-button type="primary" @click="dialogVisible=!dialogVisible"><i class="el-icon-lx-add"></i> 新增</el-button>
                <el-button type="primary" plain><i class="iconfont icon-xiugai"></i> 修改</el-button>
                <el-button type="primary" plain><i class="el-icon-delete"></i> 删除</el-button>
                <el-button type="primary" plain><i class="el-icon-lx-searchlist"></i> 查询</el-button>
                <el-button type="primary" plain><i class="iconfont icon-chakan"></i> 查看</el-button>
                <el-button type="primary" plain><i class="iconfont icon-shuaxin2"></i> 刷新</el-button>
                <el-button type="primary" plain><i class="iconfont icon-yanqi"></i> 延期</el-button>
                <el-button type="primary" plain><i class="iconfont icon-shangbao"></i> 上报受理中心</el-button>
                <el-button type="primary" plain><i class="iconfont icon-yuedu"></i> 阅读</el-button>
                <el-button type="primary" plain><i class="iconfont icon-shouli"></i> 受理</el-button>
                <el-button type="primary" plain><i class="iconfont icon-banlizhong"></i> 办理</el-button>
            </div>
            <div style="margin-top: 10px;">
                <el-table
                      :data="tableData"
                      height="570"
                      border
                      style="width: 100%">
                    <el-table-column
                          prop="eventName"
                          label="事件名称">
                    </el-table-column>
                    <el-table-column
                          prop="name"
                          label="创建人员">
                    </el-table-column>
                    <el-table-column
                          prop="dataSrc"
                          label="数据来源">
                    </el-table-column>
                    <el-table-column
                          prop="address"
                          label="发生地点">
                    </el-table-column>
                    <el-table-column
                          prop="department"
                          label="承办部门"
                          width="250">
                    </el-table-column>
                    <el-table-column
                          label="承办情况">
                        <template slot-scope="scope">
                            <span v-if="scope.row.undertake==1">办理中</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                          label="审核情况">
                        <template slot-scope="scope">
                            <span v-if="scope.row.examine==1" style="color: #17d136;">已通过</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                          prop="date"
                          label="反馈时间">
                    </el-table-column>
                    <el-table-column
                          prop="feedback"
                          label="反馈部门">
                    </el-table-column>
                    <el-table-column
                          prop="date2"
                          label="最后处理时间">
                    </el-table-column>
                    <el-table-column
                          prop="supervise"
                          label="督办">
                    </el-table-column>
                    <el-table-column
                          label="预警">
                        <template slot-scope="scope">
                            <span v-if="scope.row.warn==1" style="color: #fd4b5b;">预警</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="text-align: center;margin-top: 10px;">
                    <div class="block">
                        <el-pagination
                              :current-page="1"
                              :page-sizes="[10, 20, 30, 40]"
                              :page-size="10"
                              layout="total, sizes, prev, pager, next, jumper"
                              :total="1">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
         <el-dialog
                  title="新增事件处理信息"
                  :visible.sync="dialogVisible"
                  width="35%">
                 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                     <el-form-item label="事件类型" prop="eventType">
                         <el-cascader
                               v-model="ruleForm.eventType"
                               :options="options"
                               :props="{ expandTrigger: 'hover' }"
                         ></el-cascader>
                     </el-form-item>
                     <el-row>
                         <el-col :span="12">
                             <el-form-item label="事件名称" prop="name">
                                 <el-input v-model="ruleForm.name"></el-input>
                             </el-form-item>
                         </el-col>
                         <el-col :span="12">
                             <el-form-item label="发生网络" prop="web">
                                 <el-input v-model="ruleForm.web"></el-input>
                             </el-form-item>
                         </el-col>
                     </el-row>
                     <el-form-item label="发生时间" required style="margin-bottom: 0">
                         <el-col :span="11">
                             <el-form-item prop="date1">
                                 <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                             </el-form-item>
                         </el-col>
                         <el-col class="line" :span="2" style="text-align: center">-</el-col>
                         <el-col :span="11">
                             <el-form-item prop="date2">
                                 <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                             </el-form-item>
                         </el-col>
                     </el-form-item>
                     <el-row>
                         <el-col :span="12">
                             <el-form-item label="发生地点">
                                 <el-input v-model="ruleForm.address"></el-input>
                             </el-form-item>
                         </el-col>
                         <el-col :span="12">
                             <div style="    line-height: 36px;padding-left: 20px;">
                                 <el-checkbox v-model="ruleForm.checked">是否重点场所</el-checkbox>
                             </div>
                         </el-col>
                     </el-row>
                     <el-row style="border:1px solid #ddd;margin-bottom:10px">
                         <el-col :span="24">
                             <div style="background: #EBEEF5;padding: 5px 15px;height: 38px;border-bottom: 1px solid #ddd">
                                 <span style="line-height: 28px">主要当事人</span>
                                 <span style="float: right">
                                 <el-button type="danger" size="mini" @click="items+1"><i class="el-icon-plus"></i>添加</el-button>
                                 <el-button type="primary" size="mini" @click="items-1"><i class="el-icon-delete"></i>删除</el-button>
                             </span>
                             </div>
                         </el-col>
                         <el-row v-for="item in items">
                             <el-col :span="6">
                                 <div style="padding: 5px">
                                     <el-form-item label="姓名" label-width="40px" style="margin-bottom: 0">
                                         <el-input></el-input>
                                     </el-form-item>
                                 </div>
                             </el-col>
                             <el-col :span="7">
                                 <div style="padding: 5px">
                                     <el-form-item label="联系电话" label-width="70px" style="margin-bottom: 0">
                                         <el-input></el-input>
                                     </el-form-item>
                                 </div>
                             </el-col>
                             <el-col :span="6">
                                 <div style="padding: 5px">
                                     <el-form-item label="固话" label-width="40px" style="margin-bottom: 0">
                                         <el-input></el-input>
                                     </el-form-item>
                                 </div>
                             </el-col>
                             <el-col :span="5">
                                 <div style="padding: 5px">
                                     <el-form-item label="民族" label-width="40px" style="margin-bottom: 0">
                                         <el-input></el-input>
                                     </el-form-item>
                                 </div>
                             </el-col>
                         </el-row>
                     </el-row>
                     <el-form-item label="特殊人群" prop="tesu">
                         <el-input v-model="ruleForm.tesu"></el-input>
                     </el-form-item>
                     <el-row>
                         <el-col :span="12">
                             <el-form-item label="时间规模" prop="region">
                                 <el-select v-model="ruleForm.region" placeholder="请选择">
                                     <el-option label="规模一" value="shanghai"></el-option>
                                     <el-option label="规模二" value="beijing"></el-option>
                                 </el-select>
                             </el-form-item>
                         </el-col>
                         <el-col :span="12">
                             <el-form-item label="涉及人数" prop="people">
                                 <el-input v-model="ruleForm.people">
                                     <template slot="append">人</template>
                                 </el-input>
                             </el-form-item>
                         </el-col>
                     </el-row>
                     <el-form-item label="事件简述" prop="desc">
                         <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                     </el-form-item>
                     <el-form-item label="上传附件" prop="file">
                         <el-upload
                               class="dz-upload"
                               action="https://jsonplaceholder.typicode.com/posts/"
                               :on-preview="handlePreview"
                               :on-remove="handleRemove"
                               :before-remove="beforeRemove"
                               multiple
                               :limit="3"
                               :on-exceed="handleExceed"
                               :file-list="fileList">
                             <el-button size="small" type="primary">点击上传</el-button>
                         </el-upload>
                     </el-form-item>
                     <el-form-item label="绑定" prop="bind">
                         <div style="width: 100%;height: 160px;border:1px solid #dddddd"></div>
                     </el-form-item>
                 </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    <el-button type="danger" @click="dialogVisible = false">关闭</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: 'specialPopulation',
        data() {
            return {
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '两江新区',
                    eventName:'社会大学',
                    dataSrc:'社会治理',
                    department:'鸳鸯街道->鸳鸯社区居委会->第二网格 ',
                    undertake:'1',
                    examine:'1',
                    feedback:'两江新区',
                    date2:'2019-05-03',
                    supervise:'市政法委',
                    warn:'1'
                }],
                dialogVisible:false,
                options: [
                    {
                    value: '类型1',
                    label: '类型1',
                    children: [{
                        value: '类型2',
                        label: '类型2',
                    }, {
                        value: '类型3',
                        label: '类型3',
                    }]
                }, {
                    value: '类型4',
                    label: '类型4',
                    children: [{
                        value: '类型5',
                        label: '类型5',
                    }]
                }],
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    eventType:'',
                    web:'',
                    address:'',
                    checked:false,
                    people:''
                },
                rules: {
                    eventType:[
                        { required: true, message: '请输入选择事件类型', trigger: 'change' },
                    ],
                    web:[
                        { required: true, message: '请输入发生网络', trigger: 'blur' },
                    ],
                    tesu:[
                        { required: true, message: '请输入特殊人群', trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '请输入事件名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    people:[
                        { required: true, message: '请输入涉及人数', trigger: 'blur' },
                    ],
                    file:[
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    bind:[
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                },
                items:1
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
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }

</script>

<style scoped>
    .iconfont{
        font-size: 12px;
    }
    .dz-sge-box{
        margin-bottom: 10px;
    }
    .dz-sge-box > div{
        display: inline-block;
        height:62px ;
        background-color: #91d7fe;
        border-radius: 5px;
        padding: 6px;
        cursor: pointer;
        margin-right: 20px;
        font-size: 14px;
    }
    .dz-sge-box > div > div{
        background-color: #2db2fe;
        color: #fff;
        padding:12px 15px;
    }
    .dz-sge-box > div > div .iconfont{
        font-size: 24px;
        vertical-align: middle;
    }
    .dz-sge-box > div.active,
    .dz-sge-box > div:hover{
        background-color: #fea1a9;
    }
    .dz-sge-box > div.active > div,
    .dz-sge-box > div:hover > div{
        background-color: #fd4b5b;
    }
    .dz-sge-operation{
        border-bottom: 1px solid #dddddd;
        margin-bottom: 10px;
        padding-top: 5px;
    }
    .dz-sge-operation > div{
        display: inline-block;
        text-align: center;
        width: 80px;
        margin-right: 10px;
    }
    .dz-sge-operation > div span{
        display: inline-block;
        width: 80px;
        line-height: 40px;
        background-color: #eeeeee;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
    }
    .dz-sge-operation > div.active span,
    .dz-sge-operation > div:hover span{
        background-color: #2db2fe;
        color: #fff;
    }
    .dz-sge-operation > div i{
        display: block;
        width: 80px;
        height: 6px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        background-color: #00f6ff;
        opacity: 0;
    }
    .dz-sge-operation > div:hover i,
    .dz-sge-operation > div.active i{
        opacity: 1;
    }
</style>
