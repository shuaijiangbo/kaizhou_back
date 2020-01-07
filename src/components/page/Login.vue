<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div style="text-align: center;padding-bottom: 30px"><img src="@/assets/img/logoin.png" alt=""></div>
            <el-row class="dz-login-box">
                <el-col :span="14">&nbsp;</el-col>
                <el-col :span="10" style="padding: 10px 15px">
                    <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                        <div style="font-size: 30px; color: #919dad;margin-bottom: 10px;">欢迎登录！</div>
                        <el-form-item prop="username">
                            <el-input v-model="param.account" placeholder="请输入用户名称">
                                <el-button slot="prepend" icon="el-icon-user-solid" disabled></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                  type="password"
                                  placeholder="请输密码"
                                  v-model="param.password"
                                  @keyup.enter.native="submitForm()"
                            >
                                <el-button slot="prepend" icon="iconfont icon-mima" disabled></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item style="margin-top: 15px;"  class="dz-login-code">
                            <el-input placeholder="请输入验证码" >
                                <el-button slot="append" type="primary">获取验证码</el-button>
                            </el-input>
                        </el-form-item>
                        <div style="font-size: 16px;margin: 20px 0 35px;">
                            <el-checkbox v-model="checked">记住密码</el-checkbox>
                        </div>
                        <div class="login-btn">
                            <el-button type="primary" @click="submitForm()">立即登录</el-button>
                        </div>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {get, post} from '@/api/fetch.js';
    import url from '@/api/serviceAPI.config.js';
    export default {
    data: function() {
        return {
            param: {
                account: '',
                password: ''
            },
            rules: {
                account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
            checked:false
        };
    },
    created(){
        this.param.account=localStorage.getItem('account');
        this.param.password=localStorage.getItem('password');
        if(this.param.account||this.param.password){
            this.checked=true;
        }
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    // 创建实例时设置配置的默认值
                    var instance = axios.create();
                    // 在实例已创建后修改默认值
                    instance.defaults.headers.post['Content-Type'] = 'application/json';
                    instance.post(url.log.login,this.param).then(res=>{
                        console.log(res);
                        sessionStorage.setItem('account', res.data.account);
                        sessionStorage.setItem('userId', res.data.id);
                        this.$router.push('/index');
                        this.$message({
                            message: '登录成功',
                            type: 'success'
                        });
                        if(this.checked){
                            localStorage.setItem('account',this.param.account);
                            localStorage.setItem('password',this.param.password);
                        }else{
                            localStorage.removeItem('account');
                            localStorage.removeItem('password');
                        }
                    }).catch(err=>{
                        console.log(err);
                        if(err.status==400){
                            this.$message.error('账号或者密码错误');
                        }
                    })
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100% 100%;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 1200px;
    transform: translate(-50%,-50%);
    border-radius: 5px;
    /*background: rgba(255, 255, 255, 0.3);*/
    overflow: hidden;
}
.ms-content {
    padding: 30px 50px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 58px;
    font-size: 24px;
}
.dz-login-box{
    background: url("../../assets/img/login-bg1.png");
    background-size: 100% 100%;
    height: 510px;
}
.dz-login-box .ms-content{
    height: 465px;
    background-color: #ffffff;
}
    .dz-login-btn-box{
        position: fixed;
        width: 143px;
        height: 37px;
        background: url('../../assets/img/loginbtn.png');
        right: 78px;
        top: 48px;
        line-height: 37px;
        text-align: center;
        color: #00ffce;
        font-size: 14px;
        cursor: pointer;
    }
.dz-login-btn-box ul{
    list-style: none;
    background: url("../../assets/img/loginbtn2.png");
    padding-top: 10px;
    opacity: 0;
    transition: All 0.6s;
    -webkit-transition: All 0.6s;
    -moz-transition: All 0.6s;
    -o-transition: All 0.6s;
}
.dz-login-btn-box:hover ul{
    opacity: 1;
}
.dz-login-btn-box ul a{
    color: #ffffff;
    line-height: 40px;
    color: #00ffce;
}
</style>
