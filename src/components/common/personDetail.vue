<template>
    <div>
        <div class="dz-bg-wall">
            <img v-if="userInfo.headPortraitUrl!=null&&userInfo.headPortraitUrl!=''" :src="userInfo.headPortraitUrl" alt="">
            <img v-else src="@/assets/img/timg.jpg" alt="">
        </div>
        <div class="dz-side-box">
            <el-row>
                <el-col :span="6" class="dz-small">人员名称</el-col>
                <el-col :span="18" class="dz-big">{{userInfo.userName?userInfo.userName:'无'}}</el-col>
                <el-col :span="6" class="dz-small">账号</el-col>
                <el-col :span="18" class="dz-big">{{userInfo.account?userInfo.account:'无'}}</el-col>
                <el-col :span="6" class="dz-small">联系电话</el-col>
                <el-col :span="18" class="dz-big">{{userInfo.tel?userInfo.tel:'无'}}</el-col>
                <el-col :span="6" class="dz-small">紧急联系电话</el-col>
                <el-col :span="18" class="dz-big">{{userInfo.instancyTel?userInfo.instancyTel:'无'}}</el-col>
                <el-col :span="6" class="dz-small">电子邮件</el-col>
                <el-col :span="18" class="dz-big">{{userInfo.email?userInfo.email:'无'}}</el-col>
                <el-col :span="6" class="dz-small">人员类型</el-col>
                <el-col :span="18" class="dz-big">{{userInfo.roleName?userInfo.roleName:'无'}}</el-col>
                <el-col :span="6" class="dz-small">所属村组</el-col>
                <el-col :span="18" class="dz-big">{{userInfo.area?userInfo.area.village.name:'无'}}</el-col>
                <el-col :span="6" class="dz-small">所属区域</el-col>
                <el-col :span="18" class="dz-big">{{userInfo.area?userInfo.area.name:'无'}}</el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import bus from '../common/bus';
    import {get, post} from '@/api/fetch.js';
    import url from '@/api/serviceAPI.config.js';
    export default {
        props: ['id'],
        data() {
            return {
                userInfo:null
            };
        },
        created(){
            console.log()
        },
        computed: {

        },
        mounted(){
            this.getInfo(this.id)
        },
        methods: {
            getInfo(){
                get(url.user.getDeatil+this.id ).then((res) => {
                    this.userInfo=res;
                })
            }
        },
    };
</script>
<style scoped>
    .dz-bg-wall{
        height: 170px;
        width: 100%;
        background-color: #1d6df1; /* 不支持线性的时候显示 */
        background-image: linear-gradient(to right, #1d6df1 , #1acbfb);
        overflow-y: visible;
        text-align: center;
        padding-top: 50px;
    }
    .dz-bg-wall img{
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        display: block;
        margin: 0 auto;
        width: 176px;
        height: 176px;
        border: 4px solid #ffffff;
        background-color: #fff;
    }
    .dz-side-box{
        padding: 20px;
        margin-top: 50px;
        line-height: 40px;
        font-size: 14px;
    }
    .dz-side-box>div{
        border: 1px solid #dddddd;
        border-bottom: none;
        color: #666666;
    }
    .dz-small{
        border-bottom: 1px solid #ddd;
        border-right: 1px solid #ddd;
        padding: 0 10px;
        background-color: #f5f5f5;
        height: 40px;
    }
    .dz-big{
        border-bottom: 1px solid #ddd;
        padding: 0 10px;
        height: 40px;
    }
</style>
