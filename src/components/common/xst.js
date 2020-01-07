

var canvasXST = document.getElementById('capXST');
var ctxXST= canvasXST.getContext('2d');


//range控件信息
var rangeValue = 20;
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
var speed = 0.02; //波浪速度，数越大速度越快
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

    if(nowRange <= rangeValue){
        var tmp = .3;
        nowRange += tmp;
    }

    if(nowRange > rangeValue){
        var tmp = .3;
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
            setTimeout(()=>{
                rangeValue=60;
            },2000)

            setTimeout(()=>{
                rangeValue=50;
            },5000)
        }else{
            rangeValue=20;
        }
    }
})