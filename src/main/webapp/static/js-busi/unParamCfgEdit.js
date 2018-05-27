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
			unParamCfgParams.id = $("#seq").val();
			unParamCfgParams.tenid = $("#tentid").val();
			unParamCfgParams.apnType = $("#apn").val();
			unParamCfgParams.plan = $("#plan").val();
			unParamCfgParams.eff = $("#eff").val();
			unParamCfgParams.exp = $("#exp").val();
			_this.queryEditSubmit();
		});
	},
	valid : function(){
		if(unParamCfgParams.id == null || unParamCfgParams.id==""){
			return  false;
		}
		return true;
	},
	queryEditSubmit : function() {
		var _this = this;
		if(_this.valid()){
			ajaxController.ajax({
				method : "POST",
				url : basePath + "/paramCfg/unedit",
				dataType : "json",
				showWait : true,
				data :unParamCfgParams,
				message : "正在提交中..",
				success : function(data) {
					bootbox.alert(data.statusInfo);
				},
				error : function(data) {
					bootbox.alert("修改失败，请稍后重试");
				}
			});
		}else{
			bootbox.alert("请正确输入");
			return;	
		}
		
	}
}