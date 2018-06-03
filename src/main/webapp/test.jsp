<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="staticPath"
	value="${pageContext.request.contextPath}/static" />
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	request.setAttribute("basePath", basePath);
	request.setAttribute("staticPath", basePath + "static");
%>
<html>
<head>
<meta name="menu" content="userAuth" />
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
<title>客户资料录入</title>
<script src="${staticPath}/customers/addCustomer.js"></script>
<style type="text/css">
</style>
</head>
<body>
	<div id="curLocation">
		<p>当前位置：认证管理 > 认证审核</p>
		<hr />
	</div>
	<div id="pageContent">
		<div>
			<form class="bs-example bs-example-form" role="form">
				<div class="input-group col-md-9">
					<span class="input-group-addon" >姓 &nbsp; &nbsp; &nbsp; &nbsp;名：</span> <input type="text"
						style="width:200px;" class="form-control" placeholder="姓名" id="companyName"/>
				    
					<span class="input-group-addon">身份证号：</span> <input type="text"
						style="width:300px;" class="form-control" placeholder="身份证号" id="companyName"/>		
				</div>
				<br>
				<div class="input-group col-md-9">
					<span class="input-group-addon">手机号码：</span> <input type="text"
						style="width:200px;" class="form-control" placeholder="手机号码" id="companyName"/>
					<span class="input-group-addon">家庭住址：</span> <input type="text"
						style="width:300px;" class="form-control" placeholder="家庭住址" id="companyName"/>		
				</div>
				<br>
				<div class="input-group col-md-9">
					<span class="input-group-addon">微信号码：</span> <input type="text"
						style="width:200px;" class="form-control" placeholder="微信号码" id="companyName"/>
					<span class="input-group-addon">电子邮箱：</span> <input type="text"
						style="width:300px;" class="form-control" placeholder="电子邮箱" id="companyName"/>		
				</div>
				<br>
				<div class="input-group col-md-9">
					<span class="input-group-addon">客户来源：</span> <input type="text"
						style="width:200px;" class="form-control" placeholder="客户来源" id="companyName"/>
				</div>
				<br>
				<!--div class="input-group col-md-9">
					<span class="input-group-addon">审核时间：</span> <input size="16"
						style="border: 1px solid #ccc; font-size: 14px; line-height: 2px; padding: 6px 12px; height: 34px; width: 200px;"
						type="text" id="datetimeStart" readonly class="form_datetime " />
					&nbsp;至&nbsp; <input size="16"
						style="border: 1px solid #ccc; font-size: 14px; line-height: 2px; padding: 6px 12px; height: 34px; width: 200px;"
						type="text" id="datetimeEnd" readonly class="form_datetime" />
					<script type="text/javascript">
						$("#datetimeStart").datetimepicker({
							format : 'yyyy-mm-dd',
							minView : 'month',
							language : 'zh-CN',
							autoclose : true,
						//startDate:new Date()
						}).on(
								"click",
								function() {
									$("#datetimeStart").datetimepicker(
											"setEndDate",
											$("#datetimeEnd").val())
								});
						$("#datetimeEnd").datetimepicker({
							format : 'yyyy-mm-dd',
							minView : 'month',
							language : 'zh-CN',
							autoclose : true,
						//startDate:new Date()
						}).on(
								"click",
								function() {
									$("#datetimeEnd").datetimepicker(
											"setStartDate",
											$("#datetimeStart").val())
								});
					</script>
				</div-->
				<br>
				<div class="input-group">

					<button type="button" id="queryBtn" class="btn btn-primary"
						style="width: 80px;">查询</button>
				</div>
			</form>
		</div>

		<div id="reportTableDiv" style="margin-bottom: 40px;">


			<table id="reportTable">
			</table>
		</div>

		<!--  -->

	</div>

</body>

</html>