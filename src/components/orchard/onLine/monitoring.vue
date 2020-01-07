<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>果园在线监测管理</el-breadcrumb-item>
            <el-breadcrumb-item>在线监测</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="background-color: #fff;padding: 10px ;margin-top: 10px;position: absolute;top: 54px;bottom: 20px;right: 10px;left: 10px;" id="map">

        </div>
          <iframe id="hik"  style="display: none;"></iframe>
     </div>
</template>

<script>
    import axios from 'axios';
    import {get, post,put,deletes} from '@/api/fetch.js';
    import url from '@/api/serviceAPI.config.js';
    export default {
        name: 'village',
        data() {
            return {
                superMap:null,
                newArr:null,
                videoState:null,
            }
        },
        components: {

        },
        computed: {
        },
        created(){
            var self=this;
            get(url.task.villageListVillage).then((res) => {
                self.newArr = res.map(val => {
                    let json = {};
                    let color="rgb"+this.getColor();
                    json.name = val.name;
                    json.color = color;
                    json.lonLat = eval('('+val.scope+')');
                    json.description=`<div>村组范围：`+(Number(val.areaSize)/666.67).toFixed(2)+`亩</div><div>村组描述：`+val.description+`</div>`
                    return json;
                });
            });
            setTimeout(function(){
                //加载地图
                self.superMap= map.init("map");//容器的ID
                get(url.video.listDevice).then((res) => {
                    if(res.code==200){
                        $(res.data).each(function(i,e){
                            e.url=url.wlw;
                            // 标记图层上添加标记
                            var size = new SuperMap.Size(40,40);
                            var offset = new SuperMap.Pixel(-(size.w/2), -(size.h/2));
                            var icon = new SuperMap.Icon('image/1573626813071.png',size,offset);
                            var marker=new SuperMap.Marker(new SuperMap.LonLat(e.lon,e.lat),icon);
                            marker.attributes=e;
                            self.superMap.markers.addMarker(marker);
                            marker.events.on({"click":function(e){
                                    var pixcel = new SuperMap.Pixel(e.x/4,e.y/4);
                                    var lonLat=self.superMap.map.getLonLatFromPixel(pixcel);
                                    if(this.attributes.typeId==22){
                                        var type = {
                                            "yn_water_1content": "土壤含水量1",
                                            "yn_water_2content": "土壤含水量2",
                                            "yn_water_3content": "土壤含水量3",
                                            "yn_water_4content": "土壤含水量4",
                                            "yn_solid_1temp": "土壤温度1",
                                            "yn_solid_2temp": "土壤温度2",
                                            "yn_solid_3temp": "土壤温度3",
                                            "yn_solid_4temp": "土壤温度4",
                                            "yn_water_content": "土壤含水量",
                                            "yn_soil_temp": "土壤温度",
                                            "yn_soil_ph": "土壤PH",
                                            "yn_soil_nh3n": "土壤氨氮",
                                            "yn_soil_nh4no3": "土壤硝铵",
                                            "yn_soil_k": "土壤钾离子"
                                        };
                                        window.kaizhou.openTip({map:self.superMap.map,type:"marker",lonLat:lonLat,data:{type:'echarts',url:this.attributes.url+"?pid=1",name:this.attributes.deviceName,indicators:type}});
                                    }else if(this.attributes.typeId==23){
                                        var type = {
                                            "yn_air_temp": "空气温度",
                                            "yn_air_humi": "空气湿度",
                                            "yn_dew_point": "露点温度",
                                            "yn_illuminance": "光照度",
                                            "yn_radiation": "太阳辐射",
                                            "yn_rainfall_30": "半小时雨量",
                                            "yn_rainfall": "全天雨量",
                                            "yn_evaporation": "蒸发量",
                                            "yn_water_1content": "土壤含水量1",
                                            "yn_water_2content": "土壤含水量2",
                                            "yn_water_3content": "土壤含水量3",
                                            "yn_water_4content": "土壤含水量4",
                                            "yn_solid_1temp": "土壤温度1",
                                            "yn_solid_2temp": "土壤温度2",
                                            "yn_solid_3temp": "土壤温度3",
                                            "yn_solid_4temp": "土壤温度4",
                                            "yn_wind_speed": "风速",
                                            // "yn_wind_direction": "风向",
                                            // "yn_air_pressure": "大气压力",
                                            // "yn_water_content": "土壤含水量",
                                            // "yn_soil_temp": "土壤温度",
                                            // "yn_soil_ph": "土壤PH",
                                            // "yn_soil_nh3n": "土壤氨氮",
                                            // "yn_soil_nh4no3": "土壤硝铵",
                                            // "yn_soil_k": "土壤钾离子"
                                        };
                                        window.kaizhou.openTip({map:self.superMap.map,type:"marker",lonLat:lonLat,data:{type:'echarts',url:this.attributes.url+"?pid="+this.attributes.no,name:this.attributes.deviceName,indicators:type}});
                                    }else if(this.attributes.typeId==24){
                                        var type = {
                                            "yn_air_temp": "空气温度",
                                            "yn_air_humi": "空气湿度",
                                            "yn_dew_point": "露点温度",
                                            "yn_illuminance": "光照度",
                                            "yn_radiation": "太阳辐射",
                                            "yn_rainfall_30": "半小时雨量",
                                            "yn_rainfall": "全天雨量",
                                            "yn_evaporation": "蒸发量",
                                            "yn_wind_speed": "风速",
                                            "yn_wind_direction": "风向",
                                            "yn_air_pressure": "大气压力"
                                        };
                                        window.kaizhou.openTip({map:self.superMap.map,type:"marker",lonLat:lonLat,data:{type:'echarts',url:this.attributes.url+"?pid=1",name:this.attributes.deviceName,indicators:type}});

                                    }
                                }});


                        });
                    }
                });

                var obj={
                    vectorLayer:self.superMap.vectorLayer,
                    data:self.newArr
                }
                //绘制面
                kaizhou.polygon(obj);
                self.getCamerasList.call(self);
            },1000);

        },
        activated(){
        },
        deactivated(){
        },
        mounted(){

        },
        methods: {
            // 视频点
            getCamerasList(){
                var self=this;
                get(url.video.camerasList).then((res)=>{
                    console.log(res)
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
            },
            getColor(){
                var r = Math.floor(Math.random()*256);
                var g = Math.floor(Math.random()*256);
                var b = Math.floor(Math.random()*256);
                var rgb = '('+r+','+g+','+b+')';
                return rgb
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
