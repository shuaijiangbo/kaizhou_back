window.map={
	init:function(id){
		var self=this;
        self.map = new SuperMap.Map(id);
        // 移除控制按钮
        $(self.map.controls).each(function(index,controls){
            self.map.removeControl(controls);
        });
		// 加载图层
        self.layer1 = new SuperMap.Layer.TiledDynamicRESTLayer("Map", "http://119.84.133.2:18090/iserver/services/map-arcgis-tianditu/rest/maps/图层",
				null,{maxResolution:"auto"});
		// 创建标记图层
        self.markers = new SuperMap.Layer.Markers("Markers",{});
		// 矢量图层
        self.vectorLayer = new SuperMap.Layer.Vector("Vector");
		// 图层加载
        self.layer1.events.on({"layerInitialized": function(){
			console.log("map init success");
			// 设置图层
                self.map.addLayers([self.layer1,self.markers,self.vectorLayer]);
			// 中心点
                self.map.setCenter(new SuperMap.LonLat(108.127274,31.12779));
                self.map.zoomToScale(0.00011076655982855157,true);
			// 移动事件
                self.map.events.on({"move": function(e){
			}});
			// 缩放事件
                self.map.events.on({"zoomend": function(e){
			}});
			// 点击事件
                self.map.events.on({"click": function(e){
                	kaizhou.closeTip({map:self.map});
			},"mousedown":function(e){
			}});

                $(document).on("click",".closeTip",function(){
                    kaizhou.closeTip({map:self.map});
				});
		}});

        // 矢量覆盖物鼠标事件
        var callbacks = {
            //进入事件
            over: function(currentFeature){
                /*  currentFeature.style.strokeWidth=currentFeature.attributes.strokeWidth.over;
                  vectorLayer.drawFeature(currentFeature,currentFeature.style);*/

            },
            //移除事件
            out:function(currentFeature){
                /*currentFeature.style.strokeWidth=currentFeature.attributes.strokeWidth.out;
                vectorLayer.drawFeature(currentFeature,currentFeature.style);*/
            },
            dblclick:function(currentFeature){
                if(self.map.getZoom()<16){
                    /* kaizhou.clear({map:map,vectorLayer:vectorLayer,markers:markers})*/
                    var pixcel = new SuperMap.Pixel(this.handlers.feature.evt.x,this.handlers.feature.evt.y);
                    var lonLat= self.map.getLonLatFromPixel(pixcel);
                    kaizhou.intoSmallEara({map:self.map,lonLat:lonLat,data:currentFeature.attributes});

                    var data={"lon":108.12851506321,"lat":31.127456704752,"zoom":16};
                    kaizhou.panAndZoom({"map":self.map,"data":data});
                }
            },
            //单击
            click: function(currentFeature){
            	console.log(currentFeature)
                var pixcel = new SuperMap.Pixel(this.handlers.feature.evt.x-230,this.handlers.feature.evt.y-110);
                var lonLat= self.map.getLonLatFromPixel(pixcel);
                kaizhou.openTip({map:self.map,type:"vector",lonLat:lonLat,data:currentFeature.attributes});
            }
        };

        var selectFeature = new SuperMap.Control.SelectFeature(self.vectorLayer,
            {callbacks: callbacks,hover:false });
        self.map.addControl(selectFeature);
        selectFeature.activate();
		return this;
    }
}
window.command={
		"message":function(command,message,data){
			return JSON.stringify({"command":command,"status":200,"timestamp":new Date().getTime(),"message":message,"data":data});
		},
		/**
		 * 添加面
		 */
		"drawPolygon":function(superMap,brck){
			var drawPolygon = new SuperMap.Control.DrawFeature(superMap.vectorLayer,
				    SuperMap.Handler.Polygon);
            // drawPolygon.events.on({"featureadded": drawCompletedDrawPolygon})
			drawPolygon.featureAdded=brck;
            superMap.map.addControl(drawPolygon);
			drawPolygon.activate();
			drawPolygon.style={
				strokeColor: "#C0FF3E",
                strokeWidth: 1,
                fillOpacity:0.5,
                fillColor:"#1E9FFF"
			}
			console.log("双击以结束绘制");
			return drawPolygon;
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
