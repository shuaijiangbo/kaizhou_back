/*
require("./text.js");
require("./weight");
require("./xst");
*/



var Myflow=function(config){
    this.config=config;
    this.point=this.config.point;
    this.stepIndex=0                //步数
    this.pointLength=this.config.element.length;        //结点数

    this.canvasObj=[];
    this.ctx=[];

    for(var i in this.config.element){
        this.canvasObj[i]=$('#'+this.config.element[i]);

        console.log($('#'+this.config.element[i]));

        this.ctx[i] = this.canvasObj[i][0].getContext("2d");

        this.canvasObj[i][0].width=this.canvasObj[i].parent().width();
        this.canvasObj[i][0].height=this.canvasObj[i].parent().height();
    }

    this.timer=null;
}

Myflow.prototype={
    flowFun:function(){
        var vx=this.point[this.stepIndex][1].x-this.point[this.stepIndex][0].x;
        var vy=this.point[this.stepIndex][1].y-this.point[this.stepIndex][0].y;

        this.x1=this.point[this.stepIndex][0].x;
        this.y1=this.point[this.stepIndex][0].y;
        this.x2=this.point[this.stepIndex][1].x;
        this.y2=this.point[this.stepIndex][1].y;

        var size=Math.max(Math.abs(vx),Math.abs(vy));
        vx /= size;
        vy /= size;

        this.timer= setInterval(()=>{
            if(size>0){
                this.ctx[this.stepIndex].beginPath();
                this.ctx[this.stepIndex].moveTo(this.x1,this.y1);
                this.x1+=vx;
                this.y1+=vy;
                this.ctx[this.stepIndex].lineTo(this.x1,this.y1);
                this.ctx[this.stepIndex].lineWidth='4'
                this.ctx[this.stepIndex].strokeStyle=this.config.color;
                this.ctx[this.stepIndex].stroke();
            }else{
                this.stepIndex++;
                clearInterval(this.timer);
                if(this.stepIndex<this.pointLength){
                    this.flowFun();
                }else{
                    this.flicker();
                }
            }
            --size
        },10)
    },
    initData:function(){

    },
    flicker:function(){                                //闪烁
        let _self=this;
        this.timer= setInterval(()=>{
            for(var i in this.canvasObj){
                _self.canvasObj[i].animate({opacity:'0',});
                _self.canvasObj[i].animate({opacity:'1',});
            }
        },1000)
    },
    destroy:function(){
        for(var i in this.ctx){
            this.ctx[i].clearRect(0,0,this.canvasObj[i][0].width,this.canvasObj[i][0].height);
        }
        this.stepIndex=0
        clearInterval(this.timer);
    }
}



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
        [{x:0,y:10},{x:470,y:10},],
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


    /*let flowLine= {
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


    require("./text.js");
    require("./weight");
    require("./xst");






//空开密码
/!*$.ajax({
    url : URL.getKeyCode,
    type : "POST",
    success : function(res) {

    },error:function(){

    }
})*!/


function kongkai(json){
    $.ajax({
        url : URL.controlCircuitBreakerEncryption,
        type : "POST",
        data:JSON.stringify(json),
        dataType:'json',
        contentType: "application/json; charset=utf-8",
        success : function(res) {
        },error:function(){
        }
    })
}

$('#poolBtn').on({
    'click':function(){
        if($(this).hasClass('close')){
            kongkai({
                circuitBreakers:[{
                   'address':1 ,
                   'state':1 ,
                   'type':1
                }],
                keyCode:"string",
                tid:"string",
            });

            flowLine['f5'].flowFun();  //水池
            $(this).addClass('open').removeClass('close');
        }else{
            flowLine['f5'].destroy();  //水池
            $(this).addClass('close').removeClass('open');
        }
    }
})

$('#huafeiBtn').on({
    'click':function(){
        console.log(233);
        if($(this).hasClass('close')){
            flowLine['f1'].flowFun();
            flowLine['f2'].flowFun();
            flowLine['f3'].flowFun();
            flowLine['f4'].flowFun();
            $(this).addClass('open').removeClass('close');
        }else{
            flowLine['f1'].destroy();
            flowLine['f2'].destroy();
            flowLine['f3'].destroy();
            flowLine['f4'].destroy();
            $(this).addClass('close').removeClass('open');
        }
    }
})

$('#attenuationBtn').on({
    'click':function(){
        if($(this).hasClass('close')){
            flowLine['f7'].flowFun();
            flowLine['f9'].flowFun();
            setTimeout(()=>{
                flowLine['f6'].flowFun();
                flowLine['f8'].flowFun();
            },5000)

            $(this).addClass('open').removeClass('close');
        }else{
            flowLine['f7'].destroy();
            flowLine['f8'].destroy();
            flowLine['f9'].destroy();
            flowLine['f6'].destroy();
            $(this).addClass('close').removeClass('open');
        }
    }
})


$('#centerWaterFlow').hide().css('visibility','visible');*/