<template>
    <div style="position: relative;width: 100%;height: 100%;">
        <div id="map" style="width: 100%;height: 100%;"></div>
          <iframe id="hik"  style="display: none;"></iframe>
        <div style="position: absolute;left: 10px;top: 80px;z-index: 2000;width: 300px;">
            <video src="" id="vide-1" style="background-color: rgba(0,0,0,.5)" width="300" @click="enlargeVideo('vide-1')"></video>
            <video src="" id="vide-2" style="background-color: rgba(0,0,0,.5)" width="300" @click="enlargeVideo('vide-2')"></video>
            <video src="" id="vide-3" style="background-color: rgba(0,0,0,.5)" width="300" @click="enlargeVideo('vide-3')"></video>
            <video src="" id="vide-4" style="background-color: rgba(0,0,0,.5)" width="300" @click="enlargeVideo('vide-4')"></video>
            <!--<video src="" id="vide-5" style="background-color: rgba(0,0,0,.5)" width="300"></video>-->
        </div>
        <div class="dz-home-num" style="z-index: 2000;">
            <div>
                <router-link :to="{path:'/task/village'}">
                    <div class="dz-title">村组统计</div>
                    <div class="dz-content"><span>{{valligeTotal}}</span>&nbsp;组</div>
                </router-link>
            </div>
            <div>
                <router-link  :to="{path:'/task/personnel'}">
                    <div class="dz-title">人员统计</div>
                    <div class="dz-content"><span>{{userTotal}}</span>&nbsp;人</div>
                </router-link>
            </div>
            <div>
                <router-link  :to="{path:'/task'}">
                <div class="dz-title">任务统计</div>
                <div class="dz-content"><span>{{taskTotal}}</span>&nbsp;条</div>
                </router-link>
            </div>
            <div>
                <router-link  :to="{path:'/on-line/jianceyujing'}">
                <div class="dz-title">预警统计</div>
                <div class="dz-content"><span>{{warnTotal}}</span>&nbsp;条</div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {get, post,put,deletes} from '@/api/fetch.js';
    import url from '@/api/serviceAPI.config.js';

    export default {
        name: 'dashboard',
        data() {
            return {
                valligeTotal:null,
                userTotal:null,
                taskTotal:null,
                superMap:null,
                warnTotal:null,
                videoStation:null,
            }
        },
        components: {

        },
        computed: {

        },
        created(){
            this.getUserTotal();
            this.getValligeTotal();
            this.getTaskTotal();
            this.getWarnTotal();
            this.getMap();
            if(!this.videos) {
                this.videos = [];
                var self=this;
                if(!window.monitoring){
                    window.monitoring={};
                }
                setTimeout(function(){
                    var v1=new window.video(document.getElementById("vide-1"));
                    self.videos.push(v1);
                    window.monitoring['vide-1']=v1;
                    var v2=new window.video(document.getElementById("vide-2"));
                    self.videos.push(v2);
                    window.monitoring['vide-2']=v2;
                    var v3=new window.video(document.getElementById("vide-3"));
                    self.videos.push(v3);
                    window.monitoring['vide-3']=v3;
                    var v4=new window.video(document.getElementById("vide-4"));
                    self.videos.push(v4);
                    window.monitoring['vide-4']=v4;
                    self.getHomeVideo.call(self);
                },2000);
            }
        },
        activated(){

        },
        deactivated(){

        },
        destroyed(){
            this.videos[0].stop();
            this.videos[1].stop();
            this.videos[2].stop();
            this.videos[3].stop();
        },
        mounted(){
        },
        methods: {
            getUserTotal(){
                get(url.user.userCount).then((res)=>{
                    this.userTotal=res.data
                }).catch(error=>{
                    console.log(error);
                });
            },
            getValligeTotal(){
                get(url.task.villageCount).then((res)=>{
                    this.valligeTotal=res.data
                }).catch(error=>{
                    console.log(error);
                });
            },
            getTaskTotal(){
                get(url.task.taskCount).then((res)=>{
                    this.taskTotal=res.taskNumber
                }).catch(error=>{
                    console.log(error);
                });
            },
            getWarnTotal(){
                get(url.warning.getWarningNum).then((res)=>{
                    this.warnTotal=res.data;
                }).catch(error=>{
                    console.log(error);
                });
            },
            getHomeVideo(){
                get(url.video.searchHomeVideo).then((res)=>{
                    this.videos[0].hls(res.camera1);
                    this.videos[1].hls(res.camera2);
                    this.videos[2].hls(res.camera3);
                    this.videos[3].hls(res.camera4);
                }).catch(error=>{
                    console.log(error);
                });
            },
            getMap(){
                get(url.task.villageListVillage).then((res) => {
                    var self=this;
                    console.log(eval('('+res[0].scope+')'))
                    self.superMap= map.init("map");//容器的ID
                    let newArr = res.map(val => {
                        let json = {};
                        let color="rgb"+this.getColor();
                        json.name = val.name;
                        json.color = color;
                        json.lonLat = eval('('+val.scope+')');
                        json.description=`<div>村组范围：`+(Number(val.areaSize)/666.67).toFixed(2)+`亩</div><div>村组描述：`+val.description+`</div>`
                        return json;
                    });
                    console.log(newArr)
                    setTimeout(function(){
                        var obj={
                            vectorLayer:self.superMap.vectorLayer,
                            data:newArr
                        }
                        //绘制面
                        kaizhou.polygon(obj);
                        self.getCamerasList.call(self);
                    },1000);
                });
            },
            getColor(){
                var r = Math.floor(Math.random()*256);
                var g = Math.floor(Math.random()*256);
                var b = Math.floor(Math.random()*256);
                var rgb = '('+r+','+g+','+b+')';
                return rgb
            },
            enlargeVideo(id){
                kaizhou.maxVideo({type:'live',id:id})
            },
            // 视频点
            getCamerasList(){
                var self=this;
                get(url.video.camerasList).then((res)=>{
                    console.log(res);
                    var data=[];
                    if(!window.monitoring) {
                        window.monitoring = {};
                    }
                    $(res.data).each(function(i,e){
                        data.push({icon:"image/1573177392462.png",lon:e.lng,lat:e.lat,name:e.name,id:e.id,indexCode:e.indexCode});
                        let v=new video(document.getElementById("switch2"));
                        v.url=e.src;
                        window.monitoring["cameras"+e.id]=v;
                    });
                    var arr=kaizhou.addMarker({map:self.superMap.map,markers:self.superMap.markers,data:data});
                    for(var i=0;i<arr.length;i++){
                        arr[i].events.on({"click":function(e){
                                //kaizhou.maxVideo({type:'live',id:"cameras"+this.attributes.id});
                                if($.trim(this.attributes.indexCode)==""){
                                        return;
                                }
                                var indexCodes = [this.attributes.indexCode];
                                var arr = videoclientutil.agreementKeyWords();//调后端接口
                                var palyType = 'PlayReal';
                                var Param = videoclientutil.clientAgreement.common(arr,palyType);
                                var playViewParm = videoclientutil.clientAgreement.playView(Param,indexCodes);
                                if ("null" == playViewParm || "" == playViewParm || null == playViewParm || "undefined" == typeof playViewParm) {
                                    return;
                                } else {
                                    document.getElementById("hik").src =playViewParm+"WndCount:9;WndSelect:1;";
                                }



                                return false;
                            }});
                    }



                    this.videoStation=res.data;
                }).catch(error=>{
                    console.log(error);
                });
            }
        }
    }

</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }

</style>
