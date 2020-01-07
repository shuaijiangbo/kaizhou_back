

var canvasWeight = document.getElementById('capWeight');
var ctxWeight= canvasWeight.getContext('2d');


//range控件信息
var rangeValue = 20;
var nowRange = 20; //用于做一个临时的range

//画布属性
var mW  =canvasWeight.width = 68;

var mH =canvasWeight.height= 68;
var lineWidth = 2;

//Sin 曲线属性
var sX = 0;
var sY = mH / 2;
var axisLength = mW; //轴长
var waveWidth = 0.025 ; //波浪宽度,数越小越宽
var waveHeight = 2; //波浪高度,数越大越高
var speed = 0.02; //波浪速度，数越大速度越快
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
        var y = -Math.sin((sX + x) * waveWidth + xOffset);

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

    if(nowRange <= rangeValue){
        var tmp = 1;
        nowRange += tmp;
    }

    if(nowRange > rangeValue){
        var tmp = 1;
        nowRange -= tmp;
    }

    drawSin(xOffset);

    xOffset += speed;
    requestAnimationFrame(render1);
}

render1();



$('#attenuationBtn').on({
    'click':function(){
        if($(this).hasClass('close')){
            rangeValue=60;
            waveWidth = 0.075 ; //波浪宽度,数越小越宽
            speed = 0.08; //波浪速度，数越大速度越快
            setTimeout(()=>{
                rangeValue=50;
            },5000)
        }else{
            rangeValue=20;
            waveWidth = 0.025 ; //波浪宽度,数越小越宽
            speed = 0.02; //波浪速度，数越大速度越快
        }
    }
})