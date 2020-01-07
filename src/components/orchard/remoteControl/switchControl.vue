<template>
    <div>
        <!--
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>果园远程控制</el-breadcrumb-item>
            <el-breadcrumb-item>水肥一体化</el-breadcrumb-item>
            <el-breadcrumb-item>远程控制开关</el-breadcrumb-item>
        </el-breadcrumb>-->
        <div class="outer" style="">
            <!--
            <div class="table_box" >
                <el-table
                      :data="tableData"
                      border
                      style="width: 100%;z-index: 100">
                    <el-table-column
                          prop="name"
                          label="控制名称"
                          width="180">
                    </el-table-column>
                    <el-table-column
                          prop="userName"
                          label="控制人"
                          width="180">
                    </el-table-column>
                    <el-table-column
                          prop="kongKaiRecord.createTime"
                          label="控制时间">
                    </el-table-column>
                    <el-table-column
                          prop="kongKaiRecord.msg"
                          label="控制操作">
                    </el-table-column>

                </el-table>
            </div>-->

            <div class="center_content_box" id="centerWaterFlow">
                <div>
                    <div class="controller">
                        <ul>
                            <li :class="[{active:item.status=='1'}]" v-for="(item,index) in controller">
                                <div class="press_name">{{item.name}}</div>
                                <div class="switch_controll">
                                    <p class="operation_time">
                                       {{'操作时间：'+item.time}}
                                    </p>
                                    <div>
                                        <p class="switch_status">
                                            <span>状态：</span>
                                            <span class="now_status">{{item.status=='1'?'开':'关'}}</span>
                                        </p>
                                        <div class="switcher_box">
                                            <span class="status_lamp"></span>
                                            <span :id="item.idNme" :class="['switch_btn',{'open':item.status=='1'},{'close':item.status!='1'}]"></span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="pool">
                        <p>60%</p>
                    </div>
                    <div class="mercury"></div>

                    <!--左边罐子-->
                    <div class="left_one left_container">
                        <p>N</p>
                        <canvas class="left_caps" id="capN"></canvas>
                        <p class="element_bulk" id="leftOneNum">80%</p>
                    </div>
                    <div class="left_two left_container">
                        <p>P</p>
                        <canvas class="left_caps" id="capP"></canvas>
                        <p class="element_bulk" id="leftTweNum">80%</p>
                    </div>
                    <div class="left_three left_container">
                        <p>K</p>
                        <canvas class="left_caps" id="capK"></canvas>
                        <p class="element_bulk" id="leftThreeNum">80%</p>
                    </div>
                    <div class="left_four left_container">
                        <p>OR</p>
                        <canvas class="left_caps" id="capOR"></canvas>
                        <p class="element_bulk" id="leftFourNum">80%</p>
                    </div>


                    <!--右边罐子-->
                    <div class="right_one right_container">
                        <p>称重</p>
                        <canvas class="right_caps" id="capWeight"></canvas>
                        <p class="element_bulk">380kg</p>
                    </div>
                    <div class="right_two right_container">
                        <p style="position: relative;top: 10px;">稀释桶</p>
                        <canvas class="right_caps" id="capXST" style="left: 12px;border-radius: 30px"></canvas>
                        <p class="element_bulk" style="top: 60px;">500kg</p>
                    </div>

                    <!--水池连线-->
                    <div class="water_1_1 canvas_bg_y">
                        <canvas id="water11"></canvas>
                        <div class="zjt1 adapter_2"></div>
                    </div>

                    <div class="water_1_2 canvas_bg_x">
                        <canvas id="water12" ></canvas>
                    </div>

                    <!--左边连线-->
                    <div class="left_1_1 canvas_bg_y">
                        <canvas id="left11"></canvas>
                        <div class="zjt1 adapter_2"></div>
                    </div>

                    <div class="left_1_2 canvas_bg_x">
                        <canvas id="left12" ></canvas>
                    </div>

                    <div class="left_2_1 canvas_bg_y">
                        <canvas id="left21"></canvas>
                        <div class="zjt1 adapter_2"></div>
                    </div>

                    <div class="left_2_2 canvas_bg_x">
                        <canvas id="left22"></canvas>
                    </div>

                    <div class="left_3_1 canvas_bg_y">
                        <canvas id="left31"></canvas>
                        <div class="zjt1 adapter_2"></div>
                    </div>

                    <div class="left_3_2 canvas_bg_x">
                        <canvas id="left32"></canvas>
                    </div>

                    <div class="left_4_1 canvas_bg_y">
                        <canvas id="left41"></canvas>
                        <div class="zjt1 adapter_2"></div>
                    </div>

                    <div class="left_4_2 canvas_bg_x">
                        <canvas id="left42"></canvas>
                    </div>

                    <!--右边连线-->
                    <div class="right_1_1 canvas_bg_y">
                        <canvas id="right11"></canvas>
                        <div class="zjt2 adapter_2 rotate270"></div>
                    </div>

                    <div class="right_1_2 canvas_bg_x">
                        <canvas id="right12" ></canvas>
                    </div>

                    <div class="right_2_1 canvas_bg_x">
                        <canvas id="right21" ></canvas>
                    </div>

                    <div class="right_3_1 canvas_bg_x">
                        <canvas id="right31" ></canvas>
                        <div class="zjt3 adapter_2 rotate180"></div>
                    </div>
                    <div class="right_3_2 canvas_bg_y">
                        <canvas id="right32" ></canvas>
                    </div>

                    <div class="right_4_1 canvas_bg_x">
                        <canvas id="right41" ></canvas>
                    </div>


                    <!--//长线start-->
                    <div class="bottom_1_1 canvas_bg_y">
                        <canvas id="bottom11"></canvas>
                        <div class="zjt1 adapter_2"></div>
                        <div class="pressure_tip">
                            <span class="">→</span>
                            <p>液压</p>
                            <p>0.986MPa</p>
                        </div>
                    </div>

                    <div class="bottom_1_2 canvas_bg_x">
                        <canvas id="bottom12"></canvas>
                        <div class="zjt3 adapter_2 rotate180"></div>
                    </div>
                    <div class="bottom_1_3 canvas_bg_y">
                        <canvas id="bottom13"></canvas>
                        <div class="zjt2 adapter_2 rotate270"></div>
                    </div>
                    <div class="bottom_1_4 canvas_bg_x">
                        <canvas id="bottom14"></canvas>
                        <div class="zjt4 adapter_2 rotate90"></div>
                    </div>
                    <div class="bottom_1_5 canvas_bg_y">
                        <canvas id="bottom15"></canvas>
                    </div>
                    <!--//长线end-->

                    <div class="bottom_2_1 canvas_bg_y">
                        <canvas id="bottom21"></canvas>
                    </div>

                    <div class="bottom_3_1 canvas_bg_y">
                        <canvas id="bottom31"></canvas>
                    </div>

                    <div class="bottom_4_1 canvas_bg_y">
                        <canvas id="bottom41"></canvas>
                    </div>

                    <!--  <div class="bottom_5_1 canvas_bg_y">
                          <canvas id="bottom51"></canvas>
                      </div>-->

                    <div class="soil_lists">
                        <div class="soil"><p>浇灌面积：20亩</p></div>
                        <div class="soil"><p>浇灌面积：20亩</p></div>
                        <div class="soil"><p>浇灌面积：20亩</p></div>
                        <div class="soil"><p>浇灌面积：15亩</p></div>
                    </div>

                    <div class="switchWatcherBox">
                        <div>
                            <video id="switch1" src=""></video>
                        </div>
                        <div>
                            <video id="switch2" src=""></video>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {get, post,put,deletes} from '@/api/fetch.js';

   /* const Myflow= require("../../common/pageA.js");*/

    import url from '@/api/serviceAPI.config.js';


    var config1={
        time:400,   //时间
        point:[
            [{x:10,y:0}, {x:10,y:160}],
            [{x:0,y:10}, {x:400,y:10}],
        ],
        element:['left11','left12'],
        color:'#1c86d1'
    }

    var config2={
        time:400,   //时间
        point:[
            [{x:10,y:0}, {x:10,y:160}],
            [{x:0,y:10}, {x:400,y:10}],
        ],
        element:['left21','left22'],
        color:'#4e47f6'
    }

    var config3={
        time:400,   //时间
        point:[
            [{x:10,y:0}, {x:10,y:160}],
            [{x:0,y:10}, {x:400,y:10}],
        ],
        element:['left31','left32'],
        color:'#f68c61'
    }

    var config4={
        time:400,   //时间
        point:[
            [{x:10,y:0}, {x:10,y:160}],
            [{x:0,y:10}, {x:400,y:10}],
        ],
        element:['left41','left42'],
        color:'#f62bee'
    }

    //水池
    var config5={
        time:400,   //时间
        point:[
            [{x:10,y:0}, {x:10,y:60}],
            [{x:0,y:10}, {x:500,y:10}],
        ],
        element:['water11','water12'],
        color:'#509ce8'
    }

    //称重下
    var config6={
        time:400,   //时间
        point:[
            [{x:10,y:0},{x:10,y:100}],
            [{x:130,y:10},{x:0,y:10}],
        ],
        element:['right11','right12'],
        color:'#1b639e'
    }
    //称重上
    var config7={
        time:400,   //时间
        point:[
            [{x:0,y:10},{x:130,y:10}],
        ],
        element:['right21'],
        color:'#1b639e'
    }

    //稀释下
    var config8={
        time:400,   //时间
        point:[
            [{x:270,y:10},{x:0,y:10}],
        ],
        element:['right41'],
        color:'#a460e8'
    }

    //稀释上
    var config9={
        time:400,   //时间
        point:[
            [{x:0,y:10},{x:250,y:10}],
            [{x:10,y:0},{x:10,y:40},],
        ],
        element:['right31','right32'],
        color:'#a460e8'
    }

    //底部长线
    var config10={
        time:400,   //时间
        point:[
            [{x:10,y:0}, {x:10,y:160}],
            [{x:0,y:10},{x:550,y:10},],
            [{x:10,y:0}, {x:10,y:60}],
            [{x:1270,y:10}, {x:0,y:10}],
            [{x:10,y:0}, {x:10,y:160}],
        ],
        element:['bottom11','bottom12','bottom13','bottom14','bottom15',],
        color:'#824dba'
    }

    //短线1
    var config11={
        time:400,   //时间
        point:[
            [{x:10,y:0},{x:10,y:150},],
        ],
        element:['bottom21'],
        color:'#824dba'
    }
    //短线2
    var config12={
        time:400,   //时间
        point:[
            [{x:10,y:0},{x:10,y:150},],
        ],
        element:['bottom31'],
        color:'#824dba'
    }
    //短线3
    var config13={
        time:400,   //时间
        point:[
            [{x:10,y:0},{x:10,y:150},],
        ],
        element:['bottom41'],
        color:'#824dba'
    }


    var flowLine= {
        f1: null,
        f2: null,
        f3: null,
        f4: null,

        f5: null, //水池

        f6: null, //称重下
        f7: null, //称重上
        f8: null, //稀释桶下
        f9: null, //稀释桶上

        f10:null , //长线

        f11: null, //短线1
        f12: null, //短线2
        f13: null, //短线3
    }

    var rangeValueLeft=60,waveWidthLeft = 0.025,speedLeft = 0.02;
    var rangeValueRight1=30,waveWidthRight1 = 0.075,speedRight1 = 0.08;
    var rangeValueRight2=30;

    export default {
        name: 'village',
        data() {
            return {
                input:'',
                tableHeight: 665,
                pageNum:0,
                pageSize:10,
                listLoading: false, //loading
                dialogAddVisible:false,
                formLabelWidth: '110px',
                tableData: [],
                clickIndex:1,
                controller:[{
                    name:'水泵',
                    time:'2019-09-23 14:23:23',
                    status:'0',
                    idNme:'poolBtn'
                },{
                    name:'配肥泵',
                    time:'2019-09-23 14:23:23',
                    status:'0',
                    idNme:'huafeiBtn'
                },{
                    name:'稀释泵',
                    time:'2019-09-23 14:23:23',
                    status:'0',
                    idNme:'attenuationBtn'
                }]
            }
        },
        components: {

        },
        computed: {
        },
        created(){
        },
        activated(){
        },
        deactivated(){
        },
        mounted(){
            this.init();
            this.one();
            this.two();
            this.three();
            this.getList1();
            this.getVideo();

            $(".switchWatcherBox>div").click(function(){
                var id=$(this).children("video")[0].id;
                kaizhou.maxVideo({type:'live',id:id});
            });
        },
        methods: {
            //获取记录列表
            getVideo(){
                if(!window.monitoring) window.monitoring={};
                setTimeout(()=>{
                    $.ajax({
                        url : url.video.getKongKaiCameras,
                        type : "GET",
                        success : function(res) {
                             let v=new video(document.getElementById("switch1"));
                             v.hls(res.camera1);
                             let v2=new video(document.getElementById("switch2"));
                             v2.hls(res.camera2);
                             window.monitoring["switch1"]=v;
                             window.monitoring["switch2"]=v2;
                        },error:function(error){
                            console.log(error);
                        }
                    });
                },2000)
            },
            init(){
                let _self=this;

                 flowLine= {
                    f1: new Myflow(config1),
                    f2: new Myflow(config2),
                    f3: new Myflow(config3),
                    f4: new Myflow(config4),

                    f5: new Myflow(config5), //水池

                    f6: new Myflow(config6), //称重下
                    f7: new Myflow(config7), //称重上
                    f8: new Myflow(config8), //稀释桶下
                    f9: new Myflow(config9), //稀释桶上

                    f10: new Myflow(config10), //长线

                    f11: new Myflow(config11), //短线1
                    f12: new Myflow(config12), //短线2
                    f13: new Myflow(config13), //短线3
                }

                $('#poolBtn').on({
                    'click':function(){
                        let state=$(this).hasClass('close')?1:0;
                        let operation=$(this).hasClass('close')?'打开':'关闭';
                        _self.obj={
                            circuitBreakers:[{
                                'address':1 ,
                                'state':state ,
                            }],
                            keyCode:"e10adc3949ba59abbe56e057f20f883e",
                            tid:"98D863162840",
                        };
                        _self.clickIndex=1;

                        var result =  new Promise(_self.kongkai)
                            .then(()=>{
                                return new Promise(_self.getList);
                            }).then(res=>{
                                console.log();
                                _self.resultDetail(res);
                            }).catch(error=>{
                                console.log(error);
                            });
                    }
                })

                $('#huafeiBtn').on({
                    'click':function(){
                        let state=$(this).hasClass('close')?1:0;
                        _self.obj={
                            circuitBreakers:[{
                                'address':1 ,
                                'state':state ,
                            }],
                            keyCode:"e10adc3949ba59abbe56e057f20f883e",
                            tid:"98D863162C70",
                        };
                        _self.clickIndex=2;
                        var result =  new Promise(_self.kongkai)
                            .then(()=>{
                                    return new Promise(_self.getList);
                           /* return Promise.resolve('111')*/
                        }).then(res=>{
                                _self.resultDetail(res);
                        }).catch(error=>{
                            console.log(error);
                        });
                        /*
                        _self.kongkai({
                            circuitBreakers:[{
                                'address':1 ,
                                'state':state ,
                            }],
                            keyCode:"e10adc3949ba59abbe56e057f20f883e",
                            tid:"98D863162C70",
                        }).then(()=>{
                            /!*_self.getList();*!/
                            return Promise.resolve('111')
                        }).then(res=>{
                            console.log(43564654);
                            console.log(res);
                        }).catch(error=>{
                            console.log(error);
                        });*/
                    }
                })

                $('#attenuationBtn').on({
                    'click':function(){
                        let state=$(this).hasClass('close')?1:0;
                        _self.obj={
                            circuitBreakers:[{
                                'address':1 ,
                                'state':state ,
                            }],
                            keyCode:"e10adc3949ba59abbe56e057f20f883e",
                            tid:"98D863161765",
                        };
                        _self.clickIndex=3;
                        var result =  new Promise(_self.kongkai)
                            .then(()=>{
                                return new Promise(_self.getList);
                            })
                            .then(res=>{
                                _self.resultDetail(res);
                            }).catch(error=>{
                                console.log(error);
                            });
                    }
                })


            },
            //关土地管
             closeFlowSoil(){
                    flowLine['f10'].destroy();
                    flowLine['f11'].destroy();
                    flowLine['f12'].destroy();
                    flowLine['f13'].destroy();
            },
            //开土地管
            flowSoil(){
                flowLine['f10'].flowFun();
                setTimeout(()=>{
                    flowLine['f11'].flowFun();
                    },10000)
                setTimeout(()=>{
            flowLine['f12'].flowFun();
                },14000)
                setTimeout(()=>{
            flowLine['f13'].flowFun();
                },16500)
            },
      resultDetail(res){
        if(res.index==1){
            if(res.operation=='open'){      //水池开
                flowLine['f5'].flowFun();
            }else if(res.operation=='close'){//水池关
                flowLine['f5'].destroy();
            }
        }
        else if(res.index==2){                      //化肥
            if(res.operation=='open'){              //化肥开
                flowLine['f1'].flowFun();
                flowLine['f2'].flowFun();
                flowLine['f3'].flowFun();
                flowLine['f4'].flowFun();
                rangeValueLeft=30;
                waveWidthLeft = 0.075 ; //波浪宽度,数越小越宽
                speedLeft = 0.08; //波浪速度，数越大速度越快
            }else if(res.operation=='close'){       //化肥关
                flowLine['f1'].destroy();
                flowLine['f2'].destroy();
                flowLine['f3'].destroy();
                flowLine['f4'].destroy();
                rangeValueLeft=60;
                waveWidthLeft = 0.025 ; //波浪宽度,数越小越宽
                speedLeft = 0.02; //波浪速度，数越大速度越快
            }
        }else if(res.index==3){                         //稀释泵
            if(res.operation=='open'){                  //稀释开
                flowLine['f7'].flowFun();
                flowLine['f9'].flowFun();
                setTimeout(()=>{
                    flowLine['f6'].flowFun();
                    flowLine['f8'].flowFun();
                },5000)

                rangeValueRight1=60;
                waveWidthRight1 = 0.075 ; //波浪宽度,数越小越宽
                speedRight1 = 0.08; //波浪速度，数越大速度越快

                setTimeout(()=>{
                    rangeValueRight2=60;
                },2000)
                setTimeout(()=>{
                    rangeValueRight1=50;
                    rangeValueRight2=50;
                },5000)
            }else if(res.operation=='close'){       //稀释泵关
                flowLine['f7'].destroy();
                flowLine['f8'].destroy();
                flowLine['f9'].destroy();
                flowLine['f6'].destroy();

                rangeValueRight1=20;
                waveWidthRight1 = 0.025 ; //波浪宽度,数越小越宽
                speedRight1 = 0.02; //波浪速度，数越大速度越快
                rangeValueRight2=20;
            }
        }

        if(res.soilBtn=='open'){
            this.flowSoil();
        }else{
            this.closeFlowSoil();
        }
    },
            getList(resolve,reject){
                this.listLoading = true;
                let soilBtn='open';
                let _self=this;
                let lineStatus=1;
                setTimeout(()=>{
                    get(url.video.getAllDeviceLastControl,{}).then((res)=>{
                        res.data.forEach((item,index)=>{
                            this.controller[index].status=item.status;
                            /*this.controller[index].status=item.msg=='关闭'?'0':'1';*/
                            this.controller[index].time=item.lastTime;
                            if(item.status!='1')soilBtn='close';

                            if(item.status==1&&item.msg=='关闭') lineStatus=0;
                            if(item.status==0&&item.msg=='打开') lineStatus=0;
                        })

                        if(lineStatus){
                            resolve({
                                soilBtn:soilBtn,
                                index:this.clickIndex,
                                operation:this.controller[this.clickIndex-1].status==1?'open':'close',
                            });
                        }else{
                            _self.getList(resolve,reject);
                        }
                    }).catch(error=>{
                        console.log(error);
                    });
                },1000)
            },
            getList1(){
                let soilBtn='open';
                this.listLoading = true;
                get(url.video.getAllDeviceLastControl,{}).then((res)=>{
                    res.data.forEach((item,index)=>{
                        this.controller[index].status=item.status;
                        this.controller[index].time=item.lastTime;
                        if(item.status!='1')soilBtn='close';
                        this.resultDetail({
                            soilBtn:soilBtn,
                            index:index+1,
                            operation:this.controller[index].status==1?'open':'close',
                        });
                    })
                }).catch(error=>{
                    console.log(error);
                });
            },
            kongkai(resolve,reject){
                /*return new Promise((resolve, reject) => {*/
                let operation=this.obj.circuitBreakers[0].state?'打开':'关闭';

                this.$confirm('确认'+operation+'吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    // 创建实例时设置配置的默认值
                    var instance = axios.create();
                    // 在实例已创建后修改默认值
                    instance.defaults.headers.post['Content-Type'] = 'application/json';
                    instance.post(url.controlCircuitBreaker, this.obj).then(result =>{
                        if(result.data.code==200){
                            this.$message({
                                message: '操作成功,状态有延迟，请等待。。。',
                                type: 'success',
                                duration: 2500,
                            });
                        }else{
                            this.$message({
                                message: result.data.msg,
                                type: 'error',
                                duration: 1000,
                            });
                        }
                        resolve();
                    })
                }).catch(() => {
                    reject();
                });

               /* })*/
            },
            one(){
                var canvasN = document.getElementById('capN');
                var ctxN = canvasN.getContext('2d');

                var canvasP = document.getElementById('capP');
                var ctxP = canvasP.getContext('2d');

                var canvasK = document.getElementById('capK');
                var ctxK = canvasK.getContext('2d');

                var canvasOR = document.getElementById('capOR');
                var ctxOR= canvasOR.getContext('2d');


//range控件信息
                 rangeValueLeft = 60;
                var nowRange = 60; //用于做一个临时的range

//画布属性
                var mW = canvasK.width= canvasP.width= canvasN.width
                    = canvasOR.width = 68;

                var mH = canvasK.height= canvasP.height= canvasN.height
                    = canvasOR.height= 68;
                var lineWidth = 2;

//Sin 曲线属性
                var sX = 0;
                var sY = mH / 2;
                var axisLength = mW; //轴长
                waveWidthLeft = 0.025 ; //波浪宽度,数越小越宽
                var waveHeight = 2; //波浪高度,数越大越高
                speedLeft = 0.02; //波浪速度，数越大速度越快
                var xOffset = 0; //波浪x偏移量

                ctxK.lineWidth = lineWidth;


//画sin 曲线函数
                var drawSin = function(xOffset){
                    ctxN.save();
                    ctxP.save();
                    ctxK.save();
                    ctxOR.save();

                    var points=[]; //用于存放绘制Sin曲线的点

                    ctxN.beginPath();
                    ctxP.beginPath();
                    ctxK.beginPath();
                    ctxOR.beginPath();

                    //在整个轴长上取点
                    for(var x = sX; x < sX + axisLength; x += 20 / axisLength){
                        //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
                        var y = -Math.sin((sX + x) * waveWidthLeft + xOffset);

                        var dY = mH * (1 - nowRange / 100 );

                        points.push([x, dY + y * waveHeight]);
                        ctxN.lineTo(x, dY + y * waveHeight);
                        ctxP.lineTo(x, dY + y * waveHeight);
                        ctxK.lineTo(x, dY + y * waveHeight);
                        ctxOR.lineTo(x, dY + y * waveHeight);

                    }


                    //封闭路径
                    ctxN.lineTo(axisLength, mH);
                    ctxN.lineTo(sX, mH);
                    ctxN.lineTo(points[0][0],points[0][1]);
                    ctxN.fillStyle = '#1c86d1';
                    ctxN.fill();

                    ctxN.restore();


                    //封闭路径
                    ctxP.lineTo(axisLength, mH);
                    ctxP.lineTo(sX, mH);
                    ctxP.lineTo(points[0][0],points[0][1]);
                    ctxP.fillStyle = '#4e47f6';
                    ctxP.fill();

                    ctxP.restore();


                    //封闭路径
                    ctxK.lineTo(axisLength, mH);
                    ctxK.lineTo(sX, mH);
                    ctxK.lineTo(points[0][0],points[0][1]);
                    ctxK.fillStyle = '#f68c61';
                    ctxK.fill();

                    ctxK.restore();


                    //封闭路径
                    ctxOR.lineTo(axisLength, mH);
                    ctxOR.lineTo(sX, mH);
                    ctxOR.lineTo(points[0][0],points[0][1]);
                    ctxOR.fillStyle = '#f62bee';
                    ctxOR.fill();

                    ctxOR.restore();
                };


                var render = function(){
                    ctxK.clearRect(0, 0, mW, mH);
                    ctxN.clearRect(0, 0, mW, mH);
                    ctxP.clearRect(0, 0, mW, mH);
                    ctxOR.clearRect(0, 0, mW, mH);

                    if(nowRange <= rangeValueLeft){
                        var tmp = .4;
                        nowRange += tmp;
                    }

                    if(nowRange > rangeValueLeft){
                        var tmp = .4;
                        nowRange -= tmp;
                    }

                    drawSin(xOffset);

                    xOffset += speedLeft;
                    requestAnimationFrame(render);
                }
                render();
            },
            two(){
                var canvasWeight = document.getElementById('capWeight');
                var ctxWeight= canvasWeight.getContext('2d');

//range控件信息
                rangeValueRight1 = 20;
                var nowRange = 20; //用于做一个临时的range

//画布属性
                var mW  =canvasWeight.width = 68;

                var mH =canvasWeight.height= 68;
                var lineWidth = 2;

//Sin 曲线属性
                var sX = 0;
                var sY = mH / 2;
                var axisLength = mW; //轴长
                waveWidthRight1 = 0.025 ; //波浪宽度,数越小越宽
                var waveHeight = 2; //波浪高度,数越大越高
                speedRight1 = 0.02; //波浪速度，数越大速度越快
                var xOffset = 0; //波浪x偏移量

                ctxWeight.lineWidth = lineWidth;


//画sin 曲线函数
                var drawSin = function(xOffset){
                    ctxWeight.save();

                    var points=[]; //用于存放绘制Sin曲线的点

                    ctxWeight.beginPath();

                    //在整个轴长上取点
                    for(var x = sX; x < sX + axisLength; x += 20 / axisLength){
                        //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
                        var y = -Math.sin((sX + x) * waveWidthRight1 + xOffset);

                        var dY = mH * (1 - nowRange / 100 );

                        points.push([x, dY + y * waveHeight]);
                        ctxWeight.lineTo(x, dY + y * waveHeight);
                    }

                    //封闭路径
                    ctxWeight.lineTo(axisLength, mH);
                    ctxWeight.lineTo(sX, mH);
                    ctxWeight.lineTo(points[0][0],points[0][1]);
                    ctxWeight.fillStyle = '#1b639e';
                    ctxWeight.fill();

                    ctxWeight.restore();
                };


                var render1 = function(){
                    ctxWeight.clearRect(0, 0, mW, mH);

                    if(nowRange <= rangeValueRight1){
                        var tmp = 1;
                        nowRange += tmp;
                    }

                    if(nowRange > rangeValueRight1){
                        var tmp = 1;
                        nowRange -= tmp;
                    }

                    drawSin(xOffset);

                    xOffset += speedRight1;
                    requestAnimationFrame(render1);
                }

                render1();
            },
            three(){

                var canvasXST = document.getElementById('capXST');
                var ctxXST= canvasXST.getContext('2d');


//range控件信息
                rangeValueRight2 = 20;
                var nowRange = 20; //用于做一个临时的range

//画布属性
                var mW  =canvasXST.width = 91;

                var mH =canvasXST.height= 124;
                var lineWidth = 2;

//Sin 曲线属性
                var sX = 0;
                var sY = mH / 2;
                var axisLength = mW; //轴长
                var waveWidth = 0.075 ; //波浪宽度,数越小越宽
                var waveHeight = 2; //波浪高度,数越大越高
                var speedRight2 = 0.02; //波浪速度，数越大速度越快
                var xOffset = 0; //波浪x偏移量

                ctxXST.lineWidth = lineWidth;


//画sin 曲线函数
                var drawSin = function(xOffset){
                    ctxXST.save();

                    var points=[]; //用于存放绘制Sin曲线的点

                    ctxXST.beginPath();

                    //在整个轴长上取点
                    for(var x = sX; x < sX + axisLength; x += 20 / axisLength){
                        //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
                        var y = -Math.sin((sX + x) * waveWidth + xOffset);

                        var dY = mH * (1 - nowRange / 100 );

                        points.push([x, dY + y * waveHeight]);
                        ctxXST.lineTo(x, dY + y * waveHeight);
                    }

                    //封闭路径
                    ctxXST.lineTo(axisLength, mH);
                    ctxXST.lineTo(sX, mH);
                    ctxXST.lineTo(points[0][0],points[0][1]);
                    ctxXST.fillStyle = '#a460e8';
                    ctxXST.fill();

                    ctxXST.restore();
                };


                var render1 = function(){
                    ctxXST.clearRect(0, 0, mW, mH);

                    if(nowRange <= rangeValueRight2){
                        var tmp = .3;
                        nowRange += tmp;
                    }

                    if(nowRange > rangeValueRight2){
                        var tmp = .3;
                        nowRange -= tmp;
                    }

                    drawSin(xOffset);

                    xOffset += speedRight2;
                    requestAnimationFrame(render1);
                }

                render1();
            }
        },
    }

</script>

<style type="text/scss" lang="scss" scoped>
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



    /*水肥*/
.outer{
    padding: 10px;
    margin-top: 10px;
    position: absolute;
    top: -11px;
    bottom: 0px;
    right: 1px;
    left: 0px;
}
.table_box{
    width: 40%;
    position: absolute;
    left: 25%;
    top: 5%;
}
    .center_content_box{
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 99;
        background: url("../../../assets/img/shuifei/kzbg.png");
        background-size: 100% 100%;
    >div{
        position: relative;
        width: 86%;
        height: 100%;
        top: 5%;
        .controller{
            width: 980px;
            height: 180px;
            background:url("../../../assets/img/shuifei/kzqbg.png") no-repeat;
            background-size: 100% 100%;
            position: absolute;
            left: 5%;
            top: 1.6%;
            padding-top: 45px;
            ul{
                width: 100%;
                height: 100%;
                position: relative;
                li{
                    width: 33.3%;
                    height: 100%;
                    float: left;
                    color: #fff;
                    padding:10px 20px;
                    list-style: none;
                    &.active{
                        .status_lamp{
                            background:url("../../../assets/img/shuifei/kkon.png") no-repeat !important;
                            background-size: 100% 100%;
                        }
                        .switch_btn{
                            top: 71px!important;
                        }
                        .now_status{
                            color: #50fe00 !important;
                        }
                    }
                    .press_name{
                        background:url("../../../assets/img/shuifei/kzqtitle.png") no-repeat;
                        background-size: 100% 100%;
                        float: left;
                        height: 120px;
                        width: 50px;
                        box-sizing: border-box;
                        text-align: center;
                        writing-mode: vertical-lr;
                        line-height: 50px;
                        letter-spacing: 5px;
                    }
                    .switch_controll{
                        float: left;
                        color: #a1cfff;
                        margin-left: 15px;
                        .operation_time{
                            font-size: 15px;
                            position: relative;
                            top: 5px;
                        }
                        .switch_status{
                            float: left;
                            margin-top: 30px;
                            font-size: 30px;
                            .now_status{
                                color: #fe0100;
                            }
                        }

                        .switcher_box{
                            float: right;
                            background:url("../../../assets/img/shuifei/kkbg.png") no-repeat;
                            background-size: 100% 100%;
                            width: 115px;
                            height: 130px;
                            margin-top: -8px;
                            margin-right: -28px;
                            position: relative;
                            .status_lamp{
                                position: absolute;
                                top: 42px;
                                left: 51px;
                                width: 15px;
                                height: 15px;
                                background:url("../../../assets/img/shuifei/kkoff.png") no-repeat;
                                background-size: 100% 100%;
                            }
                            .switch_btn{
                                position: absolute;
                                top: 60px;
                                left: 41px;
                                width: 35px;
                                height: 15px;
                                background:url("../../../assets/img/shuifei/kkbtn.png") no-repeat;
                                background-size: 100% 100%;
                                cursor:grab;
                                transition: all 1s;
                            }
                        }
                    }
                }
            }
        }
    .pool{
        position: absolute;
        background:url("../../../assets/img/shuifei/whaterq.png");
        width: 190px;
        height: 120px;
        background-size: 100% 100%;
        left: 10%;
        top: 30%;
        z-index: 9;
        p{
            font-size: 16px;
            font-weight: bold;
            position: absolute;
            left: 40%;
            top: 37%;
            color: #fff;
        }
    }
    .mercury{
        position: absolute;
        background:url("../../../assets/img/shuifei/pfj.png");
        width: 100px;
        height: 170px;
        background-size: 100% 100%;
        left: 53%;
        top: 30%;
        z-index: 9;
    }
    .left_container,.right_container{
        position: absolute;
        background:url("../../../assets/img/shuifei/npkor.png");
        width: 85px;
        height: 80px;
        background-size: 100% 100%;
        z-index: 9;
    p{
        text-align: center;
        font-size: 17px;
        font-weight: 600;
        color: #0f2a48;
        &.element_bulk{
            font-size: 14px;
            z-index: 999;
            position: absolute;
            width: 100%;
            top: 40px;
            color: #0f2a48;
        }
    }
    }
    .left_container{
    .left_caps{
        position: absolute;
        left: 8px;
        top: 0px;
        border-radius: 20px;
    }
    }
    .right_container{
    p{
        text-align: center;
        font-size: 16px;
        color: #0f2a48;
    }
    .right_caps{
        position: absolute;
        left: 8px;
        top: 0px;
        border-radius: 20px;
    }
    }
    .left_one{
        left: 25%;
        top: 25%;
    }
    .left_two{
        left: 31.5%;
        top: 25%;
    }
    .left_three{
        left: 38%;
        top: 25%;
    }
    .left_four{
        left: 45%;
        top: 25%;
    }

    .right_one{
        left: 62%;
        top: 34%;
    }
    .right_two{
        left: 70%;
        top: 34%;
        width: 115px;
        height: 147px;
    }

    .soil_lists{
        position: absolute;
        bottom: 4%;
        width: 100%;
        height: 280px;
        display: flex;
        justify-content: space-around;
    }
    .soil{
        background:url("../../../assets/img/shuifei/dk.png");
        width: 255px;
        height: 240px;
        background-size: 100% 100%;
        z-index: 9;
        p{
            color: #c5d4b3;
            font-size: 14px;
            text-align: center;
            position: absolute;
            bottom: 15px;
            width: 255px;
        }
    }

    //连线
      .adapter_2 {
          background: url(../../../assets/img/shuifei/pipe2.svg);
          width: 22px;
          height: 22px;
          background-size: 100% 100%;
          z-index: 50;
      }
    .zjt1 {
        position: absolute;
        left: -2px;
        bottom: -10px;
        z-index: 999;
    }
    .zjt2 {
        position: absolute;
        left: 0px;
        bottom: -10px;
        z-index: 999;
    }
    .zjt3 {
        position: absolute;
        right: -12px;
        bottom: 0px;
        z-index: 999;
    }
    .zjt4 {
        position: absolute;
        left: -12px;
        top: -1px;
        z-index: 999;
    }
    .rotate270{
        transform: rotate(270deg);
    }
    .rotate180{
        transform: rotate(180deg);
    }
    .rotate90{
        transform: rotate(90deg);
    }
    .canvas_bg_x{
        height: 20px;
        background: url(../../../assets/img/shuifei/shuiguan_w.svg);
        position: absolute;
    }
    .canvas_bg_y{
        width: 20px;
        background: url(../../../assets/img/shuifei/shuiguan_h.svg);
        position: absolute;
    }
    .water_1_1 {
        left: 19.5%;
        top: 39%;
        height: 6%;
    }
    .water_1_2 {
        left: 20%;
        top: 43.6%;
        width: 35%;
    }

    .left_1_1 {
        left: 27.5%;
        top: 25%;
        height: 17.3%;
    }
    .left_1_2 {
        left: 28%;
        top: 41.03%;
        width: 26%;
    }

    .left_2_1 {
        left: 34%;
        top: 25%;
        height: 15%;
    }
    .left_2_2 {
        left: 35%;
        top: 38.7%;
        width: 19%;
    }
    .left_3_1 {
        left: 40.5%;
        top: 25%;
        height: 12.2%;
    }
    .left_3_2 {
        left: 41.2%;
        top: 36%;
        width: 13%;
    }
    .left_4_1 {
        left: 47.5%;
        top: 25%;
        height: 10%;
    }
    .left_4_2 {
        left: 48.2%;
        top: 33.8%;
        width: 6%;
    }

    .right_1_1 {
        left: 62.5%;
        top: 37.2%;
        height: 6%;
    }

    .right_1_2 {
        left: 55%;
        top: 42%;
        width: 8%;
    }
    .right_2_1{
        left: 58%;
        top: 35%;
        width: 8%;
    }

    .right_3_1 {
        left: 53.6%;
        top: 30.6%;
        width: 18%;
    }

    .right_3_2 {
        left: 71%;
        top: 32%;
        height: 4%;
    }

    .right_4_1 {
        left: 53.6%;
        top: 43.6%;
        width: 19%;
    }

    //底部连线
      .bottom_1_1 {
          left: 55.5%;
          top: 45%;
          height: 10%;
          .pressure_tip{
          position: absolute;
          color: #fff;
          top: 35%;
          padding-left:40px;
          span{
              position: absolute;
              left: 16%;
              top: 20%;
              font-size: 20px;
          }
      }
      }
    .bottom_1_2 {
        left: 56.6%;
        top: 53.7%;
        width: 39%;
    }
    .bottom_1_3 {
        left: 95%;
        top: 55%;
        height: 5%;
    }
    .bottom_1_4 {
        left: 12.8%;
        top: 58.8%;
        width: 82.2%;
        z-index: 10;
    }
    .bottom_1_5{
        left: 12%;
        top: 60%;
        height: 15%;
    }

    .bottom_2_1{
        left: 86.5%;
        top: 60%;
        height: 15%;
    }
    .bottom_3_1{
        left: 62%;
        top: 60%;
        height: 15%;
    }
    .bottom_4_1{
        left: 37%;
        top: 60%;
        height: 15%;
    }
    /* .bottom_5_1{
       left: 12%;
       top: 60%;
       height: 9%;
     }*/
    }

    .switchWatcherBox{
        div{
            border: 1px solid #ddd;
            box-sizing: border-box;
            background:url("../../../assets/img/shuifei/video.png") center no-repeat #4d525c;
            background-size: 70px 70px;
            width: 49.5%;
            cursor: pointer;
            video{
                width: 100%;
                height: 100%;
                object-fit: fill;
            }
        }
        position: absolute;
        width: 550px;
        height: 195px;
        right: -220px;
        top: 20px;
        display: flex;
        justify-content: space-between;
    }
    }


</style>
