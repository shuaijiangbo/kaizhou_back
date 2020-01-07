<template>
    <div id="map" style="width: 100%;height: 100%;">
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
                superMap:null,
                id:''
            }
        },
        components: {

        },
        computed: {
        },
        created(){
            this.id=this.$route.query.id;
            this.getMap();
        },
        activated(){
        },
        deactivated(){
        },
        mounted(){
        },
        methods: {
            getMap(){
                get(url.task.villageView+this.id).then((res) => {
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
                });
            },
        },
        watch: {
            '$route'(to, from) {
                this.superMap.map.destroy();
                this.id=this.$route.query.id;
                this.getMap();
            }
        }
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
