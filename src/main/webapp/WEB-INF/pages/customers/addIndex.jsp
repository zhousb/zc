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
<script src="${staticPath}/js-busi/customers/addCustomer.js"></script>
<style type="text/css">
</style>
</head>
<body>
	<div id="curLocation">
		<p>当前位置：客户管理 > 客户资料录入</p>
		<hr />
	</div>
	<div id="pageContent">
		<div>
			<form class="bs-example bs-example-form" role="form" id = "customerAddForm">
				<div class="input-group col-md-9">
					<span class="input-group-addon" style="width:100px;">姓名：</span> <input type="text"
						style="width:250px;" class="form-control" placeholder="姓名（必填）" name="userName" id="userName"/>
				    
					<span class="input-group-addon"style="width:100px;">身份证号：</span> <input type="text"
						style="width:250px;" class="form-control" placeholder="身份证号（必填）" id="identityCard"/>		
				</div>
				<br>
				<div class="input-group col-md-9">
					<span class="input-group-addon"style="width:100px;">性别：</span> 
								<select id="sex" class="form-control" style="width:250px;">
									<option value="1">男</option>
									<option value="2">女</option>
								</select>
					
					<span class="input-group-addon"style="width:100px;">婚姻状况：</span> 
								<select id="marriage" class="form-control" style="width:250px;">
									<option value="1">已婚</option>
									<option value="2">未婚</option>
								</select>
							
				</div>
				<br>
				<div class="input-group col-md-9">
					<span class="input-group-addon"style="width:100px;">手机号码：</span> <input type="text"
						style="width:250px;" class="form-control" placeholder="手机号码（必填）" id="phone"/>
					<span class="input-group-addon"style="width:100px;">家庭住址：</span> <input type="text"
						style="width:250px;" class="form-control" placeholder="家庭住址" id="address"/>		
				</div>
				<br>
				<div class="input-group col-md-9">
					<span class="input-group-addon"style="width:100px;">微信号码：</span> <input type="text"
						style="width:250px;" class="form-control" placeholder="微信号码" id="wechat"/>
					<span class="input-group-addon"style="width:100px;">电子邮箱：</span> <input type="text"
						style="width:250px;" class="form-control" placeholder="电子邮箱" id="email"/>		
				</div>
				<br>
				<div class="input-group col-md-9">
					<span class="input-group-addon"style="width:100px;">职业：</span> 
								<select id="profession" class="form-control" style="width:250px;">
									<option value="1">国家机关、党群组织、企业、事业单位负责人</option>
									<option value="2">专业技术人员</option>
									<option value="3">办事人员和有关人员</option>
									<option value="4">商业、服务业人员</option>
									<option value="5">农、林、牧、渔、水利业生产人员</option>
									<option value="6">生产、运输设备操作人员及有关人员</option>
									<option value="7">军人</option>
									<option value="8">无业</option>
									<option value="9">其他</option>
								</select>
					<span class="input-group-addon"style="width:100px;">年收入：</span> 
								<select id="annualIncome" class="form-control" style="width:250px;">
									<option value="1">10万以下</option>
									<option value="2">10万-20万</option>
									<option value="3">20万-40万</option>
									<option value="4">40万-60万</option>
									<option value="5">60万-100万</option>
									<option value="6">100万以上</option>
								</select>	
				</div>
				<br>
				<div class="input-group col-md-9">
					<span class="input-group-addon"style="width:100px;" >单位：</span> <input type="text"
						style="width:250px;" class="form-control" placeholder="单位" id="company"/>
					<span class="input-group-addon"style="width:100px;">客户来源：</span> 
								<select id="customerSource" class="form-control" style="width:250px;">
									<option value="1">官网</option>
									<option value="2">推荐</option>
									<option value="3">其他</option>
								</select>
					
				</div>
				<br>
				<div class="input-group col-md-9">
					<span class="input-group-addon"style="width:100px;" >备注：</span>
					<textarea class="form-control" maxlength="200" rows="4"style="width:630px;" name=desc id="desc">
					</textarea>
				</div>
				
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
					<button type="button" id="addBtn" class="btn btn-primary"style="width: 80px;">提交</button>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<button type="button" id="resetBtn" class="btn btn-primary"style="width: 80px;">重置</button>
				</div>
			</form>
		</div>


		<!--  -->

	</div>

</body>

</html>