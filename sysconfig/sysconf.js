/**
 * 通用配置模块对象
 */
 
 (function(){
var Sysconf = window.Sysconf = function(){
		return new Sysconf.fn.init();
	};
	
	Sysconf.url = {
		getAll : "sysconf/findAllByPage.do"
	};
	
	//初始当前页
	Sysconf.pageNum = 1;
	
	//当前页记录条数
	Sysconf.pageSize = 10;
	
	Sysconf.fn = Sysconf.prototype = {
	
		/**
		 * 初始化
		 */
		init:function(){
			return this;
		},
		
		/**
		 * 获取所有配置
		 */
		getAllConf : function(){
			var url = Sysconf.url["getAll"];
			var params = "pageNum=1&pageSize=100000";
			var allConfValue;
			TDT.getDS(url,params,false,function(json){
				if(json.result){
					allConfValue = json.sysconfList;
				}
			});
			return allConfValue;
		}
		
	};
	Sysconf.fn.init.prototype = Sysconf.fn;
 })();