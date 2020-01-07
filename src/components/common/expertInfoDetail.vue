<template>
    <div>
        <div class="dz-expert-box">
            <div style="font-size: 22px;">{{info.remindTitle}}</div>
            <el-row style="font-size: 14px;color: #999;margin-top: 10px;">
                <el-col :span="12">
                    专家：{{info.expertName}}
                </el-col>
                <el-col :span="12" style="text-align: right">
                    {{info.dateTime}}
                </el-col>
            </el-row>
            <div style="padding:20px 0 ;font-size: 14px;line-height: 1.6" v-html="info.remindContent"></div>
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
                info:null
            };
        },
        created(){
        },
        computed: {

        },
        mounted(){
            this.getInfo(this.id)
        },
        methods: {
            getInfo(){
                get(url.expert.expertFind+this.id ).then((res) => {
                    this.info=res.data;
                })
            }
        },
    };
</script>
<style scoped>
    .dz-expert-box{
        padding: 20px;
    }
</style>
