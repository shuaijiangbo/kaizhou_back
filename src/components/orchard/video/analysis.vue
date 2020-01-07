<template>
    <div style="width: 100%;height: 98%;overflow-y: scroll;background-color: #ffffff;padding:10px">
        <div style="margin-bottom: 10px;">
            <el-select v-model="videoSrc" placeholder="请选择" @change="changeVideo">
                <el-option
                      v-for="item in monitorList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.src">
                </el-option>
            </el-select>
        </div>
        <div id="analysis-video" style="width:1280px;height:720px;"></div>
        <div style="text-align: center;margin-top: 10px;margin-bottom: 10px;position: absolute;right:40px;top: 75px;width: 300px;">
            <div style="position: relative;display: inline-block"><img src="@/assets/img/gs.png" alt="">
                <div style="position: absolute;color: #fff;top: 20px;left:25px;font-size: 24px; text-align: left">
                    <div>柑橘丰产指数</div>
                    <br>
                    <div style="font-size: 28px;"><span class="number">0</span></div>
                </div>
            </div>&nbsp;&nbsp;
            <div style="position: relative;display: inline-block"><img src="@/assets/img/csd.png" alt="">
                <div style="position: absolute;color: #fff;top: 20px;left:25px;font-size: 24px; text-align: left">
                    <div>柑橘成熟度指数</div>
                    <br>
                    <div class="maturity" style="font-size: 28px;">0 </div>
                </div>
            </div>&nbsp;&nbsp;
            <div style="position: relative"><img src="@/assets/img/zzmd.png" alt=""></div>

        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {get, post,put,deletes} from '@/api/fetch.js';
    import url from '@/api/serviceAPI.config.js'

    export default {
        name: 'village',
        data() {
            return {
                monitorList:[],
                video:null,
                index:null,
                videoSrc:null
            }
        },
        components: {

        },
        computed: {
        },
        created(){
            this.getMonitor();
        },
        activated(){
        },
        deactivated(){

        },
        destroyed(){
            console.log("离开分析页面");
            if(window.analysis){
                window.analysis.stop();
            }
        },
        mounted(){
            var that = this;
        },
        methods: {
            getMonitor(){
                get(url.video.camerasAnalysisList).then((res) => {
                    if(res.code==200){
                        this.monitorList=res.data;
                        if(window.analysis){
                            window.analysis.stop();
                        }
                        var sefl=this;
                        setTimeout(function(){
                            window.analysis=window.play.analysis("analysis-video");
                            window.analysis.playin({src:sefl.monitorList[0].src});
                        },1500);
                    }
                });
            },
            changeVideo(){
                if(window.analysis){
                    window.analysis.playin({src:this.videoSrc});
                }
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
