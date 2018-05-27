$(function(){
	var unParamCfgAdd = new UnParamCfgAdd();
	unParamCfgAdd.init();
});
function UnParamCfgAdd() {
}

//业务参数
var unParamCfgParams = {};
UnParamCfgAdd.prototype = {

	init : function() {
		this.bindEvents();
	},
	bindEvents : function() {
		_this = this;
		$("#addBtn").click(function(){
			unParamCfgParams.tenid = $("#tentid").val();
			unParamCfgParams.apnType = $("#apn").val();
			unParamCfgParams.plan = $("#plan").val();
			unParamCfgParams.eff = $("#eff").val();
			unParamCfgParams.exp = $("#exp").val();
			_this.queryAddSubmit();
		});
	},
	valid : function(){
		return true;
	},
	queryAddSubmit : function() {
		var _this = this;
		if(_this.valid()){
			ajaxController.ajax({
				method : "POST",
				url : basePath + "/paramCfg/unadd",
				dataType : "json",
				showWait : true,
				data :unParamCfgParams,
				message : "正在提交中..",
				success : function(data) {
					bootbox.alert(data.statusInfo);
				},
				error : function(data) {
					bootbox.alert("增加失败，请稍后重试");
				}
			});
		}
	}
}