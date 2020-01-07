
var map = new SuperMap.Map("map");
// 移除控制按钮
for(var c of map.controls){
	map.removeControl(c);
}
// 加载图层
var layer1 = new SuperMap.Layer.TiledDynamicRESTLayer("Map", "http://119.84.133.2:18090/iserver/services/map-arcgis-tianditu/rest/maps/图层",
       	null,{maxResolution:"auto"});
// 创建标记图层
var markers = new SuperMap.Layer.Markers("Markers",{});
// 矢量图层
var vectorLayer = new SuperMap.Layer.Vector("Vector");
// 图层加载
layer1.events.on({"layerInitialized": function(){
	console.log("map init success");
	// 设置图层
	map.addLayers([layer1,markers,vectorLayer]);
	// 中心点
	map.setCenter(new SuperMap.LonLat(108.3637847900, 30.8652591705));
	map.zoomToScale(0.00011076655982855157,true);
    // 移动事件
    map.events.on({"move": function(e){
    }});
    // 缩放事件
	map.events.on({"zoomend": function(e){
	}});
	// 点击事件
	map.events.on({"click": function(e){
	},"mousedown":function(e){
	}});
}});

window.command={
		"message":function(command,message,data){
			return JSON.stringify({"command":command,"status":200,"timestamp":new Date().getTime(),"message":message,"data":data});
		},
		/**
		 * 添加面
		 */
		"drawPolygon":function(name,description){
			console.log("参数：name 名称");
			console.log("参数：description 描述（key：value每组之间用;或；分隔）");
			var drawPolygon = new SuperMap.Control.DrawFeature(vectorLayer,
				    SuperMap.Handler.Polygon);
			drawPolygon.featureAdded=function(e){
				var component=e.geometry.components[0].components;
				var lonLat=[];
				for(var i=0;i<component.length;i++){
					lonLat.push({lon:component[i].x,lat:component[i].y});
				}
				drawPolygon.deactivate();
				console.log(JSON.stringify(lonLat));

			}
			map.addControl(drawPolygon);
			drawPolygon.activate();
			drawPolygon.style={
				strokeColor: "#C0FF3E",
                strokeWidth: 1,
                fillOpacity:0.5,
                fillColor:"#1E9FFF"
			}
			console.log("双击以结束绘制");
		},
		//添加线
		"drawLine":function(name,description){
			console.log("参数：name 名称");
			console.log("参数：description 描述（key：value每组之间用;或；分隔）");
			var drawLine = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Path, {multi: true});
			drawLine.featureAdded=function(e){
				var component=e.geometry.components[0].components;
				var lonLat=[];
				for(var i=0;i<component.length;i++){
					lonLat.push({lon:component[i].x,lat:component[i].y});
				}
				console.log(lonLat);
				drawLine.deactivate();
			}
			map.addControl(drawLine);
			drawLine.activate();
			drawLine.style={
				strokeColor: "#7B68EE",
                strokeOpacity:0.5,
                strokeWidth: 10
			}
			console.log("双击以结束绘制");
		}
}

