<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse"
            text-color="#fff" active-text-color="#fff" unique-opened >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title" >
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    <div  v-if="threeItem.path=='/monitor'" @click="goMonitor(i,threeItem.top)">
                                         {{ threeItem.title }}
                                    </div>
                                    <router-link  v-else :to="{path:threeItem.path}">
                                        {{ threeItem.title }}
                                    </router-link>
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                <router-link :to="{path:subItem.path}">
                                    {{ subItem.title }}
                                </router-link>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <router-link :to="item.path">
                            <i :class="item.icon"></i><span>{{ item.title }}</span>
                        </router-link>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    import {get, post,put,deletes} from '@/api/fetch.js';
    import url from '@/api/serviceAPI.config.js';

    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'iconfont icon-shouye',
                        index: '1',
                        title: '首页',
                        path:'/home'
                    },
                    {
                        icon: 'iconfont icon-shiziduiwu',
                        index: '5',
                        title: '果园基础信息管理',
                        subs: [
                            {
                                index: '4-1',
                                title: '果园村组管理',
                                path:'/task/village',
                            },{
                                index: '4-2',
                                title: '果园区域管理',
                                path:'/task/area'
                            },{
                                index: '4-6',
                                title: '果园人员管理',
                                path:'/task/personnel'
                            }
                        ]
                    },
                    {
                        icon: 'iconfont icon-shiziduiwu',
                        index: '3',
                        title: '果园远程控制',
                        subs: [
                            {
                                index: '3-1',
                                title: '水肥一体化',
                                subs:[
                                    {
                                        index: '3-1-4',
                                        title: '远程控制',
                                        path:'/control/switchControl'
                                    },
                                    {
                                        index: '3-1-2',
                                        title: '联动控制',
                                        path:'/control/linkage'
                                    },
                                    {
                                        index: '3-1-3',
                                        title: '定时控制',
                                        path:'/control/timing'
                                    },
                                    {
                                        index: '3-1-1',
                                        title: '控制履历',
                                        path:'/control/resume'
                                    },
                                ]
                            },{
                                index: '3-2',
                                title: '无人机控制',
                                subs:[
                                    {
                                        index: '3-2-1',
                                        title: '无人机任务管理',
                                        path:'/control/resume'
                                    },
                                    {
                                        index: '3-2-2',
                                        title: '无人机操控',
                                        path:'/control/resume'
                                    },
                                ]
                            },{
                                index: '3-3',
                                title: '无人农机具控制',
                                subs:[
                                    {
                                        index: '3-3-1',
                                        title: '农机具任务管理',
                                        path:'/control/resume'
                                    },
                                    {
                                        index: '3-3-2',
                                        title: '无人农机具操控',
                                        path:'/control/resume'
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        icon: 'iconfont icon-xuejiyidong',
                        index: '4',
                        title: '果园作业管理',
                        subs: [
                            {
                                index: '4-3',
                                title: '果园任务管理',
                                path:'/task'
                            },{
                                index: '4-4',
                                title: '果园专家信息管理',
                                path:'/task/expert'
                            },{
                                index: '4-5',
                                title: '果园历史照片',
                                path:'/album'
                            }
                        ]
                    },
                    {
                        icon: 'iconfont icon-xiangmusuohuochengji',
                        index: '7',
                        title: '视频图像监控分析',
                        subs: [
                            {
                                index: '7-1',
                                title: '360度全景',
                                subs: []
                            },
                            {
                                index: '7-2',
                                title: '视频监控',
                                subs: []
                            },
                            {
                                index: '7-3',
                                title: '视频分析',
                                path:'/video/analysis'
                            }
                        ]
                    },
                    {
                        icon: 'iconfont icon-xuexiaoqingkuang',
                        index: '6',
                        title: '果园在线监测管理',
                        subs:[
                            {
                                index: '6-1',
                                title: '在线监测',
                                path:'/on-line/monitoring'
                            },{
                                index: '6-2',
                                title: '监测预警',
                                path:'/on-line/jianceyujing'
                            },{
                                index: '6-3',
                                title: '预警设置',
                                path:'/on-line/earlyWarning'
                            },{
                                index: '6-4',
                                title: '站点监控',
                                path:'/on-line/stationMonitor',
                            },
                        ]
                    },
                    {
                        icon: 'iconfont icon-set',
                        index: '2',
                        title: '系统管理',
                        subs: [
                            {
                                index: '2-1',
                                title: '类型管理',
                                subs:[
                                    {
                                        index: '2-1-1',
                                        title: '人员类型管理',
                                        path:'/task/personnel/type'
                                    },{
                                        index: '2-1-2',
                                        title: '区域类型管理',
                                        path:'/task/area/type'
                                    },{
                                        index: '2-1-3',
                                        title: '任务类型管理',
                                        path:'/task/type'
                                    },{
                                        index: '2-1-4',
                                        title: '专家信息类型管理',
                                        path:'/task/expert/type'
                                    }
                                ]
                            },
                           {
                                index: '2-4',
                                title: '功能管理',
                                path:'/funcs'
                            },
                            {
                                index: '2-2',
                                title: '日志管理',
                                path:'/funcs'
                            }
                        ]
                    },
                ],
                monitorList1:[],
                monitorList2:[],
                monitorList3:[],
            }
        },
        computed:{
            onRoutes(){
                if(this.$route.path.replace('/','')=="task"){
                    return '4-3';
                }else if(this.$route.path.replace('/','')=="task/village"){
                    return '4-1';
                }else if(this.$route.path.replace('/','')=="video/analysis"){
                    return '7-3';
                }else if(this.$route.path.replace('/','')=='funcs'){
                    return '2-4'
                }else if(this.$route.path.replace('/','')=='control/switchControl'){
                    return '3-1-4'
                }else if(this.$route.path.replace('/','')=='on-line/monitoring'){
                    return '6-1'
                }
                // return this.$route.path.replace('/','');
                // return '2-1'
            }
        },
        created(){
            window.baseURL=url.baseURL;
            setTimeout(function(){
                link.connection();
            },1000);
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
            this.getMonitor();
            this.getMonitor2();
            // this.getMonitor3();
        },
        methods: {
            getMonitor(){
                get(url.video.cameras360List).then((res) => {
                    if(res.code==200){
                        this.monitorList1=res.data;
                        for(var i=0;i<this.monitorList1.length;i++){
                            var obj={
                                index: '',
                                title: '',
                                path:'/monitor',
                                top:1
                            };
                            var a=i+1
                            obj.index='7-1-'+a;
                            obj.title=this.monitorList1[i].name;
                            this.items[4].subs[0].subs.push(obj)
                        }
                    }
                });
            },
            getMonitor2(){
                get(url.video.camerasList).then((res) => {
                    if(res.code==200){
                        this.monitorList2=res.data;
                        for(var i=0;i<this.monitorList2.length;i++){
                            var obj={
                                index: '',
                                title: '',
                                path:'/monitor',
                                top:2
                            };
                            var a=i+1
                            obj.index='7-2-'+a;
                            obj.title=this.monitorList2[i].name;
                            this.items[4].subs[1].subs.push(obj)
                        }
                    }
                });
            },
            // getMonitor3(){
            //     get(url.video.camerasAnalysisList).then((res) => {
            //         if(res.code==200){
            //             this.monitorList3=res.data;
            //             for(var i=0;i<this.monitorList3.length;i++){
            //                 var obj={
            //                     index: '',
            //                     title: '',
            //                     path:'/monitor',
            //                     top:3
            //                 };
            //                 var a=i+1
            //                 obj.index='7-3-'+a;
            //                 obj.title=this.monitorList3[i].name;
            //                 this.items[3].subs[2].subs.push(obj)
            //             }
            //         }
            //     });
            // },
            goMonitor(index,top){
                var arr=[]
                if(top==1){
                    arr=this.monitorList1
                }else if(top==2){
                    arr=this.monitorList2
                }else{
                    arr=this.monitorList3
                }
                this.$router.push({path:'/monitor'});
                sessionStorage.setItem("index",index);
                var self=this;
                if(window.videoObject){
                    window.videoObject.play(arr[index],top);
                }
                window.ca={c:arr[index],t:top};
            }
        },
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 60px;
        bottom:0;
        overflow-y: scroll;
        background: #052f6f;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
    .sidebar-el-menu.el-menu{
        background:#052f6f ;
        border-right: 1px solid #04424b;
    }
</style>
