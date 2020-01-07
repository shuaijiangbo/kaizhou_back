var interval;
var link={
		/**
		 * websocket连接成功后触发
		 */
		"success":function(){
			clearInterval(interval);
			interval=0;
			console.log("websocket链接成功");
		},
		/**
		 * websocket连接错误后触发
		 */
		"error":function(){
			if(interval==0){
				interval=setInterval("link.connection()",5000);
			}
		},
		/**
		 * websocket断线重连机制
		 */
		"connection":function(){
			//链接服务器
			websocket.init(window.baseURL,function(e){
				websocket.isConnection=true;
				link.success();
			},function(e){
				console.log(e);
				websocket.isConnection=false;
				link.error();
			});
		}
}

/**
 * 使用websocket即时推送通知消息 可复用
 */
var websocket = {
	"isConnection":false,
	"stompClient" : null,
	"init" : function(url, connectSuccessCallback, connectErrorCallback) {
		// 建立websocket的方法（连接地址，连接成功回调方法，连接失败回调方法）
		if (websocket.stompClient) {
			try {
				stompClient.disconnect();
			} catch (e) {
				console.log(e);
			}
		}
		$.get(url+"/camera/getConverterInfo",function(re){
			if(re.code==200){
				link.server={};
				link.server.ip=re.ip;
				websocket.stompClient = Stomp.client("ws://"+re.ip+"/message");
				websocket.stompClient.connect({}, connectSuccessCallback,
						connectErrorCallback);
			}
		},"json");

	},
	"send" : function(topic, msg ,isByte) {
		// 发送消息的方法 （topic发送主题， msg消息json）
		websocket.stompClient.send(topic, {
			atytopic : "greetings"
		}, msg , isByte);
	},
	"subscribe" : function(topic, messageCallback) {
		// 订阅消息的方法（ topic 订阅主题， messageCallback 收到消息的回调函数）
		websocket.stompClient.subscribe(topic, messageCallback);
	},
	"unsubscribe" : function(topic) {
		// 取消订阅的方法 （主题）
		websocket.stompClient.unsubscribe(topic);
	},
	"disconnect" : function() {
		// 断开连接的方法
		websocket.stompClient.disconnect();
	}
}

