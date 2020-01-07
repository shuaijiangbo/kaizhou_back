<template>
    <div>
        <div class="header-right">
            <div class="header-user-con">
                <router-link :to="{path:'/message'}" class="el-dropdown-link" style="position: relative">
                        <i class="el-icon-bell" style="font-size: 15px;"></i>
                        <el-badge :value="message>99?'99+':message" class="item" v-if="message>0" style="height:30px;line-height: 30px">
                        <b style="font-size: 12px;font-weight: normal">&nbsp;消息</b>
                        </el-badge>
                        <b style="font-size: 12px;font-weight: normal" v-else>&nbsp;消息</b>
                    </router-link>
                <span style="font-size: 22px; color: #fff;">&nbsp;&nbsp;&nbsp;|</span>
                <el-dropdown class="user-name" style="margin-left: 20px;"  @command="modifyPassword">
                    <span class="el-dropdown-link" style="color: #fff;">
                        <i class="el-icon-lx-people" ></i>
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="password">修改密码</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>&nbsp;&nbsp;&nbsp;|</span>
                <div class="user-name" style="margin-left: 20px;display: inline-block;padding-right: 80px">
                    <span class="el-dropdown-link" @click="logout" style="font-size: 14px; cursor: pointer">
                        <i class="iconfont icon-tuichu2"></i>&nbsp;退出登录
                    </span>
                    <!--<el-dropdown-menu slot="dropdown">-->
                    <!--</el-dropdown-menu>-->
                </div>
            </div>
        </div>
        <div class="dz-zz-main">
            <div class="dz-edu-home-container">
                <div style="width: 100%;height: auto;"><img src="@/assets/img/logoin.png" alt=""></div>
                <div>
                    <router-link to="/task/village">
                        <div><img src="@/assets/img/bgicon0.png" alt=""></div>
                    </router-link>
                </div>
                <div>
                    <router-link to="/control/switchControl">
                        <div><img src="@/assets/img/bgicon1.png" alt=""></div>
                    </router-link>
                </div>
                <div>
                    <router-link to="/task">
                        <div><img src="@/assets/img/bgicon2.png" alt=""></div>
                    </router-link>
                </div>
                <div>
                    <router-link to="/video/analysis">
                        <div><img src="@/assets/img/bgicon3.png" alt=""></div>
                    </router-link>
                </div>
                <div>
                    <router-link to="/on-line/monitoring">
                        <div><img src="@/assets/img/bgicon4.png" alt=""></div>
                    </router-link>
                </div>
                <div>
                    <router-link to="/funcs">
                        <div><img src="@/assets/img/bgicon5.png" alt=""></div>
                    </router-link>
                </div>
                <span style="clear: both">&nbsp;</span>
            </div>
        </div>
        <div style="text-align: center;position: fixed;bottom: 15px;z-index: 1;width: 100%;color: #fff;font-size: 14px;font-weight: 600;letter-spacing: 1px;">
            <div>建设单位：重庆市开州区临江镇福德村柑橘种植股份合作</div>
            <div>技术支持：中国科学院重庆绿色智能技术研究院</div>
        </div>
        <el-dialog  title="修改密码" :visible.sync="showReset" :close-on-click-modal="false" width="50%" :before-close="addRoleDialogHide">
            <password  @spot="addRoleDialogHide"></password>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios';
    import {get, post} from '@/api/fetch.js';
    import url from '@/api/serviceAPI.config.js';
    import password from '@/components/common/password';
    export default {
        name: 'index',
        components:{
            password
        },
        data() {
            return {
                show:1,
                name: 'admin',
                message:null,
                showReset:false,
                formLabelWidth:'80px',
                passwordForm:{
                    oldPassword:null,
                    password:null,
                    passwordConfirm:null
                },
                addLoading:false,
                passwordRules: {
                    oldPassword:[
                        { required: true, message: '请输入原密码', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                    ],
                    passwordConfirm: [
                        { required: true, message: '请确认密码', trigger: 'blur' },
                    ]
                },
            }
        },
        computed: {
            username() {
                let username = localStorage.getItem('account');
                return username ? username : this.name;
            }
        },
        created(){
            this.getInMailCount();
        },
        activated(){
        },
        deactivated(){
        },
        methods: {
            // 退出登录
            logout(){
                get(url.log.logout).then(res=>{
                    localStorage.removeItem('userName');
                    localStorage.removeItem('userId');
                    this.$router.push('/login');
                }).catch(err=>{
                    console.log(err);
                })
            },
            //显示修改密码弹出框
            modifyPassword(command){
                if(command=='password'){
                    this.showReset=true
                }
            },
            //隐藏弹出框
            addRoleDialogHide(){
                this.showReset=false
            },
            //站内信
            getInMailCount(){
                get(url.inMal.inMailCount).then(res=>{
                    this.message=res.data;
                }).catch(err=>{
                    console.log(err);
                })
            }
        }
    }
</script>

<style scoped>
    .dz-zz-header{
        height: 86px;
        width: 100%;

        padding: 10px 15px;
    }
    .dz-zz-main{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url(../../assets/img/homepagebg.jpg) no-repeat;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
    }
    .dz-zz-main>div{
        width: 100%;
        text-align: center;
        padding: 40px;
    }
    .dz-edu-home-container >div{
        display: inline-block;
        width: 12.5%;
        /*background: url("../../assets/img/bgbottom.png") no-repeat center;*/
        padding: 30px;
        font-size: 28px;
        letter-spacing: 5px;
        vertical-align: bottom;
    }
    .dz-edu-home-container >div a {
          color: #ffffff;
    }
    .dz-edu-home-container >div a img{
          transition: All 0.6s;
          -webkit-transition: All 0.6s;
          -moz-transition: All 0.6s;
          -o-transition: All 0.6s;
    }
    .dz-edu-home-container >div a:hover img{
          transform: scale(1.05);
          -webkit-transform: scale(1.05);
          -moz-transform: scale(1.05);
          -o-transform: scale(1.05)
    }
    .dz-edu-home-container >div:hover{
        /*background-image: url("../../assets/img/bgbottomhv.png");*/
    }
    .header-right{
        text-align: right;
        line-height: 60px;
        position: relative;
        z-index: 100;
        color: #fff;
        padding-left: 30px;
    }
    .header-right a{
        color: #fff;
    }
    .el-dropdown-link:hover {
        color: #17a596;
    }
</style>
