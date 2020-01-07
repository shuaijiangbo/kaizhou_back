import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/index',
            component: () => import(/* webpackChunkName: "login" */ '../components/pages/Index.vue'),
            meta: { title: '首页' }
        },
        {
            path: '/gis',
            component: () => import(/* webpackChunkName: "login" */ '../components/pages/Gis.vue'),
            meta: { title: 'GIS数字网格' }
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '临江镇福德村智慧柑橘果园管理系统' },
            children: [
                {
                    path: '/home',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/pages/Home.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/role',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/pages/Role.vue'),
                    meta: { title: '角色管理' }
                },
                {
                    path: '/user',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/pages/User.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/funcs',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/pages/Funcs.vue'),
                    meta: { title: '功能管理' }
                },
                {
                    path: '/department',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/pages/Department.vue'),
                    meta: { title: '部门管理' }
                },
                {
                    path: '/task/area',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/orchard/task/Area.vue'),
                    meta: { title: '果园区域管理' }
                },
                {
                    path: '/task/area/type',
                    component: () => import(/* webpackChunkName: "form" */ '../components/orchard/task/AreaType.vue'),
                    meta: { title: '果园区域类型管理' }
                },
                {
                    path: '/task/village',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/orchard/task/village.vue'),
                    meta: { title: '村组管理' }
                },
                {
                    path: '/task/personnel/type',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/orchard/task/personnelType.vue'),
                    meta: { title: '人员类型管理' }
                },
                {
                    path: '/task/personnel',
                    component: () => import(/* webpackChunkName: "table" */ '../components/orchard/task/personnel.vue'),
                    meta: { title: '人员管理' }
                },
                {
                    path: '/task',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/orchard/task/task.vue'),
                    meta: { title: '果园任务管理' }
                },
                {
                    path: '/task/type',
                    component: () => import(/* webpackChunkName: "form" */ '../components/orchard/task/taskType.vue'),
                    meta: { title: '果园任务类型管理' }
                },
                {
                    path: '/map',
                    component: () => import(/* webpackChunkName: "form" */ '../components/orchard/task/map.vue'),
                    meta: { title: '地图' }
                },
                {
                    path: '/task/expert',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/orchard/task/expert.vue'),
                    meta: { title: '专家信息发布' }
                },
                {
                    path: '/task/expert/type',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/orchard/task/expertType.vue'),
                    meta: { title: '专家信息类型管理' }
                },
                {
                    // 图片上传组件
                    path: '/monitor',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/orchard/video/monitor.vue'),
                    meta: { title: '视频监控' }
                },
                {
                    // vue-schart组件
                    path: '/album',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/orchard/task/album.vue'),
                    meta: { title: '果园历史照片' }
                },
                {
                    // 拖拽列表组件
                    path: '/on-line/monitoring',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/orchard/onLine/monitoring.vue'),
                    meta: { title: '在线监测' }
                },
                {
                    path: '/on-line/earlyWarning',
                    component: () => import( '../components/orchard/onLine/earlyWarning.vue'),
                    meta: { title: '预警设置' }
                },
                {
                    path: '/on-line/jianceyujing',
                    component: () => import( '../components/orchard/onLine/jianceyujing.vue'),
                    meta: { title: '监测预警' }
                },
                {
                    path: '/on-line/stationMonitor',
                    component: () => import( '../components/orchard/onLine/stationMonitor.vue'),
                    meta: { title: '站点监控' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/control/resume',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/orchard/remoteControl/controlResume.vue'),
                    meta: { title: '控操履历' }
                },
                {
                    path: '/control/switchControl',
                    component: () => import('../components/orchard/remoteControl/switchControl.vue'),
                    meta: { title: '远程控制开关' }
                },
                {
                    // 联动控制
                    path: '/control/linkage',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/orchard/remoteControl/linkage.vue'),
                    meta: { title: '联动控制' }
                },
                {
                    // 定时控制
                    path: '/control/timing',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/orchard/remoteControl/timing.vue'),
                    meta: { title: '定时控制' }
                },
                {
                    // 国际化组件
                    path: '/album/photo',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/orchard/task/photo.vue'),
                    meta: { title: '照片' }
                },
                {
                    // 视频分析
                    path: '/video/analysis',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/orchard/video/analysis.vue'),
                    meta: { title: '视频分析'}
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/message',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Tabs.vue'),
                    meta: { title: '消息通知' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
