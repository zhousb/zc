$(function(){
	
	var userAuthDetail = new UserAuthDetail();
	userAuthDetail.init();
	
});

function UserAuthDetail() {


}
function chooseTenantId(obj){
	$("#chooseTenantId").val(obj);
}
var params = {};

params.checkPass='0';
params.sugTenantId='0';
params.tenantId ='';
params.notes = '';

UserAuthDetail.prototype = {
	
	init : function(){
		this.bindEvents();
		
	},
	bindEvents : function(){
		$("#checkPassRadio").click(function(){
			params.checkPass='0';
			$("#checkPass").show();
		});
		$("#checkNotPassRadio").click(function(){
			params.checkPass='1';
			$("#checkPass").hide();
		});
		$("#sysSuportTenantIds").show();
		$("#userCreatTenantId").hide();
		$("#sysTenantIds").click(function(){
			$("#sysSuportTenantIds").show();
			$("#userCreatTenantId").hide();
			params.sugTenantId='0';
		});
		$("#userTenantId").click(function(){
			$("#sysSuportTenantIds").hide();
		    $("#userCreatTenantId").show();
		    params.sugTenantId='1';
		});
		
		$("#userAuthCheckBtn").click(function(){
			
			if("0" == params.checkPass){
				//审核通过
				if('0' == params.sugTenantId){
					params.tenantId = $("#chooseTenantId").val();
				}
				else{
					params.tenantId = $("#createTenantId").val();
				}
				//进行参数校验
				if("" == params.tenantId){
					bootbox.alert({title:"提示", message:"请分配租户！"});
					return;
				}
			}
			params.id=$("#userAuthRecordId").val();
			if(""==params.id || typeof(params.id) == "undefined"){
				bootbox.alert({title:"提示", message:"审核编号不合法！"});
				return;
			}
			params.notes = $("#userAuthCheckNotes").val();
			if("" == params.notes || params.notes.length > 200 ){
				bootbox.alert({title:"提示", message:"请填写审核备注，字数在200字以内！"});
				return;
			}
			ajaxController.ajax({
				method : "POST",
				url : basePath + "/authMgr/auth",
				dataType : "json",
				showWait : true,
				data : params,
				message : "请稍后...",
				success : function(data) {
					if(data.statusCode == '1'){
						bootbox.alert({title:"提示", message:"提交成功！"});
					}
					else{					
						bootbox.alert({title:"提示", message:"网络故障，请稍后重试！"});
					}
				},
				error : function(data) {
					bootbox.alert({title:"提示", message:"网络故障，请稍后重试！"});	
				}
			});
			
		});
		
	}
	
	
}