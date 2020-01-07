<template>
    <div id="video" style="width: 100%;height: 98%;">

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
                index:null
            }
        },
        components: {

        },
        computed: {
        },
        created(){
            setTimeout(function(){
                if(window.videoObject){
                    window.videoObject.destroy();
                }
                window.videoObject = play.init("video", url.baseURL);
                if(window.ca){
                    window.videoObject.play(window.ca.c,window.ca.t);
                }
            },2000);
        },
        activated(){
        },
        deactivated(){
        },
        destroyed(){
            console.log("离开视频页面");
            if(window.videoObject){
                window.videoObject.stopAll();
            }
        },
        mounted(){
            var that = this;

        },
        methods: {
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
