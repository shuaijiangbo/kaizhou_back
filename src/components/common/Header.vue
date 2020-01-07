<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage" style="display: none">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo"> <router-link to="/index"><img src="@/assets/img/logoin.png" alt="" style="height:45px"></router-link></div>
        <div class="header-right">
            <div class="header-user-con">
                <router-link :to="{path:'/message'}" class="el-dropdown-link">
                        <i class="el-icon-bell" style="font-size: 15px;"></i>
                        <el-badge :value="message>99?'99+':message" class="item" v-if="message>0">
                        <b style="font-size: 12px;font-weight: normal">&nbsp;消息</b>
                        </el-badge>
                        <b style="font-size: 12px;font-weight: normal" v-else>&nbsp;消息</b>
                    </router-link>
                <span style="font-size: 22px; color: #fff;">&nbsp;&nbsp;&nbsp;|</span>
                <el-dropdown class="user-name" style="margin-left: 20px;"  @command="modifyPassword">
                    <span class="el-dropdown-link">
                        <i class="el-icon-lx-people" ></i>
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="password">修改密码</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>&nbsp;&nbsp;&nbsp;|</span>
                <div class="user-name" style="margin-left: 20px;">
                    <span class="el-dropdown-link" @click="logout" style="font-size: 14px;">
                        <i class="iconfont icon-tuichu2"></i>&nbsp;<b style="font-size: 12px;font-weight: normal">退出登录</b>
                    </span>
                </div>
            </div>
        </div>

        <el-dialog  title="修改密码" :visible.sync="showReset" :close-on-click-modal="false" width="50%" :before-close="addRoleDialogHide">
                <password  @spot="addRoleDialogHide"></password>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';
import bus from '../common/bus';
import {get, post} from '@/api/fetch.js';
import url from '@/api/serviceAPI.config.js';
import password from '@/components/common/password';
export default {
    data() {
        return {
            collapse: false,
            fullscreen: false,
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
        };
    },
    components:{
        password
    },
    computed: {
        username() {
            let username = localStorage.getItem('account');
            return username ? username : this.name;
        }
    },
    methods: {
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
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
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
        this.getInMailCount();
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    font-size: 22px;
    color: #fff;
    background: url("../../assets/img/headerbg.png");
    padding: 10px 10px;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    float: left;
    width: 250px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 40px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
    .icon-yuntu{
        color: #fff;
        font-size: 20px;
    }
.el-dropdown-link:hover {
       color: #17a596;
 }
</style>
