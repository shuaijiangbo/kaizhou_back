
var canvasN = document.getElementById('capN');
var ctxN = canvasN.getContext('2d');

var canvasP = document.getElementById('capP');
var ctxP = canvasP.getContext('2d');

var canvasK = document.getElementById('capK');
var ctxK = canvasK.getContext('2d');

var canvasOR = document.getElementById('capOR');
var ctxOR= canvasOR.getContext('2d');


//range控件信息
var rangeValue = 60;
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
var waveWidth = 0.025 ; //波浪宽度,数越小越宽
var waveHeight = 2; //波浪高度,数越大越高
var speed = 0.02; //波浪速度，数越大速度越快
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
        var y = -Math.sin((sX + x) * waveWidth + xOffset);

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

    if(nowRange <= rangeValue){
        var tmp = .4;
        nowRange += tmp;
    }

    if(nowRange > rangeValue){
        var tmp = .4;
        nowRange -= tmp;
    }

    drawSin(xOffset);

    xOffset += speed;
    requestAnimationFrame(render);
}
render();

$('#huafeiBtn').on({
    'click':function(){
        if($(this).hasClass('close')){
            rangeValue=30;
            waveWidth = 0.075 ; //波浪宽度,数越小越宽
            speed = 0.08; //波浪速度，数越大速度越快
        }else{
            rangeValue=60;
            waveWidth = 0.025 ; //波浪宽度,数越小越宽
            speed = 0.02; //波浪速度，数越大速度越快
        }
    }
})