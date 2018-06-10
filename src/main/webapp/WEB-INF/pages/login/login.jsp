<%@ page contentType="text/html;charset=UTF-8"%> 
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;  
	request.setAttribute("basePath", basePath);
    request.setAttribute("staticPath", basePath+"/static");
%>
<!DOCTYPE html>
<html>
<head>
<title>客户关系管理系统</title>
	<meta charset="UTF-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>	
	<link rel="stylesheet" href="${staticPath}/css/boostrap/bootstrap.css" type="text/css" />
	<link rel="stylesheet" href="${staticPath}/scripts/frame/ajaxhelper/css/jquery.pagcontroller.css"/>
	<link rel="stylesheet" href="${staticPath}/scripts/frame/bootstrap/dist/css/fileinput.min.css"/>
	<link rel="stylesheet" href="${staticPath}/scripts/frame/bootstrap-table/dist/bootstrap-table.css"/>
	<link rel="stylesheet" href="${staticPath}/scripts/frame/bootstrapvalidator-0.4.5/dist/css/bootstrapValidator.min.css" type="text/css" />
	<link rel="stylesheet" href="${staticPath}/scripts/frame/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css"/>
	
	
	<script src="${staticPath}/scripts/jquery-1.9.1.js"></script>
	<script src="${staticPath}/scripts/frame/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="${staticPath}/scripts/frame/jsrender/jsrender.min.js"></script>
	<script src="${staticPath}/scripts/frame/jsviews/jsviews.min.js"></script>
	<script src="${staticPath}/scripts/frame/bootbox/bootbox.js"></script>
	<script src="${staticPath}/scripts/frame/json2/json2.js"></script>
	<script src="${staticPath}/scripts/frame/form/jquery.form.min.js"></script>
	<script src="${staticPath}/scripts/frame/ajaxhelper/jquery.pagcontroller.js"></script>
	<script src="${staticPath}/scripts/frame/twbs-pagination/jquery.twbsPagination.min.js"></script>
	<script src="${staticPath}/scripts/frame/runnerpagination/runner.pagination.js"></script>
	<script src="${staticPath}/scripts/frame.js"></script>
	<script src="${staticPath}/scripts/jquery.SuperSlide.2.1.1.js"></script>
	
	
	<script src="${staticPath}/scripts/frame/bootstrap/dist/js/fileinput.min.js"></script>
	<script src="${staticPath}/scripts/frame/bootstrap/dist/js/fileinput_locale_zh.js"></script>
	<script src="${staticPath}/scripts/frame/bootstrapvalidator-0.4.5/dist/js/bootstrapValidator.min.js"></script>
	

	
	
	

<script>
	
	var basePath = "<%=basePath%>";
</script>
<style>
body {
	padding-right:0!important;
	background-color: #2989e2;
}
body .modal-open {
	overflow-y:auto !important;

	padding-right:0 !important;
}
input::-ms-input-placeholder{text-align: center;}
input::-webkit-input-placeholder{text-align: center;}

</style>
</head>
<body>
<div style="width:100%;">
	<div class="col-md-4">
		<p>
		<!--img src="${staticPath}/images/login-bj.png" style="height:500px;"/-->
		</p>
	</div>
	<div class="col-md-4"  style="padding-top:150px;padding-left:50px;">
				<div class="panel panel-default">
					<div class="panel-body" style="padding-bottom:50px;">
	            <form class="form-horizontal">
	            	<div class="form-group">
	            		<p class="col-md-12" style="text-align:center;">
							<h3 style="text-align:center;">客户关系管理系统</h3>
						</p>
						<br/>
					</div>
	            	<div class="form-group">
						<p class="col-md-3">用户名：</p>
						<input style="text-align:center;" id="username" class="control-label col-md-8"  type="text" placeholder="请输入用户名">
					</div>
					<div class="form-group">
						<p class="col-md-3"> 密码：</p>
						<input style="text-align:center;" autocomplete="off" type="password" id="password"  class="control-label col-md-8" placeholder="请输入密码">
					</div>
					<div class="form-group">
						
	                </div>
	            </form>
	            
	             <button class="btn btn-block btn-primary" id="loginBtn">登录系统</button>
	           	
	           </div>
	           
	           </div> 
	           
	</div>
</div>
</body>
</html>
<script type="text/javascript">
	
	$("#username").val("");
	$("#password").val("");
	
	$("#loginBtn").click(function(){
		var params = {};
		params.userName = $("#username").val();
		params.password = $("#password").val();
		if("" == params.userName){
			bootbox.alert({title:"提示", message:"用户名不能为空！"});
			return;
		}
		if("" == params.password){
			bootbox.alert({title:"提示", message:"密码不能空！"});
			return;
		}
		ajaxController.ajax({
				method : "POST",
				url : basePath + "/user/loginAction",
				dataType : "json",
				showWait : true,
				data : params,
				message : "请稍后...",
				success : function(data) {
					if(data.statusCode == '200'){
						window.location.href = basePath
					}
					else{	
						bootbox.alert({title:"提示", message:data.statusInfo});
					}
				},
				error : function(data) {
					bootbox.alert({title:"提示", message:"网络故障，请稍后重试！"});	
				}
			});
			
	});
</script>