/**
 * 此JS文件为控制端，显示端共用
 * 显示端参数obj封装map、vectorLayer、markers对象
 * 控制端发送函数名，显示端反射调用
 * 控制端obj封装有Websocket对象
 */
window.kaizhou={
		//清除所有矢量覆盖物
		"clear":function(obj){
			obj.vectorLayer.removeAllFeatures();
			obj.markers.clearMarkers();
			obj.map.removeAllPopup();
		},
		//清除弹出框
		closeTip:function(obj){
			obj.map.removeAllPopup();
			kaizhou.stopPlay();
			$(".max-tip").remove();
		},
		//绘制矢量覆盖物
		polygon:function(obj){
			for(var i=0;i<obj.data.length;i++){
				var points =[];
				$(obj.data[i].lonLat).each(function(i,e){
                    var lonLat = new SuperMap.LonLat(e.lon, e.lat);
                    var str=lonLat.transform(
                        new SuperMap.Projection("EPSG:4490"),
                        new SuperMap.Projection("EPSG:3857")
                    );
                    var point = new SuperMap.Geometry.Point(str.lon,str.lat);
                    points.push(point);
                });
				var linearRings = new SuperMap.Geometry.LinearRing(points),
				region = new SuperMap.Geometry.Polygon([linearRings]);
				var pointVector = new SuperMap.Feature.Vector(region,{name:obj.data[i].name,description:obj.data[i].description,strokeWidth:{over:3,out:1}});
				pointVector.style = {
						label:obj.data[i].name,
				        fontColor:"#0000ff",
				        fontOpacity:"0.5",
				        fontFamily:"微软雅黑",
				        fontSize:"25px",
				        fontWeight:"normal",
				        labelSelect:"true",
		                strokeColor: "#C0FF3E",
		                strokeWidth: 1,
		                fillOpacity:0.9,
		                fillColor:obj.data[i].color
		            };
				obj.vectorLayer.addFeatures(pointVector);
			}
		},
		//画线
		"line":function(obj){
			for(var i=0;i<obj.data.length;i++){
				var points =[];
				$(JSON.parse(obj.data[i].lonLat)).each(function(i,e){
					var lonLat = new SuperMap.LonLat(e.lon, e.lat);
					var str=lonLat.transform(
						     new SuperMap.Projection("EPSG:4490"),
						     new SuperMap.Projection("EPSG:3857")
						 );
					var point = new SuperMap.Geometry.Point(str.lon,str.lat);
					points.push(point);
				});
	            var line = new SuperMap.Geometry.LineString(points);
	            var linecVector = new SuperMap.Feature.Vector(line,{data:obj.data[i],entityId:obj.data[i].id,type:'line',id:"line-"+obj.data[i].id,name:obj.data[i].name,description:obj.data[i].description,strokeWidth:{over:15,out:10}});
	            linecVector.style = {
            		label:obj.data[i].name,
			        fontColor:"#0000ff",
			        fontOpacity:"0.5",
			        fontFamily:"微软雅黑",
			        fontSize:"25px",
			        fontWeight:"bold",
			        labelAlign:"cm",
			        labelSelect:"true",
	                strokeColor: "#7B68EE",
	                strokeOpacity:0.8,
	                strokeWidth: 10
	            };
	            obj.vectorLayer.addFeatures(linecVector);
			}
		},
		//移动中心点并缩放
		"panAndZoom":function(obj){
			obj.map.panTo(new SuperMap.LonLat(obj.data.lon, obj.data.lat));
			obj.map.zoomTo(obj.data.zoom);
		},
		//添加提示框
		"openTip":function(obj){
			console.log(obj)
			var url;
			$(".max-tip").remove();
			obj.map.removeAllPopup();
			//这个js文件控制端-显示端共用，只能写行内样式
			var tip="<div class='tip' style=\"position: absolute;z-index:5;\">";
            // tip="<div class='tip closeTip' style=\"position: absolute;top:0;right:0\" ><img src='image/close.png' ></div>";
			tip+="<p class='title' style=\"padding-left: 15px;padding-right:15px;    width: 250px;line-height: 40px;font-size: 18px; background: url('image/titlebg.png') no-repeat;background-size: 221px 39px;color:#fff;position: relative;\"> "+obj.data.name+"</p>";
			tip+="<div class='content' style='background-color: #084145;border: 2px solid #06FCFC; margin-top: -17px;font-size: 16px;color: #06FCFC;line-height:30px;overflow: hidden;'>";
			//tip+="<div style=\"background: url('image/20191107121450.png') no-repeat;background-size: 100%;height:15px; margin-bottom: 10px;\">";
			//tip+="</div>";
			tip+=kaizhou.description(obj.data.description);
			if(obj.type==="marker"){
				if(obj.data.type==="image"){
					tip+="<p style='margin:5px;'><img src='"+url+obj.data.url+"' height='"+(document.documentElement.clientHeight*0.5)+"'/></p>";
				}else if(obj.data.type==="video"){
					tip+="<p style='margin:5px;'><video src='"+url+obj.data.url+"' height='"+(document.documentElement.clientHeight*0.5)+"' autoplay control/></p>";
				}else if(obj.data.type==="echarts"){
					tip+="<div id='echarts' style='width:"+(document.documentElement.clientHeight*0.4)*2.5+"px;height:"+(document.documentElement.clientHeight*0.4)+"px;'></div>";
				}else if(obj.data.type==="live"){
					tip+="<p style='margin:5px;'><video id='live' height='"+(document.documentElement.clientHeight*0.5)+"' autoplay/></p>";
				}
				if(obj.data.btn){
					tip+=kaizhou.markerBtn(obj.data.btn);
				}
			}
			tip+="</div>";
			tip+="</div>";
		    var popup = new SuperMap.Popup("popwin",obj.lonLat,new SuperMap.Size(224,222),tip,false);
		    popup.autoSize=true;
		    obj.map.addPopup(popup);
		    $("#popwin").css("background","transparent");
		    if(obj.data.type==="echarts") {
                window.currentEcharts = {
                    e: echarts.init(document.getElementById("echarts"))
                };
                $("#echarts").before("<div style='margin: 10px;text-align: right;'><select onchange='kaizhou.currentHistoryTypeChange({val:this.value})' id='sel' style='background-color: #003466;border: 1px solid #00fffd;color: #00fffd;height: 22px;margin-right: 5px;'></select><input type='text' style='width:130px;' autocomplete='off' class='Wdate' id='STime' onclick=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',onpicked:kaizhou.currentHistoryChange})\"> 至 <input type='text' style='width:130px;' autocomplete='off' class='Wdate' id='ETime' onclick=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',onpicked:kaizhou.currentHistoryChange})\"></div>");
                window.currentEcharts.type = obj.data.indicators;
                window.currentEcharts.url = obj.data.url;
                // $("#sel").html("<option value='0'>全部</option>");
                for (var key in window.currentEcharts.type) {
                    $("#sel").append("<option value='" + key + "'>" + window.currentEcharts.type[key] + "</option>");
                }
                var sysTime = new Date().getTime();
                //计算系统时间90天前
                var stateTime = sysTime - (1000 * 60 * 60 * 24 * 200 );
                $("#STime").val(window.kaizhou.transformTime(stateTime).dateTime);
                $("#ETime").val(window.kaizhou.transformTime(sysTime).dateTime);
                kaizhou.currentHistoryChange(obj);
            }
		},
		//改变时间
		"currentHistoryChange":function(obj){
			var startTime=$("#STime").val();
			var endTime=$("#ETime").val();
			if($.trim(startTime)!=""&&$.trim(endTime)!=""){
				$.get(window.currentEcharts.url,{startTime:encodeURI(startTime),endTime:encodeURI(endTime)},function(d){
	    			if(d.code===200){
	    				//根据时间排序
	    				var compare = function (obj1, obj2) {
	    				    var val1 = new Date(obj1.yn_time).getTime();
	    				    var val2 = new Date(obj2.yn_time).getTime();
	    				    if (val1 < val2) {
	    				        return -1;
	    				    } else if (val1 > val2) {
	    				        return 1;
	    				    } else {
	    				        return 0;
	    				    }
	    				}
	    				d.data.data.sort(compare);
	    				window.currentEcharts.dataresume=d.data.data;
	    				kaizhou.currentHistoryTypeChange({val:$("#sel").val(),reload:"no"});
	    			}
	    		},"json");
			}
		},
		//改变指标
		"currentHistoryTypeChange":function(obj){
			var map=new Map();
			var option = {
	    			textStyle:{color: '#fff'},
	    		    tooltip: {trigger: 'axis'},legend: {show:false},
	    		    grid: {left: '3%',right: '4%',bottom: '10%',containLabel: true,top:'5%'},
	    		    xAxis: { type: 'category',boundaryGap: false,data: [],axisLine:{lineStyle:{color:'#fff'}}},
	    		    yAxis: {type: 'value',axisLine:{lineStyle:{color:'#fff'}}},
	    		    series: []};
			if(obj.val=="0"){
				for(var key in window.currentEcharts.type){
					map.set(key,{name:window.currentEcharts.type[key],type:'line',data:[]});
				}
			}else{
				map.set(obj.val,{name:window.currentEcharts.type[obj.val],type:'line',data:[]});
			}
			$(window.currentEcharts.data).each(function(i,e){
				option.xAxis.data.push(e.yn_time.replace(" ","\n"));
				for(var key in e){
					if(map.has(key)){
						map.get(key).data.push(e[key]);
					}
				}
			});
			for(var [k,v] of map){
				option.series.push(v);
			}
			window.currentEcharts.e.clear();
			window.currentEcharts.e.setOption(option);
		},
		//解析文本格式（:：;；）
		"description":function(description){
			var html="";
			if($.trim(description)!=""){
				if(description.indexOf(";")!=-1||description.indexOf("；")!=-1){
					var arr=description.split(/[;；]/);
					for(var i=0;i<arr.length;i++){
						html+=kaizhou.subString(arr[i]);
					}
				}else{
					return "<p style='margin-left: 15px;margin-bottom: 15px;'>"+description+"</p>";;
				}
			}
			return html;
		},
		"subString":function(string){
			if(string.indexOf(":")!=-1){
				return "<p style='margin-left: 15px;margin-bottom: 15px;'>"+string.substring(0,string.indexOf(":"))+"：<span class='value' style='color: #D0DBDA;'>"+string.substring(string.indexOf(":")+1,string.length)+"</span></p>";
			}else if(string.indexOf("：")!=-1){
				return "<p style='margin-left: 15px;margin-bottom: 15px;'>"+string.substring(0,string.indexOf("："))+"：<span class='value' style='color: #D0DBDA;'>"+string.substring(string.indexOf("：")+1,string.length)+"</span></p>";
			}
			else{
				return "<p style='margin-left: 15px;margin-bottom: 15px;'>"+string+"</p>";
			}
		},
		"markerBtn":function(btn){
			var html="",button="<div style='margin: 10px;margin-top: 0px;width:calc(100% - 20px);height: 35px;line-height: 35px;background-color: transparent;border: 1px solid #06FCFC;color: #06FCFC;position: relative;z-index: 5000;text-align: center;'>{text}</div>";
			if(btn.indexOf(";")!=-1||btn.indexOf("；")!=-1){
				var arr=obj.data.btn.split(/[;；]/);
				for(var i=0;i<arr.length;i++){
					html+=button.replace("{text}",arr[i]);
				}
			}else{
				html+=button.replace("{text}",btn);
			}
			return html;
		},
		//销毁视频流播放器
    "stopPlay":function(){
        if(window.videos&&window.videos.length>0){
            var index=[];
            for(var i=0;i<window.videos.length;i++){
                if(window.videos[i].type=="hls"){
                    window.videos[i].objectHls.stopLoad();
                    window.videos[i].objectHls.destroy();
                    index.push(i);
                }else if(window.videos[i].type=="flv"){
                    window.videos[i].objectFlv.unload();
                    window.videos[i].objectFlv.destroy();
                    index.push(i);
                }
            }
            for(var i=0;i<index.length;i++){
                window.videos.splice(index[i], 1);
            }
        }
    },
		//在地图上绘制标注
		"addMarker":function(obj){
			var arr=[];
			var url="";
			for(var i=0;i<obj.data.length;i++){
				var size = new SuperMap.Size(35,35);
				var offset = new SuperMap.Pixel(-(size.w/2), -(size.h/2));
				var icon = new SuperMap.Icon(url+obj.data[i].icon,size,offset);
				var marker=new SuperMap.Marker(new SuperMap.LonLat(obj.data[i].lon, obj.data[i].lat),icon);
				marker.attributes=obj.data[i];
				obj.markers.addMarker(marker);
				$("#"+marker.events.element.id).children("img").attr("title",obj.data[i].name);
				arr.push(marker);
			}
			return arr;
		},
		//移除标注
		"removeMarker":function(obj){
			for(var i=0;i<obj.markers.markers.length;i++){
				if(obj.markers.markers[i].attributes.id===obj.id){
					obj.markers.removeMarker(obj.markers.markers[i]);
					break;
				}
			}
			if(obj.websocket){
				websocket.send(SERVER.CONFIG_SEND_TOPIC,command.message("function","执行函数",{functionName:"kaizhou.removeMarker",id:obj.id}));
			}
		},
		//大屏垂直居中播放视频
		"maxVideo":function(obj){
			console.log(window.monitoring)
			//大屏播放窗口
			if(window.monitoring[obj.id]||obj.type!="live"){
				var html="<p style='height:100% ;width:100%; padding-top: 10px;' click='console.log(111)'><video "+(obj.type=="live"?"":"src='"+obj.url+"'")+" id='maxLive' height='100%' width='100%' style='object-fit:fill;' autoplay/></p>";
				kaizhou.alertMaxTip({title:"&nbsp;&nbsp;&nbsp;视 频",html:html,xs:0.6});
				if(!window.videos){
					window.videos=[];
				}
				kaizhou.stopPlay();
				if(obj.type==="live"){
                    var v=new video(document.getElementById("maxLive"));
                    v.hls(window.monitoring[obj.id].url);
                    window.videos.push(v);
					// window.videos.push(new video(document.getElementById("maxLive"),window.monitoring[obj.id].url));
				}
			}
		},
		"alertMaxTip":function(obj){
			$(".max-tip").remove();
			var tip="<div class='max-tip' style=\"position: fixed;z-index:999999;top:0;left:0;right:0;bottom:0;margin: auto;height:"+(document.documentElement.clientHeight*obj.xs)+"px; width:"+(document.documentElement.clientHeight*obj.xs)*2+"px; \">";
			tip+="<div style='position: fixed;top:0;left:0;width:100%;height:100%;background-color:#000;opacity:0.5;z-index:-1;'></div>";
			tip+="<p class='title' style=\"padding-left: 10px;line-height: 40px;color: #06FCFC; font-size: 15px; background: url('image/titlebg.png') no-repeat;background-size: 221px 39px;position: relative;\"> "+obj.title+" </p>";
			tip+="<div class='content' style='overflow: hidden;background-color: #084145;border: 2px solid #06FCFC; margin-top: -17px;font-size: 14px;color: #06FCFC;height:calc(100% - 15px);width:100%;'>";
			tip+=obj.html;
			tip+="</div>";
			tip+="</div>";
			$("body").append(tip);
		},
		//绘制一帧6个大屏播放视频的图像到控制端
		"drawImage":function(obj){
			if(obj.websocket){
				websocket.send(SERVER.CONFIG_SEND_TOPIC,command.message("function","执行函数",{functionName:"kaizhou.drawImage"}));
				return;
			}
			for(var key in window.monitoring){
				window.monitoring[key].drawImage();
			}
		},
		"chat":function(obj){
			if(obj.websocket){
				websocket.send(SERVER.CONFIG_SEND_TOPIC,command.message("function","执行函数",{functionName:"kaizhou.chat",myUserId:0,targetUserId:2}));
				layer.confirm('视频通话', {
					  skin: 'layui-layer-lan',
					  closeBtn: 0,
					  title:"提示",
		    		  btn: ['退出'] //按钮
		    		}, function(index){
		    			kaizhou.closeTip({websocket:obj.websocket,map:obj.map});
		    			layer.close(index);
		    		});
				return;
			}
			var src=BASEURL+"/static/html/chat-pc.html?myUserId="+obj.myUserId+"&targetUserId="+obj.targetUserId;
			var html="<iframe style='height:calc(100% - 15px);width:100%;border:none;background-color: transparent;' src='"+src+"'></iframe>";
			kaizhou.alertMaxTip({title:"视频通话",html:html,BASEURL:BASEURL,xs:0.7});
		},
    // 格式化时间戳
    transformTime : function(timestamp) {
    if (timestamp) {
        var time = new Date(timestamp);
        var y = time.getFullYear(); // getFullYear方法以四位数字返回年份
        var M = time.getMonth() + 1; // getMonth方法从 Date 对象返回月份 (0 ~
        // 11)，返回结果需要手动加一
        M=(M<10?"0"+M:M);
        var d = time.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
        d=(d<10?"0"+d:d);
        var h = time.getHours() >= 10 ? time.getHours() : '0'
            + time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
        var m = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
        m=(m<10?"0"+m:m);
        var s = time.getSeconds(); // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)
        s=(s<10?"0"+s:s);
        return {
            y : y,
            M : M,
            d : d,
            h : h,
            m : m,
            s : s,
            dateTime:y+"-"+M+"-"+d+" "+h+":"+m+":"+s
        }
    } else {
        return '';
    }
}
};


