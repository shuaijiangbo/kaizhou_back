<template>
    <div>
        <div class="dz-expert-box">
            <div style="margin-bottom: 10px;font-size: 15px;"><b class="dz-b"></b> 村组范围</div>
            <div style="width: 100%;height: 300px;" id="map"></div>
            <div style="margin-bottom: 10px;font-size: 15px;margin-top: 15px"><b class="dz-b"></b> 村组信息</div>
            <div class="dz-side-box">
                <el-row>
                    <el-col :span="6" class="dz-small">村组名称</el-col>
                    <el-col :span="18" class="dz-big">{{info.name?info.name:'无'}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="dz-small">村组面积</el-col>
                    <el-col :span="18" class="dz-big">
                        {{(Number(info.areaSize)/666.67).toFixed(2)}}亩
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="dz-small">组长</el-col>
                    <el-col :span="18" class="dz-big">{{info.name?info.name:'无'}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="dz-small">联系电话</el-col>
                    <el-col :span="18" class="dz-big">{{info.userTel?info.userTel:'无'}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="dz-small">紧急电话</el-col>
                    <el-col :span="18" class="dz-big">{{info.userTelInstancy?info.userTelInstancy:'无'}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="dz-small">村组人员</el-col>
                    <el-col :span="18" class="dz-big">{{info.num?info.num:'0'}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="dz-small">村组描述</el-col>
                    <el-col :span="18" class="dz-big">{{info.description?info.description:'无'}}</el-col>
                </el-row>
            </div>
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
                info:null,
                listLoading:false,
                superMap:null,
            };
        },
        created(){
        },
        computed: {

        },
        mounted(){
            this.getInfo()
        },
        methods: {
            getInfo(){
                get(url.task.villageView+this.id ).then((res) => {
                    this.info=res;
                    this.$nextTick(function() {
                        var self=this;
                        self.superMap= map.init("map");//容器的ID
                        // self.superMap.map.destroy();
                        setTimeout(function(){
                            var obj={
                                vectorLayer:self.superMap.vectorLayer,
                                data:[
                                    {
                                        name: res.name,
                                        color:"#fff",
                                        lonLat:eval('('+res.scope+')'),
                                        description:`<div>村组范围：`+(Number(res.areaSize)/666.67).toFixed(2)+`亩</div><div>村组描述：`+res.description+`</div>`
                                    }
                                ]}
                            //绘制面
                            kaizhou.polygon(obj);
                        },1000);
                    })
                })
            }
        },
    };
</script>
<style scoped>
    .dz-expert-box{
        padding: 20px;
    }
    .dz-side-box{
        font-size: 14px;
    }
    .dz-side-box>div{
        border: 1px solid #dddddd;
        border-bottom: none;
        color: #666666;
        background-color: #f5f5f5;
    }
    .dz-side-box>div:last-child{
        border-bottom:  1px solid #dddddd;
    }
    .dz-small{
        padding: 10px 10px;
        min-height: 40px;
    }
    .dz-big{
        padding: 10px 10px;
        min-height: 40px;
        background-color: #fff;
        border-left: 1px solid #ddd;
        line-height: 1.5;
    }
    .dz-b{
        display: inline-block;
        vertical-align: middle;
        width: 4px;
        height: 14px;
        background-color:#3896db ;
        position: relative;
        top: -1px;
    }

</style>
