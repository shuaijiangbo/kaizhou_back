const EVENTBASEURL="event-api/api/"
const LTBASEURL="lt-api/api/"

let baseURL='';
if(process.env.NODE_ENV === 'development'){
    baseURL ='http://119.84.133.7:18086/api/';  //开发环境
    // baseURL ='http://119.84.133.7:18086/api/';  //开发环境
  //   baseURL ='../../api/'; //生产环境
}else if (process.env.NODE_ENV === 'production'){
  baseURL ='../../api/'; //生产环境
}

const URL = {
    baseURL:baseURL,
  // 登录
    log:{
        login:baseURL+'user/login',//登录
        logout:baseURL+'user/logout',//退出登录
    },
/*************************系统管理*****************************/
  //角色管理
  role:{
    roleBase: baseURL+'role', // 添加角色/修改角色/角色信息回填/删除
    roleDelete: baseURL+'role/delete', // 添加角色/修改角色/角色信息回填/删除
    getDeatil:baseURL+'role/findByCode', //角色信息回填
    searchList:baseURL+'role/search', //角色列表
    saveFunsTreeDada:baseURL+'roleFunction/addDatas', //绑定功能树
    undateFunsTreeDada:baseURL+'roleFunction/updateDatas', //修改绑定功能树
    getBelongFunsList:baseURL+'roleFunction/search', //获取已绑定功能树
    findConfirmRepeat:baseURL+'role/findConfirmRepeat', //验证类型名称，类型编码是否重复
  },

  //功能管理
  fun:{
    funSearch: baseURL+'function/search', // 搜索，获取列表
    getDeatil:baseURL+'function/findByCode', //角色信息回填
    funAdd:baseURL+'function', //添加
    delete:baseURL+'function', //删除
  },

  //用户管理
  user:{
    searchList: baseURL+'user/search', // 搜索，获取列表
    getDeatil:baseURL+'user/find/', //角色信息回填
    add:baseURL+'user/add', //添加
    delete:baseURL+'user/delete/', //delete
    update:baseURL+'user/update', //编辑修改
    addDatas:baseURL+'userRole/addDatas', //新增绑定角色
    updateRoleTreeData:baseURL+'userRole/updateDatas', //修改绑定角色
    saveRole:baseURL+'userRole/save', //绑定角色
    getBelongRoleList:baseURL+'userRole/search', //所属角色回填
    listFunctions:baseURL+'user/listFunctions', //查询功能列表
    fetchUserByRole:baseURL+'user/fetchUserByRole', //获取角色包含组长的用户
    userAddDatas:baseURL+'userRole/addDatas', //获取角色包含组长的用户
      userCount:baseURL+'user/fetchCountUser', //用户统计
      resetPassword:baseURL+'user/resetPassword', //重置密码
      findConfirmRepeat:baseURL+'user/findConfirmRepeat', //验同一区域下用户名是否重复
      confirmUserPwd:baseURL+'user/confirmUserPwd', //验证用户密码是否正确
  },

  //部门管理
  deptManage:{
    deptSearch:baseURL+'projectDepartment/search',//搜索，获取列表
    getDeptsByAreaId:baseURL+'projectDepartment/getDeptsByAreaId/',//搜索，获取列表
    deptAdd:baseURL+'projectDepartment/add',//添加部门
    deptDelete:baseURL+'projectDepartment/delete/',//删除部门
    changeStatus:baseURL+'projectDepartment/changeStatus',//禁用启用
    deleteByIds:baseURL+'projectDepartment/deleteByIds',//批量删除
    deptDetail:baseURL+'projectDepartment/',//回填
    deptModify:baseURL+'projectDepartment/modify',//编辑
    exportExcel:baseURL+'projectDepartment/exportexcel',//导出部门
  },

    // 果园作业管理
    task:{
        //区域管理
        areaSearch: baseURL+'area/search',//分页条件查询区域信息
        areaAdd: baseURL+'area/add',//新增区域
        areaDelete: baseURL+'area/delete/',//区域删除(单条)
        areaDeleteBatch: baseURL+'area/deleteBatch',//区域删除(批量)
        areaListArea: baseURL+'area/listArea/',//根据villageId查询区域信息
        areaUpdate: baseURL+'area/update',//区域修改
        areaView: baseURL+'area/view/', //区域查看
        areaNum: baseURL+'area/listUserByAreaId/', //根据区域id查询区域下的人员
        // 村组管理
        villageAdd: baseURL+'village/add', //新增村组
        villageDelete: baseURL+'village/delete/',//村组删除(单条)
        villageDeleteBatch: baseURL+'village/deleteBatch',//村组删除(批量)
        villageListVillage: baseURL+'village/listVillage',//查询村组信息
        villageSearch: baseURL+'village/search',//分页条件查询村组信息
        villageUpdate: baseURL+'village/update', //村组修改
        villageView: baseURL+'village/view/', //村组查看
        villageTeam: baseURL+'village/listUserByVillageId', //查询村组下的用户
        villageCount: baseURL+'village/fetchCountVillage', //统计村组
        listUserVoByVillageId: baseURL+'village/listUserVoByVillageId', //查询不在任何区域下且不是组长的用户（VillageId：当前村组id）
        villageUpdateUserArea: baseURL+'village/updateUserArea', //编辑用户区域成员管理

        //任务管理
        taskSearch: baseURL+'task/pageTask', //分页查询任务清单
        taskDelete:baseURL+'task/deleteTask',//删除任务
        taskRelease:baseURL+'task/releaseTask',//发布下架任务
        taskAdd:baseURL+'task/addTask',//添加任务
        taskUpdate:baseURL+'task/updateTask',//修改任务
        taskFind:baseURL+'task/findTaskCompletedInfo',//任务详情
        taskCount:baseURL+'task/getTaskNumber',//查询任务数
    },

    // 类型管理
    type:{
        typeSearch: baseURL+'type/search',//分页查询
        typeDelete: baseURL+'type/deleteType',//删除字典
        typeAdd: baseURL+'type/addType',//添加字典
        typeUpdate: baseURL+'type/updateType',//修改字典
    },

    // 专家信息
    expert:{
        expertSearch:baseURL+'farmerRemind/search',//分页查询
        expertDelete:baseURL+'farmerRemind/deleteFarmerRemind',//删除专家信息
        expertRelease:baseURL+'farmerRemind/release',//发布专家信息
        expertPersonList:baseURL+'user/fetchFarmerRemindUserByRole',//查询专家姓名
        expertAdd:baseURL+'farmerRemind/addFarmerRemind',//添加专家信息
        expertUpdate:baseURL+'farmerRemind/updateFarmerRemind',//修改专家信息
        expertToTask:baseURL+'task/farmerRemindToTask',//专家提醒转成任务
        expertFind:baseURL+'farmerRemind/find/',//根据序号查询农户提醒数据
    },

    controlCircuitBreaker:baseURL+'controlCircuitBreaker',         //空开

    // 监控
    video:{
        camerasList:baseURL+'camera/listCameras',//视频监控
        cameras360List:baseURL+'camera/cameras360',//360度全景监控
        camerasAnalysisList:baseURL+'camera/camerasAnalysis',//视频分析
        searchHomeVideo:baseURL+'camera/getIndexCameras',//查询首页视频

        warningSetList:baseURL+'warningSet/search',//预警设置
        warningSetAdd:baseURL+'warningSet/add',//预警设置
        warningSetUpdate:baseURL+'warningSet/update',//预警设置
        warningSetFind:baseURL+'warningSet/find',//预警单条查询
        warningSetDelete:baseURL+'warningSet/delete/',//删除预警
        listDevice:baseURL+'device/listDevice',//查询所有站点
        earlyWarningList:baseURL+'earlyWarning/search',//查询所有站点
        findByDeviceId:baseURL+'warningSet/findByDeviceId',//根据deviceId查询指标

        getAllDeviceLastControl:baseURL+'getAllDeviceLastControl',//空开记录
        pageKongKaiRecord:baseURL+'kongKai/pageKongKaiRecord',//空开所有记录
        deleteKongKaiRecord:baseURL+'kongKai/deleteKongKaiRecord',//删除

        searchDevice:baseURL+'device/search',//查询站点
        fetchRegister:baseURL+'device/fetchRegister',//站点监测顶部数据
        getKongKaiCameras:baseURL+'camera/getKongKaiCameras',
        updateIsEnabled:baseURL+'warningSet/updateIsEnabled',
    },

    //照片
    photo:{
        // photoSearch:baseURL+'photo/search',//分页条件查询相册信息
        photoAdd:baseURL+'photo/add',//添加相册
        photoDelete:baseURL+'photo/delete',//删除相册
        photoSearch:baseURL+'photo/listPhoto',//查询所有相册
        pictureAdd:baseURL+'photograph/add',//添加照片
        pictureSearch:baseURL+'photograph/search',//分页条件查询照片信息
        pictureDelete:baseURL+'photograph/delete',//删除照片
    },

    //预警
    warning:{
        getWarningNum:baseURL+'earlyWarning/fecthCountEarlyWarning',//预警信息统计
        warningOne:baseURL+'earlyWarning/find',//查询单条
    },

    //控制
    contrl:{
      //联动控制
        linkageSearch:baseURL+'linkage/search',//分页条件查询
        linkageAdd:baseURL+'linkage/add',//新增
        linkageDeleteBatch:baseURL+'linkage/deleteBatch',//删除(批量)
        linkageDelete:baseURL+'linkage/delete/',//删除(单条)
        linkageUpdate:baseURL+'linkage/update/',//修改
        linkageStartOrStop:baseURL+'linkage/startOrStop/',//启用或停用
        linkageView:baseURL+'linkage/view/',//查看单条

        //定时控制
        timingSearch:baseURL+'timing/search',//分页条件查询
        timingAdd:baseURL+'timing/add',//新增
        timingDeleteBatch:baseURL+'timing/deleteBatch',//删除(批量)
        timingDelete:baseURL+'timing/delete/',//删除(单条)
        timingUpdate:baseURL+'timing/update/',//修改
        timingStartOrStop:baseURL+'timing/startOrStop/',//启用或停用
    },

    //站内信
    inMal:{
        inMailCount:baseURL+'inMail/fetchInMailCount',//统计站内信条数
        inMailFetchRegistry:baseURL+'inMail/fetchRegistry',//统计站内信各项信息条数
        inMailFindEarlyWarning:baseURL+'inMail/findEarlyWarningInMail',//分页条件查询站内信预警信息
        inMailFindFarmerRemind:baseURL+'inMail/findFarmerRemindInMail',//分页条件查询站内信预警信息
        inMailFindTask:baseURL+'inMail/findTaskInMail',//分页条件查询站内信任务
        inMailAdd:baseURL+'inMail/add',//设置已读
    },

    wlw:baseURL+'/wlw/history'
}

module.exports = URL;
