<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="staticPath"
	value="${pageContext.request.contextPath}/static" />
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";  
	request.setAttribute("basePath", basePath);
    request.setAttribute("staticPath", basePath+"static");
%>	
<html>
<head>
<meta name="menu" content="userAuth" />
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
<title>客户资料查询</title>
<script src="${staticPath}/js-busi/customers/queryCustomer.js"></script>
<style type="text/css">

</style>
</head>
<body>
<div id="curLocation">
 	<p>当前位置：客户管理  > 客户资料查询</p>
<hr />
</div>
<div id="pageContent">
			<div>
					    <form class="bs-example bs-example-form" role="form">
					        				<div class="input-group col-md-9">
													<span class="input-group-addon" style="width:100px;">姓名：</span> <input type="text"
														style="width:250px;" class="form-control" placeholder="姓名" name="userName" id="userName"/>   
													<span class="input-group-addon"style="width:100px;">身份证号：</span> <input type="text"
														style="width:250px;" class="form-control" placeholder="身份证号" id="identityCard"/>		
												</div>
												<br>
												<div class="input-group col-md-9">
													<span class="input-group-addon"style="width:100px;">手机号码：</span> <input type="text"
														style="width:250px;" class="form-control" placeholder="手机号码" id="phone"/>
												</div>
												<br>
					        <div class="input-group">	
					            <button type="button" id="queryBtn" class="btn btn-primary" style="width:80px;">查询</button>
					        </div>
					    </form>
			</div>
 
			<div id="reportTableDiv" style="margin-bottom:40px;">
				
				
				<table id="reportTable">
				</table>
			</div>
		
				<!--  -->

</div>

</body>

</html>