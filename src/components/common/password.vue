<template>
    <div>
        <el-form :model="passwordForm"  :rules="passwordRules" ref="passwordForm">
            <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPassword">
                <el-input v-model="passwordForm.oldPassword" autocomplete="off" type="password"></el-input>
            </el-form-item>
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
    </div>
</template>
<script>
import axios from 'axios';
import bus from '../common/bus';
import {get, post} from '@/api/fetch.js';
import url from '@/api/serviceAPI.config.js';
export default {
    data() {
        return {
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
    computed: {
    },
    methods: {
        //修改密码
        resetPassword(){
            this.$refs.passwordForm.validate((valid) => {
                if (valid) {
                    this.addLoading=true;
                    get(url.user.confirmUserPwd, { userId: sessionStorage.getItem('userId'), password: this.passwordForm.oldPassword }).then(res => {
                        if(res.data=='wrong'){
                            this.addLoading=false;
                            this.$message.error('原密码错误！')
                        }else{
                            if(this.passwordForm.password.length<6){
                                this.addLoading=false;
                                this.$message.error('密码至少为6位！');
                            }else{
                                if (this.passwordForm.password === this.passwordForm.passwordConfirm) {
                                    // 创建实例时设置配置的默认值
                                    var instance = axios.create();
                                    // 在实例已创建后修改默认值
                                    instance.defaults.headers.post['Content-Type'] = 'application/json';
                                    var pm={
                                        password:this.passwordForm.password,
                                        passwordConfirm:this.passwordForm.passwordConfirm,
                                        userId:sessionStorage.getItem('userId')
                                    }
                                    instance.put(url.user.resetPassword,pm).then(result => {
                                        // this.dialogAddVisible = false;
                                        this.$message({
                                            message: '密码修改成功',
                                            type: 'success',
                                            duration: 1000,
                                        });
                                        this.addLoading = false;
                                        this.logout();
                                    }).catch(err => {
                                        console.log(err);
                                    }).finally(() => {
                                        this.showReset = false;
                                        this.addLoading = false;
                                        this.passwordForm = {
                                            oldPassword:null,
                                            password:null,
                                            passwordConfirm: null,
                                        }
                                    })
                                } else {
                                    this.$message.error('两次密码输入不一样！');
                                    this.addLoading = false;
                                }
                            }
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }
            })
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
        //
        addRoleDialogHide(){
            this.$emit('spot')
        }
    },
    mounted() {
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
    .dialog-footer{
        padding: 10px 15px!important;
        background-color: #f5f5f5;
        text-align: right;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: absolute;
        left: 0;
        width: 100%;
        margin-top: 49px;
    }
</style>
