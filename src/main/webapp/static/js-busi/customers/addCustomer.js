$(function(){
	
	var addCustomer = new AddCustomer();
	addCustomer.init();
	
});

function AddCustomer() {


}
var params = {};
AddCustomer.prototype = {
	
	init : function(){
		this.bindEvents();
		
	},
	bindEvents : function(){
		$("#resetBtn").click(function(){
			$("#userName").val("");
			$("#identityCard").val("");
			$("#sex").val("");
			$("#marriage").val("");
			$("#phone").val("");
			$("#address").val("");
			$("#wechat").val("");
			$("#email").val("");
			$("#profession").val("");
			$("#annualIncome").val("");
			$("#company").val("");
			$("#customerSource").val("");
			$("#desc").val("");
		});
		$("#addBtn").click(function(){
			if(typeof $("#userName").val() == "undefined" || $("#userName").val() == null || $("#userName").val() == "")
			{
				bootbox.alert({title:"提示", message:"用户名不能为空！"});
				$("#userName").focus(function(){
					
				});
				$("#userName").attr('placeholder','用户名不能为空！');
			    return;
			}
			else{
				params.userName=$("#userName").val();
			}
			
			if(typeof $("#identityCard").val() == "undefined" || $("#identityCard").val() == null || $("#identityCard").val() == "")
			{
				bootbox.alert({title:"提示", message:"身份证不能为空！"});
				$("#identityCard").focus(function(){
					
				});
				$("#identityCard").attr('placeholder','身份证不能为空！');
			    return;
			}
			else{
				params.identityCard=$("#identityCard").val();
			}
			params.sex=$("#sex").val();
			params.marriage=$("#marriage").val();
			if(typeof $("#phone").val() == "undefined" || $("#phone").val() == null || $("#phone").val() == "")
			{
				bootbox.alert({title:"提示", message:"手机号不能为空！"});
				$("#phone").focus(function(){
					
				});
				$("#phone").attr('placeholder','手机号不能为空！');
			    return;
			}
			else{
				params.phone=$("#phone").val();
			}
			params.address=$("#address").val();
			params.wechat=$("#wechat").val();
			params.email=$("#email").val();
			params.profession=$("#profession").val();
			params.annualIncome=$("#annualIncome").val();
			params.company=$("#company").val();
			params.customerSource=$("#customerSource").val();
			params.desc=$("#desc").val();
			ajaxController.ajax({
				method : "POST",
				url : basePath + "/customers/addCustomer.do",
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
	
	
};